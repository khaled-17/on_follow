import React,{useState,useEffect} from 'react'

import { FcGoogle } from "react-icons/fc";

import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const LoginByGoogle = (props) => {
  


    const navigate = useNavigate();

  const [user, setUser] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  
  const handlLogin = useGoogleLogin({
    onSuccess: (GoogleResponse) => {
        
      setUser(GoogleResponse)
      //  console.log('-----GoogleResponse-----');
      //  console.log(GoogleResponse);


    },
    onError: (error) => console.log("Login Failed:", error)
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {


            // console.log('---- UserProfile-------');
            // console.log(res.data);
            setUserProfile(res.data);

  handleClick({profile:res.data,user:user})
  navigate("/");

        })
        .catch((err) => console.log(err));
    }
  }, [user]);


  function handleClick(data) {
    // Call the callback function when the button is clicked
    props.callback(data);
  }


  return (
          <div className="shadow-2xl">
            <button
              type="button"
               style={{
                backgroundColor: 'white',
                color: 'black',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                outline: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: 'none',
 
              }}

              onClick={handlLogin}
            >
              <FcGoogle style={{marginRight:'14px'}} />
              Sign in with Google
            </button>
          </div>
  );
};

export default LoginByGoogle;