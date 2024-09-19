import { Container } from "@mui/material";
import React, { useContext, useState } from "react";
import Grid from '@mui/material/Grid2'
import { useParams } from "react-router-dom";
import BlogContent from "./blog";
import AuthorInfo from "./author";
import Comments from "./comments";
import CommentCreate from "./commentcreate";
import { MainContext } from "../../App";


export default function Readblog(){
    const params = useParams()
    const [authorid,setauthorId] = useState(null);
    const [comments,setComments] = useState([]);
    const context = useContext(MainContext)

    return<>
            <Grid wrap="wrap" container spacing={5} paddingBottom={20}>
                <Grid size={8}><BlogContent author_id={setauthorId} setComments={setComments} /></Grid>
                <Grid size={4}><AuthorInfo authorid={authorid} /></Grid>
                {context.Login ? <Grid size={12}><CommentCreate/></Grid>:''}
                <Grid size={12}><Comments comments={comments}/></Grid>
            </Grid>
    </>
}