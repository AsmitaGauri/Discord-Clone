import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux'

import './App.css';
import Chat from './components/Chat';
import Login from './components/Login';
import Sidebar from './components/Sidebar';

import {login, selectUser,logout} from './features/userSlice';
import { auth } from './firebase';

function App() {
const dispatch = useDispatch();
const user = useSelector(selectUser);

useEffect(() => {
  
  auth.onAuthStateChanged((authUser)=>{
    if(authUser){
      //loggedin
      dispatch(login({
        uid:authUser.uid,
        photo:authUser.photoURL,
        email:authUser.email,
        displayName:authUser.displayName
      }))
    }else{
      //logged out
      dispatch(logout());
    }
  })
  
}, [])

  return (
    <div className="app">
      {
        user?(
          <>
          <Sidebar/>
      <Chat/>
          </>

        ):(
         <Login/>
        )
      }
      
    </div>
  );
}

export default App;
