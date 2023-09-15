import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useLocation } from "react-router-dom";
import UserPlaceholder from "../UserPlaceholder/UserPlaceholder";
import "./Navbar.css";
const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const location = useLocation().pathname;

  return (
    <div
      className="navbar grid grid-cols-1 md:grid-cols-4 my-5 justify-center"
      style={{
        width: "100%",
        paddingBottom: "10px",
        position: "sticky",
      }}
    >
      <div
        className="mx-auto md:mx-0"
        style={{
          display: "flex",
          justifyContent: "center",
          // borderBottom: "2px solid grey",
          boxShadow: "0px 10px 16px rgba(0, 0, 0, 0.1)",
          borderRadius: "20px",
          margin: "10px",
          alignItems: "center",
        }}
      >
        <TwitterIcon fontSize="large" />
      </div>

      <div
        className="col-span-2 md:border-x-2 md:border-slate-200 md:px-6 my-6 md:my-0"
        style={{
          display: "flex",
          justifyContent: "center",
          boxShadow: "0px 10px 16px rgba(0, 0, 0, 0.1)",
          borderRadius: "20px",
          margin: "10px",
          alignItems: "center",
        }}
      >
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl">
            {location.includes("profile") ? (
              <UserPlaceholder setUserData={setUserData} userData={userData} />
            ) : location.includes("explore") ? (
              "Explore"
            ) : location.includes("signin") ? (
              "Authentication"
            ) : location.includes("message") ? (
              "Messages"
            ) : location.includes("notification") ? (
              "Notifications"
            ) : (
              "Home"
            )}
          </h2>
        </div>
      </div>

      <div
        className="px-0 md:px-6 mx-auto"
        style={{
          display: "flex",
          boxShadow: "0px 10px 16px rgba(0, 0, 0, 0.1)",
          borderRadius: "20px",
          margin: "10px",
          alignItems: "center",
          paddingBottom: "10px",
        }}
      >
        <SearchIcon className="absolute m-2" />
        <input
          type="text"
          className="bg-blue-100 rounded-full py-2 px-8"
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default Navbar;
