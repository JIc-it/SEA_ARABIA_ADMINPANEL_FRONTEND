import { useContext,  useState } from "react";
import {  useLocation } from "react-router-dom";
import logo from "../../static/img/logo.png";
import { useNavigate } from "react-router-dom";
import { getMenuPermissions } from "../../helpers";
import {
  menuIdConstant,
  permissionCategory,
} from "../Permissions/PermissionConstants";
import { MainPageContext } from "../../Context/MainPageContext";

function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeLink = location.pathname;
  const { userPermissionList } = useContext(MainPageContext);

  const handleReviewClick = (event) => {
    event.preventDefault();

    navigate("/review");
  };
  const handleBookingClick = (event) => {
    event.preventDefault();

    navigate("/booking");
  };
  const handleBookingCancellationClick = (event) => {
    event.preventDefault();

    navigate("/refunds-request");
  };
  const handleBookingHistoryClick = (event) => {
    event.preventDefault();

    navigate("/refunds-history");
  };

  const handleAddOnServiceClick = (event) => {
    event.preventDefault();

    navigate("/add-on-services");
  };
  const handleEventsAndPackage = (event) => {
    event.preventDefault();
    navigate("/events-and-packages");
  };
  const handleRequestClick = (event) => {
    event.preventDefault();

    navigate("/refunds-request");
  };
  const handleRefundHistoryClick = (event) => {
    event.preventDefault();

    navigate("/refunds-history");
  };

  // user
  const handleCustomerClick = (event) => {
    event.preventDefault();

    navigate("/customers");
  };
  const handleVendorClick = (event) => {
    event.preventDefault();

    navigate("/user-vendor");
  };
  const handleGuestUserClick = (event) => {
    event.preventDefault();

    navigate("/guest-user");
  };
  const handleSlesRepresentativeClick = (event) => {
    event.preventDefault();

    navigate("/sales-representatives");
  };
  const handleAdminClick = (event) => {
    event.preventDefault();

    navigate("/admin");
  };

  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownToggle = (link) => {
    setOpenDropdown(openDropdown === link ? null : link);
  };

  return (
    <aside
      className="navbar navbar-vertical navbar-expand-lg"
      data-bs-theme="light"
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebar-menu"
          aria-controls="sidebar-menu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <h1 className="navbar-brand navbar-brand-autodark">
          <a href="/dashboard">
            <img src={logo} alt="" />
          </a>
        </h1>
        {/* <div className="navbar-nav flex-row d-lg-none">
          <div className="nav-item d-none d-lg-flex me-3">
            <div className="btn-list">
              <a
                href="https://github.com/tabler/tabler"
                className="btn"
                target="_blank"
                rel="noreferrer"
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
                  <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
                </svg>
                Source code
              </a>
              <a
                href="https://github.com/sponsors/codecalm"
                className="btn"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon text-pink"
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
                  <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                </svg>
                Sponsor
              </a>
            </div>
          </div>
          <div className="d-none d-lg-flex">
            <a
              href="?theme=dark"
              className="nav-link px-0 hide-theme-dark"
              title="Enable dark mode"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
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
                <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
              </svg>
            </a>
            <a
              href="?theme=light"
              className="nav-link px-0 hide-theme-light"
              title="Enable light mode"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
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
                <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
              </svg>
            </a>
            <div className="nav-item dropdown d-none d-md-flex me-3">
              <button
                className="nav-link px-0"
                data-bs-toggle="dropdown"
                tabIndex="-1"
                aria-label="Show notifications"
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
                  <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                  <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                </svg>
                <span className="badge bg-red"></span>
              </button>
              <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-end dropdown-menu-card">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Last updates</h3>
                  </div>
                  <div className="list-group list-group-flush list-group-hoverable">
                    <div className="list-group-item">
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <span className="status-dot status-dot-animated bg-red d-block"></span>
                        </div>
                        <div className="col text-truncate">
                          <button href="#" className="text-body d-block">
                            Example 1
                          </button>
                          <div className="d-block text-secondary text-truncate mt-n1">
                            Change deprecated html tags to text decoration
                            classNamees (#29604)
                          </div>
                        </div>
                        <div className="col-auto">
                          <button href="#" className="list-group-item-actions">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon text-muted"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="list-group-item">
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <span className="status-dot d-block"></span>
                        </div>
                        <div className="col text-truncate">
                          <button href="#" className="text-body d-block">
                            Example 2
                          </button>
                          <div className="d-block text-secondary text-truncate mt-n1">
                            justify-content:between ⇒
                            justify-content:space-between (#29734)
                          </div>
                        </div>
                        <div className="col-auto">
                          <button
                            href="#"
                            className="list-group-item-actions show"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon text-yellow"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="list-group-item">
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <span className="status-dot d-block"></span>
                        </div>
                        <div className="col text-truncate">
                          <button href="#" className="text-body d-block">
                            Example 3
                          </button>
                          <div className="d-block text-secondary text-truncate mt-n1">
                            Update change-version.js (#29736)
                          </div>
                        </div>
                        <div className="col-auto">
                          <button href="#" className="list-group-item-actions">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon text-muted"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="list-group-item">
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <span className="status-dot status-dot-animated bg-green d-block"></span>
                        </div>
                        <div className="col text-truncate">
                          <button href="#" className="text-body d-block">
                            Example 4
                          </button>
                          <div className="d-block text-secondary text-truncate mt-n1">
                            Regenerate package-lock.json (#29730)
                          </div>
                        </div>
                        <div className="col-auto">
                          <button href="#" className="list-group-item-actions">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon text-muted"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="nav-item dropdown">
            <button
              href="#"
              className="nav-link d-flex lh-1 text-reset p-0"
              data-bs-toggle="dropdown"
              aria-label="Open user menu"
            >
              <span
                className="avatar avatar-sm"
                style={{
                  backgroundImage: "url(./static/avatars/000m.jpg)",
                }}
              ></span>
              <div className="d-none d-xl-block ps-2">
                <div>Paweł Kuna</div>
                <div className="mt-1 small text-secondary">UI Designer</div>
              </div>
            </button>
            <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <button href="#" className="dropdown-item">
                Status
              </button>
              <a href="/profile.html" className="dropdown-item">
                Profile
              </a>
              <button href="#" className="dropdown-item">
                Feedback
              </button>
              <div className="dropdown-divider"></div>
              <a href="/settings.html" className="dropdown-item">
                Settings
              </a>
              <a href="/sign-in.html" className="dropdown-item">
                Logout
              </a>
            </div>
          </div>
        </div> */}
        <div className="collapse navbar-collapse " id="sidebar-menu">
          <div className="sidebar">
            <ul className="navbar-nav pt-lg-3 " style={{ gap: "30px" }}>
              {/* <div className="scrollable-content"> */}
              <li
                className={`nav-item ${
                  activeLink === "/dashboard" ? "active" : ""
                }`}
              >
                <a
                  className="nav-link"
                  href="/dashboard"
                  style={{
                    color: activeLink === "/dashboard" ? "#006875" : "",
                    fontSize: activeLink === "/dashboard" ? "17px" : "",
                  }}
                >
                  <svg
                    style={{
                      color:
                        activeLink === "/dashboard"
                          ? "#006875"
                          : "currentColor",
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M1.8335 11.0007C1.8335 6.67944 1.8335 4.51884 3.17592 3.17641C4.51835 1.83398 6.67895 1.83398 11.0002 1.83398C15.3214 1.83398 17.482 1.83398 18.8244 3.17641C20.1668 4.51884 20.1668 6.67944 20.1668 11.0007C20.1668 15.3219 20.1668 17.4825 18.8244 18.8249C17.482 20.1673 15.3214 20.1673 11.0002 20.1673C6.67895 20.1673 4.51835 20.1673 3.17592 18.8249C1.8335 17.4825 1.8335 15.3219 1.8335 11.0007Z"
                      stroke="#68727D"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M6.4165 12.8327L8.06365 10.8561C8.71636 10.0729 9.04272 9.68123 9.47206 9.68123C9.9014 9.68123 10.2278 10.0729 10.8805 10.8561L11.1192 11.1426C11.7719 11.9258 12.0983 12.3175 12.5276 12.3175C12.957 12.3175 13.2833 11.9258 13.936 11.1426L15.5832 9.16602"
                      stroke="#68727D"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>

                  <span
                    className={`nav-link-title ${
                      activeLink === "/dashboard"
                        ? "color: #006875;"
                        : "color: #2E3030;"
                    }`}
                  >
                    &nbsp; Dashboard{" "}
                  </span>
                </a>
              </li>
              {userPermissionList &&
                getMenuPermissions(
                  userPermissionList,
                  menuIdConstant.vendorManagent,
                  permissionCategory.view
                ) && (
                  <li
                    className={`nav-item ${
                      activeLink === "/vendor-management" ? "active" : ""
                    }`}
                  >
                    <a
                      className="nav-link"
                      href="/vendor-management"
                      style={{
                        color:
                          activeLink === "/vendor-management" ? "#006875" : "",
                        fontSize:
                          activeLink === "/vendor-management" ? "17px" : "",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                      >
                        <path
                          d="M1.8335 11.0007C1.8335 6.67944 1.8335 4.51884 3.17592 3.17641C4.51835 1.83398 6.67895 1.83398 11.0002 1.83398C15.3214 1.83398 17.482 1.83398 18.8244 3.17641C20.1668 4.51884 20.1668 6.67944 20.1668 11.0007C20.1668 15.3219 20.1668 17.4825 18.8244 18.8249C17.482 20.1673 15.3214 20.1673 11.0002 20.1673C6.67895 20.1673 4.51835 20.1673 3.17592 18.8249C1.8335 17.4825 1.8335 15.3219 1.8335 11.0007Z"
                          stroke="#68727D"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M6.4165 12.8327L8.06365 10.8561C8.71636 10.0729 9.04272 9.68123 9.47206 9.68123C9.9014 9.68123 10.2278 10.0729 10.8805 10.8561L11.1192 11.1426C11.7719 11.9258 12.0983 12.3175 12.5276 12.3175C12.957 12.3175 13.2833 11.9258 13.936 11.1426L15.5832 9.16602"
                          stroke="#68727D"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="nav-link-title">
                        &nbsp; Vendor Management{" "}
                      </span>
                    </a>
                  </li>
                )}
              {userPermissionList &&
                getMenuPermissions(
                  userPermissionList,
                  menuIdConstant.booking,
                  permissionCategory.view
                ) && (
                  <li
                    className={`nav-item dropdown 
                  ${openDropdown === "/booking" ? "active" : ""}
                }`}
                    style={{
                      color: activeLink === "/" ? "#006875" : "",
                      fontSize: activeLink === "/" ? "17px" : "",
                    }}
                  >
                    <a
                      className={`nav-link dropdown-toggle`}
                      href="/booking"
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="false"
                      role="button"
                      onClick={() => handleDropdownToggle("/booking")}
                      // aria-expanded="false"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                      >
                        <path
                          d="M1.8335 11.0007C1.8335 6.67944 1.8335 4.51884 3.17592 3.17641C4.51835 1.83398 6.67895 1.83398 11.0002 1.83398C15.3214 1.83398 17.482 1.83398 18.8244 3.17641C20.1668 4.51884 20.1668 6.67944 20.1668 11.0007C20.1668 15.3219 20.1668 17.4825 18.8244 18.8249C17.482 20.1673 15.3214 20.1673 11.0002 20.1673C6.67895 20.1673 4.51835 20.1673 3.17592 18.8249C1.8335 17.4825 1.8335 15.3219 1.8335 11.0007Z"
                          stroke="#68727D"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M6.4165 12.8327L8.06365 10.8561C8.71636 10.0729 9.04272 9.68123 9.47206 9.68123C9.9014 9.68123 10.2278 10.0729 10.8805 10.8561L11.1192 11.1426C11.7719 11.9258 12.0983 12.3175 12.5276 12.3175C12.957 12.3175 13.2833 11.9258 13.936 11.1426L15.5832 9.16602"
                          stroke="#68727D"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="nav-link-title">Booking Management</span>
                    </a>
                    <div className="dropdown-menu">
                      <div className="dropdown-menu-columns">
                        <div className="dropdown-menu-column">
                          <a
                            className={`dropdown-item ${
                              activeLink === "/booking" ? "active" : ""
                            }`}
                            style={{
                              color: activeLink === "/booking" ? "#006875" : "",
                            }}
                            href="/booking"
                            onClick={handleBookingClick}
                            // style={{ color: "#006875" }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="16"
                              viewBox="0 0 22 16"
                              fill="none"
                            >
                              <path
                                d="M18.8438 9.09375C19.4478 9.09375 19.9375 8.60406 19.9375 8C19.9375 7.39594 19.4478 6.90625 18.8438 6.90625H3.09375C2.48969 6.90625 2 7.39594 2 8C2 8.60406 2.48969 9.09375 3.09375 9.09375H18.8438Z"
                                fill="#006875"
                                cancellation-booking
                              />
                            </svg>
                            &nbsp; Booking{" "}
                          </a>
                          <a
                            className={`dropdown-item ${
                              activeLink === "/refunds-request" ? "active" : ""
                            }`}
                            style={{
                              color:
                                activeLink === "/refunds-request"
                                  ? "#006875"
                                  : "",
                            }}
                            onClick={handleBookingCancellationClick}
                            href="/refunds-request"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="16"
                              viewBox="0 0 22 16"
                              fill="none"
                            >
                              <path
                                d="M11.8438 9.09375C12.4478 9.09375 12.9375 8.60406 12.9375 8C12.9375 7.39594 12.4478 6.90625 11.8438 6.90625H3.09375C2.48969 6.90625 2 7.39594 2 8C2 8.60406 2.48969 9.09375 3.09375 9.09375H11.8438Z"
                                fill="#68727D"
                              />
                            </svg>
                            &nbsp; Refund Request
                          </a>
                          <a
                            className={`dropdown-item ${
                              activeLink === "/refunds-history" ? "active" : ""
                            }`}
                            onClick={handleBookingHistoryClick}
                            style={{
                              color:
                                activeLink === "/refunds-history"
                                  ? "#006875"
                                  : "",
                            }}
                            href="/refunds-history"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="16"
                              viewBox="0 0 22 16"
                              fill="none"
                            >
                              <path
                                d="M11.8438 9.09375C12.4478 9.09375 12.9375 8.60406 12.9375 8C12.9375 7.39594 12.4478 6.90625 11.8438 6.90625H3.09375C2.48969 6.90625 2 7.39594 2 8C2 8.60406 2.48969 9.09375 3.09375 9.09375H11.8438Z"
                                fill="#68727D"
                              />
                            </svg>
                            &nbsp; Refund History
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                )}

              {/* <li
                className={`nav-item dropdown 
                  ${openDropdown === "/refunds" ? "active" : ""}
                }`}
              >
                <a
                  style={{
                    color:
                      activeLink === "/refunds-request" ||
                      activeLink === "/refunds-history"
                        ? "#006875"
                        : "",
                    fontSize: activeLink === "/refunds" ? "17px" : "",
                  }}
                  className="nav-link dropdown-toggle"
                  href="/refunds"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="false"
                  role="button"
                  aria-expanded="false"
                  onClick={() => handleDropdownToggle("/refunds")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M1.8335 11.0007C1.8335 6.67944 1.8335 4.51884 3.17592 3.17641C4.51835 1.83398 6.67895 1.83398 11.0002 1.83398C15.3214 1.83398 17.482 1.83398 18.8244 3.17641C20.1668 4.51884 20.1668 6.67944 20.1668 11.0007C20.1668 15.3219 20.1668 17.4825 18.8244 18.8249C17.482 20.1673 15.3214 20.1673 11.0002 20.1673C6.67895 20.1673 4.51835 20.1673 3.17592 18.8249C1.8335 17.4825 1.8335 15.3219 1.8335 11.0007Z"
                      stroke="#68727D"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M6.4165 12.8327L8.06365 10.8561C8.71636 10.0729 9.04272 9.68123 9.47206 9.68123C9.9014 9.68123 10.2278 10.0729 10.8805 10.8561L11.1192 11.1426C11.7719 11.9258 12.0983 12.3175 12.5276 12.3175C12.957 12.3175 13.2833 11.9258 13.936 11.1426L15.5832 9.16602"
                      stroke="#68727D"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="nav-link-title"> &nbsp; Refunds </span>
                </a>
                <div className="dropdown-menu">
                  <div className="dropdown-menu-columns">
                    <div className="dropdown-menu-column">
                      <a
                        style={{
                          color:
                            activeLink === "/refunds-request" ? "#006875" : "",
                        }}
                        onClick={handleRequestClick}
                        className="dropdown-item"
                        href="/refunds-request"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="16"
                          viewBox="0 0 22 16"
                          fill="none"
                        >
                          <path
                            d="M18.8438 9.09375C19.4478 9.09375 19.9375 8.60406 19.9375 8C19.9375 7.39594 19.4478 6.90625 18.8438 6.90625H3.09375C2.48969 6.90625 2 7.39594 2 8C2 8.60406 2.48969 9.09375 3.09375 9.09375H18.8438Z"
                            fill="black"
                          />
                        </svg>
                        &nbsp; Requests{" "}
                      </a>
                      <a
                        onClick={handleRefundHistoryClick}
                        className="dropdown-item"
                        href="/refunds-history"
                        style={{
                          color:
                            activeLink === "/refunds-history" ? "#006875" : "",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="16"
                          viewBox="0 0 22 16"
                          fill="none"
                        >
                          <path
                            d="M11.8438 9.09375C12.4478 9.09375 12.9375 8.60406 12.9375 8C12.9375 7.39594 12.4478 6.90625 11.8438 6.90625H3.09375C2.48969 6.90625 2 7.39594 2 8C2 8.60406 2.48969 9.09375 3.09375 9.09375H11.8438Z"
                            fill="#68727D"
                          />
                        </svg>
                        &nbsp; Refund History
                      </a>
                    </div>
                  </div>
                </div>
              </li> */}
              {/* <li
                className={`nav-item dropdown ${
                  activeLink === "/service" ? "active" : ""
                }`}
              >
                <a
                  className="nav-link"
                  href="/service"
                  style={{
                    color: activeLink === "/service" ? "#006875" : "",
                    fontSize: activeLink === "/service" ? "17px" : "",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M1.8335 11.0007C1.8335 6.67944 1.8335 4.51884 3.17592 3.17641C4.51835 1.83398 6.67895 1.83398 11.0002 1.83398C15.3214 1.83398 17.482 1.83398 18.8244 3.17641C20.1668 4.51884 20.1668 6.67944 20.1668 11.0007C20.1668 15.3219 20.1668 17.4825 18.8244 18.8249C17.482 20.1673 15.3214 20.1673 11.0002 20.1673C6.67895 20.1673 4.51835 20.1673 3.17592 18.8249C1.8335 17.4825 1.8335 15.3219 1.8335 11.0007Z"
                      stroke="#68727D"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M6.4165 12.8327L8.06365 10.8561C8.71636 10.0729 9.04272 9.68123 9.47206 9.68123C9.9014 9.68123 10.2278 10.0729 10.8805 10.8561L11.1192 11.1426C11.7719 11.9258 12.0983 12.3175 12.5276 12.3175C12.957 12.3175 13.2833 11.9258 13.936 11.1426L15.5832 9.16602"
                      stroke="#68727D"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="nav-link-title">&nbsp; Service</span>
                </a>
              </li> */}
              {userPermissionList &&
                getMenuPermissions(
                  userPermissionList,
                  menuIdConstant.serviceManagement,
                  permissionCategory.view
                ) && (
                  <li
                    className={`nav-item dropdown 
                  ${openDropdown === "/booking" ? "active" : ""}
                }`}
                    style={{
                      color: activeLink === "/" ? "#006875" : "",
                      fontSize: activeLink === "/" ? "17px" : "",
                    }}
                  >
                    <a
                      className={`nav-link dropdown-toggle`}
                      href="/booking"
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="false"
                      role="button"
                      onClick={() => handleDropdownToggle("/booking")}
                      // aria-expanded="false"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                      >
                        <path
                          d="M1.8335 11.0007C1.8335 6.67944 1.8335 4.51884 3.17592 3.17641C4.51835 1.83398 6.67895 1.83398 11.0002 1.83398C15.3214 1.83398 17.482 1.83398 18.8244 3.17641C20.1668 4.51884 20.1668 6.67944 20.1668 11.0007C20.1668 15.3219 20.1668 17.4825 18.8244 18.8249C17.482 20.1673 15.3214 20.1673 11.0002 20.1673C6.67895 20.1673 4.51835 20.1673 3.17592 18.8249C1.8335 17.4825 1.8335 15.3219 1.8335 11.0007Z"
                          stroke="#68727D"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M6.4165 12.8327L8.06365 10.8561C8.71636 10.0729 9.04272 9.68123 9.47206 9.68123C9.9014 9.68123 10.2278 10.0729 10.8805 10.8561L11.1192 11.1426C11.7719 11.9258 12.0983 12.3175 12.5276 12.3175C12.957 12.3175 13.2833 11.9258 13.936 11.1426L15.5832 9.16602"
                          stroke="#68727D"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="nav-link-title">Service Management</span>
                    </a>
                    <div className="dropdown-menu">
                      <div className="dropdown-menu-columns">
                        <div className="dropdown-menu-column">
                          <a
                            className={`dropdown-item ${
                              activeLink === "/Service" ? "active" : ""
                            }`}
                            style={{
                              color: activeLink === "/Service" ? "#006875" : "",
                            }}
                            href="/Service"
                            // onClick={handleBookingClick}
                            // style={{ color: "#006875" }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="16"
                              viewBox="0 0 22 16"
                              fill="none"
                            >
                              <path
                                d="M18.8438 9.09375C19.4478 9.09375 19.9375 8.60406 19.9375 8C19.9375 7.39594 19.4478 6.90625 18.8438 6.90625H3.09375C2.48969 6.90625 2 7.39594 2 8C2 8.60406 2.48969 9.09375 3.09375 9.09375H18.8438Z"
                                fill="#006875"
                                cancellation-booking
                              />
                            </svg>
                            &nbsp; Service{" "}
                          </a>
                          {userPermissionList &&
                            getMenuPermissions(
                              userPermissionList,
                              menuIdConstant.serviceManagement,
                              permissionCategory.availability
                            ) && (
                              <a
                                className={`dropdown-item ${
                                  activeLink === "/availability" ? "active" : ""
                                }`}
                                style={{
                                  color:
                                    activeLink === "/availability"
                                      ? "#006875"
                                      : "",
                                }}
                                // onClick={handleBookingCancellationClick}
                                href="/availability"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="22"
                                  height="16"
                                  viewBox="0 0 22 16"
                                  fill="none"
                                >
                                  <path
                                    d="M11.8438 9.09375C12.4478 9.09375 12.9375 8.60406 12.9375 8C12.9375 7.39594 12.4478 6.90625 11.8438 6.90625H3.09375C2.48969 6.90625 2 7.39594 2 8C2 8.60406 2.48969 9.09375 3.09375 9.09375H11.8438Z"
                                    fill="#68727D"
                                  />
                                </svg>
                                &nbsp; Availablity
                              </a>
                            )}
                          {userPermissionList &&
                            getMenuPermissions(
                              userPermissionList,
                              menuIdConstant.serviceManagement,
                              permissionCategory.calendar
                            ) && (
                              <a
                                className={`dropdown-item ${
                                  activeLink === "/calendar" ? "active" : ""
                                }`}
                                // onClick={handleBookingHistoryClick}
                                style={{
                                  color:
                                    activeLink === "/calendar" ? "#006875" : "",
                                }}
                                href="/calendar"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="22"
                                  height="16"
                                  viewBox="0 0 22 16"
                                  fill="none"
                                >
                                  <path
                                    d="M11.8438 9.09375C12.4478 9.09375 12.9375 8.60406 12.9375 8C12.9375 7.39594 12.4478 6.90625 11.8438 6.90625H3.09375C2.48969 6.90625 2 7.39594 2 8C2 8.60406 2.48969 9.09375 3.09375 9.09375H11.8438Z"
                                    fill="#68727D"
                                  />
                                </svg>
                                &nbsp; Calendar
                              </a>
                            )}
                        </div>
                      </div>
                    </div>
                  </li>
                )}
              <li
                className={`nav-item ${
                  activeLink === "/payments" ? "active" : ""
                }`}
              >
                <a
                  className="nav-link"
                  href="/payments"
                  style={{
                    color: activeLink === "/payments" ? "#006875" : "",
                    fontSize: activeLink === "/payments" ? "17px" : "",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M1.8335 11.0007C1.8335 6.67944 1.8335 4.51884 3.17592 3.17641C4.51835 1.83398 6.67895 1.83398 11.0002 1.83398C15.3214 1.83398 17.482 1.83398 18.8244 3.17641C20.1668 4.51884 20.1668 6.67944 20.1668 11.0007C20.1668 15.3219 20.1668 17.4825 18.8244 18.8249C17.482 20.1673 15.3214 20.1673 11.0002 20.1673C6.67895 20.1673 4.51835 20.1673 3.17592 18.8249C1.8335 17.4825 1.8335 15.3219 1.8335 11.0007Z"
                      stroke="#68727D"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M6.4165 12.8327L8.06365 10.8561C8.71636 10.0729 9.04272 9.68123 9.47206 9.68123C9.9014 9.68123 10.2278 10.0729 10.8805 10.8561L11.1192 11.1426C11.7719 11.9258 12.0983 12.3175 12.5276 12.3175C12.957 12.3175 13.2833 11.9258 13.936 11.1426L15.5832 9.16602"
                      stroke="#68727D"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="nav-link-title"> &nbsp; Payments</span>
                </a>
              </li>

              {userPermissionList &&
                getMenuPermissions(
                  userPermissionList,
                  menuIdConstant.offer,
                  permissionCategory.view
                ) && (
                  <li
                    className={`nav-item  ${
                      activeLink === "/discounts-offers" ? "active" : ""
                    }`}
                  >
                    <a
                      className="nav-link"
                      href="/discounts-offers"
                      style={{
                        color:
                          activeLink === "/discounts-offers" ? "#006875" : "",
                        fontSize:
                          activeLink === "/discounts-offers" ? "17px" : "",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                      >
                        <path
                          d="M1.8335 11.0007C1.8335 6.67944 1.8335 4.51884 3.17592 3.17641C4.51835 1.83398 6.67895 1.83398 11.0002 1.83398C15.3214 1.83398 17.482 1.83398 18.8244 3.17641C20.1668 4.51884 20.1668 6.67944 20.1668 11.0007C20.1668 15.3219 20.1668 17.4825 18.8244 18.8249C17.482 20.1673 15.3214 20.1673 11.0002 20.1673C6.67895 20.1673 4.51835 20.1673 3.17592 18.8249C1.8335 17.4825 1.8335 15.3219 1.8335 11.0007Z"
                          stroke="#68727D"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M6.4165 12.8327L8.06365 10.8561C8.71636 10.0729 9.04272 9.68123 9.47206 9.68123C9.9014 9.68123 10.2278 10.0729 10.8805 10.8561L11.1192 11.1426C11.7719 11.9258 12.0983 12.3175 12.5276 12.3175C12.957 12.3175 13.2833 11.9258 13.936 11.1426L15.5832 9.16602"
                          stroke="#68727D"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="nav-link-title">
                        {" "}
                        &nbsp; Discounts / Offers{" "}
                      </span>
                    </a>
                  </li>
                )}
              <li
                className={`nav-item  ${
                  activeLink === "/analytics" ? "active" : ""
                }`}
              >
                <a
                  className="nav-link"
                  href="/analytics"
                  style={{
                    color: activeLink === "/analytics" ? "#006875" : "",
                    fontSize: activeLink === "/dashboard" ? "17px" : "",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M1.8335 11.0007C1.8335 6.67944 1.8335 4.51884 3.17592 3.17641C4.51835 1.83398 6.67895 1.83398 11.0002 1.83398C15.3214 1.83398 17.482 1.83398 18.8244 3.17641C20.1668 4.51884 20.1668 6.67944 20.1668 11.0007C20.1668 15.3219 20.1668 17.4825 18.8244 18.8249C17.482 20.1673 15.3214 20.1673 11.0002 20.1673C6.67895 20.1673 4.51835 20.1673 3.17592 18.8249C1.8335 17.4825 1.8335 15.3219 1.8335 11.0007Z"
                      stroke="#68727D"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M6.4165 12.8327L8.06365 10.8561C8.71636 10.0729 9.04272 9.68123 9.47206 9.68123C9.9014 9.68123 10.2278 10.0729 10.8805 10.8561L11.1192 11.1426C11.7719 11.9258 12.0983 12.3175 12.5276 12.3175C12.957 12.3175 13.2833 11.9258 13.936 11.1426L15.5832 9.16602"
                      stroke="#68727D"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="nav-link-title"> &nbsp; Analytics </span>
                </a>
              </li>
              {userPermissionList &&
                getMenuPermissions(
                  userPermissionList,
                  menuIdConstant.users,
                  permissionCategory.view
                ) && (
                  <li
                    className={`nav-item dropdown 
                ${openDropdown === 1 ? "active" : ""}
              }`}
                  >
                    <a
                      style={{
                        color: activeLink === "/" ? "#006875" : "",
                        fontSize: activeLink === "/" ? "17px" : "",
                      }}
                      className="nav-link dropdown-toggle"
                      href="/"
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="false"
                      role="button"
                      aria-expanded="false"
                      onClick={() => handleDropdownToggle(3)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                      >
                        <path
                          d="M1.8335 11.0007C1.8335 6.67944 1.8335 4.51884 3.17592 3.17641C4.51835 1.83398 6.67895 1.83398 11.0002 1.83398C15.3214 1.83398 17.482 1.83398 18.8244 3.17641C20.1668 4.51884 20.1668 6.67944 20.1668 11.0007C20.1668 15.3219 20.1668 17.4825 18.8244 18.8249C17.482 20.1673 15.3214 20.1673 11.0002 20.1673C6.67895 20.1673 4.51835 20.1673 3.17592 18.8249C1.8335 17.4825 1.8335 15.3219 1.8335 11.0007Z"
                          stroke="#68727D"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M6.4165 12.8327L8.06365 10.8561C8.71636 10.0729 9.04272 9.68123 9.47206 9.68123C9.9014 9.68123 10.2278 10.0729 10.8805 10.8561L11.1192 11.1426C11.7719 11.9258 12.0983 12.3175 12.5276 12.3175C12.957 12.3175 13.2833 11.9258 13.936 11.1426L15.5832 9.16602"
                          stroke="#68727D"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>

                      <span className="nav-link-title"> &nbsp; Users </span>
                    </a>
                    <div className="dropdown-menu">
                      <div className="dropdown-menu-columns">
                        <div className="dropdown-menu-column">
                          <a
                            style={{
                              color:
                                activeLink === "/customers" ? "#006875" : "",
                            }}
                            className="dropdown-item"
                            href="/customers"
                            onClick={handleCustomerClick}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="16"
                              viewBox="0 0 22 16"
                              fill="none"
                            >
                              <path
                                d="M18.8438 9.09375C19.4478 9.09375 19.9375 8.60406 19.9375 8C19.9375 7.39594 19.4478 6.90625 18.8438 6.90625H3.09375C2.48969 6.90625 2 7.39594 2 8C2 8.60406 2.48969 9.09375 3.09375 9.09375H18.8438Z"
                                fill="#006875"
                              />
                            </svg>
                            &nbsp; Customers
                          </a>
                          <a
                            style={{
                              color:
                                activeLink === "/guest-user" ? "#006875" : "",
                            }}
                            className="dropdown-item"
                            href="/guest-user"
                            onClick={handleGuestUserClick}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="16"
                              viewBox="0 0 22 16"
                              fill="none"
                            >
                              <path
                                d="M18.8438 9.09375C19.4478 9.09375 19.9375 8.60406 19.9375 8C19.9375 7.39594 19.4478 6.90625 18.8438 6.90625H3.09375C2.48969 6.90625 2 7.39594 2 8C2 8.60406 2.48969 9.09375 3.09375 9.09375H18.8438Z"
                                fill="#006875"
                              />
                            </svg>
                            &nbsp; Guest User
                          </a>
                          <a
                            style={{
                              color:
                                activeLink === "/user-vendor" ? "#006875" : "",
                            }}
                            className="dropdown-item"
                            href="/user-vendor"
                            onClick={handleVendorClick}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="16"
                              viewBox="0 0 22 16"
                              fill="none"
                            >
                              <path
                                d="M11.8438 9.09375C12.4478 9.09375 12.9375 8.60406 12.9375 8C12.9375 7.39594 12.4478 6.90625 11.8438 6.90625H3.09375C2.48969 6.90625 2 7.39594 2 8C2 8.60406 2.48969 9.09375 3.09375 9.09375H11.8438Z"
                                fill="#68727D"
                              />
                            </svg>
                            &nbsp; Vendors
                          </a>
                          <a
                            className="dropdown-item"
                            href="/sales-representatives"
                            style={{
                              color:
                                activeLink === "/sales-representatives"
                                  ? "#006875"
                                  : "",
                            }}
                            onClick={handleSlesRepresentativeClick}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="16"
                              viewBox="0 0 22 16"
                              fill="none"
                            >
                              <path
                                d="M11.8438 9.09375C12.4478 9.09375 12.9375 8.60406 12.9375 8C12.9375 7.39594 12.4478 6.90625 11.8438 6.90625H3.09375C2.48969 6.90625 2 7.39594 2 8C2 8.60406 2.48969 9.09375 3.09375 9.09375H11.8438Z"
                                fill="#68727D"
                              />
                            </svg>
                            &nbsp; Sales Representatives
                          </a>
                          <a
                            className="dropdown-item"
                            href="/admin"
                            style={{
                              color: activeLink === "/admin" ? "#006875" : "",
                            }}
                            onClick={handleAdminClick}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="16"
                              viewBox="0 0 22 16"
                              fill="none"
                            >
                              <path
                                d="M11.8438 9.09375C12.4478 9.09375 12.9375 8.60406 12.9375 8C12.9375 7.39594 12.4478 6.90625 11.8438 6.90625H3.09375C2.48969 6.90625 2 7.39594 2 8C2 8.60406 2.48969 9.09375 3.09375 9.09375H11.8438Z"
                                fill="#68727D"
                              />
                            </svg>
                            &nbsp; Admins
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                )}

              {/* <li
                className={`nav-item  ${
                  activeLink === "/analytics" ? "active" : ""
                }`}
              >
                <a
                  className="nav-link"
                  href="/permissions"
                  style={{
                    color: activeLink === "/analytics" ? "#006875" : "",
                    fontSize: activeLink === "/dashboard" ? "17px" : "",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M1.8335 11.0007C1.8335 6.67944 1.8335 4.51884 3.17592 3.17641C4.51835 1.83398 6.67895 1.83398 11.0002 1.83398C15.3214 1.83398 17.482 1.83398 18.8244 3.17641C20.1668 4.51884 20.1668 6.67944 20.1668 11.0007C20.1668 15.3219 20.1668 17.4825 18.8244 18.8249C17.482 20.1673 15.3214 20.1673 11.0002 20.1673C6.67895 20.1673 4.51835 20.1673 3.17592 18.8249C1.8335 17.4825 1.8335 15.3219 1.8335 11.0007Z"
                      stroke="#68727D"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M6.4165 12.8327L8.06365 10.8561C8.71636 10.0729 9.04272 9.68123 9.47206 9.68123C9.9014 9.68123 10.2278 10.0729 10.8805 10.8561L11.1192 11.1426C11.7719 11.9258 12.0983 12.3175 12.5276 12.3175C12.957 12.3175 13.2833 11.9258 13.936 11.1426L15.5832 9.16602"
                      stroke="#68727D"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="nav-link-title">
                    {" "}
                    &nbsp; Roles & Permissions{" "}
                  </span>
                </a>
              </li> */}
              {userPermissionList &&
                getMenuPermissions(
                  userPermissionList,
                  menuIdConstant.review,
                  permissionCategory.view
                ) && (
                  <li
                    className={`nav-item  ${
                      activeLink === "/review" ? "active" : ""
                    }`}
                  >
                    <a
                      className="nav-link"
                      href="/review"
                      style={{
                        color: activeLink === "/review" ? "#006875" : "",
                        fontSize: activeLink === "/review" ? "17px" : "",
                      }}
                      onClick={handleReviewClick}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                      >
                        <path
                          d="M1.8335 11.0007C1.8335 6.67944 1.8335 4.51884 3.17592 3.17641C4.51835 1.83398 6.67895 1.83398 11.0002 1.83398C15.3214 1.83398 17.482 1.83398 18.8244 3.17641C20.1668 4.51884 20.1668 6.67944 20.1668 11.0007C20.1668 15.3219 20.1668 17.4825 18.8244 18.8249C17.482 20.1673 15.3214 20.1673 11.0002 20.1673C6.67895 20.1673 4.51835 20.1673 3.17592 18.8249C1.8335 17.4825 1.8335 15.3219 1.8335 11.0007Z"
                          stroke="#68727D"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M6.4165 12.8327L8.06365 10.8561C8.71636 10.0729 9.04272 9.68123 9.47206 9.68123C9.9014 9.68123 10.2278 10.0729 10.8805 10.8561L11.1192 11.1426C11.7719 11.9258 12.0983 12.3175 12.5276 12.3175C12.957 12.3175 13.2833 11.9258 13.936 11.1426L15.5832 9.16602"
                          stroke="#68727D"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="nav-link-title"> &nbsp; Reviews </span>
                    </a>
                  </li>
                )}
              <li
                className={`nav-item ${
                  activeLink === "/add-on-services" ? "active" : ""
                }`}
              >
                <a
                  className="nav-link"
                  href="/add-on-services"
                  onClick={handleAddOnServiceClick}
                  style={{
                    color: activeLink === "/add-on-services" ? "#006875" : "",
                    fontSize: activeLink === "/add-on-services" ? "17px" : "",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M1.8335 11.0007C1.8335 6.67944 1.8335 4.51884 3.17592 3.17641C4.51835 1.83398 6.67895 1.83398 11.0002 1.83398C15.3214 1.83398 17.482 1.83398 18.8244 3.17641C20.1668 4.51884 20.1668 6.67944 20.1668 11.0007C20.1668 15.3219 20.1668 17.4825 18.8244 18.8249C17.482 20.1673 15.3214 20.1673 11.0002 20.1673C6.67895 20.1673 4.51835 20.1673 3.17592 18.8249C1.8335 17.4825 1.8335 15.3219 1.8335 11.0007Z"
                      stroke="#68727D"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M6.4165 12.8327L8.06365 10.8561C8.71636 10.0729 9.04272 9.68123 9.47206 9.68123C9.9014 9.68123 10.2278 10.0729 10.8805 10.8561L11.1192 11.1426C11.7719 11.9258 12.0983 12.3175 12.5276 12.3175C12.957 12.3175 13.2833 11.9258 13.936 11.1426L15.5832 9.16602"
                      stroke="#68727D"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="nav-link-title">
                    {" "}
                    &nbsp; Add on Services{" "}
                  </span>
                </a>
              </li>
              {userPermissionList &&
                getMenuPermissions(
                  userPermissionList,
                  menuIdConstant.eventsPackages,
                  permissionCategory.view
                ) && (
                  <li
                    className={`nav-item ${
                      activeLink === "/events-and-packages" ? "active" : ""
                    }`}
                  >
                    <a
                      className="nav-link"
                      href="/Events"
                      onClick={handleEventsAndPackage}
                      style={{
                        color:
                          activeLink === "/events-and-packages"
                            ? "#006875"
                            : "",
                        fontSize:
                          activeLink === "/events-and-packages" ? "17px" : "",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                      >
                        <path
                          d="M1.8335 11.0007C1.8335 6.67944 1.8335 4.51884 3.17592 3.17641C4.51835 1.83398 6.67895 1.83398 11.0002 1.83398C15.3214 1.83398 17.482 1.83398 18.8244 3.17641C20.1668 4.51884 20.1668 6.67944 20.1668 11.0007C20.1668 15.3219 20.1668 17.4825 18.8244 18.8249C17.482 20.1673 15.3214 20.1673 11.0002 20.1673C6.67895 20.1673 4.51835 20.1673 3.17592 18.8249C1.8335 17.4825 1.8335 15.3219 1.8335 11.0007Z"
                          stroke="#68727D"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M6.4165 12.8327L8.06365 10.8561C8.71636 10.0729 9.04272 9.68123 9.47206 9.68123C9.9014 9.68123 10.2278 10.0729 10.8805 10.8561L11.1192 11.1426C11.7719 11.9258 12.0983 12.3175 12.5276 12.3175C12.957 12.3175 13.2833 11.9258 13.936 11.1426L15.5832 9.16602"
                          stroke="#68727D"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="nav-link-title">
                        {" "}
                        &nbsp;Events and Packages{" "}
                      </span>
                    </a>
                  </li>
                )}
              {/* </div> */}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
