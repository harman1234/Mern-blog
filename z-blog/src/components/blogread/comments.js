import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import MyAvatar from "../_utilities/avatar";


export default function Comments({comments}){


    return<>
        <Stack sx={{padding:'20px 0px'}} gap={'20px'}>
            {comments.map(comment =>(<Comment comment={comment}/>))}
            
        </Stack>
    </>
}

function Comment({comment}){

    return <>
        <Box className={'border-dark rounded bg-dark'} sx={{padding:'20px',width:{xs:'100%',sm:'100%',lg:'75%'}}} display={'flex'} gap={'10px'} flexDirection={'column'}>
            <Box display={'flex'} alignItems={'center'} gap={'10px'}>
                <MyAvatar>{comment.User.firstName[0]}</MyAvatar>
               <Stack>
               <Typography variant="h6" textTransform={'capitalize'}>{comment.User.firstName} {comment.User.lastName}</Typography>
               <Typography variant="caption" textTransform={'capitalize'}>{comment.User.email}</Typography>
               </Stack>
            </Box>
            <Box>
                <Typography variant="body2">{comment.comment}</Typography>
            </Box>
        </Box>
    </>
}