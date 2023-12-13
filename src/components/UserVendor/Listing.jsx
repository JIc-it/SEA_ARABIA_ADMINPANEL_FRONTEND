import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import filterIcon from "../../static/img/Filter.png";
import { getVendorStatus } from "../../services/leadMangement";
import {
  getCustomerSearch,
  getCustomerlist,
} from "../../services/CustomerHandle";
import VendorList from "../Initial_contact/VendorList";

export default function Listing() {
  const navigate = useNavigate();
  const [isToggled, setToggled] = useState(true);
  const [vendor, setVendor] = useState();
  const [search, setSearch] = useState("");
  const [isRefetch, setIsRefetch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [listPageUrl, setListPageUrl] = useState({
    next: null,
    previous: null,
  });
  const handleToggle = () => {
    setToggled(!isToggled);
  };
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  useEffect(() => {
    getCustomerlist()
      .then((data) => {
        const vendorList = data.results.filter(
          (item) => item.role === "Vendor"
        );
        setVendor(vendorList); // Fix the typo here
        // console.log("Vendor list =====:", vendorList); // Fix the variable name here
      })
      .catch((error) => {
        console.error("Error fetching distributor data:", error);
      });
  }, []);

  const [statusList, setStatusList] = useState([]);

  const getVendorListData = async () => {
    setIsLoading(true);
    getCustomerSearch(search, selectedValue)
      .then((data) => {
        console.log("Search ---:", data);
        setIsLoading(false);
        setListPageUrl({ next: data.next, previous: data.previous });
        setVendor(data?.results);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching  data:", error);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getVendorStatus()
      .then((data) => {
        setIsLoading(false);
        setStatusList(data.results);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching  data:", error);
      });
  }, []);
  useEffect(() => {
    getVendorListData(search, selectedValue);
  }, [search, selectedValue, isRefetch]);

  return (
    <div style={{ height: "100vh" }}>
      <div className="col-12 actions_menu my-2 px-3">
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
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                  <button
                    type="button"
                    className="btn search_button"
                    style={{ background: "#006875" }}
                    onClick={getVendorListData}
                  >
                    Search
                  </button>
                </div>
                <button
                  className="bg-black"
                  style={{ borderRadius: "5px", marginLeft: "5px" }}
                >
                  <img src={filterIcon} alt="filter" width={25} />
                </button>
              </div>
            </form>
          </div>
          <div className="status_dropdown">
            <label className="form-label">Status</label>
            <select
              type="text"
              className="form-select mb-3 status_selector"
              value={selectedValue}
              onChange={handleSelectChange}
            >
              <option value="">All</option>
              {statusList &&
                statusList.length > 0 &&
                statusList.map((item, i) => {
                  return (
                    <option value={item.name} key={`statusList-${i}`}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        <div className="action_buttons col-4">
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
      </div>
      <div className="card mx-3">
        <div className="table-responsive">
          <table
            className="table card-table table-vcenter text-nowrap datatable"
            style={{ overflow: "auto" }}
          >
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
                  <span>Email</span>
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
                  <span>Phone</span>
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
                  <span>Location</span>
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
                  <span>Joined On</span>
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
                  <span>Total Booking</span>
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
                </th>
              </tr>
            </thead>
            <tbody>
              {vendor && vendor.length > 0 ? (
                <>
                  {vendor.map((item, index) => {
                    let formattedDate = item.created_at;

                    // Create a Date object from the date string
                    let dateObject = new Date(formattedDate);

                    // Options for formatting the date
                    let options = {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    };

                    // Convert the date to the desired format
                    let formattedDateString = dateObject.toLocaleDateString(
                      "en-US",
                      options
                    );

                    // Replace slashes with hyphens in the formatted date string
                    formattedDateString = formattedDateString.replace(
                      /\//g,
                      "-"
                    );

                    console.log(formattedDateString);

                    return (
                      <tr>
                        {console.log("item-vendor-list", vendor)}
                        <td>
                          <span className="text-secondary">
                            {item?.first_name}
                          </span>
                        </td>
                        <td>
                          <span className="text-secondary">{item?.email}</span>
                        </td>
                        <td>
                          <span className="text-secondary">{item?.mobile}</span>
                        </td>
                        <td>
                          <span className="text-secondary">
                            {item?.location}
                          </span>
                        </td>
                        <td>
                          <span className="text-secondary">
                            {formattedDateString}
                          </span>
                        </td>
                        <td>
                          <span className="text-secondary">
                            {item.total_booking}
                          </span>
                        </td>
                        <td>
                          <span className="text-secondary">
                            {item.is_active ? <>Active</> : <>InActive</>}
                          </span>
                        </td>
                        <td
                          style={{
                            display: "flex",
                            gap: "5px",
                            alignItems: "baseline",
                          }}
                        >
                          <Link
                            to={`/user-vendor/${item?.id}`}
                            className="btn btn-sm btn-info"
                            style={{
                              padding: "3px 6px",
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
                        <td>
                          <button
                            className="btn btn-dark "
                            style={{
                              fontSize: "12px",
                              padding: "3px 6px",
                              borderRadius: "4px",
                            }}
                          >
                            Add Service &nbsp;
                            <svg
                              width={16}
                              height={16}
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8 2.40039L8 13.6004"
                                stroke="white"
                                strokeWidth={2}
                                strokeLinecap="round"
                              />
                              <path
                                d="M2.3999 8H13.5999"
                                stroke="white"
                                strokeWidth={2}
                                strokeLinecap="round"
                              />
                            </svg>
                          </button>
                        </td>
                        <td>
                          <svg
                            width={20}
                            height={20}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.83333 9.99967C5.83333 10.9201 5.08714 11.6663 4.16667 11.6663C3.24619 11.6663 2.5 10.9201 2.5 9.99967C2.5 9.0792 3.24619 8.33301 4.16667 8.33301C5.08714 8.33301 5.83333 9.0792 5.83333 9.99967Z"
                              fill="#2E3030"
                            />
                            <path
                              d="M11.6667 9.99967C11.6667 10.9201 10.9205 11.6663 10 11.6663C9.07952 11.6663 8.33333 10.9201 8.33333 9.99967C8.33333 9.0792 9.07952 8.33301 10 8.33301C10.9205 8.33301 11.6667 9.0792 11.6667 9.99967Z"
                              fill="#2E3030"
                            />
                            <path
                              d="M17.5 9.99967C17.5 10.9201 16.7538 11.6663 15.8333 11.6663C14.9129 11.6663 14.1667 10.9201 14.1667 9.99967C14.1667 9.0792 14.9129 8.33301 15.8333 8.33301C16.7538 8.33301 17.5 9.0792 17.5 9.99967Z"
                              fill="#2E3030"
                            />
                          </svg>
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <tr>
                  <td className="error">No Records Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* <div className="card-footer d-flex align-items-center">
         
          <ul className="pagination m-0 ms-auto">
            <li className="page-item disabled">
              <a
                className="page-link"
                href="#"
                tabIndex="-1"
                aria-disabled="true"
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
            <li className="page-item">
              <a className="page-link" href="#">
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
        </div> */}
      </div>
      ;
    </div>
  );
}
