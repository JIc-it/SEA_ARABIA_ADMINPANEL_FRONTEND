import React, { useState } from "react";
import "../static/css/vendor_view.css";
import VendorDetailsCard from "./Vendor_tabs/VendorDetailsCard";
import VendorTabs from "./Vendor_tabs/VendorTabs";
import ProgressBar from "./Common/ProgressBar";
import { useParams } from "react-router";
import { OnboardContext } from "../Context/OnboardContext";

function OnBoard() {
  const params = useParams();
  const vendorId = params.id;
  const companyID = params.companyID;



  return (
    <OnboardContext.Provider value={{ vendorId, companyID }}>
      <div className="page-wrapper">
        <div className="page-body">
          <div className="container-xl">
            <ProgressBar />
            <div className="col-12 content_section">
              <VendorDetailsCard />
              <VendorTabs />
            </div>
          </div>
        </div>
      </div>
    </OnboardContext.Provider>
  );
}

export default OnBoard;
