import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getGuestUserRequest,
  getTotalGuestUser,
  guestExport,
} from "../../../services/CustomerHandle.jsx";
import { getMenuPermissions, removeBaseUrlFromPath } from "../../../helpers.js";
import { getListDataInPagination } from "../../../services/commonServices.js";
import { MainPageContext } from "../../../Context/MainPageContext.js";
import {
  menuIdConstant,
  permissionCategory,
} from "../../../components/Permissions/PermissionConstants.js";
import * as XLSX from "xlsx";

const GuestUser = () => {
  const navigate = useNavigate();
  const [guestId, setGuestId] = useState();
  console.log("guest id", guestId);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const handleOpenOffcanvas = () => setShowOffcanvas(true);
  const [reward_product_data, setGuestUsertData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [totalGuestUser, setTotalGuestUser] = useState(0);
  const [listPageUrl, setListPageUrl] = useState({
    next: null,
    previous: null,
  });
  const [isRefetch, setIsRefetch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { userPermissionList } = useContext(MainPageContext);
  const [search, setSearch] = useState();
  const [selectedValue, setSelectedValue] = useState("");
  useEffect(() => {
    getGuestUserRequest({ search: search, status: "" })
      .then((data) => {
        console.log("Fetched data:", data.results);
        setGuestUsertData(data.results);
        setListPageUrl({
          next: data?.next,
          previous: data?.previous,
        });

        setGuestId(data.results?.id);
        console.log("id==", guestId);
      })
      .catch((error) => {
        console.error("Error fetching lead data:", error);
      });
  }, []);

  // const getGuestSearchData = async () => {
  //   getGuestUserRequest(search, selectedValue)
  //     .then((data) => {
  //       console.log("---search", data);
  //       setIsLoading(false);
  //       setListPageUrl({ next: data.next, previous: data.previous });

  //       setGuestUsertData(data.results);
  //     })
  //     .catch((error) => {
  //       setIsLoading(false);
  //       console.error("failed to search error", error);
  //     });
  // };

  // useEffect(() => {
  //   const data = { search: search, status: selectedValue, role: "Guest" };
  //   setIsLoading(true);
  //   getGuestUserRequest(data)
  //     .then((data) => {
  //       if (data) {
  //         setIsLoading(false);
  //         setListPageUrl({ next: data.next, previous: data.previous });
  //         setGuestUsertData(data?.results);
  //       } else {
  //         refreshPage();
  //         setIsLoading(true);
  //         setSearch("");
  //         setGuestUsertData(data?.results);
  //       }
  //     })
  //     .catch((error) => {
  //       setIsLoading(false);
  //       console.error("Error fetching  data:", error);
  //     });
  // }, [selectedValue, isRefetch, search]);
  useEffect(() => {
    const data = { search: search, status: selectedValue };
    getGuestUserRequest(data).then((res) => setGuestUsertData(res?.results));
  }, [selectedValue, isRefetch, search]);

  const handleBookingButtonClick = () => {
    navigate(`/bookings/${guestId}`);
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

          setGuestUsertData(data?.results);
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error fetching  data:", error);
        });
  };
  const filteredItems =
    reward_product_data && reward_product_data.length > 0
      ? reward_product_data.filter((rw_data) => {
          const searchableFields = [
            rw_data.first_name,
            rw_data.last_name,
            rw_data.mobile,
            rw_data.email,
            rw_data.location,
          ];
          return searchableFields.some(
            (field) =>
              typeof field === "string" &&
              field.toLowerCase().includes(searchText.toLowerCase())
          );
        })
      : [];

  // export
  const handleExportGuestData = () => {
    guestExport()
      .then((response) => {
        const csvData = response;
        console.log("csv data--", csvData);

        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
        console.log("blob--", blob);

        const workbook = XLSX.read(csvData, { type: "string" });

        console.log("Workbook:", workbook);

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "exported_data.csv";

        document.body.appendChild(link);

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

  return (
    <div className="page" style={{ height: "100vh", top: 20 }}>
      <div className="container">
        <div className="col-12 actions_menu my-2">
          <div className="action_menu_left col-8">
            <div>
              <form action="" method="post" autocomplete="off">
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
                    {search && (
                      <button
                        className="btn search_button"
                        style={{ color: "#ffff", backgroundColor: "#2176FF" }}
                        onClick={() => {
                          setSearch(""); // Clear the search state
                          window.location.reload();
                        }}
                      >
                        Clear Search
                      </button>
                    )}
                    {/* <button
                      type="button"
                      className="btn search_button"
                      style={{ background: "#006875" }}
                      onClick={getGuestSearchData}
                    >
                      Search
                    </button> */}
                  </div>
                </div>
              </form>
            </div>
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
                  onClick={handleExportGuestData}
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
          </div>
        </div>
        <div className="card">
          <div className="table-responsive">
            <table className="table card-table table-vcenter text-nowrap datatable">
              <thead>
                <tr>
                  <th>
                    <span>Name</span>
                  </th>
                  <th>
                    <span>Email</span>
                  </th>
                  <th>
                    <span>Phone</span>
                  </th>
                  <th>
                    <span>Location</span>
                  </th>
                  {userPermissionList &&
                    getMenuPermissions(
                      userPermissionList,
                      menuIdConstant.users,
                      permissionCategory.action
                    ) && (
                      <th>
                        <span>Action</span>
                      </th>
                    )}
                </tr>
              </thead>
              <tbody>
                {filteredItems.length > 0 ? (
                  filteredItems.map((rw_data, i) => (
                    <tr key={rw_data.id}>
                      <td>
                        <span className="text-secondary">
                          {rw_data.first_name} {rw_data.last_name}
                        </span>
                      </td>
                      <td>
                        <span className="text-secondary">{rw_data.email}</span>
                      </td>
                      <td>
                        <span className="text-secondary">{rw_data.mobile}</span>
                      </td>

                      <td>
                        <span className="text-secondary">
                          {rw_data.location}
                        </span>
                      </td>
                      {userPermissionList &&
                        getMenuPermissions(
                          userPermissionList,
                          menuIdConstant.users,
                          permissionCategory.action
                        ) && (
                          <td
                            style={{
                              display: "flex",
                              gap: "10px",
                              alignItems: "baseline",
                            }}
                          >
                            <a
                              to={""}
                              className="btn btn-sm btn-info"
                              style={{
                                padding: "6px 10px",
                                borderRadius: "4px",
                              }}
                              href={`/bookings/${rw_data.id}`}
                            >
                              Booking &nbsp;
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
                            </a>
                          </td>
                        )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No matching Guest User</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* <ul className="pagination m-0 ms-auto">
              <li className="page-item disabled">
                <a
                  className="page-link"
                  href="#"
                  tabIndex="-1"
                  aria-disabled="true"
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
              <li className="page-item">
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
            </ul> */}
          <div className="card-footer d-flex align-items-center">
            {/* <p className="m-0 text-secondary">
            Showing <span>1</span> to <span>8</span> of
            <span>16</span> entries
          </p> */}
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
    </div>
  );
};

export default GuestUser;
