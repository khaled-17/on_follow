import React,{useState,useEffect} from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import {FcGoogle} from 'react-icons/fc' 
import share from '../assets/share.mp4'
import logo from '../assets/logowhite.png'
 import LoginByGoogle from './LoginByGoogle'
 import {client} from "../client"
 
function Login() {

  const navigate = useNavigate();


 

  function myCallback(data) {


    // console.log('localStorage  1');
    localStorage.setItem('user', JSON.stringify(data.profile));
    // console.log('localStorage 2');

    // console.log("🚀 ~ myCallback ~ data:", data.profile)

    const {name,picture,id}=data?.profile

const doc={
  _id:id,
  _type:"user",
  userName:name,
  image:picture
}
// console.log("🚀 ~ myCallback ~ doc:", doc)

client.createIfNotExists(doc).then(()=>{
  navigate("/");
  // console.log("-sdfssdfsdf");

})



   }


  const Browseasguest=()=>{

    localStorage.setItem('user', JSON.stringify({
      id: "0132d9f1-ce1a-4f9c-a91c-7e00567c3bd3",
      email: "Guest",
      verified_email: false,
      name: "Guest",
      given_name: "Guest",
      family_name: "itsme",
      picture: "https://media.istockphoto.com/id/1384432191/vector/podcast-people-with-microphone-vector-outline-icon-template.jpg?s=612x612&w=0&k=20&c=lohh92tdpERiihU-0aKYgdupyLCDsrdTr4_sDe1Izow=",
      locale: "ar"
    }));

    navigate("/");





  }

    
  return (
    <div className='flex justify-start items-center flex-col h-screen w-screen'>
     

     <div className="relative w-full h-full">
        <video
        
        src={share}
        loop
        controls={false}
        muted
        
        autoPlay
        className='w-full h-full object-cover'
        />

<div className='absolute flex flex-col justify-center items-center top-0 bottom-0 right-0 left-0 bg-blackOverlay'>

<div className='p-5'>

          <Typewriter text="Welcome to follow.com" delay={50} />
 
 </div>

<div className='shadow-inner'>

<LoginByGoogle callback={myCallback}/>

 <button onClick={Browseasguest} className='bg-white rounded-lg w-48 m-3 p-3'>Browse as a guest</button>

     

</div>
</div>

     </div>

     



    </div>
  )
}

export default Login



const Typewriter = ({ text, delay }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
  
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);
  return <h1 className='text-white text-4xl'>{currentText}</h1>;
};

 
 
// استخدم المكون في التطبيق
 
// "You have created a new client application that uses libraries for user authentication or authorization that are deprecated.
//  New clients must use the new libraries instead.
//  See the [Migration Guide](https://developers.google.com/identity/gsi/web/guides/gis-migration) for more information."