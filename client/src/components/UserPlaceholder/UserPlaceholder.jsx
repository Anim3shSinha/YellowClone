import axios from "axios";
import React, { useState, useEffect } from "react";

import { useLocation, useParams } from "react-router-dom";
import { CONST } from "../../constant";

const UserPlaceholder = ({ setUserData, userData }) => {
  const { id } = useParams();
  const location = useLocation().pathname;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await axios.get(
          // `http://localhost:5000/api/users/find/${id}`
          `${CONST.server}/api/users/find/${id}`
        );
        setUserData(userProfile.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [id]);

  return <div>{userData?.username}</div>;
};

export default UserPlaceholder;
