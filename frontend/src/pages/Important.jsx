import React, { useEffect } from "react";
import Cards from "../components/home/Cards";
import { useState } from "react";
import axios from "axios";

const Important = () => {
  const [data, setdata] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetchdata = async () => {
      const reponse = await axios.get(
        "http://localhost:1000/api/v2/important-tasks",
        {
          headers,
        }
      );
      setdata(reponse.data.data.tasks);
      // console.log(reponse.data.data.tasks);
    };
    fetchdata();
  });

  return (
    <div>
      <Cards home={"false"} taskdata={data}></Cards>
    </div>
  );
};

export default Important;
