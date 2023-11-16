import { BrowserRouter, Routes, Route } from "react-router-dom";
import LeadManagement from "../lead_management";
import OnBoard from "./OnBoard";
import AddVendorInfo from "./Initial_contact/AddVendorForm";
function AllRouting() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<LeadManagement />}></Route>
        <Route path="/onboard" element={<OnBoard />} />
        <Route path="/add-vendor-details" element={<AddVendorInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AllRouting;
