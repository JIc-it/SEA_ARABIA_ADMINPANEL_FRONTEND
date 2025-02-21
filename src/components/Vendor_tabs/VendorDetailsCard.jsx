import { useContext, useEffect, useState } from "react";
import {
  getIndivitualVendorDetail,
  getUserIdType,
  getVendorListById,
  getVendorServiceTag,
} from "../../services/leadMangement";
import { OnboardContext } from "../../Context/OnboardContext";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function VendorDetailsCard() {
  const { vendorId, isAllowProceed, setIsAllowProceed } =
    useContext(OnboardContext);
  const [userdata, setUser] = useState([]);
  const count = useSelector((state) => state.counter.value);
  console.log(count);

  useEffect(() => {
    getVendorListById(vendorId)
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((error) => {
        // toast.error(error.message);
        console.error("Error fetching  data:", error);
      });
  }, [vendorId, count]);

  console.log(userdata, "user");
  return (
    <div className="col-4">
      <div className="card personal_details">
        <div className="card-body">
          <div className="left_header">
            <p className="card_content" style={{ textTransform: "capitalize" }}>
              {userdata?.first_name}
            </p>

            <div className="card_header_contents">
              <p className="card_content pb-3">
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
                &nbsp; {userdata?.account_id} <span>| &nbsp;</span>
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
                &nbsp; {userdata?.role} <span>| &nbsp;</span>
              </p>
              <p
                className="card_content"
                style={{ textTransform: "capitalize" }}
              >
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
                &nbsp; {userdata?.profileextra?.location?.country}
              </p>
            </div>
          </div>
          <div className="card_personal_details">
            <h5 className="personal_details_header">Personal Details</h5>
            <div className="col-12">
              <div className="vendor_info">
                <p className="heading_name">Email</p>
                <p>{userdata?.email}</p>
              </div>
              <div className="vendor_info">
                <p className="heading_name">Phone</p>
                <p>{userdata?.mobile}</p>
              </div>
              <div className="vendor_info">
                <p className="heading_name">Id Number</p>
                <p>{userdata.useridentificationdata?.id_number}</p>
              </div>
            </div>
          </div>
          <div className="card_personal_details">
            <h5 className="personal_details_header">Company Details</h5>
            <div className="col-12">
              <div className="vendor_info">
                <p className="heading_name">Name</p>
                <p>{userdata?.company_company_user?.name}</p>
              </div>
              <div className="vendor_info">
                <p className="heading_name">Company Registration Number</p>
                <p style={{ textAlign: "end" }}>
                  {userdata?.company_company_user?.registration_number}
                </p>
              </div>
              <div className="vendor_info">
                <p className="heading_name">Address</p>
                <p style={{ marginLeft: "5px", width: "90%" ,textAlign: "end" }}>
                  {userdata?.company_company_user?.address}
                </p>
              </div>
            </div>
          </div>
          <div className="bottom_button">
            <a
              className="call_vendor_button btn "
              onClick={() => {
                window.location.href = `tel:${userdata?.mobile}`;
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
              className="mail_vendor_button btn btn-outline mx-2"
              onClick={() => {
                // Open a new tab
                const newTab = window.open("", "_blank");

                // Redirect the new tab to Gmail with the mailto link
                newTab.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${userdata?.email}`;

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
  );
}

export default VendorDetailsCard;
