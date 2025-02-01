import React, { useEffect } from "react";
import { GrNotes } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import axios from "axios";
import { useState } from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = [
    {
      title: "All tasks",
      icon: <GrNotes />,
      link: "/",
    },
    {
      title: "Completed tasks",
      icon: <GrNotes />,
      link: "/completedTasks",
    },
    {
      title: "Pending tasks",
      icon: <GrNotes />,
      link: "/pendingTasks",
    },
    {
      title: "Important tasks",
      icon: <GrNotes />,
      link: "/importantTasks",
    },
  ];

  const [userdata, setdata] = useState();

  const logout = () => {
    dispatch(authActions.logout());
    localStorage.clear("token");
    localStorage.clear("id");
    navigate("/login");
  };

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchdata = async () => {
      const reponse = await axios.get(
        "http://localhost:1000/api/v2/all-tasks",
        {
          headers,
        }
      );
      setdata(reponse.data.data);
      console.log(reponse);
    };
    if (localStorage.getItem("token") && localStorage.getItem("id")) {
      fetchdata();
    }
  });
  return (
    <>
      {userdata && (
        <div>
          <h2 className="text-xl font-semibold">{userdata.username}</h2>
          <h4 className="mb-2 text-gray-700">{userdata.email}</h4>
          <hr />
        </div>
      )}

      <div>
        {data.map((task, i) => (
          <Link
            to={task.link}
            className=" my-2 flex items-center hover:bg-red-800 p-2 rounded transition-all cursor-pointer"
            key={i}
          >
            <span className="mr-1"> {task.icon}</span>
            {task.title}
          </Link>
        ))}
      </div>

      <div>
        <button className="bg-slate-400 w-full p-2 rounded" onClick={logout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;
