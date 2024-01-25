import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Avatars from "../../../../assets/images/Avatar.png";
import VendorResetPassword from "../VendorRestPassword";
import CommonButtonForPermission from "../../../HigherOrderComponents/CommonButtonForPermission";
import WithPermission from "../../../HigherOrderComponents/PermissionCheck/WithPermission";
import {
  menuIdConstant,
  permissionCategory,
} from "../../../Permissions/PermissionConstants";

const VenderDetailsList = ({ venderDetails }) => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const EditDetailsWithPermission = WithPermission(
    CommonButtonForPermission,
    permissionCategory.edit,
    menuIdConstant.users,
    () => navigate(`/user-vendor/edit/${venderDetails?.id}`),
    "btn  mt-2 px-4 py-2",
    "Edit Details",
    { backgroundColor: "#187AF7", color: "white" },
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
  );

  const ResetPasswordWithPermission = WithPermission(
    CommonButtonForPermission,
    permissionCategory.resetPassword,
    menuIdConstant.users,
    () => setOpen(true),
    "btn  mt-2 px-4 py-2",
    "Reset Password ",
    { backgroundColor: "#187AF7", color: "white" },
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M13.1253 1.6665C13.1253 1.32133 12.8455 1.0415 12.5003 1.0415C12.1551 1.0415 11.8753 1.32133 11.8753 1.6665V18.3332C11.8753 18.6784 12.1551 18.9582 12.5003 18.9582C12.8455 18.9582 13.1253 18.6784 13.1253 18.3332V16.6618C15.3219 16.6388 16.5454 16.5021 17.3573 15.6902C18.3337 14.7139 18.3337 13.1425 18.3337 9.99984C18.3337 6.85714 18.3337 5.28579 17.3573 4.30948C16.5454 3.49754 15.3219 3.36084 13.1253 3.33783V1.6665Z"
        fill="white"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.6433 15.6902C3.61961 16.6665 5.19096 16.6665 8.33366 16.6665H10.8337V9.99984V3.33317H8.33366C5.19096 3.33317 3.61961 3.33317 2.6433 4.30948C1.66699 5.28579 1.66699 6.85714 1.66699 9.99984C1.66699 13.1425 1.66699 14.7139 2.6433 15.6902ZM10.8337 9.99984C10.8337 9.5396 10.4606 9.1665 10.0003 9.1665C9.54009 9.1665 9.16699 9.5396 9.16699 9.99984C9.16699 10.4601 9.54009 10.8332 10.0003 10.8332C10.4606 10.8332 10.8337 10.4601 10.8337 9.99984ZM7.50033 9.99984C7.50033 10.4601 7.12723 10.8332 6.66699 10.8332C6.20676 10.8332 5.83366 10.4601 5.83366 9.99984C5.83366 9.5396 6.20676 9.1665 6.66699 9.1665C7.12723 9.1665 7.50033 9.5396 7.50033 9.99984Z"
        fill="white"
      />
    </svg>
  );

  return (
    <div>
      <EditDetailsWithPermission />
      {/* <button
        onClick={() => navigate(`/user-vendor/edit/${venderDetails?.id}`)}
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
      </button> */}
      {/* <button
        onClick={() => setOpen(true)}
        className="btn  mt-2 px-4 py-2"
        style={{ backgroundColor: "#187AF7", color: "white" }}
      >
        Reset Password &nbsp;
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M13.1253 1.6665C13.1253 1.32133 12.8455 1.0415 12.5003 1.0415C12.1551 1.0415 11.8753 1.32133 11.8753 1.6665V18.3332C11.8753 18.6784 12.1551 18.9582 12.5003 18.9582C12.8455 18.9582 13.1253 18.6784 13.1253 18.3332V16.6618C15.3219 16.6388 16.5454 16.5021 17.3573 15.6902C18.3337 14.7139 18.3337 13.1425 18.3337 9.99984C18.3337 6.85714 18.3337 5.28579 17.3573 4.30948C16.5454 3.49754 15.3219 3.36084 13.1253 3.33783V1.6665Z"
            fill="white"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.6433 15.6902C3.61961 16.6665 5.19096 16.6665 8.33366 16.6665H10.8337V9.99984V3.33317H8.33366C5.19096 3.33317 3.61961 3.33317 2.6433 4.30948C1.66699 5.28579 1.66699 6.85714 1.66699 9.99984C1.66699 13.1425 1.66699 14.7139 2.6433 15.6902ZM10.8337 9.99984C10.8337 9.5396 10.4606 9.1665 10.0003 9.1665C9.54009 9.1665 9.16699 9.5396 9.16699 9.99984C9.16699 10.4601 9.54009 10.8332 10.0003 10.8332C10.4606 10.8332 10.8337 10.4601 10.8337 9.99984ZM7.50033 9.99984C7.50033 10.4601 7.12723 10.8332 6.66699 10.8332C6.20676 10.8332 5.83366 10.4601 5.83366 9.99984C5.83366 9.5396 6.20676 9.1665 6.66699 9.1665C7.12723 9.1665 7.50033 9.5396 7.50033 9.99984Z"
            fill="white"
          />
        </svg>
      </button> */}
      <ResetPasswordWithPermission />
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
                {venderDetails?.first_name}
                {venderDetails?.last_name}
              </p>
            </div>
            <div>
              <p style={{ color: "#68727D" }}>Location</p>
              <div className="d-flex justify-content-between">
                <p style={{ fontWeight: "700" }}>
                  {" "}
                  {venderDetails?.profileextra?.location?.country}
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
              <p style={{ fontWeight: "700" }}>{venderDetails?.email}</p>
            </div>
            <div>
              <p style={{ color: "#68727D" }}>ID Type</p>
              <p style={{ fontWeight: "700" }}>Civil ID</p>
            </div>
          </div>
          <div className="col-4 px-2">
            <div>
              <p style={{ color: "#68727D" }}>Phone</p>
              <p style={{ fontWeight: "700" }}> {venderDetails?.mobile}</p>
            </div>

            <div>
              <p style={{ color: "#68727D" }}>ID Number</p>
              <p style={{ fontWeight: "700" }}>
                {" "}
                {venderDetails?.useridentificationdata?.id_number}
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
                {venderDetails?.company_company_user?.name}
              </p>
            </div>
            <div>
              <p style={{ color: "#68727D" }}>Company Website</p>
              <div className="d-flex justify-content-between">
                <p style={{ fontWeight: "700", width: "90%" }}>
                  {venderDetails?.company_company_user?.website}
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
                <p style={{ fontWeight: "700", width: "90%" }}>
                  {" "}
                  {venderDetails?.company_company_user?.address}
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
              <p style={{ color: "#68727D" }}>Company Registration Number</p>
              <p style={{ fontWeight: "700" }}>
                {" "}
                {venderDetails?.company_company_user?.registration_number}
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
              {venderDetails?.company_company_user?.service_summary.map(
                (item, i) => {
                  return <p style={{ fontWeight: "700" }}>{item.name}</p>;
                }
              )}
            </div>
          </div>
          <div className="col-4 px-2">
            <div>
              <p style={{ color: "#68727D" }}>Ownership</p>
              <p style={{ fontWeight: "700" }}>
                {venderDetails?.company_company_user?.third_party_ownership ? (
                  <>Third Party Ownership</>
                ) : (
                  <>Nill</>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
      <VendorResetPassword
        open={open}
        setOpen={setOpen}
        userid={venderDetails?.id}
      />
    </div>
  );
};

export default VenderDetailsList;
