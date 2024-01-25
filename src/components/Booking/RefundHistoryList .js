import React, { useContext, useEffect, useState } from "react";
import Footer from "../Common/Footer";
import ListCards from "../ListCards";
import { getListDataInPagination } from "../../services/commonServices";
import { formatDate, getMenuPermissions, removeBaseUrlFromPath } from "../../helpers";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { getBookingList,getRefundHistoryCount } from "../../services/booking"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { menuIdConstant, permissionCategory } from "../Permissions/PermissionConstants";
import { MainPageContext } from "../../Context/MainPageContext";
import { API_BASE_URL } from "../../services/authHandle";

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

const RefundHistoryList  = () => {
  const { userPermissionList } = useContext(MainPageContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [search, setSearch] = useState("");

  const [listPageUrl, setListPageUrl] = useState({
    next: null,
    previous: null,
  });
  const [isRefetch, setIsRefetch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
 
  const [bookingList, setBookingList] = useState([]);
  const [count,setCount]=useState({})

  useEffect(() => {
    {search.trim()!=="" ? setIsLoading(false):setIsLoading(true);}
    const statuspass={status:"Cancelled",refund_status:"Completed",search:search}
    getBookingList(statuspass)
      .then((data) => {
        setIsLoading(false);
        setListPageUrl({ next: data.next, previous: data.previous });
        setBookingList(data?.results);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.response.data)
      });
  }, [search]);

  useEffect(()=>{
    getRefundHistoryCount()
      .then((data) => {
        setIsLoading(false);
        setCount({
          refund_request_count:data.refund_request_count,
          cancelled_by_vendor:data.cancelled_by_vendor,
          cancelled_by_user:data.cancelled_by_user
        });
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.response.data)
      });
  },[])


  
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
          setBookingList(data?.results);
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
                    firstLabel={"All Refunds"}
                    firstIcon={
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M33.3335 17.0847C33.849 17.0847 34.3116 16.7682 34.4985 16.2878C34.6853 15.8074 34.5581 15.2615 34.1782 14.9132L24.1782 5.74655C23.8127 5.41159 23.2839 5.32421 22.8302 5.52381C22.3764 5.72341 22.0835 6.17229 22.0835 6.66799L22.0835 33.3347C22.0835 34.025 22.6431 34.5847 23.3335 34.5847C24.0239 34.5847 24.5835 34.025 24.5835 33.3347L24.5835 17.0847L33.3335 17.0847Z" fill="white" />
                        <path opacity="0.5" d="M6.66655 22.918L15.4165 22.918V6.66797C15.4165 5.97761 15.9762 5.41797 16.6665 5.41797C17.3569 5.41797 17.9165 5.97761 17.9165 6.66797V33.3346C17.9165 33.8303 17.6236 34.2792 17.1699 34.4788C16.7161 34.6784 16.1873 34.591 15.8219 34.2561L5.8219 25.0894C5.44191 24.7411 5.31471 24.1952 5.50158 23.7148C5.68846 23.2344 6.15107 22.918 6.66655 22.918Z" fill="white" />
                      </svg>


                      
                    }
                    firstCount={count?.refund_request_count}
                    secondLabel={"Cancellation By Vendor"}
                    secondIcon={
                      <svg width="57" height="56" viewBox="0 0 57 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.666504" width="56" height="56" rx="8" fill="url(#paint0_linear_2973_59778)" />
                        <rect x="1.1665" y="0.5" width="55" height="55" rx="7.5" stroke="white" stroke-opacity="0.3" />
                        <path opacity="0.5" d="M19.2221 11.332H38.1109C38.6269 11.332 38.8848 11.332 39.1023 11.352C41.5195 11.5739 43.436 13.5846 43.6475 16.1207C43.6665 16.3489 43.6665 16.6195 43.6665 17.1608V41.765C43.6665 43.2192 41.902 43.8363 41.0704 42.6729C40.4934 41.8659 39.3396 41.8659 38.7627 42.6729L38.0415 43.6818C37.104 44.9932 35.229 44.9932 34.2915 43.6818C33.354 42.3703 31.479 42.3703 30.5415 43.6818C29.604 44.9932 27.729 44.9932 26.7915 43.6818C25.854 42.3703 23.979 42.3703 23.0415 43.6818C22.104 44.9932 20.229 44.9932 19.2915 43.6818L18.5704 42.6729C17.9934 41.8659 16.8396 41.8659 16.2627 42.6729C15.431 43.8363 13.6665 43.2192 13.6665 41.765V17.1608C13.6665 16.6195 13.6665 16.3489 13.6855 16.1207C13.897 13.5846 15.8135 11.5739 18.2307 11.352C18.4482 11.332 18.7062 11.332 19.2221 11.332Z" fill="white" />
                        <path d="M26.2171 20.4481C25.7289 19.96 24.9375 19.96 24.4493 20.4481C23.9612 20.9363 23.9612 21.7278 24.4493 22.2159L26.8988 24.6654L24.4493 27.1148C23.9612 27.603 23.9612 28.3944 24.4493 28.8826C24.9375 29.3707 25.729 29.3707 26.2171 28.8826L28.6665 26.4331L31.116 28.8826C31.6041 29.3707 32.3956 29.3707 32.8837 28.8826C33.3719 28.3944 33.3719 27.6029 32.8837 27.1148L30.4343 24.6654L32.8837 22.2159C33.3719 21.7278 33.3719 20.9363 32.8837 20.4482C32.3956 19.96 31.6041 19.96 31.116 20.4482L28.6665 22.8976L26.2171 20.4481Z" fill="white" />
                        <path d="M21.1665 32.582C20.4761 32.582 19.9165 33.1417 19.9165 33.832C19.9165 34.5224 20.4761 35.082 21.1665 35.082H36.1665C36.8569 35.082 37.4165 34.5224 37.4165 33.832C37.4165 33.1417 36.8569 32.582 36.1665 32.582H21.1665Z" fill="white" />
                        <defs>
                          <linearGradient id="paint0_linear_2973_59778" x1="0.666504" y1="0" x2="56.6665" y2="56" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#DC5B32" />
                            <stop offset="1" stop-color="#FF8E6A" />
                          </linearGradient>
                        </defs>
                      </svg>

                    }
                    secondCount={count?.cancelled_by_vendor}
                    thirdLabel={"Cancellation By Customer"}
                    thirdIcon={
                      <svg width="57" height="56" viewBox="0 0 57 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0.666504" width="56" height="56" rx="8" fill="url(#paint0_linear_2973_59778)"/>
                      <rect x="1.1665" y="0.5" width="55" height="55" rx="7.5" stroke="white" stroke-opacity="0.3"/>
                      <path opacity="0.5" d="M19.2221 11.332H38.1109C38.6269 11.332 38.8848 11.332 39.1023 11.352C41.5195 11.5739 43.436 13.5846 43.6475 16.1207C43.6665 16.3489 43.6665 16.6195 43.6665 17.1608V41.765C43.6665 43.2192 41.902 43.8363 41.0704 42.6729C40.4934 41.8659 39.3396 41.8659 38.7627 42.6729L38.0415 43.6818C37.104 44.9932 35.229 44.9932 34.2915 43.6818C33.354 42.3703 31.479 42.3703 30.5415 43.6818C29.604 44.9932 27.729 44.9932 26.7915 43.6818C25.854 42.3703 23.979 42.3703 23.0415 43.6818C22.104 44.9932 20.229 44.9932 19.2915 43.6818L18.5704 42.6729C17.9934 41.8659 16.8396 41.8659 16.2627 42.6729C15.431 43.8363 13.6665 43.2192 13.6665 41.765V17.1608C13.6665 16.6195 13.6665 16.3489 13.6855 16.1207C13.897 13.5846 15.8135 11.5739 18.2307 11.352C18.4482 11.332 18.7062 11.332 19.2221 11.332Z" fill="white"/>
                      <path d="M26.2171 20.4481C25.7289 19.96 24.9375 19.96 24.4493 20.4481C23.9612 20.9363 23.9612 21.7278 24.4493 22.2159L26.8988 24.6654L24.4493 27.1148C23.9612 27.603 23.9612 28.3944 24.4493 28.8826C24.9375 29.3707 25.729 29.3707 26.2171 28.8826L28.6665 26.4331L31.116 28.8826C31.6041 29.3707 32.3956 29.3707 32.8837 28.8826C33.3719 28.3944 33.3719 27.6029 32.8837 27.1148L30.4343 24.6654L32.8837 22.2159C33.3719 21.7278 33.3719 20.9363 32.8837 20.4482C32.3956 19.96 31.6041 19.96 31.116 20.4482L28.6665 22.8976L26.2171 20.4481Z" fill="white"/>
                      <path d="M21.1665 32.582C20.4761 32.582 19.9165 33.1417 19.9165 33.832C19.9165 34.5224 20.4761 35.082 21.1665 35.082H36.1665C36.8569 35.082 37.4165 34.5224 37.4165 33.832C37.4165 33.1417 36.8569 32.582 36.1665 32.582H21.1665Z" fill="white"/>
                      <defs>
                      <linearGradient id="paint0_linear_2973_59778" x1="0.666504" y1="0" x2="56.6665" y2="56" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#DC5B32"/>
                      <stop offset="1" stop-color="#FF8E6A"/>
                      </linearGradient>
                      </defs>
                      </svg>
                      
                    }
                    thirdCount={count?.cancelled_by_user}
                    fourthLabel={""}
                    fourthIcon={""}
                    fourthCount={""}
                  />
                </div>

                {/* <Table /> */}
              </div>
              <div className="col-12 actions_menu my-2">
                <div className="action_menu_left col-8">
                  <div>
                    <div
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
                    </div>
                  </div>
                </div>
                <div className="action_buttons col-4">
              {  userPermissionList &&
                    getMenuPermissions(
                      userPermissionList,
                      menuIdConstant.booking,
                      permissionCategory.action
                    ) &&  <button
                    className="btn btn-outline"
                    style={{ borderRadius: "6px" }}
                  >
                    <a style={{textDecoration:"none"}} href={`${API_BASE_URL}booking/refund-history-export/`}>
                    Export &nbsp;
                    </a>
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
                  </button>}
                  {/*<button
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
                        </button>*/}
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
                          {bookingList?.length>0 && 
                          bookingList?.map((data)=>
                          <tr>
                            {console.log(data)}
                            <td>
                              <span className="text-secondary">
                              {data.booking_id}
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">{data.booking_item}</span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                {data?.service?.category?.map((items)=>
                                items.name
                                )}
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">{data?.service?.company}</span>
                            </td>
                            <td>
                              <span className="text-secondary">
                              {data?.user_type==="Registered"? data?.user?.first_name:data?.guest?.first_name}
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                {data?.user?.role}
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                {new Date(data?.cancelled_date).toLocaleDateString("es-CL")}
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                {new Date(data?.created_at).toLocaleDateString("es-CL")}
                              </span>
                            </td>
                            <td>
                              <span
                                className="badge  text-blue-fg "
                                style={{
                                  width: "100px",
                                  padding: "7px 9px 5px 9px ",
                                  borderRadius: "4px",
                                  background:data?.status==="Completed"? "#13B370":data?.status==="Unsuccessful"?"#DC7932":data?.status==="Cancelled"?"#DE4E21":"#2684FC",
                                  
                                }}
                              >
                                {data?.status ? data?.status: "-"}
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
                                to={`/refunds-history/${data?.id}/`}
                               

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
                          
                          )
                          }
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
                  {
                    bookingList.length === 0 &&
                    (<div style={{ height: "5vh", marginTop: "50px" }} >
                      <p style={{ textAlign: "center", fontWeight: 550 }}>No Record Found</p>
                    </div>)
                  }
                </div>
                <div className="card-footer d-flex align-items-center">
                  {/* <p className="m-0 text-secondary">
            Showing <span>1</span> to <span>8</span> of
            <span>16</span> entries
          </p> */}
                  <ul className="pagination m-0 ms-auto">
                    <li
                      className={`page-item  ${
                        !listPageUrl.previous && "disabled"
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
                      className={`page-item  ${
                        !listPageUrl.next && "disabled"
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

export default RefundHistoryList ;
