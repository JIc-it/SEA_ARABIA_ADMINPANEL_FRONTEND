import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import filterIcon from "../../static/img/Filter.png";
import { getVendorStatus } from "../../services/leadMangement";
import { getCustomerSearch } from "../../services/CustomerHandle";
import VendorList from "../Initial_contact/VendorList";
import { formatDate, removeBaseUrlFromPath } from "../../helpers";
import { getListDataInPagination } from "../../services/commonServices";
import CircularProgress from "@mui/material/CircularProgress";

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

  // const [statusList, setStatusList] = useState([]);

  const getVendorListData = async () => {
    setIsLoading(true);
    getCustomerSearch(search, selectedValue, "Vendor")
      .then((data) => {
        console.log("Search ---:", data);
        setIsLoading(false);
        setListPageUrl({ next: data.next, previous: data.previous });
        const vendorList = data.results.filter(
          (item) => item.role === "Vendor"
        );
        setVendor(vendorList);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching  data:", error);
      });
  };

  useEffect(() => {
    getVendorListData(search, selectedValue);
  }, [selectedValue, isRefetch]);

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
          const vendorList = data.results.filter(
            (item) => item.role === "Vendor"
          );
          setVendor(vendorList);
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error fetching  data:", error);
        });
  };

  return (
    <div style={{ height: "100vh" }}>
      <div className="col-12 actions_menu  ">
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
        </div>
        <div className="action_buttons col-4">
          <a
            href="https://seaarabia.jicitsolution.com/account/onboard-vendors-list-export/"
            download="vendor_list.csv"
          >
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
          </a>
        </div>
      </div>
      <div className="card my-3 ">
        <div className="table-responsive">
          <table
            className="table card-table table-vcenter text-nowrap datatable"
            style={{ overflow: "auto" }}
          >
            <thead>
              <tr>
                <th className="w-1">
                  <span>Name</span>
                </th>
                <th>
                  <span>Email</span>
                </th>
                <th>
                  {" "}
                  <span>Phone</span>
                </th>
                <th>
                  <span>Location</span>
                </th>
                <th>
                  <span>Joined On</span>
                </th>
                <th>
                  <span>Total Booking</span>
                </th>
                <th>
                  <span>Status</span>
                </th>
                <th>
                  <span>Action</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {!isLoading ? (
                <>
                  {vendor && vendor.length > 0 ? (
                    <>
                      {vendor.map((item, index) => {
                        const [day, month, year] = item.created_at.split("-");
                        const formattedDate = new Date(
                          `${year}-${month}-${day}`
                        ).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        });
                        return (
                          <tr>
                            <td>
                              <span className="text-secondary">
                                {item.first_name}
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                {item.email}
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                {item.mobile}
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                {item.location}
                              </span>
                            </td>{" "}
                            <td>
                              <span className="text-secondary">
                                {formattedDate}
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                {item.total_booking}
                              </span>
                            </td>
                            <td>
                              <span
                                className={`text-secondary ${
                                  item.is_active
                                    ? "active-button"
                                    : "inActive-button "
                                }`}
                              >
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
                                onClick={()=>navigate(`/service-add/${item?.company_id}`)}
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
                          </tr>
                        );
                      })}
                    </>
                  ) : (
                    <tr>
                      <td className="error">No Records Found</td>
                    </tr>
                  )}
                </>
              ) : (
                <tr>
                  <td colSpan={"8"} align="center">
                    <CircularProgress />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="card-footer d-flex align-items-center">
          {/* <p className="m-0 text-secondary">
            Showing <span>1</span> to <span>8</span> of
            <span>16</span> entries
          </p> */}
          <ul className="pagination m-0 ms-auto">
            <li className={`page-item  ${!listPageUrl.previous && "disabled"}`}>
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
      ;
    </div>
  );
}
