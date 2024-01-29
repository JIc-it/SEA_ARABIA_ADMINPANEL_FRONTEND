import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { getListDataInPagination } from "../../services/commonServices";
import {removeBaseUrlFromPath} from "../../helpers";
import { getBookingList } from "../../services/booking";
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { getCategoryList } from "../../services/service";
import { getCompanyListing } from "../../services/offers"
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function BookingFilter({ open, handleClose }) {
    const [active, setActive] = useState("Category")
    const [categorylist, setCategoryList] = useState([])
    const [vendorlist, setVendorList] = useState([]);
    const [listPageUrl, setListPageUrl] = useState({
        next: null,
        previous: null,
      });
      const [bookingList, setBookingList] = useState([]);

    useEffect(() => {
        const Pass = { status: "", search: "", refund_status: "" };
        getBookingList(Pass)
          .then((data) => {
            setListPageUrl({ next: data.next, previous: data.previous });
            setBookingList(data?.results);
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }, []);
      
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "60vw",
        bgcolor: 'background.paper',
        borderRadius: "5px",
        boxShadow: 24,
        p: 4,
        overflowY: 'auto', // Add this line for vertical scroll
        height: '90vh', // Adjust the maximum height if needed
    }
    useEffect(() => {
        getCategoryList()
            .then((data) =>
                setCategoryList(data)
            ).catch((error) =>
                console.error(error));

        getCompanyListing()
            .then((data) =>
                setVendorList(data)
            ).catch((error) =>
                console.error(error))
    }, [])

    useEffect(() => {

    }, [])

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
                        onClick={() => { handleClose() }}
                        aria-label="close"
                        sx={{ position: 'absolute', top: 8, right: 14 }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <div class="frame-427319784 mt-2">
                        <div class="components-selection-item">
                            <div class="frame-427319782">
                                <div class="frame-427319783">
                                    <div class="category">Category</div>
                                    <div class="div">:</div>
                                </div>
                                <div class="yacht-boat-heli-tour">
                                    Yacht, Boat, Heli Tour
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
                                    Salma international, Uber Marine Company, Ghanayem
                                    El-Khair
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
                                <div class="completed-unsuccessful">
                                    Completed, Unsuccessful
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
                    <br />
                    <br />
                    <div class="d-flex align-items-start">
                        <div class="frame-427319790">
                            <div
                                class="nav flex-column nav-pills me-3"
                                id="v-pills-tab"
                                role="tablist"
                                aria-orientation="vertical"
                            >
                                <small>Service</small>
                                <button
                                    onClick={() => setActive("Category")}
                                    class="nav-link active mt-2 d-flex justify-content-between"
                                    id="v-pills-home-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#v-pills-home"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-home"
                                    aria-selected="true"
                                    style={{ width: "12vw", backgroundColor: "white", border: active === "Category" ? "1px solid #2176FF" : "" }}
                                >
                                    <span> Category</span>
                                    <span className='py-1' style={{ color: "white", fontSize: "12px", backgroundColor: active === "Category" ? "#2176FF" : "gray", width: "22px", height: "22px", borderRadius: "33px" }}>
                                        {0}
                                    </span>
                                    <span><svg width={18} height={18} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.5 4.16797L12.5 10.0013L7.5 15.8346" stroke={active === "Category" ? "#2176FF" : "gray"} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                    </span>
                                </button>
                                <button
                                    class="nav-link mt-2 d-flex justify-content-between"
                                    onClick={() => setActive("Vendor")}
                                    style={{ width: "12vw", backgroundColor: "white", border: active === "Vendor" ? "1px solid #2176FF" : "" }}
                                    id="v-pills-profile-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#v-pills-profile"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-profile"
                                    aria-selected="false"
                                >
                                    <span> Vendor</span>
                                    <span className='py-1' style={{ color: "white", fontSize: "12px", backgroundColor: active === "Vendor" ? "#2176FF" : "gray", width: "22px", height: "22px", borderRadius: "33px" }}>
                                        {0}
                                    </span>
                                    <span><svg width={18} height={18} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.5 4.16797L12.5 10.0013L7.5 15.8346" stroke={active === "Vendor" ? "#2176FF" : "gray"} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                    </span>
                                </button>
                                <small className='mt-2'>Customer</small>
                                <button
                                    onClick={() => setActive("Customer")}
                                    class="nav-link mt-2 d-flex justify-content-between"
                                    style={{ width: "12vw", backgroundColor: "white", border: active === "Customer" ? "1px solid #2176FF" : "" }}
                                    id="v-pills-messages-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#v-pills-messages"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-messages"
                                    aria-selected="false"
                                >
                                    <span> Customer</span>
                                    <span className='py-1' style={{ color: "white", fontSize: "12px", backgroundColor: active === "Customer" ? "#2176FF" : "gray", width: "22px", height: "22px", borderRadius: "33px" }}>
                                        {0}
                                    </span>
                                    <span><svg width={18} height={18} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.5 4.16797L12.5 10.0013L7.5 15.8346" stroke={active === "Customer" ? "#2176FF" : "gray"} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                    </span>
                                </button>
                                <button
                                    class="nav-link mt-2 d-flex justify-content-between"
                                    onClick={() => setActive("guest_user")}
                                    style={{ width: "12vw", backgroundColor: "white", border: active === "guest_user" ? "1px solid #2176FF" : "" }}
                                    id="v-pills-profile-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#v-pills-profile"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-profile"
                                    aria-selected="false"
                                >
                                    <span> Guest User</span>
                                    <span className='py-1' style={{ color: "white", fontSize: "12px", backgroundColor: active === "Vendor" ? "#2176FF" : "gray", width: "22px", height: "22px", borderRadius: "33px" }}>
                                        {0}
                                    </span>
                                    <span><svg width={18} height={18} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.5 4.16797L12.5 10.0013L7.5 15.8346" stroke={active === "guest_user" ? "#2176FF" : "gray"} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                    </span>
                                </button>
                                <button
                                    onClick={() => setActive("customer_type")}
                                    style={{ width: "12vw", backgroundColor: "white", border: active === "customer_type" ? "1px solid #2176FF" : "" }}
                                    class="nav-link mt-2 d-flex justify-content-between"
                                    id="v-pills-settings-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#v-pills-settings"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-settings"
                                    aria-selected="false"
                                >
                                    <span> Customer Type</span>
                                    <span className='py-1' style={{ color: "white", fontSize: "12px", backgroundColor: active === "customer_type" ? "#2176FF" : "gray", width: "22px", height: "22px", borderRadius: "33px" }}>
                                        {0}
                                    </span>
                                    <span><svg width={18} height={18} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.5 4.16797L12.5 10.0013L7.5 15.8346" stroke={active === "customer_type" ? "#2176FF" : "gray"} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                    </span>
                                </button>
                                <small className='mt-2'>Booking</small>
                                <button
                                    class="nav-link"
                                    id="v-pills-status-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#v-pills-status"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-status"
                                    aria-selected="false"
                                >
                                    Status
                                </button>
                                <small>Date</small>
                                <button
                                    class="nav-link"
                                    id="v-pills-creationDate-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#v-pills-creationDate"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-creationDate"
                                    aria-selected="false"
                                >
                                    Creation Date
                                </button>
                                <button
                                    class="nav-link"
                                    id="v-pills-commencementDate-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#v-pills-commencementDate"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-commencementDate"
                                    aria-selected="false"
                                >
                                    Commencement Date
                                </button>
                            </div>
                        </div>

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
                                <h4>Category</h4>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="search"
                                    style={{ width: 320 }}
                                />
                                <br />
                                <div style={{ height: "400px", overflow: "scroll" }}>
                                    {categorylist.length > 0 &&
                                        categorylist.map((data) =>
                                            <div class="form-check">
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    value=""
                                                    id={data.id}
                                                    style={{ width: 20, height: 20 }}
                                                />
                                                <label class="form-check-label" for="Boat">
                                                    {data.name}
                                                </label>
                                            </div>
                                        )
                                    }
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
                                    style={{ width: 320 }}
                                />
                                <br />
                                <div style={{ height: "400px", overflow: "scroll" }}>
                                    {vendorlist.length > 0 &&
                                        vendorlist.map((data) =>
                                            <div class="form-check">
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    value=""
                                                    id={data.id}
                                                    style={{ width: 20, height: 20 }}
                                                />
                                                <label class="form-check-label" for="Boat">
                                                    {data.name}
                                                </label>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div
                                class="tab-pane fade"
                                id="v-pills-messages"
                                role="tabpanel"
                                aria-labelledby="v-pills-messages-tab"
                            >
                                <h4>Customer</h4>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="search"
                                />
                                <br />
                                {bookingList.length > 0 && 
                                bookingList.map((data)=>
                                <div class="form-check">
                                    {console.log(data?.user?.id)}
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        value={data?.user?.id}
                                        id="Boat"
                                        style={{ width: 20, height: 20 }}
                                    />
                                    <label class="form-check-label" for="Boat">
                                        {data?.user?.first_name}
                                    </label>
                                </div>
                                )
                                }
                            </div>
                            <div
                                class="tab-pane fade"
                                id="v-pills-settings"
                                role="tabpanel"
                                aria-labelledby="v-pills-settings-tab"
                            >
                                Customer Type
                            </div>
                            <div
                                class="tab-pane fade"
                                id="v-pills-status"
                                role="tabpanel"
                                aria-labelledby="v-pills-settings-tab"
                            >
                                Status
                            </div>
                            <div
                                class="tab-pane fade"
                                id="v-pills-creationDate"
                                role="tabpanel"
                                aria-labelledby="v-pills-settings-tab"
                            >
                                Creation Date
                            </div>
                            <div
                                class="tab-pane fade"
                                id="v-pills-commencementDate"
                                role="tabpanel"
                                aria-labelledby="v-pills-settings-tab"
                            >
                                Commencement Date
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}
