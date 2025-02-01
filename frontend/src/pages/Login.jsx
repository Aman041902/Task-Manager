import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Login = () => {
  const [data, setdata] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isloggedin = useSelector((state) => state.auth.loggedin);
  if (isloggedin) {
    navigate("/");
  }
  const change = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };

  const submitdata = async () => {
    if (data.username && data.password) {
      const response = await axios.post(
        "http://localhost:1000/api/v1/login",
        data
      );
      setdata({ username: "", password: "" });
      console.log(response);
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);
      dispatch(authActions.login());
      navigate("/");
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div className="h-[98vh] flex items-center justify-center">
      <div className="p-4 w-2/6 bg-gray-600">
        <div className="text-2xl font-semibold">Login</div>
        <input
          type="username"
          placeholder="username"
          className="bg-gray-500 p-2 my-2 rounded w-full"
          name="username"
          value={data.username}
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
            Login
          </button>
          <div className="text-sm">
            Don't have an account?
            <a href="/signup" className="ml-2 text-blue-200 underline">
              Signup
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
