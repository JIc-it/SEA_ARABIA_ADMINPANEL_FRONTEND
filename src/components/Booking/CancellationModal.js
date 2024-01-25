import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useFormik } from "formik";
import * as Yup from "yup";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { updateCancellation } from "../../services/booking";

const offcanvasStyle = {
  width: "365px",
  height: "100%",
  display: "flex",
  marginLeft: 18,
  marginTop: 20,
  flexDirection: "column",
};

export default function CancellationModal({ open, setOpen, bookingId }) {
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    refund_details: Yup.string().required("Reason is required"),
  });

  const formik = useFormik({
    initialValues: {
      refund_details: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      if (!isLoading) {
        try {
          const data = {
            cancellation_reason: values.refund_details,
          };

          const resetData = await updateCancellation(bookingId);
          if (resetData) {
            toast.success("Initiated successfully!");
            setOpen(false);
            setIsLoading(false);
            formik.setValues(() => {
              return {
                refund_details: "",
              };
            });
          } else {
            console.error("Error while creating Admin:", resetData.error);
            setIsLoading(false);
          }
          setIsLoading(false);
        } catch (err) {
          console.log(err);
          toast.error(err.response.data.error);
          setIsLoading(false);
        }
      }
      formik.setValues(() => {
        return {
          refund_details: "",
        };
      });
    },
  });

  const handleCloseOffcanvas = () => {
    setOpen(false);
    setIsLoading(false);
    formik.setValues(() => {
      return {
        refund_details: "",
      };
    });
  };
  return (
    <Offcanvas
      show={open}
      onHide={handleCloseOffcanvas}
      placement="end"
      style={{ overflow: "auto" }}
    >
      <Offcanvas.Header
        style={{ borderBottom: "none" }}
        closeButton
        onClick={handleCloseOffcanvas}
      >
        <h4 style={{ marginTop: 5 }}>Cancel Booking</h4>
      </Offcanvas.Header>
      <form onSubmit={formik.handleSubmit}>
        <div style={offcanvasStyle}>
          <div>
            <h5 style={{ marginTop: 10 }}>Reason For Cancellation</h5>
            <textarea
              placeholder="Details"
              name="refund_details"
              className="form-control"
              value={formik.values.refund_details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.refund_details && formik.errors.refund_details ? (
              <div className="error">{formik.errors.refund_details}</div>
            ) : null}
          </div>

          <button
            type="submit"
            className="m-1 btn btn-small"
            style={{
              backgroundColor: "#006875",
              color: "white",
              flex: 1,
              width: "93%",
              bottom: "1rem",
              position: "absolute",
            }}
          >
            {isLoading ? (
              <CircularProgress style={{ width: "20px", height: "20px" }} />
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </form>
    </Offcanvas>
  );
}
