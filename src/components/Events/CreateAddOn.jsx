import { Offcanvas } from "react-bootstrap";
import DropZone from "../Common/DropZone";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  UpdateCustomerListById,
  getCustomerListById,
} from "../../services/CustomerHandle";
import { useParams } from "react-router-dom";
import { FileUploader } from "../Modal/FileUploader";

function CreateAddOn({ show, close }) {
  const theme = useTheme();
  const customerId = useParams()?.customerId;
  console.log("c-id==", customerId);

  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
  const [isLoading, setIsLoading] = useState(false);
  const [customerDetails, setCustomerDetails] = useState([]);
  const handleFileChange = (file) => {
    formik.setFieldValue("files", file[0]);
  };
  const validationSchema = Yup.object({
    // name: Yup.string()
    //   .required("Name is required")
    //   .max(20, "Name must be at most 20 characters"),
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
    location: Yup.string().required("Location is required"),

    dob: Yup.date()
      .required("Date of Birth is required")
      .max(new Date(), "Date of Birth cannot be in the future"),

    gender: Yup.string().required("Gender is required"),
  });

  useEffect(() => {
    getCustomerListById(customerId)
      .then((data) => {
        console.log("cus detail is ---", data);
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
      location: customerDetails?.profileextra?.location || "",
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

            profile_extra: {
              location: values.location,
              dob: values.dob,
              gender: values.gender,
            },
          };

          const customerData = await UpdateCustomerListById(customerId, data);
          console.log("customer updated detail is ---", customerData);
          if (customerData) {
            setIsLoading(false);
            window.location.reload();
            // setIsRefetch(!isRefetch);
            toast.success("customer updated Successfully.");
            close();
          } else {
            console.error("Error while updating Vendor:", customerData.error);
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
  useEffect(() => {
    formik.setValues({
      first_name: customerDetails?.first_name || "",
      last_name: customerDetails?.last_name || "",
      email: customerDetails?.email || "",
      mobile: customerDetails?.mobile || "",
      location: customerDetails?.profile_extra?.location || "",
      gender: customerDetails?.profile_extra?.gender || "",
      dob: customerDetails?.profile_extra?.dob || "",
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
        <Offcanvas.Title>Create New Add on </Offcanvas.Title>
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
            Name <span style={{ color: "red" }}>*</span>
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
            Description
          </label>
          <textarea
            type="text"
            rows={4}
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
          <div className="mt-2">
            <label
              htmlFor=""
              style={{
                paddingBottom: "10px",
                fontWeight: "600",
                fontSize: "13px",
              }}
            >
              Price <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="email"
              name="price"
              className="form-control"
              placeholder="Enter the price"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </div>
        </div>
        <div>
          <FileUploader formik={formik} handleFileChange={handleFileChange} />
        </div>
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

export default CreateAddOn;
