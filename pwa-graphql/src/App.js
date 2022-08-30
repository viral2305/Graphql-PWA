import React, {useEffect, useState} from "react";
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route,Navigate,Outlet } from "react-router-dom";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import RollbackRoute from "./pages/RollbackRoute";
import NoMatch from "./pages/Error";




function App() {

  function PrivateRoute({ children }) {
    const token = localStorage.getItem('token')

    if (token && token != '') {
      return <Navigate to="/login"/>
    }
    return children;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LogIn/>}/>
        <Route path='/sign-in' element={<SignUp/>}/>
        <Route path='/*' element={<RollbackRoute/>}/>
      </Routes>

      <Outlet/>
    </BrowserRouter>
  );
}

export default App;
