import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { toast } from "react-toastify";
import tick from "../../assets/images/uil_check.png";
import { useParams } from "react-router-dom";
import { getBooking, updateCancellation } from "../../services/booking";
import { CircularProgress } from "@mui/material";
import RefundModal from "./RefundModal";
import CancellationModal from "./CancellationModal";

export default function RefundRequestView() {
  const params = useParams();
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [booking, setBooking] = useState({});
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const cancelBooking = () => {
    updateCancellation(params.id)
      .then((data) => toast.success(data))
      .catch((err) => toast.error(err.response.data.error));
  };

  useEffect(() => {
    setIsLoading(true);
    getBooking(params.id)
      .then((data) => {
        setIsLoading(false);
        setBooking(data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching  data:", error);
      });
  }, [params.id]);

  console.log(booking, "one");

  const statusCheck = () => {
    if (booking?.status === "Opened") {
      return "Opened";
    }
    if (booking?.status === "Completed") {
      return "Completed";
    }
    if (booking?.status === "Cancelled") {
      return "Cancelled";
    }
    if (booking?.status === "Unsuccessful") {
      return "Unsuccessful";
    }
    if (booking?.status === "Upcoming") {
      return "Upcoming";
    }
  };

  return (
    <>
      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <CircularProgress />
        </div>
      )}
      {!isLoading && (
        <div className="page">
          <div className="page-body">
            <div className="container-xl">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex justify-content-between mt-1 ms-3">
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(-1)}
                  >
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 12H4M4 12L10 6M4 12L10 18"
                        stroke="#252525"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>{" "}
                    &nbsp;<span style={{ fontWeight: "800" }}>Back</span>
                  </div>
                </div>

                {/* <button className='btn btn-danger' onClick={()=>setOpen2(true)}>Cancel Booking &nbsp;
                            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                <path d="M16.1268 6.34754L12.8278 3.37845C11.8879 2.53256 11.418 2.10961 10.8413 1.88835L10.8337 4.16708C10.8337 6.13127 10.8337 7.11336 11.4439 7.72355C12.054 8.33375 13.0361 8.33375 15.0003 8.33375H17.9837C17.6816 7.7469 17.1406 7.26003 16.1268 6.34754Z" fill="white" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.33366 18.3337H11.667C14.8097 18.3337 16.381 18.3337 17.3573 17.3573C18.3337 16.381 18.3337 14.8097 18.3337 11.667V11.3027C18.3337 10.5754 18.3337 10.029 18.2982 9.58375H15.0003L14.9213 9.58375C14.007 9.58382 13.199 9.58389 12.5478 9.49633C11.8419 9.40142 11.136 9.1835 10.56 8.60744C9.98391 8.03138 9.76599 7.32556 9.67108 6.61962C9.58352 5.96836 9.58358 5.16039 9.58366 4.24613L9.59135 1.88413C9.59158 1.81543 9.59746 1.74749 9.60867 1.68088C9.26816 1.66699 8.86349 1.66699 8.35849 1.66699C5.19924 1.66699 3.61961 1.66699 2.6433 2.6433C1.66699 3.61961 1.66699 5.19096 1.66699 8.33366V11.667C1.66699 14.8097 1.66699 16.381 2.6433 17.3573C3.61961 18.3337 5.19096 18.3337 8.33366 18.3337ZM4.55838 12.0584C4.80246 11.8143 5.19819 11.8143 5.44227 12.0584L6.25033 12.8664L7.05838 12.0584C7.30246 11.8143 7.69819 11.8143 7.94227 12.0584C8.18635 12.3025 8.18635 12.6982 7.94227 12.9423L7.13421 13.7503L7.94227 14.5584C8.18635 14.8025 8.18635 15.1982 7.94227 15.4423C7.69819 15.6863 7.30246 15.6863 7.05838 15.4423L6.25033 14.6342L5.44227 15.4423C5.19819 15.6863 4.80246 15.6863 4.55838 15.4423C4.31431 15.1982 4.31431 14.8025 4.55838 14.5584L5.36644 13.7503L4.55838 12.9423C4.31431 12.6982 4.31431 12.3025 4.55838 12.0584Z" fill="white" />
                            </svg>

                        </button> */}
              </div>

              {/* section-1 */}

              <div
                className={
                  isMobileView ? "d-flex flex-column" : "d-flex flex-row"
                }
              >
                <div
                  className={
                    isMobileView ? "col-12 card mt-3" : "col-5 card mt-2 mx-1"
                  }
                  style={{ borderRadius: "8px" }}
                >
                  <div
                    className={"centered-container"}
                    style={{ height: isMobileView ? "35vh" : "25vh" }}
                  >
                    {booking?.status === "Complete" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={48}
                        height={48}
                        viewBox="0 0 48 48"
                        fill="none"
                      >
                        <path
                          opacity="0.4"
                          d="M44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24Z"
                          fill="#08A747"
                        />
                        <path
                          d="M32.0607 17.9393C32.6464 18.5251 32.6464 19.4749 32.0607 20.0607L22.0607 30.0607C21.4749 30.6464 20.5251 30.6464 19.9393 30.0607L15.9393 26.0607C15.3536 25.4749 15.3536 24.5251 15.9393 23.9393C16.5251 23.3536 17.4749 23.3536 18.0607 23.9393L21 26.8787L25.4697 22.409L29.9393 17.9393C30.5251 17.3536 31.4749 17.3536 32.0607 17.9393Z"
                          fill="#08A747"
                        />
                      </svg>
                    )}
                    {booking?.status === "Opened" && (
                      <svg
                        width={48}
                        height={48}
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.4"
                          d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
                          fill="#2684FC"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M23.1628 12.8372C23.1628 12.3748 23.5376 12 24 12C30.6274 12 36 17.3726 36 24C36 30.6274 30.6274 36 24 36C17.3726 36 12 30.6274 12 24C12 23.5376 12.3748 23.1628 12.8372 23.1628C13.2996 23.1628 13.6744 23.5376 13.6744 24C13.6744 29.7027 18.2973 34.3256 24 34.3256C29.7027 34.3256 34.3256 29.7027 34.3256 24C34.3256 18.2973 29.7027 13.6744 24 13.6744C23.5376 13.6744 23.1628 13.2996 23.1628 12.8372Z"
                          fill="#2684FC"
                        />
                        <path
                          opacity="0.5"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M20.7624 13.282C20.9289 13.7134 20.7142 14.1981 20.2829 14.3646C20.125 14.4255 19.969 14.4902 19.8149 14.5586C19.3923 14.7462 18.8976 14.5557 18.71 14.1331C18.5224 13.7105 18.7129 13.2158 19.1355 13.0282C19.3147 12.9487 19.4962 12.8734 19.6799 12.8025C20.1112 12.636 20.5959 12.8507 20.7624 13.282ZM16.9091 15.339C17.228 15.6739 17.2151 16.2038 16.8803 16.5227C16.7578 16.6393 16.6383 16.7588 16.5217 16.8812C16.2028 17.2161 15.6729 17.229 15.338 16.9101C15.0032 16.5912 14.9903 16.0613 15.3092 15.7265C15.4445 15.5843 15.5834 15.4455 15.7255 15.3101C16.0603 14.9913 16.5903 15.0042 16.9091 15.339ZM14.1321 18.711C14.5547 18.8986 14.7452 19.3933 14.5576 19.8159C14.4893 19.9699 14.4245 20.126 14.3636 20.2838C14.1971 20.7152 13.7124 20.9299 13.2811 20.7634C12.8497 20.5969 12.635 20.1122 12.8015 19.6808C12.8724 19.4972 12.9477 19.3157 13.0272 19.1365C13.2149 18.7139 13.7095 18.5234 14.1321 18.711Z"
                          fill="#2684FC"
                        />
                        <path
                          opacity="0.5"
                          d="M24.0003 19.8125C24.4627 19.8125 24.8375 20.1873 24.8375 20.6497V24.2776H28.4654C28.9278 24.2776 29.3026 24.6524 29.3026 25.1148C29.3026 25.5772 28.9278 25.952 28.4654 25.952H24.0003C23.5379 25.952 23.1631 25.5772 23.1631 25.1148V20.6497C23.1631 20.1873 23.5379 19.8125 24.0003 19.8125Z"
                          fill="#2684FC"
                        />
                      </svg>
                    )}
                    {booking?.status === "Upcoming" && (
                      <svg
                        width={48}
                        height={48}
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.4"
                          d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
                          fill="#2684FC"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M23.1628 12.8372C23.1628 12.3748 23.5376 12 24 12C30.6274 12 36 17.3726 36 24C36 30.6274 30.6274 36 24 36C17.3726 36 12 30.6274 12 24C12 23.5376 12.3748 23.1628 12.8372 23.1628C13.2996 23.1628 13.6744 23.5376 13.6744 24C13.6744 29.7027 18.2973 34.3256 24 34.3256C29.7027 34.3256 34.3256 29.7027 34.3256 24C34.3256 18.2973 29.7027 13.6744 24 13.6744C23.5376 13.6744 23.1628 13.2996 23.1628 12.8372Z"
                          fill="#2684FC"
                        />
                        <path
                          opacity="0.5"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M20.7624 13.282C20.9289 13.7134 20.7142 14.1981 20.2829 14.3646C20.125 14.4255 19.969 14.4902 19.8149 14.5586C19.3923 14.7462 18.8976 14.5557 18.71 14.1331C18.5224 13.7105 18.7129 13.2158 19.1355 13.0282C19.3147 12.9487 19.4962 12.8734 19.6799 12.8025C20.1112 12.636 20.5959 12.8507 20.7624 13.282ZM16.9091 15.339C17.228 15.6739 17.2151 16.2038 16.8803 16.5227C16.7578 16.6393 16.6383 16.7588 16.5217 16.8812C16.2028 17.2161 15.6729 17.229 15.338 16.9101C15.0032 16.5912 14.9903 16.0613 15.3092 15.7265C15.4445 15.5843 15.5834 15.4455 15.7255 15.3101C16.0603 14.9913 16.5903 15.0042 16.9091 15.339ZM14.1321 18.711C14.5547 18.8986 14.7452 19.3933 14.5576 19.8159C14.4893 19.9699 14.4245 20.126 14.3636 20.2838C14.1971 20.7152 13.7124 20.9299 13.2811 20.7634C12.8497 20.5969 12.635 20.1122 12.8015 19.6808C12.8724 19.4972 12.9477 19.3157 13.0272 19.1365C13.2149 18.7139 13.7095 18.5234 14.1321 18.711Z"
                          fill="#2684FC"
                        />
                        <path
                          opacity="0.5"
                          d="M24.0003 19.8125C24.4627 19.8125 24.8375 20.1873 24.8375 20.6497V24.2776H28.4654C28.9278 24.2776 29.3026 24.6524 29.3026 25.1148C29.3026 25.5772 28.9278 25.952 28.4654 25.952H24.0003C23.5379 25.952 23.1631 25.5772 23.1631 25.1148V20.6497C23.1631 20.1873 23.5379 19.8125 24.0003 19.8125Z"
                          fill="#2684FC"
                        />
                      </svg>
                    )}
                    {booking?.status === "Cancelled" && (
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.4"
                          d="M44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24Z"
                          fill="#DE4E21"
                        />
                        <path
                          d="M17.9393 17.9393C18.5251 17.3536 19.4749 17.3536 20.0607 17.9393L24 21.8787L27.9393 17.9394C28.5251 17.3536 29.4749 17.3536 30.0607 17.9394C30.6464 18.5252 30.6464 19.4749 30.0607 20.0607L26.1213 24L30.0606 27.9393C30.6464 28.5251 30.6464 29.4748 30.0606 30.0606C29.4748 30.6464 28.5251 30.6464 27.9393 30.0606L24 26.1213L20.0607 30.0607C19.4749 30.6464 18.5252 30.6464 17.9394 30.0607C17.3536 29.4749 17.3536 28.5251 17.9394 27.9393L21.8787 24L17.9393 20.0607C17.3536 19.4749 17.3536 18.5251 17.9393 17.9393Z"
                          fill="#DE4E21"
                        />
                      </svg>
                    )}
                    {booking?.status === "Completed" && (
                      <svg
                        width={49}
                        height={48}
                        viewBox="0 0 49 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.4"
                          d="M44.5 24C44.5 35.0457 35.5457 44 24.5 44C13.4543 44 4.5 35.0457 4.5 24C4.5 12.9543 13.4543 4 24.5 4C35.5457 4 44.5 12.9543 44.5 24Z"
                          fill="#08A747"
                        />
                        <path
                          d="M32.5607 17.9393C33.1464 18.5251 33.1464 19.4749 32.5607 20.0607L22.5607 30.0607C21.9749 30.6464 21.0251 30.6464 20.4393 30.0607L16.4393 26.0607C15.8536 25.4749 15.8536 24.5251 16.4393 23.9393C17.0251 23.3536 17.9749 23.3536 18.5607 23.9393L21.5 26.8787L25.9697 22.409L30.4393 17.9393C31.0251 17.3536 31.9749 17.3536 32.5607 17.9393Z"
                          fill="#08A747"
                        />
                      </svg>
                    )}

                    {booking?.status === "Unsuccessful" && (
                      <svg
                        width={48}
                        height={48}
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.4"
                          d="M44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24Z"
                          fill="#DC7932"
                        />
                        <path
                          d="M24 12.5C24.8284 12.5 25.5 13.1716 25.5 14V26C25.5 26.8284 24.8284 27.5 24 27.5C23.1716 27.5 22.5 26.8284 22.5 26V14C22.5 13.1716 23.1716 12.5 24 12.5Z"
                          fill="#DC7932"
                        />
                        <path
                          d="M24 34C25.1046 34 26 33.1046 26 32C26 30.8954 25.1046 30 24 30C22.8954 30 22 30.8954 22 32C22 33.1046 22.8954 34 24 34Z"
                          fill="#DC7932"
                        />
                      </svg>
                    )}
                    <p
                      className="booking-confirmed"
                      style={{
                        color:
                          booking.status === "Opened" ||
                          booking.status === "Upcoming"
                            ? "#2684FC"
                            : booking.status === "Unsuccessful"
                            ? "#DC7932"
                            : booking?.status === "Completed"
                            ? "#08A747"
                            : "#DE4E21",
                      }}
                    >
                      {statusCheck()}
                    </p>
                    <div
                      className={
                        isMobileView ? "bottom_button_mobile" : "bottom_button"
                      }
                    >
                      <a
                        className={
                          isMobileView
                            ? "call_vendor_button btn my-2"
                            : "call_vendor_button btn me-2"
                        }
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
                        className="call_customer_button btn "
                        onClick={() => {
                          if (booking?.booking_for === "My Self") {
                            window.location.href = `tel:+91${booking?.phone_number}`;
                          } else {
                            window.location.href = `tel:${booking?.user?.mobile}`;
                          }
                        }}
                      >
                        Call Customer &nbsp;
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M12.9635 12.1231L12.5839 12.5227C12.5839 12.5227 11.6818 13.4725 9.21927 10.8799C6.75676 8.28736 7.65892 7.33756 7.65892 7.33756L7.89793 7.08593C8.48673 6.46604 8.54223 5.4708 8.02853 4.74425L6.97771 3.25801C6.3419 2.35875 5.1133 2.23996 4.38454 3.0072L3.07654 4.38428C2.71519 4.76471 2.47304 5.25788 2.50241 5.80495C2.57753 7.20455 3.1756 10.2159 6.5128 13.7293C10.0518 17.4552 13.3724 17.6033 14.7302 17.4692C15.1597 17.4269 15.5333 17.1952 15.8343 16.8783L17.0181 15.632C17.8171 14.7908 17.5918 13.3485 16.5694 12.76L14.9774 11.8436C14.306 11.4572 13.4881 11.5707 12.9635 12.1231Z"
                            fill="black"
                          />
                          <path
                            d="M11.0499 1.56587C11.1051 1.22513 11.4272 0.993988 11.7679 1.04915C11.789 1.05319 11.8569 1.06587 11.8924 1.07379C11.9635 1.08963 12.0627 1.11401 12.1864 1.15003C12.4337 1.22207 12.7792 1.34074 13.1939 1.53085C14.0241 1.91148 15.129 2.57732 16.2755 3.72382C17.422 4.87032 18.0878 5.97516 18.4684 6.80539C18.6586 7.22007 18.7772 7.56558 18.8493 7.81289C18.8853 7.93656 18.9097 8.03575 18.9255 8.10686C18.9334 8.14242 18.9392 8.17097 18.9432 8.19206L18.948 8.21805C19.0032 8.5588 18.7742 8.89423 18.4334 8.94939C18.0937 9.0044 17.7736 8.77437 17.717 8.43523C17.7153 8.42613 17.7105 8.40166 17.7054 8.37859C17.6951 8.33243 17.6773 8.25925 17.6491 8.16245C17.5927 7.96884 17.4948 7.68106 17.3322 7.32633C17.0073 6.61774 16.4231 5.63925 15.3916 4.6077C14.36 3.57615 13.3815 2.99199 12.673 2.66713C12.3182 2.5045 12.0305 2.40655 11.8368 2.35016C11.74 2.32197 11.6184 2.29404 11.5722 2.28376C11.2331 2.22724 10.9949 1.90564 11.0499 1.56587Z"
                            fill="black"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M11.2384 4.44043C11.3333 4.10853 11.6792 3.91635 12.0111 4.01118L11.8394 4.61213C12.0111 4.01118 12.0111 4.01118 12.0111 4.01118L12.0123 4.01152L12.0136 4.01189L12.0163 4.0127L12.0228 4.01463L12.0393 4.01977C12.0519 4.02379 12.0676 4.02902 12.0863 4.03566C12.1237 4.04894 12.1732 4.06783 12.2338 4.09383C12.3552 4.14586 12.5211 4.22621 12.7249 4.3468C13.1328 4.5882 13.6896 4.98918 14.3437 5.64333C14.9979 6.29747 15.3989 6.85429 15.6403 7.26218C15.7608 7.46594 15.8412 7.63183 15.8932 7.75323C15.9192 7.8139 15.9381 7.86337 15.9514 7.90079C15.958 7.9195 15.9633 7.93519 15.9673 7.94776L15.9724 7.96425L15.9744 7.97071L15.9752 7.97349L15.9755 7.97476C15.9755 7.97476 15.9759 7.97596 15.3749 8.14766L15.9759 7.97596C16.0707 8.30786 15.8785 8.65379 15.5466 8.74862C15.2175 8.84264 14.8747 8.6545 14.7764 8.32779L14.7734 8.31881C14.7689 8.30628 14.7597 8.28163 14.7443 8.24563C14.7135 8.17368 14.6575 8.05599 14.5645 7.89883C14.3787 7.58488 14.0431 7.11051 13.4598 6.52721C12.8766 5.94392 12.4022 5.60833 12.0882 5.42252C11.9311 5.32951 11.8134 5.27359 11.7414 5.24276C11.7054 5.22733 11.6808 5.21814 11.6682 5.21369L11.6593 5.21061C11.3326 5.11238 11.1444 4.76951 11.2384 4.44043Z"
                            fill="black"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div
                    className="px-5 m-3"
                    style={{ backgroundColor: "#F8F8F8", borderRadius: "8px" }}
                  >
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <p style={{ color: "#68727D" }}>Name</p>
                      <p style={{ textTransform: "capitalize" }}>
                        {booking?.user_type === "Registered"
                          ? booking.user?.first_name
                          : booking.guest?.first_name}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center ">
                      <p style={{ color: "#68727D" }}>Email</p>
                      <p>
                        {booking?.user_type === "Registered"
                          ? booking.user?.email
                          : booking.guest?.email}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p style={{ color: "#68727D" }}>Phone number</p>
                      <p>
                        {booking?.user_type === "Registered"
                          ? booking.user?.mobile
                          : booking.guest?.mobile}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center ">
                      <p style={{ color: "#68727D" }}>Total Number of People</p>
                      <p>{booking?.number_of_people}</p>
                    </div>
                  </div>
                </div>

                <div className="col-12 h-100">
                  <div
                    className={
                      isMobileView ? "col-12 card mt-2" : "col-7 card mt-2 h-50"
                    }
                    style={{ borderRadius: "8px" }}
                  >
                    <span style={{ fontWeight: "600" }} className="p-3">
                      Booking Details
                    </span>
                    <div className="d-flex px-4 py-1">
                      <div style={{ width: "33%" }}>
                        <div>
                          <p style={{ color: "#68727D" }}>Booking ID</p>
                          <p>{booking?.booking_id}</p>
                        </div>
                        <div>
                          <p style={{ color: "#68727D" }}>End Date</p>
                          <p>
                            {new Date(booking?.end_date).toLocaleDateString(
                              "en-US",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              }
                            )}
                          </p>
                        </div>
                      </div>
                      <div style={{ width: "33%" }}>
                        <div>
                          <p style={{ color: "#68727D" }}>Creation On</p>
                          <p>
                            {new Date(booking?.created_at).toLocaleDateString(
                              "en-US",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                              }
                            )}
                          </p>
                        </div>
                        <div>
                          <p style={{ color: "#68727D" }}>Starting Point</p>
                          <p style={{ textTransform: "capitalize" }}>
                            {booking?.starting_point}
                          </p>
                        </div>
                      </div>
                      <div style={{ width: "33%" }}>
                        <div>
                          <p style={{ color: "#68727D" }}>Start Date</p>
                          <p>
                            {new Date(booking?.start_date).toLocaleDateString(
                              "en-US",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                              }
                            )}
                          </p>
                        </div>
                        <div>
                          <p style={{ color: "#68727D" }}>Destination</p>
                          <p style={{ textTransform: "capitalize" }}>
                            {booking?.destination}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      isMobileView ? "col-12 card mt-2" : "col-7 card mt-2 h-50"
                    }
                    style={{ borderRadius: "8px" }}
                  >
                    <span style={{ fontWeight: "600" }} className="p-3">
                      Registered Details
                    </span>
                    <div className="d-flex px-4 py-5">
                      <div style={{ width: "33%" }}>
                        <div>
                          <p style={{ color: "#68727D" }}>Customer ID</p>
                          <p>
                            {booking?.user_type !== "Guest"
                              ? booking?.user?.account_id
                              : booking?.user_type === "Registered"
                              ? booking?.guest?.account_id
                              : "None"}
                          </p>
                        </div>
                      </div>
                      <div style={{ width: "33%" }}>
                        <div>
                          <p style={{ color: "#68727D" }}>Customer Name</p>
                          <p style={{ textTransform: "capitalize" }}>
                            {booking?.user_type !== "Guest"
                              ? booking?.user?.first_name
                              : booking?.user_type === "Registered"
                              ? booking?.guest?.first_name
                              : "None"}
                          </p>
                        </div>
                      </div>
                      <div style={{ width: "33%" }}>
                        <div>
                          <p style={{ color: "#68727D" }}>Customer Email</p>
                          <p>
                            {booking?.user_type !== "Guest"
                              ? booking?.user?.email
                              : booking?.user_type === "Registered"
                              ? booking?.guest?.email
                              : "None"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* section-2 */}

              <div
                className={
                  isMobileView ? "d-flex flex-column" : "d-flex flex-row"
                }
              >
                <div
                  className={
                    isMobileView ? "col-12 card mt-2" : "col-5 card mt-2 mx-1"
                  }
                  style={{ borderRadius: "8px" }}
                >
                  <img
                    src={
                      booking?.service?.service_image &&
                      booking?.service?.service_image[0]?.image
                    }
                    alt="ship"
                    width={100}
                    height={100}
                    className="w-100"
                    style={{ height: "200px", borderRadius: "5px" }}
                  />
                  <div className="left_header" style={{ marginTop: "-5px" }}>
                    <div>
                      <p className="card_content">{booking?.service?.name}</p>
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
                        </svg>
                        &nbsp; {booking?.service?.service_id}
                      </p>
                      &nbsp;
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
                        {booking?.service?.company}
                      </p>
                      &nbsp;
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
                        </svg>
                        &nbsp; {booking?.service?.pickup_point_or_location}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center p-3">
                    <div>
                      <p style={{ fontWeight: "600" }}>
                        {new Date(booking?.start_date).toLocaleTimeString(
                          "en-US",
                          { hour: "2-digit", minute: "2-digit" }
                        )}
                      </p>
                      <p style={{ color: "#68727D" }}>
                        {new Date(booking?.start_date).toLocaleDateString(
                          "en-US",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            weekday: "short",
                          }
                        )}
                      </p>
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <p>
                        <svg
                          width={28}
                          height={28}
                          viewBox="0 0 28 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22.75 10.4991C22.75 10.2395 22.827 9.98572 22.9712 9.76988C23.1154 9.55404 23.3204 9.38582 23.5602 9.28648C23.8 9.18713 24.0639 9.16114 24.3185 9.21179C24.5731 9.26243 24.807 9.38743 24.9906 9.57099C25.1741 9.75455 25.2991 9.98841 25.3498 10.243C25.4004 10.4976 25.3744 10.7615 25.2751 11.0013C25.1757 11.2412 25.0075 11.4462 24.7917 11.5904C24.5758 11.7346 24.3221 11.8116 24.0625 11.8116C23.7144 11.8116 23.3805 11.6733 23.1344 11.4271C22.8883 11.181 22.75 10.8472 22.75 10.4991ZM21.4375 7.87407C21.6971 7.87407 21.9508 7.79709 22.1667 7.65287C22.3825 7.50865 22.5507 7.30367 22.6501 7.06384C22.7494 6.82401 22.7754 6.56011 22.7248 6.30551C22.6741 6.05091 22.5491 5.81705 22.3656 5.63349C22.182 5.44993 21.9481 5.32493 21.6935 5.27429C21.4389 5.22364 21.175 5.24963 20.9352 5.34897C20.6954 5.44831 20.4904 5.61654 20.3462 5.83238C20.202 6.04822 20.125 6.30198 20.125 6.56157C20.125 6.90966 20.2633 7.2435 20.5094 7.48964C20.7555 7.73579 21.0894 7.87407 21.4375 7.87407ZM24.5722 13.9991C24.341 13.98 24.1117 14.0535 23.9347 14.2034C23.7577 14.3534 23.6475 14.5674 23.6283 14.7986C23.4717 16.6278 22.7959 18.3743 21.6804 19.8325C20.5649 21.2907 19.0561 22.4 17.3316 23.0298C15.6071 23.6596 13.7385 23.7838 11.9458 23.3877C10.1531 22.9916 8.51083 22.0917 7.21222 20.7939C5.9136 19.4961 5.01268 17.8544 4.61544 16.0619C4.2182 14.2695 4.34118 12.4008 4.96991 10.6759C5.59864 8.95099 6.70696 7.44152 8.16446 6.32511C9.62197 5.2087 11.368 4.53181 13.1972 4.37407C13.3121 4.36459 13.424 4.33257 13.5265 4.27984C13.6291 4.22711 13.7202 4.1547 13.7947 4.06674C13.8693 3.97879 13.9258 3.87701 13.961 3.76722C13.9962 3.65743 14.0095 3.54179 14 3.42688C13.9905 3.31197 13.9585 3.20006 13.9058 3.09753C13.853 2.99499 13.7806 2.90385 13.6927 2.8293C13.6047 2.75476 13.5029 2.69826 13.3931 2.66305C13.2833 2.62783 13.1677 2.61459 13.0528 2.62407C10.8916 2.80997 8.8284 3.60925 7.10601 4.92789C5.38362 6.24653 4.07366 8.02967 3.33026 10.0675C2.58686 12.1053 2.44094 14.3131 2.90967 16.4311C3.3784 18.549 4.44227 20.4891 5.97613 22.0229C7.50999 23.5568 9.45002 24.6206 11.568 25.0894C13.6859 25.5581 15.8937 25.4122 17.9315 24.6688C19.9694 23.9254 21.7525 22.6154 23.0712 20.893C24.3898 19.1707 25.1891 17.1075 25.375 14.9463C25.3849 14.8313 25.3719 14.7155 25.3368 14.6055C25.3018 14.4956 25.2453 14.3936 25.1707 14.3056C25.0961 14.2176 25.0048 14.1451 24.9021 14.0925C24.7993 14.0399 24.6872 14.0082 24.5722 13.9991ZM14 6.12407C15.5575 6.12407 17.0801 6.58593 18.3751 7.45124C19.6701 8.31656 20.6795 9.54647 21.2755 10.9854C21.8716 12.4244 22.0275 14.0078 21.7237 15.5354C21.4198 17.063 20.6698 18.4662 19.5684 19.5675C18.4671 20.6689 17.0639 21.4189 15.5363 21.7228C14.0087 22.0266 12.4253 21.8707 10.9863 21.2746C9.54738 20.6786 8.31747 19.6692 7.45216 18.3742C6.58684 17.0791 6.12498 15.5566 6.12498 13.9991C6.1273 11.9112 6.95773 9.90951 8.43407 8.43316C9.91042 6.95681 11.9121 6.12638 14 6.12407ZM13.125 13.9991C13.125 14.2311 13.2172 14.4537 13.3813 14.6178C13.5454 14.7819 13.7679 14.8741 14 14.8741H19.25C19.482 14.8741 19.7046 14.7819 19.8687 14.6178C20.0328 14.4537 20.125 14.2311 20.125 13.9991C20.125 13.767 20.0328 13.5444 19.8687 13.3803C19.7046 13.2163 19.482 13.1241 19.25 13.1241H14.875V8.74907C14.875 8.517 14.7828 8.29444 14.6187 8.13035C14.4546 7.96625 14.232 7.87407 14 7.87407C13.7679 7.87407 13.5454 7.96625 13.3813 8.13035C13.2172 8.29444 13.125 8.517 13.125 8.74907V13.9991ZM17.5 5.24907C17.7596 5.24907 18.0133 5.17209 18.2292 5.02787C18.445 4.88365 18.6132 4.67867 18.7126 4.43884C18.8119 4.19901 18.8379 3.93511 18.7873 3.68051C18.7366 3.42591 18.6116 3.19205 18.4281 3.00849C18.2445 2.82493 18.0106 2.69993 17.756 2.64929C17.5014 2.59864 17.2375 2.62463 16.9977 2.72397C16.7579 2.82331 16.5529 2.99154 16.4087 3.20738C16.2645 3.42322 16.1875 3.67698 16.1875 3.93657C16.1875 4.28466 16.3258 4.6185 16.5719 4.86464C16.818 5.11079 17.1519 5.24907 17.5 5.24907Z"
                            fill="#006875"
                          />
                        </svg>
                      </p>
                      <p style={{ color: "#006875" }}>
                        {booking?.slot_details}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontWeight: "600" }}>
                        {new Date(booking?.end_date).toLocaleTimeString(
                          "en-US",
                          { hour: "2-digit", minute: "2-digit" }
                        )}
                      </p>
                      <p style={{ color: "#68727D" }}>
                        {new Date(booking?.end_date).toLocaleDateString(
                          "en-US",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            weekday: "short",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <p>
                      <svg
                        width={18}
                        height={24}
                        viewBox="0 0 19 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.5 1.5C6.18629 1.5 3.5 4.50194 3.5 7.875C3.5 11.2216 5.41499 14.8593 8.4028 16.2558C9.09931 16.5814 9.90069 16.5814 10.5972 16.2558C13.585 14.8593 15.5 11.2216 15.5 7.875C15.5 4.50194 12.8137 1.5 9.5 1.5ZM9.5 9C10.3284 9 11 8.32843 11 7.5C11 6.67157 10.3284 6 9.5 6C8.67157 6 8 6.67157 8 7.5C8 8.32843 8.67157 9 9.5 9Z"
                          fill="#68727D"
                        />
                      </svg>
                    </p>
                    <p style={{ color: "#68727D" }}>Destination: &nbsp;</p>
                    <p style={{ textTransform: "capitalize" }}>
                      {booking?.destination}
                    </p>
                  </div>
                </div>

                <div
                  className={
                    isMobileView ? "col-12 card mt-2" : "col-7 card mt-2"
                  }
                  style={{ borderRadius: "8px" }}
                >
                  <div className="d-flex justify-content-between align-items-center px-2">
                    <p style={{ fontWeight: "600" }} className="p-3">
                      Payment Details
                    </p>
                    <button
                      className="btn btn-sm btn-info"
                      style={{
                        padding: "7px 10px 5px 10px",
                        borderRadius: "4px",
                        borderRadius: "var(--roundness-round-inside, 6px)",
                        background: "#187AF7",
                        boxSShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.04)",
                      }}
                      onClick={() => setOpen(true)}
                    >
                      Initiate Refund &nbsp;
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
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
                    </button>
                  </div>
                  <div
                    className="p-3 m-2 rounded"
                    style={{ backgroundColor: "#EAEBF0" }}
                  >
                    <div className="d-flex justify-content-between align-items-center py-1">
                      <span style={{ color: "#68727D" }}>
                        {booking?.service?.name}
                      </span>
                      <span>{booking?.payment?.amount} KWD</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center py-1">
                      <span style={{ color: "#68727D" }}>Service Fee</span>
                      <span>0.50 KWD</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center py-1">
                      <span style={{ color: "#68727D" }}>
                        Collection & Delivery
                      </span>
                      <span>1.50 KWD</span>
                    </div>
                    <div style={{ borderBottom: "2px solid #e1e3ea" }}></div>
                    <div className="d-flex justify-content-between align-items-center py-1">
                      <span style={{ fontWeight: "500" }}>Total</span>
                      <span style={{ color: "#006875", fontWeight: "500" }}>
                        {booking?.payment?.amount} KWD
                      </span>
                    </div>
                  </div>
                  <div className="d-flex p-4">
                    <div style={{ width: "33%" }}>
                      <div>
                        <p style={{ color: "#68727D" }}>Payment Status</p>
                        {booking?.payment?.status === "Completed" ? (
                          <p
                            className="px-2 py-1"
                            style={{
                              fontWeight: "500",
                              border: "2px solid #40C77E",
                              borderRadius: "30px",
                              backgroundColor: "rgba(64, 199, 126, 0.20)",
                              width: "fit-content",
                            }}
                          >
                            <img
                              src={tick}
                              alt="success"
                              style={{
                                backgroundColor: "#40C77E",
                                borderRadius: "50px",
                              }}
                            />
                            &nbsp; Paid
                          </p>
                        ) : (
                          <p
                            className="px-2 py-1"
                            style={{
                              fontWeight: "500",
                              border: "2px solid #2684FC",
                              borderRadius: "30px",
                              backgroundColor: "#e6f1ff",
                              width: "fit-content",
                            }}
                          >
                            <svg
                              width={20}
                              height={20}
                              viewBox="0 0 48 48"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                opacity="0.4"
                                d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
                                fill="#2684FC"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M23.1628 12.8372C23.1628 12.3748 23.5376 12 24 12C30.6274 12 36 17.3726 36 24C36 30.6274 30.6274 36 24 36C17.3726 36 12 30.6274 12 24C12 23.5376 12.3748 23.1628 12.8372 23.1628C13.2996 23.1628 13.6744 23.5376 13.6744 24C13.6744 29.7027 18.2973 34.3256 24 34.3256C29.7027 34.3256 34.3256 29.7027 34.3256 24C34.3256 18.2973 29.7027 13.6744 24 13.6744C23.5376 13.6744 23.1628 13.2996 23.1628 12.8372Z"
                                fill="#2684FC"
                              />
                              <path
                                opacity="0.5"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M20.7624 13.282C20.9289 13.7134 20.7142 14.1981 20.2829 14.3646C20.125 14.4255 19.969 14.4902 19.8149 14.5586C19.3923 14.7462 18.8976 14.5557 18.71 14.1331C18.5224 13.7105 18.7129 13.2158 19.1355 13.0282C19.3147 12.9487 19.4962 12.8734 19.6799 12.8025C20.1112 12.636 20.5959 12.8507 20.7624 13.282ZM16.9091 15.339C17.228 15.6739 17.2151 16.2038 16.8803 16.5227C16.7578 16.6393 16.6383 16.7588 16.5217 16.8812C16.2028 17.2161 15.6729 17.229 15.338 16.9101C15.0032 16.5912 14.9903 16.0613 15.3092 15.7265C15.4445 15.5843 15.5834 15.4455 15.7255 15.3101C16.0603 14.9913 16.5903 15.0042 16.9091 15.339ZM14.1321 18.711C14.5547 18.8986 14.7452 19.3933 14.5576 19.8159C14.4893 19.9699 14.4245 20.126 14.3636 20.2838C14.1971 20.7152 13.7124 20.9299 13.2811 20.7634C12.8497 20.5969 12.635 20.1122 12.8015 19.6808C12.8724 19.4972 12.9477 19.3157 13.0272 19.1365C13.2149 18.7139 13.7095 18.5234 14.1321 18.711Z"
                                fill="#2684FC"
                              />
                              <path
                                opacity="0.5"
                                d="M24.0003 19.8125C24.4627 19.8125 24.8375 20.1873 24.8375 20.6497V24.2776H28.4654C28.9278 24.2776 29.3026 24.6524 29.3026 25.1148C29.3026 25.5772 28.9278 25.952 28.4654 25.952H24.0003C23.5379 25.952 23.1631 25.5772 23.1631 25.1148V20.6497C23.1631 20.1873 23.5379 19.8125 24.0003 19.8125Z"
                                fill="#2684FC"
                              />
                            </svg>
                            &nbsp; Pending
                          </p>
                        )}
                      </div>
                      <div>
                        <p style={{ color: "#68727D" }}>Transaction ID</p>
                        <p style={{ fontWeight: "500" }}>SS56DG2355D</p>
                      </div>
                    </div>
                    <div style={{ width: "33%" }}>
                      <div>
                        <p style={{ color: "#68727D" }}>Payment Method</p>
                        <p style={{ fontWeight: "500" }}>
                          {booking?.payment?.payment_method}
                        </p>
                      </div>
                      <div>
                        <p style={{ color: "#68727D" }}>Payment Date</p>
                        <p style={{ fontWeight: "500" }}>
                          {new Date(
                            booking?.payment?.created_at
                          ).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          })}
                        </p>
                      </div>
                    </div>
                    <div style={{ width: "33%" }}>
                      <div>
                        <p style={{ color: "#68727D" }}>Payment ID</p>
                        <p style={{ fontWeight: "500" }}>
                          {booking?.payment?.payment_id}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* section-3 */}
              <div
                className={
                  isMobileView ? "d-flex flex-column" : "d-flex flex-row"
                }
              >
                <div
                  className="col-12 card  my-2"
                  style={{
                    borderRadius: "8px",
                    marginLeft: !isMobileView ? "5px" : "0px",
                  }}
                >
                  <span style={{ fontWeight: "600" }} className="p-3">
                    Cancellation And Refund
                  </span>
                  <div
                    className={
                      isMobileView
                        ? "d-flex flex-column justify-content-center align-items-center"
                        : "d-flex justify-content-between align-items-center"
                    }
                  >
                    <div
                      style={{
                        width: isMobileView ? "90%" : "50%",
                        backgroundColor: "#F8F8F8",
                      }}
                      className="p-3 m-3 rounded"
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <p style={{ fontWeight: "600" }}>Cancellation</p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <p>Cancelled By</p>
                        <p>
                          {booking?.cancelled_by?.username !== null
                            ? booking?.cancelled_by?.username
                            : "None"}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <p>Cancelled On</p>
                        <p>
                          {booking?.cancelled_date?.trim() !== "" ||
                          booking?.cancelled_date !== null
                            ? new Date(
                                booking?.cancelled_date
                              ).toLocaleDateString("en-US", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "None"}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <p>Cancellation Reason</p>
                        <p>
                          {booking?.cancellation_reason
                            ? booking?.cancellation_reason
                            : "None"}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <p style={{ visibility: "hidden" }}>NO</p>
                        <p style={{ visibility: "hidden" }}>NO</p>
                      </div>
                    </div>
                    {
                      <div
                        style={{
                          width: isMobileView ? "90%" : "50%",
                          backgroundColor: "#F8F8F8",
                        }}
                        className="p-3 m-3 rounded"
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <p style={{ fontWeight: "600" }}>Refund</p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <p>Amount</p>
                          <p>
                            {booking?.is_refunded
                              ? booking?.refund_amount + "" + "KWD"
                              : "None"}{" "}
                          </p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <p>Details</p>
                          <p>
                            {booking?.is_refunded
                              ? booking?.refund_details
                              : "None"}
                          </p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <p>Status</p>
                          <p>
                            {booking?.is_refunded
                              ? booking?.refund_status
                              : "None"}
                          </p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <p>Type</p>
                          <p>
                            {booking?.is_refunded
                              ? booking?.refund_type
                              : "None"}
                          </p>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CancellationModal
            open={open2}
            setOpen={setOpen2}
            bookingId={params.id}
          />
          <RefundModal open={open} setOpen={setOpen} bookingId={params.id} />
        </div>
      )}
    </>
  );
}
