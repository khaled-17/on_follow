import React from "react";



import { IoMdAdd, IoMdSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ searchTerms, setSearchTerms, user }) {
 
  const navigator=useNavigate()
  return (
    <div className="flex gap-3 md:gap-5   w-full mt-5 pd-7">
      <div className="flex justify-start  items-center w-full  outline-none shadow-2xl focus-within:shadow-lg">
        <IoMdSearch fontSize={21} className="ml-2"  />

        <input 
        type="text" 
        value={searchTerms}
        className=" p-1 hover:py-2 ml-2 w-full  bg-white outline-none hover:border-2 hover:border-black rounded-md" 
        onChange={(e)=>setSearchTerms(e.target.value)}
        placeholder="search"
        onFocus={()=>navigator('/search')}

        />
      </div>

      <div className="flex ">
        <Link to={`user-profile/${user?.id}`} className="hidden md:block">dd
          <img src={user?.picture} className="w-14 h-12 rounded-lg hover:-rotate-6  " alt="" />
        </Link>

        <Link to="/create-pin" className="bg-black text-white rounded-lg  w-6 h-12 flex justify-center items-center ">
          <IoMdAdd />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
