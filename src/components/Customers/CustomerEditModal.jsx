import { Offcanvas } from "react-bootstrap";
import DropZone from "../Common/DropZone";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  UpdateCustomerListById,
  getCustomerListById,
  getLocation,
} from "../../services/CustomerHandle";
import { useParams } from "react-router-dom";
import CountryDropdown from "../SharedComponents/CountryDropDown";
import { AppContext } from "../../Context/AppContext";

function CustomerEditModal({ show, close }) {
  const theme = useTheme();
  const customerId = useParams()?.customerId;
  const locationContext = useContext(AppContext);
  const [isRefetch, setIsRefetch] = useState(false);
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
  const [isLoading, setIsLoading] = useState(false);
  const [customerDetails, setCustomerDetails] = useState([]);
  const [location, setLocation] = useState([]);

  const validationSchema = Yup.object({
    first_name: Yup.string()
      .required("First name is required")
      .max(20, "First name must be at most 20 characters"),

    last_name: Yup.string()
      .required("Last name is required")
      .max(20, "Last name must be at most 20 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    mobile: Yup.string().required("Mobile is required"),

    dob: Yup.date()
      .required("Date of Birth is required")
      .max(new Date(), "Date of Birth cannot be in the future"),

    gender: Yup.string().required("Gender is required"),
    location: Yup.object({
      id: Yup.string().required("Location ID is required"),
      name: Yup.string().required("Location name is required"),
      label: Yup.string().required("Location label is required"),
      code: Yup.string().required("Location code is required"),
    }).required("Location is required"),
  });
  

  useEffect(() => {
    getCustomerListById(customerId)
      .then((data) => {
        // console.log("cus detail is ---", data);
        setCustomerDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });
  }, [customerId]);

  const formik = useFormik({
    initialValues: {
      first_name: customerDetails?.first_name || "",
      last_name: customerDetails?.last_name || "",
      email: customerDetails?.email || "",
      mobile: customerDetails?.mobile || "",
      dob: customerDetails?.profileextra?.dob || "",
      location: customerDetails?.profileextra?.location?.country || "",
      gender: customerDetails?.profileextra?.gender || "",

      // Add other fields as needed
    },
    
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);

      if (!isLoading) {
        try {
          const data = {
            // Assuming vendorId is a constant or variable defined earlier
            first_name: values.first_name,
            last_name: values.last_name,
            role: "User",
            email: values.email,
            mobile: values.mobile,

            location: values.location,
            dob: values.dob,
            gender: values.gender,
          };

          const customerData = await UpdateCustomerListById(customerId, data);
          // console.log("customer updated detail is ---", customerData);
          if (customerData) {
            setIsLoading(false);
            window.location.reload();
            setIsRefetch(!isRefetch);
            toast.success("customer updated Successfully.");
            close();
          } else {
            console.error("Error while updating Vendor:", customerData.error);
            setIsLoading(false);
          }
        } catch (err) {
          // console.log(err);
          err.response.data.email && toast.error(err.response.data.email[0]);
          err.response.data.mobile && toast.error(err.response.data.mobile[0]);
          setIsLoading(false);
        }
      }
    },
  });
  useEffect(() => {
    formik.setValues({
      first_name: customerDetails?.first_name || "",
      last_name: customerDetails?.last_name || "",
      email: customerDetails?.email || "",
      mobile: customerDetails?.mobile || "",
      location: customerDetails?.profileextra?.location?.country?.code || "",
      gender: customerDetails?.profileextra?.gender || "",
      dob: customerDetails?.profileextra?.dob || "",
    });
  }, [customerDetails]);
 

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
        <Offcanvas.Title>Edit Details </Offcanvas.Title>
      </Offcanvas.Header>
      <form action="" onSubmit={formik.handleSubmit}>
        <div style={{ margin: "20px" }}>
          <label
            htmlFor=""
            style={{
              paddingBottom: "10px",
              fontWeight: "600",
              fontSize: "13px",
            }}
          >
            First Name <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            placeholder="First Name"
            className="form-control"
            name="first_name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.first_name ? (
            <div className="error">{formik.errors.first_name}</div>
          ) : null}
        </div>
        <div style={{ margin: "20px" }}>
          <label
            htmlFor=""
            style={{ paddingBottom: "10px", fontWeight: "500" }}
          >
            Last Name
          </label>
          <input
            type="text"
            placeholder="Last Name"
            className="form-control"
            name="last_name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.last_name && formik.errors.last_name ? (
            <div className="error">{formik.errors.last_name}</div>
          ) : null}
        </div>

        <div style={{ margin: "20px" }}>
          {" "}
          <label
            htmlFor=""
            style={{
              paddingBottom: "10px",
              fontWeight: "600",
              fontSize: "13px",
            }}
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
        <div style={{ margin: "20px" }}>
          {" "}
          <div className="mt-2">
            <label
              htmlFor=""
              style={{
                paddingBottom: "10px",
                fontWeight: "600",
                fontSize: "13px",
              }}
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
        </div>
        <div style={{ margin: "20px" }}>
          <label
            htmlFor=""
            style={{
              paddingBottom: "10px",
              fontWeight: "600",
              fontSize: "13px",
            }}
          >
            Location <span style={{ color: "red" }}>*</span>
          </label>
          <div style={{ position: "relative" }}>
            <CountryDropdown
              gccCountries={locationContext?.gccCountriesList}
              formik={formik}
              selected={formik.values.location}
              onChange={(selectedCountry) => {
                // Update the "location" field in the formik values
                formik.setFieldValue("location", selectedCountry);
              }}
            />
            {formik.touched.location && formik.errors.location ? (
              <div className="error">{formik.errors.location}</div>
            ) : null}
            {/* </div> */}
          </div>
        </div>

        <div style={{ margin: "20px" }}>
          <label
            htmlFor=""
            style={{ paddingBottom: "10px", fontWeight: "500" }}
          >
            DOB
          </label>
          <input
            type="date"
            name="dob" // Make sure this matches the name used in initialValues and validationSchema
            className="form-control"
            value={formik.values.dob}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.dob && formik.errors.dob ? (
            <div className="error">{formik.errors.dob}</div>
          ) : null}
        </div>

        <div style={{ margin: "20px" }}>
          <label
            htmlFor=""
            style={{ paddingBottom: "10px", fontWeight: "500" }}
          >
            Gender
          </label>
          <select
            name="gender"
            className="form-select"
            value={formik?.values?.gender}
            onChange={formik.handleChange}
            // onChange={(e) => {
            //   formik.handleChange(e);
            //   formik.setFieldValue("gender", e.target.value);
            // }}
            onBlur={formik.handleBlur}
          >
           
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {formik.touched.gender && formik.errors.gender ? (
            <div className="error">{formik.errors.gender}</div>
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "192px",
            justifyContent: "center",
            alignItems: "end",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "10px",
              marginLeft: "13px",
              marginRight: "10px",
              width: "100%",
              padding: "5px",
            }}
          >
            <button
              type="submit"
              className="btn btn-success"
              style={{
                flex: 1,
                margin: "0 5px",
                width: "calc(50% - 5px)",
                backgroundColor: "#006875",
              }}
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </Offcanvas>
  );
}

export default CustomerEditModal;
