const jwt = require('jsonwebtoken');


function Tokenverification(token){
    
    return new Promise(async (resolve,reject)=>{
        const secretkey = 'ptbrbv3were4254t3b[refvbfeivb4g4vt4ivb43hy5ijerh65643246342636344663he';
        
            jwt.verify(token,secretkey,(err,decoded)=>{
                
                if(err){reject('failed to decode')}
                 resolve(decoded)
            })
        
    })
}

module.exports = Tokenverification