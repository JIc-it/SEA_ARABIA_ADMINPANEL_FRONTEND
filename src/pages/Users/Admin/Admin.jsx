import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import {
  getAdminSearch,
  getAdminTotalCount,
} from "../../../services/GuestHandle";
import CreateNewAdmin from "./CreateNewAdmin";

import { getMenuPermissions, removeBaseUrlFromPath } from "../../../helpers";
import { adminExport, getCustomerlist } from "../../../services/CustomerHandle";

import { getListDataInPagination } from "../../../services/commonServices";
import { MainPageContext } from "../../../Context/MainPageContext";
import WithPermission from "../../../components/HigherOrderComponents/PermissionCheck/WithPermission";
import CommonButtonForPermission from "../../../components/HigherOrderComponents/CommonButtonForPermission";
import {
  menuIdConstant,
  permissionCategory,
} from "../../../components/Permissions/PermissionConstants";
import { CircularProgress } from "@mui/material";

function Admin({ isRefetch, setIsRefetch }) {
  const { userPermissionList } = useContext(MainPageContext);

  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [admin, setAdmin] = useState();
  const handleOpenOffcanvas = () => setShowOffcanvas(true);
  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const [listPageUrl, setListPageUrl] = useState({
    next: null,
    previous: null,
  });
  // const [isRefetch, setIsRefetch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState();
  const [selectedValue, setSelectedValue] = useState("");
  const [tableData, setTableData] = useState(false);

  const [count, setCount] = useState();
  useEffect(() => {
    getAdminTotalCount()
      .then((data) => {
        // console.log("admin count", data);
        setCount(data);
      })
      .catch((error) => {
        console.error("Error fetching admin count data:", error);
      });
  }, []);

  useEffect(() => {
    const role = "Admin";
    getCustomerlist(role)
      .then((data) => {
        console.log("admin list ==", data?.results);
        setListPageUrl({
          next: data.next,
          previous: data.previous,
        });
        setAdmin(data.results);
        setTableData(false);
      })
      .catch((error) => {
        console.error("Error fetching Customer List data:", error);
      });
  }, [isRefetch, tableData]);
  const refreshPage = () => {
    // You can use window.location.reload() to refresh the page
    window.location.reload();
  };

  useEffect(() => {
    const data = { search: search, status: selectedValue, role: "Admin" };
    getAdminSearch(data).then((res) => setAdmin(res?.results));
  }, [selectedValue, isRefetch, search]);

  const handleExportAdminData = () => {
    adminExport()
      .then((response) => {
        // Assuming the response.data is the CSV content
        const csvData = response;
        console.log("csv data--", csvData);

        // Convert the CSV data to a Blob
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
        console.log("blob--", blob);

        // Parse the CSV data into an Excel workbook
        const workbook = XLSX.read(csvData, { type: "string" });
        // Display the workbook data or perform further processing
        console.log("Workbook:", workbook);

        // Create a download link
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "exported_data.csv";

        // Append the link to the document
        document.body.appendChild(link);

        // Trigger the download
        link.click();

        // Remove the link asynchronously after the download
        setTimeout(() => {
          document.body.removeChild(link);
        }, 0);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  };

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
            (item) => item.role === "Admin"
          );
          setAdmin(filteredResults);
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error fetching  data:", error);
        });
  };

  const AddSaleRepWithPermission = WithPermission(
    CommonButtonForPermission,
    permissionCategory.create,
    menuIdConstant.users,
    handleOpenOffcanvas,
    "btn btn-info vendor_button",
    "Create New Admin",
    { borderRadius: "6px" },
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
      <path d="M3 10H17" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  return (
    <div className="page" style={{ height: "100vh", top: 20 }}>
      <div className="container">
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
                      Total Admins
                    </div>
                    <div
                      className="text-secondary"
                      style={{ fontSize: "18px", fontWeight: "700" }}
                    >
                      {count?.admin_count}
                      {/* {totalGuestUser} */}
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
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                    />
                    {/* <button
                      type="button"
                      className="btn search_button"
                      style={{ background: "#006875" }}
                      onClick={getAdminData}
                    >
                      Search
                    </button> */}
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="action_buttons col-4">
            {userPermissionList &&
              getMenuPermissions(
                userPermissionList,
                menuIdConstant.users,
                permissionCategory.action
              ) && (
                <button
                  onClick={handleExportAdminData}
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
              )}
            <AddSaleRepWithPermission />
          </div>
          <CreateNewAdmin
            show={showOffcanvas}
            close={handleCloseOffcanvas}
            tableData={setTableData}
            isRefetch={isRefetch}
            setIsRefetch={setIsRefetch}
          />
        </div>
        <div className="card">
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
                    <span>Action</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {!isLoading ? (
                  <>
                    {admin && admin.length > 0 ? (
                      <>
                        {admin.map((item) => {
                          return (
                            <tr>
                              <td>
                                <span className="text-secondary">
                                  {item?.first_name} {item?.last_name}
                                </span>
                              </td>
                              <td>
                                <span className="text-secondary">
                                  {item?.email}
                                </span>
                              </td>
                              <td>
                                <span className="text-secondary">
                                  {" "}
                                  {item?.mobile}
                                </span>
                              </td>
                              <td>
                                <span className="text-secondary">
                                  {" "}
                                  {item?.location}
                                  {item?.profileextra?.location?.country}
                                </span>
                              </td>
                              <td
                                style={{
                                  display: "flex",
                                  gap: "10px",
                                  alignItems: "baseline",
                                }}
                              >
                                <Link
                                  to={`/admin/${item?.id}`}
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

export default Admin;
