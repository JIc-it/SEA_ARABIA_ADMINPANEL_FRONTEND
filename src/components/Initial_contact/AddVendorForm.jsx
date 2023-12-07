import React, { useContext, useEffect } from "react";
import "../../static/css/add_vendor_details.css";
import { useState } from "react";
import AddServiceModal from "../Modal/AddServiceModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getVendorServiceTag } from "../../services/leadMangement";
import { OnboardContext } from "../../Context/OnboardContext";

const AddVendorInfo = () => {
  const params = useParams();
  const vendorId = params.id;
  const navigate = useNavigate();


//  const vendorId=OnboardContextData.vendorId
  const [showCanvas, setOffcanvas] = useState(false);
  const handleOpenOffcanvas = () => setOffcanvas(true);
  const [serviceTagList, setServiceTagList] = useState();
  const handleCloseOffcanvas = () => setOffcanvas(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    getVendorServiceTag()
      .then((data) => {
        setServiceTagList(data.results);
      })
      .catch((error) => {
        console.error("Error fetching  data:", error);
      });
  }, []);

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    phone: Yup.string().required("Phone is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    location: Yup.string().required("Location is required"),
    idType: Yup.string().required("ID Type is required"),
    idNumber: Yup.string().required("ID Number is required"),
    companyName: Yup.string().required("Company Name is required"),
    companyAddress: Yup.string().required("Company Address is required"),
    companyRegistrationNumber: Yup.string().required(
      "Company Registration Number is required"
    ),
    companyWebsite: Yup.string()
      .url("Invalid URL")
      .required("Company Website is required"),
    defineServices: Yup.array()
      .min(1, "At least one service must be selected") // Adjust the minimum number of selected services as needed
      .required("Define Services is required"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      phone: "",
      email: "",
      location: "",
      idType: "",
      idNumber: "",
      companyName: "",
      companyAddress: "",
      companyRegistrationNumber: "",
      companyWebsite: "",
      defineServices: [],
      thirdPartyService: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      navigate(`/onboard/${vendorId}`);
      // Handle form submission
      console.log(values);
    },
  });

  return (
    <div class="page-wrapper">
      {/* <AddServiceModal show={showCanvas} close={handleCloseOffcanvas} /> */}
      <form
        className="card"
        style={{ border: "0px" }}
        onSubmit={formik.handleSubmit}
      >
        <div class="page-body">
          <div class="container-xl">
            <div
              className="card col-lg-12 add_details"
              style={{ borderRadius: "10px", border: "0px" }}
            >
              <div className="card-body">
                <div className="col-lg-12">
                  <div className="row row-cards">
                    <div className="col-12">
                      <form className="card" style={{ border: "0px" }}>
                        <div className="card-body">
                          <h3 className="card-title">Personal Details</h3>
                          <div className="row row-cards">
                            <div className="col-sm-6 ">
                              <div className="mb-3">
                                <label className="form-label">Full Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Full Name"
                                  name="fullName"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.fullName}
                                />
                                {formik.touched.fullName &&
                                formik.errors.fullName ? (
                                  <div className="error">
                                    {formik.errors.fullName}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                            <div className="col-sm-6 ">
                              <div className="mb-3">
                                <label className="form-label">Phone</label>
                                <div style={{ display: "flex" }}>
                                  <div className="col-2">
                                    <input
                                      type="text"
                                      value="+965"
                                      className="form-control"
                                    />
                                  </div>
                                  <div className="col-10">
                                    <input
                                      type="number"
                                      className="form-control"
                                      placeholder="Phone Number"
                                      name="phone"
                                      onChange={(e) => {
                                        const inputValue = e.target.value;
                                        if (inputValue.length <= 10) {
                                          const sanitizedValue =
                                            inputValue.replace(/\D/g, ""); // Remove non-digit characters
                                          formik.handleChange("phone")(
                                            sanitizedValue
                                          ); // Update the formik field
                                        }
                                      }}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.phone}
                                    />
                                  </div>
                                </div>
                                {formik.touched.phone && formik.errors.phone ? (
                                  <div className="error">
                                    {formik.errors.phone}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="row row-cards">
                            <div className="col-sm-6 ">
                              <div className="mb-3">
                                <label className="form-label">
                                  Email address
                                </label>
                                <input
                                  type="email"
                                  className="form-control"
                                  placeholder="Email"
                                  name="email"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.email}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                  <div className="error">
                                    {formik.errors.email}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                            <div className="col-sm-6 ">
                              <div className="mb-3">
                                <label className="form-label">Location</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Location"
                                  name="location"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.location}
                                />
                                {formik.touched.location &&
                                formik.errors.location ? (
                                  <div className="error">
                                    {formik.errors.location}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="row row-cards">
                            <div className="col-sm-6 ">
                              <div className="mb-3">
                                <label className="form-label">ID Type</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="ID Type"
                                  name="idType"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.idType}
                                />
                                {formik.touched.idType &&
                                formik.errors.idType ? (
                                  <div className="error">
                                    {formik.errors.idType}
                                  </div>
                                ) : null}
                              </div>
                            </div>

                            <div className="col-sm-6 ">
                              <div className="mb-3">
                                <label className="form-label">ID Number</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="ID Number"
                                  name="idNumber"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.idNumber}
                                />
                                {formik.touched.idNumber &&
                                formik.errors.idNumber ? (
                                  <div className="error">
                                    {formik.errors.idNumber}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ margin: "20px" }}>
            <div
              className="card col-lg-12 add_details"
              style={{ borderRadius: "10px", border: "0px" }}
            >
              <div className="card-body">
                <div className="col-lg-12">
                  <div className="row row-cards">
                    <div className="col-12">
                      <form className="card" style={{ border: "0px" }}>
                        <div className="card-body">
                          <h3 className="card-title">Company Details</h3>
                          <div className="row row-cards">
                            <div className="col-sm-6 ">
                              <div className="mb-3">
                                <label className="form-label">
                                  Company Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Company Name"
                                  name="companyName"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.companyName}
                                />
                                {formik.touched.companyName &&
                                formik.errors.companyName ? (
                                  <div className="error">
                                    {formik.errors.companyName}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                            <div className="col-sm-6 ">
                              <div className="mb-3">
                                <label className="form-label">
                                  Company Address
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Company Address"
                                  name="companyAddress"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.companyAddress}
                                />
                                {formik.touched.companyAddress &&
                                formik.errors.companyAddress ? (
                                  <div className="error">
                                    {formik.errors.companyAddress}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="row row-cards">
                            <div className="col-sm-6 ">
                              <div className="mb-3">
                                <label className="form-label">
                                  Company Registration Number
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Company Registration Number"
                                  name="companyRegistrationNumber"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={
                                    formik.values.companyRegistrationNumber
                                  }
                                />
                                {formik.touched.companyRegistrationNumber &&
                                formik.errors.companyRegistrationNumber ? (
                                  <div className="error">
                                    {formik.errors.companyRegistrationNumber}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                            <div className="col-sm-6 ">
                              <div className="mb-3">
                                <label className="form-label">
                                  Company Website
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Company Website"
                                  name="companyWebsite"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.companyWebsite}
                                />
                                {formik.touched.companyWebsite &&
                                formik.errors.companyWebsite ? (
                                  <div className="error">
                                    {formik.errors.companyWebsite}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ margin: "20px" }}>
            <div
              className="card col-lg-12 add_details"
              style={{ borderRadius: "10px", border: "0px" }}
            >
              <div className="card-body">
                <div className="col-lg-12">
                  <div className="row row-cards">
                    <div className="col-12">
                      <form className="card" style={{ border: "10px" }}>
                        <div className="card-body">
                          <div className="content_header">
                            <h3 className="card-title">Service Details</h3>
                          </div>
                          <div className="initial-contact-services">
                            <div className="row">
                              <div className="col-md-5">
                                <div className="">
                                  <label className="form-label">
                                    Define Services
                                  </label>
                                  <Autocomplete
                                    multiple
                                    size="small"
                                    id="multiple-limit-tags"
                                    options={serviceTagList || []}
                                    name="defineServices"
                                    getOptionLabel={(option) =>
                                      `${option.name} `
                                    }
                                    value={formik.values.defineServices} // set the value prop
                                    onChange={(event, newValue) => {
                                      formik.setFieldValue(
                                        "defineServices",
                                        newValue
                                      ); // use setFieldValue to update the field
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        placeholder="Services"
                                        size="small"
                                      />
                                    )}
                                  />
                                  {formik.touched.defineServices &&
                                  formik.errors.defineServices ? (
                                    <div className="error">
                                      {formik.errors.defineServices}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                              <div className="col-md-7 ">
                                <span style={{ fontSize: "16px" }}>
                                  Ownership
                                </span>

                                <div className="ownership my-2">
                                  <input
                                    type="checkbox"
                                    name="thirdPartyService"
                                    id="thirdPartyService"
                                    className="form-check-input"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    checked={formik.values.thirdPartyService}
                                  />
                                  <label
                                    htmlFor="thirdPartyServices"
                                    className="mx-2"
                                  >
                                    Third Party Services
                                  </label>
                                </div>
                                {formik.touched.thirdPartyService &&
                                formik.errors.thirdPartyService ? (
                                  <div className="error">
                                    {formik.errors.thirdPartyService}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />

            <div className="action_buttons">
              <Link className="btn button_cancel" to={`/onboard/${vendorId}`}>
                Cancel
              </Link>
              <button
                className="btn button_continue"
                style={{ backgroundColor: "#006875" }}
                type="submit"
                // disabled={formik.isSubmitting || !formik.isValid}
              >
                Continue
              </button>

              {/* <Link
                className="btn button_continue"
                style={{ backgroundColor: "#006875" }}
                to={"/onboard"}
              >
                Continue
              </Link> */}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddVendorInfo;
