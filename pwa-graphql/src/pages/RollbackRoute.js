import React, {useEffect, useState} from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import Navbar from "../component/Navbar";
import Home from "./Home";
import Profile from "./Profile";
import NoMatch from "./Error";

export default function RollbackRoute() {
    function PrivateRoute({ children }) {
     const token = localStorage.getItem('token')

    if (token && token != '') {
      return children
    }
    return <Navigate to="/login"/>;
  }
  return(
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<PrivateRoute ><Home/></PrivateRoute>}/>
        <Route path='/home' element={<PrivateRoute ><Home/></PrivateRoute>}/>
        <Route path='/profile' element={<PrivateRoute ><Profile/></PrivateRoute>}/>
      </Routes>
     </>

  )
}