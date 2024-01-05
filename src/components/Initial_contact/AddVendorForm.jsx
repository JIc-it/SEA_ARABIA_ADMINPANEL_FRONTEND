import React, { useContext, useEffect } from "react";
import "../../static/css/add_vendor_details.css";
import { useState } from "react";
import AddServiceModal from "../Modal/AddServiceModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getUserIdType,
  getVendorListById,
  getVendorServiceTag,
} from "../../services/leadMangement";
import { OnboardContext } from "../../Context/OnboardContext";
import { getLocation } from "../../services/CustomerHandle";

const AddVendorInfo = ({ formik, locationList }) => {
  const vendorId = useParams()?.id;

  console.log(formik.values.phone, "formik.values.phone");
  //  const vendorId=OnboardContextData.vendorId
  const [showCanvas, setOffcanvas] = useState(false);
  const handleOpenOffcanvas = () => setOffcanvas(true);
  const [serviceTagList, setServiceTagList] = useState();
  const handleCloseOffcanvas = () => setOffcanvas(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [idTypeList, setIdTypeList] = useState();
  const [location, setLocation] = useState();

  useEffect(() => {
    getVendorListById(vendorId).then((data) => {
      formik.setFieldValue("fullName", data.first_name);
      formik.setFieldValue("last_name", data.last_name);
      formik.setFieldValue("email", data.email);
      formik.setFieldValue("phone", data.mobile);
      formik.setFieldValue("location", data.profileextra.location);
    });
  }, [vendorId]);

  useEffect(() => {
    getVendorServiceTag()
      .then((data) => {
        setServiceTagList(data.results);
      })
      .catch((error) => {
        console.error("Error fetching  data:", error);
      });
    getUserIdType()
      .then((data) => {
        setIdTypeList(data.results);
      })
      .catch((error) => {
        console.error("Error fetching  data:", error);
      });
    getLocation()
      .then((data) => {
        console.log("location is==", data.results);
        setLocation(data.results);
      })
      .catch((error) => {
        console.log("error while fetching location", error);
      });
  }, []);

  return (
    <>
      <div
        className="card col-lg-12 add_details "
        style={{ borderRadius: "10px", border: "0px" }}
      >
        <div className="card-body ">
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
                  maxLength={20}
                />
                {formik.touched.fullName && formik.errors.fullName ? (
                  <div className="error">{formik.errors.fullName}</div>
                ) : null}
              </div>
            </div>
            <div className="col-sm-6 ">
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <div style={{ display: "flex" }}>
                  <div className="col-2">
                    <input type="text" value="+965" className="form-control" />
                  </div>
                  <div className="col-10">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Phone Number"
                      name="phone"
                      value={
                        formik.values.phone &&
                        formik.values.phone.replace(/\D/g, "").slice(0, 10)
                      } // Allow only the first 10 numeric characters
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const sanitizedValue = inputValue
                          .replace(/\D/g, "")
                          .slice(0, 10); // Remove non-digit characters and limit to 10 digits
                        formik.setFieldValue("phone", sanitizedValue); // Update the formik field
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="error">{formik.errors.phone}</div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="row row-cards">
            <div className="col-sm-6 ">
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  maxLength={20}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="error">{formik.errors.email}</div>
                ) : null}
              </div>
            </div>
            <div className="col-sm-6 ">
              <div className="mb-3">
                <label className="form-label">Location</label>
                <div style={{ position: "relative" }}>
                  <select
                    className="form-control"
                    id=""
                    name="location"
                    // value={formik.values.location}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option
                      disabled={true}
                      value=""
                      id={formik.values.location?.id}
                    >
                      {formik.values.location?.location}
                    </option>
                    {location &&
                      location.length > 0 &&
                      location.map((item, index) => {
                        return (
                          <option
                            key={item.id}
                            value={item.id}
                            label={item.location}
                          >
                            {item.country_flag && (
                              <img
                                src={item.country_flag}
                                alt={`${item.location} flag`}
                                style={{ width: "20px", marginRight: "5px" }}
                              />
                            )}
                          </option>
                        );
                      })}
                  </select>
                  {formik.touched.location && formik.errors.location ? (
                    <div className="error">{formik.errors.location}</div>
                  ) : null}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    style={{ top: "10px", right: "5px", position: "absolute" }}
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
                {/* {formik.touched.location && formik.errors.location ? (
                  <div className="error">{formik.errors.location}</div>
                ) : null} */}
              </div>
            </div>
          </div>
          <div className="row row-cards">
            <div className="col-sm-6">
              <label className="form-label">ID Type</label>
              <select
                type="text"
                className="form-select mb-3 status_selector"
                name="idType"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.idType || ""}
              >
                <option value="" disabled>
                  Select ID Type
                </option>
                {idTypeList &&
                  idTypeList.length > 0 &&
                  idTypeList.map((item, i) => {
                    return (
                      <option value={item.id} key={`statusList-${i}`}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
              {formik.touched.idType && formik.errors.idType ? (
                <div className="error">{formik.errors.idType}</div>
              ) : null}
            </div>

            <div className="col-sm-6 ">
              <div className="mb-3">
                <label className="form-label">ID Number</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="ID Number"
                  name="idNumber"
                  onChange={(e) => {
                    // Ensure the input value is a number
                    const inputValue = parseInt(e.target.value, 10);

                    // Check if the input is a number and not NaN
                    if (!isNaN(inputValue)) {
                      // Truncate to a maximum of 5 digits
                      const truncatedValue = inputValue.toString().slice(0, 20);

                      // Update the formik values
                      formik.setFieldValue("idNumber", truncatedValue);
                    }
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.idNumber}
                  max={99}
                />
                {formik.touched.idNumber && formik.errors.idNumber ? (
                  <div className="error">{formik.errors.idNumber}</div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
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
                          <label className="form-label">Company Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Company Name"
                            name="companyName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            maxLength={20}
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
                          <label className="form-label">Company Address</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Company Address"
                            name="companyAddress"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            maxLength={20}
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
                            maxLength={20}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.companyRegistrationNumber}
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
                          <label className="form-label">Company Website</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Company Website"
                            name="companyWebsite"
                            maxLength={20}
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
                              getOptionLabel={(option) => `${option.name} `}
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
                          <span style={{ fontSize: "16px" }}>Ownership</span>

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
    </>
  );
};

export default AddVendorInfo;
