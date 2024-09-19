import React, { useContext, useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar  from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import  Button  from "@mui/material/Button";
import Box from "@mui/material/Box";
import MyAvatar from "../_utilities/avatar";
import { Link, Modal } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import axios from "axios";
import axiosInstance from "../_utilities/axios";
import Profile from "./profile";
import Logout from "./logout";
import { MainContext } from "../../App";

export default function Navbar({loginstate}){
    const context = useContext(MainContext)
    

    return <>
        <AppBar position="static"
         sx={{boxShadow:'none',
         width:{xs:'96vw',lg:'85vw'},
         margin:{xs:'20px auto 0',lg:'40px auto 0'},
         border:'0.5px solid #2e2e2e',
         background:'#000812',
         borderRadius:'15px',
         backdropFilter:'blur(20px)',
         WebkitBackdropFilter: 'blur(20px)'

         
         }}>
            <Toolbar variant="dense" sx={{padding:{xs:'6px',lg:'6px 20px'}}}>
                <Box 
                    display="flex"
                    flexDirection="row"
                    justifyContent='space-between'
                    alignItems='center'
                    width='100%'

                >
                    <Typography variant="h6" href="/" underline="none" component={Link} color="#0260f7"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"  viewBox="0 20 700 512"><path fill="currentColor" d="M192 32c0 17.7 14.3 32 32 32c123.7 0 224 100.3 224 224c0 17.7 14.3 32 32 32s32-14.3 32-32C512 128.9 383.1 0 224 0c-17.7 0-32 14.3-32 32m0 96c0 17.7 14.3 32 32 32c70.7 0 128 57.3 128 128c0 17.7 14.3 32 32 32s32-14.3 32-32c0-106-86-192-192-192c-17.7 0-32 14.3-32 32m-96 16c0-26.5-21.5-48-48-48S0 117.5 0 144v224c0 79.5 64.5 144 144 144s144-64.5 144-144s-64.5-144-144-144h-16v96h16c26.5 0 48 21.5 48 48s-21.5 48-48 48s-48-21.5-48-48z"/></svg> ZBlog</Typography>
                    
                    {!loginstate ? <Logout/>:!context.user.Author_status ?<Profile/>:<Link href='/author/self'><MyAvatar>{context.user.firstName[0]}</MyAvatar></Link>}
                    
                </Box>
            </Toolbar>
        </AppBar>
    </>
}


