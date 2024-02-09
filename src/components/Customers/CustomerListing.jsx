import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import filterIcon from "../../static/img/Filter.png";
import CustomerCreate from "./CustomerCreate";
import * as XLSX from "xlsx";
import {
  customerExport,
  getCustomerSearch,
} from "../../services/CustomerHandle";
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    getCustomerSearch({ search: "", status: "", role: "User" })
      .then((data) => {
        console.log("customer-list", data.results);
        setListDiscount(data.results);
        setListPageUrl({
          next: data.next,
          previous: data.previous,
        });
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
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);

  const handleFilterButtonClick = () => {
    setIsFilterPopupOpen(!isFilterPopupOpen);
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
  // new
  const handleFilterCategory = (e) => {
    const { name, value } = e.target;

    setFilters((prevFilters) => {
      // Check if category already has data
      const categoryArray =
        prevFilters.category.length > 0 ? prevFilters.category : [];

      // Check if the value already exists in the category array
      const existingCategoryIndex = categoryArray.findIndex(
        (item) => item.id === value
      );

      // If the value exists, remove it; otherwise, add or update it
      const updatedCategory =
        existingCategoryIndex !== -1
          ? [
              ...categoryArray.slice(0, existingCategoryIndex),
              ...categoryArray.slice(existingCategoryIndex + 1),
            ]
          : [...categoryArray, { id: value, name }];

      return {
        ...prevFilters,
        category: updatedCategory,
      };
    });
  };

  return (
    <div style={{ height: "100vh" }}>
      <div className="col-12 actions_menu my-2 px-3">
        <div className="action_menu_left col-8">
          <div>
            {/* <form action="" method="post" autocomplete="off"> */}
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
                  {/* <button
                    type="button"
                    className="btn search_button"
                    style={{ background: "#006875" }}
                    onClick={getCustomerListData}
                  >
                    Search
                  </button> */}
                </div>
                <button
                  onClick={handleOpen}
                  className="bg-black"
                  style={{ borderRadius: "5px", marginLeft: "5px" }}
                >
                  <img src={filterIcon} alt="filter" width={25} />
                </button>
              </div>
            </div>
            {/* </form> */}
          </div>

          {/* Modal */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography variant="p" component="p" sx={{ fontWeight: 800 }}>
                Filter
              </Typography>
              <IconButton
                edge="end"
                color="inherit"
                onClick={() => {
                  handleClose();
                }}
                aria-label="close"
                sx={{ position: "absolute", top: 8, right: 14 }}
              >
                <CloseIcon />
              </IconButton>
              <div class="frame-427319784 mt-3">
                {filters.category.length > 0 && (
                  <div class="components-selection-item">
                    <div class="frame-427319782">
                      <div class="frame-427319783">
                        <div class="category">Vendor status--</div>
                        <div class="div">:</div>
                      </div>
                      <div
                        style={{
                          width: "50vw",
                          display: "flex",
                          flexWrap: "wrap",
                        }}
                      >
                        <div
                          class="yacht-boat-heli-tour "
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                          }}
                        >
                          {filters.category.map((data) => (
                            <div key={data.id} className="mx-1">
                              <span>{data.name}</span>
                              <span className="mx-1">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={10}
                                  height={10}
                                  viewBox="0 0 10 10"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_5512_51442)">
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M8.65833 1.34181C8.68743 1.37084 8.71052 1.40532 8.72628 1.44329C8.74203 1.48125 8.75014 1.52195 8.75014 1.56306C8.75014 1.60416 8.74203 1.64486 8.72628 1.68283C8.71052 1.7208 8.68743 1.75528 8.65833 1.78431L1.78333 8.65931C1.72465 8.71799 1.64507 8.75095 1.56208 8.75095C1.4791 8.75095 1.39951 8.71799 1.34083 8.65931C1.28215 8.60063 1.24919 8.52104 1.24919 8.43806C1.24919 8.35507 1.28215 8.27549 1.34083 8.21681L8.21583 1.34181C8.24486 1.31271 8.27935 1.28962 8.31731 1.27386C8.35528 1.25811 8.39598 1.25 8.43708 1.25C8.47819 1.25 8.51889 1.25811 8.55685 1.27386C8.59482 1.28962 8.6293 1.31271 8.65833 1.34181Z"
                                      fill="#212529"
                                    />
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M1.34083 1.34181C1.31173 1.37084 1.28864 1.40532 1.27289 1.44329C1.25713 1.48125 1.24902 1.52195 1.24902 1.56306C1.24902 1.60416 1.25713 1.64486 1.27289 1.68283C1.28864 1.7208 1.31173 1.75528 1.34083 1.78431L8.21583 8.65931C8.27451 8.71799 8.3541 8.75095 8.43708 8.75095C8.52007 8.75095 8.59965 8.71799 8.65833 8.65931C8.71701 8.60063 8.74998 8.52104 8.74998 8.43806C8.74998 8.35507 8.71701 8.27549 8.65833 8.21681L1.78333 1.34181C1.7543 1.31271 1.71982 1.28962 1.68185 1.27386C1.64389 1.25811 1.60319 1.25 1.56208 1.25C1.52098 1.25 1.48028 1.25811 1.44231 1.27386C1.40435 1.28962 1.36986 1.31271 1.34083 1.34181Z"
                                      fill="#212529"
                                    />
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M8.65833 1.34181C8.68743 1.37084 8.71052 1.40532 8.72628 1.44329C8.74203 1.48125 8.75014 1.52195 8.75014 1.56306C8.75014 1.60416 8.74203 1.64486 8.72628 1.68283C8.71052 1.7208 8.68743 1.75528 8.65833 1.78431L1.78333 8.65931C1.72465 8.71799 1.64507 8.75095 1.56208 8.75095C1.4791 8.75095 1.39951 8.71799 1.34083 8.65931C1.28215 8.60063 1.24919 8.52104 1.24919 8.43806C1.24919 8.35507 1.28215 8.27549 1.34083 8.21681L8.21583 1.34181C8.24486 1.31271 8.27935 1.28962 8.31731 1.27386C8.35528 1.25811 8.39598 1.25 8.43708 1.25C8.47819 1.25 8.51889 1.25811 8.55685 1.27386C8.59482 1.28962 8.6293 1.31271 8.65833 1.34181Z"
                                      stroke="#212529"
                                      strokeWidth="0.8"
                                    />
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M1.34083 1.34181C1.31173 1.37084 1.28864 1.40532 1.27289 1.44329C1.25713 1.48125 1.24902 1.52195 1.24902 1.56306C1.24902 1.60416 1.25713 1.64486 1.27289 1.68283C1.28864 1.7208 1.31173 1.75528 1.34083 1.78431L8.21583 8.65931C8.27451 8.71799 8.3541 8.75095 8.43708 8.75095C8.52007 8.75095 8.59965 8.71799 8.65833 8.65931C8.71701 8.60063 8.74998 8.52104 8.74998 8.43806C8.74998 8.35507 8.71701 8.27549 8.65833 8.21681L1.78333 1.34181C1.7543 1.31271 1.71982 1.28962 1.68185 1.27386C1.64389 1.25811 1.60319 1.25 1.56208 1.25C1.52098 1.25 1.48028 1.25811 1.44231 1.27386C1.40435 1.28962 1.36986 1.31271 1.34083 1.34181Z"
                                      stroke="#212529"
                                      strokeWidth="0.8"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_5512_51442">
                                      <rect
                                        width={10}
                                        height={10}
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div class="components-selection-item mt-1">
                  <div class="frame-427319782">
                    <div class="frame-427319783">
                      <div class="vendor">Sub Category</div>
                      <div class="div">:</div>
                    </div>
                    <div
                      style={{
                        width: "50vw",
                        display: "flex",
                        flexWrap: "wrap",
                      }}
                    >
                      <div
                        class="yacht-boat-heli-tour "
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                        }}
                      >
                        <div className="mx-1">
                          <span></span>
                          <span className="mx-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={10}
                              height={10}
                              viewBox="0 0 10 10"
                              fill="none"
                            >
                              <g clipPath="url(#clip0_5512_51442)">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M8.65833 1.34181C8.68743 1.37084 8.71052 1.40532 8.72628 1.44329C8.74203 1.48125 8.75014 1.52195 8.75014 1.56306C8.75014 1.60416 8.74203 1.64486 8.72628 1.68283C8.71052 1.7208 8.68743 1.75528 8.65833 1.78431L1.78333 8.65931C1.72465 8.71799 1.64507 8.75095 1.56208 8.75095C1.4791 8.75095 1.39951 8.71799 1.34083 8.65931C1.28215 8.60063 1.24919 8.52104 1.24919 8.43806C1.24919 8.35507 1.28215 8.27549 1.34083 8.21681L8.21583 1.34181C8.24486 1.31271 8.27935 1.28962 8.31731 1.27386C8.35528 1.25811 8.39598 1.25 8.43708 1.25C8.47819 1.25 8.51889 1.25811 8.55685 1.27386C8.59482 1.28962 8.6293 1.31271 8.65833 1.34181Z"
                                  fill="#212529"
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M1.34083 1.34181C1.31173 1.37084 1.28864 1.40532 1.27289 1.44329C1.25713 1.48125 1.24902 1.52195 1.24902 1.56306C1.24902 1.60416 1.25713 1.64486 1.27289 1.68283C1.28864 1.7208 1.31173 1.75528 1.34083 1.78431L8.21583 8.65931C8.27451 8.71799 8.3541 8.75095 8.43708 8.75095C8.52007 8.75095 8.59965 8.71799 8.65833 8.65931C8.71701 8.60063 8.74998 8.52104 8.74998 8.43806C8.74998 8.35507 8.71701 8.27549 8.65833 8.21681L1.78333 1.34181C1.7543 1.31271 1.71982 1.28962 1.68185 1.27386C1.64389 1.25811 1.60319 1.25 1.56208 1.25C1.52098 1.25 1.48028 1.25811 1.44231 1.27386C1.40435 1.28962 1.36986 1.31271 1.34083 1.34181Z"
                                  fill="#212529"
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M8.65833 1.34181C8.68743 1.37084 8.71052 1.40532 8.72628 1.44329C8.74203 1.48125 8.75014 1.52195 8.75014 1.56306C8.75014 1.60416 8.74203 1.64486 8.72628 1.68283C8.71052 1.7208 8.68743 1.75528 8.65833 1.78431L1.78333 8.65931C1.72465 8.71799 1.64507 8.75095 1.56208 8.75095C1.4791 8.75095 1.39951 8.71799 1.34083 8.65931C1.28215 8.60063 1.24919 8.52104 1.24919 8.43806C1.24919 8.35507 1.28215 8.27549 1.34083 8.21681L8.21583 1.34181C8.24486 1.31271 8.27935 1.28962 8.31731 1.27386C8.35528 1.25811 8.39598 1.25 8.43708 1.25C8.47819 1.25 8.51889 1.25811 8.55685 1.27386C8.59482 1.28962 8.6293 1.31271 8.65833 1.34181Z"
                                  stroke="#212529"
                                  strokeWidth="0.8"
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M1.34083 1.34181C1.31173 1.37084 1.28864 1.40532 1.27289 1.44329C1.25713 1.48125 1.24902 1.52195 1.24902 1.56306C1.24902 1.60416 1.25713 1.64486 1.27289 1.68283C1.28864 1.7208 1.31173 1.75528 1.34083 1.78431L8.21583 8.65931C8.27451 8.71799 8.3541 8.75095 8.43708 8.75095C8.52007 8.75095 8.59965 8.71799 8.65833 8.65931C8.71701 8.60063 8.74998 8.52104 8.74998 8.43806C8.74998 8.35507 8.71701 8.27549 8.65833 8.21681L1.78333 1.34181C1.7543 1.31271 1.71982 1.28962 1.68185 1.27386C1.64389 1.25811 1.60319 1.25 1.56208 1.25C1.52098 1.25 1.48028 1.25811 1.44231 1.27386C1.40435 1.28962 1.36986 1.31271 1.34083 1.34181Z"
                                  stroke="#212529"
                                  strokeWidth="0.8"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_5512_51442">
                                  <rect width={10} height={10} fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="components-selection-item mt-1">
                  <div class="frame-427319782">
                    <div class="frame-427319783">
                      <div class="vendor">Vendor</div>
                      <div class="div">:</div>
                    </div>
                    <div
                      style={{
                        width: "50vw",
                        display: "flex",
                        flexWrap: "wrap",
                      }}
                    >
                      <div
                        class="yacht-boat-heli-tour "
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                        }}
                      >
                        {filters.vendor.map((data) => (
                          <div key={data.id} className="mx-1">
                            <span>{data.name}</span>
                            <span className="mx-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={10}
                                height={10}
                                viewBox="0 0 10 10"
                                fill="none"
                              >
                                <g clipPath="url(#clip0_5512_51442)">
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M8.65833 1.34181C8.68743 1.37084 8.71052 1.40532 8.72628 1.44329C8.74203 1.48125 8.75014 1.52195 8.75014 1.56306C8.75014 1.60416 8.74203 1.64486 8.72628 1.68283C8.71052 1.7208 8.68743 1.75528 8.65833 1.78431L1.78333 8.65931C1.72465 8.71799 1.64507 8.75095 1.56208 8.75095C1.4791 8.75095 1.39951 8.71799 1.34083 8.65931C1.28215 8.60063 1.24919 8.52104 1.24919 8.43806C1.24919 8.35507 1.28215 8.27549 1.34083 8.21681L8.21583 1.34181C8.24486 1.31271 8.27935 1.28962 8.31731 1.27386C8.35528 1.25811 8.39598 1.25 8.43708 1.25C8.47819 1.25 8.51889 1.25811 8.55685 1.27386C8.59482 1.28962 8.6293 1.31271 8.65833 1.34181Z"
                                    fill="#212529"
                                  />
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M1.34083 1.34181C1.31173 1.37084 1.28864 1.40532 1.27289 1.44329C1.25713 1.48125 1.24902 1.52195 1.24902 1.56306C1.24902 1.60416 1.25713 1.64486 1.27289 1.68283C1.28864 1.7208 1.31173 1.75528 1.34083 1.78431L8.21583 8.65931C8.27451 8.71799 8.3541 8.75095 8.43708 8.75095C8.52007 8.75095 8.59965 8.71799 8.65833 8.65931C8.71701 8.60063 8.74998 8.52104 8.74998 8.43806C8.74998 8.35507 8.71701 8.27549 8.65833 8.21681L1.78333 1.34181C1.7543 1.31271 1.71982 1.28962 1.68185 1.27386C1.64389 1.25811 1.60319 1.25 1.56208 1.25C1.52098 1.25 1.48028 1.25811 1.44231 1.27386C1.40435 1.28962 1.36986 1.31271 1.34083 1.34181Z"
                                    fill="#212529"
                                  />
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M8.65833 1.34181C8.68743 1.37084 8.71052 1.40532 8.72628 1.44329C8.74203 1.48125 8.75014 1.52195 8.75014 1.56306C8.75014 1.60416 8.74203 1.64486 8.72628 1.68283C8.71052 1.7208 8.68743 1.75528 8.65833 1.78431L1.78333 8.65931C1.72465 8.71799 1.64507 8.75095 1.56208 8.75095C1.4791 8.75095 1.39951 8.71799 1.34083 8.65931C1.28215 8.60063 1.24919 8.52104 1.24919 8.43806C1.24919 8.35507 1.28215 8.27549 1.34083 8.21681L8.21583 1.34181C8.24486 1.31271 8.27935 1.28962 8.31731 1.27386C8.35528 1.25811 8.39598 1.25 8.43708 1.25C8.47819 1.25 8.51889 1.25811 8.55685 1.27386C8.59482 1.28962 8.6293 1.31271 8.65833 1.34181Z"
                                    stroke="#212529"
                                    strokeWidth="0.8"
                                  />
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M1.34083 1.34181C1.31173 1.37084 1.28864 1.40532 1.27289 1.44329C1.25713 1.48125 1.24902 1.52195 1.24902 1.56306C1.24902 1.60416 1.25713 1.64486 1.27289 1.68283C1.28864 1.7208 1.31173 1.75528 1.34083 1.78431L8.21583 8.65931C8.27451 8.71799 8.3541 8.75095 8.43708 8.75095C8.52007 8.75095 8.59965 8.71799 8.65833 8.65931C8.71701 8.60063 8.74998 8.52104 8.74998 8.43806C8.74998 8.35507 8.71701 8.27549 8.65833 8.21681L1.78333 1.34181C1.7543 1.31271 1.71982 1.28962 1.68185 1.27386C1.64389 1.25811 1.60319 1.25 1.56208 1.25C1.52098 1.25 1.48028 1.25811 1.44231 1.27386C1.40435 1.28962 1.36986 1.31271 1.34083 1.34181Z"
                                    stroke="#212529"
                                    strokeWidth="0.8"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_5512_51442">
                                    <rect width={10} height={10} fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="d-flex align-items-start">
                <div
                  class="frame-427319790"
                  style={{ height: "50vh", width: "30%" }}
                >
                  <div
                    class="nav flex-column nav-pills me-3"
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    <small>Customer</small>
                    <button
                      onClick={() => setActive("Customer Status")}
                      style={{
                        width: "12vw",
                        backgroundColor: "white",
                        border:
                          active === "Customer Status"
                            ? "1px solid #2176FF"
                            : "",
                      }}
                      class="nav-link active mt-2 d-flex justify-content-between"
                      id="v-pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-home"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-home"
                      aria-selected="true"
                    >
                      <span style={{ backgroundColor: "red" }}>
                        {" "}
                        Customer Status
                      </span>
                      <span
                        className="py-1"
                        style={{
                          color: "white",
                          fontSize: "12px",
                          backgroundColor:
                            active === "Customer Status" ? "#2176FF" : "gray",
                          width: "22px",
                          height: "22px",
                          borderRadius: "33px",
                        }}
                      ></span>
                      <span>
                        <svg
                          width={18}
                          height={18}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.5 4.16797L12.5 10.0013L7.5 15.8346"
                            stroke={active === "Category" ? "#2176FF" : "gray"}
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>
                    <button
                      onClick={() => setActive("Sub-Category")}
                      style={{
                        width: "12vw",
                        backgroundColor: "white",
                        border:
                          active === "Sub-Category" ? "1px solid #2176FF" : "",
                      }}
                      class="nav-link mt-2 d-flex justify-content-between"
                      id="v-pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-home2"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-home2"
                      aria-selected="true"
                    >
                      <span style={{ backgroundColor: "yellowgreen" }}>
                        Location
                      </span>
                      <span
                        className="py-1"
                        style={{
                          color: "white",
                          fontSize: "12px",
                          backgroundColor:
                            active === "Sub-Category" ? "#2176FF" : "gray",
                          width: "22px",
                          height: "22px",
                          borderRadius: "33px",
                        }}
                      ></span>
                      <span>
                        <svg
                          width={18}
                          height={18}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.5 4.16797L12.5 10.0013L7.5 15.8346"
                            stroke={
                              active === "Sub-Category" ? "#2176FF" : "gray"
                            }
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>

                    <button
                      onClick={() => setActive("Service-Status")}
                      style={{
                        width: "12vw",
                        backgroundColor: "white",
                        border:
                          active === "Service-Status"
                            ? "1px solid #2176FF"
                            : "",
                      }}
                      class="nav-link  mt-2 d-flex justify-content-between"
                      id="v-pills-messages-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-messages"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-messages"
                      aria-selected="false"
                    >
                      <span>Onboarded on Status</span>
                      {console.log(filters)}
                      <span
                        className="py-1"
                        style={{
                          color: "white",
                          fontSize: "12px",
                          backgroundColor:
                            active === "Service-Status" ? "#2176FF" : "gray",
                          width: "22px",
                          height: "22px",
                          borderRadius: "33px",
                        }}
                      >
                        {filters.status.active === true &&
                        filters.status.inactive === true
                          ? "2"
                          : filters.status.active
                          ? "1"
                          : filters.status.inactive
                          ? "1"
                          : "0"}
                      </span>
                      <span>
                        <svg
                          width={18}
                          height={18}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.5 4.16797L12.5 10.0013L7.5 15.8346"
                            stroke={
                              active === "Service-Status" ? "#2176FF" : "gray"
                            }
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
                {/* customer status */}
                <div
                  class="tab-content"
                  id="v-pills-tabContent"
                  style={{ position: "relative", left: 20 }}
                >
                  <div
                    class="tab-pane fade show active"
                    id="v-pills-home"
                    role="tabpanel"
                    aria-labelledby="v-pills-home-tab"
                  >
                    <h4 style={{ backgroundColor: "red" }}>Customer Status</h4>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="search"
                      onChange={(e) =>
                        setSearch((prev) => {
                          return { ...prev, category: e.target.value };
                        })
                      }
                      style={{ width: 320 }}
                    />
                    <br />
                    <div
                      style={{
                        height: categorylist.length > 14 ? "50vh" : "",
                        overflowY: categorylist.length > 14 ? "scroll" : "",
                      }}
                    >
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          onChange={(e) => handleFilterCategory(e)}
                          style={{ width: 20, height: 20 }}
                        />
                        <label class="form-check-label" for="Boat"></label>
                      </div>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="v-pills-profile"
                    role="tabpanel"
                    aria-labelledby="v-pills-profile-tab"
                  >
                    <h4>Vendor</h4>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="search"
                      onChange={(e) =>
                        setSearch((prev) => {
                          return { ...prev, vendor: e.target.value };
                        })
                      }
                      style={{ width: 320 }}
                    />
                    <br />
                    <div
                      style={{
                        height: "50vh",
                        overflowY: "scroll",
                      }}
                    >
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          style={{ width: 20, height: 20 }}
                        />
                        <label class="form-check-label" for="Boat"></label>
                      </div>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="v-pills-home2"
                    role="tabpanel"
                    aria-labelledby="v-pills-home-tab"
                  >
                    <h4 style={{ backgroundColor: "yellowgreen" }}>
                      Customer Stat
                    </h4>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="search"
                      onChange={(e) =>
                        setSearch((prev) => {
                          return { ...prev, sub_category: e.target.value };
                        })
                      }
                      style={{ width: 320 }}
                    />
                    <br />
                    <div
                      style={{
                        height: "50vh",
                        overflowY: "scroll",
                      }}
                    >
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          style={{ width: 20, height: 20 }}
                        />
                        <label class="form-check-label" for="Boat">
                          Kuwait
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          style={{ width: 20, height: 20 }}
                        />
                        <label class="form-check-label" for="Boat">
                          Kochi
                        </label>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                    // class="tab-pane fade"
                    id="v-pills-messages"
                    role="tabpanel"
                    aria-labelledby="v-pills-messages-tab"
                  >
                    <h4>Onboarded On</h4>

                    <div class="form-check">
                      <label class="form-check-label" for="Boat">
                        From
                      </label>
                    </div>
                    <div class="form-check">
                      <label class="form-check-label" for="Boat">
                        To
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          </Modal>
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
          <CustomerCreate show={showOffcanvas} close={handleCloseOffcanvas} />
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
