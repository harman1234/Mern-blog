import React, { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MyAvatar from "../_utilities/avatar";
import { Dialog, DialogActions,FormControlLabel,Checkbox, DialogContent, DialogTitle, IconButton, Modal, Chip } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import axiosInstance from "../_utilities/axios";
import { MainContext } from "../../App";
import CloseIcon from '@mui/icons-material/Close';

export default function Profile() {
  const [open, setOpen] = useState(false); // Initialize context.user as null
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const context = useContext(MainContext)
  const logout = ()=>{
    localStorage.removeItem('token');
    context.setLogin(false);
  }


  return (
    <>
      <div>
        {context.user && (
          <Button variant="text" onClick={handleOpen}>
            <MyAvatar>{context.user.firstName ? context.user.firstName : 'U'}</MyAvatar>
          </Button>
        )}

        <Modal open={open} onClose={handleClose} paperProps={{sx:{}}}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              backgroundColor:'#1c1c1c',
              background:'#1c1c1c',
              transform: 'translate(-50%, -50%)',
              color:'white',
              width: { xs: "100vw", md: "70vw", lg: "32vw" },
              maxWidth: '500px',
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
              textAlign: 'center',
              display: 'flex',
              gap: '20px',
              flexDirection: 'column',
              borderRadius: '20px'
            }}
          >
            <Box display={'flex'} sx={{position:'absolute',top:'10px',right:'10px'}} justifyContent={'flex-end'} alignItems={'center'}><IconButton onClick={handleClose} sx={{color:'white'}} size="large" ><CloseIcon/></IconButton></Box>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <MyAvatar sx={{ height: '100px', width: '100px',fontSize:'3rem' }}>
                {context.user ? context.user.firstName[0] : 'U'}
              </MyAvatar>
            </Box>

            {context.user ? (
              <div>
                <Typography variant="h4" sx={{textTransform:'capitalize', marginBottom:'10px'}}>{context.user.firstName} {context.user.lastName}</Typography>
                <Chip variant="outlined"  size="large" color='success' label={context.user.email} />
              </div>
            ) : (
              <div>Loading...</div> // You can display a loading message or spinner
            )}

            <Box display={'flex'} justifyContent={'space-evenly'} alignItems={'center'}>
              <div>
                <Typography variant="body2" fontWeight={'bold'}>Blogs Liked</Typography>
                <Typography variant="h4">{context.user.Like_count}</Typography>
              </div>
              <div>
                <Typography variant="body2" fontWeight={'bold'}>Post Commented</Typography>
                <Typography variant="h4">{context.user.comment_count}</Typography>
              </div>
              <div>
                <Typography variant="body2" fontWeight={'bold'}>Following</Typography>
                <Typography variant="h4">2</Typography>
              </div>
            </Box>
            <Box display={'flex'} gap={"20px"} flexDirection={'column'} width={'100%'} marginTop={'20px'} justifyContent={'center'} alignItems={'center'}>
              <BecomeAuthor/>
              <Button sx={{ width: '80%' }} onClick={logout} variant="contained" endIcon={<LogoutIcon />} color="error">Logout</Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
}


function BecomeAuthor(){
  const [open,setOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, seterror] = useState('');
  const handleopen = ()=>{setOpen(true)}
  const handleclose = ()=>{setOpen(false);setAgreed(false)}
  

  const handleCheckboxChange = (event) => {
    setAgreed(event.target.checked);
  };

  const authorapply = ()=>{
    if(!agreed){
      return seterror('Please agree to our terms and conditions')
    }
    axiosInstance.post('/user/author/apply').then(res=>{if(res.status == 200){
        window.location.reload();
    }}).catch(error=>{})


  }

    return<>
        <Button sx={{ width: '80%' }} onClick={handleopen} variant="outlined">Become an Author</Button>
        <Dialog PaperProps={{
          sx: {
            backgroundColor: '#1c1c1c', // Dark background
            color: '#fff',
            padding:'20px'       // Optional styling
          },
        }} open={open} onClose={handleclose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle>Terms and Conditions for Becoming an Author</DialogTitle>
          <DialogContent sx={{padding:'20px 30px'}}>
          <Typography variant="h6" gutterBottom>
          <strong>Last Updated:</strong> August 1, 2024
        </Typography>

        <Typography variant="body2" gutterBottom>
          By becoming an author on <strong>ZBLOG</strong>, you agree to the following terms:
        </Typography>

        <Typography variant="h6" gutterBottom>
          1. Eligibility
        </Typography>
        <Typography variant="body1" gutterBottom component="ul">
          <li>You must be 18 or older.</li>
          <li>All information provided must be accurate and up to date.</li>
        </Typography>

        <Typography variant="h6" gutterBottom>
          2. Content Ownership
        </Typography>
        <Typography variant="body1" gutterBottom component="ul">
          <li>You retain ownership of your content, but grant ZBLOG a license to use, display, and share it.</li>
          <li>You confirm your content is original and does not infringe on any third-party rights.</li>
        </Typography>

        <Typography variant="h6" gutterBottom>
          3. Content Guidelines
        </Typography>
        <Typography variant="body1" gutterBottom component="ul">
          <li>Content must be respectful, original, and follow ZBLOG standards.</li>
          <li>ZBLOG reserves the right to edit, reject, or remove any content at its discretion.</li>
        </Typography>

        <Typography variant="h6" gutterBottom>
          4. Author Responsibilities
        </Typography>
        <Typography variant="body1" gutterBottom component="ul">
          <li>Submit quality content regularly.</li>
          <li>Disclose any conflicts of interest.</li>
          <li>Engage with the audience professionally and respectfully.</li>
        </Typography>

        <FormControlLabel
        sx={{margin:'20px 0px'}}
          control={
            <Checkbox
              checked={agreed}
              onChange={handleCheckboxChange}
              name="agree"
              color="primary"
            />
          }
          label="By submitting, you agree to these terms and understand that violations may lead to removal from ZBLOG."
        />
        <Typography variant="subtitle2" color="error">{error}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleclose}>Disagree</Button>
            <Button variant="contained" onClick={authorapply} color="primary">Agree</Button>
          </DialogActions>
        </Dialog>
    </>
}