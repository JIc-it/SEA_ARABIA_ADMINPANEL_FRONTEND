import React from "react";
import logo from "../assets/images/logo.png";


const LoginImageContainer = () => {
  return (
    <div className="col-md-6 p-0">
      <div className="logo-image-container">
        <div className="row">
          <div className="col-md-6">
            <div className="logo">
              <img src={logo} alt="" />
              <h4>Sea Arabia CMS</h4>
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                sollicitudin.
              </span>
            </div>
            <div className="col-md-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginImageContainer;
