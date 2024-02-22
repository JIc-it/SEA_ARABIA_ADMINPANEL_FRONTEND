import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import filterIcon from "../../static/img/Filter.png";
import CustomerCreate from "./CustomerCreate";
import * as XLSX from "xlsx";
import {
  customerExport,
  getCustomerSearch,
  getCustomerTotalCount,
} from "../../services/CustomerHandle";
import ReactPaginate from "react-paginate";
import { FormikProvider } from "../../Context/FormikContext";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Typography } from "@mui/material";
import { getMenuPermissions, removeBaseUrlFromPath } from "../../helpers";
import { toast } from "react-toastify";
import { getListDataInPagination } from "../../services/commonServices";
import { MainPageContext } from "../../Context/MainPageContext";
import WithPermission from "../HigherOrderComponents/PermissionCheck/WithPermission";
import CommonButtonForPermission from "../HigherOrderComponents/CommonButtonForPermission";
import {
  menuIdConstant,
  permissionCategory,
} from "../Permissions/PermissionConstants";
import UserFilterPopup from "./UserFilterPopup";
import Modal from "@mui/material/Modal";
import { Search } from "@mui/icons-material";
import { API_BASE_URL } from "../../services/authHandle";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "65%",
  height: "95vh",
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  p: 3,
  overflowY: "scroll",
};

