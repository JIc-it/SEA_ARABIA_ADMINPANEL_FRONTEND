import { useEffect, useState } from "react";
import {
  getCustomerTotalCount,
  getGuestUserRequest,
  getTotalGuestUser,
} from "../../../services/CustomerHandle";

function GuestHeader(props) {
  const [count, setCount] = useState();
  useEffect(() => {
    getTotalGuestUser()
      .then((data) => {
        console.log("guest-Count", data);
      setCount(data?.count);
      })
      .catch((error) => {
        console.error("Error fetching total booking data:", error);
      });
  }, []);
  // useEffect(() => {
  //   getGuestUserRequest()
  //     .then((data) => {
  //       console.log("guest-Count", data);
  //       setCount(data?.count);

  //       console.log(data.count);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching Customer List data:", error);
  //     });
  // }, []);

  return (
    <div className="row row-cards m-1 p-1">
      <div className="row">
        <div className="col-sm-6 col-lg-12">
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
                    {/* <img src={guestUserImg} /> */}
                  </span>
                </div>
                <div className="col">
                  <div className="font-weight-medium count_card_heading">
                    Total Guest Users
                  </div>
                  <div
                    className="text-secondary"
                    style={{ fontSize: "18px", fontWeight: "700" }}
                  >
                    {count}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuestHeader;
