import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import axiosInstance from "../_utilities/axios";


export default function DeleteAuthor(){
    const [open,setOpen]= useState(false);
    
    const handleopen = ()=>{setOpen(true)}
    const handleclose = ()=>{setOpen(false)}

    const deleteAuthor = ()=>{
        axiosInstance.post('/user/author/delete').then(res=>{if(res.status == 200){window.location.reload()}}).catch(error =>{console.log(error)})
    }

    return<>
        <Button variant="outlined" onClick={handleopen} endIcon={<DeleteIcon/>} sx={{width:'100%'}} color="error">Delete Author</Button>
        <Dialog open={open} onClose={handleclose} PaperProps={{
          sx: {
            backgroundColor: '#1c1c1c', // Dark background
            color: '#fff',
            padding:'20px'       // Optional styling
          },
        }}>
            <DialogTitle>Delete Author Profile</DialogTitle>
            <DialogContent><Typography variant="button">Are you sure you want to delete author profile<br/>Deleting it will alse delete all the blogs you've created</Typography></DialogContent>
            <DialogActions>
                <Button variant="text" onClick={handleclose}>Go back</Button>
                <Button variant="contained" onClick={deleteAuthor} color="error">Delete Author</Button>
                
            </DialogActions>
        </Dialog>
    </>

}