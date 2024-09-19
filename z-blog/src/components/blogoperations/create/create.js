import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../../App";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../_utilities/axios";
import TitleDialog from "./dialog";
import Editor from "../../_utilities/editor/editor";
import SubmitBlog from "./submit";


export default function Create(){

    const [Title,setTitle] = useState('');
    const [category,setCategory] = useState(0);
    const [content,setContent] = useState('');
    const context = useContext(MainContext);
    const navigate = useNavigate()

    function agreefunc(){
        SubmitBlog(Title,category,content,context,navigate)
    }
    

    return<>
        
        <TitleDialog category={category} setTitle={setTitle} setCategory={setCategory} />
        <Editor content={content} setcontent={setContent} agreefunc={agreefunc}/>
    </>
}




