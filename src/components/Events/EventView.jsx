import { Offcanvas } from "react-bootstrap";
import "../../static/css/AddNewLead.css";
import { colors } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Avatars from "../../assets/images/Avatar.png";
import { useNavigate } from "react-router-dom";
import Dropdowns from "../../assets/images/dropdowns.png";

function EventView({ show, close }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .max(20, "Name must be at most 20 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    mobile: Yup.string().required("Mobile is required"),
    location: Yup.string().required("Location is required"),
    idtype: Yup.string().required("ID Type is required"),
    idnumber: Yup.string().required("ID Number is required"),
    companyname: Yup.string()
      .required("Company Name is required")
      .max(20, "Company Name must be at most 20 characters"),
    companyaddress: Yup.string().required("Company Address is required"),
    companyregnumber: Yup.string().required(
      "Company Register Number is required"
    ),
    companywebaddress: Yup.string().required("Company Website is required"),
    defineservice: Yup.string().required("Define Service is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      location: "",
      idtype: "",
      idnumber: "",
      companyname: "",
      companyaddress: "",
      companyregnumber: "",
      companywebaddress: "",
      defineservice: "",
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
    //         window.location.reload();
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

  const [hovereffect, setHoverEffect] = useState(false);

  const handleHoverEffectTrue = () => {
    setHoverEffect(true);
  };
  const handleHoverEffectFalse = () => {
    setHoverEffect(false);
  };

  return (
    <div style={{ height: "100vh" }}>
      <div className="col-12 actions_menu my-2 px-3">
        <div className={isMobileView ? "" : "action_menu_left col-8"}>
          <div className="d-flex flex-column">
            <div>
              <div className="col-12">
                <div className="row row-cards">
                  <div className="breadcrumbs">
                    <p>Users</p>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M8.33301 5L12.7438 9.41074C13.0692 9.73618 13.0692 10.2638 12.7438 10.5893L8.33301 15"
                          stroke="#68727D"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </svg>
                    </span>
                    <p>Vendors</p>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M8.33301 5L12.7438 9.41074C13.0692 9.73618 13.0692 10.2638 12.7438 10.5893L8.33301 15"
                          stroke="#68727D"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </svg>
                    </span>
                    <p>Alex Paul</p>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M8.33301 5L12.7438 9.41074C13.0692 9.73618 13.0692 10.2638 12.7438 10.5893L8.33301 15"
                          stroke="#68727D"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </svg>
                    </span>
                    <p>Add Service</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{ cursor: "pointer" }}
              className="my-2"
              onClick={() => navigate(-1)}
            >
              <svg
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 12H4M4 12L10 6M4 12L10 18"
                  stroke="#252525"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>{" "}
              &nbsp;<span style={{ fontWeight: "800" }}>Back</span>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div
                className={
                  isMobileView ? "d-flex flex-column" : "d-flex flex-row"
                }
              >
                <div
                  className={!isMobileView ? "card mt-2 me-3" : "card mt-2"}
                  style={{
                    width: isMobileView ? "100vw" : "50vw",
                    borderRadius: "8px",
                  }}
                >
                  <div className="p-5">
                    <p style={{ fontWeight: "600" }}>Service Details</p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: isMobileView ? "column" : "row",
                      }}
                    >
                      <div
                        className="mr-2"
                        style={{ width: isMobileView ? "80vw" : "35vw" }}
                      >
                        <div>
                          <label
                            htmlFor=""
                            style={{
                              paddingBottom: "10px",
                              fontWeight: "600",
                              fontSize: "13px",
                            }}
                          >
                            Type <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            className="form-control"
                            name="defineservice"
                            value={formik.values.idtype}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          >
                            <option value="" disabled>
                              Select a Category
                            </option>
                            <option value="service1">Category 1</option>
                            <option value="service2">Category 2</option>
                            {/* Add more options as needed */}
                          </select>
                          {formik.touched.name && formik.errors.name ? (
                            <div className="error">{formik.errors.name}</div>
                          ) : null}
                        </div>
                      </div>
                      <div
                        className={!isMobileView ? "ms-3" : ""}
                        style={{ width: isMobileView ? "80vw" : "35vw" }}
                      >
                        <div className="mt-2">
                          <label
                            htmlFor=""
                            style={{
                              paddingBottom: "10px",
                              fontWeight: "600",
                              fontSize: "13px",
                            }}
                          >
                            Name <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.name && formik.errors.name ? (
                            <div className="error">{formik.errors.name}</div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <label
                        htmlFor=""
                        style={{ paddingBottom: "10px", fontWeight: "500" }}
                      >
                        Short Description
                      </label>
                      {/* <textarea
                        name=""
                        id=""
                        cols=""
                        rows="1"
                        className="form-control"
                        placeholder="Notes"
                      ></textarea> */}
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <div className="error">{formik.errors.name}</div>
                      ) : null}
                    </div>
                    <div className="mt-2">
                      <label
                        htmlFor=""
                        style={{ paddingBottom: "10px", fontWeight: "500" }}
                      >
                        Short Description
                      </label>
                      <textarea
                        name=""
                        id=""
                        cols=""
                        rows="1"
                        className="form-control"
                        placeholder="Notes"
                      ></textarea>
                    </div>
                    <div className="mt-2"></div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: isMobileView ? "column" : "row",
                      }}
                      className="mt-2"
                    >
                      <div
                        className="mr-2"
                        style={{ width: isMobileView ? "80vw" : "35vw" }}
                      >
                        <div>
                          <label
                            htmlFor=""
                            style={{
                              paddingBottom: "10px",
                              fontWeight: "600",
                              fontSize: "13px",
                            }}
                          >
                            Capacity <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="number"
                            name="capacity"
                            className="form-control"
                            placeholder="0"
                            value={formik.values.capacity}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.capacity && formik.errors.capacity ? (
                            <div className="error">
                              {formik.errors.capacity}
                            </div>
                          ) : null}
                        </div>
                        <div className="mt-2">
                          <label
                            htmlFor=""
                            style={{
                              paddingBottom: "10px",
                              fontWeight: "600",
                              fontSize: "13px",
                            }}
                          >
                            Location
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <div style={{ position: "relative" }}>
                            <input
                              type="text"
                              placeholder=""
                              className="form-control"
                              name="pickuppoint"
                              value={formik.values.pickuppoint}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            {formik.touched.pickuppoint &&
                            formik.errors.pickuppoint ? (
                              <div className="error">
                                {formik.errors.pickuppoint}
                              </div>
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
                                stroke-width="1.5"
                              />
                              <ellipse
                                cx="10"
                                cy="8.33398"
                                rx="2.5"
                                ry="2.5"
                                stroke="#68727D"
                                stroke-width="1.5"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div
                        className={!isMobileView ? "ms-3" : ""}
                        style={{ width: isMobileView ? "80vw" : "35vw" }}
                      >
                        <div
                          style={{
                            transform: isMobileView ? "" : "translateY(-60%)",
                          }}
                          className="mt-2"
                        >
                          <label
                            htmlFor=""
                            style={{
                              paddingBottom: "10px",
                              fontWeight: "600",
                              fontSize: "13px",
                            }}
                          >
                            Price <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            className="form-control"
                            name="amenities"
                            value={formik.values.amenities}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          >
                            <option value="" disabled>
                              Select a Amenities
                            </option>
                            <option value="service1">Amenities 1</option>
                            <option value="service2">Amenities 2</option>
                            {/* Add more options as needed */}
                          </select>
                          {formik.touched.amenities &&
                          formik.errors.amenities ? (
                            <div className="error">
                              {formik.errors.amenities}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="card mt-2"
                  style={{
                    width: isMobileView ? "100vw" : "30vw",
                    borderRadius: "8px",
                  }}
                >
                  <div className="p-5">
                    <div className="d-flex justify-content-between align-items-center">
                      <p style={{ fontWeight: "600" }}>Images</p>
                      <button
                        className="btn btn-primary px-1 py-1"
                        style={{ backgroundColor: "#187AF7", fontSize: "14px" }}
                      >
                        Upload
                      </button>
                    </div>
                    <p style={{ fontWeight: "550" }}>Thumbnail</p>

                    <div className="d-flex">
                      <img
                        src="https://images.unsplash.com/photo-1682685797208-c741d58c2eff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        style={{ width: "50%", borderRadius: "8px" }}
                        className="me-3"
                      />
                      <img
                        src="https://images.unsplash.com/photo-1701854711357-ac1374019816?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        style={{ width: "50%", borderRadius: "8px" }}
                      />
                    </div>
                    <hr style={{ borderBottom: "1px solid gray" }}></hr>
                    <div className="d-flex">
                      <div
                        style={{ position: "relative", width: "100%" }}
                        onMouseEnter={handleHoverEffectTrue}
                        onMouseLeave={handleHoverEffectFalse}
                        className="me-3"
                      >
                        <img
                          src="https://images.unsplash.com/photo-1682685797208-c741d58c2eff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          style={{ width: "100%", borderRadius: "8px" }}
                          className="me-3 hover-background"
                          alt="Your Image"
                        />
                        {hovereffect && (
                          <div
                            style={{
                              position: "absolute",
                              bottom: "50px",
                              left: "20px",
                            }}
                          >
                            <button
                              className="btn btn-blue px-1 py-1 me-1"
                              style={{ fontSize: "10px", cursor: "pointer" }}
                            >
                              setThumbnail
                            </button>
                            <button
                              className="btn btn-danger px-1 py-1"
                              style={{ fontSize: "10px", cursor: "pointer" }}
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                      <div
                        style={{ position: "relative", width: "100%" }}
                        onMouseEnter={handleHoverEffectTrue}
                        onMouseLeave={handleHoverEffectFalse}
                      >
                        <img
                          src="https://images.unsplash.com/photo-1701854711357-ac1374019816?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          style={{ width: "100%", borderRadius: "8px" }}
                          className="me-3 hover-background"
                          alt="Your Image"
                        />
                        {hovereffect && (
                          <div
                            style={{
                              position: "absolute",
                              bottom: "50px",
                              left: "20px",
                            }}
                          >
                            <button
                              className="btn btn-blue px-1 py-1 me-1"
                              style={{ fontSize: "10px", cursor: "pointer" }}
                            >
                              setThumbnail
                            </button>
                            <button
                              className="btn btn-danger px-1 py-1"
                              style={{ fontSize: "10px", cursor: "pointer" }}
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="d-flex mt-4">
                      <div
                        style={{ position: "relative", width: "100%" }}
                        onMouseEnter={handleHoverEffectTrue}
                        onMouseLeave={handleHoverEffectFalse}
                        className="me-3"
                      >
                        <img
                          src="https://images.unsplash.com/photo-1682685797208-c741d58c2eff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          style={{ width: "100%", borderRadius: "8px" }}
                          className="me-3 hover-background"
                          alt="Your Image"
                        />
                        {hovereffect && (
                          <div
                            style={{
                              position: "absolute",
                              bottom: "50px",
                              left: "20px",
                            }}
                          >
                            <button
                              className="btn btn-blue px-1 py-1 me-1"
                              style={{ fontSize: "10px", cursor: "pointer" }}
                            >
                              setThumbnail
                            </button>
                            <button
                              className="btn btn-danger  px-1 py-1"
                              style={{ fontSize: "10px", cursor: "pointer" }}
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                      <div
                        style={{ position: "relative", width: "100%" }}
                        onMouseEnter={handleHoverEffectTrue}
                        onMouseLeave={handleHoverEffectFalse}
                      >
                        <img
                          src="https://images.unsplash.com/photo-1701854711357-ac1374019816?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          style={{ width: "100%", borderRadius: "8px" }}
                          className="me-3 hover-background"
                          alt="Your Image"
                        />
                        {hovereffect && (
                          <div
                            style={{
                              position: "absolute",
                              bottom: "50px",
                              left: "20px",
                            }}
                          >
                            <button
                              className="btn btn-blue px-1 py-1 me-1"
                              style={{ fontSize: "10px", cursor: "pointer" }}
                            >
                              setThumbnail
                            </button>
                            <button
                              className="btn btn-danger px-1 py-1"
                              style={{ fontSize: "10px", cursor: "pointer" }}
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={!isMobileView ? "card mt-2 me-3" : "card mt-2"}
                style={{
                  width: isMobileView ? "100vw" : "50vw",
                  borderRadius: "8px",
                }}
              >
                <div className="p-5"></div>
                <div className="col-12 p-5">
                  <p style={{ fontWeight: "600" }}>Pricing</p>
                  <p style={{ fontWeight: "550" }}>Profit Method</p>
                  <div className={isMobileView ? "col-12" : "col-12"}>
                    <div className="mt-2">
                      <label
                        htmlFor=""
                        style={{ paddingBottom: "10px", fontWeight: "500" }}
                      >
                        Cancellation Policy
                      </label>
                      <textarea
                        name=""
                        id=""
                        cols=""
                        rows="1"
                        className="form-control"
                        placeholder="Notes"
                      ></textarea>
                    </div>
                    <div className="mt-2">
                      <label
                        htmlFor=""
                        style={{ paddingBottom: "10px", fontWeight: "500" }}
                      >
                        Return Policy
                      </label>
                      <textarea
                        name=""
                        id=""
                        cols=""
                        rows="1"
                        className="form-control"
                        placeholder="Notes"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={!isMobileView ? "card mt-2 me-3" : "card mt-2"}
                style={{
                  width: isMobileView ? "100vw" : "50vw",
                  borderRadius: "8px",
                }}
              >
                <div className="col-12 p-5">
                  <div className="d-flex justify-content-between align-items-center">
                    <p style={{ fontWeight: "600" }}>Set Status</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: isMobileView ? "column" : "row",
                    }}
                  >
                    <div
                      className="mr-2"
                      style={{ width: isMobileView ? "80vw" : "35vw" }}
                    >
                      <div className="mt-2">
                        <label
                          htmlFor=""
                          style={{
                            paddingBottom: "10px",
                            fontWeight: "600",
                            fontSize: "13px",
                          }}
                        >
                          Status <span style={{ color: "red" }}>*</span>
                        </label>
                       
                      </div>
                    </div>
                    <div
                      className=""
                      style={{ width: isMobileView ? "80vw" : "35vw" }}
                    >
                      <div className="mt-2">
                        <label
                          htmlFor=""
                          style={{
                            paddingBottom: "10px",
                            fontWeight: "600",
                            fontSize: "13px",
                          }}
                        >
                          OwnerShip
                        </label>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                          }}
                        >
                          <div>
                            <input
                              type="checkbox"
                              style={{ width: "15px" }}
                              defaultChecked
                            />
                          </div>
                          <div>
                            <p
                              style={{
                                fontSize: "14px",
                                transform: "translateY(5px)",
                                marginLeft: "5px",
                              }}
                            >
                              Third Party Services
                            </p>
                          </div>
                        </div>
                        {formik.touched.mobile && formik.errors.mobile ? (
                          <div className="error">{formik.errors.mobile}</div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr style={{ borderBottom: "1px solid black" }}></hr>
              <div className="d-flex justify-content-end">
                <button type="reset" className="m-1 btn btn-small btn-white">
                  cancel
                </button>
                <button
                  type="submit"
                  className="m-1 btn btn-small"
                  style={{ backgroundColor: "#006875", color: "white" }}
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventView;
