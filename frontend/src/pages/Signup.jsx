import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const Signup = () => {
  const navigate = useNavigate();
  const isloggedin = useSelector((state) => state.auth.loggedin);
  if (isloggedin) {
    navigate("/");
  }
  const navigateToLogin = () => {
    navigate("/login");
  };

  const [data, setdata] = useState({ username: "", email: "", password: "" });
  const change = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };

  const submitdata = async () => {
    if (data.username && data.email && data.password) {
      const response = await axios.post(
        "http://localhost:1000/api/v1/sign-in",
        data
      );
      if (data.username.length < 5) {
        alert("Username should be at least 5 characters long");
        return;
      }
      setdata({ username: "", email: "", password: "" });
      console.log(response);
      navigate("/login");
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div className="h-[98vh] flex items-center justify-center">
      <div className="p-4 w-2/6 bg-gray-600">
        <div className="text-2xl font-semibold">Signup</div>
        <input
          type="username"
          placeholder="username"
          className="bg-gray-500 p-2 my-2 rounded w-full"
          name="username"
          value={data.username}
          onChange={change}
        />

        <input
          type="email"
          placeholder="email"
          className="bg-gray-500 p-2 my-2 rounded w-full"
          name="email"
          required
          value={data.email}
          onChange={change}
        />

        <input
          type="password"
          placeholder="password"
          className="bg-gray-500 p-2 my-2 rounded w-full"
          name="password"
          value={data.password}
          onChange={change}
        />

        <div className="flex items-center justify-between">
          <button
            className="bg-gray-400 p-2 my-2 rounded text-black hover:bg-gray-700 transition-all scale-105 duration-300"
            onClick={submitdata}
          >
            Signup
          </button>
          <div onClick={navigateToLogin}>
            Already have an account?
            <a href="/login" className="ml-2 text-blue-200 underline">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
