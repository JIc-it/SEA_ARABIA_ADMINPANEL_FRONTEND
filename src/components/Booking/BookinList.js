import React, { useEffect, useState } from "react";
import HeaderTiles from "../Common/HeaderTiles";
import Footer from "../Common/Footer";
import Table from "../LeadManagementTable";
import SideBar from "../Common/SideBar";
import ListCards from "../ListCards";
import { getListDataInPagination } from "../../services/commonServices";
import { formatDate, removeBaseUrlFromPath } from "../../helpers";
import { getVendorList, getVendorStatus } from "../../services/leadMangement";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const BookinList = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [search, setSearch] = useState("");
  const [statusList, setStatusList] = useState([]);
  const [listPageUrl, setListPageUrl] = useState({
    next: null,
    previous: null,
  });
  const [isRefetch, setIsRefetch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleOpenOffcanvas = () => setShowOffcanvas(true);

  const handleCloseOffcanvas = () => setShowOffcanvas(false);

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const [listVendor, setListVendor] = useState([]);

  const getVendorListData = async () => {
    setIsLoading(true);
    getVendorList(search, selectedValue)
      .then((data) => {
        setIsLoading(false);
        setListPageUrl({ next: data.next, previous: data.previous });
        setListVendor(data?.results);
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
    getVendorListData();
  }, [selectedValue, isRefetch]);

  const handleExportData = () => {
    if (listVendor) {
      const header = [
        "NAME",
        "EMAIL",
        "PHONE",
        "LOCATION",
        "CREATED ON",
        "CREATED BY",
        "STATUS",
      ];
      const csvData = listVendor.map((elem) => {
        let formatedDate = formatDate(elem.created_at);
        return [
          elem.first_name,
          elem.email,
          elem.mobile,
          elem.location,
          elem.state?.state,
          formatedDate,
          elem.created_by,
          `${elem.status ? elem.status : "-"} `,
        ];
      });

      const csvContent = [header, ...csvData]
        .map((row) => row.join(","))
        .join("\n");
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Vendor-List.csv";
      a.click();
      window.URL.revokeObjectURL(url);
    }
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
          setListVendor(data?.results);
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error fetching  data:", error);
        });
  };

  return (
    <div>
      <div className="page" style={{ height: "100vh" }}>
        {/* Sidebar  */}
        {/* <SideBar /> */}
        {/* <!-- Navbar --> */}
        {/* <Header /> */}
        <div className="page-wrapper">
          <div className="page-body vendor-management-container-main">
            <div className="container-xl">
              <div className="row row-deck row-cards">
                <div className="col-12">
                  <ListCards
                    firstLabel={"Total Bookings"}
                    firstIcon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                      >
                        <path
                          d="M33.3335 17.0827C33.849 17.0827 34.3116 16.7663 34.4985 16.2859C34.6853 15.8054 34.5581 15.2596 34.1782 14.9113L24.1782 5.7446C23.8127 5.40964 23.2839 5.32225 22.8302 5.52186C22.3764 5.72146 22.0835 6.17033 22.0835 6.66604L22.0835 33.3327C22.0835 34.0231 22.6431 34.5827 23.3335 34.5827C24.0239 34.5827 24.5835 34.0231 24.5835 33.3327L24.5835 17.0827L33.3335 17.0827Z"
                          fill="white"
                        />
                        <path
                          opacity="0.5"
                          d="M6.66655 22.916L15.4165 22.916V6.66602C15.4165 5.97566 15.9762 5.41602 16.6665 5.41602C17.3569 5.41602 17.9165 5.97566 17.9165 6.66602V33.3327C17.9165 33.8284 17.6236 34.2773 17.1699 34.4769C16.7161 34.6765 16.1873 34.5891 15.8219 34.2541L5.8219 25.0875C5.44191 24.7391 5.31471 24.1933 5.50158 23.7129C5.68846 23.2325 6.15107 22.916 6.66655 22.916Z"
                          fill="white"
                        />
                      </svg>
                    }
                    firstCount={"198"}
                    secondLabel={"Today's New Bookings"}
                    secondIcon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                      >
                        <path
                          d="M33.3335 17.0827C33.849 17.0827 34.3116 16.7663 34.4985 16.2859C34.6853 15.8054 34.5581 15.2596 34.1782 14.9113L24.1782 5.7446C23.8127 5.40964 23.2839 5.32225 22.8302 5.52186C22.3764 5.72146 22.0835 6.17033 22.0835 6.66604L22.0835 33.3327C22.0835 34.0231 22.6431 34.5827 23.3335 34.5827C24.0239 34.5827 24.5835 34.0231 24.5835 33.3327L24.5835 17.0827L33.3335 17.0827Z"
                          fill="white"
                        />
                        <path
                          opacity="0.5"
                          d="M6.66655 22.916L15.4165 22.916V6.66602C15.4165 5.97566 15.9762 5.41602 16.6665 5.41602C17.3569 5.41602 17.9165 5.97566 17.9165 6.66602V33.3327C17.9165 33.8284 17.6236 34.2773 17.1699 34.4769C16.7161 34.6765 16.1873 34.5891 15.8219 34.2541L5.8219 25.0875C5.44191 24.7391 5.31471 24.1933 5.50158 23.7129C5.68846 23.2325 6.15107 22.916 6.66655 22.916Z"
                          fill="white"
                        />
                      </svg>
                    }
                    secondCount={"198"}
                    thirdLabel={"Total Confirmed Bookings"}
                    thirdIcon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                      >
                        <path
                          opacity="0.5"
                          d="M12.075 3.33398H27.925C29.8564 3.33398 30.8222 3.33398 31.601 3.605C33.078 4.11891 34.2375 5.31263 34.7367 6.83309C35 7.6349 35 8.62907 35 10.6174V33.9576C35 35.388 33.3583 36.147 32.3198 35.1967C31.7097 34.6384 30.7903 34.6384 30.1802 35.1967L29.375 35.9334C28.3057 36.9119 26.6943 36.9119 25.625 35.9334C24.5557 34.9549 22.9443 34.9549 21.875 35.9334C20.8057 36.9119 19.1943 36.9119 18.125 35.9334C17.0557 34.9549 15.4443 34.9549 14.375 35.9334C13.3057 36.9119 11.6943 36.9119 10.625 35.9334L9.81984 35.1967C9.20971 34.6384 8.29029 34.6384 7.68016 35.1967C6.64166 36.147 5 35.388 5 33.9576V10.6174C5 8.62907 5 7.6349 5.26326 6.83309C5.76247 5.31263 6.92203 4.11891 8.39898 3.605C9.17785 3.33398 10.1436 3.33398 12.075 3.33398Z"
                          fill="white"
                        />
                        <path
                          d="M25.0991 14.1665C25.5589 13.6516 25.5141 12.8614 24.9992 12.4016C24.4842 11.9418 23.694 11.9865 23.2342 12.5015L18.2143 18.1238L16.7658 16.5015C16.306 15.9865 15.5158 15.9418 15.0008 16.4016C14.4859 16.8614 14.4411 17.6516 14.9009 18.1665L17.2819 20.8332C17.519 21.0988 17.8582 21.2507 18.2143 21.2507C18.5704 21.2507 18.9096 21.0988 19.1467 20.8332L25.0991 14.1665Z"
                          fill="white"
                        />
                        <path
                          d="M12.5 24.584C11.8096 24.584 11.25 25.1436 11.25 25.834C11.25 26.5244 11.8096 27.084 12.5 27.084H27.5C28.1904 27.084 28.75 26.5244 28.75 25.834C28.75 25.1436 28.1904 24.584 27.5 24.584H12.5Z"
                          fill="white"
                        />
                      </svg>
                    }
                    thirdCount={"198"}
                    fourthLabel={"Total Cancelled Bookings"}
                    fourthIcon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                      >
                        <path
                          opacity="0.5"
                          d="M10.5556 3.33398H29.4444C29.9604 3.33398 30.2183 3.33398 30.4358 3.35395C32.853 3.57583 34.7695 5.58656 34.981 8.12267C35 8.35084 35 8.62148 35 9.16276V33.7669C35 35.2212 33.2355 35.8383 32.4038 34.6749C31.8269 33.8678 30.6731 33.8678 30.0962 34.6749L29.375 35.6837C28.4375 36.9952 26.5625 36.9952 25.625 35.6837C24.6875 34.3722 22.8125 34.3722 21.875 35.6837C20.9375 36.9952 19.0625 36.9952 18.125 35.6837C17.1875 34.3722 15.3125 34.3722 14.375 35.6837C13.4375 36.9952 11.5625 36.9952 10.625 35.6837L9.90385 34.6749C9.32692 33.8678 8.17308 33.8678 7.59615 34.6749C6.76451 35.8383 5 35.2212 5 33.7669V9.16276C5 8.62148 5 8.35084 5.01903 8.12267C5.23051 5.58656 7.14699 3.57583 9.56422 3.35395C9.78169 3.33398 10.0396 3.33398 10.5556 3.33398Z"
                          fill="white"
                        />
                        <path
                          d="M17.5506 12.4501C17.0624 11.9619 16.271 11.9619 15.7828 12.4501C15.2947 12.9383 15.2947 13.7297 15.7828 14.2179L18.2323 16.6673L15.7828 19.1168C15.2947 19.6049 15.2947 20.3964 15.7828 20.8845C16.271 21.3727 17.0625 21.3727 17.5506 20.8845L20 18.4351L22.4495 20.8845C22.9376 21.3727 23.7291 21.3727 24.2172 20.8845C24.7054 20.3964 24.7054 19.6049 24.2172 19.1167L21.7678 16.6673L24.2172 14.2179C24.7054 13.7297 24.7054 12.9383 24.2172 12.4501C23.7291 11.962 22.9376 11.962 22.4495 12.4501L20 14.8996L17.5506 12.4501Z"
                          fill="white"
                        />
                        <path
                          d="M12.5 24.584C11.8096 24.584 11.25 25.1436 11.25 25.834C11.25 26.5243 11.8096 27.084 12.5 27.084H27.5C28.1904 27.084 28.75 26.5243 28.75 25.834C28.75 25.1436 28.1904 24.584 27.5 24.584H12.5Z"
                          fill="white"
                        />
                      </svg>
                    }
                    fourthCount={"198"}
                  />
                </div>

                {/* <Table /> */}
              </div>
              <div className="col-12 actions_menu my-2">
                <div className="action_menu_left col-8">
                  <div>
                    <form
                      action=""
                      method="post"
                      autocomplete="off"
                      style={{ display: "flex" }}
                    >
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
                        className="btn  filter-button  "
                        style={{ borderRadius: "6px", marginLeft: "10px" }}
                        onClick={handleOpen}
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
                    </form>
                  </div>
                </div>
                <div className="action_buttons col-4">
                  <button
                    className="btn btn-outline"
                    style={{ borderRadius: "6px" }}
                    onClick={handleExportData}
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
                  <button
                    onClick={handleOpenOffcanvas}
                    className="btn btn-info vendor_button"
                    style={{ borderRadius: "6px" }}
                    type="button"
                  >
                    Add Booking &nbsp;
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
              <div className="card">
                <div className="table-responsive">
                  <table className="table card-table table-vcenter text-nowrap datatable">
                    <thead>
                      <tr>
                        <th className="w-1">
                          <span>Name</span>
                        </th>
                        <th>
                          <span>User Type</span>
                        </th>
                        <th>
                          {" "}
                          <span>Date & Time</span>
                        </th>
                        <th>
                          <span>Location</span>
                        </th>
                        <th>
                          <span>Phone</span>
                        </th>
                        <th>
                          <span>Email</span>
                        </th>
                        <th>
                          <span>Service</span>
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
                          <tr>
                            <td>
                              <span className="text-secondary">
                                Shaheel Arham
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">Registered</span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                08 OCT, 2022 , 08:20 AM
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">Kuwait</span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                +97455682545
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                shaheel098@gmail.com{" "}
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                Hot Air Balloon
                              </span>
                            </td>
                            <td>
                              <span
                                className="badge  text-blue-fg confirm-button"
                                style={{
                                  width: "100px",
                                  padding: "7px 9px 5px 9px ",
                                  borderRadius: "4px",
                                  //   backgroundColor: "#5A9CD9",
                                }}
                              >
                                Confirmed
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
                                // to={"/onboard"}
                                className="btn btn-sm btn-info"
                                style={{
                                  padding: "7px 10px 5px 10px",
                                  borderRadius: "4px",
                                  borderRadius:
                                    "var(--roundness-round-inside, 6px)",
                                  background: "#187AF7",

                                  /* Shadow/XSM */
                                  boxSShadow:
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
                          <tr>
                            <td>
                              <span className="text-secondary">
                                Shaheel Arham
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">Registered</span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                08 OCT, 2022 , 08:20 AM
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">Kuwait</span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                +97455682545
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                shaheel098@gmail.com{" "}
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                Hot Air Balloon
                              </span>
                            </td>
                            <td>
                              <span
                                className="badge  text-blue-fg cancel-button"
                                style={{
                                  width: "100px",
                                  padding: "7px 9px 5px 9px ",
                                  borderRadius: "4px",
                                  //   backgroundColor: "#5A9CD9",
                                }}
                              >
                                Failed
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
                                // to={"/onboard"}
                                className="btn btn-sm btn-info"
                                style={{
                                  padding: "7px 10px 5px 10px",
                                  borderRadius: "4px",
                                  borderRadius:
                                    "var(--roundness-round-inside, 6px)",
                                  background: "#187AF7",

                                  /* Shadow/XSM */
                                  boxSShadow:
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
                          <tr>
                            <td>
                              <span className="text-secondary">
                                Shaheel Arham
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">Registered</span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                08 OCT, 2022 , 08:20 AM
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">Kuwait</span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                +97455682545
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                shaheel098@gmail.com{" "}
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                Hot Air Balloon
                              </span>
                            </td>
                            <td>
                              <span
                                className="badge  text-blue-fg warning-button"
                                style={{
                                  width: "100px",
                                  padding: "7px 9px 5px 9px ",
                                  borderRadius: "4px",
                                  //   backgroundColor: "#5A9CD9",
                                }}
                              >
                                Opened
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
                                // to={"/onboard"}
                                className="btn btn-sm btn-info"
                                style={{
                                  padding: "7px 10px 5px 10px",
                                  borderRadius: "4px",
                                  borderRadius:
                                    "var(--roundness-round-inside, 6px)",
                                  background: "#187AF7",

                                  /* Shadow/XSM */
                                  boxSShadow:
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
                      className={`page-item  ${!listPageUrl.previous && "disabled"
                        }`}
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

                    <li
                      className={`page-item  ${!listPageUrl.next && "disabled"
                        }`}
                    >
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
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                    Text in a modal
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                  </Typography> */}
                  <div class="frame-427319784">
                    <div class="components-selection-item">
                      <div class="frame-427319782">
                        <div class="frame-427319783">
                          <div class="category">Category</div>
                          <div class="div">:</div>
                        </div>
                        <div class="yacht-boat-heli-tour">Yacht, Boat, Heli Tour</div>
                      </div>
                      <div class="icon-wrapper">
                        <div class="width-change-size-here">
                          <div class="ignore"></div>
                          <div class="ignore"></div>
                        </div>
                        <div class="icon-wrapper-h">
                          <div class="height-change-size-here">
                            <div class="ignore"></div>
                            <div class="ignore"></div>
                          </div>
                          <svg
                            class="icon-wrapper2"
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_4335_44256)">
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M8.65833 1.34181C8.68743 1.37084 8.71052 1.40532 8.72628 1.44329C8.74203 1.48125 8.75014 1.52195 8.75014 1.56306C8.75014 1.60416 8.74203 1.64486 8.72628 1.68283C8.71052 1.7208 8.68743 1.75528 8.65833 1.78431L1.78333 8.65931C1.72465 8.71799 1.64507 8.75095 1.56208 8.75095C1.4791 8.75095 1.39951 8.71799 1.34083 8.65931C1.28215 8.60063 1.24919 8.52104 1.24919 8.43806C1.24919 8.35507 1.28215 8.27549 1.34083 8.21681L8.21583 1.34181C8.24486 1.31271 8.27935 1.28962 8.31731 1.27386C8.35528 1.25811 8.39598 1.25 8.43708 1.25C8.47819 1.25 8.51889 1.25811 8.55685 1.27386C8.59482 1.28962 8.6293 1.31271 8.65833 1.34181Z"
                                fill="#212529"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M1.34083 1.34181C1.31173 1.37084 1.28864 1.40532 1.27289 1.44329C1.25713 1.48125 1.24902 1.52195 1.24902 1.56306C1.24902 1.60416 1.25713 1.64486 1.27289 1.68283C1.28864 1.7208 1.31173 1.75528 1.34083 1.78431L8.21583 8.65931C8.27451 8.71799 8.3541 8.75095 8.43708 8.75095C8.52007 8.75095 8.59965 8.71799 8.65833 8.65931C8.71701 8.60063 8.74998 8.52104 8.74998 8.43806C8.74998 8.35507 8.71701 8.27549 8.65833 8.21681L1.78333 1.34181C1.7543 1.31271 1.71982 1.28962 1.68185 1.27386C1.64389 1.25811 1.60319 1.25 1.56208 1.25C1.52098 1.25 1.48028 1.25811 1.44231 1.27386C1.40435 1.28962 1.36986 1.31271 1.34083 1.34181Z"
                                fill="#212529"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M8.65833 1.34181C8.68743 1.37084 8.71052 1.40532 8.72628 1.44329C8.74203 1.48125 8.75014 1.52195 8.75014 1.56306C8.75014 1.60416 8.74203 1.64486 8.72628 1.68283C8.71052 1.7208 8.68743 1.75528 8.65833 1.78431L1.78333 8.65931C1.72465 8.71799 1.64507 8.75095 1.56208 8.75095C1.4791 8.75095 1.39951 8.71799 1.34083 8.65931C1.28215 8.60063 1.24919 8.52104 1.24919 8.43806C1.24919 8.35507 1.28215 8.27549 1.34083 8.21681L8.21583 1.34181C8.24486 1.31271 8.27935 1.28962 8.31731 1.27386C8.35528 1.25811 8.39598 1.25 8.43708 1.25C8.47819 1.25 8.51889 1.25811 8.55685 1.27386C8.59482 1.28962 8.6293 1.31271 8.65833 1.34181Z"
                                stroke="#212529"
                                stroke-width="0.8"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M1.34083 1.34181C1.31173 1.37084 1.28864 1.40532 1.27289 1.44329C1.25713 1.48125 1.24902 1.52195 1.24902 1.56306C1.24902 1.60416 1.25713 1.64486 1.27289 1.68283C1.28864 1.7208 1.31173 1.75528 1.34083 1.78431L8.21583 8.65931C8.27451 8.71799 8.3541 8.75095 8.43708 8.75095C8.52007 8.75095 8.59965 8.71799 8.65833 8.65931C8.71701 8.60063 8.74998 8.52104 8.74998 8.43806C8.74998 8.35507 8.71701 8.27549 8.65833 8.21681L1.78333 1.34181C1.7543 1.31271 1.71982 1.28962 1.68185 1.27386C1.64389 1.25811 1.60319 1.25 1.56208 1.25C1.52098 1.25 1.48028 1.25811 1.44231 1.27386C1.40435 1.28962 1.36986 1.31271 1.34083 1.34181Z"
                                stroke="#212529"
                                stroke-width="0.8"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_4335_44256">
                                <rect width="10" height="10" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div class="components-selection-item">
                      <div class="frame-427319782">
                        <div class="frame-427319783">
                          <div class="vendor">Vendor</div>
                          <div class="div">:</div>
                        </div>
                        <div class="salma-international-uber-marine-company-ghanayem-el-khair">
                          Salma international, Uber Marine Company, Ghanayem El-Khair
                        </div>
                      </div>
                      <div class="icon-wrapper">
                        <div class="width-change-size-here">
                          <div class="ignore"></div>
                          <div class="ignore"></div>
                        </div>
                        <div class="icon-wrapper-h">
                          <div class="height-change-size-here">
                            <div class="ignore"></div>
                            <div class="ignore"></div>
                          </div>
                          <svg
                            class="icon-wrapper3"
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_4335_44272)">
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M8.65833 1.34181C8.68743 1.37084 8.71052 1.40532 8.72628 1.44329C8.74203 1.48125 8.75014 1.52195 8.75014 1.56306C8.75014 1.60416 8.74203 1.64486 8.72628 1.68283C8.71052 1.7208 8.68743 1.75528 8.65833 1.78431L1.78333 8.65931C1.72465 8.71799 1.64507 8.75095 1.56208 8.75095C1.4791 8.75095 1.39951 8.71799 1.34083 8.65931C1.28215 8.60063 1.24919 8.52104 1.24919 8.43806C1.24919 8.35507 1.28215 8.27549 1.34083 8.21681L8.21583 1.34181C8.24486 1.31271 8.27935 1.28962 8.31731 1.27386C8.35528 1.25811 8.39598 1.25 8.43708 1.25C8.47819 1.25 8.51889 1.25811 8.55685 1.27386C8.59482 1.28962 8.6293 1.31271 8.65833 1.34181Z"
                                fill="#212529"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M1.34083 1.34181C1.31173 1.37084 1.28864 1.40532 1.27289 1.44329C1.25713 1.48125 1.24902 1.52195 1.24902 1.56306C1.24902 1.60416 1.25713 1.64486 1.27289 1.68283C1.28864 1.7208 1.31173 1.75528 1.34083 1.78431L8.21583 8.65931C8.27451 8.71799 8.3541 8.75095 8.43708 8.75095C8.52007 8.75095 8.59965 8.71799 8.65833 8.65931C8.71701 8.60063 8.74998 8.52104 8.74998 8.43806C8.74998 8.35507 8.71701 8.27549 8.65833 8.21681L1.78333 1.34181C1.7543 1.31271 1.71982 1.28962 1.68185 1.27386C1.64389 1.25811 1.60319 1.25 1.56208 1.25C1.52098 1.25 1.48028 1.25811 1.44231 1.27386C1.40435 1.28962 1.36986 1.31271 1.34083 1.34181Z"
                                fill="#212529"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M8.65833 1.34181C8.68743 1.37084 8.71052 1.40532 8.72628 1.44329C8.74203 1.48125 8.75014 1.52195 8.75014 1.56306C8.75014 1.60416 8.74203 1.64486 8.72628 1.68283C8.71052 1.7208 8.68743 1.75528 8.65833 1.78431L1.78333 8.65931C1.72465 8.71799 1.64507 8.75095 1.56208 8.75095C1.4791 8.75095 1.39951 8.71799 1.34083 8.65931C1.28215 8.60063 1.24919 8.52104 1.24919 8.43806C1.24919 8.35507 1.28215 8.27549 1.34083 8.21681L8.21583 1.34181C8.24486 1.31271 8.27935 1.28962 8.31731 1.27386C8.35528 1.25811 8.39598 1.25 8.43708 1.25C8.47819 1.25 8.51889 1.25811 8.55685 1.27386C8.59482 1.28962 8.6293 1.31271 8.65833 1.34181Z"
                                stroke="#212529"
                                stroke-width="0.8"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M1.34083 1.34181C1.31173 1.37084 1.28864 1.40532 1.27289 1.44329C1.25713 1.48125 1.24902 1.52195 1.24902 1.56306C1.24902 1.60416 1.25713 1.64486 1.27289 1.68283C1.28864 1.7208 1.31173 1.75528 1.34083 1.78431L8.21583 8.65931C8.27451 8.71799 8.3541 8.75095 8.43708 8.75095C8.52007 8.75095 8.59965 8.71799 8.65833 8.65931C8.71701 8.60063 8.74998 8.52104 8.74998 8.43806C8.74998 8.35507 8.71701 8.27549 8.65833 8.21681L1.78333 1.34181C1.7543 1.31271 1.71982 1.28962 1.68185 1.27386C1.64389 1.25811 1.60319 1.25 1.56208 1.25C1.52098 1.25 1.48028 1.25811 1.44231 1.27386C1.40435 1.28962 1.36986 1.31271 1.34083 1.34181Z"
                                stroke="#212529"
                                stroke-width="0.8"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_4335_44272">
                                <rect width="10" height="10" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div class="components-selection-item">
                      <div class="frame-427319782">
                        <div class="frame-427319783">
                          <div class="status">Status</div>
                          <div class="div">:</div>
                        </div>
                        <div class="completed-unsuccessful">Completed, Unsuccessful</div>
                      </div>
                      <div class="icon-wrapper">
                        <div class="width-change-size-here">
                          <div class="ignore"></div>
                          <div class="ignore"></div>
                        </div>
                        <div class="icon-wrapper-h">
                          <div class="height-change-size-here">
                            <div class="ignore"></div>
                            <div class="ignore"></div>
                          </div>
                          <svg
                            class="icon-wrapper4"
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_4335_44288)">
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M8.65833 1.34181C8.68743 1.37084 8.71052 1.40532 8.72628 1.44329C8.74203 1.48125 8.75014 1.52195 8.75014 1.56306C8.75014 1.60416 8.74203 1.64486 8.72628 1.68283C8.71052 1.7208 8.68743 1.75528 8.65833 1.78431L1.78333 8.65931C1.72465 8.71799 1.64507 8.75095 1.56208 8.75095C1.4791 8.75095 1.39951 8.71799 1.34083 8.65931C1.28215 8.60063 1.24919 8.52104 1.24919 8.43806C1.24919 8.35507 1.28215 8.27549 1.34083 8.21681L8.21583 1.34181C8.24486 1.31271 8.27935 1.28962 8.31731 1.27386C8.35528 1.25811 8.39598 1.25 8.43708 1.25C8.47819 1.25 8.51889 1.25811 8.55685 1.27386C8.59482 1.28962 8.6293 1.31271 8.65833 1.34181Z"
                                fill="#212529"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M1.34083 1.34181C1.31173 1.37084 1.28864 1.40532 1.27289 1.44329C1.25713 1.48125 1.24902 1.52195 1.24902 1.56306C1.24902 1.60416 1.25713 1.64486 1.27289 1.68283C1.28864 1.7208 1.31173 1.75528 1.34083 1.78431L8.21583 8.65931C8.27451 8.71799 8.3541 8.75095 8.43708 8.75095C8.52007 8.75095 8.59965 8.71799 8.65833 8.65931C8.71701 8.60063 8.74998 8.52104 8.74998 8.43806C8.74998 8.35507 8.71701 8.27549 8.65833 8.21681L1.78333 1.34181C1.7543 1.31271 1.71982 1.28962 1.68185 1.27386C1.64389 1.25811 1.60319 1.25 1.56208 1.25C1.52098 1.25 1.48028 1.25811 1.44231 1.27386C1.40435 1.28962 1.36986 1.31271 1.34083 1.34181Z"
                                fill="#212529"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M8.65833 1.34181C8.68743 1.37084 8.71052 1.40532 8.72628 1.44329C8.74203 1.48125 8.75014 1.52195 8.75014 1.56306C8.75014 1.60416 8.74203 1.64486 8.72628 1.68283C8.71052 1.7208 8.68743 1.75528 8.65833 1.78431L1.78333 8.65931C1.72465 8.71799 1.64507 8.75095 1.56208 8.75095C1.4791 8.75095 1.39951 8.71799 1.34083 8.65931C1.28215 8.60063 1.24919 8.52104 1.24919 8.43806C1.24919 8.35507 1.28215 8.27549 1.34083 8.21681L8.21583 1.34181C8.24486 1.31271 8.27935 1.28962 8.31731 1.27386C8.35528 1.25811 8.39598 1.25 8.43708 1.25C8.47819 1.25 8.51889 1.25811 8.55685 1.27386C8.59482 1.28962 8.6293 1.31271 8.65833 1.34181Z"
                                stroke="#212529"
                                stroke-width="0.8"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M1.34083 1.34181C1.31173 1.37084 1.28864 1.40532 1.27289 1.44329C1.25713 1.48125 1.24902 1.52195 1.24902 1.56306C1.24902 1.60416 1.25713 1.64486 1.27289 1.68283C1.28864 1.7208 1.31173 1.75528 1.34083 1.78431L8.21583 8.65931C8.27451 8.71799 8.3541 8.75095 8.43708 8.75095C8.52007 8.75095 8.59965 8.71799 8.65833 8.65931C8.71701 8.60063 8.74998 8.52104 8.74998 8.43806C8.74998 8.35507 8.71701 8.27549 8.65833 8.21681L1.78333 1.34181C1.7543 1.31271 1.71982 1.28962 1.68185 1.27386C1.64389 1.25811 1.60319 1.25 1.56208 1.25C1.52098 1.25 1.48028 1.25811 1.44231 1.27386C1.40435 1.28962 1.36986 1.31271 1.34083 1.34181Z"
                                stroke="#212529"
                                stroke-width="0.8"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_4335_44288">
                                <rect width="10" height="10" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br /><br />
                  <div class="d-flex align-items-start">
                    <div class="frame-427319790">
                      <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <small>Service</small>
                        <button class="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Category</button>
                        <button class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Vendor</button>
                        <small>Customer</small>
                        <button class="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Customer</button>
                        <button class="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Customer Type</button>
                        <small>Booking</small>
                        <button class="nav-link" id="v-pills-status-tab" data-bs-toggle="pill" data-bs-target="#v-pills-status" type="button" role="tab" aria-controls="v-pills-status" aria-selected="false">Status</button>
                        <small>Date</small>
                        <button class="nav-link" id="v-pills-creationDate-tab" data-bs-toggle="pill" data-bs-target="#v-pills-creationDate" type="button" role="tab" aria-controls="v-pills-creationDate" aria-selected="false">Creation Date</button>
                        <button class="nav-link" id="v-pills-commencementDate-tab" data-bs-toggle="pill" data-bs-target="#v-pills-commencementDate" type="button" role="tab" aria-controls="v-pills-commencementDate" aria-selected="false">Commencement Date</button>
                      </div>
                    </div>


                    <div class="tab-content" id="v-pills-tabContent" style={{ position: "relative", left: 20 }}>
                      <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                        <h4>Category</h4>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="search"
                          style={{ width: 320 }}
                        />
                        <br />
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="Boat" style={{ width: 20, height: 20 }} />
                          <label class="form-check-label" for="Boat">
                            Boat
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="Boat" style={{ width: 20, height: 20 }} />
                          <label class="form-check-label" for="Boat">
                            Yatch
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="Boat" style={{ width: 20, height: 20 }} />
                          <label class="form-check-label" for="Boat">
                            JAt Ski
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="Boat" style={{ width: 20, height: 20 }} />
                          <label class="form-check-label" for="Boat">
                            Hot air Balloon
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="Boat" style={{ width: 20, height: 20 }} />
                          <label class="form-check-label" for="Boat">
                            Desert Safari
                          </label>
                        </div>
                      </div>
                      <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                        <h4>Vendor</h4>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="search"
                          style={{ width: 320 }}
                        />
                        <br />
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="Boat" style={{ width: 20, height: 20 }} />
                          <label class="form-check-label" for="Boat">
                            Salma international
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="Boat" style={{ width: 20, height: 20 }} />
                          <label class="form-check-label" for="Boat">
                            Uber Marine Company
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="Boat" style={{ width: 20, height: 20 }} />
                          <label class="form-check-label" for="Boat">
                            Ghanayem El-Khair
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="Boat" style={{ width: 20, height: 20 }} />
                          <label class="form-check-label" for="Boat">
                            Flyworld
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="Boat" style={{ width: 20, height: 20 }} />
                          <label class="form-check-label" for="Boat">
                            Vanuatu
                          </label>
                        </div>
                      </div>
                      <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                        <h4>Customer</h4>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="search"
                        />
                        <br />
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="Boat" style={{ width: 20, height: 20 }} />
                          <label class="form-check-label" for="Boat">
                            Shaheel Arham
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="Boat" style={{ width: 20, height: 20 }} />
                          <label class="form-check-label" for="Boat">
                            Jane Cooper
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="Boat" style={{ width: 20, height: 20 }} />
                          <label class="form-check-label" for="Boat">
                            Esther Howard
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="Boat" style={{ width: 20, height: 20 }} />
                          <label class="form-check-label" for="Boat">
                            Cobi Keller
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="Boat" style={{ width: 20, height: 20 }} />
                          <label class="form-check-label" for="Boat">
                            Manolo Cannon
                          </label>
                        </div>
                      </div>
                      <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">Customer Type</div>
                      <div class="tab-pane fade" id="v-pills-status" role="tabpanel" aria-labelledby="v-pills-settings-tab">Status</div>
                      <div class="tab-pane fade" id="v-pills-creationDate" role="tabpanel" aria-labelledby="v-pills-settings-tab">Creation Date</div>
                      <div class="tab-pane fade" id="v-pills-commencementDate" role="tabpanel" aria-labelledby="v-pills-settings-tab">Commencement Date</div>
                    </div>
                  </div>
                </Box>
              </Modal>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default BookinList;
