import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddUser = () => {

  const navigate = useNavigate()

  const [input, setInput] = useState({
    fname: "",
    lname: "",
    email: ""
  })

  const inputHandler = (e) => {
    const {name, value} = e.target;
    setInput({...input, [name]:value})
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:5000/users', input)
    navigate('/')
  }

  return (
    <div>
      <div className='w-[400px] h-y-auto bg-[#252529] p-5 rounded'>
        <h1 className='text-white text-center mb-4 text-2xl font-bold'>Add User</h1>
      <form onSubmit={submitHandler} className='flex flex-col gap-3'>
        <input className='rounded text-black outline-none py-2 px-4 ' type="text" name="fname" placeholder='First Name' onChange={inputHandler}/>
        <input className='rounded text-black  outline-none py-2 px-4 ' type="text" name="lname" placeholder='Last Name' onChange={inputHandler}/>
        <input className='rounded text-black  outline-none py-2 px-4 ' type="email" name="email" placeholder='Email' onChange={inputHandler}/>
        <button className='px-4 py-2 bg-blue-700 rounded text-white font-bold' type='submit'>Submit</button>
      </form>
    </div>
    </div>
  )
}

export default AddUser
