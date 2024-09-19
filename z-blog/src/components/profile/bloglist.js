import React, { useEffect, useState } from "react";
import { Box, Stack, Typography,Button, Pagination } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axiosInstance from "../_utilities/axios";
import { useNavigate, useParams } from "react-router-dom";


export default function BlogLiat({IsSelf,author}){

    const [bloglist,setBloglist] = useState([]);
    const [totalpages,setTotalpages] = useState(1);
    const [currentpage,setcurrentpage] = useState(1);
    const params = useParams()
    const [refresh,setrefresh] = useState(0);

    const handleChange = (event,value)=>{
        setcurrentpage(value)

    }
    
    useEffect(()=>{
        if(author){
            console.log(author)
            const link = IsSelf ? `/author/blog/${author.author_id}`:`/author/blog/${params.id}`
                axiosInstance.get(link,{params:{page:currentpage}}).then(res=>{
            
                    setTotalpages(res.data.totalpages)
                    setBloglist(res.data.bloglist)
                    console.log(res.data)
                }).catch(error=>{console.log(error)});
        }
        
    },[currentpage,author,refresh])

    return <>
        <Typography margin={'20px 0px'} variant="h4" fontWeight={'bold'}>Your Blogs</Typography>
        <Box marginBottom={'50px'} sx={{padding:'20px',width:'100%',background:'rgba(15, 16, 28,0.8)',borderRadius:'10px'}}>
            <Stack marginTop={'20px'} gap={'10px'}>
               {bloglist.map(blog=>(
                <ListItem title={blog.Title} id={blog.Id} refresh={setrefresh} IsSelf={IsSelf}/>
               ))}
            </Stack>
            <Pagination size='small' onChange={handleChange} count={totalpages} color="primary" page={currentpage}style={{ marginTop:'40px',color: '#1976d2' }}/>

        </Box>
    </>
}



function ListItem({title='hello',id,IsSelf,refresh}){

    const navigate = useNavigate()
    const handleclick = ()=>{
        navigate(`/edit/${id}`)
    }

    const handledelet = ()=>{
        axiosInstance.delete(`/blogs/delete/blog/${id}`).then(res=>{if(res.status == 200){
            refresh(id);
        }}).catch(error=>{console.log(error);alert('unable to delete blog')})
    }
    return<>
        <Box sx={{background:'rgba(70,75,115,0.1)',padding:'20px 30px', borderRadius:'10px'}} display={'flex'} width={'100%'} justifyContent={'space-between'} alignItems={'center'}>
            <Typography variant="body2" fontWeight={'regular'}>{title.substring(0,40)}...</Typography>
            <Stack direction={'row'} gap={'10px'}>
            {IsSelf ?
                <><Button variant='contained' size="small" onClick={handleclick} endIcon={<EditIcon/>} color='primary'>Edit</Button>
                <Button variant='outlined' size="small" onClick={handledelet} endIcon={<DeleteIcon/>} color='error'>delete</Button></>
                :<><Button variant='contained' size="small" onClick={()=>{navigate('/')}} endIcon={<EditIcon/>} color='primary'>Read</Button>
                <Button variant='contained' size="small" onClick={()=>{navigate('/')}} endIcon={<EditIcon/>} color='primary'>Read</Button></>
                }
            </Stack>
        </Box>
    </>
}