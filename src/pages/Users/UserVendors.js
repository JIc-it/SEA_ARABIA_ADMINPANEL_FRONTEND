import React from "react";
import UserVendorHeader from "../../components/UserVendor/UserVendorHeader";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Listing from "../../components/UserVendor/Listing";

const UserVendors = () => {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div>
      <div className="page" style={{ height: "100vh" }}>
        <div className={!isMobileView ? "page-wrapper" : "wrapper_mobile"}>
          <div className="page-body vendor-management-container-main">
            <div className="container-xl">
              <div className="row row-deck row-cards">
                <div className="col-12">
                  <UserVendorHeader />
                </div>
               <Listing/>
              </div>
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  )
}

export default UserVendors;
