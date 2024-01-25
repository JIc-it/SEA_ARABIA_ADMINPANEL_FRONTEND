import React, { useEffect, useState } from 'react'
import { Breadcrumb } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import UploadPopup from './Service-Edit-Components/UploadModal';
import { getOneService, getCategoryList, getsubcategorylist, getamenitieslist, UpdateService, DeleteImage, SetThumbNail, getProfitMethod } from "../../services/service"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import CircularProgress from "@mui/material/CircularProgress";
import TextEditor from './TextEditor';
import { Radio, Paper, Typography } from '@mui/material';
import PerDestinationTable from './Service-Edit-Components/PerDestinationTable';
import PerDurationTable from "./Service-Edit-Components/PerDurationTable"
import PerDayTable from './Service-Edit-Components/PerDayTable';
import PerTimeTable from './Service-Edit-Components/PerTimeTable';
import PerDateTable from './Service-Edit-Components/PerDateTable';
import PerDestinationModal from './Service-Edit-Components/PerDestinationModal';
import PerDurationModal from './Service-Edit-Components/PerDurationModal ';
import PerDayModal from './Service-Edit-Components/PerDayModal';
import PerTimeModal from './Service-Edit-Components/PerTimeModal';
import PerDateModal from './Service-Edit-Components/PerDateModal';

