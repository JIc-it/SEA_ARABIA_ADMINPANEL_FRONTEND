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

function CustomerEdit({ show, close }) {
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
            companywebaddress: ""
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
                                                style={{ paddingBottom: "10px", fontWeight: "600", fontSize: "13px" }}
                                            >
                                                ID Type <span style={{ color: "red" }}>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="ID Type"
                                                className="form-control"
                                                name="idtype"
                                                value={formik.values.idtype}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
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
                                            <div style={{ position: "relative" }}>
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
                                    <button className="btn px-2 py-1" style={{ backgroundColor: "#187AF7", color: "white" }}>Add Service</button>
                                </div>
                                <div className="table-responsive">
                                    <table className="table" >
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Type</th>
                                                <th>Availability</th>
                                                <th>Capacity</th>
                                                <th>Location</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr >
                                                <td className="d-flex text-dark">
                                                    <img src={Avatars} width={20} height={20} style={{ borderRadius: "50%" }} />
                                                    <p className="mx-2">Achille Lauro</p>
                                                </td>
                                                <td className="text-dark">Jet Ski</td>
                                                <td className="text-dark">5</td>
                                                <td className="text-dark">-</td>
                                                <td className="text-dark">Kuwait</td>
                                                <td className="text-dark">
                                                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M2.5 5.43683C2.5 5.10809 2.77226 4.8416 3.10811 4.8416H7.09823C7.10364 4.14057 7.17962 3.17953 7.87531 2.51423C8.4228 1.99065 9.1734 1.66699 9.99999 1.66699C10.8266 1.66699 11.5772 1.99065 12.1247 2.51423C12.8204 3.17953 12.8963 4.14057 12.9018 4.8416H16.8919C17.2277 4.8416 17.5 5.10809 17.5 5.43683C17.5 5.76557 17.2277 6.03207 16.8919 6.03207H3.10811C2.77226 6.03207 2.5 5.76557 2.5 5.43683Z" fill="#F6513B" />
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M9.663 18.3337H10.337C12.6559 18.3337 13.8154 18.3337 14.5693 17.5954C15.3231 16.8571 15.4003 15.6461 15.5545 13.2241L15.7768 9.73416C15.8605 8.42 15.9023 7.76292 15.5241 7.34654C15.1459 6.93015 14.5073 6.93015 13.23 6.93015H6.77004C5.49272 6.93015 4.85407 6.93015 4.47588 7.34654C4.09769 7.76292 4.13953 8.42 4.22323 9.73416L4.44549 13.2241C4.59975 15.6461 4.67687 16.8571 5.43074 17.5954C6.18461 18.3337 7.34407 18.3337 9.663 18.3337ZM8.53856 10.1574C8.50422 9.79585 8.19794 9.53207 7.85448 9.56822C7.51101 9.60438 7.26042 9.92677 7.29477 10.2883L7.71143 14.6743C7.74578 15.0358 8.05206 15.2996 8.39552 15.2634C8.73899 15.2273 8.98958 14.9049 8.95523 14.5434L8.53856 10.1574ZM12.1455 9.56822C12.489 9.60438 12.7396 9.92677 12.7052 10.2883L12.2886 14.6743C12.2542 15.0358 11.9479 15.2996 11.6045 15.2634C11.261 15.2273 11.0104 14.9049 11.0448 14.5434L11.4614 10.1574C11.4958 9.79585 11.8021 9.53207 12.1455 9.56822Z" fill="#F6513B" />
                                                    </svg>
                                                </td>
                                                <td>
                                                    <svg width={10} height={10} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.83333 9.99967C5.83333 10.9201 5.08714 11.6663 4.16667 11.6663C3.24619 11.6663 2.5 10.9201 2.5 9.99967C2.5 9.0792 3.24619 8.33301 4.16667 8.33301C5.08714 8.33301 5.83333 9.0792 5.83333 9.99967Z" fill="#2E3030" />
                                                        <path d="M11.6667 9.99967C11.6667 10.9201 10.9205 11.6663 10 11.6663C9.07952 11.6663 8.33333 10.9201 8.33333 9.99967C8.33333 9.0792 9.07952 8.33301 10 8.33301C10.9205 8.33301 11.6667 9.0792 11.6667 9.99967Z" fill="#2E3030" />
                                                        <path d="M17.5 9.99967C17.5 10.9201 16.7538 11.6663 15.8333 11.6663C14.9129 11.6663 14.1667 10.9201 14.1667 9.99967C14.1667 9.0792 14.9129 8.33301 15.8333 8.33301C16.7538 8.33301 17.5 9.0792 17.5 9.99967Z" fill="#2E3030" />
                                                    </svg>


                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                        <hr style={{ borderBottom: "1px solid black" }}></hr>
                        <div className='d-flex justify-content-end'>
                            <button type='reset' className='m-1 btn btn-small btn-white'>cancel</button>
                            <button type='submit' className='m-1 btn btn-small' style={{ backgroundColor: "#006875", color: "white" }}>Update</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>

    );
}

export default CustomerEdit;
