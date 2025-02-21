import { Link } from "react-router-dom";
import filterIcon from "../../static/img/Filter.png"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import foodImg from "../../static/img/food.png"
import newBooking from "../../static/img/new-booking.png"
import totalBooking from "../../static/img/total-booking.png"
import confirmBooking from "../../static/img/confirm-booking.png"
import cancelBooking from "../../static/img/cancel-booking.png"
import AddNewService from "./AddNewService";
function AddOnServiceList() {
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
                                            <img src={totalBooking} />
                                        </span>
                                    </div>
                                    <div className="col">
                                        <div className="font-weight-medium count_card_heading">
                                            Total Booking
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
                                            <img src={newBooking} />
                                        </span>
                                    </div>
                                    <div className="col">
                                        <div className="font-weight-medium count_card_heading">
                                            New Booking
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
                                            <img src={confirmBooking} />
                                        </span>
                                    </div>
                                    <div className="col">
                                        <div className="font-weight-medium count_card_heading">
                                            Confirm Booking
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
                                            <img src={cancelBooking} />
                                        </span>
                                    </div>
                                    <div className="col">
                                        <div className="font-weight-medium count_card_heading">
                                            Cancelled Booking
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
                        <button
                            onClick={handleOpenOffcanvas}
                            className="btn btn-info vendor_button"
                            style={{ borderRadius: "6px" }}
                            type="button"
                        >
                            Create Add On &nbsp;
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
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-lg-12 mb-2">
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
                                            <img src={foodImg} style={{ width: '70%' }} />
                                        </span>
                                    </div>
                                    <div className="col">
                                        <div className="font-weight-medium count_card_heading" style={{ color: '#000', fontSize: 16, fontWeight: 600 }}>
                                            Food
                                        </div>
                                        <div
                                            className="text-secondary"
                                            style={{ fontSize: "14px", fontWeight: "400" }}
                                        >
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-lg-12 mb-2">
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
                                            <img src={foodImg} style={{ width: '70%' }} />
                                        </span>
                                    </div>
                                    <div className="col">
                                        <div className="font-weight-medium count_card_heading" style={{ color: '#000', fontSize: 16, fontWeight: 600 }}>
                                            Food
                                        </div>
                                        <div
                                            className="text-secondary"
                                            style={{ fontSize: "14px", fontWeight: "400" }}
                                        >
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showOffcanvas && (
                <AddNewService
                    show={showOffcanvas}
                    close={handleCloseOffcanvas}
                    isRefetch={isRefetch}
                    setIsRefetch={setIsRefetch}
                />
            )}
        </div>
    );
}

export default AddOnServiceList;
