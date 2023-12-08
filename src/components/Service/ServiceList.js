import { Link } from "react-router-dom";
import filterIcon from "../../static/img/Filter.png"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import foodImg from "../../static/img/food.png"
import totalVendor from "../../static/img/total-vendor.png"
import totalMachine from "../../static/img/total-machine.png"
import ActiveMachine from "../../static/img/active-machine.png"
import inactiveMachine from "../../static/img/inactive-machine.png"
// import AddNewService from "./AddNewService";
function ServiceList() {
    const navigate = useNavigate();
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [selectedValue, setSelectedValue] = useState("New Lead");

    const handleOpenOffcanvas = () => setShowOffcanvas(true);

    const handleCloseOffcanvas = () => setShowOffcanvas(false);

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    };
    const [listDiscount, setlistDiscount] = useState([]);

    const [isToggled, setToggled] = useState(true);

    const handleToggle = () => {
        setToggled(!isToggled);
    }
    const [isRefetch, setIsRefetch] = useState(false);
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
                                            469
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
                                            123
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
                                            326
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
                                            153
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
                                        />
                                        <button
                                            type="button"
                                            className="btn search_button"
                                            style={{ background: "#006875" }}
                                        >
                                            Search
                                        </button>
                                    </div>
                                    <button className="bg-black" style={{ borderRadius: "5px", marginLeft: "5px" }}>
                                        <img src={filterIcon} alt="filter" width={25} />
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                    <div className="action_buttons col-4">

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
                                    <th className="w-1">
                                        <span>Name</span>
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
                                <tr>
                                    <td>
                                        <span className="text-secondary">
                                            Achille Lauro
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-secondary">Boat</span>
                                    </td>
                                    <td>
                                        <span className="text-secondary">Round Trip Boat</span>
                                    </td>
                                    <td>
                                        <span className="text-secondary">
                                            StarLauro Cruises
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-secondary">Active</span>
                                    </td>

                                    <td>
                                        <span className="text-secondary">160</span>
                                    </td>
                                    <td
                                        style={{
                                            display: "flex",
                                            gap: "10px",
                                            alignItems: "baseline",
                                        }}
                                    >
                                        <Link
                                            to={"/service-view"}
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
                                <tr>
                                    <td>
                                        <span className="text-secondary">
                                            Achille Lauro
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-secondary">Boat</span>
                                    </td>
                                    <td>
                                        <span className="text-secondary">Round Trip Boat</span>
                                    </td>
                                    <td>
                                        <span className="text-secondary">
                                            StarLauro Cruises
                                        </span>
                                    </td>
                                    <td>
                                        <span className="text-secondary">Active</span>
                                    </td>

                                    <td>
                                        <span className="text-secondary">160</span>
                                    </td>
                                    <td
                                        style={{
                                            display: "flex",
                                            gap: "10px",
                                            alignItems: "baseline",
                                        }}
                                    >
                                        <Link
                                            to={""}
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
                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer d-flex align-items-center">
                        {/* <p className="m-0 text-secondary">
            Showing <span>1</span> to <span>8</span> of
            <span>16</span> entries
          </p> */}
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
                            {/* <li className="page-item active">
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
            </li> */}
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
        </div >
    );
}

export default ServiceList;
