import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import filterIcon from "../../static/img/Filter.png";
import {
  getCustomerSearch,
  getCustomerlist,
} from "../../services/CustomerHandle";
import { formatDate, removeBaseUrlFromPath } from "../../helpers";
import { getListDataInPagination } from "../../services/commonServices";

export default function EventListing() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [salesRep, setsalesRep] = useState();
  const [listPageUrl, setListPageUrl] = useState({
    next: null,
    previous: null,
  });
  const [isRefetch, setIsRefetch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const handleOpenOffcanvas = () => setShowOffcanvas(true);

  useEffect(() => {
    const role = "Staff";
    getCustomerlist(role)
      .then((data) => {
        console.log("salesRep-list", data);
        // setListDiscount(data.results);
        // const filteredResults = data.results.filter(
        //   (item) => item.role === "Staff"
        // );
        setListPageUrl({
          next: data.next,
          previous: data.previous,
        });
        setsalesRep(data.results);
        // setCustomerId(data.results[0]?.id);
      })
      .catch((error) => {
        console.error("Error fetching sales rep List data:", error);
      });
  }, []);

  const handlePagination = async (type) => {
    setIsLoading(true);
    let convertedUrl =
      type === "next"
        ? listPageUrl.next && removeBaseUrlFromPath(listPageUrl.next)
        : type === "prev"
        ? listPageUrl.previous && removeBaseUrlFromPath(listPageUrl.previous)
        : null;
    convertedUrl &&
      getListDataInPagination(convertedUrl)
        .then((data) => {
          setIsLoading(false);
          setListPageUrl({ next: data.next, previous: data.previous });
          const filteredResults = data.results.filter(
            (item) => item?.role === "Staff"
          );
          setsalesRep(filteredResults);
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error fetching  data:", error);
        });
  };
  return (
    <div className="page" style={{ height: "100vh", top: 20 }}>
      <div className="container">
        <div className="row">
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
                      {/* <img src={totalBooking} /> */}
                    </span>
                  </div>
                  <div className="col">
                    <div className="font-weight-medium count_card_heading">
                      Total Sale POC
                    </div>
                    <div
                      className="text-secondary"
                      style={{ fontSize: "18px", fontWeight: "700" }}
                    >
                      469
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
                      style={{
                        borderRadius: "8px",
                        border: "1px solid rgba(255, 255, 255, 0.30)",
                        width: "50px",
                        height: "50px",
                      }}
                    >
                      {/* <img src={newBooking} /> */}
                    </span>
                  </div>
                  <div className="col">
                    <div className="font-weight-medium count_card_heading">
                      New Sale POC In Current QTR
                    </div>
                    <div
                      className="text-secondary"
                      style={{ fontSize: "18px", fontWeight: "700" }}
                    >
                      123
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
                      style={{
                        borderRadius: "8px",
                        border: "1px solid rgba(255, 255, 255, 0.30)",
                        width: "50px",
                        height: "50px",
                      }}
                    >
                      {/* <img src={confirmBooking} /> */}
                    </span>
                  </div>
                  <div className="col">
                    <div className="font-weight-medium count_card_heading">
                      Active Sale POC
                    </div>
                    <div
                      className="text-secondary"
                      style={{ fontSize: "18px", fontWeight: "700" }}
                    >
                      326
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 actions_menu my-2">
          <div className="action_menu_left col-8">
            <div>
              <form action="" method="post" autocomplete="off">
                <div style={{ display: "flex" }}>
                  <div className="input-icon">
                    <span className="input-icon-addon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                        <path d="M21 21l-6 -6" />
                      </svg>
                    </span>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Input search term"
                    />
                    <button
                      type="button"
                      className="btn search_button"
                      style={{ background: "#006875" }}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="action_buttons col-4">
            <button
              to="/eventsview"
              // onClick={handleOpenOffcanvas}
              className="btn btn-info vendor_button"
              style={{ borderRadius: "6px" }}
              type="button"
            >
              Add Events/Package + &nbsp;
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M10 3L10 17"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M3 10H17"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <button className="btn btn-outline" style={{ borderRadius: "6px" }}>
              Export &nbsp;
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M3.33317 10C3.33317 13.6819 6.31794 16.6667 9.99984 16.6667C13.6817 16.6667 16.6665 13.6819 16.6665 10"
                  stroke="#252525"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M10 11.6673L10 3.33398M10 3.33398L12.5 5.83398M10 3.33398L7.5 5.83398"
                  stroke="#252525"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          {/* <CreateSalesRep show={showOffcanvas} close={handleOpenOffcanvas} /> */}
        </div>
        <div className="card mx-3">
          <div className="table-responsive">
            <table className="table card-table table-vcenter text-nowrap datatable ">
              <thead>
                <tr>
                  <th className="w-1">
                    <span>Name</span>
                    <svg
                      className="mx-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M7 2.33398L7 11.6673M7 11.6673L10.5 8.16732M7 11.6673L3.5 8.16732"
                        stroke="#6E7070"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </th>
                  <th>
                    <span>Machine Name</span>
                    <svg
                      className="mx-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M7 2.33398L7 11.6673M7 11.6673L10.5 8.16732M7 11.6673L3.5 8.16732"
                        stroke="#6E7070"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </th>
                  <th>
                    {" "}
                    <span>Type</span>
                    <svg
                      className="mx-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M7 2.33398L7 11.6673M7 11.6673L10.5 8.16732M7 11.6673L3.5 8.16732"
                        stroke="#6E7070"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </th>
                  <th>
                    <span>Capacity</span>
                    <svg
                      className="mx-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M7 2.33398L7 11.6673M7 11.6673L10.5 8.16732M7 11.6673L3.5 8.16732"
                        stroke="#6E7070"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </th>

                  <th>
                    <span>Status</span>
                    <svg
                      className="mx-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M7 2.33398L7 11.6673M7 11.6673L10.5 8.16732M7 11.6673L3.5 8.16732"
                        stroke="#6E7070"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </th>

                  <th>
                    <span>Action</span>
                    <svg
                      className="mx-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M7 2.33398L7 11.6673M7 11.6673L10.5 8.16732M7 11.6673L3.5 8.16732"
                        stroke="#6E7070"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </th>
                </tr>
              </thead>
              {salesRep && salesRep.length > 0 ? (
                <>
                  {salesRep.map((item) => {
                    return (
                      <tbody>
                        {console.log("sles map", salesRep)}
                        <tr>
                          <td>
                            <span className="text-secondary">Achile Laura</span>
                          </td>
                          <td>
                            <span className="text-secondary">Machine Name</span>
                          </td>
                          <td>
                            <span className="text-secondary">Package</span>
                          </td>
                          <td>
                            <span className="text-secondary">8</span>
                          </td>
                          <td>
                            <Link
                              to={`/sales-representatives/${item?.id}`}
                              // to={`/customers/${item.id}`}
                              className="btn btn-sm btn-info text-center"
                              style={{
                                padding: "6px 10px",
                                borderRadius: "4px",
                                color: "#40C77E",
                                borderRadius:
                                  "var(--Roundness-Round-Inside, 6px)",
                                background: "rgba(19, 179, 112, 0.20)",

                                /* Shadow/XSM */
                                boxShadow:
                                  "0px 1px 2px 0px rgba(16, 24, 40, 0.04)",
                              }}
                            >
                              View &nbsp;
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                              ></svg>
                            </Link>
                          </td>

                          <td
                            style={{
                              display: "flex",
                              gap: "10px",
                              alignItems: "baseline",
                            }}
                          >
                            <Link
                              to="/eventsview"
                              // to={`/customers/${item.id}`}
                              className="btn btn-sm btn-info"
                              style={{
                                padding: "6px 10px",
                                borderRadius: "4px",
                              }}
                            >
                              View &nbsp;
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
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </>
              ) : (
                <tr>
                  <td className="error">No Records Found</td>
                </tr>
              )}
            </table>
          </div>
          <div className="card-footer d-flex align-items-center">
            <ul className="pagination m-0 ms-auto">
              <li
                className={`page-item  ${!listPageUrl.previous && "disabled"}`}
              >
                <a
                  className="page-link"
                  href="#"
                  tabIndex="-1"
                  onClick={() => {
                    handlePagination("prev");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M15 6l-6 6l6 6" />
                  </svg>
                  prev
                </a>
              </li>

              <li className={`page-item  ${!listPageUrl.next && "disabled"}`}>
                <a
                  className="page-link"
                  href="#"
                  onClick={() => {
                    handlePagination("next");
                  }}
                >
                  next
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 6l6 6l-6 6" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* //modal */}
      </div>
      {/* {showOffcanvas && (
      <AddNewService
          show={showOffcanvas}
          close={handleCloseOffcanvas}
          isRefetch={isRefetch}
          setIsRefetch={setIsRefetch}
      />
  )} */}
    </div>
  );
}
