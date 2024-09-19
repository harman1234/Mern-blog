import { Box, Button, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "./axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MainContext } from "../../App";


export default function FollowButton({sx,id}){

    const [Followed,setFollowed] = useState(false);
    const [Inprogress,setProgress] = useState(true);
    const context = useContext(MainContext)
    const navigate = useNavigate()

    useState(()=>{
        if(!context.Login && id){navigate('/login')}
        axiosInstance.get(`/user/follow/status/${id}`).then(res =>{
            if(res.status == 200){
                setFollowed(true);
                setProgress(false)
                

                
            }
        }).catch(error =>{
            setProgress(false);
        })
    },[id]);


    const handleclick = ()=>{

        if(!Inprogress){
            setProgress(true);
            if(Followed){
                axiosInstance.delete(`/user/unfollow/${id}`).then(res=>{
                    if(res.status == 200){
                        setProgress(false);
                        setFollowed(false);
                        
                    }
                }).catch(error=>{console.log(error);setProgress(false)})
            }
            else{

                axiosInstance.post(`/user/follow/${id}`).then(res=>{

                    if(res.status == 200){
                        setFollowed(true);
                        setProgress(false);
                        
                    }

                }).catch(error=>{setProgress(false)});
            }
        }
    }

    useEffect(()=>{
        // axiosInstance.get(`/user/follow/11`)
    },[])
 
    return <>
        <Stack sx={sx}>
           {!Followed ? <Button size="small" width={'100%'} onClick={handleclick} variant="contained" color="primary">follow</Button>:
            <Button width={'100%'} size="small" onClick={handleclick} variant="outlined" color="primary">unfollow</Button>}

        </Stack>
    </>
}