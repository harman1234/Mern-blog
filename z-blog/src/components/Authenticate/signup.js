import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { Box, Button, Stack, TextField, Typography ,Link} from "@mui/material";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import axiosInstance from "../_utilities/axios";
import JSEncrypt from "jsencrypt";
import { useNavigate } from "react-router-dom";


export default function SignUp(){


    return<>
        <Grid container width={'100vw'} padding={'10px'} height={'100vh'}  bgcolor={'whitesmoke'} >
            <Grid size={{xs:12,sm:12,md:'12',lg:4}}><SignUpForm/></Grid>
            <Grid size={8} display={{ xs: 'none', sm: 'none', md: 'none', lg: 'grid' }}><ImageCont /></Grid>

        </Grid>
    </>
}


function ImageCont(){

    return<>
        <Box width={'100%'} height={'100%'} sx={{backgroundColor:'red',
            backgroundImage:'url("https://images.pexels.com/photos/1546912/pexels-photo-1546912.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
            backgroundSize:'cover',
            backgroundPosition:'center',
            display:'flex',
            justifyContent:'flex-end',
            alignItems:'flex-start',
            flexDirection:'column',
            color:'white',
            padding:'50px',
            borderRadius:'20px 0px'
            
        }}>     

            <ArrowOutwardIcon fontSize="large" sx={{
                fontSize:'100px',
                position:'absolute',
                top:'20px',
                right:'20px'
                
            }}/>
             <Typography variant="h2" fontWeight={'bolder'}>UNLOCK YOUR POTENTIAL TODAY!</Typography>
             <Typography variant="body1" lineHeight={'100%'} fontWeight={'medium'}>Join us and start your journey towards success—sign up in just a few clicks! Embrace new opportunities, connect with a vibrant community, and gain access to exclusive resources that will empower you to reach your goals. Whether you’re looking to enhance your skills, network with like-minded individuals, or simply explore new horizons, our platform is designed to help you thrive. Don’t wait—take the first step towards a brighter future now!</Typography>
        </Box>
    </>
}

function SignUpForm(){

    const [firstname,setfirstname] = useState('');
    const [lastname,setlastname] = useState('');
    const [email,setemail] = useState('');
    const [password,setpassword] = useState('');
    const [error,seterror] = useState('');
    const navigate = useNavigate()
    const [key,setkey] = useState(null);
    const encrypt = new JSEncrypt();

    const handlefirstname = (event)=>{setfirstname(event.target.value)}
    const handlelast = (event)=>{setlastname(event.target.value)}
    const handleemail = (event)=>{setemail(event.target.value)}
    const handlepass = (event)=>{setpassword(event.target.value)}

    useEffect(()=>{
        axiosInstance.get('/api-key').then(res=>{setkey(res.data);}).catch(error =>{console.log(error)})
    },[])


    const handleSubmit = ()=>{
        if(key){
            encrypt.setPublicKey(key)
            const encpassword = encrypt.encrypt(password);
            const data = {firstname:firstname,lastname:lastname,email:email,password:encpassword}
            axiosInstance.post('/signup',data).then(res=>{navigate('/login');}).catch(error=>{seterror(error.response.data)});

            

        }
    }
    

    return<>
        <Box padding={'20px'} display={'flex'} gap={'40px'} width={'100%'} height={'100%'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'}>
            <Stack gap={'10px'}>
                <Typography variant="h5" fontWeight={'bold'}>Join Our Website !</Typography>
                <Typography variant="subtitle1" lineHeight={'110%'} textTransform={'capitalize'}>We'd Love to have you join our tema and become part of our journey.</Typography>
                <Typography variant="body2" color="error">{error}</Typography>
            </Stack>
            
            <Stack width={'100%'} gap={'15px'}>
                <TextField variant="outlined" size="small" required onChange={handlefirstname} value={firstname}  label='FirstName'/>
                <TextField variant="outlined" size="small" required onChange={handlelast} value={lastname}  label='LastName'/>
                <TextField variant="outlined" size="small" required onChange={handleemail} value={email}  type="email" autoComplete="current-email" label='Email'/>
                <TextField variant="outlined" required size="small" onChange={handlepass} value={password}  type="password" autoComplete="current-password" label='Password'/>
                <Button variant="contained" onClick={handleSubmit} color="success" disableElevation >SignUp</Button>
            </Stack>
            <Typography variant="caption">If you already have an account? <Link href={'/login'} underline="none">LogIn</Link></Typography>
        </Box>
    </>
}