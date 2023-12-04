import React from 'react'
import SideBar from "../components/Common/SideBar";
import Footer from "../components/Common/Footer";
import DiscountListing from '../components/Discounts/DiscountListing';
import DiscountHeaders from '../components/Discounts/Discount_Header';

const DiscountOffer = () => {
  return (
    <div>
      <script src="./dist/js/demo-theme.min.js"></script>
      <div className="page" style={{ height: "100vh" }}>
        {/* Sidebar  */}
        <SideBar />
        {/* <!-- Navbar --> */}
        {/* <Header /> */}
        <div className="page-wrapper">
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
