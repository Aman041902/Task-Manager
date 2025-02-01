import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useState } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";

const Cards = ({ home, setclose, taskdata, setupdatedata }) => {
  const [imp, setimp] = useState("Pending");
  // console.log(taskdata);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const taskstatus = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v2/update-complete/${id}`,
        {},

        {
          headers,
        }
      );
    } catch (err) {
      console.log(id);
      console.log(err);
    }
  };

  const taskimp = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v2/update-important/${id}`,
        {},

        {
          headers,
        }
      );
    } catch (err) {
      console.log(err.response);
    }
  };

  const deltask = async (id) => {
    try {
      console.log("jkk");
      const response = await axios.delete(
        `http://localhost:1000/api/v2/delete/${id}`,

        {
          headers,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const editdata = async (id, title, description) => {
    try {
      setclose("fixed");
      setupdatedata({ id: id, title: title, description: description });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-3 p-4">
      {taskdata &&
        taskdata.map((data, i) => {
          return (
            <div
              key={i}
              className="shadow-lg rounded-md p-4 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-600">
                  {data.title}
                </h2>
                <p className="text-gray-600">{data.description}</p>
              </div>
              <div className="mt-4 w-full flex items-center ">
                <button
                  className={`${
                    data.completed === true ? "bg-green-500" : "bg-red-500"
                  } w-3/6 text-white py-2 rounded-md`}
                  onClick={() => taskstatus(data._id)}
                >
                  {data.completed === true ? "Completed" : "Pending"}
                </button>
                <div className="p-2 w-3/6 text-2xl flex justify-around">
                  <button onClick={() => taskimp(data._id)}>
                    {data.important === false ? (
                      <CiHeart />
                    ) : (
                      <FaHeart className="text-red-500" />
                    )}
                  </button>
                  {home !== "false" && (
                    <button
                      onClick={() =>
                        editdata(data._id, data.title, data.description)
                      }
                    >
                      <FaEdit />
                    </button>
                  )}

                  <button onClick={() => deltask(data._id)}>
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      <div
        className={
          home === "false"
            ? "hidden"
            : "shadow-lg rounded-md p-4 flex flex-col justify-center items-center hover:scale-105 cursor-pointer transition-all duration-300"
        }
        onClick={() => setclose("fixed")}
      >
        <IoMdAddCircleOutline className="text-5xl text-blue-500" />
        <h2 className="text-2xl text-gray-600 mt-4">Add Tasks</h2>
      </div>
    </div>
  );
};

export default Cards;
