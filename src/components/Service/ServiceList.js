import { Link } from "react-router-dom";

import filterIcon from "../../static/img/Filter.png";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import foodImg from "../../static/img/food.png";
import totalVendor from "../../static/img/total-vendor.png";
import totalMachine from "../../static/img/total-machine.png";
import ActiveMachine from "../../static/img/active-machine.png";
import inactiveMachine from "../../static/img/inactive-machine.png";
import {
  getServiceListing,
  getCount,
  getExportList,
} from "../../services/service";
import CircularProgress from "@mui/material/CircularProgress";
import {
  formatDate,
  getMenuPermissions,
  removeBaseUrlFromPath,
} from "../../helpers";

import { getListDataInPagination } from "../../services/commonServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FilterPopup from "./FilterPopup";
import {
  menuIdConstant,
  permissionCategory,
} from "../Permissions/PermissionConstants";
import { MainPageContext } from "../../Context/MainPageContext";

function ServiceList() {
  const { userPermissionList } = useContext(MainPageContext);
  const [search, setSearch] = useState(null);
  const [listPageUrl, setListPageUrl] = useState({
    next: null,
    previous: null,
  });
  const [servicelist, setServiceList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(null);
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: [],
    sub_category: [],
    vendor: [],
    status: true,
  });

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    {
      search !== null ? setIsLoading(false) : setIsLoading(true);
    }
    getServiceListing(search)
      .then((data) => {
        setServiceList(data?.results);
        setListPageUrl({ next: data?.next, previous: data?.previous });
        setIsLoading(false);
      })
      .catch((error) => {
        {
          setIsLoading(false);
          toast.error(error.response.data);
        }
      });
  }, [search]);

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
          setListPageUrl({ next: data?.next, previous: data?.previous });
          setServiceList(data?.results);
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error(error.message);
        });
  };

  useEffect(() => {
    getCount()
      .then((data) => {
        setCount({
          total_machines: data?.total_machines,
          active_machine_count: data?.active_machine_count,
          inactive_machine_count: data?.inactive_machine_count,
          total_vendor_count: data?.total_vendor_count,
        });
      })
      .catch((error) => {
        {
          setIsLoading(false);
          toast.error(error.response.data);
        }
      });
  }, []);

  return (
    <div className="page" style={{ height: "100vh", top: 20 }}>
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-lg-3">
            <div className="card card-sm" style={{ borderRadius: "12px" }}>
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <span
                      className="bg-primary text-white avatar"
                      style={{
                        borderRadius: "8px",
                        width: "50px",
                        height: "50px",
                        background:
                          "linear-gradient(135deg, #5C4AF2 0%, #988DF5 100%)",
                      }}
                    >
                      <img src={totalMachine} />
                    </span>
                  </div>
                  <div className="col">
                    <div className="font-weight-medium count_card_heading">
                      Total Machines
                    </div>
                    <div
                      className="text-secondary"
                      style={{ fontSize: "18px", fontWeight: "700" }}
                    >
                      {count?.total_machines}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="card card-sm" style={{ borderRadius: "12px" }}>
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <span
                      style={{
                        borderRadius: "8px",
                        border: "1px solid rgba(255, 255, 255, 0.30)",
                        width: "50px",
                        height: "50px",
                      }}
                    >
                      <img src={totalVendor} />
                    </span>
                  </div>
                  <div className="col">
                    <div className="font-weight-medium count_card_heading">
                      Total Vendors
                    </div>
                    <div
                      className="text-secondary"
                      style={{ fontSize: "18px", fontWeight: "700" }}
                    >
                      {count?.total_vendor_count}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="card card-sm" style={{ borderRadius: "12px" }}>
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <span
                      style={{
                        borderRadius: "8px",
                        border: "1px solid rgba(255, 255, 255, 0.30)",
                        width: "50px",
                        height: "50px",
                      }}
                    >
                      <img src={ActiveMachine} />
                    </span>
                  </div>
                  <div className="col">
                    <div className="font-weight-medium count_card_heading">
                      Active Machines
                    </div>
                    <div
                      className="text-secondary"
                      style={{ fontSize: "18px", fontWeight: "700" }}
                    >
                      {count?.active_machine_count}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="card card-sm" style={{ borderRadius: "12px" }}>
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <span
                      style={{
                        borderRadius: "8px",
                        border: "1px solid rgba(255, 255, 255, 0.30)",
                        width: "50px",
                        height: "50px",
                      }}
                    >
                      <img src={inactiveMachine} />
                    </span>
                  </div>
                  <div className="col">
                    <div className="font-weight-medium count_card_heading">
                      Inactive Machines
                    </div>
                    <div
                      className="text-secondary"
                      style={{ fontSize: "18px", fontWeight: "700" }}
                    >
                      {count?.inactive_machine_count}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 actions_menu my-2">
          <div className="action_menu_left col-8">
            <div>
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
                      onChange={(e) => setSearch(e.target.value)}
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
                    className="bg-black"
                    style={{ borderRadius: "5px", marginLeft: "5px",position:"relative" }}
                    onClick={() => setOpen(true)}
                  >
                    <img src={filterIcon} alt="filter" width={25} />
                    <span className='py-1' style={{position:"absolute",top:-10,color:"white",fontSize:"10px",backgroundColor:"#2176FF",width:"22px",height:"22px",borderRadius:"33px"}}>
                                        {filters.category.length+filters.sub_category.length+filters.vendor.length}
                                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="action_buttons col-4">
            {userPermissionList &&
              getMenuPermissions(
                userPermissionList,
                menuIdConstant.serviceManagement,
                permissionCategory.action
              ) && (
                <button
                  className="btn btn-outline"
                  style={{ borderRadius: "6px" }}
                >
                  <a
                    style={{ textDecoration: "none" }}
                    href="https://seaarabia.jicitsolution.com/service/export-service-list"
                  >
                    Export
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
                </button>
              )}
          </div>
        </div>
        <div className="card">
          <div className="table-responsive">
            <table className="table card-table table-vcenter text-nowrap datatable">
              <thead>
                <tr>
                  <th className="w-1">
                    <span>Machine Name</span>
                  </th>
                  <th>
                    <span>Category</span>
                  </th>
                  <th>
                    {" "}
                    <span>Sub Category</span>
                  </th>
                  <th>
                    <span>Vendor</span>
                  </th>
                  <th>
                    <span>Status</span>
                  </th>
                  <th>
                    <span>Bookings</span>
                  </th>
                  <th>
                    <span>Action</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {!isLoading &&
                  servicelist?.length > 0 &&
                  servicelist?.map((data) => (
                    <tr>
                      <td>
                        <span className="text-secondary">{data?.name}</span>
                      </td>

                      <td>
                        {
                          <span className="text-secondary">
                            {data?.category[0]}
                          </span>
                        }
                        <br></br>
                        {
                          <span className="text-secondary">
                            {data?.category[1]}
                          </span>
                        }
                        {data?.category.length > 2 && (
                          <span className="text-secondary">...,</span>
                        )}
                      </td>

                      <td>
                        {
                          <span className="text-secondary">
                            {data?.sub_category[0]}
                          </span>
                        }
                        <br></br>
                        {
                          <span className="text-secondary">
                            {data?.sub_category[1]}
                          </span>
                        }
                        {data?.sub_category.length > 2 && (
                          <span className="text-secondary">...,</span>
                        )}
                      </td>
                      <td>
                        <span className="text-secondary">{data?.company}</span>
                      </td>
                      <td>
                        <span className="text-secondary">
                          {data?.is_active === true ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td>
                        <span className="text-secondary">
                          {data?.total_booking}
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
                          to={"/service-view/" + data?.id}
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
                  ))}

                {servicelist.length === 0 && (
                  <tr>
                    <td rowSpan={8}>No Record Found</td>
                  </tr>
                )}
                {isLoading && (
                  <tr>
                    <td colSpan={"8"} align="center">
                      <CircularProgress />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="d-flex align-items-center">
            <ul className="pagination m-0 ms-auto">
              <li
                className={`page-item  ${!listPageUrl.previous && "disabled"}`}
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
      {open && <FilterPopup open={open} setIsLoading={setIsLoading} setServiceList={setServiceList} setListPageUrl={setListPageUrl} handleClose={handleClose} setFilters={setFilters} filters={filters}/>}
    </div>
  );
}

export default ServiceList;
