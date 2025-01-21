import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const Home = () => {
  const [users, setUsers] = useState([]);

  const [searchItem, setSearchItem] = useState("");

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/getusers");
    setUsers(response.data);
  };

  const deleteHandler = async (_id) => {
    await axios.delete(`http://localhost:5000/deleteuser/${_id}`);
    getUsers(); // Refreshes the user list
  };

  const handleSearch = async (e) => {
    setSearchItem(e.target.value);
  };

  const filterData = () => {
    return users.filter(
      (item) =>
        item.fname.toLowerCase().includes(searchItem.toLowerCase()) ||
        item.lname.toLowerCase().includes(searchItem.toLowerCase()) ||
        item.email.toLowerCase().includes(searchItem.toLowerCase())
    );
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="w-auto bg-[#252529] rounded py-5">
      <div className="flex justify-between items-center">
        <div>
          <Link
            to="/adduser"
            className="px-4 py-2 bg-green-600 text-white rounded m-5"
          >
            Add User
          </Link>
        </div>
        <div className="relative w-full max-w-md">
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search user..."
            value={searchItem}
            onChange={handleSearch}
            className="w-3/4 pl-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="flex justify-center gap-5">
        <table className="w-full m-5 text-white border-collapse border border-gray-100">
          <tr>
            <th className="border border-gray-100 px-4 py-2">First Name</th>
            <th className="border border-gray-100 px-4 py-2">Last Name</th>
            <th className="border border-gray-100 px-4 py-2">Email</th>
            <th className="border border-gray-100 px-4 py-2">Actions</th>
          </tr>
          {filterData().map((item, idx) => {
            return (
              <tr key={idx}>
                <td className="border text-center border-gray-100 px-4 py-2">
                  {item.fname}
                </td>
                <td className="border text-center border-gray-100 px-4 py-2">
                  {item.lname}
                </td>
                <td className="border text-center border-gray-100 px-4 py-2">
                  {item.email}
                </td>
                <td className="border text-center border-gray-100 px-4 py-2">
                  <div className="flex justify-evenly gap-2">
                    <Link
                      to={`/edituser/${item._id}`}
                      className="px-4 py-2 rounded bg-green-600 text-white"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteHandler(item._id)}
                      className="px-4 py-2 rounded bg-red-600 text-white"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
        <h1 className="text-gray-500 text-center">MERN Stack CRUD App by Yash Dhande.
        </h1>
    </div>
  );
};

export default Home;
