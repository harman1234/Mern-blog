const crypto = require('crypto');
const fs = require('fs');
const path = require('path');




async function Decrypt(data){

    const privateKeypath = path.join(__dirname,'private.key')
    const privatekey = fs.readFileSync(privateKeypath,'utf-8')

    return new Promise(async (resolve,reject) =>{
        const buffer = await Buffer.from(data,'base64');
        try{
            const decrypt = crypto.privateDecrypt({
                key: privatekey,
                padding: crypto.constants.RSA_PKCS1_PADDING // Ensure you specify the padding
            },buffer)
            resolve(decrypt.toString('utf-8'));
        }catch(error){
            reject(error);
        }

    })
}


module.exports = Decrypt;