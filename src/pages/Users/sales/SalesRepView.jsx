import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import SalesRepDetails from "./SalesRepDetails";
import { getSalesRepListById } from "../../../services/GuestHandle";

function SalesRepView() {
  const navigate = useNavigate();
  const salesRepId = useParams()?.salesRepId;

  const [salesRepDetails, setsalesRepDetails] = useState();

  useEffect(() => {
    getSalesRepListById(salesRepId)
      .then((data) => {
        setsalesRepDetails(data);
        // console.log(" admin by id==", data);
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });
  }, [salesRepId]);
  return (
    <>
      <div className="page">
        <div className="page-body">
          <div className="container-xl">
            <div>
              <div className="col-12">
                <div className="row row-cards">
                  <div className="breadcrumbs">
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/customers")}
                    >
                      <p>Users</p>
                    </div>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M8.33301 5L12.7438 9.41074C13.0692 9.73618 13.0692 10.2638 12.7438 10.5893L8.33301 15"
                          stroke="#68727D"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </svg>
                    </span>
                    <p>
                      {" "}
                      {salesRepDetails?.role === "Staff" ? (
                        <p>Staff</p>
                      ) : (
                        <span></span>
                      )}
                    </p>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M8.33301 5L12.7438 9.41074C13.0692 9.73618 13.0692 10.2638 12.7438 10.5893L8.33301 15"
                          stroke="#68727D"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </svg>
                    </span>
                    <p>
                      {salesRepDetails?.first_name}
                      {salesRepDetails?.last_name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between mt-5 ms-3">
              <div style={{ cursor: "pointer" }} onClick={() => navigate(-1)}>
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
            <SalesRepDetails />
          </div>
        </div>
      </div>
    </>
  );
}

export default SalesRepView;
