const joi = require('joi');
const models = require('../../../db/models');
const createHash = require('../../utilities/hash/create')
const Decrypt = require('../../utilities/encryption/decrypt');
const GenToken = require('../../utilities/jwt/createtoken')

const schema = joi.object({
    email:joi.string().email().required().messages({
        'string.email':'please provide a valid email',
        'string.empty':'email cannot be empty',
        'any.required':'This field is required'
    }),
    password:joi.string().messages({
        'string.empty':'this field cannot be empty',
        'any.required':'this field is required'
    })
});

function Login(data){

    return new Promise(async (resolve,reject)=>{
        const {error,value} = await schema.validate(data,{abortEarly:false});
        if(error){
            return reject({status:400,message:error.details});
        }

        const loginuser = await models.Users.findOne({where:{email:value.email}});
        if(loginuser){
            console.log(value.password)
            const decrypt = await Decrypt(value.password).then(pass =>{return(pass)}).catch(error =>{console.log(error);return reject({status:400,message:"error while decoding password"})});
            const hash = await createHash(decrypt).then(pass =>{return(pass)}).catch(error =>{console.log(error);return reject({status:400,message:"error while decoding password"})});
            if(loginuser.password == hash){
                const token = await GenToken({email:loginuser.email,id:loginuser.id},'24h').then(tken =>{
                    return tken
                
                }).catch(error =>{console.log(error);return reject({status:500,message:'Internal server error'})});
                return resolve(token);
            }
            return reject({status:401,message:'Unautharised user'})

        }else{
            return reject({status:404,message:'user not found'});
        }
        
    })
}


module.exports = Login