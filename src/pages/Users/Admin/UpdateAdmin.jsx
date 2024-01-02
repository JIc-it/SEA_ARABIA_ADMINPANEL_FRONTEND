import { Offcanvas } from "react-bootstrap";
// import DropZone from "../Common/DropZone";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import {
  UpdateAdminListById,
  createAdmin,
  getAdminListById,
  getSalesRepListById,
} from "../../../services/GuestHandle";
import { useParams } from "react-router-dom";
import { passwordRegex } from "../../../helpers";

function UpdateAdmin({ show, close }) {
  const theme = useTheme();
  const adminId = useParams()?.adminId;
  console.log("admin id ===", adminId);
  const [isRefetch, setIsRefetch] = useState();
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
  const [isLoading, setIsLoading] = useState(false);
  const salesRepId = useParams()?.salesRepId;
  const [adminDetails, setAdminDetails] = useState();

  useEffect(() => {
    getAdminListById(adminId)
      .then((data) => {
        setAdminDetails(data);
        console.log(" admin by id------==", data);
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });
  }, [adminId]);

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
    password: Yup.string().min(6, "Password should be at least 6 characters"),
    // .required("Password is required"),
    confirmPassword: Yup.string()
      .max(50)
      // .required("Confirm Password is required")
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
      first_name: adminDetails?.first_name || "",
      last_name: adminDetails?.last_name || "",
      email: adminDetails?.email || "",
      password: adminDetails?.password || "",
      confirmPassword: adminDetails?.confirmPassword || "",
      mobile: adminDetails?.mobile || "",
      location: adminDetails?.profileextra?.location || "",

      // Add other fields as needed
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);

      if (!isLoading) {
        try {
          const data = {
            // Assuming vendorId is a constant or variable defined earlier
            first_name: values.first_name,
            last_name: values.last_name,

            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
            mobile: values.mobile,
            profileextra: {
              location: values.location,
            },
          };

          const adminData = await UpdateAdminListById(adminId, data);
          console.log("Admin updated detail is ---", adminData);
          if (adminData) {
            setIsLoading(false);
            // window.location.reload();
            // setIsRefetch(!isRefetch);
            toast.success(" Admin updated Successfully.");
            close();
          } else {
            console.error("Error while updating Admin:", adminData.error);
            setIsLoading(false);
          }
        } catch (err) {
          console.log(err);
          err.response.data.email && toast.error(err.response.data.email[0]);
          err.response.data.mobile && toast.error(err.response.data.mobile[0]);
          setIsLoading(false);
        }
      }
    },
  });
  console.log("admin formik update data", formik);

  useEffect(() => {
    formik.setValues({
      first_name: adminDetails?.first_name || "",
      last_name: adminDetails?.last_name || "",
      password: adminDetails?.password || "",

      email: adminDetails?.email || "",
      mobile: adminDetails?.mobile || "",
      location: adminDetails?.profileextra?.location || "",

      // defineservice: adminDetails?.useridentificationdata?.,
      // Add other fields as needed
    });
  }, [adminDetails]);

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
              style={{
                top: "10px",
                right: "5px",
                position: "absolute",
              }}
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
                    id="flexCheckDefault"
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
                    id="flexCheckDefault"
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
                    id="flexCheckDefault"
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
                    id="flexCheckDefault"
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
                    id="flexCheckDefault"
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
                    id="flexCheckDefault"
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
                    id="flexCheckDefault"
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
                    id="flexCheckDefault"
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
                    id="flexCheckDefault"
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
                    id="flexCheckDefault"
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
                    id="flexCheckDefault"
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
                    id="flexCheckDefault"
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
                    id="flexCheckDefault"
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
                    id="flexCheckDefault"
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
                    id="flexCheckDefault"
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
                    id="flexCheckDefault"
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
                    id="flexCheckDefault"
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
                    id="flexCheckDefault"
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
                    id="flexCheckDefault"
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
                    id="flexCheckDefault"
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
                    id="flexCheckDefault"
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
                    id="flexCheckDefault"
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
                    id="flexCheckDefault"
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
                    id="flexCheckDefault"
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

export default UpdateAdmin;
