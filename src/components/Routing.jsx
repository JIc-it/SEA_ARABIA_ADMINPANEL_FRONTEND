import { Routes, Route } from "react-router-dom";
import LeadManagement from "../lead_management";
import OnBoard from "./OnBoard";
import AddVendorInfo from "./Initial_contact/AddVendorForm";
import Login from "../pages/Login";
import DashBoard from "../pages/DashBoard";
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
import UserVendors from "../pages/Users/UserVendors";
import SalesRepresentatives from "../pages/Users/SalesRepresentatives";
import Admin from "../pages/Users/Admin";
import Review from "../pages/Review";
import AddOnServices from "../pages/AddOnServices";
import DiscountView from "./Discounts/DiscountView";
import DiscountEdit from "./Discounts/DiscountEdit";
import DiscountAddNew from "./Discounts/DiscountAddNew";

function AllRouting() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/dashboard" element={<DashBoard />}></Route>
      <Route path="/vendor-management" element={<LeadManagement />}></Route>
      <Route path="/booking" element={<Bookings />} />
      <Route path="/onboard" element={<OnBoard />} />
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
      <Route path="/user-vendor" element={<UserVendors />} />
      <Route path="/sales-representatives" element={<SalesRepresentatives />} />
      <Route path="/admin" element={<Admin />} />
      {/* ///////////////User/////////////////////// */}
      <Route path="/review" element={<Review />} />
      <Route path="/add-on-services" element={<AddOnServices />} />
      <Route path="/add-vendor-details" element={<AddVendorInfo />} />
    </Routes>
  );
}

export default AllRouting;
