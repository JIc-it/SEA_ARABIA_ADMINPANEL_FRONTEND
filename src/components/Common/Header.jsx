import { useNavigate } from "react-router";
import { logoutRequest } from "../../services/authHandle";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import HeaderOffCanvas from "./HeaderOffCanvas";
import { getNotificationList } from "../../services/Notification";
import { getProfileData } from "../../services/Profile";

function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [notifycount, setNotifycount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [listPageUrl, setListPageUrl] = useState({
    next: null,
    previous: null,
  });
  const [data, setdata] = useState([]);
  const [customerDetails, setCustomerDetails] = useState([]);
  const [isupdated,setIsUpdated]=useState(false)

  useEffect(() => {
    setIsLoading(true);
   
      getNotificationList()
      .then((data) => {
        setIsLoading(false);
        setdata(data.results);
        setNotifycount(data.count);
        setListPageUrl({
          next: data.next,
          previous: data.previous,
        });
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
    
  }, [isupdated]);

  useEffect(() => {
    setIsLoading(true);
    getProfileData()
      .then((data) => {
        setIsLoading(false);
        if (data) {
          setCustomerDetails(data);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching customer data:", error);
      });
  }, []);
  return (
    <header className="navbar navbar-expand-md d-none d-lg-flex d-print-none">
      <div className="container-xl" style={{ marginRight: "15px" }}>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-menu"
          aria-controls="navbar-menu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-nav flex-row order-md-last">
          <div className="d-none d-md-flex">
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
            <div
              className="nav-item dropdown d-none d-md-flex me-3"
              onClick={() => setOpen(true)}
              style={{ position: "relative" }}
            >
              <a
                href="#"
                className="nav-link px-0"
              // data-bs-toggle="dropdown"
              // tabIndex="-1"
              // aria-label="Show notifications"
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
                <span className='py-1' style={{ position: "absolute", top: -8, right: -8, color: "white", fontSize: "9px", backgroundColor: "#2176FF", width: "20px", height: "20px", borderRadius: "33px", textAlign: "center" }}>

                  {notifycount !== 0 ? notifycount : 0}
                </span>
              </a>
            </div>
            {open && (
              <HeaderOffCanvas
              setIsUpdated={setIsUpdated}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                listPageUrl={listPageUrl}
                setListPageUrl={setListPageUrl}
                data={data}
                setdata={setdata}
                countset={setNotifycount}
                open={open}
                setOpen={setOpen}
              />
            )}
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
                  backgroundImage: `url(${process.env.PUBLIC_URL}/static/img/000m.jpg)`,
                  borderRadius: "50%",
                }}
              ></span>
              <div className="d-none d-xl-block ps-2">
                <div>
                  {customerDetails?.first_name}
                  {customerDetails?.last_name}
                </div>
                <div className="mt-1 small text-secondary">
                  {" "}
                  {customerDetails?.role}
                </div>
              </div>
            </button>
            <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <a href="/profile" className="dropdown-item">
                Profile
              </a>
              <a
                href="#"
                className="dropdown-item"
                onClick={async () => {
                  const logoutData = await logoutRequest();
                  if (logoutData) {
                    navigate(`/`);
                  } else {
                    toast.error("Logout Failed.");
                  }
                }}
              >
                Logout
              </a>
            </div>
          </div>
        </div>
        <div className="collapse navbar-collapse search_nav" id="navbar-menu">
          <div style={{ display: "none" }}>
            <form action="#" method="get" autocomplete="off" novalidate>
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
                  value=""
                  className="form-control"
                  placeholder="Search…"
                  aria-label="Search in website"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
