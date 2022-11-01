import React, {useRef, useState} from "react";
import InputField from "../component/ProfielInputField";
import {useMutation, useQuery} from "@apollo/client";
import {EDIT_PROFILE} from "../Graph-ql/mutation";
import {GET_USER_BY_TOKEN} from "../Graph-ql/queires";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Profile() {
  const [user, setUser] = useState({'name': 'Set Name','mobile': 'Set Mobile Number', 'email': '', 'password': ''});
  const [open, setOpen] = useState({'name': false,'mobile': false, 'email': false, 'password': false});
  const {getProfile,loading,error,data} = useQuery(GET_USER_BY_TOKEN,{
    context: {
      headers: {
        authorization: localStorage.getItem("token") || ""
      }
    },
    onCompleted(data){
      setUser({'name':data.user.name != '' && data.user.name != null ? data.user.name : 'Set Name','mobile': data.user.mobile != '' && data.user.mobile != null ? data.user.mobile : 'Set Mobile','email': data.user.email != '' && data.user.email != null ? data.user.email : 'Set Email','password': data.user.password != '' && data.user.password != null ? data.user.password : 'Set Password'})
    }
  })
  const [updateUser,{updateLoading,updateError,updateData}] = useMutation(EDIT_PROFILE)

  const openEdit = (key) => {
    if(key == 1){
      setOpen({'name': true,'mobile': false, 'email': false, 'password': false})
    }else if(key == 2){
      setOpen({'name': false,'mobile': true, 'email': false, 'password': false})
    }else if(key == 3){
      setOpen({'name': false,'mobile': false, 'email': true, 'password': false})
    }else if(key == 4){
      setOpen({'name': false,'mobile': false, 'email': false, 'password': true})
    }
  }
  const closeInput = () => {
    setOpen({'name': false,'mobile': false, 'email': false, 'password': false})
  }

  const valueChange = (key,value) => {

    setUser({...user,[key]: value })

  }
  const editProfile = async (value,key) => {
    await updateUser({
      context: {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      },
      variables: {newData: value}
    }).then((res) => {
      console.log('toast')
        toast.success("Successfully saved profile", {
          position: toast.POSITION.TOP_CENTER
        });
        setUser({'name':res.data.UpdateUser.name != '' && res.data.UpdateUser.name != null ? res.data.UpdateUser.name : 'Set Name','mobile': res.data.UpdateUser.mobile != '' && res.data.UpdateUser.mobile != null ? res.data.UpdateUser.mobile : 'Set Mobile','email': res.data.UpdateUser.email != '' && res.data.UpdateUser.email != null ? res.data.UpdateUser.email : 'Set Email','password': res.data.UpdateUser.password != '' && res.data.UpdateUser.password != null ? res.data.UpdateUser.password : 'Set Password'})
        closeInput()
      }
      )
  }


  return (
    <>
      <div className='center'>
        <div className='w-9/12'>
          <img className='w-full rounded-t-lg h-80'
               src='https://images.unsplash.com/photo-1614531341773-3bff8b7cb3fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'/>
          <InputField inputLabel='Edit your Name' inputType='text' fieldName='name' openEdit={openEdit} closeInput={closeInput} open={open.name} Key='1' value={user.name} valueChange={valueChange} saveBtn={editProfile}  />
          <InputField inputLabel='Edit your Mobile Number' inputType='number' fieldName='mobile' openEdit={openEdit} closeInput={closeInput} open={open.mobile} Key='2' value={user.mobile} valueChange={valueChange} saveBtn={editProfile} />
          <InputField inputLabel='Edit your Email' inputType='text' fieldName='email' openEdit={openEdit} closeInput={closeInput} open={open.email} Key='3' value={user.email} valueChange={valueChange} saveBtn={editProfile} />
          <InputField inputLabel='Edit your password' inputType='password' fieldName='password' openEdit={openEdit} closeInput={closeInput} open={open.password} Key='4' value={user.password} valueChange={valueChange} saveBtn={editProfile} />

        </div>
        <ToastContainer />


      </div>
    </>
  )
}