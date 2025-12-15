import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const User = () => {
  const { userId } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchgithubFollwers = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${userId || "Amresh-01"}`
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchgithubFollwers();
  }, [userId]);

  // useEffect(() => async
  //   const response = await axios.get(`https://api.github.com/users//Amresh-01`);
  // }, [third]);

  return (
    <div className="text-center m-4 bg-gray-600 text-white ">
      Github followers: {data?.followers ?? "Loading..."}
    </div>
  );
};

export default User;
