import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Index from './components';
import { createContext, useEffect, useMemo, useState } from 'react';
import LoginPage from './components/Authenticate/login';
import axios from 'axios';
import axiosInstance from './components/_utilities/axios';
import Editor from './components/_utilities/editor/editor';
import Create from './components/blogoperations/create/create';
import EditBlog from './components/blogoperations/edit/edit';
import SignUp from './components/Authenticate/signup';

export const MainContext = createContext();


function App() {
  const [Login,setLogin] = useState(false);
  const [user, setUser] = useState({id:0,firstName:'U',lastName:'U',email:'',Like_count:0,comment_count:0,Author_status:false}); 
  const [message,setMessage] = useState('');
  const [Snackstate,setSnackstate] = useState(false);

  useEffect(()=>{
    const token =  localStorage.getItem('token');
    if(token){

      axiosInstance.get('/token/verify').then(resp=>{if(resp.status == 200){
        axiosInstance.get('/user/profile/self').then((resp) => {setUser(resp.data);setLogin(true);}).catch((error) => {console.log(error);});
      
      }}).catch((error)=>{
        // localStorage.removeItem('token')
        if(error.response && error.response.status == 401){
          localStorage.removeItem('token');

        }
      })

    }


  },[Login])



  return (
    <MainContext.Provider value={{Snackstate,setSnackstate,user,Login,setLogin,message,setMessage}}>
      <Router>
        <Routes>
            
            <Route path='/*' element={<Index/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            {user.Author_status ? <Route path="/create" element={<Create/>}/>:''}
            {user.Author_status ? <Route path="/edit/:id" element={<EditBlog/>}/>:''}

        </Routes>
      </Router>
    </MainContext.Provider>
  );
}

export default App;
