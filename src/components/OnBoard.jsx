import React from "react";
import "../static/css/vendor_view.css";
import VendorDetailsCard from "./Vendor_tabs/VendorDetailsCard";
import VendorTabs from "./Vendor_tabs/VendorTabs";
import ProgressBar from "./Common/ProgressBar";

function OnBoard() {
  return (
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
  );
}

export default OnBoard;
