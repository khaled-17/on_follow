import React from 'react'

import {MutatingDots }   from "react-loader-spinner";

function Spinner({message}) {
  return (
    <div className='flex flex-col justify-center items-center h-full w-full'>
      <MutatingDots 
  visible={true}
  width="100"
  color="black"
   />
  <p className='p-3 text-lg'>{message}</p>
    </div>
  )
}

export default Spinner
