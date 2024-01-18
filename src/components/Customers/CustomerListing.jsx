import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import filterIcon from "../../static/img/Filter.png";
// import {
//   getCustomerSearch,
//   getCustomerlist,
// } from "../../services/CustomerHandle";

import CustomerCreate from "./CustomerCreate";

import {
  customerExport,
  getCustomerSearch,
  getCustomerlist,
} from "../../services/CustomerHandle";
import { formatDate, removeBaseUrlFromPath } from "../../helpers";
import { toast } from "react-toastify";
import { getListDataInPagination } from "../../services/commonServices";

export default function CustomerListing() {
  const [listDiscount, setListDiscount] = useState([]);
  const [search, setSearch] = useState("");
  const [isRefetch, setIsRefetch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [listPageUrl, setListPageUrl] = useState({
    next: null,
    previous: null,
  });

  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [exportedData, setExportedData] = useState();
  useEffect(() => {
    getCustomerSearch({ search: "", status: "", role: "User" })
      .then((data) => {
        // console.log("customer-list", data.results);
        setListDiscount(data.results);
      })
      .catch((error) => {
        toast.error(error.message);
        console.error("Error fetching Customer List data:", error);
      });
  }, []);

  // export
  const handleExportCustomerData = () => {
    customerExport()
      .then((response) => {
        // Assuming the response.data is the CSV content
        const csvData = response.data;

        // Convert the CSV data to a Blob
        const blob = new Blob([csvData], { type: "text/csv" });

        // Create a download link
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "exported_data.csv";

        // Append the link to the document
        document.body.appendChild(link);

        // Trigger the download
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);

        // console.log("Exported Customer data successfully!");
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  };

  const refreshPage = () => {
    // You can use window.location.reload() to refresh the page
    window.location.reload();
  };
  const getCustomerListData = async () => {
    setIsLoading(true);
    getCustomerSearch()
      .then((data) => {
        // console.log("Search ---:", data);
        if (data) {
          setIsLoading(false);
          setListPageUrl({ next: data.next, previous: data.previous });
          setListDiscount(data?.results);
        } else {
          refreshPage();
          setIsLoading(true);
          setSearch("");
          setListDiscount(data?.results);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
        console.error("Error fetching  data:", error);
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
            (item) => item.role === "User"
          );
          setListDiscount(filteredResults);
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error fetching  data:", error);
        });
  };
  const handleOpenOffcanvas = () => setShowOffcanvas(true);
  const handleCloseOffcanvas = () => setShowOffcanvas(false);

  useEffect(() => {
    const data = { search: search, status: selectedValue, role: "User" };
    getCustomerSearch(data).then((res) => setListDiscount(res?.results));
  }, [selectedValue, isRefetch, search]);

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
                    onClick={getCustomerListData}
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
          <CustomerCreate show={showOffcanvas} close={handleCloseOffcanvas} />
          <button
            onClick={handleOpenOffcanvas}
            className="btn btn-info vendor_button"
            style={{ borderRadius: "6px" }}
            type="button"
          >
            Add Customer &nbsp;
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
        <div className="card-footer d-flex align-items-center">
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
    </div>
  );
}
