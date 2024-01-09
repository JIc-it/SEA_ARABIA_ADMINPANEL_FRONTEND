import { Offcanvas } from "react-bootstrap";
import "../../../../static/css/AddNewLead.css";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import {
  getUserIdType,
  getVendorListById,
  getVendorServiceTag,
} from "../../../../services/leadMangement";
import { useNavigate, useParams } from "react-router-dom";
import {
  UpdateVendorListById,
  getLocation,
} from "../../../../services/CustomerHandle";
import { Autocomplete, TextField } from "@mui/material";
import CountryDropdown from "../../../SharedComponents/CountryDropDown";
import { AppContext } from "../../../../Context/AppContext";

function UserVendorEdit({ show, close }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const vendorId = useParams()?.id;
  const { gccCountriesList } = useContext(AppContext);
  console.log(gccCountriesList, "gccCountriesList");

  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
  const [isLoading, setIsLoading] = useState(false);
  const [idTypeList, setIdTypeList] = useState();
  const [serviceTagList, setServiceTagList] = useState();
  const [vendorDetails, setvendorDetails] = useState([]);

  useEffect(() => {
    getVendorListById(vendorId)
      .then((data) => {
        // Assuming data is an object with a 'response' property

        setvendorDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching vendor data:", error);
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
  }, [vendorDetails]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .max(20, "Name must be at most 20 characters")
      .test(
        "is-not-blank",
        "Name must not contain only blank spaces",
        (value) => {
          return /\S/.test(value); // Checks if there is at least one non-whitespace character
        }
      ),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    mobile: Yup.string().required("Mobile is required"),
    location: Yup.mixed().required("Location is required"),
    // idType: Yup.string().required("ID Type is required"),
    idnumber: Yup.string().required("ID Number is required"),
    companyname: Yup.string()
      .required("Company Name is required")
      .max(20, "Company Name must be at most 20 characters")
      .test(
        "is-not-blank",
        "Company Name must not contain only blank spaces",
        (value) => {
          return /\S/.test(value); // Checks if there is at least one non-whitespace character
        }
      ),
    companyaddress: Yup.string()
      .required("Company Address is required")
      .test(
        "is-not-blank",
        "Company Address must not contain only blank spaces",
        (value) => {
          return /\S/.test(value); // Checks if there is at least one non-whitespace character
        }
      ),
    companyregnumber: Yup.string()
      .required("Company Register Number is required")
      .test(
        "is-not-blank",
        "Company Register Number must not contain only blank spaces",
        (value) => {
          return /\S/.test(value); // Checks if there is at least one non-whitespace character
        }
      ),
    companywebaddress: Yup.string()
      .required("Company Website is required")
      .test(
        "is-not-blank",
        "Company Website must not contain only blank spaces",
        (value) => {
          return /\S/.test(value); // Checks if there is at least one non-whitespace character
        }
      ),
    defineServices: Yup.array().required("Define Service is required"),
  });
  const selectedCountryObject =
    gccCountriesList &&
    gccCountriesList.length > 0 &&
    vendorDetails?.profileextra?.location &&
    gccCountriesList.find(
      (country) =>
        country.code === vendorDetails.profileextra.location.country_code
    );
  console.log(selectedCountryObject, "selectedCountryObject");

  // update vendor details
  const formik = useFormik({
    initialValues: {
      name: vendorDetails?.first_name || "",
      email: vendorDetails?.email || "",
      mobile: vendorDetails?.mobile || "",
      location: (selectedCountryObject && selectedCountryObject) || {},
      idType: vendorDetails.useridentificationdata?.id_type?.id || "",
      idnumber: vendorDetails?.useridentificationdata?.id_number || "",
      companyaddress: vendorDetails?.company_company_user?.address || "",
      companywebaddress: vendorDetails?.company_company_user?.website || "",
      companyname: vendorDetails?.company_company_user?.name || "",
      companyregnumber:
        vendorDetails?.company_company_user?.registration_number || "",
      defineServices:
        vendorDetails?.company_company_user?.service_summary || [],
      thirdPartyService:
        vendorDetails?.company_company_user?.third_party_ownership || false,
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      if (!isLoading) {
        try {
          const definesevices = values.defineServices.map((datas) => datas.id);
          const passdata = {
            ///////////////////////////////////////

            email: values.email,
            mobile: values.mobile,
            first_name: values.name,
            // last_name: formik.values.last_name,
            location: values.location?.id,
            useridentificationdata: {
              id_type: values.idType,
              id_number: values.idnumber,
            },
            company_company_user: {
              service_summary: definesevices,
              name: values.companyname,
              registration_number: values.companyregnumber,
              address: values.companyaddress,
              website: values.companywebaddress,
              third_party_ownership: values.thirdPartyService,
            },
          };
          console.log(passdata, "passdata");
          const response = await UpdateVendorListById(
            vendorDetails.id,
            passdata
          );
          if (response) {
            toast.success("Vendor details updated successfully.");
            navigate(`/user-vendor/${vendorDetails.id}`);
          } else {
            toast.error(
              "Failed to initiate contact with the vendor. Please check contact information."
            );
          }
          console.log("Update API response :", response);
          // Handle success or error
        } catch (error) {
          console.error("API error:", error);
          toast.error(error.response.data.error);
          // Handle error
        }
      }
    },
  });
  console.log(formik);
  useEffect(() => {
    formik.setValues({
      name: vendorDetails?.first_name || "",
      email: vendorDetails?.email || "",
      mobile: vendorDetails?.mobile || "",
      location: selectedCountryObject || {},
      idType: vendorDetails.useridentificationdata?.id_type?.id || "",
      idnumber: vendorDetails?.useridentificationdata?.id_number || "",
      companyaddress: vendorDetails?.company_company_user?.address || "",
      companywebaddress: vendorDetails?.company_company_user?.website || "",
      companyname: vendorDetails?.company_company_user?.name || "",
      companyregnumber:
        vendorDetails?.company_company_user?.registration_number || "",
      defineServices:
        vendorDetails?.company_company_user?.service_summary || [],
      thirdPartyService:
        vendorDetails?.company_company_user?.third_party_ownership || false,
    });
    selectedCountryObject &&
      formik.setFieldValue("location", selectedCountryObject);
  }, [vendorDetails, selectedCountryObject]);
  // console.log(formik, "data");

  return (
    <div className="page-wrapper">
      <div className="page-body">
        <div className="container-xl">
          <div style={{ height: "100vh" }}>
            <div className="col-12  my-2 px-3">
              <div>
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
                          <p>Edit Details</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={formik.handleSubmit}>
                    <div
                      className="card mt-2"
                      style={{
                        width: isMobileView ? "100vw" : "",
                        borderRadius: "8px",
                      }}
                    >
                      <div className="col-12 p-5">
                        <p style={{ fontWeight: "600" }}>Personal Details</p>
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
                            <div className="mt-4">
                              <label
                                htmlFor=""
                                style={{
                                  paddingBottom: "10px",
                                  fontWeight: "600",
                                  fontSize: "13px",
                                }}
                              >
                                Full Name
                                <span style={{ color: "red" }}> *</span>
                              </label>
                              <input
                                type="text"
                                placeholder="Name"
                                className="form-control"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                maxLength={20}
                              />

                              {formik.touched.name && formik.errors.name ? (
                                <div className="error">
                                  {formik.errors.name}
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
                                Email <span style={{ color: "red" }}>*</span>
                              </label>

                              <input
                                type="text"
                                placeholder="Email"
                                className="form-control"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                maxLength={20}
                              />
                              {formik.touched.email && formik.errors.email ? (
                                <div className="error">
                                  {formik.errors.email}
                                </div>
                              ) : null}
                            </div>
                            <div className="mt-2">
                              <label
                                htmlFor=""
                                style={{
                                  paddingBottom: "12px",
                                  fontWeight: "600",
                                  fontSize: "13px",
                                }}
                              >
                                ID Type <span style={{ color: "red" }}>*</span>
                              </label>
                              <select
                                type="text"
                                className="form-select mb-3 status_selector"
                                name="idType"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.idType || ""}
                              >
                                {" "}
                                {idTypeList &&
                                  idTypeList.length > 0 &&
                                  idTypeList.map((item, i) => {
                                    return (
                                      <option
                                        value={item.id}
                                        key={`statusList-${i}`}
                                      >
                                        {item.name}
                                      </option>
                                    );
                                  })}
                              </select>
                              {formik.touched.idType && formik.errors.idType ? (
                                <div className="error">
                                  {formik.errors.idType}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div
                            className="ms-3"
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
                                Phone <span style={{ color: "red" }}>*</span>
                              </label>
                              <div style={{ display: "flex" }}>
                                <div className="col-3">
                                  <input
                                    type="text"
                                    value={"+965"}
                                    className="form-control"
                                    readOnly={true}
                                  />
                                </div>
                                <div className="col-9">
                                  <input
                                    type="number"
                                    placeholder="Phone Number"
                                    className="form-control"
                                    name="mobile"
                                    value={
                                      formik.values.mobile &&
                                      formik.values.mobile
                                        .replace(/\D/g, "")
                                        .replace(/^965/, "")
                                        .slice(0, 10)
                                    }
                                    onChange={(e) => {
                                      const inputValue = e.target.value;
                                      const sanitizedValue = inputValue
                                        .replace(/\D/g, "")
                                        .slice(0, 10);
                                      formik.setFieldValue(
                                        "mobile",
                                        sanitizedValue
                                      );
                                    }}
                                    onBlur={formik.handleBlur}
                                  />
                                </div>
                              </div>
                              {formik.touched.mobile && formik.errors.mobile ? (
                                <div className="error">
                                  {formik.errors.mobile}
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
                                Location <span style={{ color: "red" }}>*</span>
                              </label>
                              <CountryDropdown
                                gccCountries={gccCountriesList}
                                formik={formik}
                              />
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
                                ID Number{" "}
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="text"
                                placeholder="ID Number"
                                className="form-control"
                                name="idnumber"
                                value={formik.values.idnumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                maxLength={20}
                              />
                              {formik.touched.idnumber &&
                              formik.errors.idnumber ? (
                                <div className="error">
                                  {formik.errors.idnumber}
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
                        width: isMobileView ? "100vw" : "",
                        borderRadius: "8px",
                      }}
                    >
                      <div className="col-12 p-5">
                        <p style={{ fontWeight: "600" }}>Company Details</p>
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
                                Company Name{" "}
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="text"
                                placeholder="Company Name"
                                className="form-control"
                                name="companyname"
                                value={formik.values.companyname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                maxLength={20}
                              />
                              {formik.touched.companyname &&
                              formik.errors.companyname ? (
                                <div className="error">
                                  {formik.errors.companyname}
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
                                Company Register Number{" "}
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="text"
                                placeholder="Company Register Number"
                                className="form-control"
                                name="companyregnumber"
                                value={formik.values.companyregnumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                maxLength={20}
                              />
                              {formik.touched.companyregnumber &&
                              formik.errors.companyregnumber ? (
                                <div className="error">
                                  {formik.errors.companyregnumber}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div
                            className="ms-3"
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
                                Company Address
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <div style={{ position: "relative" }}>
                                <input
                                  type="text"
                                  placeholder="Name"
                                  className="form-control"
                                  name="companyaddress"
                                  value={formik.values.companyaddress}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  maxLength={20}
                                />
                                {formik.touched.companyaddress &&
                                formik.errors.companyaddress ? (
                                  <div className="error">
                                    {formik.errors.companyaddress}
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
                            <div className="mt-2">
                              <label
                                htmlFor=""
                                style={{
                                  paddingBottom: "10px",
                                  fontWeight: "600",
                                  fontSize: "13px",
                                }}
                              >
                                Company Website{" "}
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="text"
                                placeholder="Company Website"
                                className="form-control"
                                name="companywebaddress"
                                value={formik.values.companywebaddress}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                maxLength={20}
                              />
                              {formik.touched.companywebaddress &&
                              formik.errors.companywebaddress ? (
                                <div className="error">
                                  {formik.errors.companywebaddress}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="card mt-2 mb-2"
                      style={{
                        width: isMobileView ? "100vw" : "",
                        borderRadius: "8px",
                      }}
                    >
                      <div className="col-12 p-5">
                        <div className="d-flex justify-content-between align-items-center">
                          <p style={{ fontWeight: "600" }}>Service Details</p>
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
                                value={formik.values.defineServices}
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
                                    name="thirdPartyService"
                                    id="thirdPartyService"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    checked={formik.values.thirdPartyService}
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
                                <div className="error">
                                  {formik.errors.mobile}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr style={{ borderBottom: "1px solid black" }}></hr>
                    <div className="d-flex justify-content-end">
                      <button
                        type="reset"
                        className="m-1 btn btn-small btn-white"
                        onClick={() => {
                          navigate(`/user-vendor/${vendorDetails.id}`);
                        }}
                      >
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
        </div>
      </div>
    </div>
  );
}

export default UserVendorEdit;
