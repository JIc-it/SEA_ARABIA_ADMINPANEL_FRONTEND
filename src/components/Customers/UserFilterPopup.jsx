import React, { useState, useEffect, useContext } from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { getCompanyListing } from "../../services/offers";
import { Visibility } from "@mui/icons-material";
import {
  getCategoryList,
  getServiceListing,
  getsubcategorylist,
} from "../../services/service";
import { AppContext } from "../../Context/AppContext";
import { getCustomerSearch } from "../../services/CustomerHandle";

export default function UserFilterPopup({
  open,
  handleClose,
  setIsLoading,
  setFilters,
  filters,
  setListPageUrl,
  setServiceList,
  setIsRefetch,
  isRefetch,
  categorylist,
  setCategoryList,
  handleClearFilter,
}) {
  const { gccCountriesList } = useContext(AppContext);
  const [active, setActive] = useState("vendorStatus");
  const [subcategorylist, setSubcategoryList] = useState([]);
  const [search, setSearch] = useState({
    category: "",
    sub_category: "",
    vendor: "",
  });
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "65%",
    // height: "95vh",
    bgcolor: "background.paper",
    // border: '2px solid #000',
    boxShadow: 24,
    p: 3,
    overflowY: "scroll",
  };
  const [listDiscount, setListDiscount] = useState([]);
  useEffect(() => {
    getCustomerSearch({ search: search, status: "", role: "User" })
      .then((data) => {
        console.log("customer-list for ffff", data.results);
        setListDiscount(data.results);
        setListPageUrl({
          next: data.next,
          previous: data.previous,
        });
      })
      .catch((error) => {
        console.error("Error fetching Customer List data:", error);
      });
  }, []);

  const findAndRemoveCategory = (field, id, dateType) => {
    if (field === "onboardDate") {
      if (dateType === "from") {
        setFilters((prevFilters) => {
          return {
            ...prevFilters,
            OnBoardOn: { from: "", to: filters.OnBoardOn.to },
          };
        });
      }
      if (dateType === "to") {
        setFilters((prevFilters) => {
          return {
            ...prevFilters,
            OnBoardOn: { from: filters.OnBoardOn.from, to: "" },
          };
        });
      }
    }
  };
  const getsubcategorylist = async (fromDate, toDate) => {
    try {
      // Add logic to fetch customers based on the date range
      // This is just a placeholder, you need to replace it with your actual backend logic
      const response = await getCustomerSearch({
        params: { fromDate, toDate },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleApplyFilter = async () => {
    try {
      const data = await getsubcategorylist(fromDate, toDate);
      console.log("Filtered data:", data);
      setSubcategoryList(data);
      setIsRefetch(!isRefetch);
      handleClose();
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
  };

  return (
    <div>
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
              handleClearFilter();
            }}
            aria-label="close"
            sx={{ position: "absolute", top: 8, right: 14 }}
          >
            <CloseIcon />
          </IconButton>
          <div class="filtered-list mt-3">
            {
              <div class="components-selection-item mt-1">
                <div class="frame-427319782">
                  {filters.OnBoardOn.from != "" ||
                  filters.OnBoardOn.to != "" ? (
                    <>
                      <div class="frame-427319783">
                        <div class="vendor">Onboarded On</div>
                        <div class="div">:</div>
                      </div>
                      <div
                        style={{
                          // width: "50vw",
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
                            {filters.OnBoardOn.from && filters.OnBoardOn.to ? (
                              <>
                                <span>
                                  {`From :${filters.OnBoardOn.from} `}

                                  <span
                                    className="mx-1"
                                    onClick={() =>
                                      findAndRemoveCategory(
                                        "onboardDate",
                                        "",
                                        "from"
                                      )
                                    }
                                  >
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
                                </span>
                                <span>
                                  {` To :${filters.OnBoardOn.to} `}

                                  <span
                                    className="mx-1"
                                    onClick={() =>
                                      findAndRemoveCategory(
                                        "onboardDate",
                                        "",
                                        "to"
                                      )
                                    }
                                  >
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
                                </span>
                              </>
                            ) : filters.OnBoardOn.from ? (
                              <>
                                <span>{`From :${filters.OnBoardOn.from}`}</span>
                                <span
                                  className="mx-1"
                                  onClick={() =>
                                    findAndRemoveCategory(
                                      "onboardDate",
                                      "",
                                      "from"
                                    )
                                  }
                                >
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
                              </>
                            ) : filters.OnBoardOn.to ? (
                              <>
                                {" "}
                                <span>{`To :${filters.OnBoardOn.to}`}</span>
                                <span
                                  className="mx-1"
                                  onClick={() =>
                                    findAndRemoveCategory(
                                      "onboardDate",
                                      "",
                                      "to"
                                    )
                                  }
                                >
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
                              </>
                            ) : (
                              ""
                            )}
                            {/* <span>
                              {filters.OnBoardOn.from && filters.OnBoardOn.to
                                ? `From :${filters.OnBoardOn.from} , To :${filters.OnBoardOn.to}`
                                : filters.OnBoardOn.from
                                ? `From :${filters.OnBoardOn.from}`
                                : filters.OnBoardOn.to
                                ? `To: ${filters.OnBoardOn.to}`
                                : ""}
                            </span>

                            <span
                              className="mx-1"
                              // onClick={() =>
                              //   findAndRemoveCategory("Sub-Category", data.id)
                              // }
                            >
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
                            </span> */}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            }
          </div>
          <br />
          <div class="d-flex align-items-start row">
            <div
              class="filter-category col-md-3"
              // style={{ height: "50vh", width: "30%" }}
            >
              <div
                class="nav flex-column nav-pills me-3"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <small>Customer</small>

                <small className="mt-2">Date</small>
                <button
                  onClick={() => setActive("Vendor")}
                  style={{
                    // width: "12vw",
                    backgroundColor: "white",
                    border: active === "Vendor" ? "1px solid #2176FF" : "",
                  }}
                  class="nav-link  mt-2 d-flex justify-content-between"
                  id="v-pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-profile"
                  aria-selected="false"
                >
                  <span>Onboarded On</span>

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
                        stroke={active === "Vendor" ? "#2176FF" : "gray"}
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>

            <div
              className="tab-content col-md-9 "
              id="v-pills-tabContent"
              // style={{ position: "relative", left: 20 }}
            >
              <div
                class="tab-pane fade"
                id="v-pills-profile"
                role="tabpanel"
                aria-labelledby="v-pills-profile-tab"
              >
                <h4>Onboarded On</h4>

                <div className="row filter-checkbox-date-section ">
                  <div className="col-md-6">
                    <label htmlFor="" className="form-label">
                      From
                    </label>
                    <input
                      type="date"
                      id=""
                      className="form-control"
                      name="siteVisitDate"
                      value={filters.OnBoardOn.from || ""}
                      onChange={(e) => {
                        setFilters({
                          ...filters,
                          OnBoardOn: {
                            from: e.target.value,
                            to: filters.OnBoardOn.to,
                          },
                        });
                      }}
                      pattern="\d{4}-\d{2}-\d{2}" // Enforce yyyy-mm-dd format
                      min="1000-01-01" // Set your minimum date
                      max="9999-12-31"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="" className="form-label">
                      To
                    </label>
                    <input
                      type="date"
                      id=""
                      className="form-control"
                      name="siteVisitDate"
                      value={filters.OnBoardOn.to || ""}
                      onChange={(e) => {
                        setFilters({
                          ...filters,
                          OnBoardOn: {
                            from: filters.OnBoardOn.from,
                            to: e.target.value,
                          },
                        });
                      }}
                      pattern="\d{4}-\d{2}-\d{2}" // Enforce yyyy-mm-dd format
                      min="1000-01-01" // Set your minimum date
                      max="9999-12-31"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="d-flex justify-content-end mt-3">
            <button
              type="reset"
              className="m-1 btn btn-small btn-white"
              onClick={handleClearFilter}
            >
              Clear Filter
            </button>
            <button
              type="button"
              className="m-1 btn btn-small"
              style={{ backgroundColor: "#006875", color: "white" }}
              onClick={handleApplyFilter}
            >
              Apply Filter
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
