import { useState } from 'react'
import Login from './Components/Login'
import Home from './container/Home'
 import './App.css'

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useNavigate
} from "react-router-dom";
import { useEffect } from 'react';
 import { fetchUser } from './utils/fetchUser';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route >

      <Route path="/Login" element={<Login />} />
      <Route path="/*" element={<Home />} />
      


    </Route>
  )
);



function App() {
 


  return (
    <RouterProvider router={router} />

  )
}

export default App
