import { Avatar, Box, Container, Link, Pagination, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2'
import axios from "axios";
import React, { useEffect, useState } from "react";
import MyAvatar from "../_utilities/avatar";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../_utilities/axios";



export default function LatestBlogs(){

    const [Bloglist,setBloglist] = useState([]);
    const [CurrentPage,setCurrentPage] = useState(1);
    const [Totalpage,setTotalpage] = useState(10);
    useEffect(()=>{
        axiosInstance.get(`/latest/${CurrentPage}`).then(res =>{
            setBloglist(res.data.currentpage)
            setTotalpage(res.data.totalpages)
        })
    },[CurrentPage])

    const handleChange = (event,value)=>{
        setCurrentPage(value)

    }

    return<>
        <Typography variant="h3" fontWeight={'medium'}>Latest</Typography>
        <Grid container spacing={"10px"} wrap="wrap" width={'100%'} alignItems="center"  justifyContent="start">
            {Bloglist.map(item =>(
                <Blog item={item}/>
            ))}
            
        </Grid>  
        <Pagination size='large' onChange={handleChange} hideNextButton hidePrevButton count={Totalpage} color="primary" page={CurrentPage}style={{ color: '#1976d2' }}/>
    </>
}

function Blog({item}){

    
      const stripHtmlUsingRegex = (html) => {
        return html.replace(/<\/?[^>]+(>|$)/g, "");
    };
    const DateChange = (_date) => {
        const date = new Date(_date);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        return formattedDate
    }

    return<>
       <Grid    
                size={{xs:12, // Full width for small screens
                sm:12,  // 2 columns for small and medium screens
                md:6, // 3 columns for medium screens
                lg:6} }
                
            >
            
                <Box sx={{cursor:'pointer'}}
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'flex-start'}
                    width={'100%'}
                    padding={'10px 20px'}
                    gap={'15px'}
                >
                    <Typography variant="subtitle2" textTransform={'capitalize'} fontWeight={'regular'}>{item.category}</Typography>
                    <Typography variant="h5" fontWeight={'medium'}>{item.title}</Typography>
                    <Typography variant="body2">{stripHtmlUsingRegex(item.content)} ...<Link href={`/blog/${item.id}`} color='primary' variant="subtitle2" >Read More</Link> </Typography>
                    <Box marginTop={'20px'} alignItems={'center'} display={'flex'} justifyContent={'space-between'}>
                        <Box display={'flex'} gap={'10px'} alignItems={'center'}>
                            <MyAvatar>{item.author.username}</MyAvatar>
                            <Link href={`/author/get/${item.author.id}`} underline="none" variant="subtitle2" >{item.author.username}</Link>
                        </Box>
                        <Typography variant="caption">{DateChange(item.date)}</Typography>
                    </Box>

                </Box>
                </Grid>
    </>
}