const ServiceEdit = () => {
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(false)
    const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
    const params = useParams()
    const [isupdated, setIsUpdated] = useState(false);

    const ServiceImagebjectSchema = Yup.object({
        image: Yup.mixed().test('file-type', 'Image is required', (value) => {
            return typeof value === 'object' && value instanceof File;
        }),
        service: Yup.string().required(),
        is_thumbnail: Yup.string().required(),
    });

    const servicepriceserviceobjectSchema = Yup.object({
        name: Yup.string().required(),
        price: Yup.string().required(),
    });

    const validationSchema = Yup.object({
        name: Yup.string()
            .required("Name is required")
            .max(20, "Name must be at most 20 characters"),
        machine_id: Yup.string()
            .required("Machine ID is required"),
        description: Yup.string()
            .required("Description is required"),
        pickup_point_or_location: Yup.string()
            .required("Pickup Point is required"),
        cancellation_policy: Yup.string()
            .required("Privacy Policy is required"),
        refund_policy: Yup.string()
            .required("Refund Policy is required"),
        service_price_service: Yup.array().of(servicepriceserviceobjectSchema).min(1, 'Price is required'),
        purchase_limit_min: Yup.number().when("per_head_booking", ([per_head_booking], schema) => {
            if (per_head_booking === true) {
                return schema
                    .required("Minimum is Required")
                    .min(1, 'Must be greater than zero')
            }
            else {
                return schema.notRequired();
            }
        }),
        purchase_limit_max: Yup.number().when("per_head_booking", ([per_head_booking], schema) => {
            if (per_head_booking === true) {
                return schema
                    .required("Minimum is Required")
                    .min(1, 'Must be greater than zero')
            }
            else {
                return schema.notRequired();
            }
        }),
        
        lounge: Yup.number().notOneOf([0], 'Lounge cannot be zero').max(10, 'Lounge must be less than or equal to 10'),
        bedroom: Yup.number().notOneOf([0], 'Bedroom cannot be zero').max(10, 'Bedroom must be less than or equal to 10'),
        toilet: Yup.number().notOneOf([0], 'Toilet cannot be zero').max(10, 'Toilet must be less than or equal to 10'),
        capacity: Yup.number().notOneOf([0], 'Capacity cannot be zero').max(10, 'Capacity must be less than or equal to 10'),
        markup_fee: Yup.number().when("profit_method", ([profit_method], schema) => {
            if (profit_method.name === "Upselling With Markup") {
                return schema
                    .required("Markup Fee is Required")
                    .min(1, 'Must be greater than zero')
            }
            else {
                return schema.notRequired();
            }
        }),
        vendor_percentage: Yup.number().when("profit_method", ([profit_method], schema) => {
            if (profit_method.name === "Revenue Sharing") {
                return schema
                    .required("Vendor Percentage is Required")
            }
            else {
                return schema.notRequired();
            }
        }),
        sea_arabia_percentage: Yup.number().when("profit_method", ([profit_method], schema) => {
            if (profit_method.name === "Revenue Sharing") {
                return schema
                    .required("Sea Arbia Percentage is Required")
            }
            else {
                return schema.notRequired();
            }
        }),

    });

    const formik = useFormik({
        initialValues: {
            is_verified: false,
            is_active: false,
            is_top_suggestion: false,
            is_premium: false,
            is_destination: false,
            is_duration: false,
            is_date: false,
            is_day: false,
            is_time: false,
            is_refundable: false,
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
            pickup_point_or_location: "",
            cancellation_policy: "",
            refund_policy: "",
            service_image: [],

            profit_method: {
                id: "",
                name: ""
            },
            markup_fee: 0,
            vendor_percentage: 0,
            sea_arabia_percentage: 0,
            per_head_booking: false,
            purchase_limit_min: 0,
            purchase_limit_max: 0,

        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);

            const amenitiesmappedid = values.amenities.map((data) => { return data.id })
            const formattedAmenities = amenitiesmappedid.join(',');

            const findservice_price_service_destination_id = values.service_price_service.map((dat) => {
                if (dat?.location?.id) {
                    return {
                        id: dat.id,
                        service: dat.service,
                        is_active: dat.is_active,
                        location: dat.location.id,
                        name: dat.name,
                        price: dat.price,
                        duration_hour: dat.duration_hour,
                        duration_minute: dat.duration_minute
                    }
                }
                else {
                    return dat
                }
            })

            const data = {
                is_verified: values.is_verified,
                is_active: values.is_active,
                is_top_suggestion: values.is_top_suggestion,
                is_premium: values.is_premium,
                is_destination: values.is_destination,
                is_duration: values.is_duration,
                is_date: values.is_date,
                is_day: values.is_day,
                is_time: values.is_time,
                is_refundable: values.is_refundable,
                type: values.type,
                name: values.name,
                machine_id: values.machine_id,
                description: values.description,
                lounge: values.lounge,
                bedroom: values.bedroom,
                toilet: values.toilet,
                capacity: values.capacity,
                pickup_point_or_location: values.pickup_point_or_location,
                cancellation_policy: values.cancellation_policy,
                refund_policy: values.refund_policy,
                category: values.category[0]?.id,
                sub_category: values.sub_category[0]?.id,
                amenities: formattedAmenities,
                profit_method: values.profit_method.id,
                markup_fee: values.markup_fee,
                vendor_percentage: values.vendor_percentage,
                sea_arabia_percentage: values.sea_arabia_percentage,
                per_head_booking: values.per_head_booking,
                purchase_limit_min: values.purchase_limit_min,
                purchase_limit_max: values.purchase_limit_max,
                service_price_service: findservice_price_service_destination_id
                // removeServiceKey(values)
            }

            if (!isLoading) {
                try {
                    const adminData = await UpdateService(params.id, data);

                    if (adminData) {
                        setIsLoading(false);
                        toast.success("Updated Successfully")
                        setIsUpdated(true)
                    } else {
                        console.error("Error while creating Admin:", adminData.error);
                        setIsLoading(false);
                    }
                    setIsLoading(false);
                } catch (err) {
                    toast.error(err?.message)
                    setIsLoading(false);
                }
            }
        },
    });
    const navigate = useNavigate()
    const [hovereffect, setHoverEffect] = useState("");
    const [categorylist, setCategoryList] = useState([]);
    const [ProfitMethods, setProfitMethods] = useState([])
    const [categoryId, setCategoryId] = useState("")
    const [subcategorylist, setSubcategoryList] = useState([])
    const [amenitieslist, setAmenitiesList] = useState([])
    const [validateeditor, setValidateEditor] = useState("")
    const [PerDestinationopen, setPerDestinationopen] = useState(false)
    const [PerDurationopen, setPerDurationopen] = useState(false)
    const [PerDayopen, setPerDayopen] = useState(false)
    const [PerTimeopen, setPerTimeopen] = useState(false)
    const [PerDateopen, setPerDateopen] = useState(false)
    const [open, setOpen] = useState(false);
    const [checkImage,setCheckImage]=useState("")

    const handleHoverEffectTrue = (id) => {
        setHoverEffect(id)
    }
    const handleHoverEffectFalse = () => {
        setHoverEffect("")
    }


    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    // const [openAddon, setOpenAddon] = useState(false)

    // const handleCloseAddon = () => {
    //     setOpenAddon(false)
    // }

    // const handleOpenAddon = () => {
    //     setOpenAddon(true)
    // }


    useEffect(() => {
        if (isupdated) {
            setIsLoading(false)
        } else {
            setIsLoading(true)
        }
        getOneService(params.id)
            .then((data) => {
                setIsLoading(false)
                formik.setFieldValue("is_verified", data?.is_verified);
                formik.setFieldValue("is_top_suggestion", data?.is_top_suggestion);
                formik.setFieldValue("is_premium", data?.is_premium);
                formik.setFieldValue("is_destination", data?.is_destination);
                formik.setFieldValue("is_duration", data?.is_duration);
                formik.setFieldValue("is_day", data?.is_day);
                formik.setFieldValue("is_time", data?.is_time);
                formik.setFieldValue("is_date", data?.is_date);
                formik.setFieldValue("is_refundable", data?.is_refundable);
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
                formik.setFieldValue("pickup_point_or_location", data?.pickup_point_or_location);
                formik.setFieldValue("cancellation_policy", data?.cancellation_policy);
                formik.setFieldValue("refund_policy", data?.refund_policy);
                formik.setFieldValue("is_active", data?.is_active);
                formik.setFieldValue("service_image", data?.service_image);

                // formik.setFieldValue("price", data?.price);
                formik.setFieldValue('profit_method', {
                    id: data?.profit_method?.id,
                    name: data?.profit_method?.name,
                });
                formik.setFieldValue("markup_fee", data?.markup_fee);
                formik.setFieldValue("vendor_percentage", data?.vendor_percentage);
                formik.setFieldValue("sea_arabia_percentage", data?.sea_arabia_percentage);
                formik.setFieldValue("per_head_booking", data?.per_head_booking);
                formik.setFieldValue("purchase_limit_min", data?.purchase_limit_min);
                formik.setFieldValue("purchase_limit_max", data?.purchase_limit_max);
                formik.setFieldValue("service_price_service", data?.service_price_service);

                setIsUpdated(false)
            }
            ).catch((error) => {
                setIsLoading(false);
                setIsUpdated(false)
                toast.error(error.message)
            })
    }, [params.id, isupdated])

    useEffect(() => {
        getProfitMethod()
            .then((data) =>
                setProfitMethods(data?.results)
            ).catch((error) =>
                console.error(error))

        getamenitieslist()
            .then((data) =>
                setAmenitiesList(data?.results)
            ).catch((error) =>
                console.error(error))

        getCategoryList()
            .then((data) =>
                setCategoryList(data)
            ).catch((error) =>
                console.error(error))
    }, [])

    useEffect(() => {
        getsubcategorylist(categoryId)
            .then((data) =>
                setSubcategoryList(data)
            ).catch((error) =>
                console.error(error))
    }, [categoryId])

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
                toast.error(error.message))
    }

    const settingthumbnailTrue = (id, data) => {
        SetThumbNail(id, data)
            .then((datas) => {
                toast.success(datas);
            }
            ).catch((error) =>
                toast.error(error.message))
    }


    function submit(e) {
        e.preventDefault();
        if(formik.values.service_image.length===0){
            return setCheckImage("Image Required")
        }
        if (formik.values.description.replace("<p><br></p>", "").trim() === "") {
            return setValidateEditor("Description Required")
        }
        else if (formik.values.description.trim() !== "") {
            return formik.handleSubmit()
        }
    }


    const handleopendestination = () => {
        setPerDestinationopen(true)
    }
    const handleclosedestination = () => {
        setPerDestinationopen(false)
    }


    const handleopenduration = () => {
        setPerDurationopen(true)
    }
    const handlecloseduration = () => {
        setPerDurationopen(false)
    }


    const handleopenday = () => {
        setPerDayopen(true)
    }
    const handlecloseday = () => {
        setPerDayopen(false)
    }


    const handleopentime = () => {
        setPerTimeopen(true)
    }
    const handleclosetime = () => {
        setPerTimeopen(false)
    }


    const handleopenDate = () => {
        setPerDateopen(true)
    }
    const handlecloseDate = () => {
        setPerDateopen(false)
    }

    const handleModalOpens = () => {
        if (formik.values.is_destination) {
            setPerDestinationopen(true)
        }
        if (formik.values.is_duration) {
            setPerDurationopen(true)
        }
        if (formik.values.is_day) {
            setPerDayopen(true)
        }
        if (formik.values.is_time) {
            setPerTimeopen(true)
        }
        if (formik.values.is_date) {
            setPerDateopen(true)
        }
    }

    const updateFormValues = (fields) => {
        formik.setValues((prev) => { return { ...prev, ...fields } });
    };
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
                                                    Category
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
                                                    Name
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
                                                    Sub Category
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
                                                    ID
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
                                                {formik.touched.lounge && formik.errors.lounge ? (
                                                    <div className="error">{formik.errors.lounge}</div>
                                                ) : null}
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
                                                {formik.touched.bedroom && formik.errors.bedroom ? (
                                                    <div className="error">{formik.errors.bedroom}</div>
                                                ) : null}
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
                                                {formik.touched.toilet && formik.errors.toilet ? (
                                                    <div className="error">{formik.errors.toilet}</div>
                                                ) : null}
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
                                                    Capacity
                                                </label>
                                                <input
                                                    type="number"
                                                    name="capacity"
                                                    className="form-control"
                                                    placeholder="0"
                                                    value={formik.values.capacity}
                                                    onChange={(e) => {
                                                        if (e.target.value <= 0) {
                                                            return formik.setFieldValue("capacity", 0)
                                                        }
                                                        else {
                                                            formik.setFieldValue("capacity", e.target.value)
                                                        }

                                                    }}
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
                                                
                                                </label>
                                                <div style={{ position: "relative" }}>
                                                    <input
                                                        type="text"
                                                        placeholder=""
                                                        className="form-control"
                                                        name="pickup_point_or_location"
                                                        value={formik.values.pickup_point_or_location}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                    />
                                                    {formik.touched.pickup_point_or_location && formik.errors.pickup_point_or_location ? (
                                                        <div className="error">{formik.errors.pickup_point_or_location}</div>
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
                                                    Amenities
                                                </label>
                                                <select
                                                    className="form-control"
                                                    name="amenities"

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
                                        {ProfitMethods && ProfitMethods.reverse().map((data) =>
                                            <div className={`${isMobileView}? "col-12":"col-4" mx-1`} style={{ marginBottom: isMobileView ? "5px" : "" }} onClick={() => { updateFormValues(({ ...formik.values, profit_method: { id: data.id, name: data.name }, markup_fee: 0, sea_arabia_percentage: 0, vendor_percentage: 0 })) }}>
                                                <div className="card p-2"  style={{height:"200px",width:"15vw"}}>
                                                <div className="d-flex justify-content-between align-items-center">
                                                        <img src={data.icon} alt={data.name} style={{width:"30px",marginRight:"5px",backgroundColor:"#ECF4FF"}}/>
                                                        <div>
                                                            <p style={{ fontWeight: "550" }}>{data.name}</p>
                                                            <span className="text-wrap" style={{ fontSize: "12px" }}>
                                                                {data?.description}
                                                            </span>
                                                        </div>
                                                        <div class="form-check">
                                                            <input class="form-check-input" name="profit_method" style={{ height: "20px", width: "20px", borderRadius: "10px" }} type="checkbox" checked={formik.values.profit_method.id === data.id} />
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>
                                        )}

                                    </div>

                                </div>
                                {formik.values.profit_method.name === "Upselling With Markup" &&
                                    <div className='w-50 mx-5'>
                                        <label
                                            htmlFor=""
                                            style={{ paddingBottom: "10px", fontWeight: "600", fontSize: "13px" }}
                                        >
                                            Markup Fee
                                        </label>
                                        <input
                                            type="number"
                                            name="markup_fee"
                                            className="form-control"
                                            placeholder="0"
                                            value={formik.values.markup_fee}
                                            onChange={(e) => {
                                                if (e.target.value <= 0) {
                                                    formik.setFieldValue("markup_fee", 0)
                                                }
                                                else {
                                                    formik.setFieldValue("markup_fee", e.target.value)
                                                }
                                            }}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.markup_fee && formik.errors.markup_fee ? (
                                            <div className="error">{formik.errors.markup_fee}</div>
                                        ) : null}
                                    </div>
                                }
                                {formik.values.profit_method.name === "Revenue Sharing" &&
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div className='w-50 mx-5'>
                                            <label
                                                htmlFor=""
                                                style={{ paddingBottom: "10px", fontWeight: "600", fontSize: "13px" }}
                                            >
                                                Vendor Percentage
                                            </label>
                                            <input
                                                type="number"
                                                name="vendor_percentage"
                                                className="form-control"
                                                placeholder="0"
                                                value={formik.values.vendor_percentage}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.vendor_percentage && formik.errors.vendor_percentage ? (
                                                <div className="error">{formik.errors.vendor_percentage}</div>
                                            ) : null}
                                        </div>

                                        <div className='w-50 mx-5'>
                                            <label
                                                htmlFor=""
                                                style={{ paddingBottom: "10px", fontWeight: "600", fontSize: "13px" }}
                                            >
                                                Sea Arabia Percentage
                                            </label>
                                            <input
                                                type="number"
                                                name="sea_arabia_percentage"
                                                className="form-control"
                                                placeholder="0"
                                                value={formik.values.sea_arabia_percentage}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.sea_arabia_percentage && formik.errors.sea_arabia_percentage ? (
                                                <div className="error">{formik.errors.sea_arabia_percentage}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                }
                                <div>

                                    {/* <div className="px-5"> */}
                                    <p style={{ fontWeight: 550, fontSize: "14px", marginTop: "8px", }} className='ms-5'>Pricing Critreion</p>
                                    <div className={isMobileView ? "d-flex flex-column" : 'd-flex justify-content-center'}>
                                        <Paper
                                            onClick={() => updateFormValues(({ ...formik.values, is_destination: true, is_duration: false, is_day: false, is_time: false, is_date: false, purchase_limit_min: 0, purchase_limit_max: 0,service_price_service:[] }))}
                                            style={{
                                                display: 'flex',
                                                cursor:"pointer",
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                border: '1px solid lightgray',
                                                width: isMobileView ? "100%" : "17%",
                                                border: formik.values.is_destination ? '2px solid rgb(112, 112, 241)' : '1px solid lightgray',
                                                padding: '5px',
                                                margin: "5px"
                                            }}
                                        >
                                            <Typography variant="body1" sx={{ fontSize: "12px", fontWeight: "550" }}>Per Destination</Typography>
                                            <Radio name={formik.values.price_cretrion} checked={formik.values.is_destination} />
                                        </Paper>
                                        <Paper
                                            onClick={() => updateFormValues(({ ...formik.values, is_destination: false, is_duration: true, is_day: false, is_time: false, is_date: false, per_head_booking: false, purchase_limit_min: 0, purchase_limit_max: 0,service_price_service:[] }))}
                                            style={{
                                                display: 'flex',
                                                cursor:"pointer",
                                                justifyContent: 'space-between',
                                                marginTop: isMobileView ? "5px" : "",
                                                alignItems: 'center',
                                                border: formik.values.is_duration ? '2px solid rgb(112, 112, 241)' : '1px solid lightgray',
                                                width: isMobileView ? "100%" : "17%",
                                                borderRadius: '5px',
                                                padding: '5px',
                                                margin: "5px"
                                            }}
                                        >
                                            <Typography variant="body1" sx={{ fontSize: "12px", fontWeight: "550" }}>Per Duration</Typography>
                                            <Radio name={formik.values.price_cretrion} checked={formik.values.is_duration} />
                                        </Paper>
                                        <Paper
                                            onClick={() => updateFormValues(({ ...formik.values, is_destination: false, is_duration: false, is_day: true, is_time: false, is_date: false, per_head_booking: false,service_price_service:[] }))}
                                            style={{
                                                display: 'flex',
                                                cursor:"pointer",
                                                justifyContent: 'space-between',
                                                marginTop: isMobileView ? "5px" : "",
                                                alignItems: 'center',
                                                border: formik.values.is_day ? '2px solid rgb(112, 112, 241)' : '1px solid lightgray',
                                                width: isMobileView ? "100%" : "17%",
                                                borderRadius: '5px',
                                                padding: '5px',
                                                margin: "5px"
                                            }}
                                        >
                                            <Typography variant="body1" sx={{ fontSize: "12px", fontWeight: "550" }}>Per Day</Typography>
                                            <Radio name={formik.values.price_cretrion} checked={formik.values.is_day} />
                                        </Paper>
                                        <Paper
                                            onClick={() => updateFormValues(({ ...formik.values, is_destination: false, is_duration: false, is_day: false, is_time: true, is_date: false,service_price_service:[] }))}
                                            style={{
                                                display: 'flex',
                                                cursor:"pointer",
                                                justifyContent: 'space-between',
                                                marginTop: isMobileView ? "5px" : "",
                                                alignItems: 'center',
                                                border: formik.values.is_time ? '2px solid rgb(112, 112, 241)' : '1px solid lightgray',
                                                width: isMobileView ? "100%" : "17%",
                                                borderRadius: '5px',
                                                padding: '5px',
                                                margin: "5px"
                                            }}
                                        >
                                            <Typography variant="body1" sx={{ fontSize: "12px", fontWeight: "550" }}>Per Time</Typography>
                                            <Radio name={formik.values.price_cretrion} checked={formik.values.is_time} />
                                        </Paper>
                                        <Paper
                                            onClick={() => updateFormValues(({ ...formik.values, is_destination: false, is_duration: false, is_day: false, is_time: false, is_date: true,service_price_service:[] }))}
                                            style={{
                                                display: 'flex',
                                                cursor:"pointer",
                                                justifyContent: 'space-between',
                                                marginTop: isMobileView ? "5px" : "",
                                                alignItems: 'center',
                                                border: formik.values.is_date ? '2px solid rgb(112, 112, 241)' : '1px solid lightgray',
                                                width: isMobileView ? "100%" : "17%",
                                                borderRadius: '5px',
                                                padding: '5px',
                                                margin: "5px"
                                            }}
                                        >
                                            <Typography variant="body1" sx={{ fontSize: "12px", fontWeight: "550" }}>Per Date</Typography>
                                            <Radio name={formik.values.price_cretrion} checked={formik.values.is_date} />
                                        </Paper>
                                    </div>
                                    {/* </div> */}
                                    <p style={{ fontWeight: 550, fontSize: "14px", marginTop: "8px", }} className='ms-5'>Booking type</p>
                                    <div className={isMobileView ? "d-flex flex-column" : 'd-flex justify-content-start ms-5'}>
                                        <Paper
                                            onClick={() => { formik.setFieldValue("per_head_booking", false); formik.setFieldValue("purchase_limit_min", 0); formik.setFieldValue("purchase_limit_max", 0); }}
                                            style={{
                                                display: 'flex',
                                                cursor:"pointer",
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                border: '1px solid lightgray',
                                                width: isMobileView ? "100%" : "45%",
                                                border: formik.values.per_head_booking === false ? '2px solid rgb(112, 112, 241)' : '1px solid lightgray',
                                                padding: '5px',
                                                margin: "5px"
                                            }}
                                        >
                                            <Typography variant="body1" sx={{ fontSize: "12px", fontWeight: "550" }}>Booking Entirely</Typography>
                                            <Radio checked={formik.values.per_head_booking === false} />
                                        </Paper>

                                        <Paper
                                            onClick={() => formik.setFieldValue("per_head_booking", true)}
                                            style={{
                                                display: formik.values.is_destination || formik.values.is_duration ? 'none' : 'flex',
                                                justifyContent: 'space-between',
                                                marginTop: isMobileView ? "5px" : "",
                                                alignItems: 'center',
                                                border: formik.values.per_head_booking === true ? '2px solid rgb(112, 112, 241)' : '1px solid lightgray',
                                                width: isMobileView ? "100%" : "45%",
                                                borderRadius: '5px',
                                                padding: '5px',
                                                margin: "5px"
                                            }}
                                        >
                                            <Typography variant="body1" sx={{ fontSize: "12px", fontWeight: "550" }}>Per Head Booking</Typography>
                                            <Radio checked={formik.values.per_head_booking === true} />
                                        </Paper>
                                    </div>
                                </div>
                                {formik.values.per_head_booking && <div className={isMobileView ? "d-flex flex-column" : 'd-flex justify-content-start mx-5 mt-5'} >
                                    <div style={{ border: "1px solid lightgray" }} className="px-3 py-3 rounded">
                                        <span style={{ fontWeight: "600" }}>Set Purchase Limits</span>
                                        <div className="d-flex mt-2">
                                            <div className="mt-1">
                                                <span style={{ color: "#68727D", fontSize: "15px" }}>Minimum</span>
                                                <div className="mt-2">
                                                    <button type="button" className="btn px-1 py-1 mx-1" onClick={() => handleDecrement("purchase_limit_min")}><svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M3 10H17" stroke="#68727D" strokeWidth={2} strokeLinecap="round" />
                                                    </svg>

                                                    </button>
                                                    <span className="mx-1">{formik.values.purchase_limit_min}</span>
                                                    <button type="button" onClick={() => handleIncrement("purchase_limit_min")} className="btn px-1 py-1 mx-1"><svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10 3L10 17" stroke="#252525" strokeWidth={2} strokeLinecap="round" />
                                                        <path d="M3 10H17" stroke="#252525" strokeWidth={2} strokeLinecap="round" />
                                                    </svg></button>
                                                </div>
                                                {formik.touched.purchase_limit_min && formik.errors.purchase_limit_min ? (
                                                    <div className="error">{formik.errors.purchase_limit_min}</div>
                                                ) : null}
                                            </div>


                                            <div className="mt-1 ms-4">
                                                <span style={{ color: "#68727D", fontSize: "15px" }}>Maximum</span>
                                                <div className="mt-2">
                                                    <button type="button" onClick={() => handleDecrement("purchase_limit_max")} className="btn px-1 py-1 mx-1"><svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M3 10H17" stroke="#68727D" strokeWidth={2} strokeLinecap="round" />
                                                    </svg></button>
                                                    <span className="mx-1">{formik.values.purchase_limit_max}</span>
                                                    <button type="button" onClick={() => handleIncrement("purchase_limit_max")} className="btn px-1 py-1 mx-1">
                                                        <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M10 3L10 17" stroke="#252525" strokeWidth={2} strokeLinecap="round" />
                                                            <path d="M3 10H17" stroke="#252525" strokeWidth={2} strokeLinecap="round" />
                                                        </svg>


                                                    </button>
                                                </div>
                                                {formik.touched.purchase_limit_max && formik.errors.purchase_limit_max ? (
                                                    <div className="error">{formik.errors.purchase_limit_max}</div>
                                                ) : null}
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
                                        {formik.values.is_destination && <PerDestinationTable data={formik.values.service_price_service} formik={formik.setValues} setIsUpdated={setIsUpdated} />}
                                        {formik.values.is_duration && <PerDurationTable data={formik.values.service_price_service} formik={formik.setValues} setIsUpdated={setIsUpdated} />}
                                        {formik.values.is_day && <PerDayTable data={formik.values.service_price_service} formik={formik.setValues} setIsUpdated={setIsUpdated} />}
                                        {formik.values.is_time && <PerTimeTable data={formik.values.service_price_service} formik={formik.setValues} setIsUpdated={setIsUpdated} />}
                                        {formik.values.is_date && <PerDateTable data={formik.values.service_price_service} formik={formik.setValues} setIsUpdated={setIsUpdated} />}
                                        {formik.touched.service_price_service && formik.errors.service_price_service ? (
                                            <div className="error">{formik.errors.service_price_service}</div>
                                        ) : null}

                                    </div>
                                </div>
                            </div>

                            {formik.values.is_destination && PerDestinationopen && <PerDestinationModal handleClose={handleclosedestination} handleOpen={handleopendestination} open={PerDestinationopen} formiks={formik.setValues} />}
                            {formik.values.is_duration && PerDurationopen && <PerDurationModal handleClose={handlecloseduration} handleOpen={handleopenduration} open={PerDurationopen} formiks={formik.setValues} />}
                            {formik.values.is_day && PerDayopen && <PerDayModal handleClose={handlecloseday} handleOpen={handleopenday} open={PerDayopen} formiks={formik.setValues} />}
                            {formik.values.is_time && PerTimeopen && <PerTimeModal handleClose={handleclosetime} handleOpen={handleopentime} open={PerTimeopen} formiks={formik.setValues} />}
                            {formik.values.is_date && PerDateopen && <PerDateModal handleClose={handlecloseDate} handleOpen={handleopenDate} open={PerDateopen} formiks={formik.setValues} />}

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
                                <div style={{ backgroundColor: "#FFFF", borderRadius: "5px" }} className="mt-4 d-flex m-2 align-items-center">

                                    <div style={{ fontWeight: "700" }}>Refund Available</div>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <label class="switch" style={{ marginLeft: "5px" }}>
                                            <input type="checkbox" name="is_refundable" checked={formik.values.is_refundable} value={formik.values.is_refundable} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                            <span class="slider round"></span>
                                        </label> &nbsp;
                                        <div style={{ fontSize: "14px" }}>{formik.values.is_refundable === true ? "Yes" : "No"}</div>

                                    </div>
                                </div>

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
                                {open && <UploadPopup setCheckImage={setCheckImage} setIsLoading={setIsLoading} setIsUpdated={setIsUpdated} open={open} handleClose={handleClose} handleOpen={handleOpen} service_image={formik.values.service_image} />}
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
                                    {checkImage.trim()!=="" && 
                                    <div className="error">{checkImage}</div>
                                    }
                                </div>
                            </div>
                        </div>

                        <hr style={{ borderBottom: "2px solid black", marginTop: "10px" }} />
                        <div className='d-flex justify-content-end'>
                            <button type='reset' className='m-1 btn btn-small btn-white' onClick={()=>navigate(-1)}>cancel</button>
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