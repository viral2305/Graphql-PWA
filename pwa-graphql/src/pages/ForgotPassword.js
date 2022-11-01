import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {FORGOT_PASSWORD} from "../Graph-ql/mutation";
import {fetchGraphQlApi} from "../Graph-ql/api";
import {toast, ToastContainer} from "react-toastify";

export default function ForgotPassword() {
    const [userData, setUserData] = useState({email: '', password: '', confirmPassword: ''})
    const [errorFlag,setErrorFlag] = useState('')
    const [isLogin,setIsLogin] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const {value, name} = e.target
        setUserData({...userData, [name]: value})

    }

    const handelSubmit = async () => {
        if(!isLogin) {
            if (userData.email === '') {
                setErrorFlag('*Please Enter Email!')
            } else {
                setErrorFlag('')
                await fetchGraphQlApi(FORGOT_PASSWORD, {email: userData?.email}).then(res => res.json()).then((res) => {
                    if (res && res.data.ForgotPassword.message === 'success') {
                        toast.success('Your password has been reset, please login with new password', {
                            position: toast.POSITION.TOP_CENTER
                        });
                        setIsLogin(true)
                    } else {
                        toast.error('user not found', {
                            position: toast.POSITION.TOP_CENTER
                        });
                    }
                })
            }
        }
        else {
            navigate('/login')
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
                    <h1 className="text-white font-bold text-4xl font-sans text-center">GraphQl-PWA</h1>
                    <p className="text-white mt-1 text-2xl capitalize font-thin font-mono text-center">The Purpose of this Web App to Give a
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
                        <h1 className="text-gray-800 font-bold text-2xl mb-1 text-center">{isLogin ? "Please login with new password" :"Password reset via Email"}</h1>
                        <p className="text-sm font-normal text-gray-600 mb-8 text-center">Welcome Back</p>
                        {isLogin ? null :<div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                            </svg>
                            <input id="email" className=" pl-2 w-full outline-none border-none" type="email" name="email"
                                   placeholder="Email Address" onChange={handleInputChange}/>
                        </div>}
                        <button type="button"
                                className="block w-full bg-green-600 mt-5 select-none py-2 rounded-2xl hover:bg-green-800 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                                onClick={handelSubmit}>{isLogin ? 'Login':'Reset Password'}
                        </button>

                    </form>
                </div>

            </div>
            <ToastContainer />
        </div>
    )
}