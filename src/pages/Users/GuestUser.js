import React, { useState, useEffect } from 'react'
import guestUserImg from "../../static/img/guest-user.png"
import filterIcon from "../../static/img/Filter.png"
import { Link } from "react-router-dom";
import { getGuestUserRequest, getTotalGuestUser } from '../../services/CustomerHandle.jsx'
const GuestUser = () => {
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const handleOpenOffcanvas = () => setShowOffcanvas(true);
    const [reward_product_data, setGuestUsertData] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [totalGuestUser, setTotalGuestUser] = useState(0);

    useEffect(() => {
        console.log("Fetching reward product data...");

        getGuestUserRequest()
            .then((data) => {
                console.log("Fetched data:", data);
                setGuestUsertData(data.results);
            })
            .catch((error) => {
                console.error("Error fetching lead data:", error);
            });
    }, []);

    useEffect(() => {
        getTotalGuestUser()
          .then((data) => {
            setTotalGuestUser(data.count);
          })
          .catch((error) => {
            console.error("Error fetching total booking data:", error);
          });
      }, []);

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

    return (
        <div className="page" style={{ height: "100vh", top: 20 }}>
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-lg-12">
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
                                            <img src={guestUserImg} />
                                        </span>
                                    </div>
                                    <div className="col">
                                        <div className="font-weight-medium count_card_heading">
                                            Total Guest User
                                        </div>
                                        <div
                                            className="text-secondary"
                                            style={{ fontSize: "18px", fontWeight: "700" }}
                                        >
                                            {totalGuestUser}
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
                                    <th>
                                        <span>Action</span>
                                    </th>
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
                                                <span className="text-secondary">{rw_data.location}</span>
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
                                        </Link>
                                    </td>
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
                    <div className="card-footer d-flex align-items-center">
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
        </div>
    )
}

export default GuestUser
