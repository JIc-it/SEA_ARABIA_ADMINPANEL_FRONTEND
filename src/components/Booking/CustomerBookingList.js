import React, { useEffect, useState } from "react";

import Footer from "../Common/Footer";

import ListCards from "../ListCards";
import ReactPaginate from "react-paginate";
import { removeBaseUrlFromPath } from "../../helpers";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import { getBookingList, getBookingCount } from "../../services/booking";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from "xlsx";
import { API_BASE_URL } from "../../services/authHandle";
import { getListDataInPagination } from "../../services/commonServices";
import { customerExport } from "../../services/CustomerHandle";
import BookingFilter from "./BookingFilter";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CustomerBookingList = () => {
  const customerId = useParams()?.id;
  const navigate = useNavigate();
  console.log("cus id", customerId);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [search, setSearch] = useState("");
  const [statusList, setStatusList] = useState([]);
  const [listPageUrl, setListPageUrl] = useState({
    next: null,
    previous: null,
  });
  const [isRefetch, setIsRefetch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [bookingList, setBookingList] = useState([]);
  const [count, setCount] = useState({});
  const [selectedValue, setSelectedValue] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({
    category: [],
    vendor: [],
    customer: [],
    guest: [],
    customer_type: [],
    status: [],
    creation_date: {
      from: "",
      to: "",
    },
    commencement_date: {
      from: "",
      to: "",
    },
  });
  const itemsPerPage = 10;
  // new api
  useEffect(() => {
    const Pass = {
      id: customerId,
      search: search,
      status: selectedValue,
      // role: "User",
    };

    if (Pass) {
      getBookingList(Pass)
        .then((data) => {
          console.log("booking list data", data);

          const filteredBooking = data?.results?.filter(
            (booking) =>
              booking?.user?.id === customerId ||
              booking?.guest?.id === customerId
          );
          setListPageUrl({ next: data.next, previous: data.previous });
          // console.log("filtered bookk------", filteredBooking);
          setBookingList(filteredBooking);
          setTotalPages(Math.ceil(filteredBooking.length / itemsPerPage));
          console.log("filtered bookk------", bookingList);
          console.log("filtered bookk------", filteredBooking);
        })
        .catch((error) => {
          console.error("error fetching customer booking list", error);
        });
    }
  }, [customerId, search, selectedValue]);
  const offset = currentPage * itemsPerPage;
  const paginatedBookingList = bookingList.slice(offset, offset + itemsPerPage);

  console.log(
    "paginatedBookingList",
    paginatedBookingList,
    "currentpage",
    currentPage
  );

  const handlePageClick = (data) => {
    const newPage = data.selected;
    const newStartIndex = newPage * itemsPerPage;

    setIsLoading(true);
    // setCurrentPage(newPage);

    getListDataInPagination(
      `${API_BASE_URL}booking/bookings/admin?limit=${itemsPerPage}&offset=${newStartIndex}`
    )
      .then((data) => {
        const filteredBooking = data?.results?.filter(
          (booking) =>
            booking?.user?.id === customerId ||
            booking?.guest?.id === customerId
        );
        setIsLoading(false);
        setBookingList(filteredBooking);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  useEffect(() => {
    getBookingCount()
      .then((data) => {
        setIsLoading(false);
        setCount({
          total_booking: data?.total_booking,
          today_booking: data?.today_booking,
          total_confirmed_booking: data?.total_confirmed_booking,
          total_cancelled_booking: data?.total_cancelled_booking,
        });
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  }, []);

  const handleExportCustomerData = () => {
    customerExport()
      .then((response) => {
        console.log("reee", response);
        // Assuming the response.data is the CSV content
        const csvData = response;
        console.log("csv data--", csvData);

        // Convert the CSV data to a Blob
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
        // console.log("blob--", blob);

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
            (item) => item.user.id === customerId
          );
          setBookingList(filteredResults);
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error fetching  data:", error);
        });
  };
  const refreshPage = () => {
    // You can use window.location.reload() to refresh the page
    window.location.reload();
  };

  let checkfilterslength =
    filters.category.length > 0 ||
    filters.vendor.length > 0 ||
    filters.customer.length > 0 ||
    filters.guest.length > 0 ||
    filters.customer_type.length > 0 ||
    filters.status.length > 0 ||
    filters.creation_date.from !== "" ||
    filters.creation_date.to !== "" ||
    filters.commencement_date.from !== "" ||
    filters.commencement_date.to !== "";

  return (
    <div>
      <div className="page" style={{ height: "100vh" }}>
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
                    firstCount={count?.total_booking}
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
                    secondCount={count?.today_booking}
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
                    thirdCount={count?.total_confirmed_booking}
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
                    fourthCount={count?.total_cancelled_booking}
                  />
                </div>

                {/* <Table /> */}
              </div>
              <div className="col-12 actions_menu my-2">
                <div className="action_menu_left col-8">
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
                        <button
                          type="button"
                          className="btn search_button"
                          style={{ background: "#006875" }}
                          // onClick={getBookingSearchData}
                        >
                          Search
                        </button>
                      </div>
                      <button
                        className="btn  filter-button"
                        style={{
                          borderRadius: "5px",
                          marginLeft: "5px",
                          position: "relative",
                        }}
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
                        <span
                          className="py-1"
                          style={{
                            position: "absolute",
                            top: -12,
                            right: -10,
                            color: "white",
                            fontSize: "10px",
                            backgroundColor: "#2176FF",
                            width: "22px",
                            height: "22px",
                            borderRadius: "33px",
                          }}
                        >
                          {filters.category.length +
                            filters.vendor.length +
                            filters.customer.length +
                            filters.guest.length +
                            filters.customer_type.length +
                            filters.status.length +
                            (filters.creation_date.from !== "" &&
                            filters.creation_date.to !== ""
                              ? 2
                              : filters.creation_date.from !== ""
                              ? 1
                              : filters.creation_date.to !== ""
                              ? 1
                              : 0) +
                            (filters.commencement_date.from !== "" &&
                            filters.commencement_date.to !== ""
                              ? 2
                              : filters.commencement_date.from !== ""
                              ? 1
                              : filters.commencement_date.to !== ""
                              ? 1
                              : 0)}
                        </span>
                      </button>
                      {checkfilterslength && (
                        <button
                          className="mx-3 px-3 py-2 btn"
                          style={{ color: "#ffff", backgroundColor: "#2176FF" }}
                          onClick={() => {
                            if (checkfilterslength) {
                              window.location.reload();
                            }
                          }}
                        >
                          Clear Filter
                        </button>
                      )}
                    </div>
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
                </div>
              </div>
              <div className="d-flex justify-content-between mt-4 mb-4 ms-3  ">
                <div
                  style={{ cursor: "pointer", marginLeft: "-12px" }}
                  onClick={() => navigate(-1)}
                >
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
              <div className="card">
                <div className="table-responsive">
                  <table className="table card-table table-vcenter text-nowrap datatable">
                    <thead>
                      <tr>
                        <th className="w-1">
                          <span>Booking ID</span>
                        </th>
                        <th>
                          <span>Booking Item</span>
                        </th>
                        <th>
                          <span>Category</span>
                        </th>
                        <th>
                          <span>Vendor Name</span>
                        </th>
                        <th>
                          <span>Customer Name</span>
                        </th>
                        <th>
                          <span>Customer Type</span>
                        </th>
                        <th>
                          <span>Commencement Date</span>
                        </th>
                        <th>
                          <span>Creation Date</span>
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
                          {/* {bookingList &&
                            bookingList.length > 0 &&
                            bookingList.map((data) => ( */}
                          {paginatedBookingList &&
                            paginatedBookingList.length > 0 &&
                            paginatedBookingList.map((data) => (
                              <tr>
                                <td>
                                  {console.log("item --book", bookingList)}
                                  <span className="text-secondary">
                                    {data.booking_id}
                                  </span>
                                </td>
                                <td>
                                  <span className="text-secondary">
                                    {data.booking_item}
                                  </span>
                                </td>
                                <td>
                                  <span className="text-secondary">
                                    {data?.service?.category?.map(
                                      (items) => items.name
                                    )}
                                  </span>
                                </td>
                                <td>
                                  <span className="text-secondary">
                                    {data?.service?.company}
                                  </span>
                                </td>
                                <td>
                                  <span className="text-secondary">
                                    {data?.first_name}
                                  </span>
                                </td>
                                <td>
                                  <span className="text-secondary">
                                    {data?.user_type}
                                  </span>
                                </td>
                                <td>
                                  <span className="text-secondary">
                                    {new Date(
                                      data?.start_date
                                    ).toLocaleDateString("es-CL")}
                                  </span>
                                </td>
                                <td>
                                  <span className="text-secondary">
                                    {new Date(
                                      data?.created_at
                                    ).toLocaleDateString("es-CL")}
                                  </span>
                                </td>
                                <td>
                                  <span
                                    className="badge  text-blue-fg "
                                    style={{
                                      width: "100px",
                                      padding: "7px 9px 5px 9px ",
                                      borderRadius: "4px",
                                      background:
                                        data?.status === "Completed"
                                          ? "#13B370"
                                          : data?.status === "Unsuccessful"
                                          ? "#DC7932"
                                          : data?.status === "Cancelled"
                                          ? "#DE4E21"
                                          : "#2684FC",
                                    }}
                                  >
                                    {data?.status ? data?.status : "-"}
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
                                    to={`/booking-view/${data?.id}/`}
                                    className="btn btn-sm btn-info"
                                    style={{
                                      padding: "7px 10px 5px 10px",
                                      borderRadius: "4px",
                                      borderRadius:
                                        "var(--roundness-round-inside, 6px)",
                                      background: "#187AF7",
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
                            ))}
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
                  {bookingList.length === 0 && (
                    <div style={{ height: "5vh", marginTop: "50px" }}>
                      <p style={{ textAlign: "center", fontWeight: 550 }}>
                        No Record Found
                      </p>
                    </div>
                  )}
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
                </div>
              </div>
              {open && (
                <BookingFilter
                  open={open}
                  handleClose={handleClose}
                  setIsLoading={setIsLoading}
                  isLoading={isLoading}
                  setFilters={setFilters}
                  filters={filters}
                  setBookingList={setBookingList}
                  firstsetListPageUrl={setListPageUrl}
                  checkfilterslength={checkfilterslength}
                />
              )}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default CustomerBookingList;
