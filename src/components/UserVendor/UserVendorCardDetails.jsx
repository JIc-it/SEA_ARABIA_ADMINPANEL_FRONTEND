import { Button } from "@mui/material";
import customerImg from "../../assets/images/customerimg.png";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext, useEffect, useState } from "react";
import Avatars from "../../assets/images/Avatar.png";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AddSiteVisitModal from "../Vendor_tabs/SiteVisit/AddSiteVisitModal";
import { getListDataInPagination } from "../../services/commonServices";
import {
  formatDate,
  getMenuPermissions,
  removeBaseUrlFromPath,
} from "../../helpers";
import { getVendorListById } from "../../services/leadMangement";
import { getServiceListing } from "../../services/service";
import {} from "../../services/CustomerHandle";
import VenderDetailsList from "./UserVendorTabs/VenderDetails/VenderDetailsList";
import { getUserVendorStatusUpdate } from "../../services/userVendorsServices";
import SiteVisitList from "./UserVendorTabs/SiteVisit/SiteVisitList";
import Proposal from "./UserVendorTabs/Proposal/Proposal";
import MOU from "./UserVendorTabs/MOUCharter/MOU";
import NegotationsList from "./UserVendorTabs/Negotiation/NegotationsList";
import MiscellaneousList from "./UserVendorTabs/Miscellaneous/MiscellaneousList";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import {
  menuIdConstant,
  permissionCategory,
} from "../Permissions/PermissionConstants";
import { MainPageContext } from "../../Context/MainPageContext";
import WithPermission from "../HigherOrderComponents/PermissionCheck/WithPermission";
import CommonButtonForPermission from "../HigherOrderComponents/CommonButtonForPermission";

