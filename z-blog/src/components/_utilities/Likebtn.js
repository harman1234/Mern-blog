import React, { useContext, useState } from "react";
import { Box, IconButton, Stack } from "@mui/material";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import axiosInstance from "./axios";
import { MainContext } from "../../App";
import { useNavigate } from "react-router-dom";


export default function Likebtn({likecount=0,id,sx={}}){
    
    const [Liked,setLiked] = useState(false);
    const [Inprogress,setProgress] = useState(true);
    const context = useContext(MainContext)
    const navigate = useNavigate()
    const [Likecount,setcount] = useState(likecount)

    useState(()=>{
        if(!context.Login && id){navigate('/login')}
        axiosInstance.get(`/user/like/status/${id}`).then(res =>{
            if(res.status == 200){
                setLiked(true);
                setProgress(false)
                

                
            }
        }).catch(error =>{
            setProgress(false);
        })
    },[id]);


    const handleclick = ()=>{

        if(!Inprogress){
            setProgress(true);
            if(Liked){
                axiosInstance.delete(`/blogs/unlike/blog/${id}`).then(res=>{
                    if(res.status == 200){
                        setProgress(false);
                        setLiked(false);
                        setcount(likecount-1)
                    }
                }).catch(error=>{console.log(error);setProgress(false)})
            }
            else{

                axiosInstance.post(`/blogs/like/blog/${id}`).then(res=>{

                    if(res.status == 200){
                        setLiked(true);
                        setProgress(false);
                        setcount(likecount+1)
                    }

                }).catch(error=>{setProgress(false)});
            }
        }
    }

    return<>
        <Box sx={sx} className={'d-flex align-items-center gap2'} >
            <IconButton onClick={handleclick} size="small" color="primary">
                {Liked ? <ThumbUpAltIcon fontSize="small"/>:
                <ThumbUpOffAltIcon fontSize="small"/>}
            </IconButton>
            {Likecount}
        </Box>
    </>
}