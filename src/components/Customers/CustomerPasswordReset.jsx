import { Offcanvas } from "react-bootstrap";
// import DropZone from "../Common/DropZone";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import pen from "../../assets/images/Pen 2.png";

// import {
//   UpdateSalesRepListById,
//   getSalesRepListById,
// } from "../../../services/GuestHandle";
import { useParams } from "react-router-dom";

import {
  UpdateSalesRepListById,
  getSalesRepListById,
} from "../../services/GuestHandle";
import { passwordRegex } from "../../helpers";
import { getCustomerListById } from "../../services/CustomerHandle";

function CustomerPasswordReset({ show, close }) {
  const theme = useTheme();

  const [isRefetch, setIsRefetch] = useState();
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
  const [isLoading, setIsLoading] = useState(false);
  const customerId = useParams()?.customerId;
  const [customerDetails, setCustomersDetails] = useState();

  useEffect(() => {
    getCustomerListById(customerId)
      .then((data) => {
        setCustomersDetails(data);
        // console.log(" sales  update list------==", data);
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });
  }, [customerId]);

  const validationSchema = Yup.object({
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
  });

  const formik = useFormik({
    initialValues: {
      password: customerDetails?.password || "",
      confirmPassword: customerDetails?.confirmPassword || "",

      // Add other fields as needed
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);

      if (!isLoading) {
        try {
          const data = {
            password: values.password,
            confirmPassword: values.confirmPassword,
          };

          const salesUpdateData = await UpdateSalesRepListById(
            customerId,
            data
          );
          // console.log("Sales password updated detail is ---", salesUpdateData);
          if (salesUpdateData) {
            setIsLoading(false);
            window.location.reload();
            setIsRefetch(!isRefetch);
            toast.success(" Sales password updated Successfully.");
            close();
          } else {
            console.error(
              "Error while updating Sales password:",
              salesUpdateData.error
            );
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
      first_name: customerDetails?.first_name || "",
      last_name: customerDetails?.last_name || "",
      password: customerDetails?.password || "",

      email: customerDetails?.email || "",
      mobile: customerDetails?.mobile || "",
      location: customerDetails?.profileextra?.location || "",

      // defineservice: customerDetails?.useridentificationdata?.,
      // Add other fields as needed
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
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

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

export default CustomerPasswordReset;
