import React, { useState, useEffect } from 'react'
import { Breadcrumb } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Radio, Paper, Typography, ButtonGroup, Button, Box, Checkbox } from '@mui/material';
import AddMorePopup from './AddMorePopup';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getDiscountOfferView, UpdateOffer } from "../../services/offers"
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function DiscountEdit() {
    const navigate = useNavigate();
    const [servicelisting, setServiceListing] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const params = useParams()
    const theme = useTheme();
    const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [isupdated, setIsUpdated] = useState(false)


    const companyObjectSchema = Yup.object({
        id: Yup.string().required(),
        name: Yup.string().required(),
    });


    const validationSchema = Yup.object({
        name: Yup.string()
            .required("Coupon Name is required")
            .max(20, "Coupon Name must be at most 20 characters"),
        coupon_code: Yup.string()
            .required("Coupon Code is required")
            .max(20, "Coupon Name must be at most 20 characters"),
        discount_type: Yup.string().required("Discount type is required"),
        start_date: Yup.string().required("Start Date is required"),
        start_time: Yup.string().required("Start Time is required"),
        discount_value: Yup.number()
            .required("Value is Required")
            .min(1, "Must be greater than zero")
            .max(100000, "Maximum 1 Lakh"),
        up_to_amount: Yup.number().when(
            "discount_type",
            ([discount_type], schema) => {
                if (discount_type === "Percentage") {
                    return schema
                        .required("Upto is Required")
                        .min(1, "Must be greater than zero")
                        .max(100000, "Maximum 1 Lakh");
                } else {
                    return schema.notRequired();
                }
            }
        ),

        specify_no: Yup.number().when(
            "redemption_type",
            ([redemption_type], schema) => {
                if (redemption_type === "Limited-Number") {
                    return schema
                        .typeError("Specify Number  must be a number")
                        .required("Specify Number is Required")
                        .min(1, "Must be greater than zero")
                        .max(9999, "Maximum 9999 Only")
                } else {
                    return schema.notRequired();
                }
            }
        ),

        min_purchase_amount: Yup.number().when(
            "purchase_requirement",
            ([purchase_requirement], schema) => {
                if (purchase_requirement === true) {
                    return schema
                        .required("Minimum Amount is Required")
                        .min(1, "Must be greater than zero")
                        .max(100000, "Maximum 1 Lakh");
                } else {
                    return schema.notRequired();
                }
            }
        ),
        multiple_redeem_specify_no: Yup.number().when(
            "allow_multiple_redeem",
            ([allow_multiple_redeem], schema) => {
                return allow_multiple_redeem === "Multiple-time"
                    ? schema
                        .required("Specify Number is Required")
                        .min(1, "Must be greater than zero")
                        .max(9999, "Maximum 9999 only")
                    : schema.notRequired();
            }
        ),
        end_date: Yup.string().when("expiration", ([expiration], schema) => {
            if (expiration === "Limited-Time") {
                return schema
                    .required("Date is Required")
            }
            else {
                return schema.notRequired();
            }
        }),
        end_time: Yup.string().when("expiration", ([expiration], schema) => {
            if (expiration === "Limited-Time") {
                return schema.required("Time is Required");
            } else {
                return schema.notRequired();
            }
        }),


        image: Yup.mixed()
            .test('fileSize', 'File size is too large', (value, context) => {
                if (typeof context.parent.image === 'string') {
                    return true;
                }
                return value && value.size <= 300 * 1024;
            })
            .test('fileType', 'Invalid file format', (value, context) => {
                if (typeof context.parent.image === 'string') {
                    return true;
                }
                return value && /^image\/(jpeg|png|gif)$/i.test(value.type);
            }),
       
            companies: Yup.array().when("apply_global", ([apply_global], schema) => {
                if (!apply_global) {
                  return schema.of(companyObjectSchema).min(1, "Services/Vendors is required")
                } else {
                  return schema.notRequired();
                }
              }),
    })

    const formik = useFormik({
        initialValues: {
            is_enable: false,
            image: null,
            name: "",
            coupon_code: "",
            discount_type: "",
            discount_value: "",
            up_to_amount: "",
            redemption_type: "",
            specify_no: 1,
            allow_multiple_redeem: "",
            multiple_redeem_specify_no: "",
            start_date: "",
            start_time: "",
            expiration: "Limited-Time",
            end_date: "",
            end_time: "",
            on_home_screen: true,
            on_checkout: true,
            apply_global: false,
            services: [],
            companies: [],
            purchase_requirement: false,
            min_purchase_amount: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);

            if (!isLoading) {
                try {
                    const formdata = new FormData()

                    function checktrue(values) {
                        if (values === true) {
                            return "True"
                        }
                        else if(values === false) {
                            return "False"
                        }
                    }
                    const startDateTime = () => {
                        if (formik.values.start_date !== "" && formik.values.start_time !== "") {
                            const isoString = formik?.values?.start_date + 'T' + formik?.values?.start_time + ":00" + "Z"

                            return isoString
                        }
                    }
                    const endDateTime = () => {
                        if (formik.values.end_date !== "" && formik.values.end_time !== "") {
                            const isoString = formik?.values?.end_date + 'T' + formik?.values?.end_time + ":00" + "Z"

                            return isoString
                        }
                    }

                    const companiesId = values.companies.map((data) => { return data.id })
                    const servicesId = values.services.map((data) => { return data.id })
                    formdata.append("is_enable", checktrue(values.is_enable));
                    formdata.append("image", values.image);
                    formdata.append("name", values.name);
                    formdata.append("coupon_code", values.coupon_code);
                    formdata.append("discount_type", values.discount_type);
                    formdata.append("discount_value", values.discount_value);
                    { values.discount_type === "Percentage" && formdata.append("up_to_amount", values.up_to_amount); }
                    formdata.append("redemption_type", values.redemption_type);
                    formdata.append("specify_no", values.specify_no);
                    { formdata.append("allow_multiple_redeem", values.allow_multiple_redeem !== "" ? values.allow_multiple_redeem : "") }
                    { formdata.append("multiple_redeem_specify_no", values.multiple_redeem_specify_no !== "" ? values.multiple_redeem_specify_no : "") }
                    formdata.append("start_date", startDateTime());
                    formdata.append("expiration", values.expiration);
                    { values.end_date !== "" ? formdata.append("end_date", endDateTime()) : formdata.append("end_date", "") }
                    formdata.append("on_home_screen", checktrue(values.on_home_screen));
                    formdata.append("on_checkout", checktrue(values.on_checkout));
                    formdata.append("apply_global", values.apply_global);
                    formdata.append(`companies`, companiesId);
                    formdata.append(`services`, servicesId);

                    formdata.append("purchase_requirement", checktrue(values.purchase_requirement));
                    { values.purchase_requirement && formdata.append("min_purchase_amount", values.min_purchase_amount) };

                    const adminData = await UpdateOffer(params.id, formdata);

                    if (adminData) {
                        setIsLoading(false);
                        navigate(-1)
                        toast.success("Updated Successfully")
                        setIsUpdated(true)
                    } else {
                        console.error("Error while creating Admin:", adminData.error);
                        setIsLoading(false);
                    }
                    setIsLoading(false);
                } catch (err) {
                    console.log(err);
                    setIsLoading(false);
                    toast.error(err.message)
                }
            }
        },
    });

    const handleFileChange = (file) => {
        formik.setFieldValue("image", file);
    };

    //first load
    useEffect(() => {
        if (isupdated) {
            setIsLoading(false)
        }
        else {
            setIsLoading(true)
        }
        getDiscountOfferView(params.id)
            .then((data) => {
                setIsLoading(false)
                formik.setFieldValue("is_enable", data.is_enable);
                formik.setFieldValue("image", data.image);
                formik.setFieldValue("name", data.name);
                formik.setFieldValue("coupon_code", data.coupon_code);
                formik.setFieldValue("discount_type", data.discount_type);
                formik.setFieldValue("discount_value", data.discount_value);
                formik.setFieldValue("up_to_amount", data.up_to_amount);
                formik.setFieldValue("specify_no", data.specify_no);
                formik.setFieldValue("redemption_type", data.redemption_type);
                formik.setFieldValue("allow_multiple_redeem", data.allow_multiple_redeem);
                formik.setFieldValue("multiple_redeem_specify_no", data.multiple_redeem_specify_no);
                formik.setFieldValue("start_date", data.start_date?.split("T")[0]);
                formik.setFieldValue("start_time", data.start_date?.split("T")[1]?.slice(0, -9));
                formik.setFieldValue("expiration", data.expiration);
                formik.setFieldValue("end_date", data.end_date?.split("T")[0]);
                formik.setFieldValue("end_time", data.end_date?.split("T")[1]?.slice(0, -9));
                formik.setFieldValue("on_home_screen", data.on_home_screen);
                formik.setFieldValue("on_checkout", data.on_checkout);
                formik.setFieldValue("apply_global", data.apply_global);
                formik.setFieldValue("services", data?.services);
                formik.setFieldValue("companies", data?.companies);
                formik.setFieldValue("purchase_requirement", data.purchase_requirement);
                formik.setFieldValue("min_purchase_amount", data.min_purchase_amount);
                setIsUpdated(false)
            })
            .catch((error) => {
                setIsLoading(false)
                toast.error(error.message);
            });

    }, [params.id, isupdated]);


    const updateFormValues = (fields) => {
        formik.setValues((prev) => { return { ...prev, ...fields } });
    };
    
    const deletecompany = (id) => {
        formik.setValues((prev) => ({
            ...prev,
            companies: (prev?.companies || []).filter((company) => company.id !== id),
            services: (prev?.services || []).filter((service) => {
                if (service.company_id) {
                    return service.company_id !== id
                }
                else {
                    return service.company !== id
                }
            })
        }));
    };

