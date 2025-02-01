import React, { useEffect } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { useState } from "react";
import axios from "axios";

const Newtask = ({ close, setclose, updatedata, setup, setupdatedata }) => {
  const [data, setdata] = useState({
    title: "",
    description: "",
  });
  useEffect(() => {
    setdata({ title: updatedata.title, description: updatedata.description });
  }, [updatedata]);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const changedata = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };
  const submit = async (e) => {
    if (data.title && data.description) {
      const response = await axios.post(
        "http://localhost:1000/api/v2/add",
        data,
        { headers }
      );
      setdata({ title: "", description: "" });
      setclose("hidden");
    } else {
      alert("Please fill all fields");
    }
  };

  const updt = async () => {
    if (data.title && data.description) {
      const response = await axios.put(
        `http://localhost:1000/api/v2/update/${updatedata.id}`,
        data,
        { headers }
      );
      setupdatedata({
        id: "",
        title: "",
        description: "",
      });
      setdata({ title: "", description: "" });
      setclose("hidden");
    } else {
      alert("Please fill all fields");
    }
  };
  return (
    <>
      <div
        className={`${close}  top-0 left-0 bg-gray-500 opacity-30 h-screen w-full`}
      ></div>
      <div
        className={`${close} top-0 left-0 flex items-center justify-center h-screen w-full`}
      >
        <div className="bg-white w-full max-w-md p-6 border-2 border-gray-200 rounded-lg">
          <button
            onClick={() => {
              setclose("hidden");
              setdata({
                title: "",
                description: "",
              });
              setupdatedata({
                id: "",
                title: "",
                description: "",
              });
            }}
          >
            <IoCloseCircle className="absolute top-2 right-2 text-5xl text-gray-600 cursor-pointer hover:text-gray-800 transition-all scale-105 duration-300"></IoCloseCircle>
          </button>
          <form>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="w-full p-2 border border-gray-300 rounded-lg text-gray-800"
                value={data.title}
                onChange={changedata}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="w-full p-2 border border-gray-300 rounded-lg text-gray-800"
                value={data.description}
                onChange={changedata}
              ></textarea>
            </div>

            {updatedata.id ? (
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={updt}
              >
                Update
              </button>
            ) : (
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={submit}
                >
                  Save
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Newtask;
