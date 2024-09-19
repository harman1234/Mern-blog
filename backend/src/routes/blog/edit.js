const { error } = require('cli');
const models = require('../../../db/models');
const { checkAuthor } = require('./create');
const findBlog = require('./read');
const joi = require('joi')

const schema = joi.object({
    content:joi.string().required().messages({
        'string.base':'the content should be in string format',
        'any.required':'content field is required',
        'string.empty':'content field cannot be empty'

    })
})


function EditBlog(req){

    return new Promise(async (resolve,reject)=>{
        checkAuthor(req.user.id).then(author =>{
            findBlog(req.params.id).then(blog=>{
                if(author.id === blog.Author_id){
                    
                    const {error,value} = schema.validate(req.body,{abortEarly:true});
                    if(error){reject({status:400,message:error.details[0].message})}
                    models.Blogs.update({Content:value.content},{where:{id:blog.Id}}).then(success =>{console.log(success);resolve('blog edited')}).catch(error=>{console.log(error);reject({status:400,message:'unable to edit blog '})})


                }else{reject({status:400,message:'unable to edit blog make sure you are the author of this blog'})}

            }).catch(error=>{console.log(error);reject({status:404,message:'blog not found'})})
        }).catch(error=>{console.log(error);reject({status:404,message:'author not found'})})
    })
}

module.exports = EditBlog