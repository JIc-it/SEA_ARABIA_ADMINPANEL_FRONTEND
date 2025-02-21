import React, { useEffect } from "react";
import "../../static/css/add_vendor_details.css";
import { useState } from "react";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useParams } from "react-router-dom";
import {
  getUserIdType,
  getVendorListById,
  getVendorServiceTag,
} from "../../services/leadMangement";

import CountryDropdown from "../SharedComponents/CountryDropDown";

const AddVendorInfo = ({ formik, locationList }) => {
  const vendorId = useParams()?.id;

  const [serviceTagList, setServiceTagList] = useState();

  const [idTypeList, setIdTypeList] = useState();

  useEffect(() => {
    getVendorListById(vendorId).then((data) => {
      formik.setFieldValue("fullName", data.first_name);
      formik.setFieldValue("last_name", data.last_name);
      formik.setFieldValue("email", data.email);
      const updatedNumber = data.mobile.replace("+965 ", "");
      formik.setFieldValue("phone", updatedNumber);
      const selectedCountryObject =
        locationList &&
        locationList.length > 0 &&
        data.profileextra?.location?.country_code &&
        locationList.find(
          (country) => country.code === data.profileextra.location.country_code
        );
      console.log("loc==", data.profileextra?.location?.country_code);
      console.log(selectedCountryObject, "selectedCountryObject");
      selectedCountryObject &&
        formik.setFieldValue("location", selectedCountryObject);
    });
  }, [vendorId, locationList]);

  useEffect(() => {
    getVendorServiceTag()
      .then((data) => {
        setServiceTagList(data);
      })
      .catch((error) => {
        // toast.error(error.message);
        console.error("Error fetching  data:", error);
      });
    getUserIdType()
      .then((data) => {
        setIdTypeList(data.results);
      })
      .catch((error) => {
        // toast.error(error.message);
        console.error("Error fetching  data:", error);
      });
  }, []);
  console.log(formik, "error");
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
                  maxLength={50}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="error">{formik.errors.email}</div>
                ) : null}
              </div>
            </div>
            <div className="col-sm-6 ">
              <div className="mb-3">
                <label className="form-label">Location</label>
                <CountryDropdown gccCountries={locationList} formik={formik} />
              </div>
            </div>
          </div>
          <div className="row row-cards">
            <div className="col-sm-6">
              <label className="form-label">ID Type</label>
              <select
                type="text"
                className="form-select  status_selector"
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
                  type="text"
                  className="form-control"
                  placeholder="ID Number"
                  name="idNumber"
                  onChange={(e) => {
                    const inputValue = e.target.value.replace(
                      /[^a-zA-Z0-9]/g,
                      ""
                    );
                    const truncatedValue = inputValue.slice(0, 20);
                    formik.setFieldValue("idNumber", truncatedValue);
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.idNumber}
                  maxLength={20}
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
                            maxLength={150}
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
                            maxLength={150}
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
