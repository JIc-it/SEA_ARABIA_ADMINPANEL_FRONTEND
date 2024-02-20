import { Offcanvas } from "react-bootstrap";
// import DropZone from "../Common/DropZone";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createCustomer, getLocation } from "../../services/CustomerHandle";
import { passwordRegex } from "../../helpers";

import CountryDropdown from "../SharedComponents/CountryDropDown";
import { AppContext } from "../../Context/AppContext";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
function CustomerCreate({ show, close, tableData }) {
  const theme = useTheme();
  const locationContext = useContext(AppContext);

  const [isRefetch, setIsRefetch] = useState();
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
  const [isLoading, setIsLoading] = useState(false);

  const [location, setLocation] = useState([]);
  const [gender, setGender] = useState([
    { id: "1", label: "Male" },
    { id: "2", label: "Female" },
  ]);
  const [values, setValues] = useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    // Prevent default to avoid losing focus on the input field
    event.preventDefault();

    // Toggle password visibility only if the input field is not focused
    if (document.activeElement !== event.currentTarget.previousElementSibling) {
      handleClickShowPassword();
    }
  };

  //confirm
  const [valuesConfirm, setValuesConfirm] = useState({
    showPassword: false,
  });

  const handleClickShowPasswordConfirm = () => {
    setValuesConfirm({
      ...valuesConfirm,
      showPassword: !valuesConfirm.showPassword,
    });
  };

  const handleMouseDownPasswordConfirm = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    getLocation()
      .then((data) => {
        // console.log("location is==", data.results);
        setLocation(data.results);
      })
      .catch((error) => {
        toast.error(error.message);
        console.log("error while fetching location", error);
      });
  }, []);

  const validationSchema = Yup.object({
    first_name: Yup.string()
      .required("First Name is required")
      .max(20, "Name must be at most 20 characters")
      .test(
        "is-not-blank",
        "Name must not contain only blank spaces",
        (value) => {
          return /\S/.test(value); // Checks if there is at least one non-whitespace character
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
    password: Yup.string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Password must contain at least 8 characters, at least one uppercase letter, lowercase letter, special character, and number"
      ),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
    dob: Yup.date()
      .required("Date of Birth is required")
      .max(new Date(), "Date of Birth cannot be in the future")
      .test("year-length", "Year must be 4 digits", function (value) {
        if (!value) return false;
        const year = value.getFullYear();
        return year.toString().length === 4;
      }),
    // other fields...

    mobile: Yup.string().required("Mobile is required"),
    gender: Yup.string().required("Gender is required"),
    // location: Yup.object({
    //   id: Yup.string().required("Location ID is required"),
    //   name: Yup.string().required("Location name is required"),
    //   label: Yup.string().required("Location label is required"),
    //   code: Yup.string().required("Location code is required"),
    // }).required("Location is required"),
    location: Yup.mixed().required("Location is required"),
  });

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      gender: "",
      location: "",
      mobile: "",
      confirmPassword: "",
    },
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
            dob: values.dob,
            password: values.password,
            mobile: values.mobile,

            location: values.location.id,
            gender: values.gender,
          };

          const customerData = await createCustomer(data);
          console.log("create customer", createCustomer);
          if (customerData) {
            setIsRefetch(!isRefetch);
            toast.success("Customer Added Successfully.");
            resetForm();
            tableData(true);
            close();
            setIsLoading(false);
          } else {
            console.error("Error while creating Customer:", customerData.error);
            setIsLoading(false);
          }
          setIsLoading(false);
        } catch (err) {
          console.log(err);
          err.response.data.email && toast.error(err.response.data.email[0]);
          err.response.data.mobile && toast.error(err.response.data.mobile[0]);
          setIsLoading(false);
        }
      }
    },
  });
  console.log("formik of admin", formik.values);
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
          Add Customer{" "}
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
            placeholder="First Name"
            className="form-control"
            name="first_name" // Make sure the name attribute matches the Yup field name
            maxLength={20}
            value={formik.values.first_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.first_name && formik.errors.first_name ? (
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
            placeholder="Last Name"
            className="form-control"
            name="last_name"
            maxLength={20}
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
              className="form-control"
              gccCountries={locationContext?.gccCountriesList}
              formik={formik}
              onChange={(selectedCountry) => {
                // Update the "location" field in the formik values
                formik.setFieldValue("location", selectedCountry);
              }}
            />
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
          {formik.touched.dob && formik.errors.dob && (
            <div className="error">{formik.errors.dob}</div>
          )}
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
            Gender <span style={{ color: "red" }}>*</span>
          </label>
          <div style={{ position: "relative" }}>
            <select
              className="form-select"
              id="gender"
              name="gender"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.gender}
            >
              <option value="" label="Select a gender" />
              {gender.map((option) => (
                <option
                  key={option.id}
                  value={option.label}
                  label={option.label}
                >
                  {option.label}
                </option>
              ))}
            </select>
            {formik.touched.gender && formik.errors.gender ? (
              <div className="error">{formik.errors.gender}</div>
            ) : null}
          </div>
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
              Password <span style={{ color: "red" }}>*</span>
            </label>

            <div className="input-group mb-3">
              <input
                type={values.showPassword ? "text" : "password"} // Corrected password type
                placeholder=" Password"
                name="password"
                className="form-control"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div
                className="input-group-append"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                style={{ cursor: "pointer" }} // Add cursor style
              >
                <span className="input-group-text">
                  {values.showPassword ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </span>
              </div>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div>
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
              Confirm Password <span style={{ color: "red" }}>*</span>
            </label>

            <div className="input-group mb-3">
              <input
                type={valuesConfirm.showPassword ? "text" : "password"} // Corrected password type
                placeholder="confirmPassword"
                name="confirmPassword"
                className="form-control"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div
                className="input-group-append"
                onClick={handleClickShowPasswordConfirm}
                style={{ cursor: "pointer" }} // Add cursor style
              >
                <span className="input-group-text">
                  {values.showPassword ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </span>
              </div>
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="error">{formik.errors.confirmPassword}</div>
            ) : null}
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
              Add
            </button>
          </div>
        </div>
      </form>
    </Offcanvas>
  );
}

export default CustomerCreate;
