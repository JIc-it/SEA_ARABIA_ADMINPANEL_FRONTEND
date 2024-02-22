import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../services/EventsPackages"
import { Typography, ButtonGroup, Button } from '@mui/material';
import TextEditor from "./TextEditor"
import UploadPopup from "./UploadModal";
import CircularProgress from "@mui/material/CircularProgress";

function EventAdd({ show, close }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const validationSchema = Yup.object({
    name: Yup.string()
    .trim()
    .required("Name is required")
    .max(20, "Name must be at most 20 characters"),
  description: Yup.string()
    .trim()
    .required("Description is required"),
  short_description: Yup.string()
    .trim()
    .required("Short Description is required")
    .max(50, "Short Description must be at most 50 characters"),
  location: Yup.string()
    .trim()
    .required("Location is required")
    .max(200,"Maximum 200 Characters"),
  cancellation_policy: Yup.string()
    .trim()
    .required("Cancellation Policy is required"),
  refund_policy: Yup.string()
    .trim()
    .required("Refund Policy is required"),
    price: Yup.number().required("Price is required").notOneOf([0], 'Price cannot be zero').min(1, 'Must be greater than zero').max(100000,'Maximum 1 Lakh'),
    capacity: Yup.number().required("Capacity is required").notOneOf([0], 'Capacity cannot be zero').min(1, 'Must be greater than zero').max(10, 'Not greater than 10'),
    image: Yup.mixed()
            .test('fileSize', 'File size is too large', (value) => {
                if (!value) {
                    return false;
                }
                return value.size <= 1 * 1024 * 1024;
            })
            .test('fileType', 'Invalid file format', (value) => {
                if (!value) {
                    return false;
                }
                return /^image\/(jpeg|png|gif)$/i.test(value.type);
            }),
  
  });


  const formik = useFormik({
    initialValues: {
      name: "",
      location: "",
      type: "Package",
      description: "",
      short_description: "",
      capacity: "",
      refund_policy: "",
      cancellation_policy: "",
      price: "",
      image: null,
      imageURL: null,
      is_active: true,

    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);

      if (!isLoading) {
        const formData=new FormData()
        try {

        formData.append("name", values?.name)
        formData.append("type", values?.type)
        formData.append("short_description", values?.short_description)
        formData.append("description", values?.description)
        formData.append("location", values?.location)
        formData.append("capacity", values?.capacity)
        formData.append("cancellation_policy", values?.cancellation_policy)
        formData.append("refund_policy", values?.refund_policy)
        formData.append("price", values?.price)
        formData.append("image", values?.image)
        formData.append("is_active", values?.is_active)

          const adminData = await createEvent(formData);

          if (adminData) {
            setIsLoading(false);
            navigate(-1)
            toast.success("Event Created Successfully")
          } else {
            console.error("Error while creating Admin:", adminData.error);
            setIsLoading(false);
          }
          setIsLoading(false);
        } catch (err) {
          console.log(err);
          toast.error(err.response.data);
          setIsLoading(false);
        }
      }
    },
  });

  return (
    <>
      {!isLoading &&
        <div style={{ height: "100vh" }}>
          <div className="col-12 actions_menu my-2 px-3">
            <div className={isMobileView ? "" : "action_menu_left col-8"}>
              <div className="d-flex flex-column">
                <div>
                  <div className="col-12">
                    <div className="row row-cards">
                      <div className="breadcrumbs">
                        <p style={{ color: "#006875" }}>Events and Packages</p>
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
                        <p style={{ color: "#006875" }}>Add New</p>
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
                              <Typography variant="subtitle1" fontWeight={550} fontSize="14px" marginTop="8px">
                                Type
                              </Typography>
                              <ButtonGroup style={{ border: "1px solid black", marginTop: "5px" }} >
                                <Button
                                  style={{
                                    fontWeight: "500",
                                    fontSize: "15px",
                                    textTransform: "capitalize",
                                    // width: "40%",
                                    backgroundColor: formik.values.type === "Package" ? "black" : "",
                                    color: formik.values.type === "Package" ? "white" : "",
                                    padding: "3px 40px",
                                    // borderRadius: "5px",
                                    textAlign: "center",
                                    // margin: "4px"
                                  }}
                                  onClick={() => formik.setFieldValue("type", "Package")}
                                >
                                  Package
                                </Button>
                                <Button
                                  style={{
                                    fontWeight: "500",
                                    fontSize: "15px",
                                    // width: "40%",
                                    textTransform: "capitalize",
                                    backgroundColor: formik.values.type === "Event" ? "black" : "",
                                    color: formik.values.type === "Event" ? "white" : "",
                                    padding: "3px 40px",
                                    // borderRadius: "5px",
                                    textAlign: "center",
                                    // margin: "4px"
                                  }}
                                  onClick={() => formik.setFieldValue("type", "Event")}
                                >
                                  Event
                                </Button>
                              </ButtonGroup>
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
                            style={{ paddingBottom: "10px", fontWeight: "550" }}
                          >
                            Short Description <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            name="short_description"
                            className="form-control"
                            placeholder="Short Description"
                            value={formik.values.short_description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.short_description && formik.errors.short_description ? (
                            <div className="error">{formik.errors.short_description}</div>
                          ) : null}
                        </div>
                        <div className="mt-2">
                          <label
                            htmlFor=""
                            style={{ paddingBottom: "10px", fontWeight: "550" }}
                          >
                            Description <span style={{ color: "red" }}>*</span>
                          </label>
                          <TextEditor {...formik}/>
                        </div>
                        <br></br>
                        <div className="mt-2"></div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexDirection: isMobileView ? "column" : "row",
                          }}
                          className="mt-5"
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
                                Location &nbsp;
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <div style={{ position: "relative" }}>
                                <input
                                  type="text"
                                  placeholder=""
                                  className="form-control"
                                  name="location"
                                  value={formik.values.location}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                />
                                {formik.touched.location &&
                                  formik.errors.location ? (
                                  <div className="error">
                                    {formik.errors.location}
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
                              <div style={{ position: "relative" }}>
                                <input
                                  type="number"
                                  placeholder="0"
                                  className="form-control"
                                  name="price"
                                  value={formik.values.price}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                />
                                {formik.touched.price &&
                                  formik.errors.price ? (
                                  <div className="error">
                                    {formik.errors.price}
                                  </div>
                                ) : null}
                              </div>
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
                        height: "fit-content"
                      }}
                    >
                      <div className="p-5">
                        <div className="d-flex justify-content-between align-items-center">
                          <p style={{ fontWeight: "600" }}>Image <span style={{ color: "red" }}>*</span> </p>
                          <button
                          type="button"
                            className="btn btn-primary px-1 py-1"
                            style={{ backgroundColor: "#187AF7", fontSize: "14px" }}
                            onClick={() => setOpen(true)}
                          >
                            Upload
                          </button>
                        </div>
                        {open && <UploadPopup open={open} handleClose={handleClose}  image={formik.values.image} imageURL={formik.values.imageURL} formikset={formik.setValues} />}
                        {/* <p style={{ fontWeight: "550" }}>Thumbnail</p> */}

                        {formik.values.imageURL !==null ? <div className="d-flex">
                          <img
                            src={formik.values.imageURL}
                            className="me-3 w-50 h-50 rounded"
                          />

                        </div>:
                        <p style={{textAlign:"center",fontWeight:550}}>Image not found</p>
                        }
{formik.touched.image && formik.errors.image ? (
                                <div className="error">{formik.errors.image}</div>
                              ) : null}
                      </div>
                    </div>
                  </div>
                  {/* test */}
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
                      <div className="col-12 p-5">
                        <p style={{ fontWeight: "600" }}>Policy</p>
                        {/* <p style={{ fontWeight: "550" }}>Profit Method</p> */}
                        <div className={isMobileView ? "col-12" : "col-12"}>
                          <div className="mt-2">
                            <label
                              htmlFor=""
                              style={{ paddingBottom: "10px", fontWeight: "550" }}
                            >
                              Cancellation Policy <span style={{ color: "red" }}>*</span>
                            </label>
                            <textarea
                              name="cancellation_policy"
                              id=""
                              cols=""
                              rows="1"
                              className="form-control"
                              placeholder="Cancellation Policy"
                              value={formik.values.cancellation_policy}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            {formik.touched.cancellation_policy &&
                              formik.errors.cancellation_policy ? (
                              <div className="error">
                                {formik.errors.cancellation_policy}
                              </div>
                            ) : null}
                          </div>
                          <div className="mt-2">
                            <label
                              htmlFor=""
                              style={{ paddingBottom: "10px", fontWeight: "550" }}
                            >
                              Return Policy <span style={{ color: "red" }}>*</span>
                            </label>
                            <textarea
                              name="refund_policy"
                              id=""
                              cols=""
                              rows="1"
                              className="form-control"
                              placeholder="Refund Policy"
                              value={formik.values.refund_policy}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            {formik.touched.refund_policy &&
                              formik.errors.refund_policy ? (
                              <div className="error">
                                {formik.errors.refund_policy}
                              </div>
                            ) : null}
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
                    <div style={{ backgroundColor: "#FFFF", borderRadius: "5px" }} className="mt-4 w-100 p-2">
                      <p className="p-2 mt-2" style={{ fontWeight: "700" }}>Set Status</p>
                      <div className='d-flex justify-content-between align-items-center mx-2'>
                        <p style={{ fontWeight: "550" }}>Status</p>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div style={{ fontSize: "12px" }}>{formik.values.is_active === true ? "Active" : "Inactive"}</div>
                          <label class="switch" style={{ marginLeft: "5px" }}>
                            <input type="checkbox" name="is_active" checked={formik.values.is_active} value={formik.values.is_active} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            <span class="slider round"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr style={{ borderBottom: "1px solid black" }}></hr>
                  <div className="d-flex justify-content-end mb-3">
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
      }
      {isLoading &&
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
          <CircularProgress />
        </div>
      }
    </>
  );
}

export default EventAdd;
