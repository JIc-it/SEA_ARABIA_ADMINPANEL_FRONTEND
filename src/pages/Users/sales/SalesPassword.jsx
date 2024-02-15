import { Offcanvas } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  UpdateSalesRepListById,
  getSalesRepListById,
} from "../../../services/GuestHandle";
import { useParams } from "react-router-dom";
import { passwordRegex } from "../../../helpers";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment, TextField } from "@mui/material";
function SalesPassword({ show, close }) {
  const theme = useTheme();
  const [isRefetch, setIsRefetch] = useState();
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
  const [isLoading, setIsLoading] = useState(false);
  const salesRepId = useParams()?.salesRepId;
  const [salesRepDetails, setSalesRepDetails] = useState();

  useEffect(() => {
    getSalesRepListById(salesRepId)
      .then((data) => {
        console.log("sales password", data);
        setSalesRepDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });
  }, [salesRepId]);

  const validationSchema = Yup.object({
    currentPassword: Yup.string()
      .min(6, "Password should be at least 6 characters")
      .required("Password is required"),
    newPassword: Yup.string()
      .min(6, "Password should be at least 6 characters")
      .required("newPassword is required"),
    confirmPassword: Yup.string()
      .max(50)
      .required("Confirm Password is required")
      .matches(
        passwordRegex,
        "Password must contain at least 8 characters, at least one uppercase letter, lowercase letter, special character, and number"
      )
      .oneOf([Yup.ref("newPassword")], "Passwords must match"),
  });

  //change
  const [valuesChange, setValuesChange] = useState({
    showPassword: false,
  });

  const handleClickShowPasswordChange = () => {
    setValuesChange({
      ...valuesChange,
      showPassword: !valuesChange.showPassword,
    });
  };

  const handleMouseDownPasswordChange = (event) => {
    event.preventDefault();
  };
  //confirm
  const [valuesConfirm, setValuesConfirm] = useState({
    showPassword: false,
  });

  const handleClickShowPasswordConfirm = () => {
    setValuesConfirm({
      ...valuesConfirm,
      showPassword: !valuesConfirm.showPassword,
    });
  };

  const handleMouseDownPasswordConfirm = (event) => {
    event.preventDefault();
  };
  //current
  const [values, setValues] = useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const formik = useFormik({
    initialValues: {
      currentPassword: salesRepDetails?.currentPassword || "",
      newPassword: salesRepDetails?.newPassword || "",
      confirmPassword: salesRepDetails?.confirmPassword || "",

      // Add other fields as needed
    },

    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      console.log("validation", formik.errors);
      if (!isLoading) {
        try {
          const data = {
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword,
          };

          const salesUpdateData = await UpdateSalesRepListById(
            salesRepId,
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

  useEffect(() => {
    formik.setValues({
      first_name: salesRepDetails?.first_name || "",
      last_name: salesRepDetails?.last_name || "",
      current_password: salesRepDetails?.password || "",
      password: salesRepDetails?.password || "",

      email: salesRepDetails?.email || "",
      mobile: salesRepDetails?.mobile || "",
      location: salesRepDetails?.profileextra?.location || "",

      // defineservice: salesRepDetails?.useridentificationdata?.,
      // Add other fields as needed
    });
  }, [salesRepDetails]);

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
        <Offcanvas.Title style={{ fontWeight: "600" }}>
          Reset Password{" "}
        </Offcanvas.Title>
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
              Current Password <span style={{ color: "red" }}>*</span>
            </label>
            <TextField
              type={values.showPassword ? "text" : "password"}
              name="currentPassword"
              className="form-control"
              placeholder="Password"
              value={formik.values.currentPassword}
              onChange={formik.handleChange} // Use the modified handleChange function
              onBlur={formik.handleBlur}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {formik.touched.currentPassword && formik.errors.currentPassword ? (
              <div className="error">{formik.errors.currentPassword}</div>
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
              New Password <span style={{ color: "red" }}>*</span>
            </label>
            <TextField
              type={valuesChange.showPassword ? "text" : "password"}
              name="newPassword"
              className="form-control"
              placeholder="Password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPasswordChange}
                      onMouseDown={handleMouseDownPasswordChange}
                      edge="end"
                    >
                      {valuesChange.showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <div className="error">{formik.errors.newPassword}</div>
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
            <TextField
              type={valuesConfirm.showPassword ? "text" : "password"}
              name="confirmPassword"
              className="form-control"
              placeholder="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPasswordConfirm}
                      onMouseDown={handleMouseDownPasswordConfirm}
                      edge="end"
                    >
                      {valuesConfirm.showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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

export default SalesPassword;
