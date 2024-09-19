const Tokenverification = require('../../utilities/jwt/verify')

async function authenticate(req,res,next){
    if(req.path.startsWith('/login') || req.path.startsWith('/signup') ||req.path.startsWith('/api-key') ){
        return next()
    }
    const token = req.headers['authorization'];
    if(token){
        const verify = await Tokenverification(token).then(tken=>{return tken}).catch(error=>{return res.status(400).json('erro in token verififcation')});
        req.user = verify
    }
    next()
}

function RequireAuth(req,res,next){
    if(!req.user){
        return res.status(403).json({message:'Token required'})
    }
    next()
}


module.exports = {authenticate,RequireAuth}