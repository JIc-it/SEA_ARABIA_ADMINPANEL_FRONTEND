import { Offcanvas } from "react-bootstrap";
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
import { Autocomplete, TextField } from "@mui/material";

function CustomerEditModal({ show, close }) {
  const theme = useTheme();
  const customerId = useParams()?.customerId;
  const locationContext = useContext(AppContext);
  console.log("location---", locationContext);
  const [isRefetch, setIsRefetch] = useState(false);
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
  const [isLoading, setIsLoading] = useState(false);
  const [customerDetails, setCustomerDetails] = useState([]);
  const [location, setLocation] = useState(locationContext.gccCountriesList);
  console.log("location state", location);
  const validationSchema = Yup.object({
    first_name: Yup.string()
      .required("First Name is required")
      .max(20, "Name must be at most 20 characters")
      .test(
        "is-not-blank",
        "Name must not contain only blank spaces",
        (value) => {
          return /\S/.test(value); // Checks for at least one non-whitespace character
        }
      ),
    last_name: Yup.string()
      .required("Last Name is required")
      .max(20, "Name must be at most 20 characters")
      .test(
        "is-not-blank",
        "Name must not contain only blank spaces",
        (value) => {
          return /\S/.test(value); // Checks if there is at least one non-whitespace character
        }
      ),
    email: Yup.string()
      .email("Invalid email address")
      .max(50, "Last name must be at most 20 characters")
      .required("Email is required")
      .test("custom-email-format", "Invalid email format", (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ),
    mobile: Yup.string().required("Mobile is required"),

    dob: Yup.date()
      .required("Date of Birth is required")
      .max(new Date(), "Date of Birth cannot be in the future"),

    gender: Yup.string().required("Gender is required"),
    location: Yup.mixed().required("Location is required"),
  });
  const [gender, setGender] = useState([
    { id: "1", label: "Male" },
    { id: "2", label: "Female" },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const selectStyles = {
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    background: `url(${
      isOpen ? "path/to/down-arrow.png" : "path/to/up-arrow.png"
    }) no-repeat right center`,
    paddingRight: "20px", // Adjust padding if needed
  };

  const arrowStyles = {
    transition: "transform 0.3s",
    transform: isOpen ? "rotate(0deg)" : "rotate(180deg)",
  };

  useEffect(() => {
    getCustomerListById(customerId)
      .then((data) => {
        console.log("cus detail is ---", data);
        setCustomerDetails(data);
        formik.setFieldValue("fullName", data.first_name);
        // formik.setFieldValue("last_name", data.last_name);
        formik.setFieldValue("email", data.email);
        const formattedPhoneNumber = data.mobile
          .replace(/\D/g, "")
          .replace(/^965/, "");
        formik.setFieldValue("phone", formattedPhoneNumber);
        const selectedCountryObject =
          location &&
          location.length > 0 &&
          data?.profileextra?.location?.country_code &&
          location.find(
            (country) =>
              country.code === data?.profileextra?.location?.country_code
          );
        console.log(selectedCountryObject, "selectedCountryObject");
        selectedCountryObject &&
          formik.setFieldValue("location", selectedCountryObject);
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });
  }, [customerId]);

  console.log("customerDetails? ", customerDetails);

  const formik = useFormik({
    initialValues: {
      first_name: customerDetails?.first_name || "",
      last_name: customerDetails?.last_name || "",
      email: customerDetails?.email || "",
      mobile: customerDetails?.mobile || "",
      dob: customerDetails?.profileextra?.dob || "",

      location: customerDetails?.profileextra?.location?.country_code || "",

      gender: customerDetails?.profileextra?.gender || "",

      // Add other fields as needed
    },

    enableReinitialize: true,
    validationSchema,

    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);

      if (!isLoading) {
        try {
          const data = {
            first_name: values.first_name,
            last_name: values.last_name,
            role: "User",
            email: values.email,
            password: values.password,
            mobile: values.mobile,
            profileextra: {
              location: values.location.id,
              dob: values.dob, // Assuming you have dob in your form
              gender: values.gender,
            },
          };

          const customerData = await UpdateCustomerListById(customerId, data);
          console.log("customer updated detail is ---", customerData);
          if (customerData) {
            setIsLoading(false);
            // window.location.reload();
            setIsRefetch(!isRefetch);
            toast.success("customer updated Successfully.");
            close();
            resetForm();
          } else {
            console.error("Error while updating Vendor:", customerData.error);
            setIsLoading(false);
          }
        } catch (err) {
          // console.log(err);
          // toast.error(customerData.error.message);
          err.response.data.email && toast.error(err.response.data.email[0]);
          err.response.data.mobile && toast.error(err.response.data.mobile[0]);
          setIsLoading(false);
        }
      }
    },
  });

  useEffect(() => {
    // Reset the form when the modal opens
    if (show) {
      formik.resetForm();
    }
  }, [show]);

  useEffect(() => {
    formik.setValues({
      first_name: customerDetails?.first_name || "",
      last_name: customerDetails?.last_name || "",
      email: customerDetails?.email || "",
      mobile: customerDetails?.mobile || "",
      profileextra: {
        location: {
          country: customerDetails?.profileextra?.location?.country_code || "",
        },

        gender: customerDetails?.profileextra?.gender || "",
        dob: customerDetails?.profileextra?.dob || "",
      },
    });
    console.log("formik", formik.setValues);
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
        <Offcanvas.Title
          style={{
            fontWeight: "600",
          }}
        >
          Edit Details{" "}
        </Offcanvas.Title>
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
            maxLength={20}
            placeholder="First Name"
            className="form-control"
            name="first_name" // Name attribute should match the schema field
            value={formik.values.first_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.first_name && formik.errors.first_name ? ( // Check for touched.first_name
            <div className="error">{formik.errors.first_name}</div>
          ) : null}
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
            Last Name
          </label>
          <input
            type="text"
            maxLength={20}
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
              maxLength={50}
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
                formik.setFieldValue("location", selectedCountry);
              }}
            />

            {/* </div> */}
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
            DOB
          </label>
          <input
            max="9999-12-31"
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
            style={{
              paddingBottom: "10px",
              fontWeight: "600",
              fontSize: "13px",
            }}
          >
            Gender
          </label>

          <select
            className="form-select"
            id="gender"
            name="gender"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.gender}
            style={selectStyles}
            onClick={() => setIsOpen(!isOpen)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <option value="" label="Select a gender" />
            {gender.map((option) => (
              <option key={option.id} value={option.label} label={option.label}>
                {/* {console.log("options", option)} {option.label} */}
              </option>
            ))}
          </select>
          <div className="custom-arrow" style={arrowStyles}>
            &#9650; {/* Unicode arrow character */}
          </div>
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
