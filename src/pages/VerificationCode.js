import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  
  Box,
  Button,
  
  Link,
  Stack,
  
  TextField,
  Typography,
  
} from "@mui/material";
import CopyWrite from "../components/CopyWrite";

import LoginImageContainer from "../components/LoginImageContainer";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate, useParams } from "react-router";
import { getOTPFromEmail, verifyOTP } from "../services/authHandle";
import { toast } from "react-toastify";

const VerificationCode = () => {
  const params = useParams();
  const verificationEmail = params?.id;
  const userID = params?.userId;

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      verificationCode: "",
      submit: null,
    },
    validationSchema: Yup.object({
      verificationCode: Yup.string()
        .max(255)
        .required("Verification Code is required."),
    }),
    onSubmit: async (values, helpers) => {
      if (!isLoading) {
        setIsLoading(true);

        verifyOTP({ otp: values.verificationCode, user_id: userID })
          .then((data) => {
            navigate(`/resetpassword/${userID}`);
            // setIsLoading(false);
          })
          .catch((error) => {
            helpers.setStatus({ success: false });
            helpers.setErrors({ submit: error.response.data?.detail }); // Set the error message in formik
            helpers.setSubmitting(false);
            console.error("Error fetching lead data:", error);
          });

        setIsLoading(false);
      }
    },
  });

  const handleResendEmail = async () => {
    getOTPFromEmail(verificationEmail)
      .then((data) => {})
      .catch((error) => {
        toast.error(error.response.data?.detail);
        console.error("Error fetching lead data:", error);
      });
  };

  // useEffect(() => {
  //   const handleCapsLock = (event) => {
  //     if (event.target.name === "password") {
  //       const isCapsLockOn = event.getModifierState("CapsLock");
  //       setCapsLockOn(isCapsLockOn);
  //     }
  //   };

  //   window.addEventListener("keydown", handleCapsLock);

  //   return () => {
  //     window.removeEventListener("keydown", handleCapsLock);
  //   };
  // }, []);

  // const togglePasswordVisibility = () => {
  //   setShowPassword((prevShowPassword) => !prevShowPassword);
  // };

  const [loginDetails, setLoginDetails] = useState();

  return (
    <div className="contaier-fluid" style={{ overflowX: "hidden" }}>
      <div className="row">
        <LoginImageContainer />

        <div className="col-md-6 p-0 ">
          <Box
            sx={{
              flex: "1 1 auto",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              background: "#fff",
            }}
          >
            <Box
              sx={{
                maxWidth: 550,
                px: 3,
                py: "100px",
                width: "100%",
              }}
            >
              <div
                style={{
                  borderRadius: "12px",
                  borderTop: " 1px solid var(--stroke-light-base, #EAEBF0)",
                  borderRight: "1px solid var(--stroke-light-base, #EAEBF0)",
                  borderBottom: "1px solid var(--stroke-light-base, #EAEBF0)",
                  borderLeft: "1px solid var(--stroke-light-base, #EAEBF0)",
                  background: " var(--background-light-base-main, #FFF)",
                  boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.04)",
                  padding: "2rem",
                }}
              >
                {/* <span >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                    style={{ width: "30px", cursor: "pointer" }}
                    onClick={() => {}}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                    />
                  </svg>
                  <span
                    style={{ position: "relative", bottom: "9px", left: "5px" }}
                  >
                    Back
                  </span>
                </span> */}

                <Stack spacing={1} sx={{ mb: 1 }}>
                  <Typography variant="h5">Forgot Password</Typography>
                </Stack>
                <Stack spacing={1} sx={{ mb: 1 }}>
                  <h6 style={{ fontSize: "14px", fontWeight: "400" }}>
                    {" "}
                    The verification code has been sent to {""}
                    <span style={{ color: "#2176FF" }}>
                      {verificationEmail}
                    </span>
                  </h6>
                </Stack>
                <Stack spacing={1} sx={{ mb: 2 }}>
                  <div style={{ display: "flex" }}>
                    <Link
                      href="/email-verification"
                      underline="hover"
                      variant="subtitle2"
                    >
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "400",
                          marginRight: "10px",
                          color: "#2176FF",
                        }}
                      >
                        Change Email
                      </span>
                    </Link>
                    <Link
                      href=""
                      underline="hover"
                      variant="subtitle2"
                      onClick={handleResendEmail}
                    >
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "400",
                          color: "#2176FF",
                        }}
                      >
                        Resend Email
                      </span>
                    </Link>
                  </div>
                </Stack>
                <form noValidate onSubmit={formik.handleSubmit}>
                  <Stack spacing={1}>
                    <Typography variant="span">Verification Code</Typography>
                    <TextField
                      size="small"
                      error={
                        !!(
                          formik.touched.verificationCode &&
                          formik.errors.verificationCode
                        )
                      }
                      fullWidth
                      helperText={
                        formik.touched.verificationCode &&
                        formik.errors.verificationCode
                      }
                      placeholder="Verification Code"
                      name="verificationCode"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.verificationCode}
                    />
                  </Stack>
                  {formik.errors.submit && (
                    <Typography color="error" sx={{ mt: 3 }} variant="body2">
                      {formik.errors.submit}
                    </Typography>
                  )}
                  <Button
                    fullWidth
                    size="small"
                    style={{
                      borderRadius: " var(--roundness-round-inside, 6px)",
                      background: "#006875",
                      marginTop: "1rem",
                      boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.04)",
                      textTransform: "none",
                    }}
                    type="submit"
                    variant="contained"
                  >
                    {isLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      <span style={{ textTransform: "none" }}>Verify</span>
                    )}
                  </Button>
                </form>
              </div>
            </Box>
            <CopyWrite />
          </Box>

          <div className="copy-write-container">
            <CopyWrite />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationCode;
