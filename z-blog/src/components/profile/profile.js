import { Box, Container, Stack } from "@mui/material";
import React, { useState } from "react";
import MyAvatar from "../_utilities/avatar";
import ProfileInfo from "./Top";
import BlogLiat from "./bloglist";

export default function AuthorProfile({SelfProfile}){

    const [author,setAuthor] = useState(null);
    return<>
        <Stack gap={'20px'}>
        <ProfileInfo Isself={SelfProfile} author={author} setAuthor={setAuthor}/>
        <BlogLiat IsSelf={SelfProfile} author={author}/>
        </Stack>
    </>
}