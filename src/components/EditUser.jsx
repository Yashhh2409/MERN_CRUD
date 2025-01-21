import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditUser = () => {

  const navigate = useNavigate()

  const {id} = useParams();

  const [input, setInput] = useState({
    fname:"",
    lname:"",
    email:""
  })

  const inputHandler = (e) => {
    const {name, value} = e.target;
    setInput({...input, [name]:value})
  }

  const prevData = async () => {
    const response = await axios.get(`http://localhost:5000/getdata/${id}`)
    setInput({
      fname: response.data.fname,
      lname: response.data.lname,
      email: response.data.email
    })
    
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/updateuser/${id}`, input)
    navigate('/')
  }

  useEffect(()=>{
    prevData()
  }, [id])

  return (
    <div>
      <div className='w-[400px] h-y-auto bg-[#252529] p-5 rounded'>
      <h1 className='text-white text-center mb-4 text-2xl font-bold'>Update User</h1>
      <form onSubmit={submitHandler} className="flex flex-col gap-3">
        <input
          className="rounded text-black outline-none py-2 px-4 "
          type="text"
          name="fname"
          value={input.fname}
          placeholder="First Name"
          onChange={inputHandler}
        />
        <input
          className="rounded text-black  outline-none py-2 px-4 "
          type="text"
          name="lname"
          value={input.lname}
          placeholder="Last Name"
          onChange={inputHandler}
        />
        <input
          className="rounded text-black  outline-none py-2 px-4 "
          type="email"
          name="email"
          value={input.email}
          placeholder="Email"
          onChange={inputHandler}
        />
        <button className="px-4 py-2 bg-blue-700 rounded text-white font-bold" type="submit">
          Submit
        </button>
      </form>
    </div>
    </div>
  );
};

export default EditUser;
