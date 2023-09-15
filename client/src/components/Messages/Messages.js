import React from "react";
import LeftSidebar from "../LeftSidebar/LeftSidebar";
import MainTweet from "../MainTweet/MainTweet";
import RightSidebar from "../RightSidebar/RightSidebar";

const Messages = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4">
      <div className="px-6 ">
        <LeftSidebar />
      </div>
      <div
        className="col-span-2 border-x-2 border-t-slate-800 px-6 overflow-auto"
        style={{
          boxShadow: "0px 10px 16px rgba(0, 0, 0, 0.1)",
          fontWeight: "bold",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        No new Messages
      </div>
      <div className="px-6 ">
        <RightSidebar />
      </div>
    </div>
  );
};

export default Messages;
