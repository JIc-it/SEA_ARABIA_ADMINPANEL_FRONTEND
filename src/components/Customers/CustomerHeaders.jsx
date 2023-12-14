import { useEffect, useState } from "react";
import { getCustomerTotalCount } from "../../services/CustomerHandle";

function CustomerHeaders(props) {
  const [count, setCount] = useState();
  useEffect(() => {
    getCustomerTotalCount()
      .then((data) => {
        console.log("customer-Count", data);
        setCount(data);

        // setCustomerId(data.results[0]?.id);
      })
      .catch((error) => {
        console.error("Error fetching Customer List data:", error);
      });
  }, []);
  return (
    <div className="row row-cards m-1 p-1">
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
                  Total Customers
                </div>
                <div
                  className="text-secondary"
                  style={{ fontSize: "18px", fontWeight: "700" }}
                >
                  {count?.user_count}
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
                  style={{
                    borderRadius: "8px",
                    border: "1px solid rgba(255, 255, 255, 0.30)",
                    width: "50px",
                    height: "50px",
                  }}
                >
                  <svg
                    width={56}
                    height={56}
                    viewBox="0 0 56 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width={56}
                      height={56}
                      rx={8}
                      fill="url(#paint0_linear_734_22273)"
                    />
                    <rect
                      x="0.5"
                      y="0.5"
                      width={55}
                      height={55}
                      rx="7.5"
                      stroke="white"
                      strokeOpacity="0.3"
                    />
                    <path
                      d="M34.6668 17.9997C34.6668 21.6816 31.6821 24.6663 28.0002 24.6663C24.3183 24.6663 21.3335 21.6816 21.3335 17.9997C21.3335 14.3178 24.3183 11.333 28.0002 11.333C31.6821 11.333 34.6668 14.3178 34.6668 17.9997Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M35.4998 44.6667C32.75 44.6667 31.375 44.6667 30.5208 43.8124C29.6665 42.9581 29.6665 41.5832 29.6665 38.8333C29.6665 36.0835 29.6665 34.7085 30.5208 33.8543C31.375 33 32.75 33 35.4998 33C38.2497 33 39.6246 33 40.4789 33.8543C41.3332 34.7085 41.3332 36.0835 41.3332 38.8333C41.3332 41.5832 41.3332 42.9581 40.4789 43.8124C39.6246 44.6667 38.2497 44.6667 35.4998 44.6667ZM38.7799 37.5764C39.1596 37.1967 39.1596 36.5811 38.7799 36.2014C38.4002 35.8217 37.7846 35.8217 37.405 36.2014L34.2035 39.4028L33.5947 38.794C33.215 38.4143 32.5995 38.4143 32.2198 38.794C31.8401 39.1737 31.8401 39.7893 32.2198 40.1689L33.5161 41.4652C33.8958 41.8449 34.5113 41.8449 34.891 41.4652L38.7799 37.5764Z"
                      fill="white"
                    />
                    <path
                      opacity="0.5"
                      d="M32.1288 44.535C30.9186 44.6216 29.5492 44.667 27.9998 44.667C14.6665 44.667 14.6665 41.3091 14.6665 37.167C14.6665 33.0249 20.636 29.667 27.9998 29.667C32.8008 29.667 37.0092 31.0943 39.3569 33.2357C38.4965 33.0003 37.2893 33.0003 35.4998 33.0003C32.75 33.0003 31.375 33.0003 30.5208 33.8546C29.6665 34.7089 29.6665 36.0838 29.6665 38.8337C29.6665 41.5835 29.6665 42.9584 30.5208 43.8127C30.9166 44.2086 31.4243 44.421 32.1288 44.535Z"
                      fill="white"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_734_22273"
                        x1={0}
                        y1={0}
                        x2={56}
                        y2={56}
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#13B370" />
                        <stop offset={1} stopColor="#3ACE90" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </div>
              {/* <div className="col">
                  <div className="font-weight-medium count_card_heading">
                    Active Customers
                  </div>
                  <div
                    className="text-secondary"
                    style={{ fontSize: "18px", fontWeight: "700" }}
                  >
                    123
                  </div>
                </div> */}
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
                  style={{
                    borderRadius: "8px",
                    border: "1px solid rgba(255, 255, 255, 0.30)",
                    width: "50px",
                    height: "50px",
                  }}
                >
                  <svg
                    width={56}
                    height={56}
                    viewBox="0 0 56 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width={56}
                      height={56}
                      rx={8}
                      fill="url(#paint0_linear_734_22285)"
                    />
                    <rect
                      x="0.5"
                      y="0.5"
                      width={55}
                      height={55}
                      rx="7.5"
                      stroke="white"
                      strokeOpacity="0.3"
                    />
                    <path
                      d="M28.0002 24.6663C31.6821 24.6663 34.6668 21.6816 34.6668 17.9997C34.6668 14.3178 31.6821 11.333 28.0002 11.333C24.3183 11.333 21.3335 14.3178 21.3335 17.9997C21.3335 21.6816 24.3183 24.6663 28.0002 24.6663Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M35.4998 34.25C32.9685 34.25 30.9165 36.302 30.9165 38.8333C30.9165 39.6673 31.1385 40.4485 31.5276 41.122L37.7885 34.8611C37.115 34.472 36.3338 34.25 35.4998 34.25ZM39.5325 36.6526L33.3191 42.866C33.9676 43.2175 34.71 43.4167 35.4998 43.4167C38.0311 43.4167 40.0832 41.3646 40.0832 38.8333C40.0832 38.0435 39.884 37.3011 39.5325 36.6526ZM28.4165 38.8333C28.4165 34.9213 31.5878 31.75 35.4998 31.75C37.4816 31.75 39.2751 32.5655 40.5593 33.876C41.81 35.1523 42.5832 36.9038 42.5832 38.8333C42.5832 42.7454 39.4119 45.9167 35.4998 45.9167C33.5703 45.9167 31.8188 45.1435 30.5425 43.8928C29.232 42.6086 28.4165 40.8151 28.4165 38.8333Z"
                      fill="white"
                    />
                    <path
                      opacity="0.4"
                      d="M37.9936 32.2021C37.2178 31.9102 36.3773 31.7503 35.4998 31.7503C31.5878 31.7503 28.4165 34.9216 28.4165 38.8337C28.4165 40.8154 29.232 42.6089 30.5425 43.8931C30.7975 44.143 31.0714 44.3738 31.3619 44.5832C30.3479 44.6384 29.2307 44.667 27.9998 44.667C14.6665 44.667 14.6665 41.3091 14.6665 37.167C14.6665 33.0249 20.636 29.667 27.9998 29.667C31.9788 29.667 35.5506 30.6474 37.9936 32.2021Z"
                      fill="white"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_734_22285"
                        x1={0}
                        y1={0}
                        x2={56}
                        y2={56}
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#E6B506" />
                        <stop offset={1} stopColor="#F0CB44" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </div>
              {/* <div className="col">
                  <div className="font-weight-medium count_card_heading">
                    Inactive Customers
                  </div>
                  <div
                    className="text-secondary"
                    style={{ fontSize: "18px", fontWeight: "700" }}
                  >
                    326
                  </div>
                </div> */}
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
                  style={{
                    borderRadius: "8px",
                    border: "1px solid rgba(255, 255, 255, 0.30)",
                    width: "50px",
                    height: "50px",
                  }}
                >
                  <svg
                    width={56}
                    height={56}
                    viewBox="0 0 56 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width={56}
                      height={56}
                      rx={8}
                      fill="url(#paint0_linear_734_22294)"
                    />
                    <rect
                      x="0.5"
                      y="0.5"
                      width={55}
                      height={55}
                      rx="7.5"
                      stroke="white"
                      strokeOpacity="0.3"
                    />
                    <path
                      d="M33.8332 20.5003C33.8332 23.722 31.2215 26.3337 27.9998 26.3337C24.7782 26.3337 22.1665 23.722 22.1665 20.5003C22.1665 17.2787 24.7782 14.667 27.9998 14.667C31.2215 14.667 33.8332 17.2787 33.8332 20.5003Z"
                      fill="white"
                    />
                    <path
                      opacity="0.4"
                      d="M40.4998 20.4997C40.4998 22.8009 38.6344 24.6663 36.3332 24.6663C34.032 24.6663 32.1665 22.8009 32.1665 20.4997C32.1665 18.1985 34.032 16.333 36.3332 16.333C38.6344 16.333 40.4998 18.1985 40.4998 20.4997Z"
                      fill="white"
                    />
                    <path
                      opacity="0.4"
                      d="M15.5002 20.4997C15.5002 22.8009 17.3656 24.6663 19.6668 24.6663C21.968 24.6663 23.8335 22.8009 23.8335 20.4997C23.8335 18.1985 21.968 16.333 19.6668 16.333C17.3656 16.333 15.5002 18.1985 15.5002 20.4997Z"
                      fill="white"
                    />
                    <path
                      d="M38 35.5003C38 38.722 33.5228 41.3337 28 41.3337C22.4772 41.3337 18 38.722 18 35.5003C18 32.2787 22.4772 29.667 28 29.667C33.5228 29.667 38 32.2787 38 35.5003Z"
                      fill="white"
                    />
                    <path
                      opacity="0.4"
                      d="M44.6668 35.4997C44.6668 37.8009 41.6821 39.6663 38.0002 39.6663C34.3183 39.6663 31.3335 37.8009 31.3335 35.4997C31.3335 33.1985 34.3183 31.333 38.0002 31.333C41.6821 31.333 44.6668 33.1985 44.6668 35.4997Z"
                      fill="white"
                    />
                    <path
                      opacity="0.4"
                      d="M11.3332 35.4997C11.3332 37.8009 14.3179 39.6663 17.9998 39.6663C21.6817 39.6663 24.6665 37.8009 24.6665 35.4997C24.6665 33.1985 21.6817 31.333 17.9998 31.333C14.3179 31.333 11.3332 33.1985 11.3332 35.4997Z"
                      fill="white"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_734_22294"
                        x1={0}
                        y1={0}
                        x2={56}
                        y2={56}
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#187AF7" />
                        <stop offset={1} stopColor="#559AF4" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </div>
              <div className="col">
                <div className="font-weight-medium count_card_heading">
                  Total Users
                </div>
                <div
                  className="text-secondary"
                  style={{ fontSize: "18px", fontWeight: "700" }}
                >
                  153
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerHeaders;
