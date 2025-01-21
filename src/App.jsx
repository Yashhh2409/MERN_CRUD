import React from "react";
import {Routes, Route} from "react-router-dom"
import Home from "./components/Home";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";

const App = () => {
  return (
    <>
    <div className="w-full h-screen overflow-y-auto scrollbar-hidden bg-[#111114] flex justify-center items-center">
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/adduser" element={<AddUser />} />
      <Route path="/edituser/:id" element={<EditUser />}/>
    </Routes>
    
    </div>
    </>
  );
};

export default App;
