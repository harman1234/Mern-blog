const jwt = require('jsonwebtoken');


const secretkey = 'ptbrbv3were4254t3b[refvbfeivb4g4vt4ivb43hy5ijerh65643246342636344663he'
const Refrshsecret = 'nbjkvjchxfgcgvhbjnkmknjbhyvtcrdtfvgybhnubgytvfcrdtfvbgyhnujhubgyfrdcftyuhinhyfrdetyhytfvdreswexdrcftvygbuhnubygvftcdrsxewazer56t77y65re4w32sx4crvtb'


function GenToken(payload,expiry){

    return new Promise(async (resolve,reject)=>{
        const options = {
            expiresIn:expiry,
            algorithm:'HS256'
        };
        const options2 = {expiresIn:'7d',algorithm:'HS256'}
        try{
            const token = jwt.sign(payload,secretkey,options);
            const token2 = jwt.sign(payload,Refrshsecret,options2);
            return resolve({token:token,refreshtoken:token2})
        }
        catch(error){return reject(error)}
    })
}


module.exports = GenToken;