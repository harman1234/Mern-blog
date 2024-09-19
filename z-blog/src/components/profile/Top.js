import { Container,Box, Typography,Button, Stack, Chip } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import MyAvatar from "../_utilities/avatar";
import VerifiedIcon from '@mui/icons-material/Verified';
import DeleteIcon from '@mui/icons-material/Delete';
import axiosInstance from "../_utilities/axios";
import { useNavigate, useParams } from "react-router-dom";
import { MainContext } from "../../App";
import DeleteAuthor from "./deleteAuthor";
import DeleteProfile from "./deleteprofile";
import FollowButton from "../_utilities/follow";

export default function ProfileInfo({Isself,author,setAuthor}){
    
    
    const params = useParams();
    const context = useContext(MainContext)
    const navigate = useNavigate()
    
    useEffect(()=>{
        
        const link = Isself ? '/user/author/self':`/author/profile/${params.id}`
        
        axiosInstance.get(link).then(res=>{
            setAuthor(res.data)
            if(res.data.user.id == context.user.id){navigate('/author/self')}
            
        }).catch(error=>{console.log('teri maa di choot',error)});

        
        
        
        
        
    },[context.user])

    return<>{author &&  (
        <Container sx={{padding:'40px 20px',background:'rgba(15, 16, 28,0.3)',border:'0.1px solid #6972bf',borderRadius:'10px'}} width={'100%'}>
            <Box width='100%'
                display={'flex'}
                justifyContent={'flex-start'}
                alignItems={'center'}
                gap={"40px"}
            >
                <MyAvatar sx={{width:'150px',height:'150px',fontSize:'100px'}}>{author.user.firstName ? author.user.firstName[0]:'U'}</MyAvatar>
                <Box height={'100%'}
                    display={'flex'}
                    width={'100%'}
                    flexDirection={'column'}
                    alignItems={'self-start'}
                    justifyContent={'flex-start'}
                    gap={'5px'}
                >
                    <Typography variant="h4" fontWeight={'semi-bold'}>{author.user.firstName} {author.user.lastName}</Typography>
                    <Chip label={author.user.email} color="success" variant="outlined" size="small" icon={<VerifiedIcon/>} />
                    <Stack marginTop={'10px'} direction={'row'} gap={'15px'}>
                        <Typography variant="h6" fontWeight={'medium'}>{author.followers} Followers</Typography>
                        <Typography variant="h6" fontWeight={'medium'}>{author.blog_count} Blogs</Typography>
                    </Stack>
                    <Stack marginTop={'10px'} width={"50%"} direction={'row'} gap={'20px'}>
                        {Isself ? 
                            <><DeleteAuthor/>
                            <DeleteProfile/>
                        </>:<FollowButton sx={{width:'100%'}} id={author.author_id}/>}
                    </Stack>

                </Box>

                
            </Box>
        </Container>)}
    </>
}