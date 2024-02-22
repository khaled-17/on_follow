import React, { useState,useEffect } from 'react'

import Spinner from "./Spinner.jsx";
import MasonryLayout from './MasonryLayout.jsx';

import { client } from "../client.js";
import { feedQuery, searchQuery } from '../utils/data';
import { useParams } from 'react-router-dom';
  function Feed() {

  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState();
  // console.log("🚀 ~ Feed ~ pins:", pins)


  const {categoryID}=useParams();
  useEffect(() => {

    if (categoryID) {
      setLoading(true)
      const query=searchQuery(categoryID)
      client.fetch(query).then((data)=>{
        setPins(data)
        setLoading(false)

        // console.log("🚀 ~ client.by category id :", data)


      })

      
      
    }else {
      setLoading(true);

      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);

        // console.log("🚀 ~ client.fetch all ~ data:", data)
 
      });
    }
    


    
  }, [categoryID]);

if (loading) {
  return <Spinner message={'We are adding ideas to your feed!'} />
}
if (!pins||pins?.length==0) {
  return <div className='flex flex-col justify-center items-center pt-4'>
    <h3 className='text-center text-cyan-700 text-3xl'>
    no  ideas to your feed!
    </h3>
  </div>
}


  return (
    <div>
 
       {pins&&(
        <MasonryLayout pins={pins}/>
       )}
    </div>
  )
}

export default Feed
