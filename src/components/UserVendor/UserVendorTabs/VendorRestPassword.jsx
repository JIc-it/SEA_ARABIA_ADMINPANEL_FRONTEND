import React, { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { handleChangePassword } from "../../../services/commonServices"
import { useFormik } from "formik";
import * as Yup from "yup";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";

const offcanvasStyle = {
  width: "365px",
  height: "100%",
  display: "flex",
  marginLeft: 18,
  marginTop: 20,
  flexDirection: "column",
};

export default function VendorResetPassword({
  open,
  setOpen,
  userid
  }) {
  const [isLoading, setIsLoading] = useState(false);


  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Password must contain at least 8 characters, at least one uppercase letter, lowercase letter, special character, and number"
      ),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      if (!isLoading) {
        try {
          const data = {
            user_id:userid,
            new_password: values.password,
            confirm_password: values.confirmPassword,
          };

          const resetData = await handleChangePassword(data);
          if (resetData) {
            toast.success("Reset password successfully!");
            setOpen(false);
            setIsLoading(false);
            formik.setValues(()=>{
              
               return {
                password: "",
                confirmPassword: "",
               }
              
            })
          } else {
            console.error("Error while creating Admin:", resetData.error);
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

  const handleCloseOffcanvas = () => {
    setOpen(false);
    setIsLoading(false);
  };

  

 

  return (
    <Offcanvas
      show={open}
      onHide={handleCloseOffcanvas}
      placement="end"
      style={{ overflow: "auto" }}
    >
      <Offcanvas.Header
        style={{ marginLeft: 345 }}
        closeButton
        onClick={handleCloseOffcanvas}
      >
      </Offcanvas.Header>
      <form onSubmit={formik.handleSubmit}>
        <div style={offcanvasStyle}>
          <h5 style={{ marginTop: 10 }}>Reset Password</h5>
          <div style={{ marginTop: 7 }}>
            <input
              type="text"
              placeholder="New Password"
              name="password"
              className="form-control"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div>
          <div style={{ marginTop: 7 }}>
            <input
              type="text"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="form-control "
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="error">{formik.errors.confirmPassword}</div>
            ) : null}
          </div>
          <button
            type="submit"
            className='m-1 btn btn-small'
            style={{
              backgroundColor: "#006875", color: "white",
              flex: 1,
              width: "93%",
              bottom: "1rem",
              position: "absolute",
            }}
          >
            {isLoading? <CircularProgress style={{width:"20px",height:"20px"}} /> :"Confirm"}
          </button>
        </div>
      </form>
    </Offcanvas>
  );
}
