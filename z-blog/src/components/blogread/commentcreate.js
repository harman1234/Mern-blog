import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React ,{useContext, useState}from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../_utilities/axios";
import { MainContext } from "../../App";



export default function CommentCreate(){

    const [value, setValue] = useState('');
    const [errorvalue, seterrorvalue] = useState('');
    const [error, seterror] = useState(false);
    const params = useParams();
    const context = useContext(MainContext)

  const handleChange = (event) => {
    setValue(event.target.value);
  };
    const handlesubmit =(e)=>{
        if(value.trim() === ''){
            seterror(true);
            seterrorvalue('please add a comment');
            
            return

        }else{

            axiosInstance.post(`/blogs/comment/blog/${params.id}`,{comment:value}).then(res=>{setValue('');context.setSnackstate(true);context.setMessage('CommentAdded')}).catch(error=>{console.log(error)})
        }
        
        
    }
    return<>
        <Box display={'flex'} sx={{width:{xs:'100%',sm:'100%',lg:'75%'}}} gap={'20px'} flexDirection={'column'}>
        <Typography variant="h4" fontWeight={'bold'}>Comments</Typography>
        <TextField
            value={value}
            onChange={handleChange}
            helperText={errorvalue}
            label="Comment"
            error={error}
            variant="outlined"
            multiline
            rows={10}
            sx={{
                // Change border color
                '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: 'white', // Default border color
                },
                '&:hover fieldset': {
                    borderColor: 'white', // Border color when hovered
                },
                '&.Mui-focused fieldset': {
                    borderColor: 'white', // Border color when focused
                },
                },
                // Change text color
                '& .MuiInputBase-input': {
                color: 'white', // Text color
                },
                // Change placeholder color
                '& .MuiInputBase-input::placeholder': {
                color: 'white', // Placeholder color
                opacity: 1, 
                },
                // Change label color
                '& .MuiInputLabel-root': {
                color: 'grey',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                color: 'white', // Label color when focused
                },
            }}
    />

        <Box width={'100%'}  display={'flex'} justifyContent={'flex-end'}>
        <Button onClick={handlesubmit} variant="contained" size="large">Submit</Button>
        </Box>
    </Box>
    
    </>
}