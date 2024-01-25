import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import filterIcon from "../../static/img/Filter.png";
import { getVendorStatus } from "../../services/leadMangement";
import { getCustomerSearch } from "../../services/CustomerHandle";
import VendorList from "../Initial_contact/VendorList";
import {
  formatDate,
  getMenuPermissions,
  removeBaseUrlFromPath,
} from "../../helpers";
import { getListDataInPagination } from "../../services/commonServices";
import CircularProgress from "@mui/material/CircularProgress";
import VendorFilterPopup from "./VendorFilterPopup";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../services/authHandle";
import { MainPageContext } from "../../Context/MainPageContext";
import {
  menuIdConstant,
  permissionCategory,
} from "../Permissions/PermissionConstants";

export default function Listing() {
  const { userPermissionList } = useContext(MainPageContext);
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
  const [isOpenFilterPopUp, setIsOpenFilterPopUp] = useState(false);

  const handleOpenFilter = () => {
    setIsOpenFilterPopUp(!isOpenFilterPopUp);
  };

  const handleCloseFilter = () => {
    setIsOpenFilterPopUp(false);
  };

  const handleToggle = () => {
    setToggled(!isToggled);
  };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const getVendorListData = async () => {
    setIsLoading(true);
    getCustomerSearch({
      search: search,
      status: selectedValue,
      role: "Vendor",
      company_company_user: true,
    })
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
        // toast.error(error.message);
        console.error("Error fetching  data:", error);
      });
  };

  useEffect(() => {
    getVendorListData(search, selectedValue);
  }, [selectedValue, isRefetch, search]);

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
          // toast.error(error.message);
          console.error("Error fetching  data:", error);
        });
  };

  return (
    <div style={{ height: "100vh" }}>
      <div className="col-12 actions_menu  ">
        <div className="action_menu_left col-8">
          <div>
            <div style={{ display: "flex" }}>
              <div className="input-icon ">
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
                {/* <button
                    type="button"
                    className="btn search_button"
                    style={{ background: "#006875" }}
                    onClick={getVendorListData}
                  >
                    Search
                  </button> */}
              </div>
              <button
                className="btn  filter-button mx-2 "
                style={{ borderRadius: "6px" }}
                onClick={handleOpenFilter}
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M15.8332 2.5H4.1665C2.98799 2.5 2.39874 2.5 2.03262 2.8435C1.6665 3.187 1.6665 3.73985 1.6665 4.84555V5.4204C1.6665 6.28527 1.6665 6.7177 1.88284 7.07618C2.09917 7.43466 2.4944 7.65715 3.28485 8.10212L5.71237 9.46865C6.24272 9.7672 6.5079 9.91648 6.69776 10.0813C7.09316 10.4246 7.33657 10.8279 7.44687 11.3226C7.49984 11.5602 7.49984 11.8382 7.49984 12.3941L7.49984 14.6187C7.49984 15.3766 7.49984 15.7556 7.70977 16.0511C7.91971 16.3465 8.29257 16.4923 9.0383 16.7838C10.6038 17.3958 11.3866 17.7018 11.9432 17.3537C12.4998 17.0055 12.4998 16.2099 12.4998 14.6187V12.3941C12.4998 11.8382 12.4998 11.5602 12.5528 11.3226C12.6631 10.8279 12.9065 10.4246 13.3019 10.0813C13.4918 9.91648 13.757 9.7672 14.2873 9.46865L16.7148 8.10212C17.5053 7.65715 17.9005 7.43466 18.1168 7.07618C18.3332 6.7177 18.3332 6.28527 18.3332 5.4204V4.84555C18.3332 3.73985 18.3332 3.187 17.9671 2.8435C17.6009 2.5 17.0117 2.5 15.8332 2.5Z"
                    stroke="white"
                    stroke-width="1.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="action_buttons col-4">
          {userPermissionList &&
            getMenuPermissions(
              userPermissionList,
              menuIdConstant.users,
              permissionCategory.action
            ) && (
              <a
                href={`${API_BASE_URL}account/onboard-vendors-list-export/`}
                download="vendor_list.csv"
              >
                <button
                  className="btn btn-outline"
                  style={{ borderRadius: "6px" }}
                >
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
            )}
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
                                  item.company_status
                                    ? "active-button"
                                    : "inActive-button "
                                }`}
                              >
                                {item.company_status ? "Active" : "Inactive"}
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
                            {userPermissionList &&
                              getMenuPermissions(
                                userPermissionList,
                                menuIdConstant.serviceManagement,
                                permissionCategory.create
                              ) && (
                                <td>
                                  <button
                                    className={`btn ${
                                      item.company_status
                                        ? "btn-dark"
                                        : "service-disable-button"
                                    } btn-dark `}
                                    style={{
                                      fontSize: "12px",
                                      padding: "3px 6px",
                                      borderRadius: "4px",
                                    }}
                                    onClick={() =>
                                      item.company_status &&
                                      navigate(
                                        `/service-add/${item?.company_id}`
                                      )
                                    }
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
                              )}
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
      {isOpenFilterPopUp && (
        <VendorFilterPopup
          open={isOpenFilterPopUp}
          handleClose={handleCloseFilter}
        />
      )}
    </div>
  );
}
