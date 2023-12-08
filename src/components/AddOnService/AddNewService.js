import { Offcanvas } from "react-bootstrap";
import "../../static/css/AddNewLead.css";
import { colors } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { toast } from "react-toastify";

function AddNewService({ show, close, setIsRefetch, isRefetch }) {
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .max(20, "Name must be at most 20 characters"),
      description: Yup.string()
      .required("Description is required"),
      availability : Yup.string()
      .required("Availability is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      availability: "",
    },
    validationSchema,
    // onSubmit: async (values) => {
    //   setIsLoading(true);

    //   if (!isLoading) {
    //     try {
    //       const data = {
    //         first_name: values.name,
    //         last_name: "",
    //         role: "Vendor",
    //         email: values.email,
    //         mobile: `+965 ${values.mobile}`,
    //         location: values.location,
    //       };

    //       const adminData = await createVenderLead(data);

    //       if (adminData) {
    //         setIsLoading(false);
    //         setIsRefetch(!isRefetch);
    //         toast.success("Vendor Added Successfully.");
    //         close();
    //       } else {
    //         console.error("Error while creating Admin:", adminData.error);
    //         setIsLoading(false);
    //       }
    //       setIsLoading(false);
    //     } catch (err) {
    //       console.log(err);
    //       err.response.data.email && toast.error(err.response.data.email[0]);
    //       err.response.data.mobile && toast.error(err.response.data.mobile[0]);
    //       setIsLoading(false);
    //     }
    //   }
    // },
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
        <Offcanvas.Title>New Add On Service</Offcanvas.Title>
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
            Description <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="description "
            name="description"
            className="form-control"
            placeholder="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="error">{formik.errors.description}</div>
          ) : null}
        </div>
        <div>
          <label
            htmlFor=""
            style={{ paddingBottom: "10px", fontWeight: "500" }}
          >
            Availability <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="availability"
            name="availability"
            className="form-control"
            placeholder="Availability"
            value={formik.values.availability}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.availability && formik.errors.availability ? (
            <div className="error">{formik.errors.availability}</div>
          ) : null}
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
          Add
        </button>
      </form>
    </Offcanvas>
  );
}

export default AddNewService;
