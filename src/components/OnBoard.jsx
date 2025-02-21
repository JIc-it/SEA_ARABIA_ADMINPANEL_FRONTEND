import React, { useEffect, useState } from "react";
import "../static/css/vendor_view.css";
import VendorDetailsCard from "./Vendor_tabs/VendorDetailsCard";
import VendorTabs from "./Vendor_tabs/VendorTabs";
import ProgressBar from "./Common/ProgressBar";
import { useParams } from "react-router";
import { OnboardContext } from "../Context/OnboardContext";
import { getLocation } from "../services/CustomerHandle";


function OnBoard() {
  const params = useParams();
  const vendorId = params.id;
  const companyID = params.companyID;
  const [location, setLocation] = useState();
  const [isOnBoard, setIsOnBoard] = useState(false);

  useEffect(() => {
    getLocation()
      .then((data) => {
        console.log("location is==", data);
        setLocation(data);
      })
      .catch((error) => {
        // toast.error(error.message);
        console.log("error while fetching location", error);
      });
  }, []);

  return (
    <OnboardContext.Provider
      value={{ vendorId, companyID, setIsOnBoard, isOnBoard }}
    >
      <div className="page-wrapper">
        <div className="page-body">
          <div className="container-xl">
            <ProgressBar
              locationList={location}
              isOnBoard={isOnBoard}
              setIsOnBoard={setIsOnBoard}
            />
            <div className="col-12 content_section">
              <VendorDetailsCard />
              <VendorTabs locationList={location} />
            </div>
          </div>
        </div>
      </div>
    </OnboardContext.Provider>
  );
}

export default OnBoard;
