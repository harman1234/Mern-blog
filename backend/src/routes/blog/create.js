const { error } = require('cli');
const models =  require('../../../db/models');
const joi = require('joi');



const schema = joi.object({
    category:joi.number().required().messages({
        'number.base':'category must be a number',
        'any.required':'Category is equired'
    }),
    date:joi.date().iso().required().messages({
        'date.base':'please fill a legitimate date',
        'any.required':'Date is required'
    }),
    title:joi.string().required().messages({
        'string.base':'Please provide a valid title',
        'any.required':'Title field is required',
        'string.empty':'Title field cannot be empty'
    }),
    content:joi.string().required().messages({
        'string.base':'Please provide a valid title',
        'any.required':'Title field is required',
        'string.empty':'Title field cannot be empty'
    })
})

function checkAuthor(id) {

  return new Promise(async (resolve, reject) => {
    await models.Authors.findOne({where:{Author_id:id}}).then(author =>{
        if(author){return resolve(author)}

        return reject({status:400,message:'Author not found'})
    }).catch(error =>{console.log('check author error  ',error);return reject({status:500,message:'Internal server occured'})})
  });
}

function createBlog(req,res){

    checkAuthor(req.user.id).then(
        resp=>{
            const {error,value} = schema.validate(req.body,{abortEarly:true});
            if(error){return res.status(400).json(error.details[0].message)}
            models.Categories.findOne({where:{id:value.category}}).then(cat =>{
                if(cat){
                    try{
                        models.Blogs.create({Author_id:resp.id,Category_id:value.category,Content:value.content,date:value.date,Title:value.title}).then(blog =>{if(blog){return res.send('blog created')} return res.status(400).send('failed to create blog')}).catch(error =>{console.log('blog create',error);return res.status(500).send("Internal server error occured")});
                    }catch(error){console.log('error fromblog creaton',error);return res.status(500).send('Internal server error')}
                }
                else{return res.status(400).send('category not found')}
            }).catch(error =>{console.log('category error',error);return res.status(500).send("Internal server error occured")})


        }
    ).catch(error =>{return res.status(error.status).send(error.message);})
}

module.exports = {createBlog,checkAuthor}