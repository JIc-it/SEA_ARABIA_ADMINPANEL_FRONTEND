import { Link } from "react-router-dom";

import filterIcon from "../../static/img/Filter.png";
import { useContext, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import totalVendor from "../../static/img/total-vendor.png";
import totalMachine from "../../static/img/total-machine.png";
import ActiveMachine from "../../static/img/active-machine.png";
import inactiveMachine from "../../static/img/inactive-machine.png";
import {
  getServiceListing,
  getCount,
  getExport
} from "../../services/service";
import CircularProgress from "@mui/material/CircularProgress";
import {
  getMenuPermissions,
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
import ReactPaginate from "react-paginate";
import { API_BASE_URL } from "../../services/authHandle";

function ServiceList() {
  const { userPermissionList } = useContext(MainPageContext);
  const getPermission = userPermissionList?.filter((data) => data.id === "7")[0]?.permissionCategory.some((item) => item.item === "Action" && item.value === true)

  const [search, setSearch] = useState(null);
  const [csvData, setCSVData] = useState([])

  const [servicelist, setServiceList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(null);
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: [],
    sub_category: [],
    vendor: [],
    status: {
      active: "",
      inactive: ""
    },
  });


  const itemsPerPage=10;
  const [currentPage,setCurrentPage]=useState(0)
  const [totalPages,setTotalPages] = useState(0);


  let checkfilterslength = filters.category.length > 0 || filters.sub_category.length > 0 || filters.vendor.length > 0 || filters.status.active || filters.status.inactive

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    {
      search !== null ? setIsLoading(false) : setIsLoading(true);
    }
    getServiceListing(search)
      .then((data) => {
        setTotalPages(Math.ceil(data?.count / itemsPerPage))
        setServiceList(data?.results);
        setIsLoading(false);
      })
      .catch((error) => {
        {
          setIsLoading(false);
          toast.error(error.message);
        }
      });
  }, [search]);

  useEffect(() => {
    if (getPermission) {
      getExport()
        .then((data) => {
          setCSVData(data)
          setIsLoading(false);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }, [getPermission])



  const handlePageClick = (data) => {
    setCurrentPage(data.selected)
    const newPage = data.selected;
    const newStartIndex = newPage * itemsPerPage;

    setIsLoading(true);
    // setCurrentPage(newPage);

    getListDataInPagination(`${API_BASE_URL}service/service-list?limit=${itemsPerPage}&offset=${newStartIndex}`)
      .then((data) => {
        setIsLoading(false);
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
          toast.error(error.message);
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
                    style={{
                      borderRadius: "5px",
                      marginLeft: "5px",
                      position: "relative",
                    }}
                    onClick={() => setOpen(true)}
                  >
                    <img src={filterIcon} alt="filter" width={25} />
                    <span className='py-1' style={{ position: "absolute", top: -10, color: "white", fontSize: "10px", backgroundColor: "#2176FF", width: "22px", height: "22px", borderRadius: "33px" }}>
                      {filters.category.length + filters.sub_category.length + filters.vendor.length + (filters.status.active === true && filters.status.inactive === true ? 2 : filters.status.active === true ? 1 : filters.status.inactive === true ? 1 : 0)}
                    </span>
                  </button>
                  {checkfilterslength && <button className="mx-3 px-3 py-2 btn" style={{ color: "#ffff", backgroundColor: "#2176FF" }} onClick={() => {
                    if (checkfilterslength) {
                      window.location.reload();
                    }
                  }}>Clear Filter</button>}
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
                <CSVLink data={csvData} filename={"Service_List.csv"} style={{ textDecoration: "none", borderRadius: "6px" }} className="btn btn-outline">
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
                        <span className="text-secondary" style={{ textTransform: "capitalize", wordBreak: "break-word" }}>{data?.name}</span>
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
      </div>
      {open && (
        <FilterPopup
          checkfilterslength={checkfilterslength}
          open={open}
          setIsLoading={setIsLoading}
          setServiceList={setServiceList}
          setTotalPages={setTotalPages}
          itemsPerPage={itemsPerPage}
          handleClose={handleClose}
          setFilters={setFilters}
          filters={filters}

        />
      )}
    </div>
  );
}

export default ServiceList;
