const models = require('../../../db/models');


function findBlog(bid){

    return new Promise(async (resolve,reject)=>{
        try{
            const blog = await models.Blogs.findOne({where:{id:bid},
                include:[{model:models.Categories},{model:models.Comments,attributes:['id','comment'],include:[{model:models.Users,attributes:['firstName','lastName','email']}]}],
                order:[['id','DESC']]
            })
            if(!blog){
                reject({status:404,message:'blog not found'})
                
            }
            resolve(blog)
        }catch(error){
            console.log('error here starts \n',error)
            reject({status:500,message:'Internal server occured'})
        }
    })
}

module.exports = findBlog