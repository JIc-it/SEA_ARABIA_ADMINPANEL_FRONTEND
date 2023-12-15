import { Button } from "@mui/material";
import customerImg from "../../assets/images/customerimg.png";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import Avatars from "../../assets/images/Avatar.png";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AddSiteVisitModal from "../Modal/AddSiteVisitModal";

import { getVendorListById } from "../../services/leadMangement";
import {
  
} from "../../services/CustomerHandle";

function UserVendorCardDetails() {
  const navigate = useNavigate();
  const theme = useTheme();

  const vendorId = useParams()?.id;
  // console.log("v-id==", vendorId);
  const customerId = useParams()?.customerId;
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
  const [active, setActive] = useState("Services");
  const [isToggled, setToggled] = useState(true);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleOpenOffcanvas = () => setShowOffcanvas(true);

  const handleCloseOffcanvas = () => setShowOffcanvas(false);

  const handleToggle = () => {
    setToggled(!isToggled);
  };

  const [vendorDetails, setvendorDetails] = useState([]);

  const [serviceData, setServiceData] = useState();

  // useEffect(() => {
  //   getVendorServiceDataById()
  //     .then((data) => {
  //       console.log("service data of c", data);
  //       setServiceData(data); // assuming data.result is the service data
  //     })
  //     .catch((error) => {
  //       console.error("failed to fetch service data", error);
  //     });
  // }, [vendorId]);

  useEffect(() => {
    getVendorListById(vendorId)
      .then((data) => {
        setvendorDetails(data);
        console.log(" card details getVendorListById==", data);
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });
  }, [vendorId]);

  return (
    <div
      className={
        isMobileView ? "d-flex flex-column" : "d-flex justify-content-between"
      }
      style={{ height: "100vh" }}
    >
      <div className={isMobileView ? "col-12 my-2" : "col-5 my-2"}>
        <div
          className="card personal_details"
          style={{ height: "fit-content" }}
        >
          <div className="card-body">
            <div className="left_header_new">
              <div>
                <p className="card_content">{vendorDetails?.first_name}</p>
              </div>
              <div className="card_header_contents">
                <p className="card_content">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                  >
                    <path
                      d="M12.2436 8.9577L11.6186 11.041H8.75701L9.38201 8.9577H12.2436Z"
                      fill="white"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.38738 2.8864C2.16699 4.10679 2.16699 6.07098 2.16699 9.99935C2.16699 13.9277 2.16699 15.8919 3.38738 17.1123C4.60777 18.3327 6.57195 18.3327 10.5003 18.3327C14.4287 18.3327 16.3929 18.3327 17.6133 17.1123C18.8337 15.8919 18.8337 13.9277 18.8337 9.99935C18.8337 6.07098 18.8337 4.10679 17.6133 2.8864C16.3929 1.66602 14.4287 1.66602 10.5003 1.66602C6.57195 1.66602 4.60777 1.66602 3.38738 2.8864ZM9.84659 5.23405C10.1772 5.33324 10.3648 5.68167 10.2656 6.01229L9.75701 7.70769H12.6186L13.235 5.6531C13.3342 5.32248 13.6826 5.13487 14.0133 5.23405C14.3439 5.33324 14.5315 5.68167 14.4323 6.01229L13.9237 7.70769H15.5003C15.8455 7.70769 16.1253 7.98752 16.1253 8.33269C16.1253 8.67787 15.8455 8.9577 15.5003 8.9577H13.5487L12.9237 11.041H14.667C15.0122 11.041 15.292 11.3209 15.292 11.666C15.292 12.0112 15.0122 12.291 14.667 12.291H12.5487L11.9323 14.3456C11.8331 14.6762 11.4847 14.8639 11.1541 14.7647C10.8234 14.6655 10.6358 14.3171 10.735 13.9864L11.2436 12.291H8.38201L7.76563 14.3456C7.66645 14.6762 7.31802 14.8639 6.9874 14.7647C6.65678 14.6655 6.46916 14.3171 6.56835 13.9864L7.07697 12.291H5.50033C5.15515 12.291 4.87533 12.0112 4.87533 11.666C4.87533 11.3209 5.15515 11.041 5.50033 11.041H7.45197L8.07697 8.9577H6.33366C5.98848 8.9577 5.70866 8.67787 5.70866 8.33269C5.70866 7.98752 5.98848 7.70769 6.33366 7.70769H8.45197L9.06835 5.6531C9.16754 5.32248 9.51596 5.13487 9.84659 5.23405Z"
                      fill="white"
                    />
                  </svg>{" "}
                  &nbsp; {vendorDetails?.useridentificationdata?.id_number}{" "}
                  <p>| &nbsp;</p>
                </p>
                <p className="card_content">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M18.8337 9.99935C18.8337 14.6017 15.1027 18.3327 10.5003 18.3327C5.89795 18.3327 2.16699 14.6017 2.16699 9.99935C2.16699 5.39698 5.89795 1.66602 10.5003 1.66602C15.1027 1.66602 18.8337 5.39698 18.8337 9.99935ZM13.0003 7.49935C13.0003 8.88006 11.881 9.99935 10.5003 9.99935C9.11961 9.99935 8.00033 8.88006 8.00033 7.49935C8.00033 6.11864 9.11961 4.99935 10.5003 4.99935C11.881 4.99935 13.0003 6.11864 13.0003 7.49935ZM10.5003 17.0827C11.987 17.0827 13.3667 16.6247 14.5061 15.842C15.0093 15.4963 15.2244 14.8379 14.9318 14.302C14.3253 13.1912 13.0755 12.4993 10.5003 12.4993C7.92507 12.4993 6.6753 13.1912 6.06878 14.302C5.7762 14.8378 5.99124 15.4963 6.49446 15.842C7.63381 16.6246 9.01357 17.0827 10.5003 17.0827Z"
                      fill="white"
                    />
                  </svg>{" "}
                  &nbsp; {vendorDetails?.role} <p>| &nbsp;</p>
                </p>
                <p className="card_content">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.4997 1.66602C6.81778 1.66602 3.83301 5.0015 3.83301 8.74935C3.83301 12.4678 5.96078 16.5097 9.28056 18.0614C10.0545 18.4231 10.9449 18.4231 11.7188 18.0614C15.0386 16.5097 17.1663 12.4678 17.1663 8.74935C17.1663 5.0015 14.1816 1.66602 10.4997 1.66602ZM10.4997 9.99935C11.4201 9.99935 12.1663 9.25316 12.1663 8.33268C12.1663 7.41221 11.4201 6.66602 10.4997 6.66602C9.5792 6.66602 8.83301 7.41221 8.83301 8.33268C8.83301 9.25316 9.5792 9.99935 10.4997 9.99935Z"
                      fill="white"
                    />
                  </svg>{" "}
                  &nbsp; {vendorDetails?.profileextra?.location}
                </p>
              </div>
            </div>
            <div
              className="card_personal_details"
              style={{ backgroundColor: "#F8F8F8", borderRadius: "8px" }}
            >
              <h5
                className="personal_details_header"
                style={{ fontSize: "16px" }}
              >
                Personal Details
              </h5>
              <div className="col-12">
                <div className="vendor_info_new">
                  <span className="heading_name">Email</span>
                  <span> {vendorDetails?.email} </span>
                </div>
              </div>
              <div className="vendor_info_new">
                <span className="heading_name">Phone</span>
                <span>{vendorDetails?.mobile}</span>
              </div>
              <div className="vendor_info_new">
                <span className="heading_name pb-2">ID Number</span>
                <span>45646546545659</span>
              </div>
            </div>
            <div
              className="card_personal_details"
              style={{ backgroundColor: "#F8F8F8", borderRadius: "8px" }}
            >
              <h5
                className="personal_details_header"
                style={{ fontSize: "16px" }}
              >
                Company Details
              </h5>
              <div className="col-12">
                <div className="vendor_info_new">
                  <span className="heading_name">Name</span>
                  <span>{vendorDetails?.company_company_user?.name}</span>
                </div>
                <div className="vendor_info_new">
                  <span className="heading_name">
                    Company Registration Number
                  </span>
                  <span>
                    {vendorDetails?.company_company_user?.registration_number}
                  </span>
                </div>
                <div className="vendor_info_new">
                  <span className="heading_name pb-2">Address</span>
                  <span>
                    {vendorDetails?.company_company_user?.address} &nbsp;
                    <svg
                      width={22}
                      height={22}
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.9998 1.8335C6.94975 1.8335 3.6665 5.50253 3.6665 9.62516C3.6665 13.7155 6.00705 18.1615 9.65882 19.8684C10.5101 20.2663 11.4896 20.2663 12.3409 19.8684C15.9926 18.1615 18.3332 13.7155 18.3332 9.62516C18.3332 5.50253 15.0499 1.8335 10.9998 1.8335ZM10.9998 11.0002C12.0124 11.0002 12.8332 10.1794 12.8332 9.16683C12.8332 8.15431 12.0124 7.3335 10.9998 7.3335C9.98732 7.3335 9.1665 8.15431 9.1665 9.16683C9.1665 10.1794 9.98732 11.0002 10.9998 11.0002Z"
                        fill="#323539"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div
              className="card_personal_details mt-3 "
              style={{ backgroundColor: "#F8F8F8", borderRadius: "8px" }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <h5
                  className="personal_details_header"
                  style={{ fontSize: "16px", transform: "translateY(-30%)" }}
                >
                  Status
                </h5>
                <div style={{ display: "flex" }}>
                  <div className="me-2">
                    {isToggled ? "Active" : "Inactive"}
                  </div>
                  <label class="switch me-5" style={{ marginRight: "5px" }}>
                    <input
                      type="checkbox"
                      checked={isToggled}
                      value={isToggled}
                      onChange={handleToggle}
                    />
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
            <button
              className="btn  mt-2 px-4 py-2 mt-4 mb-2"
              style={{
                backgroundColor: "#187AF7",
                color: "white",
                width: "100%",
              }}
            >
              Bookings &nbsp;
              <svg
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.3335 10H16.6668M16.6668 10L11.6668 5M16.6668 10L11.6668 15"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="bottom_button">
              <a className="call_vendor_button btn ">
                Call Vendor &nbsp;
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M12.9635 12.1231L12.5839 12.5227C12.5839 12.5227 11.6818 13.4725 9.21927 10.8799C6.75676 8.28736 7.65892 7.33756 7.65892 7.33756L7.89793 7.08593C8.48673 6.46604 8.54223 5.4708 8.02853 4.74425L6.97771 3.25801C6.3419 2.35875 5.1133 2.23996 4.38454 3.0072L3.07654 4.38428C2.71519 4.76471 2.47304 5.25788 2.50241 5.80495C2.57753 7.20455 3.1756 10.2159 6.5128 13.7293C10.0518 17.4552 13.3724 17.6033 14.7302 17.4692C15.1597 17.4269 15.5333 17.1952 15.8343 16.8783L17.0181 15.632C17.8171 14.7908 17.5918 13.3485 16.5694 12.76L14.9774 11.8436C14.306 11.4572 13.4881 11.5707 12.9635 12.1231Z"
                    fill="white"
                  />
                  <path
                    d="M11.0499 1.56587C11.1051 1.22513 11.4272 0.993988 11.7679 1.04915C11.789 1.05319 11.8569 1.06587 11.8924 1.07379C11.9635 1.08963 12.0627 1.11401 12.1864 1.15003C12.4337 1.22207 12.7792 1.34074 13.1939 1.53085C14.0241 1.91148 15.129 2.57732 16.2755 3.72382C17.422 4.87032 18.0878 5.97516 18.4684 6.80539C18.6586 7.22007 18.7772 7.56558 18.8493 7.81289C18.8853 7.93656 18.9097 8.03575 18.9255 8.10686C18.9334 8.14242 18.9392 8.17097 18.9432 8.19206L18.948 8.21805C19.0032 8.5588 18.7742 8.89423 18.4334 8.94939C18.0937 9.0044 17.7736 8.77437 17.717 8.43523C17.7153 8.42613 17.7105 8.40166 17.7054 8.37859C17.6951 8.33243 17.6773 8.25925 17.6491 8.16245C17.5927 7.96884 17.4948 7.68106 17.3322 7.32633C17.0073 6.61774 16.4231 5.63925 15.3916 4.6077C14.36 3.57615 13.3815 2.99199 12.673 2.66713C12.3182 2.5045 12.0305 2.40655 11.8368 2.35016C11.74 2.32197 11.6184 2.29404 11.5722 2.28376C11.2331 2.22724 10.9949 1.90564 11.0499 1.56587Z"
                    fill="white"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.2384 4.44043C11.3333 4.10853 11.6792 3.91635 12.0111 4.01118L11.8394 4.61213C12.0111 4.01118 12.0111 4.01118 12.0111 4.01118L12.0123 4.01152L12.0136 4.01189L12.0163 4.0127L12.0228 4.01463L12.0393 4.01977C12.0519 4.02379 12.0676 4.02902 12.0863 4.03566C12.1237 4.04894 12.1732 4.06783 12.2338 4.09383C12.3552 4.14586 12.5211 4.22621 12.7249 4.3468C13.1328 4.5882 13.6896 4.98918 14.3437 5.64333C14.9979 6.29747 15.3989 6.85429 15.6403 7.26218C15.7608 7.46594 15.8412 7.63183 15.8932 7.75323C15.9192 7.8139 15.9381 7.86337 15.9514 7.90079C15.958 7.9195 15.9633 7.93519 15.9673 7.94776L15.9724 7.96425L15.9744 7.97071L15.9752 7.97349L15.9755 7.97476C15.9755 7.97476 15.9759 7.97596 15.3749 8.14766L15.9759 7.97596C16.0707 8.30786 15.8785 8.65379 15.5466 8.74862C15.2175 8.84264 14.8747 8.6545 14.7764 8.32779L14.7734 8.31881C14.7689 8.30628 14.7597 8.28163 14.7443 8.24563C14.7135 8.17368 14.6575 8.05599 14.5645 7.89883C14.3787 7.58488 14.0431 7.11051 13.4598 6.52721C12.8766 5.94392 12.4022 5.60833 12.0882 5.42252C11.9311 5.32951 11.8134 5.27359 11.7414 5.24276C11.7054 5.22733 11.6808 5.21814 11.6682 5.21369L11.6593 5.21061C11.3326 5.11238 11.1444 4.76951 11.2384 4.44043Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a className="mail_vendor_button btn btn-outline">
                Mail Vendor &nbsp;
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.6433 4.3103C1.66699 5.28661 1.66699 6.85795 1.66699 10.0007C1.66699 13.1433 1.66699 14.7147 2.6433 15.691C3.61961 16.6673 5.19096 16.6673 8.33366 16.6673H11.667C14.8097 16.6673 16.381 16.6673 17.3573 15.691C18.3337 14.7147 18.3337 13.1433 18.3337 10.0007C18.3337 6.85795 18.3337 5.28661 17.3573 4.3103C16.381 3.33398 14.8097 3.33398 11.667 3.33398H8.33366C5.19096 3.33398 3.61961 3.33398 2.6433 4.3103ZM15.4805 6.2672C15.7014 6.53238 15.6656 6.92648 15.4004 7.14746L13.57 8.67279C12.8314 9.28834 12.2327 9.78725 11.7043 10.1271C11.1539 10.4811 10.6179 10.7047 10.0003 10.7047C9.38276 10.7047 8.84672 10.4811 8.29631 10.1271C7.76792 9.78725 7.16925 9.28834 6.43062 8.6728L4.60021 7.14746C4.33504 6.92648 4.29921 6.53238 4.52019 6.2672C4.74116 6.00203 5.13527 5.9662 5.40044 6.18718L7.19952 7.68641C7.97699 8.3343 8.51677 8.78266 8.97248 9.07576C9.41361 9.35948 9.71277 9.45471 10.0003 9.45471C10.2879 9.45471 10.587 9.35948 11.0282 9.07576C11.4839 8.78266 12.0237 8.3343 12.8011 7.68641L14.6002 6.18718C14.8654 5.9662 15.2595 6.00203 15.4805 6.2672Z"
                    fill="#252525"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={isMobileView ? "col-12 my-2" : "col-7 my-2 mx-2"}>
        <div
          className="card personal_details"
          style={{ height: "fit-content" }}
        >
          <div className="card-body">
            <div>
              <Button
                style={{
                  color: active === "Services" ? "#006875" : "black",
                  textTransform: "capitalize",
                  borderBottom:
                    active === "Services" ? "2px solid #006875" : "",
                }}
                onClick={() => setActive("Services")}
              >
                Services
              </Button>
              <Button
                style={{
                  color: active === "Vendor Details" ? "#006875" : "black",
                  textTransform: "capitalize",
                  borderBottom:
                    active === "Vendor Details" ? "2px solid #006875" : "",
                }}
                onClick={() => setActive("Vendor Details")}
              >
                Vendor Details
              </Button>
              <Button
                style={{
                  color: active === "Site Visits" ? "#006875" : "black",
                  textTransform: "capitalize",
                  borderBottom:
                    active === "Site Visits" ? "2px solid #006875" : "",
                }}
                onClick={() => setActive("Site Visits")}
              >
                Site Visits
              </Button>
              <Button
                style={{
                  color: active === "Proposals" ? "#006875" : "black",
                  textTransform: "capitalize",
                  borderBottom:
                    active === "Proposals" ? "2px solid #006875" : "",
                }}
                onClick={() => setActive("Proposals")}
              >
                Proposals
              </Button>
              <Button
                style={{
                  color: active === "Negotiations" ? "#006875" : "black",
                  textTransform: "capitalize",
                  borderBottom:
                    active === "Negotiations" ? "2px solid #006875" : "",
                }}
                onClick={() => setActive("Negotiations")}
              >
                Negotiations
              </Button>
              <Button
                style={{
                  color: active === "MOU / Charter" ? "#006875" : "black",
                  textTransform: "capitalize",
                  borderBottom:
                    active === "MOU / Charter" ? "2px solid #006875" : "",
                }}
                onClick={() => setActive("MOU / Charter")}
              >
                MOU / Charter
              </Button>
              <Button
                style={{
                  color: active === "Miscellaneous" ? "#006875" : "black",
                  textTransform: "capitalize",
                  borderBottom:
                    active === "Miscellaneous" ? "2px solid #006875" : "",
                }}
                onClick={() => setActive("Miscellaneous")}
              >
                Miscellaneous
              </Button>
            </div>

            {active === "Services" && (
              <>
                <button
                  onClick={() => navigate("/user-vendor/add-service/")}
                  className="btn  mt-2 px-4 py-2"
                  style={{ backgroundColor: "#187AF7", color: "white" }}
                >
                  Add Service &nbsp;
                  <svg
                    width={15}
                    height={15}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 3L10 17"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                    />
                    <path
                      d="M3 10H17"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                <div
                  style={{ borderRadius: "5px" }}
                  className="mt-4 w-100 px-2"
                >
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Category</th>
                          <th>Capacity</th>
                          <th>Location</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="d-flex text-dark">
                            <img
                              src={Avatars}
                              width={20}
                              height={20}
                              style={{ borderRadius: "50%" }}
                            />
                            <p className="mx-2">Achille Lauro</p>
                          </td>
                          <td className="text-dark">Jet Ski</td>
                          <td className="text-dark">-</td>
                          <td className="text-dark">Kuwait</td>
                          <td
                            style={{
                              display: "flex",
                              gap: "10px",
                              alignItems: "baseline",
                            }}
                          >
                            <Link
                              to={""}
                              className="btn btn-sm btn-dark"
                              style={{
                                padding: "2px 10px",
                                borderRadius: "4px",
                              }}
                            >
                              View &nbsp;
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="10"
                                height="10"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M4 12L12 4M12 4H6M12 4V10"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {active === "Vendor Details" && (
              <div>
                <button
                  onClick={() =>
                    navigate(`/user-vendor/edit/${vendorDetails?.id}`)
                  }
                  className="btn  mt-2 px-4 py-2"
                  style={{ backgroundColor: "#187AF7", color: "white" }}
                >
                  Edit Details &nbsp;
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={15}
                    height={15}
                    viewBox="0 0 21 20"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.2085 18.333C3.2085 17.9878 3.48832 17.708 3.8335 17.708H17.1668C17.512 17.708 17.7918 17.9878 17.7918 18.333C17.7918 18.6782 17.512 18.958 17.1668 18.958H3.8335C3.48832 18.958 3.2085 18.6782 3.2085 18.333Z"
                      fill="white"
                    />
                    <path
                      d="M9.31094 13.1837C9.52306 13.0183 9.71547 12.8259 10.1002 12.4411L15.0308 7.51054C14.3597 7.23124 13.5649 6.77246 12.8133 6.02078C12.0615 5.26898 11.6027 4.47405 11.3234 3.80293L6.39271 8.73359L6.39269 8.73361C6.00794 9.11837 5.81554 9.31076 5.65009 9.52288C5.45492 9.77311 5.28759 10.0439 5.15106 10.3303C5.03532 10.5732 4.94928 10.8313 4.7772 11.3475L3.8698 14.0698C3.78511 14.3238 3.85123 14.6039 4.04058 14.7932C4.22993 14.9826 4.51002 15.0487 4.76406 14.964L7.48628 14.0566C8.00251 13.8845 8.26063 13.7985 8.50348 13.6828C8.78996 13.5462 9.06071 13.3789 9.31094 13.1837Z"
                      fill="white"
                    />
                    <path
                      d="M16.399 6.14236C17.4228 5.11856 17.4228 3.45865 16.399 2.43484C15.3752 1.41104 13.7153 1.41104 12.6915 2.43484L12.1001 3.0262C12.1082 3.05066 12.1166 3.07545 12.1253 3.10056C12.3421 3.72532 12.751 4.54433 13.5204 5.31367C14.2897 6.08302 15.1087 6.49198 15.7335 6.70874C15.7585 6.71741 15.7832 6.72577 15.8075 6.73383L16.399 6.14236Z"
                      fill="white"
                    />
                  </svg>
                </button>
                <div
                  style={{ backgroundColor: "#F8F8F8", borderRadius: "5px" }}
                  className="mt-4 w-100 px-2"
                >
                  <p className="p-2" style={{ fontWeight: "700" }}>
                    Personal Details
                  </p>
                  <div className="d-flex">
                    <div className="col-4 px-2">
                      <div>
                        <p style={{ color: "#68727D" }}>Full Name</p>
                        <p style={{ fontWeight: "700" }}>
                          {vendorDetails?.first_name}
                          {vendorDetails?.last_name}
                        </p>
                      </div>
                      <div>
                        <p style={{ color: "#68727D" }}>Location</p>
                        <div className="d-flex justify-content-between">
                          <p style={{ fontWeight: "700" }}>
                            {" "}
                            {vendorDetails?.profileextra?.location}
                          </p>
                          <p>
                            <svg
                              width="18"
                              height="22"
                              viewBox="0 0 22 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M11.0003 1.83301C6.95024 1.83301 3.66699 5.50204 3.66699 9.62467C3.66699 13.715 6.00754 18.1611 9.6593 19.8679C10.5106 20.2658 11.4901 20.2658 12.3413 19.8679C15.9931 18.1611 18.3337 13.715 18.3337 9.62467C18.3337 5.50204 15.0504 1.83301 11.0003 1.83301ZM11.0003 10.9997C12.0128 10.9997 12.8337 10.1789 12.8337 9.16634C12.8337 8.15382 12.0128 7.33301 11.0003 7.33301C9.9878 7.33301 9.16699 8.15382 9.16699 9.16634C9.16699 10.1789 9.9878 10.9997 11.0003 10.9997Z"
                                fill="#323539"
                              />
                            </svg>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 px-2">
                      <div>
                        <p style={{ color: "#68727D" }}>Email</p>
                        <p style={{ fontWeight: "700" }}>
                          {vendorDetails?.email}
                        </p>
                      </div>
                      <div>
                        <p style={{ color: "#68727D" }}>ID Type</p>
                        <p style={{ fontWeight: "700" }}>Civil ID</p>
                      </div>
                    </div>
                    <div className="col-4 px-2">
                      <div>
                        <p style={{ color: "#68727D" }}>Phone</p>
                        <p style={{ fontWeight: "700" }}>
                          {" "}
                          {vendorDetails?.mobile}
                        </p>
                      </div>

                      <div>
                        <p style={{ color: "#68727D" }}>ID Number</p>
                        <p style={{ fontWeight: "700" }}>
                          {" "}
                          {vendorDetails?.company_company_user?.id_number}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{ backgroundColor: "#F8F8F8", borderRadius: "5px" }}
                  className="mt-4 w-100 px-2"
                >
                  <p className="p-2" style={{ fontWeight: "700" }}>
                    Company Details
                  </p>
                  <div className="d-flex">
                    <div className="col-4 px-2">
                      <div>
                        <p style={{ color: "#68727D" }}>Company Name</p>
                        <p style={{ fontWeight: "700" }}>
                          {" "}
                          {vendorDetails?.company_company_user?.name}
                        </p>
                      </div>
                      <div>
                        <p style={{ color: "#68727D" }}>Company Website</p>
                        <div className="d-flex justify-content-between">
                          <p style={{ fontWeight: "700" }}>
                            {vendorDetails?.company_company_user?.website}
                          </p>
                          <p>
                            <svg
                              width="18"
                              height="22"
                              viewBox="0 0 22 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M11.0003 1.83301C6.95024 1.83301 3.66699 5.50204 3.66699 9.62467C3.66699 13.715 6.00754 18.1611 9.6593 19.8679C10.5106 20.2658 11.4901 20.2658 12.3413 19.8679C15.9931 18.1611 18.3337 13.715 18.3337 9.62467C18.3337 5.50204 15.0504 1.83301 11.0003 1.83301ZM11.0003 10.9997C12.0128 10.9997 12.8337 10.1789 12.8337 9.16634C12.8337 8.15382 12.0128 7.33301 11.0003 7.33301C9.9878 7.33301 9.16699 8.15382 9.16699 9.16634C9.16699 10.1789 9.9878 10.9997 11.0003 10.9997Z"
                                fill="#323539"
                              />
                            </svg>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 px-2">
                      <div>
                        <p style={{ color: "#68727D" }}>Company Address</p>
                        <div className="d-flex justify-content-between">
                          <p style={{ fontWeight: "700" }}>
                            {" "}
                            {vendorDetails?.company_company_user?.address}
                          </p>
                          <p>
                            <svg
                              width="18"
                              height="22"
                              viewBox="0 0 22 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M11.0003 1.83301C6.95024 1.83301 3.66699 5.50204 3.66699 9.62467C3.66699 13.715 6.00754 18.1611 9.6593 19.8679C10.5106 20.2658 11.4901 20.2658 12.3413 19.8679C15.9931 18.1611 18.3337 13.715 18.3337 9.62467C18.3337 5.50204 15.0504 1.83301 11.0003 1.83301ZM11.0003 10.9997C12.0128 10.9997 12.8337 10.1789 12.8337 9.16634C12.8337 8.15382 12.0128 7.33301 11.0003 7.33301C9.9878 7.33301 9.16699 8.15382 9.16699 9.16634C9.16699 10.1789 9.9878 10.9997 11.0003 10.9997Z"
                                fill="#323539"
                              />
                            </svg>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 px-2">
                      <div>
                        <p style={{ color: "#68727D" }}>
                          Company Registration Number
                        </p>
                        <p style={{ fontWeight: "700" }}>
                          {" "}
                          {
                            vendorDetails?.company_company_user
                              ?.registration_number
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{ backgroundColor: "#F8F8F8", borderRadius: "5px" }}
                  className="mt-4 w-100 px-2"
                >
                  <p className="p-2" style={{ fontWeight: "700" }}>
                    Service Details
                  </p>
                  <div className="d-flex">
                    <div className="col-4 px-2">
                      <div>
                        <p style={{ color: "#68727D" }}>Define Services</p>
                        <p style={{ fontWeight: "700" }}>Boat</p>
                      </div>
                    </div>
                    <div className="col-4 px-2">
                      <div>
                        <p style={{ color: "#68727D" }}>Ownership</p>
                        <p style={{ fontWeight: "700" }}>
                          {vendorDetails?.company_company_user
                            ?.third_party_ownership ? (
                            <>Third Party Ownership</>
                          ) : (
                            <>Nill</>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {active === "Site Visits" && (
              <div>
                <button
                  onClick={() => handleOpenOffcanvas()}
                  className="btn  mt-2 px-4 py-2"
                  style={{ backgroundColor: "#187AF7", color: "white" }}
                >
                  Add Site Visit &nbsp;
                  <svg
                    width={15}
                    height={15}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 3L10 17"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                    />
                    <path
                      d="M3 10H17"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                <div
                  style={{ borderRadius: "5px" }}
                  className="mt-4 w-100 px-2"
                >
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="d-flex text-dark">
                            <p className="mx-2">Site Visit 1</p>
                          </td>
                          <td className="text-dark">18 JAN 2021</td>
                          <td className="text-dark">10:00 AM</td>

                          <td
                            style={{
                              display: "flex",
                              gap: "10px",
                              alignItems: "baseline",
                            }}
                          >
                            <Link
                              to={""}
                              className="btn btn-sm btn-dark"
                              style={{
                                padding: "2px 10px",
                                borderRadius: "4px",
                              }}
                            >
                              View &nbsp;
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="10"
                                height="10"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M4 12L12 4M12 4H6M12 4V10"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                {showOffcanvas && (
                  <AddSiteVisitModal
                    title={active}
                    show={showOffcanvas}
                    close={handleCloseOffcanvas}
                  />
                )}
              </div>
            )}
            {active === "Proposals" && (
              <div>
                <button
                  onClick={() => handleOpenOffcanvas()}
                  className="btn  mt-2 px-4 py-2"
                  style={{ backgroundColor: "#187AF7", color: "white" }}
                >
                  Add Proposal &nbsp;
                  <svg
                    width={15}
                    height={15}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 3L10 17"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                    />
                    <path
                      d="M3 10H17"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                <div
                  style={{ borderRadius: "5px" }}
                  className="mt-4 w-100 px-2"
                >
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="d-flex text-dark">
                            <p className="mx-2">Proposal 1</p>
                          </td>
                          <td className="text-dark">18 JAN 2021</td>
                          <td className="text-dark">10:00 AM</td>

                          <td
                            style={{
                              display: "flex",
                              gap: "10px",
                              alignItems: "baseline",
                            }}
                          >
                            <Link
                              to={""}
                              className="btn btn-sm btn-dark"
                              style={{
                                padding: "2px 10px",
                                borderRadius: "4px",
                              }}
                            >
                              View &nbsp;
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="10"
                                height="10"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M4 12L12 4M12 4H6M12 4V10"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                {showOffcanvas && (
                  <AddSiteVisitModal
                    title={active}
                    show={showOffcanvas}
                    close={handleCloseOffcanvas}
                  />
                )}
              </div>
            )}
            {active === "Negotiations" && (
              <div>
                <button
                  onClick={() => handleOpenOffcanvas()}
                  className="btn  mt-2 px-4 py-2"
                  style={{ backgroundColor: "#187AF7", color: "white" }}
                >
                  Add Negotiation &nbsp;
                  <svg
                    width={15}
                    height={15}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 3L10 17"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                    />
                    <path
                      d="M3 10H17"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                <div
                  style={{ borderRadius: "5px" }}
                  className="mt-4 w-100 px-2"
                >
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="d-flex text-dark">
                            <p className="mx-2">Negotiation 1</p>
                          </td>
                          <td className="text-dark">18 JAN 2021</td>
                          <td className="text-dark">10:00 AM</td>

                          <td
                            style={{
                              display: "flex",
                              gap: "10px",
                              alignItems: "baseline",
                            }}
                          >
                            <Link
                              to={""}
                              className="btn btn-sm btn-dark"
                              style={{
                                padding: "2px 10px",
                                borderRadius: "4px",
                              }}
                            >
                              View &nbsp;
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="10"
                                height="10"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M4 12L12 4M12 4H6M12 4V10"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                {showOffcanvas && (
                  <AddSiteVisitModal
                    title={active}
                    show={showOffcanvas}
                    close={handleCloseOffcanvas}
                  />
                )}
              </div>
            )}
            {active === "MOU / Charter" && (
              <div>
                <button
                  onClick={() => handleOpenOffcanvas()}
                  className="btn  mt-2 px-4 py-2"
                  style={{ backgroundColor: "#187AF7", color: "white" }}
                >
                  Add MOU / Charter&nbsp;
                  <svg
                    width={15}
                    height={15}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 3L10 17"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                    />
                    <path
                      d="M3 10H17"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                <div
                  style={{ borderRadius: "5px" }}
                  className="mt-4 w-100 px-2"
                >
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="d-flex text-dark">
                            <p className="mx-2">Charter</p>
                          </td>
                          <td className="text-dark">18 JAN 2021</td>
                          <td className="text-dark">10:00 AM</td>

                          <td
                            style={{
                              display: "flex",
                              gap: "10px",
                              alignItems: "baseline",
                            }}
                          >
                            <Link
                              to={""}
                              className="btn btn-sm btn-dark"
                              style={{
                                padding: "2px 10px",
                                borderRadius: "4px",
                              }}
                            >
                              View &nbsp;
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="10"
                                height="10"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M4 12L12 4M12 4H6M12 4V10"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                {showOffcanvas && (
                  <AddSiteVisitModal
                    title={active}
                    show={showOffcanvas}
                    close={handleCloseOffcanvas}
                  />
                )}
              </div>
            )}
            {active === "Miscellaneous" && (
              <div>
                <button
                  onClick={() => handleOpenOffcanvas()}
                  className="btn  mt-2 px-4 py-2"
                  style={{ backgroundColor: "#187AF7", color: "white" }}
                >
                  Add Attach./ Note &nbsp;
                  <svg
                    width={15}
                    height={15}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 3L10 17"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                    />
                    <path
                      d="M3 10H17"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                <div
                  style={{ borderRadius: "5px" }}
                  className="mt-4 w-100 px-2"
                >
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Type</th>
                          <th>Time</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="d-flex text-dark">
                            <p className="mx-2">SV01</p>
                          </td>
                          <td className="text-dark">Document</td>
                          <td className="text-dark">10:00 AM</td>

                          <td
                            style={{
                              display: "flex",
                              gap: "10px",
                              alignItems: "baseline",
                            }}
                          >
                            <Link
                              to={""}
                              className="btn btn-sm btn-dark"
                              style={{
                                padding: "2px 10px",
                                borderRadius: "4px",
                              }}
                            >
                              View &nbsp;
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="10"
                                height="10"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M4 12L12 4M12 4H6M12 4V10"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                {showOffcanvas && (
                  <AddSiteVisitModal
                    title={active}
                    show={showOffcanvas}
                    close={handleCloseOffcanvas}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserVendorCardDetails;
