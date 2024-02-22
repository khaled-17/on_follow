import React from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";

const Alert = () => {

const Log_out=()=>{

    localStorage.clear()
}

  return (
    <div className="w-full bg-yellow-200 border-l-4 border-yellow-500 text-yellow-700 p-2 "  role="alert">
      <p className="font-bold">Alert!</p>
     
<div className='flex flex-row items-center'>
<p>You must login</p>

<Link onClick={Log_out}  className="mx-2" to="/login">
 <FcGoogle/>
</Link>

</div>

    </div>
  );
};

export default Alert;
