import { Box, Button, Container, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import axiosInstance from "../_utilities/axios";
import { useParams } from "react-router-dom";
import Likebtn from "../_utilities/Likebtn";

export default function BlogContent({author_id,setComments}){

    const [content,setContent] = useState(null);
    const params = useParams()
    useEffect(()=>{
        axiosInstance.get(`/blog/${params.id}`).then(res=>{console.log(res.data);setContent(res.data);
            author_id(res.data.Author_id);
            setComments(res.data.Comments)
        }).catch(error =>{console.log(error)});
    },[])
    return <> {content && 
        <Stack gap={'10px'}>
            <Typography variant="h5" sx={{textTransform:'capitalize',fontWeight:'bold'}} fontWeight={'regular'}>{content.Title}</Typography>
            <Box display={'flex'} alignItems={'center'} gap={"15px"}>
                    <Typography variant="body1" sx={{textTransform:'uppercase',fontWeight:'medium'}}>{content.Category.category}</Typography>
                    <Typography variant="body1">{content.date.split('T')[0]}</Typography>
                    <Likebtn id={content.Id} likecount={content.Like_count}/>   
            </Box>
            <Box width={'100%'} display={'flex'} justifyContent={'flex-start'} sx={{padding:'10px 0px', borderBottom:'0.3px solid white'}}>
                
            </Box>

            <Box sx={{marginTop:'20px'}}>
                <div dangerouslySetInnerHTML={{__html:content.Content}}/>
                
            </Box>
            
            

            

        </Stack>}
    </>
}