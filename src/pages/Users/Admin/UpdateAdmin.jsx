import { Offcanvas } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  UpdateAdminListById,
  getAdminListById,
} from "../../../services/GuestHandle";
import { useParams } from "react-router-dom";

import { getLocation } from "../../../services/CustomerHandle";
import CountryDropdown from "../../../components/SharedComponents/CountryDropDown";
import { AppContext } from "../../../Context/AppContext";
import { Select } from "@mui/material";

function UpdateAdmin({ show, close }) {
  const theme = useTheme();
  const adminId = useParams()?.adminId;
  const locationContext = useContext(AppContext);

  const [isRefetch, setIsRefetch] = useState();
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
  const [isLoading, setIsLoading] = useState(false);
  const [adminDetails, setAdminDetails] = useState();
  const [location, setLocation] = useState(locationContext?.gccCountriesList);

  const [selectedOption, setSelectedOption] = useState("none");
  const options = [
    { value: "Female", label: "Female" },
    { value: "Male", label: "Male" },
  ];

  console.log("loc is", location);
  useEffect(() => {
    getAdminListById(adminId)
      .then((data) => {
        console.log("data admin", data); // Corrected typo in "dta" to "data"
        setAdminDetails(data);
        const selectedCountryObject =
          location &&
          location.length > 0 &&
          data?.profileextra?.location?.country_code &&
          location.find((country) => {
            console.log("country", country);
            return country.code === data?.profileextra?.location?.country_code;
          });

        console.log(selectedCountryObject, "selectedCountryObject");
        selectedCountryObject &&
          formik.setFieldValue("location", selectedCountryObject);
      })
      .catch((error) => {
        console.error("Error fetching admin data:", error); // Updated log message
      });
  }, [adminId, location]);

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

    mobile: Yup.string().required("Mobile is required"),
    location: Yup.mixed().required("Location is required"),
  });

  const formik = useFormik({
    initialValues: {
      first_name: adminDetails?.first_name || "",
      last_name: adminDetails?.last_name || "",
      email: adminDetails?.email || "",
      gender: adminDetails?.gender?.label || "",
      mobile: adminDetails?.mobile || "",
      location: adminDetails?.profileextra?.location?.id || "",

      // Add other fields as needed
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);

      if (!isLoading) {
        try {
          const data = {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            mobile: values.mobile,
            profileextra: {
              location: values.location.id,
              gender: values.gender?.label,
            },
          };

          console.log("Gender:", values.gender);

          const adminData = await UpdateAdminListById(adminId, data);
          console.log("Admin updated detail is ---", adminData);

          if (adminData) {
            setIsLoading(false);
            if (adminData?.profileextra?.gender) {
              setSelectedOption(adminData?.profileextra?.gender);
            }
            // Update formik values if needed
            formik.setValues({
              ...formik.values,
              first_name: adminData.first_name,
              last_name: adminData.last_name,
              email: adminData.email,
              mobile: adminData.mobile,
              location: adminData.profileextra?.location?.id || "",
              gender: adminData.gender?.label || "",
            });
            toast.success("Admin updated Successfully.");
            close();
            resetForm();
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
  // const formik = useFormik({
  //   initialValues: {
  //     first_name: adminDetails?.first_name || "",
  //     last_name: adminDetails?.last_name || "",
  //     email: adminDetails?.email || "",
  //     gender: adminDetails?.gender?.label || "",
  //     mobile: adminDetails?.mobile || "",
  //     location: adminDetails?.profileextra?.location?.id || "",

  //     // Add other fields as needed
  //   },
  //   validationSchema,
  //   onSubmit: async (values) => {
  //     setIsLoading(true);

  //     if (!isLoading) {
  //       try {
  //         const data = {
  //           // Assuming vendorId is a constant or variable defined earlier
  //           first_name: values.first_name,
  //           last_name: values.last_name,
  //           email: values.email,
  //           mobile: values.mobile,
  //           // profileextra: {
  //           //   location: values.location.id,
  //           // },
  //           location: formik.values.location.id,
  //           gender: values.gender?.label,
  //         };
  //         console.log("Gender:", formik.values.gender);

  //         const adminData = await UpdateAdminListById(adminId, data);
  //         console.log("Admin updated detail is ---", adminData);
  //         if (adminData) {
  //           setIsLoading(false);
  //           setGender(adminData?.gender?.label);
  //           // window.location.reload();
  //           setIsRefetch(!isRefetch);
  //           toast.success(" Admin updated Successfully.");
  //           close();
  //         } else {
  //           console.error("Error while updating Admin:", adminData.error);
  //           setIsLoading(false);
  //         }
  //       } catch (err) {
  //         console.log(err);
  //         err.response.data.email && toast.error(err.response.data.email[0]);
  //         err.response.data.mobile && toast.error(err.response.data.mobile[0]);
  //         setIsLoading(false);
  //       }
  //     }
  //   },
  // });
  console.log("formik", formik.values);

  useEffect(() => {
    formik.setValues({
      first_name: adminDetails?.first_name || "",
      last_name: adminDetails?.last_name || "",
      password: adminDetails?.password || "",
      gender: adminDetails?.profileextra?.gender || "",
      email: adminDetails?.email || "",
      mobile: adminDetails?.mobile || "",
      location: adminDetails?.profileextra?.location?.id || "",

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
            placeholder="First Name"
            className="form-control"
            name="first_name"
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
                maxLength={10}
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
              className="form-select"
              id="gender"
              name="gender"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.gender}
            >
              <option value="" label="Select a gender" />
              {options &&
                options.map((option) => (
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
          
          </div>
        </div>
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
