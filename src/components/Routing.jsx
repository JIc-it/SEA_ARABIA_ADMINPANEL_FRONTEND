/* eslint-disable */
import { Routes, Route } from "react-router-dom";
import LeadManagement from "../pages/lead_management";
import OnBoard from "./OnBoard";
import AddVendorInfo from "./Initial_contact/AddVendorForm";
import Login from "../pages/Login";
import Bookings from "../pages/Bookings";
import Services from "../pages/Services/ManageServices";
import RefundsRequest from "../pages/Refunds/RefundsRequest";
import RefundHistory from "../pages/Refunds/RefundHistory";
import ManageServices from "../pages/Services/ManageServices";
import Cruises from "../pages/Services/Cruises";
import Trips from "../pages/Services/Trips";
import Activities from "../pages/Services/Activities";
import Events from "../pages/Services/Events";
import Payments from "../pages/Payments";
import DiscountOffer from "../pages/DiscountOffer";
import Analytics from "../pages/Analytics";
import Customers from "../pages/Users/Customers";
import UserVendors from "../pages/Users/Vendors/UserVendors";

import SalesRepresentatives from "../pages/Users/sales/SalesRepresentatives";
import Admin from "../pages/Users/Admin/Admin";
import Review from "../pages/Review";
import DiscountView from "./Discounts/DiscountView";
import DiscountEdit from "./Discounts/DiscountEdit";
import DiscountAddNew from "./Discounts/DiscountAddNew";
import CustomerView from "./Customers/CustomerView";

import CustomersBookingView from "./Customers/CustomersBookingView";
import AddOnServiceList from "./AddOnService/AddOnServiceList";
import UserVendorView from "./UserVendor/UserVendorView";
import ServiceList from "./Service/ServiceList";
import ServiceView from "./Service/ServiceView";
import UserVendorEdit from "./UserVendor/UserVendorTabs/VenderDetails/UserVendorEdit";
import UserVendorAddService from "../components/UserVendor/UserVendorAddService";
import UserVendorCardDetails from "./UserVendor/UserVendorCardDetails";
import DashBoard from "../pages/DashBoard";
import VenderIndivitualEdit from "./Vendor_tabs/VenderDetailsEdit/VenderIndivitualEdit";
import GuestUser from "../pages/Users/GuestUser";
import ServiceEdit from "./Service/ServiceEdit";
import AdminView from "../pages/Users/Admin/AdminView";
import SalesRepView from "../pages/Users/sales/SalesRepView";
import InviVitualBookingView from "./Booking/InviVitualBookingView";
import CancellationBooking from "./Booking/CancellationBooking";
import CancellationHistory from "./Booking/CancellationHistory";
import BookingView from "./Booking/BookingView";

function AllRouting() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/dashboard" element={<DashBoard />}></Route>
      <Route path="/vendor-management" element={<LeadManagement />}></Route>
      <Route
        path="/vendor-details-edit/:id/:companyID"
        element={<VenderIndivitualEdit />}
      ></Route>
      <Route path="/booking" element={<Bookings />} />
      <Route path="/booking-view/:id" element={<InviVitualBookingView />} />
      <Route path="/onboard/:id/:companyID" element={<OnBoard />} />
      {/* //////////Refund//////////////////// */}
      <Route path="/refunds-request" element={<RefundsRequest />} />
      <Route path="/refunds-history" element={<RefundHistory />} />
      {/* //////////Refund//////////////////// */}
      {/* ///////////////services/////////////////////// */}
      <Route path="/manage-services" element={<ManageServices />} />
      <Route path="/cruises" element={<Cruises />} />
      <Route path="/trips" element={<Trips />} />
      <Route path="/activities" element={<Activities />} />
      <Route path="/events" element={<Events />} />
      {/* ///////////////services/////////////////////// */}
      <Route path="/payments" element={<Payments />} />
      <Route path="/discounts-offers" element={<DiscountOffer />} />
      <Route path="/discounts-offers/add" element={<DiscountAddNew />} />
      <Route path="/discounts-offers/:id" element={<DiscountView />} />
      <Route path="/discounts-offers/edit/:id" element={<DiscountEdit />} />

      {/* //////////////////////////////////////////////////// */}
      <Route path="/analytics" element={<Analytics />} />
      {/* ///////////////User/////////////////////// */}
      <Route path="/customers" element={<Customers />} />
      <Route path="/customers/:customerId" element={<CustomerView />} />
      {/* <Route path="/customers-edit/:id" element={<CustomerEdit />} /> */}
      <Route path="/customers/booking/:id" element={<CustomersBookingView />} />
      <Route path="/user-vendor" element={<UserVendors />} />
      <Route path="/user-vendor/:id" element={<UserVendorView />} />
      <Route path="/user-vendor/edit/:id" element={<UserVendorEdit />} />
      <Route
        path="/user-vendor/add-service/"
        element={<UserVendorAddService />}
      />
      <Route path="/sales-representatives" element={<SalesRepresentatives />} />
      <Route
        path="/sales-representatives/:salesRepId"
        element={<SalesRepView />}
      />

      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/:adminId" element={<AdminView />} />
      {/* ///////////////User/////////////////////// */}
      <Route path="/review" element={<Review />} />
      <Route path="/add-on-services" element={<AddOnServiceList />} />
      <Route path="/add-vendor-details/:id" element={<AddVendorInfo />} />
      <Route
        path="/user-vendor/:vendorId"
        element={<UserVendorCardDetails />}
      />
      <Route path="/service" element={<ServiceList />} />
      <Route path="/service-view/:id" element={<ServiceView />} />
      <Route path="/service-edit/:id" element={<ServiceEdit />} />
      <Route path="/guest-user" element={<GuestUser />} />
      <Route path="/cancellation-booking" element={<CancellationBooking />} />
      <Route path="/cancellation-history" element={<CancellationHistory />} />
      <Route path="/booking-view" element={<BookingView />} />
    </Routes>
  );
}

export default AllRouting;
