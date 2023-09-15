import React, { useState } from "react";

const RightSidebar = () => {
  // const [click, setClick] = useState(false);
  return (
    <>
      <div className="p-6 bg-slate-100 rounded-lg mx-4 space-y-4 ">
        <h2 className="font-bold">Subscribe to Premium</h2>
        <p className="font-medium">
          Subscribe to unlock new features and if eligible, receive a share of
          ads revenue.
        </p>
        <button
          // onClick={setClick(true)}
          style={{
            color: "white",
            backgroundColor: "black",
            padding: "10px",
            borderRadius: "30px",
          }}
        >
          Subscribe
        </button>
      </div>
      <div
        className="p-6 bg-slate-100 rounded-lg mx-4 space-y-4 "
        style={{ marginTop: "10px" }}
      >
        <h1 className="font-bold" style={{ fontSize: "20px" }}>
          Whats happening
        </h1>
        <br />
        <span>
          #Movies <br />
          <p className="font-medium">Jawaan crosses 500Cr </p>
        </span>
        <br />
        <span>
          #IndVsPak <br />
          <p className="font-medium">India beats Pak</p>
        </span>
        <br />
        <span>
          #G20 <br />
          <p className="font-medium">Successful G20</p>
        </span>
      </div>
    </>
  );
};

export default RightSidebar;
