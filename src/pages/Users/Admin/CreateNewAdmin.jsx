import { Offcanvas } from "react-bootstrap";
// import DropZone from "../Common/DropZone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { passwordRegex } from "../../../helpers";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import {
  UpdateAdminListById,
  createAdmin,
  getSalesRepListById,
} from "../../../services/GuestHandle";
import { useParams } from "react-router-dom";
import { getLocation } from "../../../services/CustomerHandle";

function CreateNewAdmin({ show, close }) {
  const theme = useTheme();
  const adminId = useParams()?.adminId;
  const [isRefetch, setIsRefetch] = useState();
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
  const [isLoading, setIsLoading] = useState(false);
  const salesRepId = useParams()?.salesRepId;
  const [adminDetails, setAdminDetails] = useState();
  const [location, setLocation] = useState([]);
  const [gender, setGender] = useState([
    { id: "1", label: "Male" },
    { id: "2", label: "Female" },
  ]);

  useEffect(() => {
    getSalesRepListById(salesRepId)
      .then((data) => {
        setAdminDetails(data);
        console.log(" admin by id==", data);
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });
  }, [salesRepId]);

  useEffect(() => {
    getLocation()
      .then((data) => {
        console.log("location is==", data.results);
        setLocation(data.results);
      })
      .catch((error) => {
        console.log("error while fetching location", error);
      });
  }, []);

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

    mobile: Yup.string().required("Mobile is required"),
    location: Yup.string().required("Location is required"),
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
      if (!isLoading) {
        try {
          const data = {
            first_name: values.first_name,
            last_name: values.last_name,
            role: "Admin",
            email: values.email,
            password: values.password,
            mobile: values.mobile,

            location: values.location,
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
  console.log("formik of admin", formik);
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
              {gender.map((item) => (
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
            {" "}
            <select
              className="form-control"
              id=""
              name="location"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" label="Select a location" />
              {location.map((item) => {
                return (
                  <option key={item?.id} value={item.id} label={item?.location}>
                    {`${item?.location} ${item?.country_flag}`}
                  </option>
                );
              })}
              {/* Add more options as needed */}
            </select>
            {formik.touched.location && formik.errors.location ? (
              <div className="error">{formik.errors.location}</div>
            ) : null}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              style={{
                top: "10px",
                right: "5px",
                position: "absolute",
              }}
            >
              <path
                d="M3.3335 8.45209C3.3335 4.70425 6.31826 1.66602 10.0002 1.66602C13.6821 1.66602 16.6668 4.70425 16.6668 8.45209C16.6668 12.1706 14.5391 16.5097 11.2193 18.0614C10.4454 18.4231 9.55495 18.4231 8.78105 18.0614C5.46127 16.5097 3.3335 12.1706 3.3335 8.45209Z"
                stroke="#68727D"
                strokeWidth="1.5"
              />
              <ellipse
                cx="10"
                cy="8.33398"
                rx="2.5"
                ry="2.5"
                stroke="#68727D"
                strokeWidth="1.5"
              />
            </svg>
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

        {/* table */}
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Sections</th>
              <th scope="col">Perm 1</th>
              <th scope="col">Perm 2</th>
              <th scope="col">Perm 3</th>
              <th scope="col">Perm 4</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Section 1</th>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  {/* <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/> */}
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault1"
                  />
                </div>
              </td>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault2"
                  />
                </div>
              </td>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault3"
                  />
                </div>
              </td>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault4"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Section 2</th>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault5"
                  />
                </div>
              </td>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault6"
                  />
                </div>
              </td>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault7"
                  />
                </div>
              </td>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault8"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Section 3</th>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault9"
                  />
                </div>
              </td>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault10"
                  />
                </div>
              </td>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault11"
                  />
                </div>
              </td>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault12"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Section 4</th>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault13"
                  />
                </div>
              </td>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault14"
                  />
                </div>
              </td>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault15"
                  />
                </div>
              </td>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault16"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Section 5</th>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault17"
                  />
                </div>
              </td>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault18"
                  />
                </div>
              </td>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault19"
                  />
                </div>
              </td>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault20"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Section 6</th>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault21"
                  />
                </div>
              </td>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault22"
                  />
                </div>
              </td>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault23"
                  />
                </div>
              </td>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault24"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
