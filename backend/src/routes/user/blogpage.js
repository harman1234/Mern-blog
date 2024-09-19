const { error } = require('cli');
const models = require('../../../db/models');
const { checkAuthor } = require('../blog/create');


module.exports = function AuthorBlog(req){

    return new Promise(async (resolve,reject)=>{

        
        try{
            const author = await models.Authors.findOne({where:{Id:req.params.id}})
            const offset = (req.query.page - 1) * 5;
            
            
            
            
            if(author){
              const bloglist = await models.Blogs.findAll({where:{Author_id:author.id},attributes:['Id','Title'],offset:offset,limit:5,order:[['date','DESC']]});
              const totalpages = await models.Blogs.count({where:{Author_id:author.id}});
            if(bloglist){
                resolve({bloglist:bloglist,totalpages:Math.ceil(totalpages/5)})
            }reject({status:404,message:'no blog found'})



            }else{reject({status:404,message:'Author not found'})}

        }catch(error){
            console.log(error)
            reject(error)
        }
    })
}