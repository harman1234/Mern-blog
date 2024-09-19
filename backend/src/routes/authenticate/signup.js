const models = require('../../../db/models')
const joi = require('joi')
const Decrypt = require('../../utilities/encryption/decrypt');
const createHash = require('../../utilities/hash/create')

const schema = joi.object({
    firstname:joi.string().min(5).required().messages({
        'string.base':'First name should be of type text',
        'string.empty':'firstname cannot be empty',
        'string.min':'firstname should have a minimum length of 5 characters',
        'any.required':'this field is required'
    }),
    lastname:joi.string().min(5).required().messages({
        'string.base':'lastname should be of type text',
        'string.empty':'lastname cannot be empty',
        'string.min':'lastname should have a minimum length of 5 characters',
        'any.required':'this field is required'
    }),
    email:joi.string().email().required().messages({
        'string.email':'please provide a valid email',
        'any.required':'email is required'
    }),
    password:joi.string().required().messages({
        'string.empty':'this field cnnot be empty',
        'any.required':'this field is required',
        
    })
})



 function SignUp(data){

     
     return new Promise(async (resolve,reject)=>{
        const {error,value} = await schema.validate(data,{abortEarly:true});
        if(error){
            return reject({status:422,message:error.details[0].message})
        }
        else{
            const email = await models.Users.findOne({where:{email:value.email}});
            if(email){ return reject({status:409,message:"Email already exists!"})}
                
                let password = await Decrypt(value.password).then(result =>{return(result)}).catch(error =>{console.log(error);return reject({status:400,message:'please provide a valid password'})});
                let hash = await createHash(password).then(hash =>{return hash}).catch(error =>{console.log(error)});
                const newUser = await models.Users.create({firstName:value.firstname,lastName:value.lastname,email:value.email,password:hash});
                if(newUser){
                     resolve('User has been created successfully');
                }else{
                    reject({status:400,message:"User cannot be created!"})
                }
        }
    })

}


module.exports = SignUp