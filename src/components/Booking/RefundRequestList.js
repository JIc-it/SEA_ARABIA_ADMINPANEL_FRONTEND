import React, { useContext, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import Footer from "../Common/Footer";
import ListCards from "../ListCards";
import { getListDataInPagination } from "../../services/commonServices";
import {
  getMenuPermissions,
  removeBaseUrlFromPath,
} from "../../helpers";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { getBookingList, getRefundRequestCount, getRefundRequestExport } from "../../services/booking";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  menuIdConstant,
  permissionCategory,
} from "../Permissions/PermissionConstants";
import { MainPageContext } from "../../Context/MainPageContext";
import RefundRequestFilter from "./RefundRequestFilter";
import ReactPaginate from "react-paginate";
import { API_BASE_URL } from "../../services/authHandle";


const RefundRequestList = () => {
  const { userPermissionList } = useContext(MainPageContext);
  const getPermission=userPermissionList?.filter((data)=>data.id==="7")[0]?.permissionCategory.some((item)=>item.item==="Action" && item.value===true)
  const itemsPerPage=10;
  const [totalPages,setTotalPages] = useState(0);
  const [currentPage,setCurrentPage]=useState(0)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [filters, setFilters] = useState({
    category: [],
    vendor: [],
   customer:[],
   guest:[],
   customer_type:[],
   role:[],
   creation_date:{
    from:"",
    to:""
   },
   cancelled_on:{
    from:"",
    to:""
   }
  });

  const [search, setSearch] = useState("");
  const [listPageUrl, setListPageUrl] = useState({
    next: null,
    previous: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const [bookingList, setBookingList] = useState([]);
  const [count, setCount] = useState({});
  const [csvData, setCSVData] = useState([])

  useEffect(() => {
    {
      search.trim() !== "" ? setIsLoading(false) : setIsLoading(true);
    }
    const pass = {
      status: "Cancelled",
      search: search,
      refund_status: "Pending",
    };
    getBookingList(pass)
      .then((data) => {
        setIsLoading(false);
        setTotalPages(Math.ceil(data?.count/itemsPerPage))
        setListPageUrl({ next: data.next, previous: data.previous });
        setBookingList(data?.results);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  }, [search]);

  useEffect(() => {
    getRefundRequestCount()
      .then((data) => {
        setIsLoading(false);
        setCount({
          refund_request_count: data.refund_request_count,
          cancelled_by_vendor: data.cancelled_by_vendor,
          cancelled_by_user: data.cancelled_by_user,
        });
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  }, []);

  useEffect(()=>{
    if(getPermission){
      getRefundRequestExport()
      .then((data) => {
        setCSVData(data)
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
    }
    
  },[getPermission])
  
  const handlePageClick = (data) => {
    setCurrentPage(data.selected)
    const newPage = data.selected;
    const newStartIndex = newPage * itemsPerPage;

    setIsLoading(true);
    // setCurrentPage(newPage);

    getListDataInPagination(`${API_BASE_URL}booking/bookings/admin/?status=Cancelled&refund_status=Pending&limit=${itemsPerPage}&offset=${newStartIndex}`)
      .then((data) => {
        setIsLoading(false);
        setBookingList(data?.results);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };
  let checkfilterslength=filters.category?.length >0 || filters.vendor?.length > 0 || filters.customer?.length>0 || filters.guest?.length >0 || filters.customer_type?.length > 0 || filters.role?.length >0 || filters.creation_date.from !=="" || filters.creation_date.to !=="" || filters.cancelled_on.from !=="" || filters.cancelled_on.to !==""

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
                    firstLabel={"Pending Refund Requests"}
                    firstIcon={
                      <svg
                        width={40}
                        height={40}
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          opacity="0.5"
                          cx="20.0002"
                          cy="19.9987"
                          r="16.6667"
                          fill="white"
                        />
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
                    firstCount={count?.refund_request_count}
                    secondLabel={"Cancellation By Vendor"}
                    secondIcon={
                      <svg
                        width="57"
                        height="56"
                        viewBox="0 0 57 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.666504"
                          width="56"
                          height="56"
                          rx="8"
                          fill="url(#paint0_linear_2973_59778)"
                        />
                        <rect
                          x="1.1665"
                          y="0.5"
                          width="55"
                          height="55"
                          rx="7.5"
                          stroke="white"
                          stroke-opacity="0.3"
                        />
                        <path
                          opacity="0.5"
                          d="M19.2221 11.332H38.1109C38.6269 11.332 38.8848 11.332 39.1023 11.352C41.5195 11.5739 43.436 13.5846 43.6475 16.1207C43.6665 16.3489 43.6665 16.6195 43.6665 17.1608V41.765C43.6665 43.2192 41.902 43.8363 41.0704 42.6729C40.4934 41.8659 39.3396 41.8659 38.7627 42.6729L38.0415 43.6818C37.104 44.9932 35.229 44.9932 34.2915 43.6818C33.354 42.3703 31.479 42.3703 30.5415 43.6818C29.604 44.9932 27.729 44.9932 26.7915 43.6818C25.854 42.3703 23.979 42.3703 23.0415 43.6818C22.104 44.9932 20.229 44.9932 19.2915 43.6818L18.5704 42.6729C17.9934 41.8659 16.8396 41.8659 16.2627 42.6729C15.431 43.8363 13.6665 43.2192 13.6665 41.765V17.1608C13.6665 16.6195 13.6665 16.3489 13.6855 16.1207C13.897 13.5846 15.8135 11.5739 18.2307 11.352C18.4482 11.332 18.7062 11.332 19.2221 11.332Z"
                          fill="white"
                        />
                        <path
                          d="M26.2171 20.4481C25.7289 19.96 24.9375 19.96 24.4493 20.4481C23.9612 20.9363 23.9612 21.7278 24.4493 22.2159L26.8988 24.6654L24.4493 27.1148C23.9612 27.603 23.9612 28.3944 24.4493 28.8826C24.9375 29.3707 25.729 29.3707 26.2171 28.8826L28.6665 26.4331L31.116 28.8826C31.6041 29.3707 32.3956 29.3707 32.8837 28.8826C33.3719 28.3944 33.3719 27.6029 32.8837 27.1148L30.4343 24.6654L32.8837 22.2159C33.3719 21.7278 33.3719 20.9363 32.8837 20.4482C32.3956 19.96 31.6041 19.96 31.116 20.4482L28.6665 22.8976L26.2171 20.4481Z"
                          fill="white"
                        />
                        <path
                          d="M21.1665 32.582C20.4761 32.582 19.9165 33.1417 19.9165 33.832C19.9165 34.5224 20.4761 35.082 21.1665 35.082H36.1665C36.8569 35.082 37.4165 34.5224 37.4165 33.832C37.4165 33.1417 36.8569 32.582 36.1665 32.582H21.1665Z"
                          fill="white"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_2973_59778"
                            x1="0.666504"
                            y1="0"
                            x2="56.6665"
                            y2="56"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#DC5B32" />
                            <stop offset="1" stop-color="#FF8E6A" />
                          </linearGradient>
                        </defs>
                      </svg>
                    }
                    secondCount={count?.cancelled_by_vendor}
                    thirdLabel={"Cancellation By Customer"}
                    thirdIcon={
                      <svg
                        width="57"
                        height="56"
                        viewBox="0 0 57 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.666504"
                          width="56"
                          height="56"
                          rx="8"
                          fill="url(#paint0_linear_2973_59778)"
                        />
                        <rect
                          x="1.1665"
                          y="0.5"
                          width="55"
                          height="55"
                          rx="7.5"
                          stroke="white"
                          stroke-opacity="0.3"
                        />
                        <path
                          opacity="0.5"
                          d="M19.2221 11.332H38.1109C38.6269 11.332 38.8848 11.332 39.1023 11.352C41.5195 11.5739 43.436 13.5846 43.6475 16.1207C43.6665 16.3489 43.6665 16.6195 43.6665 17.1608V41.765C43.6665 43.2192 41.902 43.8363 41.0704 42.6729C40.4934 41.8659 39.3396 41.8659 38.7627 42.6729L38.0415 43.6818C37.104 44.9932 35.229 44.9932 34.2915 43.6818C33.354 42.3703 31.479 42.3703 30.5415 43.6818C29.604 44.9932 27.729 44.9932 26.7915 43.6818C25.854 42.3703 23.979 42.3703 23.0415 43.6818C22.104 44.9932 20.229 44.9932 19.2915 43.6818L18.5704 42.6729C17.9934 41.8659 16.8396 41.8659 16.2627 42.6729C15.431 43.8363 13.6665 43.2192 13.6665 41.765V17.1608C13.6665 16.6195 13.6665 16.3489 13.6855 16.1207C13.897 13.5846 15.8135 11.5739 18.2307 11.352C18.4482 11.332 18.7062 11.332 19.2221 11.332Z"
                          fill="white"
                        />
                        <path
                          d="M26.2171 20.4481C25.7289 19.96 24.9375 19.96 24.4493 20.4481C23.9612 20.9363 23.9612 21.7278 24.4493 22.2159L26.8988 24.6654L24.4493 27.1148C23.9612 27.603 23.9612 28.3944 24.4493 28.8826C24.9375 29.3707 25.729 29.3707 26.2171 28.8826L28.6665 26.4331L31.116 28.8826C31.6041 29.3707 32.3956 29.3707 32.8837 28.8826C33.3719 28.3944 33.3719 27.6029 32.8837 27.1148L30.4343 24.6654L32.8837 22.2159C33.3719 21.7278 33.3719 20.9363 32.8837 20.4482C32.3956 19.96 31.6041 19.96 31.116 20.4482L28.6665 22.8976L26.2171 20.4481Z"
                          fill="white"
                        />
                        <path
                          d="M21.1665 32.582C20.4761 32.582 19.9165 33.1417 19.9165 33.832C19.9165 34.5224 20.4761 35.082 21.1665 35.082H36.1665C36.8569 35.082 37.4165 34.5224 37.4165 33.832C37.4165 33.1417 36.8569 32.582 36.1665 32.582H21.1665Z"
                          fill="white"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_2973_59778"
                            x1="0.666504"
                            y1="0"
                            x2="56.6665"
                            y2="56"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#DC5B32" />
                            <stop offset="1" stop-color="#FF8E6A" />
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
              <div className="col-12 actions_menu my-2 mt-3">
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
                        >
                          Search
                        </button>
                      </div>
                      <button
                        className="btn  filter-button  "
                        style={{ borderRadius: "6px", marginLeft: "10px",position:"relative" }}
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
                        <span className='py-1' style={{position:"absolute",top:-12,right:-10,color:"white",fontSize:"10px",backgroundColor:"#2176FF",width:"22px",height:"22px",borderRadius:"33px"}}>
                          {filters.category.length + filters.vendor.length + filters.customer.length + filters.guest.length + filters.customer_type.length + filters.role.length + (filters.creation_date.from !== "" && filters.creation_date.to !== "" ? 2 : filters.creation_date.from !== "" ? 1 : filters.creation_date.to !== "" ? 1 : 0) + (filters.cancelled_on?.from !== "" && filters.cancelled_on?.to !== "" ? 2 : filters.cancelled_on?.from !== "" ? 1 : filters.cancelled_on?.to !== "" ? 1 : 0)}
                                    </span>
                      </button>
                      {checkfilterslength && <button className="mx-3 px-3 py-2 btn" style={{color:"#ffff",backgroundColor:"#2176FF"}} onClick={()=> {
                        if(checkfilterslength){
                          window.location.reload();
                        }
                      }}>Clear Filter</button>}
                    </div>
                  </div>
                </div>
                <div className="action_buttons col-4">
                  {userPermissionList &&
                    getMenuPermissions(
                      userPermissionList,
                      menuIdConstant.booking,
                      permissionCategory.action
                    ) && (
                      <CSVLink data={csvData}  filename={"Refund_Request_List.csv"} style={{textDecoration:"none",borderRadius: "6px"}}  className="btn btn-outline">
                Export
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
                </CSVLink>
                    )}
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
                          <span>Initiated By</span>
                        </th>
                        <th>
                          <span>Cancelled On</span>
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
                          {bookingList?.length > 0 &&
                            bookingList.map((data) => (
                              <tr>
                                <td>
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
                                    {data?.user_type === "Registered"
                                      ? data?.user?.first_name
                                      : data?.guest?.first_name}
                                  </span>
                                </td>
                                <td>
                                  <span className="text-secondary">
                                    {data?.user?.role}
                                  </span>
                                </td>
                                <td>
                                  <span className="text-secondary">
                                    {new Date(
                                      data?.cancelled_date
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
                                    to={`/refunds-request/${data?.id}/`}
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
                      {bookingList.length === 0 && (
                        <tr>
                          <td colSpan={"8"} align="center" style={{fontWeight:550}}>
                            No Data
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {totalPages > 0 && <div className="d-flex justify-content-center align-items-center mt-5">
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next >"
                    onPageChange={handlePageClick}
                    forcePage={currentPage}
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
                </div>}
              </div>
              {open && <RefundRequestFilter open={open} handleClose={handleClose} setIsLoading={setIsLoading} isLoading={isLoading} setFilters={setFilters} filters={filters} setBookingList={setBookingList} setTotalPages={setTotalPages} 
              itemsPerPage={itemsPerPage} checkfilterslength={checkfilterslength}/>}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default RefundRequestList;
