import { Offcanvas } from "react-bootstrap";
import "../../static/css/AddNewLead.css";
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

function CreateAddon({ show, close }) {
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
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            mobile: "",
            location: "",
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
        //         // window.location.reload();
        //         setIsRefetch(!isRefetch);
        //         toast.success("Vendor Added Successfully.");
        //         close();
        //         setIsLoading(false);
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
        <Offcanvas
            show={show}
            onHide={close}
            placement="end"
            style={{ overflow: "auto" }}
        >
            <Offcanvas.Header
                closeButton
                style={{ border: "0px", paddingBottom: "0px" }}
            >
                <Offcanvas.Title>Create Add On</Offcanvas.Title>
            </Offcanvas.Header>
            <form onSubmit={formik.handleSubmit} style={{ padding: "1rem" }}>
                <div>
                    <label
                        htmlFor=""
                        style={{ paddingBottom: "10px", fontWeight: "500" }}
                    >
                        Name <span style={{ color: "red" }}>*</span>
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
                <div className="mt-3">
                    <label
                        htmlFor=""
                        style={{ paddingBottom: "10px", fontWeight: "500" }}
                    >
                        Description <span style={{ color: "red" }}>*</span>
                    </label>
                    <textarea
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                        className="form-control"
                        placeholder="Notes"
                    ></textarea>
                    {formik.touched.email && formik.errors.email ? (
                        <div className="error">{formik.errors.email}</div>
                    ) : null}
                </div>
                <div className="mt-3">
                    <label
                        htmlFor=""
                        style={{ paddingBottom: "10px", fontWeight: "500" }}
                    >
                        Price <span style={{ color: "red" }}>*</span>
                    </label>

                    <input
                        type="number"
                        placeholder="Price"
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

                    {formik.touched.mobile && formik.errors.mobile ? (
                        <div className="error">{formik.errors.mobile}</div>
                    ) : null}
                </div>
                <div className="mt-3 ">
                    <Paper sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}
                        elevation={3}
                        style={{
                            cursor: 'pointer',
                            padding: '8px 10px',
                            width: "100%",
                            border: '1px dashed lightgray',
                            boxShadow: "none",
                            padding: "2%",
                        }}
                    >
                        <input
                            type="file"
                            id="file-input"
                            // required={formik.values?.image?.includes("https://")? false:true}
                            accept=".jpg, .jpeg, .png"
                            style={{ display: 'none' }}
                        // onBlur={formik.handleBlur}
                        // onChange={(e)=>handleFileChange(e.target.files[0])}
                        />
                        <div style={{ marginBottom: "5px" }} className="mx-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                <path d="M9.165 13.3339C9.165 13.795 9.53884 14.1689 10 14.1689C10.4612 14.1689 10.835 13.795 10.835 13.3339H9.165ZM10.835 4.16719C10.835 3.70603 10.4612 3.33219 10 3.33219C9.53884 3.33219 9.165 3.70603 9.165 4.16719L10.835 4.16719ZM12.7429 6.42429C13.069 6.75038 13.5977 6.75038 13.9238 6.42429C14.2499 6.09821 14.2499 5.56951 13.9238 5.24342L12.7429 6.42429ZM10.5893 3.08978L9.99882 3.68021L10.5893 3.08978ZM9.41074 3.08978L10.0012 3.68022L10.0012 3.68021L9.41074 3.08978ZM6.07623 5.24342C5.75014 5.56951 5.75014 6.0982 6.07623 6.42429C6.40232 6.75038 6.93101 6.75038 7.2571 6.42429L6.07623 5.24342ZM3.335 13.3339C3.335 12.8727 2.96116 12.4989 2.5 12.4989C2.03884 12.4989 1.665 12.8727 1.665 13.3339H3.335ZM18.335 13.3339C18.335 12.8727 17.9612 12.4989 17.5 12.4989C17.0388 12.4989 16.665 12.8727 16.665 13.3339H18.335ZM16.135 17.228L15.7559 16.4841H15.7559L16.135 17.228ZM17.2275 16.1355L17.9715 16.5146V16.5146L17.2275 16.1355ZM2.77248 16.1355L2.02849 16.5146L2.77248 16.1355ZM3.86502 17.228L3.48594 17.972H3.48594L3.86502 17.228ZM10.835 13.3339L10.835 4.16719L9.165 4.16719L9.165 13.3339H10.835ZM13.9238 5.24342L11.1797 2.49935L9.99882 3.68021L12.7429 6.42429L13.9238 5.24342ZM8.82031 2.49935L6.07623 5.24342L7.2571 6.42429L10.0012 3.68022L8.82031 2.49935ZM11.1797 2.49935C10.5282 1.84782 9.47183 1.84782 8.82031 2.49935L10.0012 3.68021C10.0021 3.67929 10.0016 3.67996 10.0002 3.68052C9.9994 3.68085 9.99936 3.6807 10 3.6807C10.0006 3.6807 10.0006 3.68085 9.9998 3.68052C9.99843 3.67996 9.99789 3.67929 9.99882 3.68021L11.1797 2.49935ZM1.665 13.3339V13.5005H3.335V13.3339H1.665ZM6.5 18.3355H13.5V16.6655H6.5V18.3355ZM18.335 13.5005V13.3339H16.665V13.5005H18.335ZM13.5 18.3355C14.1863 18.3355 14.7512 18.3362 15.21 18.2987C15.6785 18.2604 16.1093 18.1782 16.5141 17.972L15.7559 16.4841C15.6258 16.5503 15.4392 16.6044 15.074 16.6342C14.699 16.6649 14.2138 16.6655 13.5 16.6655V18.3355ZM16.665 13.5005C16.665 14.2144 16.6644 14.6995 16.6337 15.0745C16.6039 15.4398 16.5498 15.6264 16.4835 15.7564L17.9715 16.5146C18.1777 16.1099 18.2599 15.679 18.2982 15.2105C18.3356 14.7517 18.335 14.1868 18.335 13.5005H16.665ZM16.5141 17.972C17.1416 17.6523 17.6518 17.1421 17.9715 16.5146L16.4835 15.7564C16.3239 16.0697 16.0692 16.3244 15.7559 16.4841L16.5141 17.972ZM1.665 13.5005C1.665 14.1868 1.66435 14.7517 1.70183 15.2105C1.74011 15.679 1.82228 16.1099 2.02849 16.5146L3.51647 15.7564C3.45021 15.6264 3.39613 15.4398 3.36629 15.0745C3.33565 14.6995 3.335 14.2144 3.335 13.5005H1.665ZM6.5 16.6655C5.78616 16.6655 5.30099 16.6649 4.926 16.6342C4.56076 16.6044 4.37416 16.5503 4.24411 16.4841L3.48594 17.972C3.89066 18.1782 4.32149 18.2604 4.79001 18.2987C5.24878 18.3362 5.81371 18.3355 6.5 18.3355V16.6655ZM2.02849 16.5146C2.34823 17.1421 2.85842 17.6523 3.48594 17.972L4.24411 16.4841C3.93082 16.3244 3.6761 16.0697 3.51647 15.7564L2.02849 16.5146Z" fill="#252525" />
                            </svg>
                        </div>

                        {/* <CloudUploadIcon fontSize="large" /> */}
                        <Typography variant="body1" style={{ fontSize: "12px" }}>
                            Drag and Drop or <span style={{ color: "#187AF7" }}>choose your</span> file for upload
                        </Typography>
                        <Typography variant="body2" style={{ fontSize: "12px", color: "#68727D" }}>Upload Image ( Max 100 KB )</Typography>
                    </Paper>
                </div>
                <button
                    className="btn btn-success"
                    type="submit"
                    style={{
                        flex: 1,
                        backgroundColor: "#006875",
                        width: "92%",
                        position: "absolute",
                        bottom: "1rem",
                    }}
                >
                    {isLoading ? <CircularProgress /> : "Add"}
                </button>
            </form>
        </Offcanvas>
    );
}

export default CreateAddon;
