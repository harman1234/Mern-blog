const Tokenverification = require('../../utilities/jwt/verify')
const models = require('../../../db/models');
const { verify } = require('crypto');

function RequireAuth(req,res,next){
    const token = req.headers['authorization'];
    if(token){
        
        try{
             
            Tokenverification(token).then(async verify=>{
                req.user = verify
                const user = await models.Users.findOne({where:{id:verify.id}});
                if(!user){return res.status(404).send('user not found')}
                next();
                
            }).catch(err =>{return res.status(401).send('expired token')})
           
            
        }catch(error){return res.status(500).send('Internal server Error')}
    }

}

module.exports = {RequireAuth}