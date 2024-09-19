import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Link, Modal } from "@mui/material";

export default function Logout(){

    return<>
        <Box display='flex' justifyContent={"space-around"} gap='8px'>
            <Link href='/login' underline="none" className="btn text-white ">Login</Link>
            <Link href='/signup' underline="none" className="btn btn-light text-dark">SignUp</Link>
        </Box>
    </>
}

