import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./LeftSidebar.css";
import HomeIcon from "@mui/icons-material/Home";
import TagIcon from "@mui/icons-material/Tag";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";

const LeftSidebar = () => {
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  const location = useLocation();

  return (
    <div
      className="flex flex-col h-full md:h-[70vh] justify-between mr-6"
      style={{
        backgroundColor: "rgb(241 245 249)",
        padding: "20px",
        borderRadius: "20px",
      }}
    >
      <div className="mt-6 flex flex-col space-y-4">
        <Link to="/" className={location.pathname === "/" ? "active-link" : ""}>
          <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
            <HomeIcon fontSize="large" />
            <p>Home</p>
          </div>
        </Link>
        <Link
          to="/explore"
          className={location.pathname === "/explore" ? "active-link" : ""}
        >
          <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
            <TagIcon fontSize="large" />
            <p>Explore</p>
          </div>
        </Link>
        <Link
          to={`/message`}
          className={
            location.pathname.includes("/message") ? "active-link" : ""
          }
        >
          <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
            <MessageIcon fontSize="large" />
            <p>Messages</p>
          </div>
        </Link>
        <Link
          to={`/notifications`}
          className={
            location.pathname.includes("/notifications") ? "active-link" : ""
          }
        >
          <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
            <NotificationsActiveIcon fontSize="large" />
            <p>Notification</p>
          </div>
        </Link>
        <Link
          to={`/profile/${currentUser._id}`}
          className={
            location.pathname.includes("/profile") ? "active-link" : ""
          }
        >
          <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
            <PersonIcon fontSize="large" />
            <p>Profile</p>
          </div>
        </Link>
      </div>
      <div className="flex justify-between">
        <div>
          <p className="font-bold">{currentUser.username}</p>
          <p className="font-bold">@{currentUser.username}</p>
        </div>
        <div>
          <Link to="signin">
            <button
              className="bg-blue-500 px-4 py-2 text-white rounded-full"
              onClick={handleLogout}
            >
              Logout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
