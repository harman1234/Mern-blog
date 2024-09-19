import React, { useContext, useEffect } from "react";
import Navbar from './Header/navbar';
import { MainContext } from "../App";
import { Route, Routes, useNavigate } from "react-router-dom";
import MainHero from "./Hero/main";
import { Container,Alert, Snackbar, Typography } from "@mui/material";
import Profile from "./profile/profile";
import Readblog from "./blogread/read";
import Editor from "./_utilities/editor/editor";
import AuthorProfile from "./profile/profile";


export default  function Index(){
    const context = useContext(MainContext);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        context.setSnackstate(false)
    
    }
    return <>
        <div style={{backgroundColor:'#000814',height:'100vh',width:'100vw',color:'white',overflow:'scroll'}} >
            <Navbar loginstate={context.Login}/>
            <Container sx={{width:'100vw',height:'100vh',marginTop:'40px'}}>
                <Routes >
                    <Route path="/" element={<MainHero/>}/>
                   <Route path="/blog/:id" element={<Readblog/>}/>
                   {context.user.Author_status ? <Route path="/author/self" element={<AuthorProfile SelfProfile={true}/>}/>:''}
                   <Route path="/author/get/:id" element={<AuthorProfile SelfProfile={false}/>}/>
                   


                    
                </Routes>
            </Container>
            <Snackbar onClose={handleClose} open={context.Snackstate} autoHideDuration={6000}>
            <Alert
                onClose={handleClose}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
            >
                {context.message}
            </Alert>
            </Snackbar>
            
            
        </div>
    </>
}