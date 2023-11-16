import { Link } from "react-router-dom";
import AddNewLead from "./Modal/AddNewLead";
import { useState } from "react";

function Table() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [selectedValue, setSelectedValue] = useState("New Lead");

  const handleOpenOffcanvas = () => setShowOffcanvas(true);

  const handleCloseOffcanvas = () => setShowOffcanvas(false);

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  // const [listVendor, setListVendor] = useState([]);
  // useEffect(() => {
  //   const authToken =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk5NTE3Mzk5LCJpYXQiOjE2OTk1MTcwOTksImp0aSI6IjgwYmM5NzRhZTAyYjQ5YmViYzNlOWJlNmJkNTQ3M2FhIiwidXNlcl9pZCI6ImQxM2VmYmNkLTAwYzgtNDI5Yi1iN2YyLTU0OTEwYzEwMjEzNSJ9.WX12zkhoCNeMxIek7nQjuaQuHd2c_j2c4DOsYacapn4";
  //   axios
  //     .get("http://127.0.0.1:8000/crm/vendorforms/", {
  //       headers: {
  //         Authorization: `Bearer ${authToken}`,
  //       },
  //     })
  //     .then((response) => {
  //       setListVendor(response.data.results);
  //     });
  // }, []);

  function formatDate(date) {
    const created_at_str = date;
    const created_at_date = new Date(created_at_str);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const formatted_date = created_at_date.toLocaleDateString("en-US", options);

    return formatted_date;
  }
  return (
    <div>
      <AddNewLead show={showOffcanvas} close={handleCloseOffcanvas} />
      <div className="col-12 actions_menu">
        <div className="action_menu_left col-5">
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
                />
                <button
                  type="button"
                  className="btn search_button"
                  style={{ background: "#006875" }}
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          <div className="mb-3 status_dropdown">
            <label className="form-label">Status</label>
            <select
              type="text"
              className="form-select mb-3 status_selector"
              value={selectedValue}
              onChange={handleSelectChange}
            >
              <option value="New Lead">All</option>
              <option value="New Lead">New Lead</option>
              <option value="Initial Contact">Initial Contact</option>
              <option value="Site Visit">Site Visit</option>
              <option value="Proposal">Proposal</option>
              <option value="Negotations">Negotations</option>
              <option value="MOU/Charter">MOU/Charter</option>
            </select>
          </div>
        </div>
        <div className="action_buttons col-7">
          <button
            onClick={handleOpenOffcanvas}
            className="btn btn-info vendor_button"
            style={{ borderRadius: "6px" }}
            type="button"
          >
            Vendor Lead &nbsp;
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
          {/* <button className="btn btn-info">
                      Customer Lead &nbsp;
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
                    </button> */}
          <button className="btn btn-outline" style={{ borderRadius: "6px" }}>
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
                {/* <th className="w-1">
                          <input className="form-check-input m-0 align-middle" type="checkbox"
                            aria-label="Select all invoices" />
                        </th> */}
                <th className="w-1">
                  Lead
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-sm icon-thick"
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
                    <path d="M6 15l6 -6l6 6" />
                  </svg>
                </th>
                <th>Type</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Created On</th>
                <th>Assigned To</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className="text-secondary">Sanjay Jc</span>
                </td>
                <td>
                  <a href="invoice.html" className="text-reset" tabIndex="-1">
                    Vendor
                  </a>
                </td>
                <td>sanjayjic@gmail.com</td>
                <td>+91 9098745664</td>
                <td>Kuwait</td>
                <td>08 Oct 2023</td>
                <td>Scott Martin</td>
                <td>
                  <span
                    className="badge bg-blue text-blue-fg"
                    style={{
                      width: "100px",
                      padding: "5px",
                      backgroundColor: "#5a9cd9",
                    }}
                  >
                    New Lead
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
                    to={"/onboard"}
                    className="btn btn-sm btn-info"
                    style={{ padding: "5px", borderRadius: "4px" }}
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
                  <span>
                    <button
                      style={{
                        cursor: "pointer",
                        border: "none",
                        backgroundColor: "transparent",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M2.5 5.43586C2.5 5.10712 2.77226 4.84062 3.10811 4.84062H7.09823C7.10364 4.1396 7.17962 3.17855 7.87531 2.51325C8.4228 1.98967 9.1734 1.66602 9.99999 1.66602C10.8266 1.66602 11.5772 1.98967 12.1247 2.51325C12.8204 3.17855 12.8963 4.1396 12.9018 4.84062H16.8919C17.2277 4.84062 17.5 5.10712 17.5 5.43586C17.5 5.7646 17.2277 6.0311 16.8919 6.0311H3.10811C2.77226 6.0311 2.5 5.7646 2.5 5.43586Z"
                          fill="#F6513B"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M9.663 18.3327H10.337C12.6559 18.3327 13.8154 18.3327 14.5693 17.5944C15.3231 16.8561 15.4003 15.6451 15.5545 13.2231L15.7768 9.73318C15.8605 8.41902 15.9023 7.76194 15.5241 7.34556C15.1459 6.92917 14.5073 6.92917 13.23 6.92917H6.77004C5.49272 6.92917 4.85407 6.92917 4.47588 7.34556C4.09769 7.76194 4.13953 8.41902 4.22323 9.73319L4.44549 13.2231C4.59975 15.6451 4.67687 16.8561 5.43074 17.5944C6.18461 18.3327 7.34407 18.3327 9.663 18.3327ZM8.53856 10.1564C8.50422 9.79487 8.19794 9.53109 7.85448 9.56725C7.51101 9.6034 7.26042 9.9258 7.29477 10.2873L7.71143 14.6733C7.74578 15.0348 8.05206 15.2986 8.39552 15.2625C8.73899 15.2263 8.98958 14.9039 8.95523 14.5424L8.53856 10.1564ZM12.1455 9.56725C12.489 9.6034 12.7396 9.9258 12.7052 10.2873L12.2886 14.6733C12.2542 15.0348 11.9479 15.2986 11.6045 15.2625C11.261 15.2263 11.0104 14.9039 11.0448 14.5424L11.4614 10.1564C11.4958 9.79487 11.8021 9.53109 12.1455 9.56725Z"
                          fill="#F6513B"
                        />
                      </svg>
                    </button>
                  </span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M5.83333 10.0007C5.83333 10.9211 5.08714 11.6673 4.16667 11.6673C3.24619 11.6673 2.5 10.9211 2.5 10.0007C2.5 9.08018 3.24619 8.33398 4.16667 8.33398C5.08714 8.33398 5.83333 9.08018 5.83333 10.0007Z"
                        fill="#2E3030"
                      />
                      <path
                        d="M11.6667 10.0007C11.6667 10.9211 10.9205 11.6673 10 11.6673C9.07952 11.6673 8.33333 10.9211 8.33333 10.0007C8.33333 9.08018 9.07952 8.33398 10 8.33398C10.9205 8.33398 11.6667 9.08018 11.6667 10.0007Z"
                        fill="#2E3030"
                      />
                      <path
                        d="M17.5 10.0007C17.5 10.9211 16.7538 11.6673 15.8333 11.6673C14.9129 11.6673 14.1667 10.9211 14.1667 10.0007C14.1667 9.08018 14.9129 8.33398 15.8333 8.33398C16.7538 8.33398 17.5 9.08018 17.5 10.0007Z"
                        fill="#2E3030"
                      />
                    </svg>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card-footer d-flex align-items-center">
          <p className="m-0 text-secondary">
            Showing <span>1</span> to <span>8</span> of
            <span>16</span> entries
          </p>
          <ul className="pagination m-0 ms-auto">
            <li className="page-item disabled">
              <a
                className="page-link"
                href="#"
                tabIndex="-1"
                aria-disabled="true"
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
            <li className="page-item active">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item ">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                4
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                5
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
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
  );
}

export default Table;
