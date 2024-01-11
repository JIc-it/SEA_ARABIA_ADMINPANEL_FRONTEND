import { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import CopyWrite from "../components/CopyWrite";
import { passwordRegex } from "../helpers";
import LoginImageContainer from "../components/LoginImageContainer";
import { useNavigate } from "react-router";
import { loginRequest } from "../services/authHandle";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [capsLockOn, setCapsLockOn] = useState(false);

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

  // const [loginDetails, setLoginDetails] = useState();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string()
        .max(50)
        .required("Password is required")
        // .matches(
        //   passwordRegex,
        //   "Password must contain at least 8 characters, at least one uppercase letter, lowercase letter, special character, and number"
        // ),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const data = {
          email: values.email,
          password: values.password,
        };
        const { access, refresh, role } = await loginRequest(data);
        if (access) {
          localStorage.setItem("access_token", access);
          localStorage.setItem("refresh_token", refresh);
          localStorage.setItem("role", role);
          navigate(`/dashboard`);
          console.log("sucess");
        } else {
          toast.error("Login error");
        }
      } catch (err) {
        console.log(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  // const handleSkip = useCallback(() => {
  //   auth.skip();
  //   router.push("/");
  // }, [auth, router]);

  return (
    <div
      className="contaier-fluid"
      style={{ overflowX: "hidden" }}
    >
      <div className="row">
        <LoginImageContainer />

        <div className="col-md-6 p-0 ">
          <Box
            sx={{
              backgroundColor: "background.paper",
              overflow: "hidden",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Box
              sx={{
                maxWidth: 550,
                px: 3,
                paddingBottom: "100px",
                paddingTop: "10rem",
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
                <Stack sx={{ mb: 3 }}>
                  <Typography variant="h6">Sign In with your Email</Typography>
                </Stack>

                <form
                  noValidate
                  onSubmit={formik.handleSubmit}
                  autocomplete="off"
                >
                  <Stack spacing={2}>
                    <Typography variant="span">Email Address</Typography>
                    <TextField
                      autocomplete="off"
                      size="small"
                      error={!!(formik.touched.email && formik.errors.email)}
                      fullWidth
                      helperText={formik.touched.email && formik.errors.email}
                      name="email"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="email"
                      maxLength={35}
                      value={formik.values.email}
                      placeholder="Email"
                      inputProps={{
                        autocomplete: "email",
                        form: {
                          autocomplete: "off",
                        },
                      }}
                    />
                    <Typography variant="span">Password</Typography>
                    <TextField
                      autocomplete="off"
                      size="small"
                      error={
                        !!(formik.touched.password && formik.errors.password)
                      }
                      fullWidth
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                      placeholder="Password"
                      name="password"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type={"password"}
                      value={formik.values.password}
                      // InputProps={{
                      //   autocomplete: "new-password",
                      //   form: {
                      //     autocomplete: "off",
                      //   },
                      //   endAdornment: (
                      //     <InputAdornment position="end">
                      //       <IconButton onClick={togglePasswordVisibility} edge="end">
                      //         {showPassword ? (
                      //           <svg
                      //             xmlns="http://www.w3.org/2000/svg"
                      //             width="24"
                      //             height="24"
                      //             viewBox="0 0 24 24"
                      //             fill="none"
                      //           >
                      //             <path
                      //               d="M9.9 4.24002C10.5883 4.0789 11.2931 3.99836 12 4.00003C19 4.00003 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.4811 9.80385 14.1962C9.51897 13.9113 9.29439 13.572 9.14351 13.1984C8.99262 12.8249 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2219 9.18488 10.8539C9.34884 10.4859 9.58525 10.1547 9.88 9.88003M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65663 6.06 6.06003L17.94 17.94Z"
                      //               stroke="#243757"
                      //               stroke-width="2"
                      //               stroke-linecap="round"
                      //               stroke-linejoin="round"
                      //             />
                      //             <path
                      //               d="M1 1L23 23"
                      //               stroke="#243757"
                      //               stroke-width="2"
                      //               stroke-linecap="round"
                      //               stroke-linejoin="round"
                      //             />
                      //           </svg>
                      //         ) : (
                      //           <svg
                      //             xmlns="http://www.w3.org/2000/svg"
                      //             width="24"
                      //             height="24"
                      //             viewBox="0 0 24 24"
                      //             fill="none"
                      //           >
                      //             <path
                      //               d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                      //               stroke="#243757"
                      //               stroke-width="2"
                      //               stroke-linecap="round"
                      //               stroke-linejoin="round"
                      //             />
                      //             <path
                      //               d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                      //               stroke="#243757"
                      //               stroke-width="2"
                      //               stroke-linecap="round"
                      //               stroke-linejoin="round"
                      //             />
                      //           </svg>
                      //         )}
                      //       </IconButton>
                      //     </InputAdornment>
                      //   ),
                      // }}
                      inputProps={{ maxLength: 50 }}
                      // onKeyPress={(e) => {
                      //   if (e.getModifierState("CapsLock")) {
                      //     setCapsLockOn(true);
                      //   } else {
                      //     setCapsLockOn(false);
                      //   }
                      // }}
                    />
                  </Stack>

                  {formik.errors.submit && (
                    <Typography color="error" sx={{ mt: 3 }} variant="body2">
                      {/* {formik.errors.submit} */}
                      Login Failed.
                    </Typography>
                  )}
                  <Button
                    fullWidth
                    size="large"
                    sx={{ mt: 3 }}
                    type="submit"
                    variant="contained"
                    style={{
                      borderRadius: " var(--roundness-round-inside, 6px)",
                      background: "#006875",

                      boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.04)",
                      textTransform: "none",
                    }}
                  >
                    Sign In
                  </Button>
                  <br />
                  {/* {capsLockOn && (
                    <Typography
                      color="rgb(33, 118, 255)"
                      sx={{ mt: 1, fontSize: "13px" }}
                      variant="body2"
                    >
                      Caps Lock is ON
                    </Typography>
                  )} */}
                  {/* <span style={{ fontSize: "12px", color: "red" }}>
                    {loginDetails &&
                      loginDetails.status != 200 &&
                      loginDetails.data &&
                      loginDetails.data.detail}
                  </span> */}

                  <Typography
                    color="text.secondary"
                    variant="body2"
                    sx={{ paddingTop: "5px", textAlign: "end" }}
                  >
                    <Link
                      // component={NextLink}
                      href="/email-verification"
                      underline="hover"
                      variant="subtitle2"
                      style={{ color: "#187AF7" }}
                    >
                      Forgot password?
                    </Link>
                  </Typography>
                </form>
              </div>
            </Box>
          </Box>

          <div className="copy-write-container">
            <CopyWrite />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
