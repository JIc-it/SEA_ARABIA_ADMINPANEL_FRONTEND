import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const VendorFilterPopup = ({ open, handleClose }) => {
  const popUpStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    // border: '2px solid #000',
    boxShadow: 24,
    padding: "10px",
    borderRadius: "6px",
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={popUpStyle}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                    Text in a modal
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                  </Typography> */}
          <div>
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
          <div class="frame-427319784">
            <div class="components-selection-item">
              <div class="frame-427319782">
                <div class="frame-427319783">
                  <div class="category">Vendor</div>
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
                  class="nav-link active"
                  id="v-pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-home"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-home"
                  aria-selected="true"
                >
                  Category
                </button>
                <button
                  class="nav-link"
                  id="v-pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-profile"
                  aria-selected="false"
                >
                  Vendor
                </button>
                <small>Customer</small>
                <button
                  class="nav-link"
                  id="v-pills-messages-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-messages"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-messages"
                  aria-selected="false"
                >
                  Customer
                </button>
                <button
                  class="nav-link"
                  id="v-pills-settings-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-settings"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-settings"
                  aria-selected="false"
                >
                  Customer Type
                </button>
                <small>Booking</small>
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
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="Boat"
                    style={{ width: 20, height: 20 }}
                  />
                  <label class="form-check-label" for="Boat">
                    Boat
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="Boat"
                    style={{ width: 20, height: 20 }}
                  />
                  <label class="form-check-label" for="Boat">
                    Yatch
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="Boat"
                    style={{ width: 20, height: 20 }}
                  />
                  <label class="form-check-label" for="Boat">
                    JAt Ski
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="Boat"
                    style={{ width: 20, height: 20 }}
                  />
                  <label class="form-check-label" for="Boat">
                    Hot air Balloon
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="Boat"
                    style={{ width: 20, height: 20 }}
                  />
                  <label class="form-check-label" for="Boat">
                    Desert Safari
                  </label>
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
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="Boat"
                    style={{ width: 20, height: 20 }}
                  />
                  <label class="form-check-label" for="Boat">
                    Salma international
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="Boat"
                    style={{ width: 20, height: 20 }}
                  />
                  <label class="form-check-label" for="Boat">
                    Uber Marine Company
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="Boat"
                    style={{ width: 20, height: 20 }}
                  />
                  <label class="form-check-label" for="Boat">
                    Ghanayem El-Khair
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="Boat"
                    style={{ width: 20, height: 20 }}
                  />
                  <label class="form-check-label" for="Boat">
                    Flyworld
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="Boat"
                    style={{ width: 20, height: 20 }}
                  />
                  <label class="form-check-label" for="Boat">
                    Vanuatu
                  </label>
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
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="Boat"
                    style={{ width: 20, height: 20 }}
                  />
                  <label class="form-check-label" for="Boat">
                    Shaheel Arham
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="Boat"
                    style={{ width: 20, height: 20 }}
                  />
                  <label class="form-check-label" for="Boat">
                    Jane Cooper
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="Boat"
                    style={{ width: 20, height: 20 }}
                  />
                  <label class="form-check-label" for="Boat">
                    Esther Howard
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="Boat"
                    style={{ width: 20, height: 20 }}
                  />
                  <label class="form-check-label" for="Boat">
                    Cobi Keller
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="Boat"
                    style={{ width: 20, height: 20 }}
                  />
                  <label class="form-check-label" for="Boat">
                    Manolo Cannon
                  </label>
                </div>
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
          <div className="my-3 d-flex " style={{ justifyContent: "end" }}>
            <button
              className="btn btn-outline mx-2"
              style={{ borderRadius: "6px" }}
            >
              Clear Filter &nbsp;
            </button>
            <button
              className="btn btn-info vendor_button"
              style={{ borderRadius: "6px" }}
              type="button"
            >
              Apply Filter &nbsp;
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default VendorFilterPopup;
