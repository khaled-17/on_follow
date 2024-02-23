import React,{useState,useRef,useEffect} from 'react'
import {HiMenu} from 'react-icons/hi'
import {AiFillCloseCircle  } from "react-icons/ai";
import {Link,Route,Routes} from 'react-router-dom'

import {Sidebar ,UserProfile , Login} from '../Components'
import Pins from './Pins';
 import {client} from '../client'
 import logo  from "../assets/logo.png";

import {userQuery} from './../utils/data'
import {useNavigate } from "react-router-dom";
  import { fetchUser } from '../utils/fetchUser';

function Home() {

const [ToggleSideBar, segToogleSideBar] = useState(false);
const scrollRef = useRef(null);

const userinfo=localStorage.getItem('user')!=='undefined' ?  JSON.parse(localStorage.getItem('user')):localStorage.clear();

useEffect(() => {

 
  // console.log("🚀 userinfo?.id:", userinfo?.id)
  

  }, [ToggleSideBar]);


  useEffect(() => {
    
    scrollRef.current.scrollTo(0,0);
   
  }, []);
   
   

  const navigate=useNavigate();

  useEffect(() => {
    const user =fetchUser();
  
   if(!user) navigate('/login')
  
  }, []);
  

 
  return (
    <div className='flex bg-gray-100 md:flex-row flex-col h-screen transaction-height ease-out duration-75'>
     
     
      <div className="hidden border-4  md:flex h-screen flex-initial "> 
 
    
      <Sidebar user={userinfo&&userinfo}/>
       </div>

       <div className="flex md:hidden flex-row ">
        {/* <div className="p-2 w-full flex flex-row justify-between items-center shadow-md"> */}
        <div className="border-4  p-2 border-2  hover:border-gray-950  w-full flex flex-row justify-between items-center shadow-md  ">
 
          <HiMenu fontSize={40} className='cursor-pointer ' onClick={()=>segToogleSideBar(true)} />
           <Link to="/" >
            <img src={logo} alt="logo" className='w-28 ' />
           </Link>
           <Link to={`user-profile/${userinfo?.id}`} >
            <img src={userinfo?.picture} alt="logo" className='w-9 hover:border-1 rounded-lg  ' />
           </Link>
        </div>

       </div>




{ToggleSideBar && (

<div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md  animate-slide-in order-3 border-red-300  z-50">
  <div className="absolute w-full flex justify-end items-center p-2">
    <AiFillCloseCircle fontSize={30} onClick={()=>segToogleSideBar(false)}/>
  </div>
  
  <Sidebar  user={userinfo&&userinfo} closeToggle={segToogleSideBar}/>
</div>
  )}
        <div className='pd-2 flex-1 h-screen overflow-y-scroll ' ref={scrollRef}>  


        {ToggleSideBar && (

          
           <div onClick={()=>segToogleSideBar(false)} 
          className='fixed h-screen w-screen bg-white z-40 opacity-90'>
        </div> 

        )}
<Routes>
  <Route path='/*' element={<Pins user={userinfo&&userinfo} />}  />
  <Route path='/user-profile/:userId' element={<UserProfile />}>
 
  </Route>
</Routes>
        </div>
    </div>
  )
}

export default Home
