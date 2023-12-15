import { useEffect, useState } from "react";
import { getVendorLeadCount } from "../../services/leadMangement";

function HeaderTiles(props) {
  const [leadCount, setLeadCount] = useState({
    totalCount: 0,
    leadThisWeek: 0,
    onBoard: 0,
    active: 0,
  });

  useEffect(() => {
    getVendorLeadCount()
      .then((data) => {
        setLeadCount({
          totalCount: data.total_lead,
          leadThisWeek: data.new_leads,
          onBoard: data.onboarded_vendors,
          active: data.active_vedors,
        });
      })
      .catch((error) => {
        console.error("Error fetching  data:", error);
      });
  }, []);

  return (
    <div className="row row-cards">
      {/* <style>
         .span_border{
            borderRadius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.30);
            background: linear-gradient(135deg, #5C4AF2 0%, #988DF5 100%);
         }
        </style> */}

      <div className="col-sm-6 col-lg-3">
        <div className="card card-sm" style={{ borderRadius: "12px" }}>
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-auto">
                <span
                  className="bg-primary text-white avatar"
                  style={{
                    borderRadius: "8px",
                    width: "50px",
                    height: "50px",
                    background:
                      "linear-gradient(135deg, #5C4AF2 0%, #988DF5 100%)",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                  >
                    <path
                      d="M25.8332 12.4993C25.8332 15.721 23.2215 18.3327 19.9998 18.3327C16.7782 18.3327 14.1665 15.721 14.1665 12.4993C14.1665 9.27769 16.7782 6.66602 19.9998 6.66602C23.2215 6.66602 25.8332 9.27769 25.8332 12.4993Z"
                      fill="white"
                    />
                    <path
                      opacity="0.4"
                      d="M32.4998 12.5007C32.4998 14.8018 30.6344 16.6673 28.3332 16.6673C26.032 16.6673 24.1665 14.8018 24.1665 12.5007C24.1665 10.1995 26.032 8.33398 28.3332 8.33398C30.6344 8.33398 32.4998 10.1995 32.4998 12.5007Z"
                      fill="white"
                    />
                    <path
                      opacity="0.4"
                      d="M7.50016 12.5007C7.50016 14.8018 9.36564 16.6673 11.6668 16.6673C13.968 16.6673 15.8335 14.8018 15.8335 12.5007C15.8335 10.1995 13.968 8.33398 11.6668 8.33398C9.36564 8.33398 7.50016 10.1995 7.50016 12.5007Z"
                      fill="white"
                    />
                    <path
                      d="M30 27.4993C30 30.721 25.5228 33.3327 20 33.3327C14.4772 33.3327 10 30.721 10 27.4993C10 24.2777 14.4772 21.666 20 21.666C25.5228 21.666 30 24.2777 30 27.4993Z"
                      fill="white"
                    />
                    <path
                      opacity="0.4"
                      d="M36.6668 27.5007C36.6668 29.8018 33.6821 31.6673 30.0002 31.6673C26.3183 31.6673 23.3335 29.8018 23.3335 27.5007C23.3335 25.1995 26.3183 23.334 30.0002 23.334C33.6821 23.334 36.6668 25.1995 36.6668 27.5007Z"
                      fill="white"
                    />
                    <path
                      opacity="0.4"
                      d="M3.33317 27.5007C3.33317 29.8018 6.31794 31.6673 9.99984 31.6673C13.6817 31.6673 16.6665 29.8018 16.6665 27.5007C16.6665 25.1995 13.6817 23.334 9.99984 23.334C6.31794 23.334 3.33317 25.1995 3.33317 27.5007Z"
                      fill="white"
                    />
                  </svg>
                </span>
              </div>
              <div className="col">
                <div className="font-weight-medium count_card_heading">
                  Vendor Leads
                </div>
                <div
                  className="text-secondary"
                  style={{ fontSize: "18px", fontWeight: "700" }}
                >
                  {leadCount.totalCount}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-lg-3">
        <div className="card card-sm" style={{ borderRadius: "12px" }}>
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-auto">
                <span
                  className="bg-green text-white avatar"
                  style={{
                    borderRadius: "8px",
                    border: "1px solid rgba(255, 255, 255, 0.30)",
                    background:
                      "linear-gradient(135deg, #187AF7 0%, #559AF4 100%)",
                    width: "50px",
                    height: "50px",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                  >
                    <circle
                      cx="20.0002"
                      cy="10.0007"
                      r="6.66667"
                      fill="white"
                    />
                    <path
                      opacity="0.5"
                      d="M30.1581 25.0513C29.45 24.9994 28.5814 24.9993 27.5002 24.9993C24.7503 24.9993 23.3754 24.9993 22.5211 25.8536C21.6668 26.7079 21.6668 28.0828 21.6668 30.8327C21.6668 32.7765 21.6668 34.0333 21.9686 34.9049C21.3287 34.967 20.671 34.9993 20.0002 34.9993C13.5568 34.9993 8.3335 32.0146 8.3335 28.3327C8.3335 24.6508 13.5568 21.666 20.0002 21.666C24.3559 21.666 28.1541 23.03 30.1581 25.0513Z"
                      fill="white"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M27.4998 36.6667C24.75 36.6667 23.375 36.6667 22.5208 35.8124C21.6665 34.9581 21.6665 33.5832 21.6665 30.8333C21.6665 28.0835 21.6665 26.7085 22.5208 25.8543C23.375 25 24.75 25 27.4998 25C30.2497 25 31.6246 25 32.4789 25.8543C33.3332 26.7085 33.3332 28.0835 33.3332 30.8333C33.3332 33.5832 33.3332 34.9581 32.4789 35.8124C31.6246 36.6667 30.2497 36.6667 27.4998 36.6667ZM28.4721 28.2407C28.4721 27.7038 28.0368 27.2685 27.4998 27.2685C26.9629 27.2685 26.5276 27.7038 26.5276 28.2407V29.8611H24.9072C24.3703 29.8611 23.935 30.2964 23.935 30.8333C23.935 31.3703 24.3703 31.8056 24.9072 31.8056H26.5276V33.4259C26.5276 33.9629 26.9629 34.3981 27.4998 34.3981C28.0368 34.3981 28.4721 33.9629 28.4721 33.4259V31.8056H30.0924C30.6294 31.8056 31.0647 31.3703 31.0647 30.8333C31.0647 30.2964 30.6294 29.8611 30.0924 29.8611H28.4721V28.2407Z"
                      fill="white"
                    />
                  </svg>
                </span>
              </div>
              <div className="col">
                <div className="font-weight-medium count_card_heading">
                  New Leads This Week
                </div>
                <div
                  className="text-secondary"
                  style={{ fontSize: "18px", fontWeight: "700" }}
                >
                  {leadCount.leadThisWeek}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-lg-3">
        <div className="card card-sm" style={{ borderRadius: "12px" }}>
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-auto">
                <span
                  className="bg-twitter text-white avatar"
                  style={{
                    borderRadius: "8px",
                    border: "1px solid rgba(255, 255, 255, 0.30)",
                    background:
                      "linear-gradient(135deg, #13B370 0%, #3ACE90 100%)",
                    width: "50px",
                    height: "50px",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                  >
                    <path
                      opacity="0.5"
                      d="M23.3335 6.66602H16.6668C10.3814 6.66602 7.23874 6.66602 5.28612 8.61864C3.3335 10.5713 3.3335 13.714 3.3335 19.9993C3.3335 26.2847 3.3335 29.4274 5.28612 31.3801C7.23874 33.3327 10.3814 33.3327 16.6668 33.3327H23.3335C29.6189 33.3327 32.7616 33.3327 34.7142 31.3801C36.6668 29.4274 36.6668 26.2847 36.6668 19.9993C36.6668 13.714 36.6668 10.5713 34.7142 8.61864C32.7616 6.66602 29.6189 6.66602 23.3335 6.66602Z"
                      fill="white"
                    />
                    <path
                      d="M22.0835 14.9993C22.0835 14.309 22.6431 13.7493 23.3335 13.7493H31.6668C32.3572 13.7493 32.9168 14.309 32.9168 14.9993C32.9168 15.6897 32.3572 16.2493 31.6668 16.2493H23.3335C22.6431 16.2493 22.0835 15.6897 22.0835 14.9993Z"
                      fill="white"
                    />
                    <path
                      d="M23.7502 19.9993C23.7502 19.309 24.3098 18.7493 25.0002 18.7493H31.6668C32.3572 18.7493 32.9168 19.309 32.9168 19.9993C32.9168 20.6897 32.3572 21.2493 31.6668 21.2493H25.0002C24.3098 21.2493 23.7502 20.6897 23.7502 19.9993Z"
                      fill="white"
                    />
                    <path
                      d="M25.4168 24.9993C25.4168 24.309 25.9765 23.7493 26.6668 23.7493H31.6668C32.3572 23.7493 32.9168 24.309 32.9168 24.9993C32.9168 25.6897 32.3572 26.2493 31.6668 26.2493H26.6668C25.9765 26.2493 25.4168 25.6897 25.4168 24.9993Z"
                      fill="white"
                    />
                    <path
                      d="M15.0002 18.3327C16.8411 18.3327 18.3335 16.8403 18.3335 14.9993C18.3335 13.1584 16.8411 11.666 15.0002 11.666C13.1592 11.666 11.6668 13.1584 11.6668 14.9993C11.6668 16.8403 13.1592 18.3327 15.0002 18.3327Z"
                      fill="white"
                    />
                    <path
                      d="M15.0002 28.3327C21.6668 28.3327 21.6668 26.8403 21.6668 24.9993C21.6668 23.1584 18.6821 21.666 15.0002 21.666C11.3183 21.666 8.3335 23.1584 8.3335 24.9993C8.3335 26.8403 8.3335 28.3327 15.0002 28.3327Z"
                      fill="white"
                    />
                  </svg>
                </span>
              </div>
              <div className="col">
                <div className="font-weight-medium count_card_heading">
                  Onboarded Vendors
                </div>
                <div
                  className="text-secondary"
                  style={{ fontSize: "18px", fontWeight: "700" }}
                >
                  {leadCount.onBoard}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-lg-3">
        <div className="card card-sm" style={{ borderRadius: "12px" }}>
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-auto">
                <span
                  className="bg-facebook text-white avatar"
                  style={{
                    borderRadius: "8px",
                    border: "1px solid rgba(255, 255, 255, 0.30)",
                    background:
                      "linear-gradient(135deg, #DC5B32 0%, #FF8E6A 100%)",
                    width: "50px",
                    height: "50px",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                  >
                    <path
                      opacity="0.5"
                      d="M36.6668 20.0007C36.6668 29.2054 29.2049 36.6673 20.0002 36.6673C10.7954 36.6673 3.3335 29.2054 3.3335 20.0007C3.3335 10.7959 10.7954 3.33398 20.0002 3.33398C29.2049 3.33398 36.6668 10.7959 36.6668 20.0007Z"
                      fill="white"
                    />
                    <path
                      d="M28.0118 31.6853C25.7331 33.2506 22.9736 34.1667 20.0002 34.1667C17.0267 34.1667 14.2672 33.2506 11.9885 31.6852C10.9821 30.9939 10.552 29.6769 11.1371 28.6053C12.3502 26.3837 14.8497 25 20.0001 25C25.1506 25 27.6502 26.3838 28.8632 28.6054C29.4483 29.6771 29.0182 30.994 28.0118 31.6853Z"
                      fill="white"
                    />
                    <path
                      d="M20.0002 20C22.7617 20 25.0002 17.7614 25.0002 15C25.0002 12.2386 22.7617 10 20.0002 10C17.2388 10 15.0002 12.2386 15.0002 15C15.0002 17.7614 17.2388 20 20.0002 20Z"
                      fill="white"
                    />
                  </svg>
                </span>
              </div>
              <div className="col">
                <div className="font-weight-medium count_card_heading">
                  Active Vendors
                </div>
                <div
                  className="text-secondary"
                  style={{ fontSize: "18px", fontWeight: "700" }}
                >
                  {leadCount.active}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderTiles;
