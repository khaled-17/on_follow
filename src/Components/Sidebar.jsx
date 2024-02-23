import React from 'react'

import logo from '../assets/logo.png'
import { Link, NavLink ,} from 'react-router-dom'
import {RiHomeFill} from 'react-icons/ri'
import { categories } from "../utils/data";

import { googleLogout } from '@react-oauth/google';


function Sidebar({user,closeToggle}) {


 
const handleCloseSideBar=()=>{

  if(closeToggle)closeToggle(false)

}


 const pending = 'flex  items-center  px-5 gap-3 text-gray-500   hover:text-black transition-all duration-200 ease-in-out capitalize';
const active   = 'flex  items-center px-5 gap-3 font-extrabold border-r-2 animate-bounce border-black  transition-all duration-200 ease-in-out capitalize';



const theLogout =()=>{
  googleLogout()
  window.location.reload();

  localStorage.clear()
 
}
 

 
   return (
    // <div className='   border-4 border-red-300  flex flex-col justify-between bg-white h-full overflow-scroll min-w-210 hide-scrollbar '>
    <div className="flex flex-col justify-between  hover:bg-gray-100 h-full overflow-y-scroll min-w-210 hide-scrollbar ">

     <div className='flex flex-col  '>
<Link 
to="/" 
 className="flex px-5 gap-2 my-6 pt-1  w-190 items-center "
onClick={handleCloseSideBar} 
>
<img src={logo} alt=""  className='w-full'/>
</Link>

<NavLink
 to="/"
className={({ isActive, isPending }) =>
isPending ? pending : isActive ? active : pending
}

onClick={handleCloseSideBar}
>
<RiHomeFill/>
HOME 
</NavLink>
 
 <h3 className='mt-2 px-5 text-base 2xl:text-xl '> categories</h3>


{categories.map((cat)=>(

<NavLink
 to={`/category/${cat.name}`}
className={({ isActive, isPending }) =>
isPending ? pending : isActive ? active : pending
}
key={cat.name}
onClick={handleCloseSideBar}
>
  <img src={cat.image} className='h-7 w-7 rounded-full  my-1' alt="" />
 {cat.name} 
</NavLink>



))}
      </div>

{user&&(
  <>
  
  <Link
  to={`/user-profile/${user?.id}`}
  className='flex mb-3 w-4/6 mx-3 gap-3 p-2 items-center  bg-white shadow-2xl rounded-lg flex-wrap '
  
  >
  
  <img    onClick={handleCloseSideBar} src={user?.picture} className='h-10 w-10 rounded-full' alt="" />
  <p   onClick={handleCloseSideBar} >{user?.name}</p>
 


  < Link
  
 onClick={theLogout}  to={'/'}
className=' border border-3  text-red-900  hover:border-red-500 rounded-md m-1 px-2 ' >LogOut</Link>
 
 
  </Link>

    </>
  
)}

    </div>
  )
}

export default Sidebar
 