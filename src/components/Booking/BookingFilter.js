import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { getListDataInPagination } from "../../services/commonServices";
import { removeBaseUrlFromPath } from "../../helpers";
import { getUserList, getGuestList, getBookingList } from "../../services/booking";
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { getCategoryList } from "../../services/service";
import { getCompanyListing } from "../../services/offers"
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { PassingformatDate } from '../../helpers';

export default function BookingFilter({ open,checkfilterslength, handleClose, setFilters, filters, setTotalPages, setBookingList, setIsLoading, isLoading,itemsPerPage }) {
    const [active, setActive] = useState("Category")
    const [categorylist, setCategoryList] = useState([])
    const [vendorlist, setVendorList] = useState([]);
    const [listPageUrl, setListPageUrl] = useState({
        next: null,
    });
    const [guestlistPageUrl, setGuestListPageUrl] = useState({
        next: null,
    });
    const [customerList, setcustomerList] = useState([]);
    const [guestList, setguestList] = useState([]);
    const [search, setSearch] = useState({
        category: "",
        vendor: "",
        customer: "",
        guest: ""
    })

    useEffect(() => {
        getUserList()
            .then((data) => {
                setListPageUrl({ next: data.next });
                setcustomerList(() => ({
                    results: [...data.results]
                }));
            })
            .catch((error) => {
                toast.error(error.message);
            });

        getGuestList()
            .then((data) => {
                setGuestListPageUrl({ next: data.next });
                setguestList(() => ({
                    results: [...data.results]
                }));
            })
            .catch((error) => {
                toast.error(error.message);
            });
    }, []);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "60vw",
        bgcolor: 'background.paper',
        borderRadius: "5px",
        boxShadow: 24,
        p: 4,
        overflowY: 'auto', // Add this line for vertical scroll
        height: '90vh', // Adjust the maximum height if needed
    }
    useEffect(() => {
        getCategoryList()
            .then((data) =>
                setCategoryList(data)
            ).catch((error) =>
                console.error(error));

        getCompanyListing()
            .then((data) =>
                setVendorList(data)
            ).catch((error) =>
                console.error(error))
    }, [])

    const handlePagination = async (type) => {
        let convertedUrl =
            type === "next"
            && listPageUrl.next && removeBaseUrlFromPath(listPageUrl.next)
        convertedUrl &&
            getListDataInPagination(convertedUrl)
                .then((data) => {
                    setListPageUrl({ next: data.next });
                    setcustomerList((prev) => ({
                        results: [...prev.results, ...data.results],
                    }));
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });

    };

    const handlePaginationguest = async (type) => {
        let convertedUrl =
            type === "next"
            && guestlistPageUrl.next && removeBaseUrlFromPath(guestlistPageUrl.next)
        convertedUrl &&
            getListDataInPagination(convertedUrl)
                .then((data) => {
                    setGuestListPageUrl({ next: data.next });
                    setguestList((prev) => ({
                        results: [...prev.results, ...data.results],
                    }));
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });

    };


    const handleFilter = (e, field) => {
        const { name, value } = e.target;

        setFilters((prevFilters) => {
            // Check if category already has data
            const categoryArray = prevFilters[field].length > 0 ? prevFilters[field] : [];

            // Check if the value already exists in the category array
            const existingCategoryIndex = categoryArray.findIndex((item) => item.id === value);

            // If the value exists, remove it; otherwise, add or update it
            const updatedCategory = existingCategoryIndex !== -1
                ? [
                    ...categoryArray.slice(0, existingCategoryIndex),
                    ...categoryArray.slice(existingCategoryIndex + 1)
                ]
                : [...categoryArray, { id: value, name }];

            return {
                ...prevFilters,
                [field]: updatedCategory,
            };
        });
    };


    var mappedcategory = filters.category.map((data) => data.id).join(",");
    var mappedvendor = filters.vendor.map((data) => data.id).join(",");
    var mappedcustomer = filters.customer.map((data) => data.id).join(",");
    var mappedguest = filters.guest.map((data) => data.id).join(",");
    var mappedcustomer_type = filters.customer_type.map((data)=>data.name).join(",")
    var mappedstatus = filters.status.map((data) => data.name).join(",");

    const handleApplyFilter = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const Pass = {
                status: mappedstatus,
                search: "",
                refund_status: "",
                user: mappedcustomer,
                guest: mappedguest,
                category: mappedcategory,
                company: mappedvendor,
                user_type: mappedcustomer_type,
                commencement_date: { from: filters?.commencement_date?.from !=="" ?PassingformatDate(filters?.commencement_date?.from):"", to:filters?.commencement_date?.to !==""? PassingformatDate(filters?.commencement_date?.to):"" },

                creation_date: { from:filters?.creation_date?.from !==""? PassingformatDate(filters?.creation_date?.from):"", to:filters?.creation_date?.to !==""? PassingformatDate(filters?.creation_date?.to):"" }
            };

            const adminData = await getBookingList(Pass);

            if (adminData) {
                setIsLoading(false);
                handleClose()
                setBookingList(adminData.results);
                setTotalPages(Math.ceil(adminData?.count/itemsPerPage))
            } else {
                setIsLoading(false);
                toast.error(adminData.error.response.data)
            }

        } catch (err) {
            setIsLoading(false);
            toast.error(err.message)
        }

    }

    
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="p" component="p" sx={{ fontWeight: 800 }}>
                        Filter
                    </Typography>
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={() => {
                            handleClose();
                        }}
                        aria-label="close"
                        sx={{ position: 'absolute', top: 8, right: 14 }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <br />
                    <br />
                    <form onSubmit={handleApplyFilter} class="d-flex align-items-start" style={{ position: "relative" }}>
                        <div class="frame-427319790">
                            <div
                                class="nav flex-column nav-pills me-3"
                                id="v-pills-tab"
                                role="tablist"
                                aria-orientation="vertical"
                            >
                                <small>Service</small>
                                <button
                                    onClick={() => setActive("Category")}
                                    class="nav-link active mt-2 d-flex justify-content-between"
                                    id="v-pills-home-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#v-pills-home"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-home"
                                    aria-selected="true"
                                    style={{ width: "15vw", backgroundColor: "white", border: active === "Category" ? "1px solid #2176FF" : "" }}
                                >
                                    <span> Category</span>
                                    <span className='py-1' style={{ color: "white", fontSize: "12px", backgroundColor: active === "Category" ? "#2176FF" : "gray", width: "22px", height: "22px", borderRadius: "33px" }}>
                                        {filters.category.length}
                                    </span>
                                    <span><svg width={18} height={18} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.5 4.16797L12.5 10.0013L7.5 15.8346" stroke={active === "Category" ? "#2176FF" : "gray"} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                    </span>
                                </button>
                                <button
                                    class="nav-link mt-2 d-flex justify-content-between"
                                    onClick={() => setActive("Vendor")}
                                    style={{ width: "15vw", backgroundColor: "white", border: active === "Vendor" ? "1px solid #2176FF" : "" }}
                                    id="v-pills-profile-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#v-pills-profile"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-profile"
                                    aria-selected="false"
                                >
                                    <span> Vendor</span>
                                    <span className='py-1' style={{ color: "white", fontSize: "12px", backgroundColor: active === "Vendor" ? "#2176FF" : "gray", width: "22px", height: "22px", borderRadius: "33px" }}>
                                        {filters.vendor.length}
                                    </span>
                                    <span><svg width={18} height={18} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.5 4.16797L12.5 10.0013L7.5 15.8346" stroke={active === "Vendor" ? "#2176FF" : "gray"} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                    </span>
                                </button>
                                <small className='mt-2'>Customer</small>
                                <button
                                    onClick={() => setActive("Customer")}
                                    class="nav-link mt-2 d-flex justify-content-between"
                                    style={{ width: "15vw", backgroundColor: "white", border: active === "Customer" ? "1px solid #2176FF" : "" }}
                                    id="v-pills-messages-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#v-pills-messages"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-messages"
                                    aria-selected="false"
                                >
                                    <span> Customer</span>
                                    <span className='py-1' style={{ color: "white", fontSize: "12px", backgroundColor: active === "Customer" ? "#2176FF" : "gray", width: "22px", height: "22px", borderRadius: "33px" }}>
                                        {filters.customer.length}
                                    </span>
                                    <span><svg width={18} height={18} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.5 4.16797L12.5 10.0013L7.5 15.8346" stroke={active === "Customer" ? "#2176FF" : "gray"} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                    </span>
                                </button>
                                <button
                                    class="nav-link mt-2 d-flex justify-content-between"
                                    onClick={() => setActive("guest_user")}
                                    style={{ width: "15vw", backgroundColor: "white", border: active === "guest_user" ? "1px solid #2176FF" : "" }}
                                    id="v-pills-guest-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#v-pills-guest"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-guest"
                                    aria-selected="false"
                                >
                                    <span> Guest User</span>
                                    <span className='py-1' style={{ color: "white", fontSize: "12px", backgroundColor: active === "guest_user" ? "#2176FF" : "gray", width: "22px", height: "22px", borderRadius: "33px" }}>
                                        {filters.guest.length}
                                    </span>
                                    <span><svg width={18} height={18} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.5 4.16797L12.5 10.0013L7.5 15.8346" stroke={active === "guest_user" ? "#2176FF" : "gray"} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                    </span>
                                </button>
                                <button
                                    onClick={() => setActive("customer_type")}
                                    style={{ width: "15vw", backgroundColor: "white", border: active === "customer_type" ? "1px solid #2176FF" : "" }}
                                    class="nav-link mt-2 d-flex justify-content-between"
                                    id="v-pills-settings-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#v-pills-settings"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-settings"
                                    aria-selected="false"
                                >
                                    <span> Customer Type</span>
                                    <span className='py-1' style={{ color: "white", fontSize: "12px", backgroundColor: active === "customer_type" ? "#2176FF" : "gray", width: "22px", height: "22px", borderRadius: "33px" }}>
                                        {filters.customer_type.length}
                                    </span>
                                    <span><svg width={18} height={18} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.5 4.16797L12.5 10.0013L7.5 15.8346" stroke={active === "customer_type" ? "#2176FF" : "gray"} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                    </span>
                                </button>
                                <small className='mt-2'>Booking</small>
                                <button
                                    onClick={() => setActive("status")}
                                    style={{ width: "15vw", backgroundColor: "white", border: active === "status" ? "1px solid #2176FF" : "" }}
                                    class="nav-link mt-2 d-flex justify-content-between"
                                    id="v-pills-status-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#v-pills-status"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-status"
                                    aria-selected="false"
                                >
                                    <span> Booking Status</span>
                                    <span className='py-1' style={{ color: "white", fontSize: "12px", backgroundColor: active === "status" ? "#2176FF" : "gray", width: "22px", height: "22px", borderRadius: "33px" }}>
                                        {filters.status.length}
                                    </span>
                                    <span><svg width={18} height={18} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.5 4.16797L12.5 10.0013L7.5 15.8346" stroke={active === "status" ? "#2176FF" : "gray"} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                    </span>
                                </button>
                                <small className='mt-2'>Date</small>
                                <button
                                    onClick={() => setActive("creation")}
                                    class="nav-link mt-2 d-flex justify-content-between"
                                    style={{ width: "15vw", backgroundColor: "white", border: active === "creation" ? "1px solid #2176FF" : "" }}
                                    id="v-pills-creationDate-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#v-pills-creationDate"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-creationDate"
                                    aria-selected="false"
                                >
                                    <span> Creation Date</span>
                                    <span className='py-1' style={{ color: "white", fontSize: "12px", backgroundColor: active === "creation" ? "#2176FF" : "gray", width: "22px", height: "22px", borderRadius: "33px" }}>
                                        {filters.creation_date.from !== "" && filters.creation_date.to !== "" ? 2 : filters.creation_date.from !== "" ? 1 : filters.creation_date.to !== "" ? 1 : 0}
                                    </span>
                                    <span><svg width={18} height={18} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.5 4.16797L12.5 10.0013L7.5 15.8346" stroke={active === "creation" ? "#2176FF" : "gray"} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                    </span>
                                </button>
                                <button
                                    onClick={() => setActive("commencement")}
                                    class="nav-link mt-2 d-flex justify-content-between"
                                    style={{ width: "15vw", backgroundColor: "white", border: active === "commencement" ? "1px solid #2176FF" : "" }}
                                    id="v-pills-commencementDate-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#v-pills-commencementDate"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-commencementDate"
                                    aria-selected="false"
                                >
                                    <span> Commencement Date</span>
                                    <span className='py-1' style={{ color: "white", fontSize: "12px", backgroundColor: active === "commencement" ? "#2176FF" : "gray", width: "22px", height: "22px", borderRadius: "33px" }}>
                                        {filters.commencement_date.from !== "" && filters.commencement_date.to !== "" ? 2 : filters.commencement_date.from !== "" ? 1 : filters.commencement_date.to !== "" ? 1 : 0}
                                    </span>
                                    <span><svg width={18} height={18} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.5 4.16797L12.5 10.0013L7.5 15.8346" stroke={active === "commencement" ? "#2176FF" : "gray"} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                    </span>
                                </button>
                            </div>
                        </div>

                        <div
                            class="tab-content"
                            id="v-pills-tabContent"
                            style={{ position: "relative", left: 20 }}
                        >
                            <div
                                class="tab-pane fade show active"
                                id="v-pills-home"
                                role="tabpanel"
                                aria-labelledby="v-pills-home-tab"
                            >
                                <h4>Category</h4>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="search"
                                    onChange={(e) => setSearch((prev) => { return { ...prev, category: e.target.value } })}
                                />
                                <br />
                                <div style={{ height: "400px", overflow: "scroll", width: "500px" }} className='mx-2 p-2'>
                                    {categorylist.length > 0 &&
                                        categorylist.filter((dat) => dat["name"].toLowerCase().includes(search.category.toLowerCase())).map((data) =>
                                            <div class="form-check">
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    value={data.id}
                                                    name={data.name}
                                                    id={data.name}
                                                    checked={filters.category.find((items) => items.id === data.id)}
                                                    onChange={(e) => handleFilter(e, "category")}
                                                    style={{ width: 20, height: 20 }}
                                                />
                                                <label class="form-check-label" for="Boat">
                                                    {data.name}
                                                </label>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div
                                class="tab-pane fade"
                                id="v-pills-profile"
                                role="tabpanel"
                                aria-labelledby="v-pills-profile-tab"
                            >
                                <h4>Vendor</h4>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="search"
                                    onChange={(e) => setSearch((prev) => { return { ...prev, vendor: e.target.value } })}
                                />
                                <br />
                                <div style={{ height: "400px", overflow: "scroll", width: "500px" }} className='mx-2 p-2'>
                                    {vendorlist.length > 0 &&
                                        vendorlist.filter((dat) => dat["name"].toLowerCase().includes(search.vendor.toLowerCase())).map((data) =>
                                            <div class="form-check">
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    value={data.id}
                                                    name={data.name}
                                                    id={data.name}
                                                    checked={filters.vendor.find((items) => items.id === data.id)}
                                                    onChange={(e) => handleFilter(e, "vendor")}
                                                    style={{ width: 20, height: 20 }}
                                                />
                                                <label class="form-check-label" for="Boat">
                                                    {data.name}
                                                </label>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div
                                class="tab-pane fade"
                                id="v-pills-messages"
                                role="tabpanel"
                                aria-labelledby="v-pills-messages-tab"
                            >
                                <h4>Customer</h4>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="search"
                                    onChange={(e) => setSearch((prev) => { return { ...prev, customer: e.target.value } })}
                                />
                                <br />
                                <div style={{ height: "400px", overflow: "scroll", width: "500px" }} className='mx-2 p-2'>
                                    {customerList?.results?.length > 0 &&
                                        customerList?.results?.filter((dat) => dat["first_name"]?.toLowerCase()?.includes(search?.customer?.toLowerCase())).map((data) =>
                                            <div class="form-check">
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    value={data.id}
                                                    name={data.first_name}
                                                    id={data.first_name}
                                                    checked={filters.customer.find((items) => items.id === data.id)}
                                                    onChange={(e) => handleFilter(e, "customer")}
                                                    style={{ width: 20, height: 20 }}
                                                />
                                                <label class="form-check-label" for="Boat">
                                                    {data?.first_name}
                                                </label>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="card-footer">
                                    <ul className="pagination m-0 ms-auto">


                                        <li
                                            className={`page-item  ${!listPageUrl.next && "disabled"
                                                }`}
                                        >
                                            <a
                                                className="page-link"
                                                href="#"
                                                onClick={() => {
                                                    handlePagination("next");
                                                }}
                                            >
                                                View More

                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div
                                class="tab-pane fade"
                                id="v-pills-guest"
                                role="tabpanel"
                                aria-labelledby="v-pills-guest-tab"
                            >
                                <h4>Guest User</h4>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="search"
                                    onChange={(e) => setSearch((prev) => { return { ...prev, guest: e.target.value } })}
                                />
                                <br />
                                <div style={{ height: "400px", overflow: "scroll", width: "500px" }} className='mx-2 p-2'>
                                    {guestList?.results?.length > 0 &&
                                        guestList?.results?.filter((dat) => dat["first_name"]?.toLowerCase()?.includes(search?.guest?.toLowerCase())).map((data) =>
                                            <div class="form-check">
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    value={data.id}
                                                    name={data.first_name}
                                                    id={data.first_name}
                                                    checked={filters.guest.find((items) => items.id === data.id)}
                                                    onChange={(e) => handleFilter(e, "guest")}
                                                    style={{ width: 20, height: 20 }}
                                                />
                                                <label class="form-check-label" for="Boat">
                                                    {data?.first_name}
                                                </label>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="card-footer">
                                    <ul className="pagination m-0 ms-auto">


                                        <li
                                            className={`page-item  ${!guestlistPageUrl.next && "disabled"
                                                }`}
                                        >
                                            <a
                                                className="page-link"
                                                href="#"
                                                onClick={() => {
                                                    handlePaginationguest("next");
                                                }}
                                            >
                                                View More

                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div
                                class="tab-pane fade"
                                id="v-pills-settings"
                                role="tabpanel"
                                aria-labelledby="v-pills-settings-tab"
                            >
                                <h4>Customer Type</h4>
                                {/* <input
                                    type="text"
                                    className="form-control"
                                    placeholder="search"
                                    onChange={(e) => setSearch((prev) => { return { ...prev, customer_type: e.target.value } })}
                                /> */}



                                <div class="form-check">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        value={"1"}
                                        name="Registered"
                                        id="Registered"
                                        checked={filters.customer_type.find((items) => items.id === "1")}
                                        onChange={(e) => handleFilter(e, "customer_type")}
                                        style={{ width: 20, height: 20 }}
                                    />
                                    <label class="form-check-label" for="Boat">
                                        {"Registered"}
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        value={"2"}
                                        name="Guest"
                                        id="Guest"
                                        checked={filters.customer_type.find((items) => items.id === "2")}
                                        onChange={(e) => handleFilter(e, "customer_type")}
                                        style={{ width: 20, height: 20 }}
                                    />
                                    <label class="form-check-label" for="Boat">
                                        {"Guest"}
                                    </label>
                                </div>


                            </div>
                            <div
                                class="tab-pane fade"
                                id="v-pills-status"
                                role="tabpanel"
                                aria-labelledby="v-pills-settings-tab"
                            >
                                <h4>Booking Status</h4>
                                <div class="form-check">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        value={"1"}
                                        name="Completed"
                                        id="Completed"
                                        checked={filters.status.find((items) => items.id === "1")}
                                        onChange={(e) => handleFilter(e, "status")}
                                        style={{ width: 20, height: 20 }}
                                    />
                                    <label class="form-check-label" for="Boat">
                                        {"Completed"}
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        value={"2"}
                                        name="Unsuccessful"
                                        id="Unsuccessful"
                                        checked={filters.status.find((items) => items.id === "2")}
                                        onChange={(e) => handleFilter(e, "status")}
                                        style={{ width: 20, height: 20 }}
                                    />
                                    <label class="form-check-label" for="Boat">
                                        {"Unsuccessful"}
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        value={"3"}
                                        name="Upcoming"
                                        id="Upcoming"
                                        checked={filters.status.find((items) => items.id === "3")}
                                        onChange={(e) => handleFilter(e, "status")}
                                        style={{ width: 20, height: 20 }}
                                    />
                                    <label class="form-check-label" for="Boat">
                                        {"Upcoming"}
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        value={"4"}
                                        name="Cancelled"
                                        id="Cancelled"
                                        checked={filters.status.find((items) => items.id === "4")}
                                        onChange={(e) => handleFilter(e, "status")}
                                        style={{ width: 20, height: 20 }}
                                    />
                                    <label class="form-check-label" for="Boat">
                                        {"Cancelled"}
                                    </label>
                                </div>
                            </div>
                            <div
                                class="tab-pane fade"
                                id="v-pills-creationDate"
                                role="tabpanel"
                                aria-labelledby="v-pills-settings-tab"
                            >
                                <h4>Creation Date</h4>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='mx-2'>
                                        <label class="form-check-label mb-2" for="Boat">
                                            From
                                        </label>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                value={filters?.creation_date?.from}
                                                onChange={(newValue) => setFilters((prev) => { return { ...prev, creation_date: { from: newValue, to: filters.creation_date.to } } })}
                                            />

                                        </LocalizationProvider>
                                    </div>
                                    <div>
                                        <label class="form-check-label mb-2" for="Boat">
                                            To
                                        </label>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                value={filters?.creation_date?.to}
                                                onChange={(newValue) => setFilters((prev) => { return { ...prev, creation_date: { from: filters.creation_date.from, to: newValue } } })}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="tab-pane fade"
                                id="v-pills-commencementDate"
                                role="tabpanel"
                                aria-labelledby="v-pills-settings-tab"
                            >
                                <h4>Commencement Date</h4>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='mx-2'>
                                        <label class="form-check-label mb-2" for="Boat">
                                            From
                                        </label>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                value={filters?.commencement_date?.from}
                                                onChange={(newValue) => setFilters((prev) => { return { ...prev, commencement_date: { from: newValue, to: filters.commencement_date.to } } })}
                                            />

                                        </LocalizationProvider>
                                    </div>
                                    <div>
                                        <label class="form-check-label mb-2" for="Boat">
                                            To
                                        </label>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                value={filters?.commencement_date?.to}
                                                onChange={(newValue) => setFilters((prev) => { return { ...prev, commencement_date: { from: filters.commencement_date.from, to: newValue } } })}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='d-flex justify-content-end mt-3' style={{ position: "absolute", bottom: "-20%", right: 10 }}>
                            <button type='reset' className='m-1 btn btn-small btn-white' onClick={()=>{if(checkfilterslength){window.location.reload()}}}>Clear Filter</button>
                            <button type='submit' className='m-1 btn btn-small' style={{ backgroundColor: "#006875", color: "white" }}>Apply Filter</button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}
