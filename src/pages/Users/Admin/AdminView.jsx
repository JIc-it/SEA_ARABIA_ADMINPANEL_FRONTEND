import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getCustomerlist } from "../../../services/CustomerHandle";
import AdminDetails from "./AdminDetails";
import { getAdminListById } from "../../../services/GuestHandle";

function AdminView() {
  const navigate = useNavigate();
  const adminId = useParams()?.adminId;
  const [adminData, setAdminData] = useState();
  const [adminDetails, setAdminDetails] = useState();
  useEffect(() => {
    getCustomerlist()
      .then((data) => {
        // console.log("admin==-list", data.results);
        setAdminData(data.results);
      })
      .catch((error) => {
        console.error("Error fetching Customer List data:", error);
      });
  }, []);

  useEffect(() => {
    getAdminListById(adminId)
      .then((data) => {
        setAdminDetails(data);
        // console.log(" admin by id==", data);
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });
  }, [adminId]);
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
                      <p>
                        {" "}
                        {adminDetails?.role === "Admin" ? (
                          <p>Admin</p>
                        ) : (
                          <span></span>
                        )}
                      </p>
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
                    <p>Admin</p>
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
                    <p>{adminDetails?.first_name}
                      {adminDetails?.last_name}</p>
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
            <AdminDetails />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminView;
