import { Box, Chip, Stack, Typography ,Button, Link} from "@mui/material";
import React, { useEffect, useState } from "react";
import MyAvatar from "../_utilities/avatar";
import axiosInstance from "../_utilities/axios";
import FollowButton from "../_utilities/follow";



export default function AuthorInfo({authorid}){

    const [author,setAuthor] = useState(null);
    useEffect(()=>{
        axiosInstance.get(`/author/profile/${authorid}`).then(res=>{setAuthor(res.data)}).catch(error=>{console.log(error)})
    },[authorid])

    return <>{author &&

        <Stack gap={'20px'} sx={{border:'0.5px solid black',bgcolor:'#18191a', padding:'30px 10px',borderRadius:'20px', width:'100%'}}>
            <div className="d-flex justify-content-center w-100"><MyAvatar sx={{height:'100px',width:'100px',fontSize:'3rem'}} >{author.user.firstName}</MyAvatar></div>
            <Box display={'flex'} width={'100%'} alignItems={'center'} gap={'7px'} justifyContent={'center'} flexDirection={'column'}>
                <Typography variant="h5" textTransform={'uppercase'} fontWeight={'bold'}>{author.user.firstName} {author.user.lastName}</Typography>
                <Chip color="success" size="small" variant="outlined" label={author.user.email}/>
            </Box>
            <Box display={'flex'} justifyContent={'center'} gap={'20px'}>
                <Typography variant="button">{author.followers} followers</Typography>
                <Typography variant="button">{author.blog_count} Blogs</Typography>
            </Box>
            <Box display={'flex'} width={'100%'} alignItems={'center'} gap={'15px'} justifyContent={'center'} flexDirection={'column'}>
                <FollowButton sx={{width:'80%'}} id={authorid}/>
                <Button LinkComponent={Link} href={`/author/get/${authorid}`} variant={'contained'} size="small" color="primary" sx={{width:'80%'}}>See Profile</Button>
            </Box>
        </Stack>}
    </>
}