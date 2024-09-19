import React, { useEffect, useState } from "react";
import { MainContext } from "../../App";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container,Box, Typography } from "@mui/material";
import axios from 'axios'
import JSEncrypt from 'jsencrypt'
import axiosInstance from "../_utilities/axios";



export default function LoginPage(){
    const context = useContext(MainContext);
    const navigate = useNavigate()
    useEffect(()=>{
        if(context.Login){
            navigate('/')
        }
    },[context.Login])
    
    return<>
        <div className="container-fluid w-100 bg-dark d-flex align-items-center justify-content-center" style={{ backgroundImage:'url("https://cdn.dribbble.com/userupload/5427227/file/original-bcd3fb28935ea4b65fade7d0fb848226.jpg?resize=1504x1128")'
            , color:'white',height:'100vh'}}>
           <Container sx={{
                width:{xs:'100%',lg:'30%'},
                backgroundColor:'rgba(255,255,255,0.6)',
                backdropFilter:'blur(10px)',
                borderRadius:'20px',
                height:'80vh',
                border:"2px solid #f2f2f2"
           }}
           >
            <Box sx={{color:'black'}}
                display='flex'
                flexDirection='column'
                justifyContent='center'
                gap='20px'
                
            >
               <Box display='flex' flexDirection='column' alignItems='center' marginTop='40px'> <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"  viewBox="0 0 512 512"><path fill="currentColor" d="M192 32c0 17.7 14.3 32 32 32c123.7 0 224 100.3 224 224c0 17.7 14.3 32 32 32s32-14.3 32-32C512 128.9 383.1 0 224 0c-17.7 0-32 14.3-32 32m0 96c0 17.7 14.3 32 32 32c70.7 0 128 57.3 128 128c0 17.7 14.3 32 32 32s32-14.3 32-32c0-106-86-192-192-192c-17.7 0-32 14.3-32 32m-96 16c0-26.5-21.5-48-48-48S0 117.5 0 144v224c0 79.5 64.5 144 144 144s144-64.5 144-144s-64.5-144-144-144h-16v96h16c26.5 0 48 21.5 48 48s-21.5 48-48 48s-48-21.5-48-48z"/></svg>
               <Typography variant="h5" fontWeight='regular' marginTop='20px'>Please Sign In</Typography></Box>

               <Mainform context={context}/>
                <Typography variant="body2" margin='20px auto 0' fontWeight='regular'  color="black">Don't have an account yet? <Link to='/signup'>Sign Up</Link></Typography>
            </Box>
           </Container>
        </div>
    </>

}


function Mainform({context}){
    const encrypt = new JSEncrypt();
    const [key,setkey] = useState(null);

    useEffect(()=>{
        axiosInstance.get('/api-key').then(res=>{setkey(res.data)}).catch(error=>{console.log(error)});
    },[]);
    

    const handleLogin = async (event)=>{
        event.preventDefault();
        let form_data = new FormData(event.target);
        if(key){
            encrypt.setPublicKey(key);
            const password = encrypt.encrypt(form_data.get('password'))
            const data = {email:form_data.get('email'),password:password}
            await axiosInstance.get('/login',{params:data}).then(response=>{console.log('this is from login ',response.data);localStorage.setItem('token',response.data.token);context.setLogin(true)}).catch(error=>{console.log('login error',error)});

        }
    }
    


    return<>
     <style>
        {`
          .input-custom {
            background-color: rgba(255, 255, 255, 0.4); /* Example color */
            border:none !important;
            font-size:14px;
          }
            .input-custom:hover, 
            .input-custom:focus, 
            .input-custom:active {
            outline: none !important;
            box-shadow: none !important; /* Removes Bootstrap's default focus shadow */
            border:none;
            background-color: rgba(255, 255, 255, 0.4); /* Example color */
            }
        `}
      </style>
        <form onSubmit={handleLogin}>
            <Box display='flex' gap='10px' flexDirection='column' marginTop='40px'>
                <input name='email' type="email" className="form-control  input-custom py-3 px-3" placeholder="email" />
                <input name='password' type='password' className="form-control  input-custom py-3 px-3" placeholder="password" />
                <button type="submit" className="btn btn-dark py-2">Sign In</button>
            </Box>
        </form>
    </>
}