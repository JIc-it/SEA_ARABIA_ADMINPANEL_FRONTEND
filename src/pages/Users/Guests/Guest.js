import React from "react";
import GuestHeader from "./GuestHeader";
import GuestUser from "./GuestUser";

const Guest = () => {
  return (
    <>
      <script src="./dist/js/demo-theme.min.js"></script>
      <div className="page" style={{ backgroundColor: "#DDECEE" }}>
        <GuestHeader />
        <GuestUser />
      </div>
    </>
  );
};

export default Guest;
