import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddNewLead from "./Modal/AddNewLead";
import { useEffect, useState } from "react";
import { getVendorList, getVendorStatus } from "../services/leadMangement";
import { formatDate, removeBaseUrlFromPath } from "../helpers";
import { getListDataInPagination } from "../services/commonServices";
import CircularProgress from "@mui/material/CircularProgress";
import { setCounter } from "../state/counter/counterSlice";

function Table() {
  const dispatch = useDispatch();
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [search, setSearch] = useState("");
  const [statusList, setStatusList] = useState([]);
  const [listPageUrl, setListPageUrl] = useState({
    next: null,
    previous: null,
  });
  const [isRefetch, setIsRefetch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleOpenOffcanvas = () => setShowOffcanvas(true);

  const handleCloseOffcanvas = () => setShowOffcanvas(false);

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const [listVendor, setListVendor] = useState([]);

  const getVendorListData = async () => {
    setIsLoading(true);
    getVendorList(search, selectedValue)
      .then((data) => {
        setIsLoading(false);
        setListPageUrl({ next: data.next, previous: data.previous });
        setListVendor(data?.results);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching  data:", error);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getVendorStatus()
      .then((data) => {
        setIsLoading(false);
        setStatusList(data.results);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching  data:", error);
      });
  }, []);

  useEffect(() => {
    getVendorListData();
  }, [selectedValue, isRefetch]);

  const handleExportData = () => {
    if (listVendor) {
      const header = [
        "NAME",
        "EMAIL",
        "PHONE",
        "LOCATION",
        "CREATED ON",
        "CREATED BY",
        "STATUS",
      ];
      const csvData = listVendor.map((elem) => {
        let formatedDate = formatDate(elem.created_at);
        return [
          elem.first_name,
          elem.email,
          elem.mobile,
          elem.location,
          elem.state?.state,
          formatedDate,
          elem.created_by,
          `${elem.status ? elem.status : "-"} `,
        ];
      });

      const csvContent = [header, ...csvData]
        .map((row) => row.join(","))
        .join("\n");
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Vendor-List.csv";
      a.click();
      window.URL.revokeObjectURL(url);
    }
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
          setListVendor(data?.results);
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error fetching  data:", error);
        });
  };

  return (
    <div>
      <div className="col-12 actions_menu my-2">
        <div className="action_menu_left col-8">
          <div>
            <form action="" method="post" autocomplete="off">
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
                  onClick={getVendorListData}
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          <div className="status_dropdown">
            <label className="form-label">Status</label>
            <select
              type="text"
              className="form-select mb-3 status_selector"
              value={selectedValue}
              onChange={handleSelectChange}
            >
              <option value="">All</option>
              {statusList &&
                statusList.length > 0 &&
                statusList.map((item, i) => {
                  return (
                    <option value={item.name} key={`statusList-${i}`}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        <div className="action_buttons col-4">
          <button
            onClick={handleOpenOffcanvas}
            className="btn btn-info vendor_button"
            style={{ borderRadius: "6px" }}
            type="button"
          >
            Vendor Leads &nbsp;
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
          </button>

          <button
            className="btn btn-outline"
            style={{ borderRadius: "6px" }}
            onClick={handleExportData}
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
        </div>
      </div>
      <div className="card">
        <div className="table-responsive">
          <table className="table card-table table-vcenter text-nowrap datatable">
            <thead>
              <tr>
                <th className="w-1">
                  <span>Name</span>
                </th>
                <th>
                  <span>Email</span>
                </th>
                <th>
                  {" "}
                  <span>Phone</span>
                </th>
                <th>
                  <span>Location</span>
                </th>
                <th>
                  <span>Created On</span>
                </th>
                <th>
                  <span>Created By</span>
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
                  {listVendor && listVendor.length > 0 ? (
                    <>
                      {listVendor.map((item, index) => {
                        let formatedDate = formatDate(item.created_at);
                        return (
                          <tr>
                            <td>
                              <span className="text-secondary">
                                {item.first_name}
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                {item.email}
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                {item.mobile}
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                {item.location}
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                {formatedDate}
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                {item.created_by}
                              </span>
                            </td>
                            <td>
                              {item.status ? (
                                <span
                                  className="badge  text-blue-fg"
                                  style={{
                                    minWidth: "100px",
                                    padding: "7px 9px 5px 9px ",
                                    borderRadius: "4px",
                                    backgroundColor: "#5A9CD9",
                                  }}
                                >
                                  {`${item.status ? item.status : "New Lead"} `}
                                </span>
                              ) : (
                                "-"
                              )}
                            </td>
                            <td
                              style={{
                                display: "flex",
                                gap: "10px",
                                alignItems: "baseline",
                              }}
                            >
                              <Link
                                to={`/onboard/${item.id}/${item.company_id}`}
                                onClick={() => {
                                  if (item.status === "New Lead") {
                                    dispatch(setCounter(0));
                                  }
                                  if (item.status === "Initial Contact") {
                                    dispatch(setCounter(1));
                                  }
                                  if (item.status === "Site Visit") {
                                    dispatch(setCounter(2));
                                  }
                                  if (item.status === "Proposal") {
                                    dispatch(setCounter(3));
                                  }
                                  if (item.status === "Negotiation") {
                                    dispatch(setCounter(4));
                                  }
                                  if (item.status === "MOU / Charter") {
                                    dispatch(setCounter(5));
                                  }
                                  if (item.status === "Ready to Onboard") {
                                    dispatch(setCounter(6));
                                  }
                                }}
                                className="btn btn-sm btn-info"
                                style={{
                                  padding: "5px",
                                  borderRadius: "4px",
                                  borderRadius:
                                    "var(--roundness-round-inside, 6px)",
                                  background: "#187AF7",

                                  /* Shadow/XSM */
                                  boxSShadow:
                                    "0px 1px 2px 0px rgba(16, 24, 40, 0.04)",
                                }}
                              >
                                Onboard &nbsp;
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
        </div>
        <div className="card-footer d-flex align-items-center">
          {/* <p className="m-0 text-secondary">
            Showing <span>1</span> to <span>8</span> of
            <span>16</span> entries
          </p> */}
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
      {showOffcanvas && (
        <AddNewLead
          show={showOffcanvas}
          close={handleCloseOffcanvas}
          isRefetch={isRefetch}
          setIsRefetch={setIsRefetch}
        />
      )}
    </div>
  );
}

export default Table;
