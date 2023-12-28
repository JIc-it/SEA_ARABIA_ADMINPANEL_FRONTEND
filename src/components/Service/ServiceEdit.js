import React, { useEffect, useState } from 'react'
import Thumbnail_1 from "../../static/img/Rectangle 995.png"
import { Breadcrumb } from 'react-bootstrap';
import Thumbnail_2 from "../../static/img/Image Hover.png"
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Food from "../../assets/images/food.png"
import UploadPopup from './UploadModal';
import CreateAddon from './CreateAddon';
import { getOneService, getCategoryList, getsubcategorylist, getamenitieslist, UpdateService, DeleteImage, SetThumbNail } from "../../services/service"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import CircularProgress from "@mui/material/CircularProgress";
import TextEditor from './TextEditor';
import { Radio, Paper, Typography } from '@mui/material';
import PerDestinationTable from './PerDestinationTable';
import PerDurationTable from "./PerDurationTable"
import PerDayTable from './PerDayTable';
import PerTimeTable from './PerTimeTable';
import PerDateTable from './PerDateTable';
import PerDestinationModal from './PerDestinationModal';
import PerDurationModal from './PerDurationModal ';
import PerDayModal from './PerDayModal';
import PerTimeModal from './PerTimeModal';
import PerDateModal from './PerDateModal';

