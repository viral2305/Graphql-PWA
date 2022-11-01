import React, {useState} from "react";
import {Link,useNavigate,useLocation} from "react-router-dom";

export default function Navbar() {
  const [menuOpen,setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const menu = [
    {name: 'Home',path:'/'},
    {name: 'Profile',path:'/profile'},
    {name: 'View',path:'/view'},
    {name: 'LogOut',path:'/login'},
  ]

  const handleClick = (path) => {
    if(path === '/login'){
      localStorage.removeItem('token')
    }
    navigate(path)
  }
  const getPathName = () => {
    return location.pathname
  }
  return(
    <>
    <div className='w-full bg-green-200 h-14 flex items-center justify-between'>
      <p className='text-green-900 font-bold text-2xl md:text-3xl mx-6 ont-thin font-mono select-none cursor-pointer'><Link to='/'>GraphQl-PWA</Link></p>
      <div className='hidden md:flex flex-row h-14 items-center'>
        <ul className=' font-bold no-underline text-lg font-mono select-none flex flex-row text-green-800 items-center '>
          {menu?.map((ele,index)=>(
            <li key={index} className={`list-item mx-5 px-2.5 py-2 cursor-pointer ${getPathName() === ele?.path ? 'logout-button':''}`} onClick={()=> handleClick(ele?.path)}>{ele?.name}</li>
          ))}
        </ul>
        <button className="rounded-3xl text-green-200 mx-5 shadow-none p-2 bg-green-800  text-lg rounded-full ring-1 ring-green-800 cursor-pointer">
          <svg
            className="w-6 h-6 "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </button>

      </div>
      <button className=' mx-6 md:hidden' onClick={() => setMenuOpen(!menuOpen)}>
        <svg className="select-none fill-green-800 w-6 h-8 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"/></svg>
      </button>


    </div>
    <div className={menuOpen ? 'flex w-full h-full bg-green-200 top-0 fixed sticky-0 md:hidden' : 'hidden' }>
      <button onClick={() => setMenuOpen(!menuOpen)}>
        <svg className=" w-8 h-8 sm:w-12 sm:h-12 absolute right-2 top-2 fill-green-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>
      </button>
      <ul className='no-underline text-lg font-sans flex flex-col text-green-800 items-center mt-5'>
        {menu?.map((ele,index)=>(
            <li key={index} className={`list-item mx-5 my-1 px-2.5 py-2 ${getPathName() === ele?.path ? 'logout-button':''}`} onClick={() => {setMenuOpen(!menuOpen); handleClick(ele?.path,)}}>{ele?.name}</li>
        ))}
      </ul>
    </div>
  </>
  )

}