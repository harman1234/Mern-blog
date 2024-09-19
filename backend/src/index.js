const express = require('express');
const app = express()
const Port = 8000;
const SignUp = require('./routes/authenticate/signup');
const fs = require('fs');
const path = require('path')
const Login = require('./routes/authenticate/login')
const {RequireAuth} = require('./routes/authenticate/authenticate')
const userroutes = require('./routes/user/user')
const cors = require('cors');
const models = require('../db/models');
const blogroutes = require('./routes/blog/blogroutes')
const findBlog = require('./routes/blog/read');
const latestBlogs = require('./routes/blog_list/latest')

const { error } = require('console');
const AuthorSelf = require('./routes/user/authorself')
const AuthorBlog = require('./routes/user/blogpage')

const corsOptions = {
    origin: '*', // This allows requests from any origin
    credentials: true, // If you need to allow credentials (cookies, authorization headers, etc.)
  };
app.use(cors(corsOptions));

app.use(express.json())

app.use('/user',RequireAuth,userroutes);
app.use('/blogs',RequireAuth,blogroutes);

app.get('/blog/:id' ,(req,res)=>{
    
    return findBlog(req.params.id).then(blog =>{res.send(blog)}).catch(error =>{res.status(error.status).send(error.message)})
});


app.post('/signup',(req,res)=>{

    return SignUp(req.body).then(result=>{return res.send(result)}).catch(error=>{res.status(error.status);res.send(error.message)})
})

app.get('/login',(req,res)=>{
    console.log(req.body)
    return Login(req.query).then(result =>{return res.send(result)}).catch(error =>{return res.status(error.status).send({message:error.message})})
    
})

app.get('/api-key',(req,res)=>{
    const keypath = path.join(__dirname,'/utilities/encryption/public.key')
    const token = fs.readFileSync(keypath,'utf-8');
    return res.send(token);
})



app.get('/categories', async (req,res)=>{
    const categories = await models.Categories.findAll()
    res.send(categories)
})

app.get('/latest/:page',(req,res)=>{
    return latestBlogs(req.params.page).then(blogs =>{return res.status(200).send(blogs)}).catch(error=>{res.status(error.status).send(error.message)})
})

app.get('/token/verify',RequireAuth,(req,res)=>{
    return res.send('token verified');
})


app.get('/author/profile/:id',(req,res)=>{

    
    return AuthorSelf(req.params.id).then(ressponse =>{res.send(ressponse)}).catch(error =>{

        try{
            return res.status(error.status).send(error.message)
        }catch(error){
            console.log(error)
            res.status(500).send('Internal server error')
        }
        
        });
})

app.get('/author/blog/:id',(req,res)=>{
    
    return AuthorBlog(req).then(ressponse =>{res.send(ressponse)}).catch(error =>{

        try{
            return res.status(error.status).send(error.message)
        }catch(error){
            res.status(500).send('Internal server error')
        }
        
        });
});


app.listen(Port,()=>{console.log(`launching server at port:${Port}`)});