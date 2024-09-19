import { Box, Button, Container, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import LatestBlogs from "./latest";

export default function MainHero(){

    const [BlogId,setBlogId] = useState(0);
    return<>
       <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'flex-start'}
            width={'100%'}
            gap={'20px'}
            paddingBottom={'100px'}
            
       >
        <LatestBlogs/>
       </Box>

    </>
}


