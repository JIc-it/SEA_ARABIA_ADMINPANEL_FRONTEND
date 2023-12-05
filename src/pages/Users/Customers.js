import React from "react";
import CustomerHeaders from "../../components/Customers/CustomerHeaders";
import CustomerListing from "../../components/Customers/CustomerListing";


const Customers = () => {
  return (
    <>
    <script src="./dist/js/demo-theme.min.js"></script>
    <div className="page" style={{backgroundColor:"#DDECEE"}}>
    <CustomerHeaders/>
    <CustomerListing/>
    </div>
    </>
  )
};

export default Customers;
