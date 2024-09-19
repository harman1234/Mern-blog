const express = require('express');
const router = express.Router();
const {authenticate,RequireAuth} = require('../authenticate/authenticate')
const models = require('../../../db/models')
const post = require('./profile');
const profile = require('./profile');
const { error } = require('cli');
const AuthorSelf = require('./authorself');
const AuthorBlog = require('./blogpage');
const { checkAuthor } = require('../blog/create');



router.post('/author/apply', RequireAuth,async(req,res)=>{
    await models.Users.update({Author_status:true},{where:{id:req.user.id}}).then(
        result =>{
            return res.send('Author created');
        }
    ).catch(error=>{
        console.log(error);
        return res.status(400).json({message:"unable to create author"});
    });
    
});


router.get('/profile/self',(req,res)=>{
    return profile(req.user.id).then(resp =>{return res.send(resp)}).catch(error =>{return res.status(error.status).send(error.message)})
})


router.get('/author/self',(req,res)=>{

    
    checkAuthor(req.user.id).then(author =>{
        return AuthorSelf(author.id).then(ressponse =>{res.send(ressponse)}).catch(error =>{

            try{
                return res.status(error.status).send(error.message)
            }catch(error){
                console.log(error)
                res.status(500).send('Internal server error')
            }
            
            });
    }).catch(error=>{
        try{res.status(error.status).send(error.message)}
        catch(error){console.log(error);res.status(500).send('Internal server error')}
    })
})


router.post('/author/delete', (req,res)=>{
    checkAuthor(req.user.id).then(author =>{
         models.Users.update({Author_status:false},{where:{id:req.user.id}}).then(
            result =>{
                return res.send('Author deleted successfully');
            }
        ).catch(error=>{
            console.log(error);
            return res.status(400).json({message:"unable to delete author"});
        });
    }).catch(error =>{
        try{return res.status(error.status).send(error.message)}
        catch(error){res.status(500).send('Internal server error')}
    })
})

router.get('/author/self/blog/:page',(req,res)=>{
    checkAuthor(req.user.id).then(author =>{
        return AuthorBlog(author.id,req).then(ressponse =>{res.send(ressponse)}).catch(error =>{

            try{
                return res.status(error.status).send(error.message)
            }catch(error){
                console.log(error)
                res.status(500).send('Internal server error')
            }
            
            });
    }).catch(error=>{
        try{res.status(error.status).send(error.message)}
        catch(error){console.log(error);res.status(500).send('Internal server error')}
    })

});



router.delete('/profile/self',(req,res)=>{

    models.Users.destroy({where:{id:req.user.id}}).then(deleted =>{return res.send('Author deleted')}).catch(error =>{
        console.log(error);
        res.status(400).send('unable to delete user')
    })
});


router.get('/like/status/:id', async (req,res)=>{

    try{
            const findlike =  await models.Likes.findOne({where:{Blog_id:req.params.id,user_id:req.user.id}});
            if(findlike){
                return res.send('you already liked this blog');
            }throw({status:404,message:'you didnt liked this blog'})

    }
    catch(error){
        try{return res.status(error.status).send(error.message)}
        catch(error2){ console.log(error);return res.status(500).send('Internal server error')}
        
    }
});

router.get('/follow/status/:id',async (req,res)=>{

    try{
        const follow = await models.Followers.findOne({where:{author:req.params.id,follower:req.user.id}});
        if(!follow){throw({status:400,message:'you are not following this author'})}
        return res.send('you are following this author')
        
    }catch(error){
        try{return res.status(error.status).send(error.message)}
        catch(error2){ console.log(error);return res.status(500).send('Internal server error')}
    }
});

router.post('/follow/:id',async (req,res)=>{

    try{
        const author = await models.Authors.findOne({where:{id:req.params.id}});
        if(!author){throw({status:404,message:'author not found'})}
        
        const [follow,created] = await models.Followers.findOrCreate({where:{author:req.params.id,follower:req.user.id}});
        if(!created){throw({status:400,message:'you are already following this author'})}
        console.log(created);
        res.send('you started following this author')
        
    }catch(error){
        try{return res.status(error.status).send(error.message)}
        catch(error2){ console.log(error);return res.status(500).send('Internal server error')}
    }

});


router.delete('/unfollow/:id',async (req,res)=>{
    try{
        const author = await models.Authors.findOne({where:{id:req.params.id}});
        if(!author){throw({status:404,message:'author not found'})}

        const unfollow = await models.Followers.destroy({where:{author:req.params.id,follower:req.user.id}});
        if(unfollow !==0){
            return res.send('you unfollowed this author');
        }
        throw({status:400,message:'unable to unfollow'})

        
    }
    catch(error){
        try{return res.status(error.status).send(error.message)}
        catch(error2){ console.log(error);return res.status(500).send('Internal server error')}
    }

})

module.exports = router