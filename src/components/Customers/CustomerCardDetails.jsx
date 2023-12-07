import { Button } from "@mui/material";
import customerImg from "../../assets/images/customerimg.png";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import Avatars from "../../assets/images/Avatar.png"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function CustomerCardDetails() {
  const navigate=useNavigate()
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
  const [active, setActive] = useState("Details")
  return (
    <div className={isMobileView ? "d-flex flex-wrap" : "d-flex justify-content-between"}>
      <div className={isMobileView ? "col-12 my-2" : "col-5 my-2"}>
        <div className="card personal_details">
          <div className="card-body">
            <div className="d-flex justify-content-center align-items-center my-2">
              <img src={customerImg} />
            </div>
            <div className="left_header">
              <div>
                <p className="card_content">Achille Lauro</p>
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
                  &nbsp; SS56DG2355D <p>| &nbsp;</p>
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
                  &nbsp; Vendor <p>| &nbsp;</p>
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
                  &nbsp; Kuwait
                </p>
              </div>
            </div>
            <div className="card_personal_details">
              <h5 className="personal_details_header">Personal Details</h5>
              <div className="col-12">
                <div className="vendor_info">
                  <p className="heading_name">Phone</p>
                  <p>+9087654321</p>
                </div>
                <div className="vendor_info">
                  <p className="heading_name">Email</p>
                  <p>achille@gmail.com</p>
                </div>
              </div>
            </div>

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
        <div className="card personal_details">
          <div className="card-body">
            <div>
              <Button style={{ color: active === "Details" ? "#006875" : "black", textTransform: "capitalize" }} onClick={() => setActive("Details")}>Details</Button>
              <Button style={{ color: active === "Bookings" ? "#006875" : "black", textTransform: "capitalize" }} onClick={() => setActive("Bookings")}>Bookings</Button>
              <Button style={{ color: active === "Incident Log" ? "#006875" : "black", textTransform: "capitalize" }} onClick={() => setActive("Incident Log")}>Incident Log</Button>
            </div>
            
            {active === "Details" && 
            <>
            <button  onClick={()=>navigate("/customers-edit/12345")} className="btn  mt-2 px-4 py-2" style={{ backgroundColor: "#187AF7", color: "white" }}>Edit Details &nbsp;
              <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 21 20" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.2085 18.333C3.2085 17.9878 3.48832 17.708 3.8335 17.708H17.1668C17.512 17.708 17.7918 17.9878 17.7918 18.333C17.7918 18.6782 17.512 18.958 17.1668 18.958H3.8335C3.48832 18.958 3.2085 18.6782 3.2085 18.333Z" fill="white" />
                <path d="M9.31094 13.1837C9.52306 13.0183 9.71547 12.8259 10.1002 12.4411L15.0308 7.51054C14.3597 7.23124 13.5649 6.77246 12.8133 6.02078C12.0615 5.26898 11.6027 4.47405 11.3234 3.80293L6.39271 8.73359L6.39269 8.73361C6.00794 9.11837 5.81554 9.31076 5.65009 9.52288C5.45492 9.77311 5.28759 10.0439 5.15106 10.3303C5.03532 10.5732 4.94928 10.8313 4.7772 11.3475L3.8698 14.0698C3.78511 14.3238 3.85123 14.6039 4.04058 14.7932C4.22993 14.9826 4.51002 15.0487 4.76406 14.964L7.48628 14.0566C8.00251 13.8845 8.26063 13.7985 8.50348 13.6828C8.78996 13.5462 9.06071 13.3789 9.31094 13.1837Z" fill="white" />
                <path d="M16.399 6.14236C17.4228 5.11856 17.4228 3.45865 16.399 2.43484C15.3752 1.41104 13.7153 1.41104 12.6915 2.43484L12.1001 3.0262C12.1082 3.05066 12.1166 3.07545 12.1253 3.10056C12.3421 3.72532 12.751 4.54433 13.5204 5.31367C14.2897 6.08302 15.1087 6.49198 15.7335 6.70874C15.7585 6.71741 15.7832 6.72577 15.8075 6.73383L16.399 6.14236Z" fill="white" />
              </svg>

            </button>
            <div style={{ backgroundColor: "#F8F8F8", borderRadius: "5px" }} className="mt-4 w-100 px-2">
              <p className="p-2" style={{ fontWeight: "700" }}>Details</p>
              <div className="d-flex">
                <div className="col-4 px-2">
                  <div>
                    <p style={{ color: "#68727D" }}>Full Name</p>
                    <p style={{ fontWeight: "700" }}>Alex Paul</p>
                  </div>
                  <div>
                    <p style={{ color: "#68727D" }}>Location</p>
                    <div className="d-flex justify-content-between">
                      <p style={{ fontWeight: "700" }}>Kuwait</p>
                      <p>
                        <svg width="18" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0003 1.83301C6.95024 1.83301 3.66699 5.50204 3.66699 9.62467C3.66699 13.715 6.00754 18.1611 9.6593 19.8679C10.5106 20.2658 11.4901 20.2658 12.3413 19.8679C15.9931 18.1611 18.3337 13.715 18.3337 9.62467C18.3337 5.50204 15.0504 1.83301 11.0003 1.83301ZM11.0003 10.9997C12.0128 10.9997 12.8337 10.1789 12.8337 9.16634C12.8337 8.15382 12.0128 7.33301 11.0003 7.33301C9.9878 7.33301 9.16699 8.15382 9.16699 9.16634C9.16699 10.1789 9.9878 10.9997 11.0003 10.9997Z" fill="#323539" />
                        </svg>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-4 px-2">
                  <div>
                    <p style={{ color: "#68727D" }}>Phone</p>
                    <p style={{ fontWeight: "700" }}>+97455682545</p>
                  </div>
                  <div>
                    <p style={{ color: "#68727D" }}>Date of Birth</p>
                    <p style={{ fontWeight: "700" }}>01/09/2023</p>
                  </div>
                </div>
                <div className="col-4 px-2">
                  <div>
                    <p style={{ color: "#68727D" }}>Email</p>
                    <p style={{ fontWeight: "700" }}>jamescorden123@gmail.com</p>
                  </div>
                  <div>
                    <p style={{ color: "#68727D" }}>Gender</p>
                    <p style={{ fontWeight: "700" }}>Female</p>
                  </div>
                </div>
              </div>
            </div>
            </>
            }

            {active === "Bookings" && <div style={{  borderRadius: "5px" }} className="mt-4 w-100 px-2">
              <div className="table-responsive" >
                <table className="table" >
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Service</th>
                      <th>Booking ID</th>
                      <th>Date</th>
                      <th>Location</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="d-flex text-dark">
                        <img src={Avatars} width={20} height={20} style={{ borderRadius: "50%" }} />
                        <p className="mx-2">Achille Lauro</p>
                      </td>
                      <td className="text-dark">Jet Ski</td>
                      <td className="text-dark">#SS56DG2355D</td>
                      <td className="text-dark">08 OCT,2023</td>
                      <td className="text-dark">Kuwait</td>
                      <td
                          style={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "baseline",
                          }}
                        >
                          <Link
                            to={"/customers/booking/12345"}
                            className="btn btn-sm btn-info"
                            style={{ padding: "2px 10px", borderRadius: "4px" }}
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
                        <td>
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 18" fill="none">
                          <path d="M0.5 4.43683C0.5 4.10809 0.772258 3.8416 1.10811 3.8416H5.09823C5.10364 3.14057 5.17962 2.17953 5.87531 1.51423C6.4228 0.990647 7.1734 0.666992 7.99999 0.666992C8.82659 0.666992 9.57718 0.990647 10.1247 1.51423C10.8204 2.17953 10.8963 3.14057 10.9018 3.8416H14.8919C15.2277 3.8416 15.5 4.10809 15.5 4.43683C15.5 4.76557 15.2277 5.03207 14.8919 5.03207H1.10811C0.772258 5.03207 0.5 4.76557 0.5 4.43683Z" fill="#F6513B" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M7.663 17.3337H8.337C10.6559 17.3337 11.8154 17.3337 12.5693 16.5954C13.3231 15.8571 13.4003 14.6461 13.5545 12.2241L13.7768 8.73416C13.8605 7.42 13.9023 6.76292 13.5241 6.34654C13.1459 5.93015 12.5073 5.93015 11.23 5.93015H4.77004C3.49272 5.93015 2.85407 5.93015 2.47588 6.34654C2.09769 6.76292 2.13953 7.42 2.22323 8.73416L2.44549 12.2241C2.59975 14.6461 2.67687 15.8571 3.43074 16.5954C4.18461 17.3337 5.34407 17.3337 7.663 17.3337ZM6.53856 9.15739C6.50422 8.79585 6.19794 8.53207 5.85448 8.56822C5.51101 8.60438 5.26042 8.92677 5.29477 9.28832L5.71143 13.6743C5.74578 14.0358 6.05206 14.2996 6.39552 14.2634C6.73899 14.2273 6.98958 13.9049 6.95523 13.5434L6.53856 9.15739ZM10.1455 8.56822C10.489 8.60438 10.7396 8.92677 10.7052 9.28832L10.2886 13.6743C10.2542 14.0358 9.94794 14.2996 9.60448 14.2634C9.26101 14.2273 9.01042 13.9049 9.04477 13.5434L9.46144 9.15739C9.49578 8.79585 9.80206 8.53207 10.1455 8.56822Z" fill="#F6513B" />
                        </svg>
                        </td>
                        <td>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 20 20" fill="none">
                          <path d="M5.83333 9.99967C5.83333 10.9201 5.08714 11.6663 4.16667 11.6663C3.24619 11.6663 2.5 10.9201 2.5 9.99967C2.5 9.0792 3.24619 8.33301 4.16667 8.33301C5.08714 8.33301 5.83333 9.0792 5.83333 9.99967Z" fill="#2E3030" />
                          <path d="M11.6667 9.99967C11.6667 10.9201 10.9205 11.6663 10 11.6663C9.07952 11.6663 8.33333 10.9201 8.33333 9.99967C8.33333 9.0792 9.07952 8.33301 10 8.33301C10.9205 8.33301 11.6667 9.0792 11.6667 9.99967Z" fill="#2E3030" />
                          <path d="M17.5 9.99967C17.5 10.9201 16.7538 11.6663 15.8333 11.6663C14.9129 11.6663 14.1667 10.9201 14.1667 9.99967C14.1667 9.0792 14.9129 8.33301 15.8333 8.33301C16.7538 8.33301 17.5 9.0792 17.5 9.99967Z" fill="#2E3030" />
                        </svg>
                        </td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>}

            {active === "Incident Log" && <div style={{  borderRadius: "5px" }} className="mt-4 w-100 px-2">
              <div className="table-responsive" >
                <table className="table" >
                  <thead>
                    <tr>
                      <th>Ticket ID</th>
                      <th>Type</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                    <td className="text-dark">#SS56DG2355D</td>
                      <td className="text-dark">Cancellation</td>
                      <td className="text-dark">08 OCT,2023</td>
                      <td>
                        <svg width={80} height={30} viewBox="0 0 87 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g filter="url(#filter0_d_759_15542)">
                            <path d="M2.5 10.6C2.5 7.23969 2.5 5.55953 3.15396 4.27606C3.7292 3.14708 4.64708 2.2292 5.77606 1.65396C7.05953 1 8.73969 1 12.1 1H74.9C78.2603 1 79.9405 1 81.2239 1.65396C82.3529 2.2292 83.2708 3.14708 83.846 4.27606C84.5 5.55953 84.5 7.23969 84.5 10.6V23.4C84.5 26.7603 84.5 28.4405 83.846 29.7239C83.2708 30.8529 82.3529 31.7708 81.2239 32.346C79.9405 33 78.2603 33 74.9 33H12.1C8.73969 33 7.05953 33 5.77606 32.346C4.64708 31.7708 3.7292 30.8529 3.15396 29.7239C2.5 28.4405 2.5 26.7603 2.5 23.4V10.6Z" fill="#FFBC3A" />
                            <path d="M23.0627 18.4657H20.5958V17.1705H23.0627C23.4922 17.1705 23.8394 17.1011 24.1041 16.9622C24.3688 16.8233 24.5619 16.6324 24.6833 16.3894C24.8092 16.1421 24.8721 15.86 24.8721 15.5433C24.8721 15.2439 24.8092 14.964 24.6833 14.7036C24.5619 14.439 24.3688 14.2263 24.1041 14.0658C23.8394 13.9052 23.4922 13.825 23.0627 13.825H21.097V22H19.4633V12.5232H23.0627C23.796 12.5232 24.4187 12.6534 24.9307 12.9137C25.447 13.1697 25.8397 13.5256 26.1088 13.9812C26.3778 14.4324 26.5123 14.9488 26.5123 15.5303C26.5123 16.1421 26.3778 16.6671 26.1088 17.1054C25.8397 17.5436 25.447 17.8799 24.9307 18.1143C24.4187 18.3486 23.796 18.4657 23.0627 18.4657ZM30.9342 22.1302C30.4135 22.1302 29.9426 22.0456 29.5217 21.8763C29.1052 21.7028 28.7494 21.4619 28.4543 21.1539C28.1636 20.8458 27.9401 20.4835 27.7839 20.0669C27.6277 19.6503 27.5496 19.2012 27.5496 18.7196V18.4592C27.5496 17.9081 27.6299 17.4091 27.7904 16.9622C27.951 16.5153 28.1744 16.1334 28.4608 15.8167C28.7472 15.4956 29.0857 15.2504 29.4762 15.0812C29.8667 14.9119 30.2898 14.8273 30.7454 14.8273C31.2487 14.8273 31.6892 14.9119 32.0667 15.0812C32.4442 15.2504 32.7566 15.489 33.004 15.7971C33.2556 16.1009 33.4422 16.4632 33.5637 16.8841C33.6895 17.305 33.7525 17.7693 33.7525 18.277V18.9474H28.3111V17.8214H32.2034V17.6977C32.1947 17.4156 32.1383 17.151 32.0341 16.9036C31.9343 16.6563 31.7803 16.4567 31.572 16.3048C31.3637 16.1529 31.086 16.077 30.7389 16.077C30.4785 16.077 30.2464 16.1334 30.0425 16.2462C29.8428 16.3547 29.6758 16.5131 29.5413 16.7214C29.4068 16.9297 29.3026 17.1813 29.2289 17.4764C29.1594 17.7671 29.1247 18.0947 29.1247 18.4592V18.7196C29.1247 19.0277 29.1659 19.314 29.2484 19.5787C29.3352 19.8391 29.461 20.0669 29.6259 20.2622C29.7908 20.4574 29.9904 20.6115 30.2247 20.7243C30.459 20.8328 30.7259 20.887 31.0253 20.887C31.4028 20.887 31.7391 20.8111 32.0341 20.6592C32.3292 20.5073 32.5852 20.2925 32.8022 20.0148L33.6288 20.8154C33.4769 21.0367 33.2795 21.2493 33.0365 21.4533C32.7935 21.6529 32.4963 21.8156 32.1448 21.9414C31.7977 22.0673 31.3941 22.1302 30.9342 22.1302ZM36.6317 16.461V22H35.0631V14.9575H36.5406L36.6317 16.461ZM36.3518 18.2184L35.8441 18.2119C35.8485 17.7129 35.9179 17.2551 36.0524 16.8385C36.1913 16.422 36.3822 16.064 36.6252 15.7646C36.8725 15.4652 37.1676 15.2352 37.5104 15.0746C37.8532 14.9098 38.235 14.8273 38.6559 14.8273C38.9944 14.8273 39.3003 14.875 39.5737 14.9705C39.8514 15.0616 40.0879 15.2113 40.2831 15.4196C40.4827 15.6279 40.6346 15.8991 40.7388 16.2332C40.8429 16.563 40.895 16.9687 40.895 17.4504V22H39.3198V17.4438C39.3198 17.1054 39.2699 16.8385 39.1701 16.6433C39.0747 16.4437 38.9337 16.3026 38.7471 16.2202C38.5648 16.1334 38.337 16.09 38.0636 16.09C37.7946 16.09 37.5538 16.1464 37.3412 16.2592C37.1286 16.3721 36.9485 16.5261 36.8009 16.7214C36.6577 16.9166 36.5471 17.1423 36.469 17.3983C36.3909 17.6543 36.3518 17.9277 36.3518 18.2184ZM46.8919 20.542V12.0025H48.4671V22H47.0416L46.8919 20.542ZM42.3097 18.5569V18.4202C42.3097 17.8864 42.3727 17.4005 42.4985 16.9622C42.6243 16.5196 42.8066 16.1399 43.0452 15.8232C43.2839 15.5021 43.5746 15.2569 43.9174 15.0877C44.2602 14.9141 44.6464 14.8273 45.076 14.8273C45.5012 14.8273 45.8744 14.9098 46.1955 15.0746C46.5166 15.2395 46.79 15.476 47.0156 15.7841C47.2412 16.0878 47.4213 16.4523 47.5558 16.8776C47.6903 17.2985 47.7858 17.7671 47.8422 18.2835V18.7196C47.7858 19.2229 47.6903 19.6829 47.5558 20.0994C47.4213 20.516 47.2412 20.8761 47.0156 21.1799C46.79 21.4836 46.5144 21.718 46.189 21.8828C45.8679 22.0477 45.4925 22.1302 45.063 22.1302C44.6377 22.1302 44.2537 22.0412 43.9109 21.8633C43.5725 21.6854 43.2839 21.4359 43.0452 21.1148C42.8066 20.7937 42.6243 20.4162 42.4985 19.9823C42.3727 19.544 42.3097 19.0689 42.3097 18.5569ZM43.8784 18.4202V18.5569C43.8784 18.878 43.9066 19.1774 43.963 19.4551C44.0237 19.7328 44.117 19.9779 44.2429 20.1906C44.3687 20.3988 44.5314 20.5637 44.731 20.6852C44.935 20.8024 45.178 20.861 45.46 20.861C45.8158 20.861 46.1087 20.7829 46.3387 20.6266C46.5687 20.4704 46.7487 20.26 46.8789 19.9953C47.0134 19.7263 47.1046 19.4269 47.1523 19.0971V17.919C47.1263 17.663 47.072 17.4243 46.9896 17.203C46.9115 16.9817 46.8052 16.7886 46.6706 16.6237C46.5361 16.4545 46.3691 16.3243 46.1695 16.2332C45.9742 16.1378 45.742 16.09 45.473 16.09C45.1866 16.09 44.9436 16.1508 44.744 16.2723C44.5444 16.3938 44.3795 16.5608 44.2494 16.7734C44.1235 16.9861 44.0302 17.2334 43.9695 17.5154C43.9087 17.7975 43.8784 18.0991 43.8784 18.4202ZM51.8865 14.9575V22H50.3114V14.9575H51.8865ZM50.2073 13.109C50.2073 12.8703 50.2854 12.6729 50.4416 12.5167C50.6021 12.3561 50.8234 12.2759 51.1055 12.2759C51.3832 12.2759 51.6023 12.3561 51.7629 12.5167C51.9234 12.6729 52.0037 12.8703 52.0037 13.109C52.0037 13.3433 51.9234 13.5386 51.7629 13.6948C51.6023 13.851 51.3832 13.9291 51.1055 13.9291C50.8234 13.9291 50.6021 13.851 50.4416 13.6948C50.2854 13.5386 50.2073 13.3433 50.2073 13.109ZM55.2605 16.461V22H53.6918V14.9575H55.1693L55.2605 16.461ZM54.9806 18.2184L54.4729 18.2119C54.4772 17.7129 54.5467 17.2551 54.6812 16.8385C54.82 16.422 55.011 16.064 55.254 15.7646C55.5013 15.4652 55.7964 15.2352 56.1392 15.0746C56.4819 14.9098 56.8638 14.8273 57.2847 14.8273C57.6232 14.8273 57.9291 14.875 58.2024 14.9705C58.4801 15.0616 58.7166 15.2113 58.9119 15.4196C59.1115 15.6279 59.2634 15.8991 59.3675 16.2332C59.4717 16.563 59.5237 16.9687 59.5237 17.4504V22H57.9486V17.4438C57.9486 17.1054 57.8987 16.8385 57.7989 16.6433C57.7034 16.4437 57.5624 16.3026 57.3758 16.2202C57.1936 16.1334 56.9658 16.09 56.6924 16.09C56.4234 16.09 56.1825 16.1464 55.9699 16.2592C55.7573 16.3721 55.5772 16.5261 55.4297 16.7214C55.2865 16.9166 55.1758 17.1423 55.0977 17.3983C55.0196 17.6543 54.9806 17.9277 54.9806 18.2184ZM65.7355 14.9575H67.1609V21.8047C67.1609 22.4383 67.0264 22.9763 66.7574 23.4189C66.4883 23.8615 66.113 24.1978 65.6313 24.4278C65.1497 24.6621 64.5921 24.7793 63.9586 24.7793C63.6895 24.7793 63.3901 24.7402 63.0604 24.6621C62.7349 24.584 62.4182 24.4582 62.1101 24.2846C61.8063 24.1154 61.5525 23.8919 61.3486 23.6142L62.084 22.6899C62.3357 22.9893 62.6134 23.2085 62.9172 23.3473C63.2209 23.4862 63.5398 23.5556 63.874 23.5556C64.2341 23.5556 64.54 23.4883 64.7917 23.3538C65.0477 23.2237 65.2451 23.0306 65.384 22.7745C65.5229 22.5185 65.5923 22.2061 65.5923 21.8373V16.5521L65.7355 14.9575ZM60.9515 18.5569V18.4202C60.9515 17.8864 61.0166 17.4005 61.1468 16.9622C61.277 16.5196 61.4635 16.1399 61.7065 15.8232C61.9495 15.5021 62.2446 15.2569 62.5917 15.0877C62.9389 14.9141 63.3316 14.8273 63.7698 14.8273C64.2254 14.8273 64.6138 14.9098 64.9349 15.0746C65.2603 15.2395 65.5315 15.476 65.7485 15.7841C65.9655 16.0878 66.1347 16.4523 66.2562 16.8776C66.382 17.2985 66.4753 17.7671 66.5361 18.2835V18.7196C66.4796 19.2229 66.3842 19.6829 66.2497 20.0994C66.1152 20.516 65.9372 20.8761 65.7159 21.1799C65.4946 21.4836 65.2213 21.718 64.8958 21.8828C64.5747 22.0477 64.1951 22.1302 63.7568 22.1302C63.3272 22.1302 62.9389 22.0412 62.5917 21.8633C62.2489 21.6854 61.9539 21.4359 61.7065 21.1148C61.4635 20.7937 61.277 20.4162 61.1468 19.9823C61.0166 19.544 60.9515 19.0689 60.9515 18.5569ZM62.5201 18.4202V18.5569C62.5201 18.878 62.5505 19.1774 62.6113 19.4551C62.6763 19.7328 62.774 19.9779 62.9042 20.1906C63.0387 20.3988 63.2079 20.5637 63.4118 20.6852C63.6201 20.8024 63.8653 20.861 64.1473 20.861C64.5162 20.861 64.8177 20.7829 65.0521 20.6266C65.2907 20.4704 65.473 20.26 65.5988 19.9953C65.729 19.7263 65.8201 19.4269 65.8722 19.0971V17.919C65.8461 17.663 65.7919 17.4243 65.7094 17.203C65.6313 16.9817 65.525 16.7886 65.3905 16.6237C65.256 16.4545 65.0868 16.3243 64.8828 16.2332C64.6789 16.1378 64.4381 16.09 64.1603 16.09C63.8783 16.09 63.6331 16.1508 63.4249 16.2723C63.2166 16.3938 63.0452 16.5608 62.9107 16.7734C62.7805 16.9861 62.6829 17.2334 62.6178 17.5154C62.5527 17.7975 62.5201 18.0991 62.5201 18.4202Z" fill="white" />
                          </g>
                          <defs>
                            <filter id="filter0_d_759_15542" x="0.5" y={0} width={86} height={36} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity={0} result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feOffset dy={1} />
                              <feGaussianBlur stdDeviation={1} />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.04 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_759_15542" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_759_15542" result="shape" />
                            </filter>
                          </defs>
                        </svg>

                      </td>
                      <td
                          style={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "baseline",
                          }}
                        >
                          <Link
                            to={"/customers/12345"}
                            className="btn btn-sm btn-info"
                            style={{ padding: "2px 10px", borderRadius: "4px" }}
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
                       
                        <td>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 20 20" fill="none">
                          <path d="M5.83333 9.99967C5.83333 10.9201 5.08714 11.6663 4.16667 11.6663C3.24619 11.6663 2.5 10.9201 2.5 9.99967C2.5 9.0792 3.24619 8.33301 4.16667 8.33301C5.08714 8.33301 5.83333 9.0792 5.83333 9.99967Z" fill="#2E3030" />
                          <path d="M11.6667 9.99967C11.6667 10.9201 10.9205 11.6663 10 11.6663C9.07952 11.6663 8.33333 10.9201 8.33333 9.99967C8.33333 9.0792 9.07952 8.33301 10 8.33301C10.9205 8.33301 11.6667 9.0792 11.6667 9.99967Z" fill="#2E3030" />
                          <path d="M17.5 9.99967C17.5 10.9201 16.7538 11.6663 15.8333 11.6663C14.9129 11.6663 14.1667 10.9201 14.1667 9.99967C14.1667 9.0792 14.9129 8.33301 15.8333 8.33301C16.7538 8.33301 17.5 9.0792 17.5 9.99967Z" fill="#2E3030" />
                        </svg>
                        </td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerCardDetails;
