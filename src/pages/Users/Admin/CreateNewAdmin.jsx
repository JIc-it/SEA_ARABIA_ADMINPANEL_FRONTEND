import { Offcanvas } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { passwordRegex } from "../../../helpers";
import { useState } from "react";

import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext } from "react";
import { createAdmin } from "../../../services/GuestHandle";
import { AppContext } from "../../../Context/AppContext";

import CountryDropdown from "../../../components/SharedComponents/CountryDropDown";

function CreateNewAdmin({ show, close, locationList }) {
  const [isRefetch, setIsRefetch] = useState();
  const locationContext = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldValue, setFieldValue] = useState();
  const [gender, setGender] = useState([
    { id: "1", label: "Male" },
    { id: "2", label: "Female" },
  ]);

  const validationSchema = Yup.object({
    first_name: Yup.string()
      .required("First name is required")
      .max(20, "First name must be at most 20 characters")
      .test(
        "is-not-blank",
        "First Name must not contain only blank spaces",
        (value) => {
          return /\S/.test(value); // Checks if there is at least one non-whitespace character
        }
      ),

    last_name: Yup.string()
      .required("Last name is required")
      .max(20, "Last name must be at most 20 characters")
      .test(
        "is-not-blank",
        "First Name must not contain only blank spaces",
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
      .min(6, "Password should be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .max(50)
      .required("Confirm Password is required")
      .matches(
        passwordRegex,
        "Password must contain at least 8 characters, at least one uppercase letter, lowercase letter, special character, and number"
      )
      .oneOf([Yup.ref("password")], "Passwords must match"),
    gender: Yup.string().required("Gender is required"),
    mobile: Yup.string()
      .required("Mobile is required")
      .test(
        "is-at-least-8-digits",
        "Mobile must have at least 8 digits",
        (value) => {
          return /^\d{8,}$/.test(value); // Checks if there are at least 8 digits
        }
      ),
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
    onSubmit: async (values) => {
      setIsLoading(true);

      // const selectedCountry = locationContext && locationContext.length>0 && data.profile

      if (!isLoading) {
        try {
          const data = {
            first_name: values.first_name,
            last_name: values.last_name,
            role: "Admin",
            email: values.email,
            password: values.password,
            mobile: values.mobile,

            location: values.location.id,
            gender: values.gender,
          };

          const adminData = await createAdmin(data);
          console.log("createAdmin", createAdmin);
          if (adminData) {
            setIsRefetch(!isRefetch);
            toast.success("Admin Added Successfully.");
            close();
            setIsLoading(false);
          } else {
            console.error("Error while creating Admin:", adminData.error);
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
        <Offcanvas.Title>Add Admin </Offcanvas.Title>
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
          *{" "}
          {formik.touched.mobile && formik.errors.mobile ? (
            <div className="error">{formik.errors.mobile}</div>
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
            Gender <span style={{ color: "red" }}>*</span>
          </label>
          <div style={{ position: "relative" }}>
            <select
              className="form-control"
              id=""
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" label="Select a gender" />
              {gender?.map((item) => (
                <option key={item.id} value={item.id} label={item.label}>
                  {item.label}
                </option>
              ))}
              {/* Add more options as needed */}
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
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
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
            <input
              type="Password"
              name="confirmPassword"
              className="form-control"
              placeholder="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
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
              Confirm
            </button>
          </div>
        </div>
      </form>
    </Offcanvas>
  );
}

export default CreateNewAdmin;
