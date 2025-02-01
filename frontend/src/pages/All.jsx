import React, { useState } from "react";
import Cards from "../components/home/Cards";
import { IoMdAddCircleOutline } from "react-icons/io";
import Newtask from "../components/home/Newtask";
import { useEffect } from "react";
import axios from "axios";

const All = () => {
  const [close, setclose] = useState("hidden");
  const [userdata, setdata] = useState();
  const [updatedata, setupdatedata] = useState({
    id: "",
    title: "",
    description: "",
  });

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
    };
    if (localStorage.getItem("token") && localStorage.getItem("id")) {
      fetchdata();
    }
  });

  return (
    <>
      <div>
        <div className="w-full flex justify-end p-4  cursor-pointer ">
          <IoMdAddCircleOutline
            onClick={() => setclose("fixed")}
            className="text-3xl text-yellow-600 hover:text-yellow-800 transition-all scale-105 duration-300"
          />
        </div>
        {userdata && (
          <Cards
            home={"true"}
            close={close}
            setclose={setclose}
            taskdata={userdata.tasks}
            setupdatedata={setupdatedata}
          ></Cards>
        )}
      </div>
      <Newtask
        close={close}
        setclose={setclose}
        updatedata={updatedata}
        setupdatedata={setupdatedata}
      ></Newtask>
    </>
  );
};

export default All;
