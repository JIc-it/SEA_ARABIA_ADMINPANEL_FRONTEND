import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import CircularProgress from "@mui/material/CircularProgress";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { PassingformatDate } from '../../helpers';
import { getDiscountOfferList } from '../../services/offers';

export default function PopupFilter({ open, handleClose,setTotalPages,itemsPerPage,setOffersList,setFilters,filters,ClearFilter}) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "70%",
        bgcolor: 'background.paper',
        borderRadius: "5px",
        boxShadow: 24,
        p: 4,
        overflowY: 'auto', // Add this line for vertical scroll
        maxHeight: '90vh', // Adjust the maximum height if needed
    };
    
    const [isLoading, setIsLoading] = useState(false);
    const [active, setActive] = useState("status");    

   
        const applyFilter= async () => {
            setIsLoading(true);
            if (!isLoading) {
                try {
                    const checkstatus=(filters.status.active && filters.status.inactive) ? "": filters.status.active ?  true :filters.status.inactive &&  false
                    const statuscheck={ 
                        status:checkstatus,
                        startdate: filters.startdate!=="" ? PassingformatDate(filters.startdate):"",
                        enddate: filters.enddate !=="" ? PassingformatDate(filters.enddate):""}
                    const adminData = await getDiscountOfferList("",statuscheck);

                    if (adminData) {
                        setIsLoading(false);
                        handleClose()
                        setTotalPages(Math.ceil(adminData?.count / itemsPerPage))
                        setOffersList(adminData.results);
                    } else {
                        setIsLoading(false);
                        toast.error(adminData.error.response.data)
                    }
                    setIsLoading(false);
                } catch (err) {
                    setIsLoading(false);
                    toast.error(err.message)
                }
            }
        }
    


    return (
        <>
            {!isLoading && <div >

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
                            onClick={()=>{handleClose()}
                            }
                            aria-label="close"
                            sx={{ position: 'absolute', top: 8, right: 14 }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <form onSubmit={applyFilter}>
                            {<div class={filters.status.active === true ? "frame-427319784 mt-2" : filters.status.inactive === true ? "frame-427319784 mt-2" : filters.startdate !== null ? "frame-427319784 mt-2" : filters.enddate !== null ? "frame-427319784 mt-2" : "frame-427319784 mt-2"}>

                                {<div class="components-selection-item mx-1">
                                    <div class="frame-427319782">
                                        <div class="frame-427319783">
                                            <div>Status</div>
                                            <div class="div">:</div>
                                        </div>
                                        <div class="completed-unsuccessful">{filters.status.active===true && filters.status.inactive===true ? "Active - Inactive":filters.status.active===true ? "Active":filters.status.inactive===true ? "Inactive":"None"}</div>
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
                                        </div>
                                    </div>
                                </div>}
                                {filters.startdate !== "" && <div class="components-selection-item">
                                    <div class="frame-427319782">
                                        <div class="frame-427319783">
                                            <div>Start Date</div>
                                            <div class="div">:</div>
                                        </div>
                                        <div class="completed-unsuccessful">{PassingformatDate(filters.startdate)}</div>
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
                                                onClick={() =>{
                                                    setFilters((prev)=>{return {...prev,startdate:""}})
                                                }}
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
                                </div>}
                                {filters.enddate !== "" && <div class="components-selection-item mx-1">
                                    <div class="frame-427319782">
                                        <div class="frame-427319783">
                                            <div>End Date</div>
                                            <div class="div">:</div>
                                        </div>
                                        <div class="completed-unsuccessful">{PassingformatDate(filters.enddate)}</div>
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
                                                onClick={() => {
                                                setFilters((prev)=>{return {...prev,enddate:""}})}}
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
                                </div>}
                            </div>}
                            <br /><br />
                            <div class="d-flex align-items-start">
                                <div class="frame-427319790" style={{ height: "50vh", width: "20%" }}>
                                    <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                        <small>Discounts</small>
                                        <button style={{
                                            width: "12vw",
                                            backgroundColor: "white",
                                            border: active === "status" ? "1px solid #2176FF" : "",
                                        }}
                                            class="nav-link active mt-2 d-flex justify-content-between" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true" onClick={() => setActive("status")}>
                                                <span> Status</span>
                                            <span
                                                className="py-1"
                                                style={{
                                                    color: "white",
                                                    fontSize: "12px",
                                                    backgroundColor:
                                                        active === "status" ? "#2176FF" : "gray",
                                                    width: "22px",
                                                    height: "22px",
                                                    borderRadius: "33px",
                                                }}
                                            >
                                                {(filters.status.active && filters.status.inactive) ? 2: filters.status.active? 1:filters.status.inactive? 1:0}
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
                                                        stroke={active === "status" ? "#2176FF" : "gray"}
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </span>
                                        </button>
                                        <small className='mt-2'>Date</small>
                                        <button  onClick={() => setActive("expiry")} id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false"  style={{
                                            width: "12vw",
                                            backgroundColor: "white",
                                            border: active === "expiry" ? "1px solid #2176FF" : "",
                                        }}
                                            class="nav-link  mt-2 d-flex justify-content-between">
                                            <span>Expiry Date</span>
                                            <span
                                                className="py-1"
                                                style={{
                                                    color: "white",
                                                    fontSize: "12px",
                                                    backgroundColor:
                                                        active === "expiry" ? "#2176FF" : "gray",
                                                    width: "22px",
                                                    height: "22px",
                                                    borderRadius: "33px",
                                                }}
                                            >
                                                {(filters.startdate !=="" && filters.enddate !=="") ? 2: filters.startdate !==""? 1:filters.enddate !==""? 1:0}
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
                                                        stroke={active === "expiry" ? "#2176FF" : "gray"}
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </span>
                                            </button>
                                    </div>
                                </div>


                                <div class="tab-content" id="v-pills-tabContent" style={{ position: "relative", left: 20 }}>
                                    <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                        <h4>Status</h4>
                                        <br />
                                        <div class="form-check">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id=""
                                        defaultChecked={filters.status.active===true}
                                        onChange={(e) => {
                                            setFilters((prev) => {
                                                return { ...prev, status:{active:!prev.status.active,inactive:prev.status.inactive} }
                                            })
                                           
                                        }}
                                        style={{ width: 20, height: 20 }}
                                    />
                                    <label class="form-check-label" for="Boat">
                                        {"Active"}
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id=""
                                        defaultChecked={filters.status.inactive===true}
                                        onChange={(e) => {
                                            setFilters((prev) => {
                                                return { ...prev, status:{inactive:!prev.status.inactive,active:prev.status.active} }
                                            });
                                          
                                        }}
                                        style={{ width: 20, height: 20 }}
                                    />
                                    <label class="form-check-label" for="Boat">
                                        {"Inactive"}
                                    </label>
                                </div>
                                    </div>

                                    <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                                        <h4>Expiry Date</h4>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div className='mx-5'>
                                                <label class="form-check-label mb-2" for="Boat">
                                                    From
                                                </label>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker
                                                        value={filters?.startdate}
                                                        onChange={(newValue) => {
                                                           
                                                            setFilters((prev) => { return { ...prev, startdate: newValue } })
                                                    }}
                                                    />

                                                </LocalizationProvider>
                                            </div>
                                            <div>
                                                <label class="form-check-label mb-2" for="Boat">
                                                    To
                                                </label>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker
                                                        value={filters?.enddate}
                                                        onChange={(newValue) => {
                                                            setFilters((prev) => { return { ...prev, enddate: newValue } });
                                                        }}
                                                    />
                                                </LocalizationProvider>
                                            </div>
                                        </div>
                                        <br />
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex justify-content-end mt-3'>
                                <button type='reset' className='m-1 btn btn-small btn-white' onClick={ClearFilter}>Clear Filter</button>
                                <button type='submit' className='m-1 btn btn-small' style={{ backgroundColor: "#006875", color: "white" }}>Apply Filter</button>
                            </div>
                        </form>
                    </Box>
                </Modal>
            </div>}
            {isLoading &&
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CircularProgress />
                </div>
            }
        </>
    );
}