function UserVendorCardDetails({ venderDetails }) {
  const { userPermissionList } = useContext(MainPageContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const [listPageUrl, setListPageUrl] = useState({
    next: null,
    previous: null,
  });

  const vendorId = useParams()?.id;

  const customerId = useParams()?.customerId;
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
  const [active, setActive] = useState("Services");
  const [isToggled, setToggled] = useState(true);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [isRefetch, setIsRefetch] = useState(false);
  const [isloadingservice, setIsLoadingService] = useState(false);

  const handleOpenOffcanvas = () => setShowOffcanvas(true);

  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const [serviceList, setServiceList] = useState([]);

  useEffect(() => {
    venderDetails && setToggled(venderDetails.company_status);
  }, [venderDetails]);

  const handleToggle = () => {
    getUserVendorStatusUpdate(
      venderDetails?.company_company_user?.id,
      !isToggled
    )
      .then((data) => {
        // If you need to update the state after the API call, use setIsToggled here
        setToggled(data.is_active);
      })
      .catch((error) => {
        // toast.error(error.message);
        console.log(error);
      });
  };

  useEffect(() => {
    const companyId = venderDetails?.company_company_user?.id;

    if (companyId) {
      setIsLoadingService(true);
      getServiceListing(null, companyId)
        .then((data) => {
          setIsLoadingService(false);
          setListPageUrl({ next: data.next, previous: data.previous });
          setServiceList(data.results);
        })
        .catch((error) => {
          setIsLoadingService(false);
          toast.error(error.response.data);
        });
    }
  }, [venderDetails?.company_company_user?.id]);

  const handlePagination = async (type) => {
    let convertedUrl =
      type === "next"
        ? listPageUrl.next && removeBaseUrlFromPath(listPageUrl.next)
        : type === "prev"
        ? listPageUrl.previous && removeBaseUrlFromPath(listPageUrl.previous)
        : null;
    convertedUrl &&
      getListDataInPagination(convertedUrl)
        .then((data) => {
          setListPageUrl({ next: data.next, previous: data.previous });
          setServiceList(data?.results);
        })
        .catch((error) => {
          toast.error(error.response.data);
        });
  };

  const CreateServiceWithPermission = WithPermission(
    CommonButtonForPermission,
    permissionCategory.create,
    menuIdConstant.serviceManagement,
    () => navigate("/service-add/" + venderDetails?.company_company_user?.id),
    "btn  mt-2 px-4 py-2",
    "  Add Service ",
    { backgroundColor: "#187AF7", color: "white" },
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
      <path d="M3 10H17" stroke="white" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );

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
              <p className="card_content pt-0 ">{venderDetails?.first_name}</p>
              <div className="card_header_contents">
                <p className="card_content" style={{ display: "inline-flex" }}>
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
                  &nbsp; {venderDetails?.account_id}{" "}
                  <p style={{ marginLeft: "3px" }}>| &nbsp;</p>
                </p>
                <p className="card_content" style={{ display: "inline-flex" }}>
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
                  &nbsp; {venderDetails?.role}{" "}
                  <p style={{ marginLeft: "3px" }}>| &nbsp;</p>
                </p>
                <p className="card_content" style={{ display: "inline-flex" }}>
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
                  &nbsp; {venderDetails?.profileextra?.location?.country}
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
                  <span> {venderDetails?.email} </span>
                </div>
              </div>
              <div className="vendor_info_new">
                <span className="heading_name">Phone</span>
                <span>{venderDetails?.mobile}</span>
              </div>
              <div className="vendor_info_new">
                <span className="heading_name pb-2">ID Number</span>
                <span>{venderDetails?.useridentificationdata?.id_number}</span>
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
                  <span>{venderDetails?.company_company_user?.name}</span>
                </div>
                <div className="vendor_info_new">
                  <span className="heading_name">
                    Company Registration Number
                  </span>
                  <span>
                    {venderDetails?.company_company_user?.registration_number}
                  </span>
                </div>
                <div className="vendor_info_new">
                  <span className="heading_name pb-2">Address</span>
                  <span style={{ width: "90%" }} className="mx-2">
                    {venderDetails?.company_company_user?.address} &nbsp;
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
                  <label className="switch me-5" style={{ marginRight: "5px" }}>
                    <input
                      type="checkbox"
                      checked={isToggled}
                      name="checkbox-is_active"
                      id="checkbox-is_active"
                      onChange={handleToggle}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", padding: "10px 0" }}>
              {userPermissionList &&
                getMenuPermissions(
                  userPermissionList,
                  menuIdConstant.booking,
                  permissionCategory.view
                ) && (
                  <a
                    className="mail_vendor_button btn btn-outline mx-1"
                    style={{ backgroundColor: "#187AF7", color: "white" }}
                    onClick={() => {
                      navigate(`/booking`);
                      // navigate(`/booking-view/1234`);
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
                  </a>
                )}
              <a
                className="mail_vendor_button btn btn-outline mx-1"
                onClick={() => {
                  navigate(
                    `/user-vendor-activity-log/${venderDetails?.id}/${venderDetails?.first_name}`
                  );
                }}
              >
                Activity Log &nbsp;
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <g clip-path="url(#clip0_4495_25266)">
                    <path
                      d="M9.05761 17.9252L9.91816 18.4345V18.4345L9.05761 17.9252ZM9.2738 17.5599L8.41325 17.0506L8.41325 17.0506L9.2738 17.5599ZM7.39251 17.5599L8.25307 17.0506L8.25306 17.0506L7.39251 17.5599ZM7.60871 17.9252L6.74815 18.4345L6.74815 18.4345L7.60871 17.9252ZM1.92024 14.2757L2.84412 13.893V13.893L1.92024 14.2757ZM5.24092 16.3208L5.27289 15.3213H5.27289L5.24092 16.3208ZM3.72423 16.0796L3.34154 17.0035H3.34154L3.72423 16.0796ZM14.7461 14.2757L15.67 14.6583L15.67 14.6583L14.7461 14.2757ZM11.4254 16.3208L11.3934 15.3213L11.4254 16.3208ZM12.9421 16.0796L13.3248 17.0035L12.9421 16.0796ZM13.4082 5.4912L13.9307 4.63856V4.63856L13.4082 5.4912ZM14.5086 6.59168L15.3613 6.06918L15.3613 6.06918L14.5086 6.59168ZM3.25818 5.4912L2.73567 4.63856H2.73567L3.25818 5.4912ZM2.1577 6.59168L1.30506 6.06918L1.30506 6.06918L2.1577 6.59168ZM6.59682 16.5186L6.08769 17.3793L6.08769 17.3793L6.59682 16.5186ZM9.91816 18.4345L10.1344 18.0693L8.41325 17.0506L8.19705 17.4158L9.91816 18.4345ZM6.53196 18.0693L6.74815 18.4345L8.46926 17.4158L8.25307 17.0506L6.53196 18.0693ZM8.19705 17.4158C8.23314 17.3548 8.29646 17.3333 8.33316 17.3333C8.36986 17.3333 8.43317 17.3548 8.46926 17.4158L6.74815 18.4345C7.45748 19.6329 9.20884 19.6329 9.91816 18.4345L8.19705 17.4158ZM7.33317 6H9.33317V4H7.33317V6ZM13.9998 10.6667V11.3334H15.9998V10.6667H13.9998ZM2.6665 11.3334V10.6667H0.666504V11.3334H2.6665ZM0.666504 11.3334C0.666504 12.0963 0.665962 12.7185 0.70054 13.2253C0.735731 13.7411 0.810608 14.2099 0.996359 14.6583L2.84412 13.893C2.77613 13.7288 2.72414 13.5031 2.6959 13.0891C2.66705 12.6662 2.6665 12.1236 2.6665 11.3334H0.666504ZM5.27289 15.3213C4.62158 15.3005 4.31973 15.2439 4.10691 15.1558L3.34154 17.0035C3.9046 17.2368 4.51015 17.298 5.20896 17.3203L5.27289 15.3213ZM0.996359 14.6583C1.43617 15.7201 2.27975 16.5637 3.34154 17.0035L4.10691 15.1558C3.53518 14.9189 3.08094 14.4647 2.84412 13.893L0.996359 14.6583ZM13.9998 11.3334C13.9998 12.1236 13.9993 12.6662 13.9704 13.0891C13.9422 13.5031 13.8902 13.7288 13.8222 13.893L15.67 14.6583C15.8557 14.2099 15.9306 13.7411 15.9658 13.2253C16.0004 12.7185 15.9998 12.0963 15.9998 11.3334H13.9998ZM11.4574 17.3203C12.1562 17.298 12.7617 17.2368 13.3248 17.0035L12.5594 15.1558C12.3466 15.2439 12.0448 15.3005 11.3934 15.3213L11.4574 17.3203ZM13.8222 13.893C13.5854 14.4647 13.1312 14.9189 12.5594 15.1558L13.3248 17.0035C14.3866 16.5637 15.2302 15.7201 15.67 14.6583L13.8222 13.893ZM9.33317 6C10.4437 6 11.2063 6.00106 11.7938 6.05691C12.3664 6.11135 12.6684 6.21071 12.8857 6.34384L13.9307 4.63856C13.3464 4.28049 12.7021 4.13425 11.9831 4.06589C11.279 3.99894 10.405 4 9.33317 4V6ZM15.9998 10.6667C15.9998 9.59491 16.0009 8.72084 15.9339 8.01676C15.8656 7.29779 15.7193 6.6535 15.3613 6.06918L13.656 7.11417C13.7891 7.33143 13.8885 7.63349 13.9429 8.20606C13.9988 8.79352 13.9998 9.55618 13.9998 10.6667H15.9998ZM12.8857 6.34384C13.1996 6.53624 13.4636 6.80021 13.656 7.11418L15.3613 6.06918C15.004 5.48611 14.5137 4.99587 13.9307 4.63856L12.8857 6.34384ZM7.33317 4C6.26139 4 5.38733 3.99894 4.68325 4.06589C3.96428 4.13425 3.31999 4.28049 2.73567 4.63856L3.78068 6.34384C3.99793 6.21071 4.29999 6.11135 4.87256 6.05691C5.46001 6.00106 6.22266 6 7.33317 6V4ZM2.6665 10.6667C2.6665 9.55618 2.66756 8.79352 2.72341 8.20606C2.77785 7.63349 2.87721 7.33143 3.01034 7.11418L1.30506 6.06918C0.946996 6.6535 0.800753 7.29779 0.732394 8.01676C0.665449 8.72084 0.666504 9.59491 0.666504 10.6667H2.6665ZM2.73567 4.63856C2.1526 4.99587 1.66237 5.48611 1.30506 6.06918L3.01034 7.11418C3.20274 6.80021 3.46671 6.53624 3.78068 6.34384L2.73567 4.63856ZM8.25306 17.0506C8.08927 16.7738 7.93239 16.5068 7.77732 16.2933C7.61037 16.0634 7.40322 15.8338 7.10594 15.6579L6.08769 17.3793C6.06638 17.3667 6.08384 17.365 6.15913 17.4686C6.24629 17.5886 6.34927 17.7606 6.53196 18.0693L8.25306 17.0506ZM5.20896 17.3203C5.5869 17.3324 5.80457 17.3403 5.96428 17.3598C6.10825 17.3773 6.11518 17.3956 6.08769 17.3793L7.10594 15.6579C6.80249 15.4784 6.49144 15.4093 6.20644 15.3745C5.93719 15.3417 5.6149 15.3323 5.27289 15.3213L5.20896 17.3203ZM10.1344 18.0693C10.317 17.7606 10.42 17.5886 10.5072 17.4686C10.5825 17.365 10.5999 17.3667 10.5786 17.3793L9.56038 15.6579C9.26309 15.8338 9.05595 16.0634 8.889 16.2933C8.73392 16.5068 8.57704 16.7738 8.41325 17.0506L10.1344 18.0693ZM11.3934 15.3213C11.0514 15.3323 10.7291 15.3417 10.4599 15.3745C10.1749 15.4093 9.86383 15.4784 9.56038 15.6579L10.5786 17.3793C10.5511 17.3956 10.5581 17.3773 10.702 17.3598C10.8617 17.3403 11.0794 17.3324 11.4574 17.3203L11.3934 15.3213Z"
                      fill="#252525"
                    />
                    <path
                      d="M18.0952 10.3629L19.0191 10.7456L19.0191 10.7456L18.0952 10.3629ZM16.404 12.0542L16.7867 12.978L16.7867 12.978L16.404 12.0542ZM16.8409 2.12749L16.3184 2.98013L16.8409 2.12749ZM17.8726 3.15919L18.7253 2.63669V2.63669L17.8726 3.15919ZM7.32532 2.12749L6.80282 1.27485L6.80282 1.27485L7.32532 2.12749ZM6.29363 3.15919L5.44098 2.63669V2.63669L6.29363 3.15919ZM11.1456 2.66699H13.0206V0.666992H11.1456V2.66699ZM17.3331 6.97951V7.60452H19.3331V6.97951H17.3331ZM17.3331 7.60452C17.3331 8.34624 17.3326 8.85244 17.3057 9.24631C17.2794 9.6312 17.2314 9.83525 17.1714 9.98023L19.0191 10.7456C19.1969 10.3163 19.2679 9.86917 19.3011 9.38246C19.3337 8.90472 19.3331 8.31887 19.3331 7.60452H17.3331ZM17.1714 9.98023C16.9557 10.5009 16.542 10.9146 16.0213 11.1303L16.7867 12.978C17.7974 12.5594 18.6005 11.7563 19.0191 10.7456L17.1714 9.98023ZM13.0206 2.66699C14.0629 2.66699 14.7744 2.66805 15.3215 2.72007C15.8537 2.77067 16.1262 2.86235 16.3184 2.98013L17.3634 1.27485C16.8042 0.932136 16.1895 0.793567 15.5108 0.729045C14.8471 0.665937 14.0242 0.666992 13.0206 0.666992V2.66699ZM19.3331 6.97951C19.3331 5.97593 19.3342 5.15301 19.2711 4.48929C19.2066 3.81068 19.068 3.19596 18.7253 2.63669L17.02 3.68169C17.1378 3.87389 17.2295 4.14638 17.2801 4.67859C17.3321 5.22569 17.3331 5.9372 17.3331 6.97951H19.3331ZM16.3184 2.98013C16.6044 3.15535 16.8448 3.39576 17.02 3.68169L18.7253 2.63669C18.3851 2.08165 17.9185 1.61499 17.3634 1.27485L16.3184 2.98013ZM11.1456 0.666992C10.142 0.666992 9.31913 0.665937 8.65541 0.729045C7.9768 0.793567 7.36208 0.932136 6.80282 1.27485L7.84782 2.98013C8.04002 2.86235 8.31251 2.77067 8.84472 2.72007C9.39181 2.66805 10.1033 2.66699 11.1456 2.66699V0.666992ZM6.80282 1.27485C6.24778 1.61499 5.78111 2.08165 5.44098 2.63669L7.14627 3.68169C7.32149 3.39576 7.56189 3.15535 7.84782 2.98013L6.80282 1.27485ZM6.85949 5.05227C6.90029 4.26783 7.001 3.91874 7.14627 3.68169L5.44098 2.63669C5.02617 3.31361 4.9074 4.07928 4.86219 4.94838L6.85949 5.05227ZM15.0331 13.2791C15.6814 13.2576 16.2526 13.1993 16.7867 12.978L16.0213 11.1303C15.8348 11.2075 15.5645 11.2604 14.9666 11.2802L15.0331 13.2791Z"
                      fill="#252525"
                    />
                    <path
                      d="M5.42432 10.833H5.43182M8.33325 10.833H8.34075M11.2424 10.833H11.2499"
                      stroke="#252525"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4495_25266">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </div>
            <div style={{ display: "flex", padding: "10px 0" }}>
              <a
                className="mail_vendor_button btn btn-outline mx-1"
                style={{ backgroundColor: "#252525", color: "white" }}
                onClick={() => {
                  window.location.href = `tel:${venderDetails?.mobile}`;
                }}
              >
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
              <a
                className="mail_vendor_button btn btn-outline mx-1"
                onClick={() => {
                  // Open a new tab
                  const newTab = window.open("", "_blank");

                  // Redirect the new tab to Gmail with the mailto link
                  newTab.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${venderDetails?.email}`;

                  // const gmailComposeUrl = `https://mail.google.com/mail/u/0/#inbox?compose=new&to=${venderDetails?.email}`;

                  // // Open the Gmail compose window in a new tab
                  // const newTab = window.open(gmailComposeUrl, "_blank");
                  if (newTab) {
                    newTab.focus();
                  }
                }}
              >
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
                <CreateServiceWithPermission />
               
                {!isloadingservice && serviceList.length > 0 && (
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
                          {serviceList.length > 0 &&
                            serviceList.map((data) => (
                              <tr>
                                <td className="d-flex text-dark">
                                  <img
                                    src={Avatars}
                                    width={20}
                                    height={20}
                                    style={{ borderRadius: "50%" }}
                                  />
                                  <p className="mx-2">{data?.name}</p>
                                </td>
                                <td className="text-dark">
                                  {data?.category?.map((cate) => cate)}
                                </td>
                                <td className="text-dark">{data?.capacity}</td>
                                <td className="text-dark">
                                  {data?.pickup_point_or_location}
                                </td>
                                <td
                                  style={{
                                    display: "flex",
                                    gap: "10px",
                                    alignItems: "baseline",
                                  }}
                                >
                                  <Link
                                    to={"/service-view/" + data?.id}
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
                            ))}
                        </tbody>
                      </table>
                      {serviceList.length > 0 && (
                        <div className="d-flex align-items-center">
                          <ul className="pagination m-0 ms-auto">
                            <li
                              className={`page-item  ${
                                !listPageUrl.previous && "disabled"
                              }`}
                            >
                              <a
                                className="page-link"
                                href="#"
                                tabIndex="-1"
                                onClick={() => {
                                  handlePagination("prev");
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="icon"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  strokeWidth="2"
                                  stroke="currentColor"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                  />
                                  <path d="M15 6l-6 6l6 6" />
                                </svg>
                                prev
                              </a>
                            </li>

                            <li
                              className={`page-item  ${
                                !listPageUrl.next && "disabled"
                              }`}
                            >
                              <a
                                className="page-link"
                                href="#"
                                onClick={() => {
                                  handlePagination("next");
                                }}
                              >
                                next
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="icon"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  strokeWidth="2"
                                  stroke="currentColor"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                  />
                                  <path d="M9 6l6 6l-6 6" />
                                </svg>
                              </a>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {isloadingservice && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "5vh",
                    }}
                  >
                    <CircularProgress />
                  </div>
                )}
                {serviceList.length === 0 && (
                  <p
                    style={{
                      textAlign: "center",
                      marginTop: "10px",
                      fontWeight: "550",
                    }}
                  >
                    No Service Found
                  </p>
                )}
              </>
            )}

            {active === "Vendor Details" && (
              <VenderDetailsList venderDetails={venderDetails} />
            )}

            {active === "Site Visits" && (
              <SiteVisitList
                companyID={venderDetails?.company_company_user?.id}
              />
            )}
            {active === "Proposals" && (
              <Proposal companyID={venderDetails?.company_company_user?.id} />
            )}
            {active === "Negotiations" && (
              <NegotationsList
                companyID={venderDetails?.company_company_user?.id}
              />
            )}
            {active === "MOU / Charter" && (
              <MOU companyID={venderDetails?.company_company_user?.id} />
            )}
            {active === "Miscellaneous" && (
              <MiscellaneousList
                companyID={venderDetails?.company_company_user?.id}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserVendorCardDetails;
