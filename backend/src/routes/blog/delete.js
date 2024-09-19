const { where } = require('sequelize');
const models = require('../../../db/models')
const {checkAuthor} = require('./create')
const joi = require('joi');
const { error } = require('cli');

function deleteBlog(req){

    return new Promise(async (resolve,reject)=>{
        try{
            const author = await checkAuthor(req.user.id);
            const deleteblog = await models.Blogs.destroy({where:{Id:req.params.id,Author_id:author.id}});
            if(deleteblog === 0){
                return reject({status:400,message:'blog not deleted'})
            }
            resolve('blog deleted')
                
        }catch(error){
            if(error.status){reject(error)}
            console.log(error.message)
            reject({status:500,message:'Internal server zerror'});
        }
    })
}

module.exports = deleteBlog