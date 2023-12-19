import React, { useState,useEffect } from "react";
import {getOfferCount} from "../../services/offers"



function DiscountHeaders(props) {
  const [totalcount,setTotalCounts]=useState(0)
  const [activecount,setActiveCounts]=useState(0)
  const [inactivecount,setInactiveCounts]=useState(0)

  useEffect(() => {
    getOfferCount()
      .then((data) => {
        setTotalCounts(data?.total_offers);
        setActiveCounts(data?.enabled_offers)
        setInactiveCounts(data?.disabled_offers)
      })
      .catch((error) => {
        console.error("Error fetching  data:", error);
      });
  }, []);

  return (
    <div className="row row-cards">
      <div className="col-sm-6 col-lg-4">
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
                  <svg width={56} height={56} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width={56} height={56} rx={8} fill="url(#paint0_linear_1966_26201)" />
                    <rect x="0.5" y="0.5" width={55} height={55} rx="7.5" stroke="white" strokeOpacity="0.3" />
                    <path opacity="0.5" d="M15.8808 34.8955C13.3049 32.3196 12.017 31.0316 11.5377 29.3606C11.0585 27.6896 11.4681 25.9148 12.2872 22.3652L12.7596 20.3183C13.4487 17.332 13.7933 15.8389 14.8157 14.8164C15.8382 13.7939 17.3313 13.4494 20.3176 12.7602L22.3646 12.2878C25.9142 11.4687 27.6889 11.0591 29.36 11.5384C31.031 12.0176 32.3189 13.3056 34.8948 15.8815L37.9442 18.9309C42.4258 23.4125 44.6667 25.6533 44.6667 28.4379C44.6667 31.2224 42.4258 33.4632 37.9442 37.9448L37.9442 37.9449L37.9442 37.9449C33.4626 42.4265 31.2217 44.6673 28.4372 44.6673C25.6527 44.6673 23.4118 42.4265 18.9302 37.9449L15.8808 34.8955Z" fill="white" />
                    <path d="M24.8724 20.1192C26.1851 21.4319 26.1851 23.5601 24.8724 24.8727C23.5598 26.1854 21.4316 26.1854 20.1189 24.8727C18.8063 23.5601 18.8063 21.4319 20.1189 20.1192C21.4316 18.8066 23.5598 18.8066 24.8724 20.1192Z" fill="white" />
                    <path d="M39.7519 28.0861L28.1203 39.7182C27.6321 40.2063 26.8406 40.2063 26.3525 39.7182C25.8643 39.23 25.8643 38.4386 26.3525 37.9504L37.9841 26.3183C38.4723 25.8302 39.2637 25.8302 39.7519 26.3183C40.2401 26.8065 40.2401 27.5979 39.7519 28.0861Z" fill="white" />
                    <defs>
                      <linearGradient id="paint0_linear_1966_26201" x1={0} y1={0} x2={56} y2={56} gradientUnits="userSpaceOnUse">
                        <stop stopColor="#5C4AF2" />
                        <stop offset={1} stopColor="#988DF5" />
                      </linearGradient>
                    </defs>
                  </svg>

                </span>
              </div>
              <div className="col">
                <div className="font-weight-medium count_card_heading">
                Total Discount Coupons
                </div>
                <div
                  className="text-secondary"
                  style={{ fontSize: "18px", fontWeight: "700" }}
                >
                  {totalcount}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-lg-4">
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
                  <svg width={57} height={56} viewBox="0 0 57 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.666626" width={56} height={56} rx={8} fill="url(#paint0_linear_1966_26213)" />
                    <rect x="1.16663" y="0.5" width={55} height={55} rx="7.5" stroke="white" strokeOpacity="0.3" />
                    <path opacity="0.5" d="M16.5474 34.8955C13.9716 32.3196 12.6836 31.0316 12.2044 29.3606C11.7251 27.6896 12.1347 25.9148 12.9538 22.3652L13.4262 20.3183C14.1153 17.332 14.4599 15.8389 15.4824 14.8164C16.5048 13.7939 17.998 13.4494 20.9843 12.7602L23.0312 12.2878C26.5808 11.4687 28.3556 11.0591 30.0266 11.5384C31.6976 12.0176 32.9856 13.3056 35.5614 15.8815L38.6108 18.9309C43.0925 23.4125 45.3333 25.6533 45.3333 28.4379C45.3333 31.2224 43.0925 33.4632 38.6109 37.9448L38.6108 37.9449L38.6108 37.9449C34.1292 42.4265 31.8884 44.6673 29.1038 44.6673C26.3193 44.6673 24.0785 42.4265 19.5968 37.9449L16.5474 34.8955Z" fill="white" />
                    <path d="M25.539 20.1192C26.8517 21.4319 26.8517 23.5601 25.539 24.8727C24.2264 26.1854 22.0982 26.1854 20.7855 24.8727C19.4729 23.5601 19.4729 21.4319 20.7855 20.1192C22.0982 18.8066 24.2264 18.8066 25.539 20.1192Z" fill="white" />
                    <path d="M40.4185 28.0861L28.7869 39.7182C28.2987 40.2063 27.5073 40.2063 27.0191 39.7182C26.5309 39.23 26.5309 38.4386 27.0191 37.9504L38.6507 26.3183C39.1389 25.8302 39.9303 25.8302 40.4185 26.3183C40.9067 26.8065 40.9067 27.5979 40.4185 28.0861Z" fill="white" />
                    <defs>
                      <linearGradient id="paint0_linear_1966_26213" x1="0.666626" y1={0} x2="56.6666" y2={56} gradientUnits="userSpaceOnUse">
                        <stop stopColor="#13B370" />
                        <stop offset={1} stopColor="#3ACE90" />
                      </linearGradient>
                    </defs>
                  </svg>


                </span>
              </div>
              <div className="col">
                <div className="font-weight-medium count_card_heading">
                Active Discount Coupons
                </div>
                <div
                  className="text-secondary"
                  style={{ fontSize: "18px", fontWeight: "700" }}
                >
                  {activecount}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-lg-4">
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
                  <svg width={57} height={56} viewBox="0 0 57 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.333252" width={56} height={56} rx={8} fill="url(#paint0_linear_1966_26225)" />
                    <rect x="0.833252" y="0.5" width={55} height={55} rx="7.5" stroke="white" strokeOpacity="0.3" />
                    <path opacity="0.5" d="M16.214 34.8955C13.6381 32.3196 12.3502 31.0316 11.871 29.3606C11.3917 27.6896 11.8013 25.9148 12.6204 22.3652L13.0928 20.3183C13.7819 17.332 14.1265 15.8389 15.149 14.8164C16.1714 13.7939 17.6646 13.4494 20.6508 12.7602L22.6978 12.2878C26.2474 11.4687 28.0222 11.0591 29.6932 11.5384C31.3642 12.0176 32.6522 13.3056 35.228 15.8815L38.2774 18.9309C42.7591 23.4125 44.9999 25.6533 44.9999 28.4379C44.9999 31.2224 42.7591 33.4632 38.2774 37.9448L38.2774 37.9449L38.2774 37.9449C33.7958 42.4265 31.555 44.6673 28.7704 44.6673C25.9859 44.6673 23.7451 42.4265 19.2634 37.9449L16.214 34.8955Z" fill="white" />
                    <path d="M25.2057 20.1192C26.5183 21.4319 26.5183 23.5601 25.2057 24.8727C23.8931 26.1854 21.7648 26.1854 20.4522 24.8727C19.1396 23.5601 19.1396 21.4319 20.4522 20.1192C21.7648 18.8066 23.8931 18.8066 25.2057 20.1192Z" fill="white" />
                    <path d="M40.0852 28.0861L28.4535 39.7182C27.9654 40.2063 27.1739 40.2063 26.6858 39.7182C26.1976 39.23 26.1976 38.4386 26.6857 37.9504L38.3174 26.3183C38.8055 25.8302 39.597 25.8302 40.0852 26.3183C40.5733 26.8065 40.5733 27.5979 40.0852 28.0861Z" fill="white" />
                    <defs>
                      <linearGradient id="paint0_linear_1966_26225" x1="0.333252" y1={0} x2="56.3333" y2={56} gradientUnits="userSpaceOnUse">
                        <stop stopColor="#DC5B32" />
                        <stop offset={1} stopColor="#FF8E6A" />
                      </linearGradient>
                    </defs>
                  </svg>


                </span>
              </div>
              <div className="col">
                <div className="font-weight-medium count_card_heading">
                Inactive Discount Coupons
                </div>
                <div
                  className="text-secondary"
                  style={{ fontSize: "18px", fontWeight: "700" }}
                >
                  {inactivecount}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default DiscountHeaders;
