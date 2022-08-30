import React, {useState} from "react";
import InputField from "../component/ProfielInputField";

export default function Profile() {
  const [user, setUser] = useState({'name': 'viral sangani','number': '9328889307', 'email': 'viral@gmail.com', 'password': '12344321'});
  const [open, setOpen] = useState({'name': false,'number': false, 'email': false, 'password': false});

  const openEdit = (key) => {
    if(key == 1){
      setOpen({'name': true,'number': false, 'email': false, 'password': false})
    }else if(key == 2){
      setOpen({'name': false,'number': true, 'email': false, 'password': false})
    }else if(key == 3){
      setOpen({'name': false,'number': false, 'email': true, 'password': false})
    }else if(key == 4){
      setOpen({'name': false,'number': false, 'email': false, 'password': true})
    }
  }
  const closeInput = () => {
    setOpen(false)
  }

  const valueChange = (value) => {
    console.log('value',value)
  }
  return (
    <>
      <div className='center'>
        <div className='w-9/12'>
          <img className='w-full rounded-t-lg h-80'
               src='https://images.unsplash.com/photo-1614531341773-3bff8b7cb3fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'/>
          <InputField inputLabel='Edit your Name' inputType='text' fieldName='name' openEdit={openEdit} closeInput={closeInput} open={open.name} inputKey='1' value={user.name} valueChange={valueChange}  />
          <InputField inputLabel='Edit your Mobile Number' inputType='number' fieldName='Mobile Number' openEdit={openEdit} closeInput={closeInput} open={open.number} inputKey='2' value={user.number} valueChange={valueChange} />
          <InputField inputLabel='Edit your Email' inputType='text' fieldName='email' openEdit={openEdit} closeInput={closeInput} open={open.email} inputKey='3' value={user.email} valueChange={valueChange} />
          <InputField inputLabel='Edit your password' inputType='password' fieldName='password' openEdit={openEdit} closeInput={closeInput} open={open.password} inputKey='4' value={user.password} valueChange={valueChange} />

        </div>


      </div>
    </>
  )
}