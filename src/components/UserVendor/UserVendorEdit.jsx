import { Offcanvas } from "react-bootstrap";
import "../../static/css/AddNewLead.css";
import { colors } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Avatars from "../../assets/images/Avatar.png"

function UserVendorEdit({ show, close }) {
    const theme = useTheme();
    const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
    const [isLoading, setIsLoading] = useState(false);

    const validationSchema = Yup.object({
        name: Yup.string()
            .required("Name is required")
            .max(20, "Name must be at most 20 characters"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        mobile: Yup.string().required("Mobile is required"),
        location: Yup.string().required("Location is required"),
        idtype: Yup.string().required("ID Type is required"),
        idnumber: Yup.string().required("ID Number is required"),
        companyname: Yup.string()
            .required("Company Name is required")
            .max(20, "Company Name must be at most 20 characters"),
        companyaddress: Yup.string().required("Company Address is required"),
        companyregnumber: Yup.string().required("Company Register Number is required"),
        companywebaddress: Yup.string().required("Company Website is required"),
        defineservice: Yup.string().required("Define Service is required"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            mobile: "",
            location: "",
            idtype: "",
            idnumber: "",
            companyname: "",
            companyaddress: "",
            companyregnumber: "",
            companywebaddress: "",
            defineservice: ""
        },
        validationSchema,
        // onSubmit: async (values) => {
        //   setIsLoading(true);

        //   if (!isLoading) {
        //     try {
        //       const data = {
        //         first_name: values.name,
        //         last_name: "",
        //         role: "Vendor",
        //         email: values.email,
        //         mobile: `+965 ${values.mobile}`,
        //         location: values.location,
        //       };

        //       const adminData = await createVenderLead(data);

        //       if (adminData) {
        //         setIsLoading(false);
        //         window.location.reload();
        //       } else {
        //         console.error("Error while creating Admin:", adminData.error);
        //         setIsLoading(false);
        //       }
        //       setIsLoading(false);
        //     } catch (err) {
        //       console.log(err);
        //       err.response.data.email && toast.error(err.response.data.email[0]);
        //       err.response.data.mobile && toast.error(err.response.data.mobile[0]);
        //       setIsLoading(false);
        //     }
        //   }
        // },
    });

    return (

        <div style={{ height: "100vh" }}>
            <div className="col-12 actions_menu my-2 px-3">
                <div className={isMobileView ? "" : "action_menu_left col-8"}>
              <div className="d-flex flex-column">
              <div>
                        <div className="col-12">
                            <div className="row row-cards">
                                <div className="breadcrumbs">
                                    <p>Users</p>
                                    <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                        >
                                            <path
                                                d="M8.33301 5L12.7438 9.41074C13.0692 9.73618 13.0692 10.2638 12.7438 10.5893L8.33301 15"
                                                stroke="#68727D"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                            />
                                        </svg>
                                    </span>
                                    <p>Vendors</p>
                                    <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                        >
                                            <path
                                                d="M8.33301 5L12.7438 9.41074C13.0692 9.73618 13.0692 10.2638 12.7438 10.5893L8.33301 15"
                                                stroke="#68727D"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                            />
                                        </svg>
                                    </span>
                                    <p>Edit Details</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="card mt-2" style={{ width: isMobileView ? "100vw" : "", borderRadius: "8px" }}>
                            <div className="col-12 p-5">
                                <p style={{ fontWeight: "600" }}>Personal Details</p>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: isMobileView ? "column" : "row" }}>
                                    <div className="mr-2" style={{ width: isMobileView ? "80vw" : "35vw" }}>
                                        <div>
                                            <label
                                                htmlFor=""
                                                style={{ paddingBottom: "10px", fontWeight: "600", fontSize: "13px" }}
                                            >
                                                Full Name <span style={{ color: "red" }}>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                className="form-control"
                                                name="name"
                                                value={formik.values.name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.name && formik.errors.name ? (
                                                <div className="error">{formik.errors.name}</div>
                                            ) : null}
                                        </div>
                                        <div className="mt-2">
                                            <label
                                                htmlFor=""
                                                style={{ paddingBottom: "10px", fontWeight: "600", fontSize: "13px" }}
                                            >
                                                Email <span style={{ color: "red" }}>*</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="Email"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.email && formik.errors.email ? (
                                                <div className="error">{formik.errors.email}</div>
                                            ) : null}
                                        </div>
                                        <div className="mt-2">
                                            <label
                                                htmlFor=""
                                                style={{ paddingBottom: "12px", fontWeight: "600", fontSize: "13px" }}
                                            >
                                                ID Type <span style={{ color: "red" }}>*</span>
                                            </label>
                                            <select
                                                className="form-control"
                                                name="idtype"
                                                value={formik.values.idtype}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                                <option value="" disabled>Select a service</option>
                                                <option value="service1">Service 1</option>
                                                <option value="service2">Service 2</option>
                                                {/* Add more options as needed */}
                                            </select>
                                            {formik.touched.idtype && formik.errors.idtype ? (
                                                <div className="error">{formik.errors.idtype}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="ms-3" style={{ width: isMobileView ? "80vw" : "35vw" }}>
                                        <div className="mt-2">
                                            <label
                                                htmlFor=""
                                                style={{ paddingBottom: "10px", fontWeight: "600", fontSize: "13px" }}
                                            >
                                                Phone <span style={{ color: "red" }}>*</span>
                                            </label>
                                            <div style={{ display: "flex" }}>
                                                <div className="col-3">
                                                    <input
                                                        type="text"
                                                        value={"+965"}
                                                        className="form-control"
                                                        readOnly={true}
                                                    />
                                                </div>
                                                <div className="col-9">
                                                    <input
                                                        type="number"
                                                        placeholder="Phone Number"
                                                        className="form-control"
                                                        name="mobile"
                                                        value={formik.values.mobile}
                                                        onChange={(e) => {
                                                            const inputValue = e.target.value;
                                                            if (inputValue.length <= 10) {
                                                                const sanitizedValue = inputValue.replace(/\D/g, ""); // Remove non-digit characters
                                                                formik.handleChange("mobile")(sanitizedValue); // Update the formik field
                                                            }
                                                        }}
                                                        onBlur={formik.handleBlur}
                                                    />
                                                </div>
                                            </div>
                                            {formik.touched.mobile && formik.errors.mobile ? (
                                                <div className="error">{formik.errors.mobile}</div>
                                            ) : null}
                                        </div>
                                        <div className="mt-2">
                                            <label
                                                htmlFor=""
                                                style={{ paddingBottom: "10px", fontWeight: "600", fontSize: "13px" }}
                                            >
                                                Location <span style={{ color: "red" }}>*</span>
                                            </label>
                                            <div>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    id=""
                                                    name="location"
                                                    placeholder="Location"
                                                    value={formik.values.location}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.location && formik.errors.location ? (
                                                    <div className="error">{formik.errors.location}</div>
                                                ) : null}

                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <label
                                                htmlFor=""
                                                style={{ paddingBottom: "10px", fontWeight: "600", fontSize: "13px" }}
                                            >
                                                ID Number <span style={{ color: "red" }}>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="ID Number"
                                                className="form-control"
                                                name="idnumber"
                                                value={formik.values.idnumber}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.idnumber && formik.errors.idnumber ? (
                                                <div className="error">{formik.errors.idnumber}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card mt-2" style={{ width: isMobileView ? "100vw" : "", borderRadius: "8px" }}>
                            <div className="col-12 p-5">
                                <p style={{ fontWeight: "600" }}>Company Details</p>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: isMobileView ? "column" : "row" }}>
                                    <div className="mr-2" style={{ width: isMobileView ? "80vw" : "35vw" }}>
                                        <div>
                                            <label
                                                htmlFor=""
                                                style={{ paddingBottom: "10px", fontWeight: "600", fontSize: "13px" }}
                                            >
                                                Company Name <span style={{ color: "red" }}>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Company Name"
                                                className="form-control"
                                                name="companyname"
                                                value={formik.values.companyname}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.companyname && formik.errors.companyname ? (
                                                <div className="error">{formik.errors.companyname}</div>
                                            ) : null}
                                        </div>
                                        <div className="mt-2">
                                            <label
                                                htmlFor=""
                                                style={{ paddingBottom: "10px", fontWeight: "600", fontSize: "13px" }}
                                            >
                                                Company Register Number <span style={{ color: "red" }}>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Company Register Number"
                                                className="form-control"
                                                name="companyregnumber"
                                                value={formik.values.companyregnumber}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.companyregnumber && formik.errors.companyregnumber ? (
                                                <div className="error">{formik.errors.companyregnumber}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="ms-3" style={{ width: isMobileView ? "80vw" : "35vw" }}>
                                        <div className="mt-2">
                                            <label
                                                htmlFor=""
                                                style={{ paddingBottom: "10px", fontWeight: "600", fontSize: "13px" }}
                                            >Company Address
                                                <span style={{ color: "red" }}>*</span>
                                            </label>
                                            <div style={{ position: "relative" }}>
                                                <input
                                                    type="text"
                                                    placeholder="Name"
                                                    className="form-control"
                                                    name="companyaddress"
                                                    value={formik.values.companyaddress}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.companyaddress && formik.errors.companyaddress ? (
                                                    <div className="error">{formik.errors.companyaddress}</div>
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
                                        <div className="mt-2">
                                            <label
                                                htmlFor=""
                                                style={{ paddingBottom: "10px", fontWeight: "600", fontSize: "13px" }}
                                            >
                                                Company Website <span style={{ color: "red" }}>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Company Website"
                                                className="form-control"
                                                name="companywebaddress"
                                                value={formik.values.companywebaddress}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.companywebaddress && formik.errors.companywebaddress ? (
                                                <div className="error">{formik.errors.companywebaddress}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card mt-2 mb-2" style={{ width: isMobileView ? "100vw" : "", borderRadius: "8px" }}>
                            <div className="col-12 p-5">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p style={{ fontWeight: "600" }}>Service Details</p>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: isMobileView ? "column" : "row" }}>
                                    <div className="mr-2" style={{ width: isMobileView ? "80vw" : "35vw" }}>


                                        <div className="mt-2">
                                            <label
                                                htmlFor=""
                                                style={{ paddingBottom: "10px", fontWeight: "600", fontSize: "13px" }}
                                            >
                                                Define Service <span style={{ color: "red" }}>*</span>
                                            </label>
                                            <select
                                                className="form-control"
                                                name="defineservice"
                                                value={formik.values.defineservice}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                                <option value="" disabled>Select a service</option>
                                                <option value="service1">Service 1</option>
                                                <option value="service2">Service 2</option>
                                                {/* Add more options as needed */}
                                            </select>
                                            {formik.touched.defineservice && formik.errors.defineservice ? (
                                                <div className="error">{formik.errors.defineservice}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="" style={{ width: isMobileView ? "80vw" : "35vw" }}>
                                        <div className="mt-2">
                                            <label htmlFor=""
                                                style={{ paddingBottom: "10px", fontWeight: "600", fontSize: "13px" }}>OwnerShip</label>
                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        style={{ width: "15px" }}
                                                        defaultChecked />
                                                </div>
                                                <div><p style={{ fontSize: "14px", transform: "translateY(5px)", marginLeft: "5px" }}>Third Party Services</p></div>
                                            </div>
                                            {formik.touched.mobile && formik.errors.mobile ? (
                                                <div className="error">{formik.errors.mobile}</div>
                                            ) : null}
                                        </div>


                                    </div>
                                </div>

                            </div>
                        </div>
                        <hr style={{ borderBottom: "1px solid black" }}></hr>
                        <div className='d-flex justify-content-end'>
                            <button type='reset' className='m-1 btn btn-small btn-white'>cancel</button>
                            <button type='submit' className='m-1 btn btn-small' style={{ backgroundColor: "#006875", color: "white" }}>Continue</button>
                        </div>

                    </form>
              </div>
                </div>
            </div>
        </div>

    );
}

export default UserVendorEdit;
