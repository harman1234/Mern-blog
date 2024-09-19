const { error } = require('cli')
const sequelize = require('../../../db/connection')
const models = require('../../../db/models')


function profile(id){

    return new Promise(async (resolve,reject)=>{
        models.Users.findOne({where:{id},attributes:['id','firstName','lastName','email','Author_status',
            [sequelize.fn('COUNT',sequelize.col('Likes.user_id')),'Like_count'],
            [sequelize.fn('COUNT',sequelize.col('Comments.user_id')),'comment_count']
        ],
        include:[
            {model:models.Likes,as:'Likes',attributes:[]},{model:models.Comments,as:'Comments',attributes:[]}
        ]
        
        }).then(response =>{
            resolve(response)
        }).catch(error =>{
            console.log(error)
            reject({status:500,message:'Internal server error'})
        })
    })
}

module.exports = profile