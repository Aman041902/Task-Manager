import React, { useEffect } from "react";
import Home from "./pages/Home";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import All from "./pages/All";
import Pending from "./pages/Pending";
import Completed from "./pages/Completed";
import Important from "./pages/Important";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import { authActions } from "./store/auth";
import { useDispatch } from "react-redux";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const isloggedin = useSelector((state) => state.auth.loggedin);
  console.log(isloggedin);

  useEffect(() => {
    const currentPath = location.pathname;

    if (localStorage.getItem("token") && localStorage.getItem("id")) {
      dispatch(authActions.login());
    } else if (!isloggedin && !["/login", "/signup"].includes(currentPath)) {
      navigate("/login");
    }
  }, [isloggedin, location.pathname]);
  return (
    <div className="bg-slate-500 text-white h-screen p-1 relative">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<All />} />
          <Route path="/pendingTasks" element={<Pending />} />
          <Route path="/completedTasks" element={<Completed />} />
          <Route path="/importantTasks" element={<Important />} />
        </Route>

        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