console.log(formik.values)
    const CouponCode = (data) => {
        formik.setValues((prev) => { return { ...prev, coupon_code: data.toUpperCase() } });
    };

    function companywithservice(companyid) {

        const serviceCount = formik?.values.services?.filter((dat) => dat.company_id === companyid) || 0;
        return serviceCount.length

    }

    function companywithservicelength(companyid) {

        const serviceCount = servicelisting?.filter((dat) => dat.company_id === companyid) || 0;
        return serviceCount.length

    }

    const startDate = formik?.values?.start_date !== "" && formik?.values?.start_date;
    const startDateObject = new Date(startDate);

    startDateObject?.setDate(startDateObject?.getDate() + 1);
    const newDate = startDateObject?.toISOString()?.split('T')[0];

    if (!isLoading) {
        return (
            <>
                <div className="page" style={{ backgroundColor: "#DDECEE" }}>
                    <Breadcrumb className="px-5 mt-3 ms-2">
                        <Breadcrumb.Item href="#">Discount / Offer
                            <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.33333 5L12.7441 9.41074C13.0695 9.73618 13.0695 10.2638 12.7441 10.5893L8.33333 15" stroke="#68727D" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            <span style={{ color: "#006875" }}>Edit Discount</span>

                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <div className="d-flex justify-content-between align-items-center px-5 mx-1 mt-3">
                        <div style={{ cursor: "pointer" }} onClick={() => navigate(-1)}>
                            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 12H4M4 12L10 6M4 12L10 18" stroke="#252525" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg> &nbsp;<span style={{ fontWeight: "500" }}>Back</span>
                        </div>
                    </div>

                    <form onSubmit={formik.handleSubmit} style={{ marginLeft: "-2%" }}>
                        <div className='container' style={{ backgroundColor: "white", width: "90%", padding: "2%", marginTop: "2%", borderRadius: "5px" }}>
                            <p style={{ fontWeight: "600", fontSize: "16px" }}>Discount Details</p>
                            <div className={isMobileView ? "d-flex flex-column" : 'd-flex'}>
                                <div className={isMobileView ? "w-100" : 'w-50'}>
                                    <div>
                                        <p style={{ fontWeight: 550, fontSize: "14px" }}>Coupon Name</p>
                                        <input type='text' name="name" value={formik.values.name} className='discount-input' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                        {formik.touched.name && formik.errors.name ? (
                                            <div className="error">{formik.errors.name}</div>
                                        ) : null}
                                    </div>

                                    <div>
                                        <Typography variant="subtitle1" fontWeight={550} fontSize="14px" marginTop="8px">
                                            Discount Type
                                        </Typography>
                                        <ButtonGroup style={{ border: "1px solid black", marginTop: "5px" }} >
                                            <Button
                                                style={{
                                                    fontWeight: "500",
                                                    fontSize: "15px",
                                                    textTransform: "capitalize",
                                                    // width: "40%",
                                                    backgroundColor: formik.values.discount_type === "Percentage" ? "black" : "",
                                                    color: formik.values.discount_type === "Percentage" ? "white" : "",
                                                    padding: "3px 30px",
                                                    // borderRadius: "5px",
                                                    textAlign: "center",
                                                    // margin: "4px"
                                                }}
                                                onClick={() => updateFormValues(({ ...formik.values, discount_type: "Percentage" }))}
                                            >
                                                Percentage
                                            </Button>
                                            <Button
                                                style={{
                                                    fontWeight: "500",
                                                    fontSize: "15px",
                                                    // width: "40%",
                                                    textTransform: "capitalize",
                                                    backgroundColor: formik.values.discount_type === "Fixed" ? "black" : "",
                                                    color: formik.values.discount_type === "Fixed" ? "white" : "",
                                                    padding: "3px 30px",
                                                    // borderRadius: "5px",
                                                    textAlign: "center",
                                                    // margin: "4px"
                                                }}
                                                onClick={() => updateFormValues(({ ...formik.values, discount_type: "Fixed",up_to_amount:"" }))}
                                            >
                                                Fixed Amount
                                            </Button>
                                        </ButtonGroup>
                                    </div>


                                </div>
                                <div className={isMobileView ? "w-100" : 'w-50'}>
                                    <div>
                                        <p style={{ fontWeight: 550, fontSize: "14px" }}>Discount Code</p>
                                        <input type='text' value={formik.values.coupon_code} name="coupon_code" className='discount-input' onChange={(e) => CouponCode(e.target.value)} onBlur={formik.handleBlur} />
                                        {formik.touched.coupon_code && formik.errors.coupon_code ? (
                                            <div className="error">{formik.errors.coupon_code}</div>
                                        ) : null}
                                    </div>

                                    {formik.values.discount_type === "Percentage" ?

                                        <div className='d-flex' style={{ marginTop: "8px" }}>
                                            <div>
                                                <p style={{ fontWeight: 550, fontSize: "14px" }}>Specify Percentage</p>
                                                <input type='number' name="discount_value" value={formik.values.discount_value} className='discount-input' style={{ width: "90%" }} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                                {formik.touched.discount_value && formik.errors.discount_value ? (
                                                    <div className="error">{formik.errors.discount_value}</div>
                                                ) : null}
                                            </div>
                                            <div>
                                                <p style={{ fontWeight: 550, fontSize: "14px" }}>Upto Amount</p>
                                                <input type='number' value={formik.values.up_to_amount} name='up_to_amount' className='discount-input' style={{ width: "90%" }} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                                {formik.touched.up_to_amount && formik.errors.up_to_amount ? (
                                                    <div className="error">{formik.errors.up_to_amount}</div>
                                                ) : null}
                                            </div>
                                        </div> :
                                        <div style={{ marginTop: "8px" }}>
                                            <p style={{ fontWeight: 550, fontSize: "14px" }}>Specify Amount</p>
                                            <input type='number' name="discount_value" value={formik.values.discount_value} className='discount-input' style={{ width: "90%" }} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                            {formik.touched.discount_value && formik.errors.discount_value ? (
                                                <div className="error">{formik.errors.discount_value}</div>
                                            ) : null}
                                        </div>

                                    }

                                </div>
                            </div>
                            <div>
                                <p style={{ fontWeight: 550, fontSize: "14px", marginTop: "8px" }}>Redemption Type</p>
                                <div className={isMobileView ? "d-flex flex-column" : 'd-flex justify-content-between'}>
                                    <Paper onClick={() => updateFormValues({ ...formik.values, redemption_type: "One-Time", specify_no: 1, allow_multiple_redeem: "One-Time", multiple_redeem_specify_no: 1 })}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            cursor: "pointer",
                                            border: '1px solid lightgray',
                                            width: isMobileView ? "100%" : "30%",
                                            border: formik.values.redemption_type === "One-Time" ? '2px solid rgb(112, 112, 241)' : '1px solid lightgray',
                                            padding: isMobileView ? '2px' : "5px",
                                        }}
                                    >
                                        <Typography variant="body1">One-Time</Typography>
                                        <Radio name={formik.values.redemption_type} checked={formik.values.redemption_type === "One-Time"} />
                                    </Paper>
                                    <Paper onClick={() => updateFormValues({ ...formik.values, redemption_type: "Unlimited", specify_no: 9999, allow_multiple_redeem: "", multiple_redeem_specify_no: "" })}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            marginTop: isMobileView ? "5px" : "",
                                            alignItems: 'center',
                                            cursor: "pointer",
                                            border: formik.values.redemption_type === "Unlimited" ? '2px solid rgb(112, 112, 241)' : '1px solid lightgray',
                                            width: isMobileView ? "100%" : "30%",
                                            borderRadius: '5px',
                                            padding: isMobileView ? '2px' : "5px",
                                        }}
                                    >
                                        <Typography variant="body1">Unlimited</Typography>
                                        <Radio name={formik.values.redemption_type} checked={formik.values.redemption_type === "Unlimited"} />
                                    </Paper>
                                    <Paper onClick={() => updateFormValues({ ...formik.values, redemption_type: "Limited-Number", specify_no: "", allow_multiple_redeem: "", multiple_redeem_specify_no: "" })}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            marginTop: isMobileView ? "5px" : "",
                                            alignItems: 'center',
                                            cursor: "pointer",
                                            border: formik.values.redemption_type === "Limited-Number" ? '2px solid rgb(112, 112, 241)' : '1px solid lightgray',
                                            width: isMobileView ? "100%" : "30%",
                                            borderRadius: '5px',
                                            padding: isMobileView ? '2px' : "5px",
                                        }}
                                    >
                                        <Typography variant="body1">Limited-Number</Typography>
                                        <Radio name={formik.values.redemption_type} checked={formik.values.redemption_type === "Limited-Number"} />
                                    </Paper>
                                </div>
                            </div>
                            {formik.values.redemption_type === "Limited-Number" &&
                                <div style={{ marginTop: "8px" }}>
                                    <p style={{ fontWeight: 500, fontSize: "16px" }}>Specify Number</p>
                                    <input type='number' value={formik.values.specify_no} name="specify_no" onChange={formik.handleChange} onBlur={formik.handleBlur} className='discount-input' style={{ width: "50%" }} />
                                    {formik.touched.specify_no && formik.errors.specify_no ? (
                                        <div className="error">{formik.errors.specify_no}</div>
                                    ) : null}
                                </div>
                            }

                            <div className={isMobileView ? "d-flex flex-column" : 'd-flex'}>
                                <div className={isMobileView ? "w-100" : 'w-50'}>
                                    <Typography variant="subtitle1" fontWeight={550} fontSize="14px" marginTop="8px">
                                        Per Service
                                    </Typography>
                                    <ButtonGroup style={{ border: "1px solid black", marginTop: "5px" }}>
                                        <Button
                                            style={{
                                                fontWeight: "500",
                                                textTransform: "capitalize",
                                                fontSize: "15px",
                                                backgroundColor: formik.values.allow_multiple_redeem === "One-Time" ? "black" : "",
                                                color: formik.values.allow_multiple_redeem === "One-Time" ? "white" : "",
                                                padding: "3px 30px",
                                                textAlign: "center",
                                            }}
                                            onClick={() => updateFormValues({ ...formik.values, allow_multiple_redeem: "One-Time", multiple_redeem_specify_no: 1 })}
                                        >
                                            One Time
                                        </Button>
                                        <Button
                                            style={{
                                                fontWeight: "500",
                                                fontSize: "15px",
                                                textTransform: "capitalize",
                                                backgroundColor: formik.values.allow_multiple_redeem === "Multiple-time" ? "black" : "",
                                                color: formik.values.allow_multiple_redeem === "Multiple-time" ? "white" : "",
                                                padding: "3px 30px",
                                                textAlign: "center",
                                            }}
                                            onClick={() => updateFormValues({ ...formik.values, allow_multiple_redeem: "Multiple-time", multiple_redeem_specify_no: "" })}
                                        >
                                            Multiple Time
                                        </Button>
                                    </ButtonGroup>
                                </div>


                                <div className={isMobileView ? "w-100" : "w-50"} style={{ marginTop: "8px" }}>
                                    <p style={{ fontWeight: 550, fontSize: "14px" }}>Specify Number</p>
                                    <input type='number' name="multiple_redeem_specify_no" disabled={formik.values.allow_multiple_redeem === "One-Time"} value={formik.values.multiple_redeem_specify_no} className='discount-input' style={{ padding: "5px" }} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    {formik.touched.multiple_redeem_specify_no && formik.errors.multiple_redeem_specify_no ? (
                                        <div className="error">{formik.errors.multiple_redeem_specify_no}</div>
                                    ) : null}
                                </div>

                            </div>
                            <div className="d-flex">
                                <div
                                    className={isMobileView ? "w-100" : "w-25"}
                                    style={{ marginTop: "8px" }}
                                >
                                    <p style={{ fontWeight: 550, fontSize: "14px" }}>
                                        Start Date <span style={{ color: "red" }}>*</span>
                                    </p>
                                    <input
                                        type="date"
                                        value={formik?.values?.start_date}
                                        name="start_date"
                                        className="discount-input"
                                        style={{ padding: "5px" }}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        min={formik?.values?.start_date}
                                    />
                                    {formik.touched.start_date && formik.errors.start_date ? (
                                        <div className="error">{formik.errors.start_date}</div>
                                    ) : null}
                                </div><div
                                    className={isMobileView ? "w-100" : "w-25"}
                                    style={{ marginTop: "8px" }}
                                >
                                    <p style={{ fontWeight: 550, fontSize: "14px" }}>
                                        Start Time <span style={{ color: "red" }}>*</span>
                                    </p>
                                    <input
                                        type="time"
                                        value={formik?.values?.start_time}
                                        name="start_time"
                                        className="discount-input"
                                        style={{ padding: "5px" }}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        disabled={formik.values.start_date === ""}
                                    />
                                    {formik.touched.start_time && formik.errors.start_time ? (
                                        <div className="error">{formik.errors.start_time}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className={isMobileView ? "d-flex flex-column" : 'd-flex'}>
                                <div className={isMobileView ? "w-100" : 'w-50'}>
                                    <Typography variant="subtitle1" fontWeight={550} fontSize="14px" marginTop="8px">
                                        Expiration
                                    </Typography>
                                    <ButtonGroup style={{ border: "1px solid black", marginTop: "5px" }}>
                                        <Button
                                            style={{
                                                fontWeight: "500",
                                                fontSize: "15px",
                                                textTransform: "capitalize",
                                                backgroundColor: formik.values.expiration === "No-Expiry" ? "black" : "",
                                                color: formik.values.expiration === "No-Expiry" ? "white" : "",
                                                padding: "3px 30px",
                                                textAlign: "center",
                                            }}
                                            onClick={() => updateFormValues({ ...formik.values, expiration: "No-Expiry", end_date: "", end_time: "" })}
                                        >
                                            No Expiry
                                        </Button>
                                        <Button
                                            style={{
                                                fontWeight: "500",
                                                fontSize: "15px",
                                                textTransform: "capitalize",
                                                backgroundColor: formik.values.expiration === "Limited-Time" ? "black" : "",
                                                color: formik.values.expiration === "Limited-Time" ? "white" : "",
                                                padding: "3px 30px",
                                                textAlign: "center",
                                            }}
                                            onClick={() => updateFormValues({ ...formik.values, expiration: "Limited-Time" })}
                                        >
                                            Limited Time
                                        </Button>
                                    </ButtonGroup>
                                </div>


                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="mx-2">
                                        <p style={{ fontWeight: 550, fontSize: "14px" }}>
                                            Validity Date{" "}
                                            {formik.values.expiration === "Limited-Time" && (
                                                <span style={{ color: "red" }}>*</span>
                                            )}
                                        </p>
                                        <input
                                            type="date"
                                            value={formik.values?.end_date}
                                            name="end_date"
                                            min={newDate}
                                            disabled={formik.values.expiration === "No-Expiry" || formik.values.start_date === ""}
                                            className="discount-input"
                                            style={{ padding: "5px", width: "100%" }}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.end_date && formik.errors.end_date ? (
                                            <div className="error">{formik.errors.end_date}</div>
                                        ) : null}
                                    </div>
                                    <div className="mx-2">
                                        <p style={{ fontWeight: 550, fontSize: "14px" }}>
                                            Validity Time{" "}
                                            {formik.values.expiration === "Limited-Time" && (
                                                <span style={{ color: "red" }}>*</span>
                                            )}
                                        </p>
                                        <input
                                            type="time"
                                            value={formik.values?.end_time}
                                            name="end_time"
                                            disabled={formik.values.expiration === "No-Expiry" || formik.values.start_date === ""}
                                            className="discount-input"
                                            style={{ padding: "5px", width: "100%" }}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            min={formik.values.start_date}
                                        />
                                        {formik.touched.end_time && formik.errors.end_time ? (
                                            <div className="error">{formik.errors.end_time}</div>
                                        ) : null}
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className='container' style={{ backgroundColor: "white", width: "90%", padding: "2%", marginTop: "2%", borderRadius: "5px" }}>
                            <p style={{ fontWeight: "600", fontSize: "16px" }}>Applies To</p>
                            <div className='d-flex justify-content-between align-items-center'>

                                <p style={{ fontWeight: 550, fontSize: "14px" }}>Services/Vendors</p>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='mx-2'>Apply to All</div>
                                    <div style={{ display: "flex" }}>
                                        <label class="switch" style={{ marginRight: "5px" }}>
                                            <input type="checkbox"
                                                checked={formik.values.apply_global}
                                                name="apply_global"
                                                value={formik.values.apply_global}
                                                onChange={() => {
                                                    formik.setValues((prev) => {
                                                        return { ...prev, apply_global: !formik.values.apply_global, companies: [], services: [] }
                                                    })
                                                }}
                                                onBlur={formik.handleBlur} />
                                            <span class="slider round"></span>
                                        </label>
                                    </div>
                                    <AddMorePopup check={formik?.values?.apply_global} service={formik.values.services} companies={formik.values.companies} setServiceListing={setServiceListing} handleClose={handleClose} handleOpen={handleOpen} open={open} setValues={formik.setValues} />                            </div>
                            </div>

                            {formik.values.apply_global && formik.values.companies.length === 0 &&
                                <p style={{ textAlign: "center", fontWeight: "700", fontSize: "14px" }}>Applied to All Services / Vendors </p>
                            }
                            {formik.touched.companies && formik.errors.companies ? (
                                <div className="error text-center">{formik.errors.companies}</div>
                            ) : null}
                            {formik?.values?.companies &&

                                formik?.values?.companies.map((company) =>
                                    <div style={{ border: "1px solid #EAEBF0", borderRadius: "6px", padding: "10px", marginTop: "5px" }}>
                                        <div className='d-flex justify-content-between'>
                                            <p style={{ fontWeight: "550", fontSize: "14px" }}>{company.name}</p>
                                            <div className='d-flex align-items-center justify-content-between'>
                                                <svg style={{ cursor: "pointer" }} onClick={() => deletecompany(company.id)} xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                                    <path d="M2.5 5.43586C2.5 5.10712 2.77226 4.84062 3.10811 4.84062H7.09823C7.10364 4.1396 7.17962 3.17855 7.87531 2.51325C8.4228 1.98967 9.1734 1.66602 9.99999 1.66602C10.8266 1.66602 11.5772 1.98967 12.1247 2.51325C12.8204 3.17855 12.8963 4.1396 12.9018 4.84062H16.8919C17.2277 4.84062 17.5 5.10712 17.5 5.43586C17.5 5.7646 17.2277 6.0311 16.8919 6.0311H3.10811C2.77226 6.0311 2.5 5.7646 2.5 5.43586Z" fill="#F6513B" />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M9.663 18.3327H10.337C12.6559 18.3327 13.8154 18.3327 14.5693 17.5944C15.3231 16.8561 15.4003 15.6451 15.5545 13.2231L15.7768 9.73318C15.8605 8.41902 15.9023 7.76194 15.5241 7.34556C15.1459 6.92917 14.5073 6.92917 13.23 6.92917H6.77004C5.49272 6.92917 4.85407 6.92917 4.47588 7.34556C4.09769 7.76194 4.13953 8.41902 4.22323 9.73319L4.44549 13.2231C4.59975 15.6451 4.67687 16.8561 5.43074 17.5944C6.18461 18.3327 7.34407 18.3327 9.663 18.3327ZM8.53856 10.1564C8.50422 9.79487 8.19794 9.53109 7.85448 9.56725C7.51101 9.6034 7.26042 9.9258 7.29477 10.2873L7.71143 14.6733C7.74578 15.0348 8.05206 15.2986 8.39552 15.2625C8.73899 15.2263 8.98958 14.9039 8.95523 14.5424L8.53856 10.1564ZM12.1455 9.56725C12.489 9.6034 12.7396 9.9258 12.7052 10.2873L12.2886 14.6733C12.2542 15.0348 11.9479 15.2986 11.6045 15.2625C11.261 15.2263 11.0104 14.9039 11.0448 14.5424L11.4614 10.1564C11.4958 9.79487 11.8021 9.53109 12.1455 9.56725Z" fill="#F6513B" />
                                                </svg>

                                            </div>
                                        </div>

                                        <p className='typography-dicount-view'>({companywithservice(company.id)} of {companywithservicelength(company.id)} Services Selected )</p>
                                    </div>

                                )}
                        </div>

                        <div className='container' style={{ backgroundColor: "white", width: "90%", padding: "2%", marginTop: "2%", borderRadius: "5px", marginBottom: "2%" }}>
                            <p style={{ fontWeight: "600", fontSize: "16px" }}>Requirements</p>
                            <div className={isMobileView ? "d-flex flex-column" : 'd-flex align-item-center'}>
                                <div className={isMobileView ? "w-100" : "w-50"}>
                                    <div>
                                        <p style={{ fontWeight: 550, fontSize: "14px" }}>Purchase Requirements</p>
                                        <ButtonGroup style={{ border: "1px solid black" }}>
                                            <Button
                                                style={{
                                                    fontWeight: "500",
                                                    fontSize: "15px",
                                                    textTransform: "capitalize",
                                                    backgroundColor: formik.values.purchase_requirement === false ? "black" : "",
                                                    color: formik.values.purchase_requirement === false ? "white" : "",
                                                    padding: "3px 30px",
                                                    textAlign: "center",
                                                }}
                                                onClick={() => updateFormValues({ ...formik.values, purchase_requirement: !formik.values.purchase_requirement, min_purchase_amount: "" })}
                                            >
                                                No Minimum Requirement
                                            </Button>
                                            <Button
                                                style={{
                                                    fontWeight: "500",
                                                    fontSize: "15px",
                                                    textTransform: "capitalize",
                                                    backgroundColor: formik.values.purchase_requirement === true ? "black" : "",
                                                    color: formik.values.purchase_requirement === true ? "white" : "",
                                                    padding: "3px 30px",
                                                    textAlign: "center",
                                                }}
                                                onClick={() => updateFormValues({ ...formik.values, purchase_requirement: !formik.values.purchase_requirement })}
                                            >
                                                Minimum Purchase Amount
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                </div>
                                <div className={isMobileView ? "w-100" : 'w-50'} style={{ marginTop: isMobileView ? "5px" : "" }}>
                                    <p style={{ fontWeight: 500, fontSize: "16px" }}>Minimum Purchase Amount</p>
                                    <input type='number' name="min_purchase_amount" className='discount-input' value={formik.values.min_purchase_amount} onChange={formik.handleChange} onBlur={formik.handleBlur} disabled={formik.values.purchase_requirement === false} />
                                    {formik.touched.min_purchase_amount && formik.errors.min_purchase_amount ? (
                                        <div className="error">{formik.errors.min_purchase_amount}</div>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        <div className='container' style={{ backgroundColor: "white", width: "90%", padding: "2%", marginTop: "2%", borderRadius: "5px" }}>
                            <p style={{ fontWeight: "600", fontSize: "16px" }}>Feature Discount (optional)</p>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Checkbox size="small" name="on_checkout" checked={formik.values.on_checkout} value={formik.values.on_checkout} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                <Typography variant="p" component="p">
                                    On Checkout
                                </Typography>
                            </Box>
                            <hr></hr>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Checkbox name="on_home_screen" checked={formik.values.on_home_screen} value={formik.values.on_home_screen} onChange={formik.handleChange} onBlur={formik.handleBlur} size="small" />
                                <Typography variant="p" component="p">
                                    On Home Screen
                                </Typography>
                            </Box>
                            <p style={{ fontWeight: "600", marginTop: "5px" }}>Image</p>
                            <Box textAlign="center" mt={1} style={{ width: "100%", marginBottom: "5px" }}>
                                <label htmlFor="file-input" style={{ width: "100%" }}>
                                    <Paper
                                        elevation={3}
                                        style={{
                                            cursor: 'pointer',
                                            padding: '8px',
                                            width: "100%",
                                            border: '1px dashed lightgray',
                                            boxShadow: "none",
                                            padding: "2%"
                                        }}
                                    >
                                        <input
                                            type="file"
                                            id="file-input"
                                            // required={formik.values?.image?.includes("https://")? false:true}
                                            accept=".jpg, .jpeg, .png"
                                            style={{ display: 'none' }}
                                            onBlur={formik.handleBlur}
                                            onChange={(e) => handleFileChange(e.target.files[0])}
                                        />
                                        <div style={{ marginBottom: "5px" }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                                <path d="M9.165 13.3339C9.165 13.795 9.53884 14.1689 10 14.1689C10.4612 14.1689 10.835 13.795 10.835 13.3339H9.165ZM10.835 4.16719C10.835 3.70603 10.4612 3.33219 10 3.33219C9.53884 3.33219 9.165 3.70603 9.165 4.16719L10.835 4.16719ZM12.7429 6.42429C13.069 6.75038 13.5977 6.75038 13.9238 6.42429C14.2499 6.09821 14.2499 5.56951 13.9238 5.24342L12.7429 6.42429ZM10.5893 3.08978L9.99882 3.68021L10.5893 3.08978ZM9.41074 3.08978L10.0012 3.68022L10.0012 3.68021L9.41074 3.08978ZM6.07623 5.24342C5.75014 5.56951 5.75014 6.0982 6.07623 6.42429C6.40232 6.75038 6.93101 6.75038 7.2571 6.42429L6.07623 5.24342ZM3.335 13.3339C3.335 12.8727 2.96116 12.4989 2.5 12.4989C2.03884 12.4989 1.665 12.8727 1.665 13.3339H3.335ZM18.335 13.3339C18.335 12.8727 17.9612 12.4989 17.5 12.4989C17.0388 12.4989 16.665 12.8727 16.665 13.3339H18.335ZM16.135 17.228L15.7559 16.4841H15.7559L16.135 17.228ZM17.2275 16.1355L17.9715 16.5146V16.5146L17.2275 16.1355ZM2.77248 16.1355L2.02849 16.5146L2.77248 16.1355ZM3.86502 17.228L3.48594 17.972H3.48594L3.86502 17.228ZM10.835 13.3339L10.835 4.16719L9.165 4.16719L9.165 13.3339H10.835ZM13.9238 5.24342L11.1797 2.49935L9.99882 3.68021L12.7429 6.42429L13.9238 5.24342ZM8.82031 2.49935L6.07623 5.24342L7.2571 6.42429L10.0012 3.68022L8.82031 2.49935ZM11.1797 2.49935C10.5282 1.84782 9.47183 1.84782 8.82031 2.49935L10.0012 3.68021C10.0021 3.67929 10.0016 3.67996 10.0002 3.68052C9.9994 3.68085 9.99936 3.6807 10 3.6807C10.0006 3.6807 10.0006 3.68085 9.9998 3.68052C9.99843 3.67996 9.99789 3.67929 9.99882 3.68021L11.1797 2.49935ZM1.665 13.3339V13.5005H3.335V13.3339H1.665ZM6.5 18.3355H13.5V16.6655H6.5V18.3355ZM18.335 13.5005V13.3339H16.665V13.5005H18.335ZM13.5 18.3355C14.1863 18.3355 14.7512 18.3362 15.21 18.2987C15.6785 18.2604 16.1093 18.1782 16.5141 17.972L15.7559 16.4841C15.6258 16.5503 15.4392 16.6044 15.074 16.6342C14.699 16.6649 14.2138 16.6655 13.5 16.6655V18.3355ZM16.665 13.5005C16.665 14.2144 16.6644 14.6995 16.6337 15.0745C16.6039 15.4398 16.5498 15.6264 16.4835 15.7564L17.9715 16.5146C18.1777 16.1099 18.2599 15.679 18.2982 15.2105C18.3356 14.7517 18.335 14.1868 18.335 13.5005H16.665ZM16.5141 17.972C17.1416 17.6523 17.6518 17.1421 17.9715 16.5146L16.4835 15.7564C16.3239 16.0697 16.0692 16.3244 15.7559 16.4841L16.5141 17.972ZM1.665 13.5005C1.665 14.1868 1.66435 14.7517 1.70183 15.2105C1.74011 15.679 1.82228 16.1099 2.02849 16.5146L3.51647 15.7564C3.45021 15.6264 3.39613 15.4398 3.36629 15.0745C3.33565 14.6995 3.335 14.2144 3.335 13.5005H1.665ZM6.5 16.6655C5.78616 16.6655 5.30099 16.6649 4.926 16.6342C4.56076 16.6044 4.37416 16.5503 4.24411 16.4841L3.48594 17.972C3.89066 18.1782 4.32149 18.2604 4.79001 18.2987C5.24878 18.3362 5.81371 18.3355 6.5 18.3355V16.6655ZM2.02849 16.5146C2.34823 17.1421 2.85842 17.6523 3.48594 17.972L4.24411 16.4841C3.93082 16.3244 3.6761 16.0697 3.51647 15.7564L2.02849 16.5146Z" fill="#252525" />
                                            </svg>
                                        </div>

                                        {/* <CloudUploadIcon fontSize="large" /> */}
                                        <Typography variant="body1" style={{ fontSize: "12px" }}>
                                            Drag and Drop or choose your file for upload
                                        </Typography>
                                        <Typography variant="body2" style={{ fontSize: "12px", color: "#68727D" }}>Upload Image ( Max 300 KB )</Typography>
                                    </Paper>
                                </label>
                                {formik.touched.image && formik.errors.image ? (
                                    <div className="error">{formik.errors.image}</div>
                                ) : null}
                                {formik?.values?.image?.name ? <span className='my-3'>File Name : {formik.values?.image?.name}</span> :
                                    <img className='my-3 w-25 rounded' src={formik?.values?.image} alt={formik?.values?.image} />
                                }
                            </Box>
                        </div>
                        <hr style={{ borderBottom: "2px solid black", width: "90%" }} className="mx-auto" />
                        <div className="d-flex justify-content-end px-6 pb-1">
                            <button type='reset' className='m-1 btn btn-small btn-white' onClick={() => navigate(-1)}>cancel</button>
                            <button type='submit' className='m-1 btn btn-small' style={{ backgroundColor: "#006875", color: "white" }}>Edit Discount</button>
                        </div>
                    </form>
                </div>


            </>
        )
    }
    else {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
                <CircularProgress />
            </div>
        )
    }

}
