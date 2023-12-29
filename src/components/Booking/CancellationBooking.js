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
import totalBooking from "../../static/img/total-booking.png"
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

const CancellationBooking = () => {

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
                    firstLabel={"All Cancellation Requests"}
                    firstIcon={
                      <svg
                        class="bold-duotone-arrows-transfer-vertical"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M33.3335 17.0847C33.849 17.0847 34.3116 16.7682 34.4985 16.2878C34.6853 15.8074 34.5581 15.2615 34.1782 14.9132L24.1782 5.74655C23.8127 5.41159 23.2839 5.32421 22.8302 5.52381C22.3764 5.72341 22.0835 6.17229 22.0835 6.66799L22.0835 33.3347C22.0835 34.025 22.6431 34.5847 23.3335 34.5847C24.0239 34.5847 24.5835 34.025 24.5835 33.3347L24.5835 17.0847L33.3335 17.0847Z"
                          fill="white"
                        />
                        <path
                          opacity="0.5"
                          d="M6.66655 22.918L15.4165 22.918V6.66797C15.4165 5.97761 15.9762 5.41797 16.6665 5.41797C17.3569 5.41797 17.9165 5.97761 17.9165 6.66797V33.3346C17.9165 33.8303 17.6236 34.2792 17.1699 34.4788C16.7161 34.6784 16.1873 34.591 15.8219 34.2561L5.8219 25.0894C5.44191 24.7411 5.31471 24.1952 5.50158 23.7148C5.68846 23.2344 6.15107 22.918 6.66655 22.918Z"
                          fill="white"
                        />
                      </svg>
                    }
                    firstCount={"198"}
                    secondLabel={"Pending Cancellation Requests"}
                    secondIcon={
                      <svg
                        class="bold-duotone-arrows-refresh-circle"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle opacity="0.5" cx="20.0002" cy="19.9987" r="16.6667" fill="white" />
                        <path
                          d="M12.2959 19.384H11.5459V19.384L12.2959 19.384ZM12.2959 20.9272L11.7345 21.4245C11.8697 21.5772 12.0614 21.6683 12.2653 21.6766C12.4692 21.6849 12.6677 21.6098 12.815 21.4686L12.2959 20.9272ZM15.5191 18.876C15.818 18.5893 15.828 18.1146 15.5414 17.8156C15.2547 17.5166 14.7799 17.5066 14.4809 17.7933L15.5191 18.876ZM10.5615 17.8374C10.2869 17.5273 9.81286 17.4985 9.50277 17.7732C9.19267 18.0478 9.16391 18.5218 9.43852 18.8319L10.5615 17.8374ZM25.2532 14.6773C25.5344 14.9813 26.009 14.9998 26.313 14.7185C26.6171 14.4372 26.6356 13.9627 26.3543 13.6587L25.2532 14.6773ZM20.0728 10.918C15.3691 10.918 11.5459 14.7028 11.5459 19.384H13.0459C13.0459 15.5423 16.1864 12.418 20.0728 12.418V10.918ZM11.5459 19.384L11.5459 20.9272H13.0459L13.0459 19.384L11.5459 19.384ZM12.815 21.4686L15.5191 18.876L14.4809 17.7933L11.7769 20.3859L12.815 21.4686ZM12.8574 20.43L10.5615 17.8374L9.43852 18.8319L11.7345 21.4245L12.8574 20.43ZM26.3543 13.6587C24.796 11.9742 22.5575 10.918 20.0728 10.918V12.418C22.1242 12.418 23.9683 13.2883 25.2532 14.6773L26.3543 13.6587Z"
                          fill="white"
                        />
                        <path
                          d="M27.6983 19.0742L28.259 18.5761C28.1235 18.4236 27.9318 18.3329 27.728 18.3248C27.5242 18.3167 27.3259 18.392 27.1788 18.5333L27.6983 19.0742ZM24.4808 21.1244C24.1821 21.4114 24.1725 21.8861 24.4594 22.1849C24.7463 22.4836 25.2211 22.4932 25.5198 22.2063L24.4808 21.1244ZM29.4396 22.1635C29.7147 22.4732 30.1888 22.5012 30.4985 22.2261C30.8081 21.9509 30.8361 21.4769 30.561 21.1672L29.4396 22.1635ZM14.7139 25.3504C14.4304 25.0483 13.9558 25.0333 13.6537 25.3167C13.3517 25.6002 13.3367 26.0748 13.6201 26.3768L14.7139 25.3504ZM19.8917 29.0835C24.6091 29.0835 28.4483 25.3013 28.4483 20.6174H26.9483C26.9483 24.4564 23.7972 27.5835 19.8917 27.5835V29.0835ZM28.4483 20.6174V19.0742H26.9483V20.6174H28.4483ZM27.1788 18.5333L24.4808 21.1244L25.5198 22.2063L28.2178 19.6151L27.1788 18.5333ZM27.1376 19.5723L29.4396 22.1635L30.561 21.1672L28.259 18.5761L27.1376 19.5723ZM13.6201 26.3768C15.1827 28.0418 17.4156 29.0835 19.8917 29.0835V27.5835C17.8441 27.5835 16.0027 26.7237 14.7139 25.3504L13.6201 26.3768Z"
                          fill="white"
                        />
                      </svg>
                    }
                    secondCount={"198"}
                    thirdLabel={"Cancellation By Vendor"}
                    thirdIcon={
                      <svg
                        class="bold-duotone-money-bill-cross"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.5"
                          d="M10.5556 3.33203H29.4444C29.9604 3.33203 30.2183 3.33203 30.4358 3.35199C32.853 3.57387 34.7695 5.58461 34.981 8.12072C35 8.34889 35 8.61953 35 9.16081V33.765C35 35.2192 33.2355 35.8363 32.4038 34.6729C31.8269 33.8659 30.6731 33.8659 30.0962 34.6729L29.375 35.6818C28.4375 36.9932 26.5625 36.9932 25.625 35.6818C24.6875 34.3703 22.8125 34.3703 21.875 35.6818C20.9375 36.9932 19.0625 36.9932 18.125 35.6818C17.1875 34.3703 15.3125 34.3703 14.375 35.6818C13.4375 36.9932 11.5625 36.9932 10.625 35.6818L9.90385 34.6729C9.32692 33.8659 8.17308 33.8659 7.59615 34.6729C6.76451 35.8363 5 35.2192 5 33.765V9.16081C5 8.61953 5 8.34889 5.01903 8.12072C5.23051 5.58461 7.14699 3.57387 9.56422 3.35199C9.78169 3.33203 10.0396 3.33203 10.5556 3.33203Z"
                          fill="white"
                        />
                        <path
                          d="M17.5506 12.4481C17.0624 11.96 16.271 11.96 15.7828 12.4481C15.2947 12.9363 15.2947 13.7278 15.7828 14.2159L18.2323 16.6654L15.7828 19.1148C15.2947 19.603 15.2947 20.3944 15.7828 20.8826C16.271 21.3707 17.0625 21.3707 17.5506 20.8826L20 18.4331L22.4495 20.8826C22.9376 21.3707 23.7291 21.3707 24.2172 20.8826C24.7054 20.3944 24.7054 19.6029 24.2172 19.1148L21.7678 16.6654L24.2172 14.2159C24.7054 13.7278 24.7054 12.9363 24.2172 12.4482C23.7291 11.96 22.9376 11.96 22.4495 12.4482L20 14.8976L17.5506 12.4481Z"
                          fill="white"
                        />
                        <path
                          d="M12.5 24.582C11.8096 24.582 11.25 25.1417 11.25 25.832C11.25 26.5224 11.8096 27.082 12.5 27.082H27.5C28.1904 27.082 28.75 26.5224 28.75 25.832C28.75 25.1417 28.1904 24.582 27.5 24.582H12.5Z"
                          fill="white"
                        />
                      </svg>
                    }
                    thirdCount={"198"}
                    fourthLabel={"Cancellation By Customer"}
                    fourthIcon={
                      <svg
                        class="bold-duotone-money-bill-cross"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.5"
                          d="M10.5556 3.33203H29.4444C29.9604 3.33203 30.2183 3.33203 30.4358 3.35199C32.853 3.57387 34.7695 5.58461 34.981 8.12072C35 8.34889 35 8.61953 35 9.16081V33.765C35 35.2192 33.2355 35.8363 32.4038 34.6729C31.8269 33.8659 30.6731 33.8659 30.0962 34.6729L29.375 35.6818C28.4375 36.9932 26.5625 36.9932 25.625 35.6818C24.6875 34.3703 22.8125 34.3703 21.875 35.6818C20.9375 36.9932 19.0625 36.9932 18.125 35.6818C17.1875 34.3703 15.3125 34.3703 14.375 35.6818C13.4375 36.9932 11.5625 36.9932 10.625 35.6818L9.90385 34.6729C9.32692 33.8659 8.17308 33.8659 7.59615 34.6729C6.76451 35.8363 5 35.2192 5 33.765V9.16081C5 8.61953 5 8.34889 5.01903 8.12072C5.23051 5.58461 7.14699 3.57387 9.56422 3.35199C9.78169 3.33203 10.0396 3.33203 10.5556 3.33203Z"
                          fill="white"
                        />
                        <path
                          d="M17.5506 12.4481C17.0624 11.96 16.271 11.96 15.7828 12.4481C15.2947 12.9363 15.2947 13.7278 15.7828 14.2159L18.2323 16.6654L15.7828 19.1148C15.2947 19.603 15.2947 20.3944 15.7828 20.8826C16.271 21.3707 17.0625 21.3707 17.5506 20.8826L20 18.4331L22.4495 20.8826C22.9376 21.3707 23.7291 21.3707 24.2172 20.8826C24.7054 20.3944 24.7054 19.6029 24.2172 19.1148L21.7678 16.6654L24.2172 14.2159C24.7054 13.7278 24.7054 12.9363 24.2172 12.4482C23.7291 11.96 22.9376 11.96 22.4495 12.4482L20 14.8976L17.5506 12.4481Z"
                          fill="white"
                        />
                        <path
                          d="M12.5 24.582C11.8096 24.582 11.25 25.1417 11.25 25.832C11.25 26.5224 11.8096 27.082 12.5 27.082H27.5C28.1904 27.082 28.75 26.5224 28.75 25.832C28.75 25.1417 28.1904 24.582 27.5 24.582H12.5Z"
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
                          {" "}
                          <span>Category</span>
                        </th>
                        <th>
                          <span>Booked By</span>
                        </th>
                        <th>
                          <span>Initiated By</span>
                        </th>
                        <th>
                          <span>Commencement date</span>
                        </th>
                        <th>
                          <span>Creation Date</span>
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
                                SS56DG2355D
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">Al Jalboot</span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                Hot Air Balloon
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">Shaheel Arham</span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                Customer
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                08 DEC, 2023{" "}
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                08 OCT, 2023
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
                                data-bs-toggle="modal" data-bs-target="#exampleModal"
                              >
                                View Request &nbsp;
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
                              {/* <button type="button" className="btn btn-sm btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Launch demo modal
                              </button> */}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="text-secondary">
                                SS56DG2355D
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">Al Jalboot</span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                Hot Air Balloon
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">Shaheel Arham</span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                Customer
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                08 DEC, 2023{" "}
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                08 OCT, 2023
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
                                View Request &nbsp;
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
                                SS56DG2355D
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">Al Jalboot</span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                Hot Air Balloon
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">Shaheel Arham</span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                Customer
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                08 DEC, 2023{" "}
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                08 OCT, 2023
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
                                View Request &nbsp;
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
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
      {/* View Model */}
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          {/* <div class="modal-content"> */}
            {/* <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div> */}
            <div class="modal-body">
              <div class="frame-11232">
                <div class="frame-11251">
                  <div class="checkbox-group-base">
                    <div class="frame-11191">
                      <div class="subtitle">Name</div>
                      <div class="headline">Shaheel Arham</div>
                    </div>
                    <div class="frame-11248">
                      <div class="frame-11220">
                        <div class="subtitle2">Refund Status</div>
                        <div class="status-requests">
                          <div class="text">Pending</div>
                        </div>
                      </div>
                      <div class="frame-11230">
                        <div class="subtitle2">Transaction ID</div>
                        <div class="sa-65-sfg-56-f-2">SA65SFG56F2</div>
                      </div>
                      <div class="frame-112322">
                        <div class="subtitle2">Date &amp; Time</div>
                        <div class="_08-oct-2022-08-20-am">08 OCT, 2022 08:20 AM</div>
                      </div>
                    </div>
                    <svg
                      class="vector-6"
                      width="600"
                      height="2"
                      viewBox="0 0 600 2"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 1H600" stroke="#EAEBF0" />
                    </svg>

                    <div class="frame-11249">
                      <div class="frame-11224">
                        <div class="subtitle2">User Type</div>
                        <div class="registered">Registered</div>
                      </div>
                      <div class="frame-11226">
                        <div class="phone">Phone</div>
                        <div class="_97455682545">+97455682545</div>
                      </div>
                      <div class="frame-11227">
                        <div class="subtitle2">Email</div>
                        <div class="shaheel-098-gmail-com">shaheel098@gmail.com</div>
                      </div>
                    </div>
                    <svg
                      class="vector-9"
                      width="600"
                      height="2"
                      viewBox="0 0 600 2"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 1H600" stroke="#EAEBF0" />
                    </svg>

                    <div class="frame-11250">
                      <div class="frame-11228">
                        <div class="subtitle2">Booking Type</div>
                        <div class="hot-air-balloon">Hot Air Balloon</div>
                      </div>
                      <div class="frame-11231">
                        <div class="subtitle2">Location</div>
                        <div class="kuwait">Kuwait</div>
                      </div>
                      <div class="frame-11233">
                        <div class="subtitle2">Booking Date</div>
                        <div class="_08-oct-2022">08 OCT, 2022</div>
                      </div>
                      <div class="frame-11234">
                        <div class="subtitle2">Time Slot</div>
                        <div class="_08-00-09-30">08:00 - 09:30</div>
                      </div>
                      <div class="frame-11235">
                        <div class="subtitle2">Duration</div>
                        <div class="_1-5-hrs">1.5 Hrs</div>
                      </div>
                    </div>
                    <svg
                      class="vector-8"
                      width="600"
                      height="2"
                      viewBox="0 0 600 2"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 1H600" stroke="#EAEBF0" />
                    </svg>

                    <div class="text-container">
                      <div class="frame-11189">
                        <div class="frame-11187">
                          <div class="total">Total</div>
                          <div class="_2-50-kwd">2.50 KWD</div>
                        </div>
                        <div class="frame-11188">
                          <div class="service-fee">Service Fee</div>
                          <div class="_0-50-kwd">0.50 KWD</div>
                        </div>
                        <div class="frame-111892">
                          <div class="collection-delivery">Collection &amp; Delivery</div>
                          <div class="_1-50-kwd">1.50 KWD</div>
                        </div>
                      </div>
                      <div class="frame-11186">
                        <div class="paid">Paid</div>
                        <div class="_4-50-kwd">4.50 KWD</div>
                      </div>
                    </div>
                    <svg
                      class="vector-10"
                      width="600"
                      height="2"
                      viewBox="0 0 600 2"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 1H600" stroke="#EAEBF0" />
                    </svg>
                    <div class="checkbox-text">
                      <div class="checkbox-text2">
                        <div class="text-container2">
                          <div class="payment-method">Payment Method</div>
                          <div class="frame-11184">
                            <div class="master-card">Master Card</div>
                            <div class="xxxx-9299">XXXXXX 9299</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="frame-11252">
                    <div class="button">
                      <div class="text2">Reject</div>
                    </div>
                    <div class="button2">
                      <div class="text2">Accept</div>
                    </div>
                  </div>
                </div>
                <svg
                  class="close-icon"
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_226_3915)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.7024 12.9992L0.476289 2.77306C-0.157461 2.13931 -0.157461 1.10906 0.476289 0.475312C1.11004 -0.158437 2.14029 -0.158437 2.77404 0.475312L13.0002 10.7014L23.2263 0.475312C23.86 -0.158437 24.8903 -0.158437 25.524 0.475312C26.1578 1.10906 26.1578 2.13931 25.524 2.77306L15.2979 12.9992L25.524 23.2253C26.1578 23.8591 26.1578 24.8893 25.524 25.5231C24.8903 26.1568 23.86 26.1568 23.2263 25.5231L13.0002 15.2969L2.77404 25.5231C2.14029 26.1568 1.11004 26.1568 0.476289 25.5231C-0.157461 24.8893 -0.157461 23.8591 0.476289 23.2253L10.7024 12.9992Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_226_3915">
                      <rect width="26" height="26" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>


            </div>
            {/* <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default CancellationBooking;