export default function CustomerListing() {
  const [listDiscount, setListDiscount] = useState([]);
  const [search, setSearch] = useState("");
  const formikRef = useRef(null);
  const [totalPages, setTotalPages] = useState(0);
  const [isRefetch, setIsRefetch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [categorylist, setCategoryList] = useState([]);
  const [listPageUrl, setListPageUrl] = useState({
    next: null,
    previous: null,
  });
  const [active, setActive] = useState("Category");
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const { userPermissionList } = useContext(MainPageContext);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [isOpenFilterPopUp, setIsOpenFilterPopUp] = useState(false);

  const [filters, setFilters] = useState({
    OnBoardOn: { from: "", to: "" },
    sub_category: [],
  });

  // Check if either OnBoardOn has values or sub_category has items
  let checkfilterslength =
    filters.OnBoardOn.from.length > 0 && filters.OnBoardOn.to.length > 0;
  const [count, setCount] = useState();
  const [tableData, setTableData] = useState(false);

  useEffect(() => {
    getCustomerTotalCount()
      .then((data) => {
        // console.log("customer-Count", data);
        setCount(data);
        setTotalPages(Math.ceil(data?.user_count / itemsPerPage));
      })
      .catch((error) => {
        console.error("Error fetching Customer List data:", error);
      });
  }, []);

  useEffect(() => {
    getCustomerSearch({ search: search, status: "", role: "User" })
      .then((data) => {
        console.log("customer-list", data.results);
        setListDiscount(data.results);
        setListPageUrl({
          next: data.next,
          previous: data.previous,
        });
        setTableData(false);
      })
      .catch((error) => {
        toast.error(error.message);
        console.error("Error fetching Customer List data:", error);
      });
  }, [tableData, search]);

  // export
  const handleExportCustomerData = () => {
    customerExport()
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
          // Optionally, log success message
          // console.log("Exported Customer data successfully!");
        }, 0);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  };

  const getCustomerListData = async () => {
    setIsLoading(true);
    let locationName =
      filters.location &&
      filters.location.map((item, i) => {
        console.log("filter map", item);
        return item.name;
      });
    let commaSeparatedLocationsNames =
      (locationName && locationName.length > 0 && locationName.join(",")) || "";

    getCustomerSearch({
      location: commaSeparatedLocationsNames,
      onboard_date_before:
        (filters.OnBoardOn.to != "" && filters.OnBoardOn.to) || "",
      onboard_date_after:
        (filters.OnBoardOn.from != "" && filters.OnBoardOn.from) || "",
    })
      .then((data) => {
        setIsLoading(false);
        setListPageUrl({ next: data.next, previous: data.previous });
        // console.log("Search ---:", data.results);
        const customerList = data.results.filter(
          (item) => item.role === "User"
        );
        // console.log("search customer", customerList);
        setListDiscount(data?.results);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
        console.error("Error fetching  data:", error);
      });
  };
  useEffect(() => {
    getCustomerListData();

    const countNonEmpty =
      Object.values(filters.OnBoardOn).filter((value) => value !== "").length >
      0
        ? 1
        : 0;
    setFilterCriteriaCount(countNonEmpty);
  }, [isRefetch]);

  const handleOpenOffcanvas = () => setShowOffcanvas(true);
  const handleCloseOffcanvas = () => {
    setShowOffcanvas(false);
    if (formikRef.current) {
      formikRef.current.resetForm(); // Reset the formik form
    }
  };

  useEffect(() => {
    const data = { search: search, status: selectedValue, role: "User" };
    getCustomerSearch(data).then((res) => setListDiscount(res?.results));
  }, [selectedValue, isRefetch, search]);

  const AddCustomerWithPermission = WithPermission(
    CommonButtonForPermission,
    permissionCategory.create,
    menuIdConstant.users,
    handleOpenOffcanvas,
    "btn btn-info vendor_button",
    "Add Customer",
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

  const [filterCriteriaCount, setFilterCriteriaCount] = useState(0);

  const handleClearFilter = async () => {
    setIsRefetch(!isRefetch);
    // setCategoryList([
    //   { id: 1, name: "Active", status: false },
    //   { id: 2, name: "Inactive", status: false },
    // ]);
    setFilters({
      location: [],
      OnBoardOn: { from: "", to: "" },
    });
  };

  const handleOpenFilter = () => {
    setIsOpenFilterPopUp(!isOpenFilterPopUp);
    handleClearFilter();
  };

  const handleCloseFilter = () => {
    setIsOpenFilterPopUp(false);
  };
  const itemsPerPage = 10;
  const handlePageClick = (data) => {
    const newPage = data.selected;
    const newStartIndex = newPage * itemsPerPage;

    setIsLoading(true);
    // setCurrentPage(newPage);

    getListDataInPagination(
      `${API_BASE_URL}account/user-list?limit=${itemsPerPage}&offset=${newStartIndex}`
    )
      .then((data) => {
        setIsLoading(false);
        setListDiscount(data?.results);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <div style={{ height: "100vh" }}>
      <div className="col-12 actions_menu my-2 px-3">
        <div className="action_menu_left col-8">
          <div>
            {/* <form action=""  autocomplete="off"> */}
            <div>
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
                  {search && (
                    <button
                      className="btn search_button"
                      style={{ color: "#ffff", backgroundColor: "#2176FF" }}
                      onClick={() => {
                        setSearch(""); // Clear the search state
                        window.location.reload();
                      }}
                    >
                      Clear Search
                    </button>
                  )}
                </div>
                <button
                  onClick={handleOpenFilter}
                  className="bg-black"
                  style={{ borderRadius: "5px", marginLeft: "5px" }}
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
                {filterCriteriaCount > 0 && (
                  <span
                    className="py-1"
                    style={{
                      position: "relative",
                      right: "22px",
                      bottom: "11px",
                      color: "white",
                      fontSize: "10px",
                      textAlign: "center",
                      backgroundColor: "#2176FF",
                      width: "22px",
                      height: "22px",
                      borderRadius: "33px",
                    }}
                  >
                    {filterCriteriaCount}
                  </span>
                )}
                {filterCriteriaCount > 0 && (
                  <button
                    className=" px-3 py-2 btn"
                    style={{
                      color: "#ffff",
                      backgroundColor: "#2176FF",
                      position: "relative",
                      right: "18px",
                    }}
                    onClick={handleClearFilter}
                  >
                    Clear Filter
                  </button>
                )}
              </div>
            </div>
            {/* </form> */}
          </div>

          {/* Modal */}
          {isOpenFilterPopUp && (
            <UserFilterPopup
              checkFiltersLength={checkfilterslength}
              open={isOpenFilterPopUp}
              handleClose={handleCloseFilter}
              setIsLoading={setIsLoading}
              // setServiceList={setServiceList}
              setListPageUrl={setListPageUrl}
              setFilters={setFilters}
              filters={filters}
              isRefetch={isRefetch}
              setIsRefetch={setIsRefetch}
              setCategoryList={setCategoryList}
              categorylist={categorylist}
              handleClearFilter={handleClearFilter}
            />
          )}
        </div>
        <div className="action_buttons col-4">
          {userPermissionList &&
            getMenuPermissions(
              userPermissionList,
              menuIdConstant.users,
              permissionCategory.action
            ) && (
              <button
                className="btn btn-outline"
                style={{ borderRadius: "6px" }}
                onClick={handleExportCustomerData}
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
          <FormikProvider formik={formikRef.current}>
            <CustomerCreate
              show={showOffcanvas}
              close={handleCloseOffcanvas}
              showOffcanvas={showOffcanvas}
              setShowOffcanvas={setShowOffcanvas}
              tableData={setTableData}
              isRefetch={isRefetch}
              setIsRefetch={setIsRefetch}
            />
          </FormikProvider>
          <AddCustomerWithPermission />
        </div>
      </div>
      <div className="card mx-3">
        <div className="table-responsive">
          <table className="table card-table table-vcenter text-nowrap datatable">
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
                  <span>Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {listDiscount && listDiscount.length > 0 ? (
                <>
                  {listDiscount.map((item, index) => {
                    let formatedDate = item.created_at;
                    return (
                      <tr>
                        <td>
                          <span className="text-secondary">
                            {item.first_name}
                          </span>
                        </td>
                        <td>
                          <span className="text-secondary">{item.email}</span>
                        </td>
                        <td>
                          <span className="text-secondary">{item.mobile}</span>
                        </td>
                        <td>
                          <span className="text-secondary">
                            {item?.location}
                            {item?.profileextra?.location?.country}
                          </span>
                        </td>
                        <td>
                          <span className="text-secondary">
                            {item?.created_at}
                          </span>
                        </td>
                        <td>
                          <span className="text-secondary">
                            {item?.total_booking}
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
                            to={`/customers/${item.id}`}
                            className="btn btn-sm btn-info"
                            style={{ padding: "6px 10px", borderRadius: "4px" }}
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
            </tbody>
          </table>
        </div>
        {totalPages > 0 && (
          <div className="d-flex justify-content-center align-items-center mt-5">
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={totalPages}
              previousLabel="< Prev"
              marginPagesDisplayed={1}
              containerClassName="pagination"
              activeClassName="active"
              previousClassName="page-item previous"
              nextClassName="page-item next"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousLinkClassName="page-link"
              nextLinkClassName="page-link"
            />
          </div>
        )}
        {/* <div className="card-footer d-flex align-items-center">
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
        </div> */}
      </div>
    </div>
  );
}
