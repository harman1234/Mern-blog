import { Dialog, DialogContent, DialogTitle, TextField,Button, Typography,FormControl,Select,InputLabel ,MenuItem, DialogActions} from "@mui/material";
import React, { useRef, useState } from "react";
import axiosInstance from "../../_utilities/axios";




export default function TitleDialog({category,setTitle,setCategory}){

    const [cat,setcat] = useState([])
    const [open,setopen] = useState(true)
    const titleref = useRef(null)
    const [value, setValue] = useState(''); // State to manage the value
    const [error, seterror] = useState(false); // State to manage the value

    
    useState(()=>{
        axiosInstance.get('/categories').then(res=>{setcat(res.data)}).catch(error=>{console.log(error)});
        
    },[])

    const handleChange = (event) => {
        setCategory(event.target.value);
      };
    const handletextChange = (event) => {
        setValue(event.target.value);
      };

    
    const createblog = ()=>{
        if(value.trim() === ''){
            seterror(true)
            
        }else{
            setTitle(value);
            setopen(false);
        }
        

    }
    return<>
        <Dialog open={open} >
            <DialogTitle sx={{width:'100vw'}}>Create new blog</DialogTitle>
            <DialogContent>
                <Typography  variant="body2">Please provide a title and select category of the blog</Typography>
                <TextField value={value} error={error}  helperText={error ? "Title can't be empty" : ''} onChange={handletextChange} sx={{width:'100%',margin:'20px 0px'}} id="title" label="Title" variant="standard" />
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Category"
                    onChange={handleChange}
                >
                    {cat.map(Cat=>(
                        <MenuItem value={Cat.id} >{Cat.category}</MenuItem>
                    ))}
                </Select>
                </FormControl>

            </DialogContent>
            <DialogActions sx={{padding:'20px'}}>
                <Button onClick={createblog} variant='outlined' color="primary">Create Blog</Button>
            </DialogActions>
        </Dialog>
    </>

}