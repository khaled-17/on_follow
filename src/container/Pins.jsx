import React, { useEffect, useState } from 'react'
 
import {Search,CreatePin,Feed,Navbar,PinDetal} from '../Components';
import { Routes ,Route} from 'react-router-dom';
  
function Pins({user }) {
 
  const [searchTerms, setSearchTerms] = useState('');



  return (
    <div className=' px-2 md:px-5'>
      <div className="bg-gray-50">
        
        <Navbar searchTerms={searchTerms} setSearchTerms={setSearchTerms} user={user && user} />
        </div>       
 <div className="h-full">
   <Routes>
    <Route  path='/' element={<Feed/>} />
    <Route  path='/category/:categoryID' element={<Feed />} />
    <Route  path='/pin-details/:pinId' element={<PinDetal user={user&&user}/>} />
    <Route  path='/Create-pin' element={<CreatePin user={user&&user}/>} />
    <Route  path='/search' element={<Search searchTerm={searchTerms} setSearchTerms={setSearchTerms}/>} />

   </Routes>
 </div>
    </div>
  )
}

export default Pins
