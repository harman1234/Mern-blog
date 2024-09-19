const express = require('express');
const router = express.Router();
const {RequirAuth} = require('../authenticate/authenticate');
const models = require('../../../db/models');
const {createBlog, checkAuthor} = require('./create')
const findBlog = require('./read');
const deleteBlog = require('./delete');
const createComment = require('./comment_create');
const { error } = require('cli');
const EditBlog = require('./edit');




router.post('/create',createBlog);
router.get('/edit/blog/:id' ,(req,res)=>{
    checkAuthor(req.user.id).then(author =>{
        findBlog(req.params.id).then(blog=>{
            if(blog.Author_id === author.id){
                return res.send(blog)
            }else{res.status(403).send('you are not author of this blog')}
        })
        



    }).catch(error=>{console.log(error);res.status(error.status).send(error.message)})
});

router.post('/edit/blog/:id',(req,res)=>{
    return EditBlog(req).then(response =>{res.send(response)}).catch(error =>{res.status(error.status).send(error.message)})
})

router.delete('/delete/blog/:id',(req,res)=>{
    return deleteBlog(req).then(response =>{res.send(response)}).catch(error =>{res.status(error.status).send(error.message)});
})

router.post('/like/blog/:id',async (req,res)=>{

        try{
            const blog = await models.Blogs.findOne({where:{Id:req.params.id}});
            if(!blog){return res.status(404).send('unable to find blog')}
            const [like,created] = await models.Likes.findOrCreate({where:{Blog_id:req.params.id,user_id:req.user.id}});

            
            if(!created){
                return res.status(400).send('You have already liked this blog');
            }
            return res.send('liked the blog');

            
        }catch(error){console.log(error);
            return res.status(500).send('Internal server error')}
})

router.delete('/unlike/blog/:id',(req,res)=>{

    models.Likes.destroy({where:{Blog_id:req.params.id,user_id:req.user.id}}).then(like =>{
        if(like !== 0){
            return res.send('You unliked this blog')
        }
         return res.status(400).send('failed to unlike')
    }).catch(error =>{console.log(error);return res.status(500).send('Internal server error')})
})

router.post('/comment/blog/:id',(req,res)=>{
    return createComment(req).then(response =>{res.send(response)}).catch(error =>{res.status(error.status).send(error.message)});
});


router.delete('/comment/delete/:id',(req,res)=>{

    models.Comments.destroy({where:{Blog_id:req.params.id,user_id:req.user.id}}).then(like =>{
        if(like !== 0){
            return res.send('Comment Deleted')
        }
         return res.status(400).send('failed to delete')
    }).catch(error =>{console.log(error);return res.status(500).send('Internal server error')})
})
module.exports = router;