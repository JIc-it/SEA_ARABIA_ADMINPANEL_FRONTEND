import { Offcanvas } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  UpdateSalesRepListById,
  getSalesRepListById,
} from "../../../services/GuestHandle";
import { useParams } from "react-router-dom";

import { getLocation } from "../../../services/CustomerHandle";
import CountryDropdown from "../../../components/SharedComponents/CountryDropDown";
import { AppContext } from "../../../Context/AppContext";

function UpdateSalesRep({ show, close }) {
  const theme = useTheme();
  const locationContext = useContext(AppContext);
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
  const [isLoading, setIsLoading] = useState(false);
  const salesRepId = useParams()?.salesRepId;
  const [salesDetails, setSalesDetails] = useState();
  const [location, setLocation] = useState([]);
  const [gender, setGender] = useState([
    { id: "1", label: "Male" },
    { id: "2", label: "Female" },
  ]);

  useEffect(() => {
    getSalesRepListById(salesRepId)
      .then((data) => {
        setSalesDetails(data);
        // console.log(" Sales Rep by id------==", data);
      })
      .catch((error) => {
        toast.error(error.message);
        console.error("Error fetching Salesrep data:", error);
      });
  }, [salesRepId]);

  useEffect(() => {
    getLocation()
      .then((data) => {
        // console.log("location of sales is==", data);
        setLocation(data.results);
      })
      .catch((error) => {
        toast.error(error.message);
        console.log("error while fetching location", error);
      });
  }, []);

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
        "Last Name must not contain only blank spaces",
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

    gender: Yup.string().required("Gender is required"),
    location: Yup.mixed().required("Location is required"),
  });

  const formik = useFormik({
    initialValues: {
      first_name: salesDetails?.first_name || "",
      last_name: salesDetails?.last_name || "",
      email: salesDetails?.email || "",
      dob: salesDetails?.profileextra?.dob || "",
      mobile: salesDetails?.mobile || "",
      location: salesDetails?.profileextra?.location || "",
      gender: salesDetails?.profileextra?.gender?.id || "",

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
            location: values.location.id,
            gender: values.gender.id,
            dob: values.dob,
          };

          const salesData = await UpdateSalesRepListById(salesRepId, data);
          console.log("Sales Rep updated detail is ---", salesData);
          if (salesData) {
            setIsLoading(false);
            window.location.reload();
            // setIsRefetch(!isRefetch);
            toast.success(" Sales Rep updated Successfully.");
            close();
          } else {
            console.error("Error while updating Sales Rep:", salesData.error);
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
  console.log("sales edit formik update data", formik.values);

  useEffect(() => {
    formik.setValues({
      first_name: salesDetails?.first_name || "",
      last_name: salesDetails?.last_name || "",
      password: salesDetails?.password || "",

      email: salesDetails?.email || "",
      mobile: salesDetails?.mobile || "",
      location: salesDetails?.profileextra?.location || "",
      gender: salesDetails?.profileextra?.gender?.id || "",
      // defineservice: salesDetails?.useridentificationdata?.,
      // Add other fields as needed
    });
  }, [salesDetails]);

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
          {" "}
          Reset Password
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
                <option key={item.id} value={item.label} label={item.label}>
                  {item.label}
                  {console.log("item==", item)}
                </option>
              ))}
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

export default UpdateSalesRep;
