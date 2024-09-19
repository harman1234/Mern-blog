
const crypto = require('crypto');


function createHash(data){

    return new Promise((resolve,reject) =>{
        try{

            const hash = crypto.createHash('sha256').update(data).digest('hex');
            resolve(hash)

        }catch(error){
            reject(error);
        }
    })
}


module.exports = createHash