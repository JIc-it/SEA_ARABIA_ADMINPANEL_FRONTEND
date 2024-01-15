import { Offcanvas } from "react-bootstrap";
import "../../static/css/AddNewLead.css";
import { colors } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { createVenderLead } from "../../services/leadMangement";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { getLocation } from "../../services/CustomerHandle";
import CountryDropdown from "../SharedComponents/CountryDropDown";

function AddNewLead({ show, close, setIsRefetch, isRefetch }) {
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState();

  useEffect(() => {
    getLocation()
      .then((data) => {
        console.log("location is==", data);
        setLocation(data);
      })
      .catch((error) => {
        // toast.error(error.message);
        console.log("error while fetching location", error);
      });
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
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
      .required("Email is required"),
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
      name: "",
      email: "",
      mobile: "",
      location: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);

      if (!isLoading) {
        try {
          const data = {
            first_name: values.name,
            last_name: "",
            role: "Vendor",
            email: values.email,
            mobile: `+965 ${values.mobile}`,
            location: values.location?.id,
          };

          const adminData = await createVenderLead(data);

          if (adminData) {
            // window.location.reload();
            setIsRefetch(!isRefetch);
            toast.success("Vendor Added Successfully.");
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
  console.log(formik.errors);
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
        <Offcanvas.Title>New Vendor Lead</Offcanvas.Title>
      </Offcanvas.Header>
      <form onSubmit={formik.handleSubmit} style={{ padding: "1rem" }}>
        <div>
          <label
            htmlFor=""
            style={{ paddingBottom: "10px", fontWeight: "500" }}
          >
            Name <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            placeholder="Name"
            className="form-control"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            maxLength={20}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </div>
        <div>
          <label
            htmlFor=""
            style={{ paddingBottom: "10px", fontWeight: "500" }}
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
            maxLength={50}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>
        <div>
          <label
            htmlFor=""
            style={{ paddingBottom: "10px", fontWeight: "500" }}
          >
            Phone <span style={{ color: "red" }}>*</span>
          </label>
          <div className="col-12" style={{ display: "flex" }}>
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
        <div>
          <label
            htmlFor=""
            style={{ paddingBottom: "10px", fontWeight: "500" }}
          >
            Location <span style={{ color: "red" }}>*</span>
          </label>
     
          <CountryDropdown gccCountries={location} formik={formik} />
        </div>
        <button
          className="btn btn-success"
          type="submit"
          style={{
            flex: 1,
            backgroundColor: "#006875",
            width: "92%",
            position: "absolute",
            bottom: "1rem",
          }}
        >
          {isLoading ? <CircularProgress /> : "Add"}
        </button>
      </form>
    </Offcanvas>
  );
}

export default AddNewLead;
