const models = require('.././../../db/models')
const joi = require('joi')

const schema = joi.object({
    comment:joi.string().required().messages({
        'string.base':'The comment must be a string',
        'any.required':'comment is required',
        'string.empty':'comment cannot be empty'
    })
})

function createComment(req){

    return new Promise(async (resolve,reject)=>{
        const {error,value} = schema.validate(req.body,{abortEarly:true});
        if(error){reject({status:400,message:error.details.message})}
        models.Comments.create({Blog_id:req.params.id,user_id:req.user.id,Comment:value.comment}).then(comment =>{
            if(comment){resolve('Comment created')}
            reject({status:400,message:"Unable to create comment"})
        }).catch(error =>{console.log(error);reject({status:500,message:'Internal server error'})})

    })
}

module.exports = createComment