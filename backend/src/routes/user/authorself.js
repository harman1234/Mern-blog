const sequelize = require('../../../db/connection');
const models = require('../../../db/models');
const { use } = require('./user');


function AuthorSelf(id){


    return new Promise(async (resolve,reject)=>{
        

        try{
            
            const author = await models.Authors.findOne({where:{Id:id}});
            if(author){
                const user = await models.Users.findOne({where:{id:author.Author_id}});
                const blog_count = await models.Blogs.count({where:{Author_id:author.id}})
                
                resolve({user:user,followers:author.Follower,blog_count:blog_count,author_id:author.id})
                
            }else{
                throw({status:404,message:"author not found"})
            }

        }catch(error){
            console.log(error)
            reject(error)
        }
    })
}




module.exports = AuthorSelf