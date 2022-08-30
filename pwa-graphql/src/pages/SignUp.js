import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useLazyQuery,useMutation} from "@apollo/client";
import {CREATE_USER} from "../Graph-ql/mutation";

export default function SignUp() {
  const [userData, setUserData] = useState({email: '', password: '', confirmPassword: ''})
  const [errorFlag,setErrorFlag] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const [createUser,{loading,error,data}] = useMutation(CREATE_USER)
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const {value, name} = e.target
    setUserData({...userData, [name]: value})

  }

  const handelSubmit = async () => {
    if(userData.email == '' && userData.password == '' && userData.confirmPassword == ''){
      setErrorFlag('*All Field are Mandatory!')
    }else if(userData.email == ''){
      setErrorFlag('*Email Field is Required!')
    }else if(userData.password == ''){
      setErrorFlag('*Password Field is Required!')
    }else if(userData.confirmPassword == ''){
      setErrorFlag('*Confirm-Password Field is Required!')
    }else if (userData.password != userData.confirmPassword) {
      setErrorFlag('*Password and confirm-password both are same!')
    }else{
      setErrorFlag('')
      await createUser({variables : {newData: userData}}).then((res) => {
        localStorage.setItem("token",res.data.CreateUser.token)
        navigate('/')
        console.log("res",res)
      }).catch((error) => {
        console.log("error",error)
      })


    }
  }
  const PasswordIndicator = (key) => {
    if (key == 1) return setPasswordVisible(!passwordVisible)
    setConfirmPasswordVisible(!confirmPasswordVisible)
  }

  return (
    <div className="h-screen flex">
      <div className=" lg:flex w-full lg:w-1/2 login_img_section hidden
          justify-around items-center">

        <div className="w-full mx-auto px-20 flex-col items-center space-y-6 select-none cursor-none">
          <h1 className="text-white font-bold text-4xl font-sans">GraphQl-PWA</h1>
          <p className="text-white mt-1 text-2xl capitalize font-thin font-mono">The Purpose of this Web App to Give a
            Complete Reference of uses graphql and Progressive web app</p>

        </div>
      </div>
      <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
        <div className="w-full px-8 md:px-32 lg:px-24">
          <form className="bg-white rounded-md shadow-2xl p-5">
           {errorFlag != '' &&  <div className="text-center mx-auto bg-red-200 rounded-xl shadow border py-3 my-3">
              <p className="text-base text-red-800 font-bold mx-2">
                {errorFlag}
              </p>
            </div>}
            <h1 className="text-gray-800 font-bold text-2xl mb-1 text-center">Sign-In</h1>
            <p className="text-sm font-normal text-gray-600 mb-8 text-center">Welcome Back</p>
            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
              </svg>
              <input id="email" className=" pl-2 w-full outline-none border-none" type="email" name="email"
                     placeholder="Email Address" onChange={handleInputChange}/>
            </div>
            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl ">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                   fill="currentColor">
                <path fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"/>
              </svg>
              <input className="pl-2 w-full outline-none border-none" type={passwordVisible ? 'text' : 'password'}
                     name="password" id="password"
                     placeholder="Password" onChange={handleInputChange}/>
              {!passwordVisible ? <svg className="h-5 w-5 fill-gray-400" onClick={() => PasswordIndicator(1)}
                                       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path
                    d="M279.6 160.4C282.4 160.1 285.2 160 288 160C341 160 384 202.1 384 256C384 309 341 352 288 352C234.1 352 192 309 192 256C192 253.2 192.1 250.4 192.4 247.6C201.7 252.1 212.5 256 224 256C259.3 256 288 227.3 288 192C288 180.5 284.1 169.7 279.6 160.4zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM288 112C208.5 112 144 176.5 144 256C144 335.5 208.5 400 288 400C367.5 400 432 335.5 432 256C432 176.5 367.5 112 288 112z"/>
                </svg>
                : <svg className="h-5 w-5 fill-gray-400" onClick={() => PasswordIndicator(1)}
                       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                  <path
                    d="M150.7 92.77C195 58.27 251.8 32 320 32C400.8 32 465.5 68.84 512.6 112.6C559.4 156 590.7 207.1 605.5 243.7C608.8 251.6 608.8 260.4 605.5 268.3C592.1 300.6 565.2 346.1 525.6 386.7L630.8 469.1C641.2 477.3 643.1 492.4 634.9 502.8C626.7 513.2 611.6 515.1 601.2 506.9L9.196 42.89C-1.236 34.71-3.065 19.63 5.112 9.196C13.29-1.236 28.37-3.065 38.81 5.112L150.7 92.77zM223.1 149.5L313.4 220.3C317.6 211.8 320 202.2 320 191.1C320 180.5 316.1 169.7 311.6 160.4C314.4 160.1 317.2 159.1 320 159.1C373 159.1 416 202.1 416 255.1C416 269.7 413.1 282.7 407.1 294.5L446.6 324.7C457.7 304.3 464 280.9 464 255.1C464 176.5 399.5 111.1 320 111.1C282.7 111.1 248.6 126.2 223.1 149.5zM320 480C239.2 480 174.5 443.2 127.4 399.4C80.62 355.1 49.34 304 34.46 268.3C31.18 260.4 31.18 251.6 34.46 243.7C44 220.8 60.29 191.2 83.09 161.5L177.4 235.8C176.5 242.4 176 249.1 176 255.1C176 335.5 240.5 400 320 400C338.7 400 356.6 396.4 373 389.9L446.2 447.5C409.9 467.1 367.8 480 320 480H320z"/>
                </svg>
              }

            </div>
            <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                   fill="currentColor">
                <path fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"/>
              </svg>
              <input className="pl-2 w-full outline-none border-none"
                     type={confirmPasswordVisible ? 'text' : 'password'} name="confirmPassword"
                     id="password"
                     placeholder="Confirm Password" onChange={handleInputChange}/>
              {!confirmPasswordVisible ? <svg className="h-5 w-5 fill-gray-400" onClick={() => PasswordIndicator(2)}
                                              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path
                    d="M279.6 160.4C282.4 160.1 285.2 160 288 160C341 160 384 202.1 384 256C384 309 341 352 288 352C234.1 352 192 309 192 256C192 253.2 192.1 250.4 192.4 247.6C201.7 252.1 212.5 256 224 256C259.3 256 288 227.3 288 192C288 180.5 284.1 169.7 279.6 160.4zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM288 112C208.5 112 144 176.5 144 256C144 335.5 208.5 400 288 400C367.5 400 432 335.5 432 256C432 176.5 367.5 112 288 112z"/>
                </svg>
                : <svg className="h-5 w-5 fill-gray-400" onClick={() => PasswordIndicator(2)}
                       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                  <path
                    d="M150.7 92.77C195 58.27 251.8 32 320 32C400.8 32 465.5 68.84 512.6 112.6C559.4 156 590.7 207.1 605.5 243.7C608.8 251.6 608.8 260.4 605.5 268.3C592.1 300.6 565.2 346.1 525.6 386.7L630.8 469.1C641.2 477.3 643.1 492.4 634.9 502.8C626.7 513.2 611.6 515.1 601.2 506.9L9.196 42.89C-1.236 34.71-3.065 19.63 5.112 9.196C13.29-1.236 28.37-3.065 38.81 5.112L150.7 92.77zM223.1 149.5L313.4 220.3C317.6 211.8 320 202.2 320 191.1C320 180.5 316.1 169.7 311.6 160.4C314.4 160.1 317.2 159.1 320 159.1C373 159.1 416 202.1 416 255.1C416 269.7 413.1 282.7 407.1 294.5L446.6 324.7C457.7 304.3 464 280.9 464 255.1C464 176.5 399.5 111.1 320 111.1C282.7 111.1 248.6 126.2 223.1 149.5zM320 480C239.2 480 174.5 443.2 127.4 399.4C80.62 355.1 49.34 304 34.46 268.3C31.18 260.4 31.18 251.6 34.46 243.7C44 220.8 60.29 191.2 83.09 161.5L177.4 235.8C176.5 242.4 176 249.1 176 255.1C176 335.5 240.5 400 320 400C338.7 400 356.6 396.4 373 389.9L446.2 447.5C409.9 467.1 367.8 480 320 480H320z"/>
                </svg>
              }
            </div>
            <button type="button"
                    className="block w-full bg-green-600 mt-5 select-none py-2 rounded-2xl hover:bg-green-800 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                    onClick={handelSubmit}>Sign-Up
            </button>
            <div className="flex justify-end mt-4">
              <a href="#"
                 className=" select-none text-sm ml-2 hover:text-green-600 cursor-pointer hover:-translate-y-1 duration-500 transition-all"><Link
                to='/login'>Already
                have an account?</Link></a>
            </div>

          </form>
        </div>

      </div>
    </div>
  )
}