const ServiceEdit = () => {
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(false)
    const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
    const params = useParams()
    const [isupdated, setIsUpdated] = useState(false)

    const validationSchema = Yup.object({
        name: Yup.string()
            .required("Name is required")
            .max(20, "Name must be at most 20 characters"),
        machine_id: Yup.string()
            .required("Machine ID is required"),
        description: Yup.string()
            .required("Description is required"),
        capacity: Yup.number()
            .required("Capacity is required"),
        pickup_point: Yup.string()
            .required("Pickup Point is required"),
        cancellation_policy: Yup.string()
            .required("Privacy Policy is required"),
        refund_policy: Yup.string()
            .required("Refund Policy is required"),
    });

    const formik = useFormik({
        initialValues: {
            is_verified: false,
            is_active: false,
            is_top_suggestion: false,
            is_premium: false,
            type: "",
            category: [],
            sub_category: [],
            name: "",
            machine_id: "",
            description: "",
            lounge: 0,
            bedroom: 0,
            toilet: 0,
            capacity: 0,
            amenities: [],
            pickup_point: "",
            cancellation_policy: "",
            refund_policy: "",
            service_image: [],
            price_cretrion: "Per Destination",
            booking_type: "Booking Entirely",
            minimum: 0,
            maximum: 0
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);

            const amenitiesmappedid = values.amenities.map((data) => { return data.id })
            const formattedAmenities = amenitiesmappedid.join(', ');

            const data = {
                is_verified: values.is_verified,
                is_active: values.is_active,
                is_top_suggestion: values.is_top_suggestion,
                is_premium: values.is_premium,
                type: values.type,
                name: values.name,
                machine_id: values.machine_id,
                description: values.description,
                lounge: values.lounge,
                bedroom: values.bedroom,
                toilet: values.toilet,
                capacity: values.capacity,
                pickup_point: values.pickup_point,
                cancellation_policy: values.cancellation_policy,
                refund_policy: values.refund_policy,
                category: values.category[0]?.id,
                sub_category: values.sub_category[0]?.id,
                amenities: formattedAmenities,
            }
            if (!isLoading) {
                try {
                    const adminData = await UpdateService(params.id, data);

                    if (adminData) {
                        setIsLoading(false);
                        //   window.location.reload();
                        toast.success("Updated Successfully")
                        // setIsUpdated(true)
                    } else {
                        console.error("Error while creating Admin:", adminData.error);
                        setIsLoading(false);
                    }
                    setIsLoading(false);
                } catch (err) {
                    console.log(err);
                    setIsLoading(false);
                }
            }
        },
    });
    const navigate = useNavigate()
    const [hovereffect, setHoverEffect] = useState("");
    const [categorylist, setCategoryList] = useState([])
    const [categoryId, setCategoryId] = useState("")
    const [subcategorylist, setSubcategoryList] = useState([])
    const [amenitieslist, setAmenitiesList] = useState([])

    const handleHoverEffectTrue = (id) => {
        setHoverEffect(id)
    }
    const handleHoverEffectFalse = () => {
        setHoverEffect("")
    }

    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const [openAddon, setOpenAddon] = useState(false)

    const handleCloseAddon = () => {
        setOpenAddon(false)
    }

    const handleOpenAddon = () => {
        setOpenAddon(true)
    }

    //first load
    useEffect(() => {
        setIsLoading(true)
        getOneService(params.id)
            .then((data) => {
                console.log(data,"all");
                setIsLoading(false)
                formik.setFieldValue("is_verified", data?.is_verified);
                formik.setFieldValue("is_top_suggestion", data?.is_top_suggestion);
                formik.setFieldValue("is_premium", data?.is_premium);
                formik.setFieldValue("type", data?.type);
                formik.setFieldValue("category", data?.category);
                formik.setFieldValue("sub_category", data?.sub_category);
                formik.setFieldValue("name", data?.name);
                formik.setFieldValue("machine_id", data?.machine_id);
                formik.setFieldValue("description", data?.description);
                formik.setFieldValue("lounge", data?.lounge);
                formik.setFieldValue("bedroom", data?.bedroom);
                formik.setFieldValue("toilet", data?.toilet);
                formik.setFieldValue("capacity", data?.capacity);
                formik.setFieldValue("amenities", data?.amenities);
                formik.setFieldValue("pickup_point", data?.pickup_point);
                formik.setFieldValue("cancellation_policy", data?.cancellation_policy);
                formik.setFieldValue("refund_policy", data?.refund_policy);
                formik.setFieldValue("is_active", data?.is_active);
                formik.setFieldValue("service_image", data?.service_image);
                formik.setFieldValue("price", data?.price);
                setIsUpdated(false)
            }
            ).catch((error) => {
                setIsLoading(false);
                toast.error(error.response.data)
            })
    }, [params.id])

    //update load
    useEffect(() => {
        getOneService(params.id)
            .then((data) => {
                formik.setFieldValue("is_verified", data?.is_verified);
                formik.setFieldValue("is_top_suggestion", data?.is_top_suggestion);
                formik.setFieldValue("is_premium", data?.is_premium);
                formik.setFieldValue("type", data?.type);
                formik.setFieldValue("category", data?.category);
                formik.setFieldValue("sub_category", data?.sub_category);
                formik.setFieldValue("name", data?.name);
                formik.setFieldValue("machine_id", data?.machine_id);
                formik.setFieldValue("description", data?.description);
                formik.setFieldValue("lounge", data?.lounge);
                formik.setFieldValue("bedroom", data?.bedroom);
                formik.setFieldValue("toilet", data?.toilet);
                formik.setFieldValue("capacity", data?.capacity);
                formik.setFieldValue("amenities", data?.amenities);
                formik.setFieldValue("pickup_point", data?.pickup_point);
                formik.setFieldValue("cancellation_policy", data?.cancellation_policy);
                formik.setFieldValue("refund_policy", data?.refund_policy);
                formik.setFieldValue("is_active", data?.is_active);
                formik.setFieldValue("service_image", data?.service_image);
                formik.setFieldValue("price", data?.price);
                setIsUpdated(false)
            }
            ).catch((error) => {
                setIsLoading(false);
                toast.error(error.response.data)
            })
    }, [params.id, isupdated])

    useEffect(() => {
        getCategoryList()
            .then((data) =>
                setCategoryList(data?.results)
            ).catch((error) =>
                console.error(error))
    }, [])

    useEffect(() => {
        getsubcategorylist(categoryId)
            .then((data) =>
                setSubcategoryList(data?.results)
            ).catch((error) =>
                console.error(error))
    }, [categoryId])

    useEffect(() => {
        getamenitieslist()
            .then((data) =>
                setAmenitiesList(data?.results)
            ).catch((error) =>
                console.error(error))
    }, [])

    const categorystore = (id, name, image) => {
        formik.setValues((prev) => {
            const isCategoryExists = prev.category.some((category) => category.id === id);

            if (!isCategoryExists) {
                return {
                    ...prev,
                    category: [{ id: id, name: name, image: image }]
                };
            }

            return prev;
        });
    };

    const subcategorystore = (id, name, category) => {
        formik.setValues((prev) => {
            const isCategoryExists = prev.sub_category.some((category) => category.id === id);

            if (!isCategoryExists) {
                return {
                    ...prev,
                    sub_category: [{ id: id, name: name, category: category }]
                };
            }

            return prev;
        });
    };
    const amenitiesstore = (id, name, image) => {
        formik.setValues((prev) => {
            const isCategoryExists = prev.amenities.some((category) => category.id === id);

            if (!isCategoryExists) {
                return {
                    ...prev,
                    amenities: [...prev.amenities, { id: id, name: name, image: image }]
                };
            }

            return prev;
        });
    };

    const handleIncrement = (fieldName) => {
        formik.setFieldValue(fieldName, formik.values[fieldName] + 1);
    };

    const handleDecrement = (fieldName) => {
        formik.setFieldValue(fieldName, Math.max(0, formik.values[fieldName] - 1));
    };

    const handleRemoveImage = (id) => {
        DeleteImage(id)
            .then((data) => { toast.success(data); setIsUpdated(true) }
            ).catch((error) =>
                toast.error(error.response.data))
    }

    const settingthumbnailTrue = (id, data) => {
        SetThumbNail(id, data)
            .then((datas) => {
                toast.success(datas);
                toast.error(datas)
            }
            ).catch((error) =>
                toast.error(error.response.data))
    }
    const [validateeditor, setValidateEditor] = useState("")

    function submit(e) {
        e.preventDefault();
        if (formik.values.description.replace("<p><br></p>", "").trim() === "") {
            return setValidateEditor("Description Required")
        }
        else if (formik.values.description.trim() !== "") {
            return formik.handleSubmit()
        }
    }
    const [PerDestinationopen, setPerDestinationopen] = useState(false)

    const handleopendestination = () => {
        setPerDestinationopen(true)
    }
    const handleclosedestination = () => {
        setPerDestinationopen(false)
    }
    const [PerDurationopen, setPerDurationopen] = useState(false)

    const handleopenduration = () => {
        setPerDurationopen(true)
    }
    const handlecloseduration = () => {
        setPerDurationopen(false)
    }
    const [PerDayopen, setPerDayopen] = useState(false)

    const handleopenday = () => {
        setPerDayopen(true)
    }
    const handlecloseday = () => {
        setPerDayopen(false)
    }
    const [PerTimeopen, setPerTimeopen] = useState(false)

    const handleopentime = () => {
        setPerTimeopen(true)
    }
    const handleclosetime = () => {
        setPerTimeopen(false)
    }
    const [PerDateopen, setPerDateopen] = useState(false)

    const handleopenDate = () => {
        setPerDateopen(true)
    }
    const handlecloseDate = () => {
        setPerDateopen(false)
    }

    const handleModalOpens = () => {
        if (formik.values.price_cretrion === "Per Destination") {
            setPerDestinationopen(true)
        }
        if (formik.values.price_cretrion === "Per Duration") {
            setPerDurationopen(true)
        }
        if (formik.values.price_cretrion === "Per Day") {
            setPerDayopen(true)
        }
        if (formik.values.price_cretrion === "Per Time") {
            setPerTimeopen(true)
        }
        if (formik.values.price_cretrion === "Per Date") {
            setPerDateopen(true)
        }
    }
    return (
        <>
            {!isLoading && <div className="page" style={{ top: 20 }}>
                <div className='container'>
                    <Breadcrumb style={{ marginLeft: "5px" }}>
                        <Breadcrumb.Item href="#">Services
                            <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.33333 5L12.7441 9.41074C13.0695 9.73618 13.0695 10.2638 12.7441 10.5893L8.33333 15" stroke="#68727D" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            <span style={{ color: "#006875" }}>{formik.values.name}</span>
                            <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.33333 5L12.7441 9.41074C13.0695 9.73618 13.0695 10.2638 12.7441 10.5893L8.33333 15" stroke="#68727D" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            <span style={{ color: "#006875" }}>Edit Service</span>

                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div className='d-flex justify-content-between mt-5 ms-3'>
                        <div style={{ cursor: "pointer" }} onClick={() => navigate(-1)}>
                            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 12H4M4 12L10 6M4 12L10 18" stroke="#252525" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg> &nbsp;<span style={{ fontWeight: "800" }}>Back</span>
                        </div>

                    </div>
                    <form onSubmit={submit} className='row' style={{ position: "relative" }} >
                        <div className={!isMobileView ? 'col-8' : "col-12"}>
                            <div className="card mt-2" style={{ width: isMobileView ? "col-12" : "col-8", borderRadius: "8px" }}>
                                <div className="p-5">
                                    <p style={{ fontWeight: "600" }}>Service Details</p>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: isMobileView ? "column" : "row" }}>
                                        <div className="mr-2" style={{ width: isMobileView ? "80vw" : "35vw" }}>
                                            <div>
                                                <label
                                                    htmlFor=""
                                                    style={{ paddingBottom: "10px", fontWeight: "600", fontSize: "13px" }}
                                                >
                                                    Category <span style={{ color: "red" }}>*</span>
                                                </label>
                                                <select
                                                    className="form-control"
                                                    name="category"
                                                    onChange={(e) => {
                                                        formik.handleChange(e)
                                                        const selectedCategory = e.target.value;
                                                        setCategoryId(selectedCategory)
                                                        const selectedCategoryData = categorylist.find(category => category.id === selectedCategory);
                                                        if (selectedCategoryData) {
                                                            categorystore(selectedCategoryData.id, selectedCategoryData.name, selectedCategoryData.image);
                                                        }
                                                    }}
                                                >
                                                    <optgroup label="Selected Category">
                                                        {/* {formik.values.category?.map((data) => ( */}
                                                        <option selected key={formik.values.category[0]?.id} value={formik.values.category[0]?.id}>
                                                            {formik.values.category[0]?.name}
                                                        </option>
                                                        {/* ))} */}
                                                    </optgroup>

                                                    {/* Options from subcategorylist */}
                                                    <optgroup label="Category List">
                                                        {categorylist?.map((data) => (
                                                            <option key={data.id} value={data.id}>
                                                                {data.name}
                                                            </option>
                                                        ))}
                                                    </optgroup>
                                                </select>
                                            </div>
                                            <div className="mt-2">
                                                <label
                                                    htmlFor=""
                                                    style={{ paddingBottom: "10px", fontWeight: "600", fontSize: "13px" }}
                                                >
                                                    Name <span style={{ color: "red" }}>*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    placeholder="Name"
                                                    value={formik.values.name}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.name && formik.errors.name ? (
                                                    <div className="error">{formik.errors.name}</div>
                                                ) : null}
                                            </div>

                                        </div>
                                        <div className={!isMobileView ? "ms-3" : ""} style={{ width: isMobileView ? "80vw" : "35vw" }}>
                                            <div className="mt-2">
                                                <label
                                                    htmlFor=""
                                                    style={{ paddingBottom: "10px", fontWeight: "600", fontSize: "13px" }}
                                                >
                                                    Sub Category <span style={{ color: "red" }}>*</span>
                                                </label>
                                                <select
                                                    className="form-control"
                                                    name="subcategory"
                                                    onChange={(e) => {
                                                        formik.handleChange(e)
                                                        const selectedCategory = e.target.value;
                                                        const selectedCategoryData = subcategorylist.find(category => category.id === selectedCategory);
                                                        if (selectedCategoryData) {
                                                            subcategorystore(selectedCategoryData.id, selectedCategoryData.name, selectedCategoryData.category);
                                                        }
                                                    }}
                                                >
                                                    <optgroup label="Selected Sub-Category">
                                                        <option selected key={formik.values.sub_category[0]?.id} value={formik.values.sub_category[0]?.id}>
                                                            {formik.values.sub_category[0]?.name}
                                                        </option>
                                                    </optgroup>


                                                    <optgroup label="Subcategory List">
                                                        {subcategorylist?.map((data) => (
                                                            <option key={data.id} value={data.id}>
                                                                {data.name}
                                                            </option>
                                                        ))}
                                                    </optgroup>

                                                </select>

                                            </div>
                                            <div className="mt-2">
                                                <label
                                                    htmlFor=""
                                                    style={{ paddingBottom: "10px", fontWeight: "600", fontSize: "13px" }}
                                                >
                                                    ID <span style={{ color: "red" }}>*</span>
                                                </label>
                                                <div>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="machine_id"
                                                        placeholder="ID"
                                                        value={formik.values.machine_id}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                    />
                                                    {formik.touched.machine_id && formik.errors.machine_id ? (
                                                        <div className="error">{formik.errors.machine_id}</div>
                                                    ) : null}

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <label
                                            htmlFor=""
                                            style={{ paddingBottom: "10px", fontWeight: "600" }}
                                        >
                                            Description
                                        </label>
                                        {/* <textarea
                                        name="description"
                                        cols="30"
                                        rows="10"
                                        className="form-control"
                                        placeholder="Description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    ></textarea>
                                    {formik.touched.description && formik.errors.description ? (
                                        <div className="error">{formik.errors.description}</div>
                                    ) : null} */}
                                        <TextEditor formik={formik} validateeditor={validateeditor} setValidateEditor={setValidateEditor} />
                                    </div>
                                    <br></br>
                                    <div className="mt-5">
                                        <span style={{ fontWeight: "600" }}>Details</span>
                                        <div className="d-flex mt-2">
                                            <div className="mt-1">
                                                <span style={{ color: "#68727D", fontSize: "15px" }}>Lounge</span>
                                                <div className="mt-2">
                                                    <button type="button" className="btn px-1 py-1 mx-1" onClick={() => handleDecrement("lounge")}><svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M3 10H17" stroke="#68727D" strokeWidth={2} strokeLinecap="round" />
                                                    </svg>

                                                    </button>
                                                    <span className="mx-1">{formik.values.lounge}</span>
                                                    <button type="button" onClick={() => handleIncrement("lounge")} className="btn px-1 py-1 mx-1"><svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10 3L10 17" stroke="#252525" strokeWidth={2} strokeLinecap="round" />
                                                        <path d="M3 10H17" stroke="#252525" strokeWidth={2} strokeLinecap="round" />
                                                    </svg></button>
                                                </div>
                                            </div>


                                            <div className="mt-1 ms-4">
                                                <span style={{ color: "#68727D", fontSize: "15px" }}>Bedroom</span>
                                                <div className="mt-2">
                                                    <button type="button" onClick={() => handleDecrement("bedroom")} className="btn px-1 py-1 mx-1"><svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M3 10H17" stroke="#68727D" strokeWidth={2} strokeLinecap="round" />
                                                    </svg></button>
                                                    <span className="mx-1">{formik.values.bedroom}</span>
                                                    <button type="button" onClick={() => handleIncrement("bedroom")} className="btn px-1 py-1 mx-1">
                                                        <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M10 3L10 17" stroke="#252525" strokeWidth={2} strokeLinecap="round" />
                                                            <path d="M3 10H17" stroke="#252525" strokeWidth={2} strokeLinecap="round" />
                                                        </svg>


                                                    </button>
                                                </div>
                                            </div>


                                            <div className="mt-1 ms-4">
                                                <span style={{ color: "#68727D", fontSize: "15px" }}>Toilet</span>
                                                <div className="mt-2">
                                                    <button type="button" onClick={() => handleDecrement("toilet")} className="btn px-1 py-1 mx-1"><svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M3 10H17" stroke="#68727D" strokeWidth={2} strokeLinecap="round" />
                                                    </svg></button>
                                                    <span className="mx-1">{formik.values.toilet}</span>
                                                    <button type="button" onClick={() => handleIncrement("toilet")} className="btn px-1 py-1 mx-1"><svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10 3L10 17" stroke="#252525" strokeWidth={2} strokeLinecap="round" />
                                                        <path d="M3 10H17" stroke="#252525" strokeWidth={2} strokeLinecap="round" />
                                                    </svg></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: isMobileView ? "column" : "row" }} className="mt-2">
                                        <div className="mr-2" style={{ width: isMobileView ? "80vw" : "35vw" }}>
                                            <div>
                                                <label
                                                    htmlFor=""
                                                    style={{ paddingBottom: "10px", fontWeight: "600", fontSize: "13px" }}
                                                >
                                                    Capacity <span style={{ color: "red" }}>*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    name="capacity"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={formik.values.capacity}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.capacity && formik.errors.capacity ? (
                                                    <div className="error">{formik.errors.capacity}</div>
                                                ) : null}
                                            </div>
                                            <div className="mt-2">
                                                <label
                                                    htmlFor=""
                                                    style={{ paddingBottom: "10px", fontWeight: "600", fontSize: "13px" }}
                                                >Pickup Point
                                                    <span style={{ color: "red" }}>*</span>
                                                </label>
                                                <div style={{ position: "relative" }}>
                                                    <input
                                                        type="text"
                                                        placeholder=""
                                                        className="form-control"
                                                        name="pickup_point"
                                                        value={formik.values.pickup_point}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                    />
                                                    {formik.touched.pickup_point && formik.errors.pickup_point ? (
                                                        <div className="error">{formik.errors.pickup_point}</div>
                                                    ) : null}
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                        style={{ top: "10px", right: "5px", position: "absolute" }}
                                                    >
                                                        <path
                                                            d="M3.3335 8.45209C3.3335 4.70425 6.31826 1.66602 10.0002 1.66602C13.6821 1.66602 16.6668 4.70425 16.6668 8.45209C16.6668 12.1706 14.5391 16.5097 11.2193 18.0614C10.4454 18.4231 9.55495 18.4231 8.78105 18.0614C5.46127 16.5097 3.3335 12.1706 3.3335 8.45209Z"
                                                            stroke="#68727D"
                                                            stroke-width="1.5"
                                                        />
                                                        <ellipse
                                                            cx="10"
                                                            cy="8.33398"
                                                            rx="2.5"
                                                            ry="2.5"
                                                            stroke="#68727D"
                                                            stroke-width="1.5"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>

                                        </div>
                                        <div className={!isMobileView ? "ms-3" : ""} style={{ width: isMobileView ? "80vw" : "35vw" }}>
                                            <div style={{ transform: isMobileView ? "" : "translateY(-60%)" }} className="mt-2">
                                                <label
                                                    htmlFor=""
                                                    style={{ paddingBottom: "10px", fontWeight: "600", fontSize: "13px" }}
                                                >
                                                    Amenities <span style={{ color: "red" }}>*</span>
                                                </label>
                                                <select
                                                    className="form-control"
                                                    name="amenities"
                                                    // value={formik.values.subcategory}
                                                    // onChange={formik.handleChange}
                                                    // onBlur={formik.handleBlur}
                                                    onChange={(e) => {
                                                        formik.handleChange(e)
                                                        const selectedCategory = e.target.value;
                                                        const selectedCategoryData = amenitieslist.find(category => category.id === selectedCategory);
                                                        if (selectedCategoryData) {
                                                            amenitiesstore(selectedCategoryData.id, selectedCategoryData.name, selectedCategoryData.image);
                                                        }
                                                    }}
                                                >
                                                    <optgroup label="Selected Amenities">
                                                        {formik.values.amenities?.map((data) => (
                                                            <option selected key={data.id} value={data.id}>
                                                                {data.name}
                                                            </option>
                                                        ))}
                                                    </optgroup>


                                                    <optgroup label="Amenities List">
                                                        {amenitieslist?.map((data) => (
                                                            <option key={data.id} value={data.id}>
                                                                {data.name}
                                                            </option>
                                                        ))}
                                                    </optgroup>

                                                </select>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card mt-2" style={{ width: isMobileView ? "col-12" : "col-8", borderRadius: "8px" }}>
                                <div className="col-12 p-5">
                                    <p style={{ fontWeight: "600" }}>Pricing</p>
                                    <p style={{ fontWeight: "550" }}>Profit Method</p>
                                    <div style={{ display: "flex", flexDirection: isMobileView ? "column" : "row" }}>
                                        <div className={`${isMobileView}? "col-12":"col-4" mx-1`} style={{ marginBottom: isMobileView ? "5px" : "" }}>
                                            <div className="card p-2">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <svg width={40} height={40} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28Z" fill="#ECF4FF" />
                                                            <path d="M14.667 27.9987C14.667 22.9704 14.667 20.4562 16.2291 18.8941C17.7912 17.332 20.3053 17.332 25.3337 17.332H30.667C35.6953 17.332 38.2095 17.332 39.7716 18.8941C41.3337 20.4562 41.3337 22.9704 41.3337 27.9987V30.6654C41.3337 35.6937 41.3337 38.2078 39.7716 39.7699C38.2095 41.332 35.6953 41.332 30.667 41.332H25.3337C20.3053 41.332 17.7912 41.332 16.2291 39.7699C14.667 38.2078 14.667 35.6937 14.667 30.6654V27.9987Z" stroke="#252525" strokeWidth="1.5" />
                                                            <path d="M21.333 17.332V15.332" stroke="#252525" strokeWidth="1.5" strokeLinecap="round" />
                                                            <path d="M34.667 17.332V15.332" stroke="#252525" strokeWidth="1.5" strokeLinecap="round" />
                                                            <path d="M15.333 24H40.6663" stroke="#252525" strokeWidth="1.5" strokeLinecap="round" />
                                                            <path d="M35.9997 34.6667C35.9997 35.403 35.4027 36 34.6663 36C33.93 36 33.333 35.403 33.333 34.6667C33.333 33.9303 33.93 33.3333 34.6663 33.3333C35.4027 33.3333 35.9997 33.9303 35.9997 34.6667Z" fill="#252525" />
                                                            <path d="M35.9997 29.3333C35.9997 30.0697 35.4027 30.6667 34.6663 30.6667C33.93 30.6667 33.333 30.0697 33.333 29.3333C33.333 28.597 33.93 28 34.6663 28C35.4027 28 35.9997 28.597 35.9997 29.3333Z" fill="#252525" />
                                                            <path d="M29.3337 34.6667C29.3337 35.403 28.7367 36 28.0003 36C27.2639 36 26.667 35.403 26.667 34.6667C26.667 33.9303 27.2639 33.3333 28.0003 33.3333C28.7367 33.3333 29.3337 33.9303 29.3337 34.6667Z" fill="#252525" />
                                                            <path d="M29.3337 29.3333C29.3337 30.0697 28.7367 30.6667 28.0003 30.6667C27.2639 30.6667 26.667 30.0697 26.667 29.3333C26.667 28.597 27.2639 28 28.0003 28C28.7367 28 29.3337 28.597 29.3337 29.3333Z" fill="#252525" />
                                                            <path d="M22.6667 34.6667C22.6667 35.403 22.0697 36 21.3333 36C20.597 36 20 35.403 20 34.6667C20 33.9303 20.597 33.3333 21.3333 33.3333C22.0697 33.3333 22.6667 33.9303 22.6667 34.6667Z" fill="#252525" />
                                                            <path d="M22.6667 29.3333C22.6667 30.0697 22.0697 30.6667 21.3333 30.6667C20.597 30.6667 20 30.0697 20 29.3333C20 28.597 20.597 28 21.3333 28C22.0697 28 22.6667 28.597 22.6667 29.3333Z" fill="#252525" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p style={{ fontWeight: "550" }}>Ownership</p>
                                                        <span className="text-wrap" style={{ fontSize: "12px" }}>
                                                            The vendor gets a fixed amount monthly from the platform. The customers pay extra as service fee.
                                                        </span>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" style={{ height: "20px", width: "20px", borderRadius: "10px" }} type="checkbox" value="" id="defaultCheck1" defaultChecked />
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                        <div className={`${isMobileView}?"col-12":"col-4" mx-1`} style={{ marginBottom: isMobileView ? "5px" : "" }}>
                                            <div className="card p-2">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <svg width={40} height={40} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28Z" fill="#ECF4FF" />
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M28.0003 15.668C21.1888 15.668 15.667 21.1898 15.667 28.0013C15.667 34.8128 21.1888 40.3346 28.0003 40.3346C34.8118 40.3346 40.3337 34.8128 40.3337 28.0013C40.3337 21.1898 34.8118 15.668 28.0003 15.668ZM13.667 28.0013C13.667 20.0852 20.0842 13.668 28.0003 13.668C35.9164 13.668 42.3337 20.0852 42.3337 28.0013C42.3337 35.9174 35.9164 42.3346 28.0003 42.3346C20.0842 42.3346 13.667 35.9174 13.667 28.0013ZM28.0003 19.0013C28.5526 19.0013 29.0003 19.449 29.0003 20.0013V20.4236C31.1742 20.8129 33.0003 22.4461 33.0003 24.668C33.0003 25.2203 32.5526 25.668 32.0003 25.668C31.448 25.668 31.0003 25.2203 31.0003 24.668C31.0003 23.7634 30.2482 22.8058 29.0003 22.4646V27.0903C31.1742 27.4795 33.0003 29.1128 33.0003 31.3346C33.0003 33.5565 31.1742 35.1897 29.0003 35.579V36.0013C29.0003 36.5536 28.5526 37.0013 28.0003 37.0013C27.448 37.0013 27.0003 36.5536 27.0003 36.0013V35.579C24.8264 35.1897 23.0003 33.5565 23.0003 31.3346C23.0003 30.7824 23.448 30.3346 24.0003 30.3346C24.5526 30.3346 25.0003 30.7824 25.0003 31.3346C25.0003 32.2392 25.7525 33.1968 27.0003 33.538V28.9123C24.8264 28.5231 23.0003 26.8898 23.0003 24.668C23.0003 22.4461 24.8264 20.8129 27.0003 20.4236V20.0013C27.0003 19.449 27.448 19.0013 28.0003 19.0013ZM27.0003 22.4646C25.7525 22.8058 25.0003 23.7634 25.0003 24.668C25.0003 25.5726 25.7525 26.5301 27.0003 26.8713V22.4646ZM29.0003 29.1313V33.538C30.2482 33.1968 31.0003 32.2392 31.0003 31.3346C31.0003 30.43 30.2482 29.4725 29.0003 29.1313Z" fill="#252525" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p style={{ fontWeight: "550" }}>Upselling with markup</p>
                                                        <span className="text-wrap" style={{ fontSize: "12px" }}>
                                                            The vendor gets a fixed amount monthly from the platform. The customers pay extra as service fee.
                                                        </span>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" style={{ height: "20px", width: "20px", borderRadius: "10px" }} type="checkbox" value="" id="defaultCheck1" defaultChecked />
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                        <div className={`${isMobileView}?"col-12":"col-4" mx-1`}>
                                            <div className="card p-2">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <svg width={40} height={40} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28Z" fill="#ECF4FF" />
                                                            <ellipse cx="24.0003" cy="20.0013" rx="5.33333" ry="5.33333" stroke="#252525" strokeWidth="1.5" />
                                                            <path d="M32 24C34.2091 24 36 22.2091 36 20C36 17.7909 34.2091 16 32 16" stroke="#252525" strokeWidth="1.5" strokeLinecap="round" />
                                                            <ellipse cx="24.0003" cy="34.6654" rx="9.33333" ry="5.33333" stroke="#252525" strokeWidth="1.5" />
                                                            <path d="M36 30.668C38.339 31.1809 40 32.4799 40 34.0013C40 35.3737 38.6484 36.5652 36.6667 37.1619" stroke="#252525" strokeWidth="1.5" strokeLinecap="round" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p style={{ fontWeight: "550" }}>Revenue sharing</p>
                                                        <span className="text-wrap" style={{ fontSize: "12px" }}>
                                                            The vendor gets a fixed amount monthly from the platform. The customers pay extra as service fee.
                                                        </span>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" style={{ height: "20px", width: "20px", borderRadius: "10px" }} type="checkbox" value="" id="defaultCheck1" defaultChecked />
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div>

                                    {/* <div className="px-5"> */}
                                    <p style={{ fontWeight: 550, fontSize: "14px", marginTop: "8px", }} className='ms-5'>Pricing Critreion</p>
                                    <div className={isMobileView ? "d-flex flex-column" : 'd-flex justify-content-center'}>
                                        <Paper
                                            onClick={() => formik.setFieldValue("price_cretrion", "Per Destination")}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                border: '1px solid lightgray',
                                                width: isMobileView ? "100%" : "17%",
                                                border: formik.values.price_cretrion === "Per Destination" ? '2px solid rgb(112, 112, 241)' : '1px solid lightgray',
                                                padding: '5px',
                                                margin: "5px"
                                            }}
                                        >
                                            <Typography variant="body1" sx={{ fontSize: "12px", fontWeight: "550" }}>Per Destination</Typography>
                                            <Radio name={formik.values.price_cretrion} checked={formik.values.price_cretrion === "Per Destination"} />
                                        </Paper>
                                        <Paper
                                            onClick={() => formik.setFieldValue("price_cretrion", "Per Duration")}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginTop: isMobileView ? "5px" : "",
                                                alignItems: 'center',
                                                border: formik.values.price_cretrion === "Per Duration" ? '2px solid rgb(112, 112, 241)' : '1px solid lightgray',
                                                width: isMobileView ? "100%" : "17%",
                                                borderRadius: '5px',
                                                padding: '5px',
                                                margin: "5px"
                                            }}
                                        >
                                            <Typography variant="body1" sx={{ fontSize: "12px", fontWeight: "550" }}>Per Duration</Typography>
                                            <Radio name={formik.values.price_cretrion} checked={formik.values.price_cretrion === "Per Duration"} />
                                        </Paper>
                                        <Paper
                                            onClick={() => formik.setFieldValue("price_cretrion", "Per Day")}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginTop: isMobileView ? "5px" : "",
                                                alignItems: 'center',
                                                border: formik.values.price_cretrion === "Per Day" ? '2px solid rgb(112, 112, 241)' : '1px solid lightgray',
                                                width: isMobileView ? "100%" : "17%",
                                                borderRadius: '5px',
                                                padding: '5px',
                                                margin: "5px"
                                            }}
                                        >
                                            <Typography variant="body1" sx={{ fontSize: "12px", fontWeight: "550" }}>Per Day</Typography>
                                            <Radio name={formik.values.price_cretrion} checked={formik.values.price_cretrion === "Per Day"} />
                                        </Paper>
                                        <Paper
                                            onClick={() => formik.setFieldValue("price_cretrion", "Per Time")}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginTop: isMobileView ? "5px" : "",
                                                alignItems: 'center',
                                                border: formik.values.price_cretrion === "Per Time" ? '2px solid rgb(112, 112, 241)' : '1px solid lightgray',
                                                width: isMobileView ? "100%" : "17%",
                                                borderRadius: '5px',
                                                padding: '5px',
                                                margin: "5px"
                                            }}
                                        >
                                            <Typography variant="body1" sx={{ fontSize: "12px", fontWeight: "550" }}>Per Time</Typography>
                                            <Radio name={formik.values.price_cretrion} checked={formik.values.price_cretrion === "Per Time"} />
                                        </Paper>
                                        <Paper
                                            onClick={() => formik.setFieldValue("price_cretrion", "Per Date")}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginTop: isMobileView ? "5px" : "",
                                                alignItems: 'center',
                                                border: formik.values.price_cretrion === "Per Date" ? '2px solid rgb(112, 112, 241)' : '1px solid lightgray',
                                                width: isMobileView ? "100%" : "17%",
                                                borderRadius: '5px',
                                                padding: '5px',
                                                margin: "5px"
                                            }}
                                        >
                                            <Typography variant="body1" sx={{ fontSize: "12px", fontWeight: "550" }}>Per Date</Typography>
                                            <Radio name={formik.values.price_cretrion} checked={formik.values.price_cretrion === "Per Date"} />
                                        </Paper>
                                    </div>
                                    {/* </div> */}
                                    <p style={{ fontWeight: 550, fontSize: "14px", marginTop: "8px", }} className='ms-5'>Booking type</p>
                                    <div className={isMobileView ? "d-flex flex-column" : 'd-flex justify-content-start ms-5'}>
                                        <Paper
                                            onClick={() => formik.setFieldValue("booking_type", "Booking Entirely")}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                border: '1px solid lightgray',
                                                width: isMobileView ? "100%" : "45%",
                                                border: formik.values.booking_type === "Booking Entirely" ? '2px solid rgb(112, 112, 241)' : '1px solid lightgray',
                                                padding: '5px',
                                                margin: "5px"
                                            }}
                                        >
                                            <Typography variant="body1" sx={{ fontSize: "12px", fontWeight: "550" }}>Booking Entirely</Typography>
                                            <Radio name={formik.values.booking_type} checked={formik.values.booking_type === "Booking Entirely"} />
                                        </Paper>
                                        <Paper
                                            onClick={() => formik.setFieldValue("booking_type", "Per Head Booking")}
                                            style={{
                                                display: formik.values.price_cretrion.trim() === "Per Destination" || formik.values.price_cretrion.trim() === "Per Duration" ? 'none' : 'flex',
                                                justifyContent: 'space-between',
                                                marginTop: isMobileView ? "5px" : "",
                                                alignItems: 'center',
                                                border: formik.values.booking_type === "Per Head Booking" ? '2px solid rgb(112, 112, 241)' : '1px solid lightgray',
                                                width: isMobileView ? "100%" : "45%",
                                                borderRadius: '5px',
                                                padding: '5px',
                                                margin: "5px"
                                            }}
                                        >
                                            <Typography variant="body1" sx={{ fontSize: "12px", fontWeight: "550" }}>Per Head Booking</Typography>
                                            <Radio name={formik.values.booking_type} checked={formik.values.booking_type === "Per Head Booking"} />
                                        </Paper>
                                    </div>
                                </div>
                                {formik.values.booking_type === "Per Head Booking" && <div className={isMobileView ? "d-flex flex-column" : 'd-flex justify-content-start mx-5 mt-5'} >
                                    <div style={{ border: "1px solid lightgray" }} className="px-3 py-3 rounded">
                                        <span style={{ fontWeight: "600" }}>Set Purchase Limits</span>
                                        <div className="d-flex mt-2">
                                            <div className="mt-1">
                                                <span style={{ color: "#68727D", fontSize: "15px" }}>Minimum</span>
                                                <div className="mt-2">
                                                    <button type="button" className="btn px-1 py-1 mx-1" onClick={() => handleDecrement("minimum")}><svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M3 10H17" stroke="#68727D" strokeWidth={2} strokeLinecap="round" />
                                                    </svg>

                                                    </button>
                                                    <span className="mx-1">{formik.values.minimum}</span>
                                                    <button type="button" onClick={() => handleIncrement("minimum")} className="btn px-1 py-1 mx-1"><svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10 3L10 17" stroke="#252525" strokeWidth={2} strokeLinecap="round" />
                                                        <path d="M3 10H17" stroke="#252525" strokeWidth={2} strokeLinecap="round" />
                                                    </svg></button>
                                                </div>
                                            </div>


                                            <div className="mt-1 ms-4">
                                                <span style={{ color: "#68727D", fontSize: "15px" }}>Maximum</span>
                                                <div className="mt-2">
                                                    <button type="button" onClick={() => handleDecrement("maximum")} className="btn px-1 py-1 mx-1"><svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M3 10H17" stroke="#68727D" strokeWidth={2} strokeLinecap="round" />
                                                    </svg></button>
                                                    <span className="mx-1">{formik.values.maximum}</span>
                                                    <button type="button" onClick={() => handleIncrement("maximum")} className="btn px-1 py-1 mx-1">
                                                        <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M10 3L10 17" stroke="#252525" strokeWidth={2} strokeLinecap="round" />
                                                            <path d="M3 10H17" stroke="#252525" strokeWidth={2} strokeLinecap="round" />
                                                        </svg>


                                                    </button>
                                                </div>
                                            </div>



                                        </div>
                                    </div>
                                </div>}
                                <div className={isMobileView ? "d-flex flex-column p-4" : " p-4 d-flex"} >
                                    <div style={{ width: "100%" }} >
                                        <div className='d-flex justify-content-between mb-2'>
                                            <label
                                                htmlFor=""
                                                style={{ paddingBottom: "10px", fontWeight: "600", fontSize: "13px" }}
                                            >
                                                Price
                                            </label>
                                            <button type="button" className='btn btn-blue' style={{ backgroundColor: "#187AF7", padding: "1px 3px" }} onClick={handleModalOpens}>Add Price</button>
                                        </div>
                                        {formik.values.price_cretrion === "Per Destination" && <PerDestinationTable />}
                                        {formik.values.price_cretrion === "Per Duration" && <PerDurationTable />}
                                        {formik.values.price_cretrion === "Per Day" && <PerDayTable />}
                                        {formik.values.price_cretrion === "Per Time" && <PerTimeTable />}
                                        {formik.values.price_cretrion === "Per Date" && <PerDateTable />}
                                    </div>
                                </div>
                            </div>

                            {formik.values.price_cretrion === "Per Destination" && PerDestinationopen && <PerDestinationModal handleClose={handleclosedestination} handleOpen={handleopendestination} open={PerDestinationopen} />}
                            {formik.values.price_cretrion === "Per Duration" && PerDurationopen && <PerDurationModal handleClose={handlecloseduration} handleOpen={handleopenduration} open={PerDurationopen} />}
                            {formik.values.price_cretrion === "Per Day" && PerDayopen && <PerDayModal handleClose={handlecloseday} handleOpen={handleopenday} open={PerDayopen} />}
                            {formik.values.price_cretrion === "Per Time" && PerTimeopen && <PerTimeModal handleClose={handleclosetime} handleOpen={handleopentime} open={PerTimeopen} />}
                            {formik.values.price_cretrion === "Per Date" && PerDateopen && <PerDateModal handleClose={handlecloseDate} handleOpen={handleopenDate} open={PerDateopen} />}

                            <div style={{ backgroundColor: "#FFFF", borderRadius: "5px" }} className="mt-4 w-100 p-4">
                                <p className="p-2" style={{ fontWeight: "700" }}>Privacy Policy</p>
                                <textarea
                                    name="cancellation_policy"
                                    id=""
                                    cols="30"
                                    rows="10"
                                    className="form-control"
                                    placeholder="Privacy Policy"
                                    value={formik.values.cancellation_policy}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                ></textarea>
                                {formik.touched.cancellation_policy && formik.errors.cancellation_policy ? (
                                    <div className="error">{formik.errors.cancellation_policy}</div>
                                ) : null}
                                <p className="p-2 mt-2" style={{ fontWeight: "700" }}>Return Policy</p>
                                <textarea
                                    name="refund_policy"
                                    id=""
                                    cols="30"
                                    rows="10"
                                    className="form-control"
                                    placeholder="Notes"
                                    value={formik.values.refund_policy}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                ></textarea>
                                {formik.touched.refund_policy && formik.errors.refund_policy ? (
                                    <div className="error">{formik.errors.refund_policy}</div>
                                ) : null}
                            </div>
                            <div style={{ backgroundColor: "#FFFF", borderRadius: "5px" }} className="mt-4 w-100 p-4">
                                <p className="p-2 mt-2" style={{ fontWeight: "700" }}>Set Status</p>
                                <div className='d-flex justify-content-between align-items-center mx-2'>
                                    <p>Status</p>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <div style={{ fontSize: "12px" }}>{formik.values.is_active === true ? "Active" : "Inactive"}</div>
                                        <label class="switch" style={{ marginLeft: "5px" }}>
                                            <input type="checkbox" name="is_active" checked={formik.values.is_active} value={formik.values.is_active} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                            <span class="slider round"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4'>
                            <div style={{ backgroundColor: "#FFFF", borderRadius: "5px" }} className="mt-3 w-100 px-2">
                                <div className='d-flex justify-content-between align-items-center'>
                                    <p className="p-2" style={{ fontWeight: "700" }}>Images</p>
                                    <button type='button' onClick={handleOpen} className='btn px-2 py-1' style={{ backgroundColor: "#187AF7", color: "#ffff", fontSize: "12px" }} >Upload</button>
                                </div>
                                {open && <UploadPopup setIsLoading={setIsLoading} setIsUpdated={setIsUpdated} open={open} handleClose={handleClose} handleOpen={handleOpen} service_image={formik.values.service_image} />}
                                <p style={{ fontWeight: "550", fontSize: "12px" }}>Thumbnail</p>
                                <div className="row">
                                    {formik.values.service_image.map((data) => (
                                        <div className="col-6 mb-3" key={data.id}>
                                            <div style={{ position: "relative" }}
                                                onMouseEnter={() => handleHoverEffectTrue(data.id)}
                                                onMouseLeave={() => handleHoverEffectFalse()}
                                            >
                                                <img src={data.image} className='rounded' style={{ width: "200px", height: "125px", opacity: hovereffect === data.id ? 0.5 : 1 }} />
                                                {hovereffect === data.id &&
                                                    <div style={{ position: "absolute", bottom: "50px", left: "20px", backgroundColor: "lightblack" }}>
                                                        <button type="button" className="btn btn-blue px-1 py-1 me-1" style={{ fontSize: "10px", cursor: "pointer" }} onClick={() => settingthumbnailTrue(data.id, data.service)}>setThumbnail</button>
                                                        <button type="button" className="btn btn-danger px-1 py-1" style={{ fontSize: "10px", cursor: "pointer" }} onClick={() => handleRemoveImage(data.id)}>Remove</button>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    ))}
                                    {/* <div className="col-6 mb-3">
                                    <div style={{ position: "relative" }} onMouseEnter={handleHoverEffectTrue} onMouseLeave={handleHoverEffectFalse}>
                                        <img src={Thumbnail_1} />
                                        {hovereffect &&
                                            <div style={{ position: "absolute", bottom: "50px", left: "20px" }}>
                                                <button className="btn btn-blue px-1 py-1 me-1" style={{ fontSize: "10px", cursor: "pointer" }}>setThumbnail</button>
                                                <button className="btn btn-danger px-1 py-1" style={{ fontSize: "10px", cursor: "pointer" }}>Remove</button>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="col-6 mb-3">
                                    <div style={{ position: "relative" }} onMouseEnter={handleHoverEffectTrue} onMouseLeave={handleHoverEffectFalse}>
                                        <img src={Thumbnail_1} />
                                        {hovereffect &&
                                            <div style={{ position: "absolute", bottom: "50px", left: "20px" }}>
                                                <button className="btn btn-blue px-1 py-1 me-1" style={{ fontSize: "10px", cursor: "pointer" }}>setThumbnail</button>
                                                <button className="btn btn-danger px-1 py-1" style={{ fontSize: "10px", cursor: "pointer" }}>Remove</button>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="col-6 mb-3">
                                    <div style={{ position: "relative" }} onMouseEnter={handleHoverEffectTrue} onMouseLeave={handleHoverEffectFalse}>
                                        <img src={Thumbnail_1} />
                                        {hovereffect &&
                                            <div style={{ position: "absolute", bottom: "50px", left: "20px" }}>
                                                <button className="btn btn-blue px-1 py-1 me-1" style={{ fontSize: "10px", cursor: "pointer" }}>setThumbnail</button>
                                                <button className="btn btn-danger px-1 py-1" style={{ fontSize: "10px", cursor: "pointer" }}>Remove</button>
                                            </div>
                                        }
                                    </div>
                                </div> */}
                                </div>
                            </div>
                        </div>
                        {/* <div className='col-lg-4' style={{position:"absolute",top:"400px",right:"0%",display:isMobileView?"none":""}}>
                        <div style={{ backgroundColor: "#FFFF", borderRadius: "5px" }} className="mt-4 w-100 px-2 py-2">
                            <div className='d-flex justify-content-between align-items-center'>
                            <p className="p-2" style={{ fontWeight: "700" }}>Add on services</p>
                            <button type="button" onClick={handleOpenAddon} className='btn px-2 py-1' style={{backgroundColor:"#187AF7",color:"#ffff",fontSize:"12px"}} >Create Add On</button>
                            </div>
                            {openAddon && <CreateAddon close={handleCloseAddon} show={openAddon}/>}
                            <div style={{border:"1px solid lightgray",borderRadius:"5px"}} className='d-flex justify-content-between align-items-center p-2 my-3'>
                                <div>
                                <img src={Food} width={50} height={40}/>
                                </div>
                                <div>
                                    <div className='d-flex align-items-center justify-content-between mx-2'>
                                        <div style={{fontWeight:"550"}}>Food | 50 KWD</div>
                                        <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
                                            <div style={{ display: "flex", alignItems: "center",padding:"5px" }}>
                                                <div style={{ fontSize: "12px" }}>{"ACTIVE"}</div>
                                                <label class="switch" style={{ marginLeft: "5px" }}>
                                                    <input type="checkbox" defaultChecked />
                                                    <span class="slider round"></span>
                                                </label>
                                            </div> 
                                            <button style={{backgroundColor:"transparent",border:"none",color:"#2684FC"}}>
                                                <svg width={21} height={21} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.61719 19.082C3.61719 18.7369 3.89701 18.457 4.24219 18.457H17.5755C17.9207 18.457 18.2005 18.7369 18.2005 19.082C18.2005 19.4272 17.9207 19.707 17.5755 19.707H4.24219C3.89701 19.707 3.61719 19.4272 3.61719 19.082Z" fill="#2684FC" />
                                                    <path d="M9.71963 13.9347C9.93175 13.7693 10.1242 13.5768 10.5089 13.1921L15.4395 8.26151C14.7684 7.98222 13.9736 7.52344 13.222 6.77176C12.4702 6.01996 12.0114 5.22502 11.7321 4.5539L6.8014 9.48457L6.80138 9.48459C6.41663 9.86934 6.22424 10.0617 6.05879 10.2739C5.86361 10.5241 5.69628 10.7948 5.55975 11.0813C5.44401 11.3242 5.35797 11.5823 5.18589 12.0985L4.27849 14.8207C4.19381 15.0748 4.25992 15.3549 4.44927 15.5442C4.63863 15.7336 4.91871 15.7997 5.17275 15.715L7.89497 14.8076C8.4112 14.6355 8.66932 14.5495 8.91217 14.4337C9.19865 14.2972 9.4694 14.1299 9.71963 13.9347Z" fill="#2684FC" />
                                                    <path d="M16.8077 6.89334C17.8315 5.86954 17.8315 4.20962 16.8077 3.18582C15.7839 2.16202 14.124 2.16202 13.1002 3.18582L12.5088 3.77718C12.5169 3.80163 12.5253 3.82642 12.534 3.85154C12.7508 4.4763 13.1597 5.29531 13.9291 6.06465C14.6984 6.83399 15.5174 7.24296 16.1422 7.45971C16.1672 7.46839 16.1919 7.47675 16.2162 7.48481L16.8077 6.89334Z" fill="#2684FC" />
                                                </svg>

                                                    Edit
                                            </button>
                                        </div>
                                    </div>
                                    <div style={{color:"#68727D"}} className='mx-2'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.
                                    </div>
                                </div>
                            </div>
                            <div style={{border:"1px solid lightgray",borderRadius:"5px"}} className='d-flex justify-content-between align-items-center p-2 my-3'>
                                <div>
                                <img src={Food} width={50} height={40}/>
                                </div>
                                <div>
                                    <div className='d-flex align-items-center justify-content-between mx-2'>
                                        <div style={{fontWeight:"550"}}>Food | 50 KWD</div>
                                        <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
                                            <div style={{ display: "flex", alignItems: "center",padding:"5px" }}>
                                                <div style={{ fontSize: "12px" }}>{"ACTIVE"}</div>
                                                <label class="switch" style={{ marginLeft: "5px" }}>
                                                    <input type="checkbox" defaultChecked />
                                                    <span class="slider round"></span>
                                                </label>
                                            </div> 
                                            <button style={{backgroundColor:"transparent",border:"none",color:"#2684FC"}}>
                                                <svg width={21} height={21} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.61719 19.082C3.61719 18.7369 3.89701 18.457 4.24219 18.457H17.5755C17.9207 18.457 18.2005 18.7369 18.2005 19.082C18.2005 19.4272 17.9207 19.707 17.5755 19.707H4.24219C3.89701 19.707 3.61719 19.4272 3.61719 19.082Z" fill="#2684FC" />
                                                    <path d="M9.71963 13.9347C9.93175 13.7693 10.1242 13.5768 10.5089 13.1921L15.4395 8.26151C14.7684 7.98222 13.9736 7.52344 13.222 6.77176C12.4702 6.01996 12.0114 5.22502 11.7321 4.5539L6.8014 9.48457L6.80138 9.48459C6.41663 9.86934 6.22424 10.0617 6.05879 10.2739C5.86361 10.5241 5.69628 10.7948 5.55975 11.0813C5.44401 11.3242 5.35797 11.5823 5.18589 12.0985L4.27849 14.8207C4.19381 15.0748 4.25992 15.3549 4.44927 15.5442C4.63863 15.7336 4.91871 15.7997 5.17275 15.715L7.89497 14.8076C8.4112 14.6355 8.66932 14.5495 8.91217 14.4337C9.19865 14.2972 9.4694 14.1299 9.71963 13.9347Z" fill="#2684FC" />
                                                    <path d="M16.8077 6.89334C17.8315 5.86954 17.8315 4.20962 16.8077 3.18582C15.7839 2.16202 14.124 2.16202 13.1002 3.18582L12.5088 3.77718C12.5169 3.80163 12.5253 3.82642 12.534 3.85154C12.7508 4.4763 13.1597 5.29531 13.9291 6.06465C14.6984 6.83399 15.5174 7.24296 16.1422 7.45971C16.1672 7.46839 16.1919 7.47675 16.2162 7.48481L16.8077 6.89334Z" fill="#2684FC" />
                                                </svg>

                                                    Edit
                                            </button>
                                        </div>
                                    </div>
                                    <div style={{color:"#68727D"}} className='mx-2'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.
                                    </div>
                                </div>
                            </div>
                            <div style={{border:"1px solid lightgray",borderRadius:"5px"}} className='d-flex justify-content-between align-items-center p-2 my-3'>
                                <div>
                                <img src={Food} width={50} height={40}/>
                                </div>
                                <div>
                                    <div className='d-flex align-items-center justify-content-between mx-2'>
                                        <div style={{fontWeight:"550"}}>Food | 50 KWD</div>
                                        <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
                                            <div style={{ display: "flex", alignItems: "center",padding:"5px" }}>
                                                <div style={{ fontSize: "12px" }}>{"ACTIVE"}</div>
                                                <label class="switch" style={{ marginLeft: "5px" }}>
                                                    <input type="checkbox" defaultChecked />
                                                    <span class="slider round"></span>
                                                </label>
                                            </div> 
                                            <button style={{backgroundColor:"transparent",border:"none",color:"#2684FC"}}>
                                                <svg width={21} height={21} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.61719 19.082C3.61719 18.7369 3.89701 18.457 4.24219 18.457H17.5755C17.9207 18.457 18.2005 18.7369 18.2005 19.082C18.2005 19.4272 17.9207 19.707 17.5755 19.707H4.24219C3.89701 19.707 3.61719 19.4272 3.61719 19.082Z" fill="#2684FC" />
                                                    <path d="M9.71963 13.9347C9.93175 13.7693 10.1242 13.5768 10.5089 13.1921L15.4395 8.26151C14.7684 7.98222 13.9736 7.52344 13.222 6.77176C12.4702 6.01996 12.0114 5.22502 11.7321 4.5539L6.8014 9.48457L6.80138 9.48459C6.41663 9.86934 6.22424 10.0617 6.05879 10.2739C5.86361 10.5241 5.69628 10.7948 5.55975 11.0813C5.44401 11.3242 5.35797 11.5823 5.18589 12.0985L4.27849 14.8207C4.19381 15.0748 4.25992 15.3549 4.44927 15.5442C4.63863 15.7336 4.91871 15.7997 5.17275 15.715L7.89497 14.8076C8.4112 14.6355 8.66932 14.5495 8.91217 14.4337C9.19865 14.2972 9.4694 14.1299 9.71963 13.9347Z" fill="#2684FC" />
                                                    <path d="M16.8077 6.89334C17.8315 5.86954 17.8315 4.20962 16.8077 3.18582C15.7839 2.16202 14.124 2.16202 13.1002 3.18582L12.5088 3.77718C12.5169 3.80163 12.5253 3.82642 12.534 3.85154C12.7508 4.4763 13.1597 5.29531 13.9291 6.06465C14.6984 6.83399 15.5174 7.24296 16.1422 7.45971C16.1672 7.46839 16.1919 7.47675 16.2162 7.48481L16.8077 6.89334Z" fill="#2684FC" />
                                                </svg>

                                                    Edit
                                            </button>
                                        </div>
                                    </div>
                                    <div style={{color:"#68727D"}} className='mx-2'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4' style={{display:isMobileView?"block":"none"}}>
                        <div style={{ backgroundColor: "#F8F8F8", borderRadius: "5px" }} className="mt-4 w-100 px-2 py-2">
                        <div className='d-flex justify-content-between align-items-center'>
                            <p className="p-2" style={{ fontWeight: "700" }}>Add on services</p>
                            <button type="button" onClick={handleOpenAddon} className='btn px-2 py-1' style={{backgroundColor:"#187AF7",color:"#ffff",fontSize:"12px"}} >Create Add On</button>
                            </div>
                            {openAddon && <CreateAddon close={handleCloseAddon} show={openAddon}/>}
                            <div style={{border:"1px solid lightgray",borderRadius:"5px"}} className='d-flex justify-content-between align-items-center p-2 my-3'>
                                <div>
                                <img src={Food} width={50} height={40}/>
                                </div>
                                <div>
                                    <div className='d-flex align-items-center justify-content-between mx-2'>
                                        <div style={{fontWeight:"550"}}>Food | 50 KWD</div>
                                        <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
                                            <div style={{ display: "flex", alignItems: "center",padding:"5px" }}>
                                                <div style={{ fontSize: "12px" }}>{"ACTIVE"}</div>
                                                <label class="switch" style={{ marginLeft: "5px" }}>
                                                    <input type="checkbox" defaultChecked />
                                                    <span class="slider round"></span>
                                                </label>
                                            </div> 
                                            <button style={{backgroundColor:"transparent",border:"none",color:"#2684FC"}}>
                                                <svg width={21} height={21} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.61719 19.082C3.61719 18.7369 3.89701 18.457 4.24219 18.457H17.5755C17.9207 18.457 18.2005 18.7369 18.2005 19.082C18.2005 19.4272 17.9207 19.707 17.5755 19.707H4.24219C3.89701 19.707 3.61719 19.4272 3.61719 19.082Z" fill="#2684FC" />
                                                    <path d="M9.71963 13.9347C9.93175 13.7693 10.1242 13.5768 10.5089 13.1921L15.4395 8.26151C14.7684 7.98222 13.9736 7.52344 13.222 6.77176C12.4702 6.01996 12.0114 5.22502 11.7321 4.5539L6.8014 9.48457L6.80138 9.48459C6.41663 9.86934 6.22424 10.0617 6.05879 10.2739C5.86361 10.5241 5.69628 10.7948 5.55975 11.0813C5.44401 11.3242 5.35797 11.5823 5.18589 12.0985L4.27849 14.8207C4.19381 15.0748 4.25992 15.3549 4.44927 15.5442C4.63863 15.7336 4.91871 15.7997 5.17275 15.715L7.89497 14.8076C8.4112 14.6355 8.66932 14.5495 8.91217 14.4337C9.19865 14.2972 9.4694 14.1299 9.71963 13.9347Z" fill="#2684FC" />
                                                    <path d="M16.8077 6.89334C17.8315 5.86954 17.8315 4.20962 16.8077 3.18582C15.7839 2.16202 14.124 2.16202 13.1002 3.18582L12.5088 3.77718C12.5169 3.80163 12.5253 3.82642 12.534 3.85154C12.7508 4.4763 13.1597 5.29531 13.9291 6.06465C14.6984 6.83399 15.5174 7.24296 16.1422 7.45971C16.1672 7.46839 16.1919 7.47675 16.2162 7.48481L16.8077 6.89334Z" fill="#2684FC" />
                                                </svg>

                                                    Edit
                                            </button>
                                        </div>
                                    </div>
                                    <div style={{color:"#68727D"}} className='mx-2'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.
                                    </div>
                                </div>
                            </div>
                            <div style={{border:"1px solid lightgray",borderRadius:"5px"}} className='d-flex justify-content-between align-items-center p-2 my-3'>
                                <div>
                                <img src={Food} width={50} height={40}/>
                                </div>
                                <div>
                                    <div className='d-flex align-items-center justify-content-between mx-2'>
                                        <div style={{fontWeight:"550"}}>Food | 50 KWD</div>
                                        <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
                                            <div style={{ display: "flex", alignItems: "center",padding:"5px" }}>
                                                <div style={{ fontSize: "12px" }}>{"ACTIVE"}</div>
                                                <label class="switch" style={{ marginLeft: "5px" }}>
                                                    <input type="checkbox" defaultChecked />
                                                    <span class="slider round"></span>
                                                </label>
                                            </div> 
                                            <button style={{backgroundColor:"transparent",border:"none",color:"#2684FC"}}>
                                                <svg width={21} height={21} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.61719 19.082C3.61719 18.7369 3.89701 18.457 4.24219 18.457H17.5755C17.9207 18.457 18.2005 18.7369 18.2005 19.082C18.2005 19.4272 17.9207 19.707 17.5755 19.707H4.24219C3.89701 19.707 3.61719 19.4272 3.61719 19.082Z" fill="#2684FC" />
                                                    <path d="M9.71963 13.9347C9.93175 13.7693 10.1242 13.5768 10.5089 13.1921L15.4395 8.26151C14.7684 7.98222 13.9736 7.52344 13.222 6.77176C12.4702 6.01996 12.0114 5.22502 11.7321 4.5539L6.8014 9.48457L6.80138 9.48459C6.41663 9.86934 6.22424 10.0617 6.05879 10.2739C5.86361 10.5241 5.69628 10.7948 5.55975 11.0813C5.44401 11.3242 5.35797 11.5823 5.18589 12.0985L4.27849 14.8207C4.19381 15.0748 4.25992 15.3549 4.44927 15.5442C4.63863 15.7336 4.91871 15.7997 5.17275 15.715L7.89497 14.8076C8.4112 14.6355 8.66932 14.5495 8.91217 14.4337C9.19865 14.2972 9.4694 14.1299 9.71963 13.9347Z" fill="#2684FC" />
                                                    <path d="M16.8077 6.89334C17.8315 5.86954 17.8315 4.20962 16.8077 3.18582C15.7839 2.16202 14.124 2.16202 13.1002 3.18582L12.5088 3.77718C12.5169 3.80163 12.5253 3.82642 12.534 3.85154C12.7508 4.4763 13.1597 5.29531 13.9291 6.06465C14.6984 6.83399 15.5174 7.24296 16.1422 7.45971C16.1672 7.46839 16.1919 7.47675 16.2162 7.48481L16.8077 6.89334Z" fill="#2684FC" />
                                                </svg>

                                                    Edit
                                            </button>
                                        </div>
                                    </div>
                                    <div style={{color:"#68727D"}} className='mx-2'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.
                                    </div>
                                </div>
                            </div>
                            <div style={{border:"1px solid lightgray",borderRadius:"5px"}} className='d-flex justify-content-between align-items-center p-2 my-3'>
                                <div>
                                <img src={Food} width={50} height={40}/>
                                </div>
                                <div>
                                    <div className='d-flex align-items-center justify-content-between mx-2'>
                                        <div style={{fontWeight:"550"}}>Food | 50 KWD</div>
                                        <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
                                            <div style={{ display: "flex", alignItems: "center",padding:"5px" }}>
                                                <div style={{ fontSize: "12px" }}>{"ACTIVE"}</div>
                                                <label class="switch" style={{ marginLeft: "5px" }}>
                                                    <input type="checkbox" defaultChecked />
                                                    <span class="slider round"></span>
                                                </label>
                                            </div> 
                                            <button style={{backgroundColor:"transparent",border:"none",color:"#2684FC"}}>
                                                <svg width={21} height={21} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.61719 19.082C3.61719 18.7369 3.89701 18.457 4.24219 18.457H17.5755C17.9207 18.457 18.2005 18.7369 18.2005 19.082C18.2005 19.4272 17.9207 19.707 17.5755 19.707H4.24219C3.89701 19.707 3.61719 19.4272 3.61719 19.082Z" fill="#2684FC" />
                                                    <path d="M9.71963 13.9347C9.93175 13.7693 10.1242 13.5768 10.5089 13.1921L15.4395 8.26151C14.7684 7.98222 13.9736 7.52344 13.222 6.77176C12.4702 6.01996 12.0114 5.22502 11.7321 4.5539L6.8014 9.48457L6.80138 9.48459C6.41663 9.86934 6.22424 10.0617 6.05879 10.2739C5.86361 10.5241 5.69628 10.7948 5.55975 11.0813C5.44401 11.3242 5.35797 11.5823 5.18589 12.0985L4.27849 14.8207C4.19381 15.0748 4.25992 15.3549 4.44927 15.5442C4.63863 15.7336 4.91871 15.7997 5.17275 15.715L7.89497 14.8076C8.4112 14.6355 8.66932 14.5495 8.91217 14.4337C9.19865 14.2972 9.4694 14.1299 9.71963 13.9347Z" fill="#2684FC" />
                                                    <path d="M16.8077 6.89334C17.8315 5.86954 17.8315 4.20962 16.8077 3.18582C15.7839 2.16202 14.124 2.16202 13.1002 3.18582L12.5088 3.77718C12.5169 3.80163 12.5253 3.82642 12.534 3.85154C12.7508 4.4763 13.1597 5.29531 13.9291 6.06465C14.6984 6.83399 15.5174 7.24296 16.1422 7.45971C16.1672 7.46839 16.1919 7.47675 16.2162 7.48481L16.8077 6.89334Z" fill="#2684FC" />
                                                </svg>

                                                    Edit
                                            </button>
                                        </div>
                                    </div>
                                    <div style={{color:"#68727D"}} className='mx-2'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                        <hr style={{ borderBottom: "2px solid black", marginTop: "10px" }} />
                        <div className='d-flex justify-content-end'>
                            <button type='reset' className='m-1 btn btn-small btn-white'>cancel</button>
                            <button type='submit' className='m-1 btn btn-small' style={{ backgroundColor: "#006875", color: "white" }}>Edit Service</button>
                        </div>
                    </form>
                </div>
                <br /><br />
            </div>}
            {isLoading &&
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
                    <CircularProgress />
                </div>
            }
        </>
    )
}

export default ServiceEdit;