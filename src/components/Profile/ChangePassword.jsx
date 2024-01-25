import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import {ProfileChangePassword} from "../../services/Profile"
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

export default function ChangePasword({
  open,
  setOpen,
  userid
  }) {
  const [isLoading, setIsLoading] = useState(false);


  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

  const validationSchema = Yup.object({
    currentpassword:Yup.string()
    .required("Current Password is required")
    .matches(
      passwordRegex,
      "Password must contain at least 8 characters, at least one uppercase letter, lowercase letter, special character, and number"
    ),
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
      currentpassword:"",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      if (!isLoading) {
        try {
          const data = {
            current_password:values.currentpassword,
            new_password: values.password,
            confirm_password: values.confirmPassword,
          };

          const resetData = await ProfileChangePassword(data);
          if (resetData) {
            toast.success("Password Changed successfully!");
            setOpen(false);
            setIsLoading(false);
            formik.setValues(()=>{
               return {
                currentpassword:"",
                password: "",
                confirmPassword: "",
               }
              
            })
          } else {
            console.error("Error while creating Admin:", resetData.error);
            toast.error(resetData.error.message)
            setIsLoading(false);
          }
          setIsLoading(false);
        } catch (err) {
            toast.error(err.message)
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
        
        closeButton
        onClick={handleCloseOffcanvas}
      >
        <Offcanvas.Title>Change Password</Offcanvas.Title>
      </Offcanvas.Header>
      <form onSubmit={formik.handleSubmit}>
        <div style={offcanvasStyle}>
        <div style={{ marginTop: 10 }}>
            <input
              type="text"
              placeholder="Current Password"
              name="currentpassword"
              className="form-control"
              value={formik.values.currentpassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.currentpassword && formik.errors.currentpassword ? (
              <div className="error">{formik.errors.currentpassword}</div>
            ) : null}
          </div>
          <div style={{ marginTop: 10 }}>
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
          <div style={{ marginTop: 10 }}>
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
