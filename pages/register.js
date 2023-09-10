import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Loader } from '../Common/Loader';
import ToastMsg from '../Common/ToastMsg';
import { registerApi } from '../service/service';


const Register = () => {
  const router = useRouter()
  const [formInput, setFormInput] = useState({})
  const [loader, setLoader] = useState(false)

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formInput?.first_name) {
      ToastMsg("First Name is Required", "error")
      return;
    }
    if (!formInput?.last_name) {
      ToastMsg("Last Name is Required", "error")
      return;
    }
    if (!formInput?.username) {
      ToastMsg("Username is Required", "error")
      return;
    }
    if (!formInput?.email) {
      ToastMsg("Email is Required", "error")
      return;
    }
    if(!formInput?.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3}$/)){
      ToastMsg("Enter a valid email", "error")
      return;
    }
    if (!formInput?.password) {
      ToastMsg("Password is Required", "error")
      return;
    }
    setLoader(true)
    registerApi(formInput).then((res) => {
      setLoader(false)
      ToastMsg("Registration Complete", "success")
      router.push("/login")
    }).catch((err) => {
      setLoader(false)
      let error = "something went wrong"
      if (err?.response?.data?.email?.length > 0) {
        error = err?.response?.data?.email[0];

      }
      if (err?.response?.data?.username?.length > 0) {
        error = err?.response?.data?.username[0];
      }
      ToastMsg(error, "error")

    })
  }
  return (
    <div className='flex h-[90vh] justify-center items-center'>
      {loader ? <Loader /> : null}
      <div className='flex-colomn w-[90%] text-center'>
        <h1 className='text-[48px] justify-center'>Register Here</h1>
        <form onSubmit={handleSubmit}>
          <div className='w-4/12 mx-auto flex my-3 items-center border-b-[1px] border-primary px-1'>
            <input value={formInput?.first_name} maxLength={35} name="first_name" type='text' className='bg-transparent w-full py-4 font-light text-lg outline-none  placeholder:font-montserrat font-montserrat' onChange={handleInput} placeholder='Enter First Name ' />
          </div>
          <div className='w-4/12 mx-auto flex my-3 items-center border-b-[1px] border-primary px-1'>
            <input value={formInput?.last_name} maxLength={35} name="last_name" type='text' className='bg-transparent w-full py-4 font-light text-lg outline-none  placeholder:font-montserrat font-montserrat' onChange={handleInput} placeholder='Enter Last Name ' />
          </div>
          <div className='w-4/12 mx-auto flex my-3 items-center border-b-[1px] border-primary px-1'>
            <input value={formInput?.username} maxLength={35} name="username" type='text' className='bg-transparent w-full py-4 font-light text-lg outline-none  placeholder:font-montserrat font-montserrat' onChange={handleInput} placeholder='Enter username' />
          </div>
          <div className='w-4/12 mx-auto flex my-3 items-center border-b-[1px] border-primary px-1'>
            <input value={formInput?.email} maxLength={35} name="email" type='text' className='bg-transparent w-full py-4 font-light text-lg outline-none  placeholder:font-montserrat font-montserrat' onChange={handleInput} placeholder='Enter Email' />
          </div>
          <div className='w-4/12 mx-auto flex my-3 items-center border-b-[1px] border-primary px-1'>
            <input value={formInput?.password} maxLength={50} name="password" type='password' className='bg-transparent w-full py-4 font-light text-lg outline-none  placeholder:font-montserrat font-montserrat' onChange={handleInput} placeholder='Enter Password ' />
          </div>

          <button className='px-[50px] py-[0.35rem] bg-primary/10 text-primary border-primary my-4 text-md hover:bg-primary/30' style={{ border: "solid 0.5px", fontWeight: "400" }} type="submit" >Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Register
