import React from 'react'
import SideBar from "../components/Common/SideBar";
import Footer from "../components/Common/Footer";
import DiscountListing from '../components/Discounts/DiscountListing';
import DiscountHeaders from '../components/Discounts/Discount_Header';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const DiscountOffer = () => {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div>
      <div className="page" style={{ height: "100vh" }}>
        <div className={!isMobileView?"page-wrapper":"wrapper_mobile"}>
          <div className="page-body vendor-management-container-main">
            <div className="container-xl">
              <div className="row row-deck row-cards">
                <div className="col-12">
                  <DiscountHeaders />
                </div>
                <DiscountListing />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default DiscountOffer
