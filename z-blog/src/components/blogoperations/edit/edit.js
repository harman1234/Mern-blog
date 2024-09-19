import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../_utilities/axios";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../../_utilities/editor/editor";
import { MainContext } from "../../../App";


export default function EditBlog(){
    const [content,setcontent] = useState('');
    const params = useParams()
    const navigate = useNavigate()
    const context = useContext(MainContext)
    
    useEffect(()=>{
        axiosInstance.get(`/blogs/edit/blog/${params.id}`).then(res =>{setcontent(res.data.Content)}).catch(error=>{console.log(error)})
    },[])

    const agreefunc = ()=>{
        axiosInstance.post(`/blogs/edit/blog/${params.id}`,{content:content}).then(res =>{
            context.setMessage('Blog edited successfully');
            context.setSnackstate(true)
            navigate('/')
        }).catch(error=>{console.log(error)})
    }
    return <>
       <Editor content={content} agreefunc={agreefunc} setcontent={setcontent}/>
    </>
}