import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import MainTweet from "../../components/MainTweet/MainTweet";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import Signin from "../Signin/Signin";
import { useSelector } from "react-redux";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      {!currentUser ? (
        <Signin />
      ) : (
        <div
          className="grid grid-cols-1 md:grid-cols-4"
          style={{
            display: "flex",
            flexDirection: "row",
            // border: "2px solid black",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <div
            className="px-6 "
            style={{
              boxShadow: "0px 10px 16px rgba(0, 0, 0, 0.1)",
              flex: " 0 0 25%",
              position: "fixed",
              top: "130px",
              left: "0",
              width: "25%",
              height: "90vh",
            }}
          >
            <LeftSidebar />
          </div>
          <div
            className="col-span-2 border-x-2 border-t-slate-800 px-6 overflow-auto main-tweet "
            style={{
              boxShadow: "0px 10px 16px rgba(0, 0, 0, 0.1)",
              flex: " 0 0 50%",
              // border: "2px solid black",
            }}
          >
            <MainTweet />
          </div>
          <div
            className="px-6 right-sidebar "
            style={{
              boxShadow: "0px 10px 16px rgba(0, 0, 0, 0.1)",
              flex: " 0 0 25%",
              position: "fixed",
              top: "130px",
              right: "0",
              width: "25%",
              height: "90vh",
            }}
          >
            <RightSidebar />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
