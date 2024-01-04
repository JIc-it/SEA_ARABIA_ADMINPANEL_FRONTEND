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

function SalesPassword({ show, close }) {
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
        console.log(" admin update list------==", data);
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
        <Offcanvas.Title>Edit Details </Offcanvas.Title>
      </Offcanvas.Header>
      <form action="" onSubmit={formik.handleSubmit}>
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
        <br />
        <br />
        <br />
        <br />
        <br />
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>

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
              justifyContent: "flex-end",
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

export default SalesPassword;
