import React, { useContext, useEffect } from "react";
import { useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate, useParams } from "react-router-dom";
import {
  UpdateVendorListById,
  getUserIdType,
  getVendorListById,
  getVendorServiceTag,
} from "../../../services/leadMangement";
import { toast } from "react-toastify";
import { getLocation } from "../../../services/CustomerHandle";
import CountryDropdown from "../../SharedComponents/CountryDropDown";

const VenderIndivitualEdit = () => {
  const navigate = useNavigate();
  const params = useParams();
  console.log(params);
  const vendorId = params?.id;
  const companyID = params?.companyID;
  const [showCanvas, setOffcanvas] = useState(false);
  const handleOpenOffcanvas = () => setOffcanvas(true);
  const [serviceTagList, setServiceTagList] = useState();
  const handleCloseOffcanvas = () => setOffcanvas(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [idTypeList, setIdTypeList] = useState();
  const [userdata, setUserData] = useState([]);
  const [location, setLocation] = useState();

  useEffect(() => {
    getLocation()
      .then((data) => {
        console.log("location is==", data.results);
        setLocation(data);
      })
      .catch((error) => {
        // toast.error(error.message);
        console.log("error while fetching location", error);
      });
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

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("Full Name is required")
      .test(
        "is-not-blank",
        "Full Name must not contain only blank spaces",
        (value) => {
          return /\S/.test(value); // Checks if there is at least one non-whitespace character
        }
      ),
    phone: Yup.string()
      .required("Phone is required")
      .test(
        "is-at-least-8-digits",
        "Phone must have at least 8 digits",
        (value) => {
          return /^\d{8,}$/.test(value); // Checks if there are at least 8 digits
        }
      ),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    location: Yup.mixed().required("Location is required"),
    idType: Yup.string().required("ID Type is required"),
    idNumber: Yup.string().required("ID Number is required"),
    companyName: Yup.string()
      .required("Company Name is required")
      .test(
        "is-not-blank",
        "Company Name must not contain only blank spaces",
        (value) => {
          return /\S/.test(value); // Checks if there is at least one non-whitespace character
        }
      ),
    companyAddress: Yup.string()
      .required("Company Address is required")
      .test(
        "is-not-blank",
        "Company Address must not contain only blank spaces",
        (value) => {
          return /\S/.test(value); // Checks if there is at least one non-whitespace character
        }
      ),
    companyRegistrationNumber: Yup.string()
      .required("Company Registration Number is required")
      .test(
        "is-not-blank",
        "Company Registration must not contain only blank spaces",
        (value) => {
          return /\S/.test(value); // Checks if there is at least one non-whitespace character
        }
      ),
    // companyWebsite: Yup.string()
    //   .url("Invalid URL")
    //   .required("Company Website is required"),
    defineServices: Yup.array()
      .min(1, "At least one service must be selected") // Adjust the minimum number of selected services as needed
      .required("Define Services is required"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      last_name: "",
      phone: "",
      email: "",
      location: {},
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
      updateInitialContact();
      // Handle form submission
      console.log(values);
    },
  });

  useEffect(() => {
    getVendorListById(vendorId)
      .then((data) => {
        setUserData(data);
        formik.setFieldValue("fullName", data.first_name);
        // formik.setFieldValue("last_name", data.last_name);
        formik.setFieldValue("email", data.email);
        const formattedPhoneNumber = data.mobile
          .replace(/\D/g, "")
          .replace(/^965/, "");
        formik.setFieldValue("phone", formattedPhoneNumber);
        const selectedCountryObject =
          location &&
          location.length > 0 &&
          data?.profileextra?.location?.country_code &&
          location.find(
            (country) =>
              country.code === data?.profileextra?.location?.country_code
          );
        console.log(selectedCountryObject, "selectedCountryObject");
        selectedCountryObject &&
          formik.setFieldValue("location", selectedCountryObject);

        formik.setFieldValue(
          "idType",
          data?.useridentificationdata?.id_type?.id || ""
        );

        formik.setFieldValue(
          "idNumber",
          data?.useridentificationdata?.id_number
        );
        formik.setFieldValue("companyName", data?.company_company_user?.name);
        formik.setFieldValue(
          "companyAddress",
          data?.company_company_user?.address
        );
        formik.setFieldValue(
          "companyRegistrationNumber",
          data?.company_company_user?.registration_number
        );
        formik.setFieldValue(
          "companyWebsite",
          data?.company_company_user?.website
        );
        formik.setFieldValue(
          "defineServices",
          data?.company_company_user?.service_summary
        );
        formik.setFieldValue(
          "thirdPartyService",
          data?.company_company_user?.third_party_ownership
        );
      })
      .catch((error) => {
        // toast.error(error.message);
        console.error("Error fetching  data:", error);
      });
  }, [vendorId, location]);

  const updateInitialContact = async () => {
    try {
      const definesevices = formik.values.defineServices.map(
        (datas) => datas.id
      );
      const passdata = {
        email: formik.values.email,
        mobile: formik.values.phone,
        first_name: formik.values.fullName,
        last_name: formik.values.last_name,
        location: formik.values.location?.id,
        useridentificationdata: {
          id_type: formik.values.idType,
          id_number: formik.values.idNumber,
        },
        company_company_user: {
          service_summary: definesevices,
          name: formik.values.companyName,
          registration_number: formik.values.companyRegistrationNumber,
          address: formik.values.companyAddress,
          website: formik.values.companyWebsite,
          third_party_ownership: formik.values.thirdPartyService,
        },
      };
      console.log(passdata, "check");
      const response = await UpdateVendorListById(userdata.id, passdata);
      if (response) {
        navigate(`/onboard/${vendorId}/${companyID}`);
      } else {
        toast.error("Vendor details updation failed.");
        // Handle error
      }
      console.log("Update API response :", response);
      // Handle success or error
    } catch (error) {
      console.error("API error:", error);
      // toast.error(error.message);
      // Handle error
    }
  };

  const serviceListFilterData =
    formik.values.defineServices && formik.values.defineServices.length > 0
      ? serviceTagList &&
        serviceTagList.length > 0 &&
        serviceTagList.filter((item) => {
          return !formik.values.defineServices.some(
            (refItem) => refItem.id === item.id
          );
        })
      : serviceTagList || [];

  return (
    <div className="page-wrapper">
      <div className="page-body">
        <div className="container-xl">
          <form action="" onSubmit={formik.handleSubmit}>
            <div className="breadcrumbs ">
              <p>Vendor Management</p>
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
              <p>{userdata?.first_name}</p>
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
              <p style={{ color: "#006875" }}>Edit Details</p>
            </div>
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
                            value={
                              formik.values.phone &&
                              formik.values.phone
                                .replace(/\D/g, "")
                                .slice(0, 10)
                            }
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
                      <CountryDropdown
                        gccCountries={location}
                        formik={formik}
                      />
                      {/* <div style={{ position: "relative" }}>
                        <select
                          className="form-control"
                          id=""
                          name="location"
                          // value={formik.values.location}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        > */}
                      {/* <option
                            disabled={true}
                            value=""
                            id={formik.values.location?.id}
                          >
                            {formik.values.location?.country}
                          </option> */}
                      {/* {location &&
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
                                      style={{
                                        width: "20px",
                                        marginRight: "5px",
                                      }}
                                    />
                                  )}
                                </option>
                              );
                            })}
                        </select> */}
                      {/* {formik.touched.location && formik.errors.location ? (
                          <div className="error">{formik.errors.location}</div>
                        ) : null} */}
                      {/* <svg
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
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="row row-cards">
                  <div className="col-sm-6 ">
                    <label className="form-label">ID Type</label>
                    <select
                      type="text"
                      className="form-select mb-3 status_selector"
                      name="idType"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.idType || ""}
                    >
                      {" "}
                      <option value="" selected>
                        ID Type
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
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.idNumber}
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
                                  maxLength={20}
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
                                  maxLength={150}
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
                                  maxLength={20}
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
                                  maxLength={150}
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
                                    options={serviceListFilterData || []}
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

            <div
              className="col-12  my-4"
              style={{ display: "flex", justifyContent: "end" }}
            >
              <div style={{ display: "flex", gap: "20px" }}>
                <button
                  className="btn"
                  style={{
                    backgroundColor: "#FFF",
                    color: "black",
                    borderRadius: "6px",
                    width: "120px",
                  }}
                  onClick={() => {
                    navigate(`/onboard/${vendorId}/${companyID}`);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="btn"
                  type="submit"
                  style={{
                    backgroundColor: "#006875",
                    color: "white",
                    borderRadius: "6px",
                    width: "120px",
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VenderIndivitualEdit;
