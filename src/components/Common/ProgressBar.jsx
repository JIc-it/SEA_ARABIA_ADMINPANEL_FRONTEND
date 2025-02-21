import ModalPop from "../Modal/Modal";
import Modal from "react-modal";
import AddVendorDetails from "../Initial_contact/AddVendorDetails";
import AddSiteVisit from "../Site_visit/AddSiteVisit";
import "../../static/css/site_visit.css";
import CommonAddDetails from "../CommonAddDetails";
import GoLive from "../GoLive";
import VendorList from "../Initial_contact/VendorList";
import ProgressBarComponent from "./ProgressBarComponent";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { OnboardContext } from "../../Context/OnboardContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  decrement,
  increment,
  setCounter,
} from "../../state/counter/counterSlice";
import NegotiationForm from "../Vendor_tabs/NegotiationForm";
import CharterForm from "../Vendor_tabs/CharterForm";
import AddVendorInfo from "../Initial_contact/AddVendorForm";
import {
  getIndivitualVendorDetail,
  getUserIdType,
  getVendorListById,
  UpdateVendorListById,
  getVendorServiceTag,
  submitSiteVisit,
  siteVisitQualification,
  submitProposal,
  submitNegotiation,
  submitCharter,
  goLive,
  updateVendorStatus,
} from "../../services/leadMangement";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

Modal.setAppElement("#root");

function ProgressBar({ locationList, isOnBoard, setIsOnBoard }) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
      width: "400px",
      height: "210px",
    },
  };

  const paragraphStyle = {
    color: "#68727D",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "24px", // You can also specify "150%" as a string if needed
  };

  const paraHeaderStyle = {
    color: "#252525",
    fontFamily: "Roboto",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "28px", // You can also specify "155.556%" as a string if needed
    letterSpacing: "-0.18px",
  };

  const buttonDiv = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const proceedStyle = {
    width: "150px",
    fontWeight: 500,
    backgroundColor: "#0A77FF",
  };
  const cancelStyle = {
    width: "150px",
    fontWeight: 500,
  };
  const [isOpen, setIsOpen] = useState(false);
  const [buttonState, setButtonState] = useState(true);
  const count = useSelector((state) => state.counter.value);
  const [isLoading, setIsLoading] = useState(false);
  const { vendorId, companyID } = useContext(OnboardContext);
  const [userdata, setUserData] = useState([]);
  const [qualificationlist, setQualificationList] = useState([]);

  var initialValueForInitialContact = {
    fullName: "",
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
  };

  useEffect(() => {
    getVendorListById(vendorId)
      .then((data) => {
        setUserData(data);
        formik.setFieldValue("fullName", data.first_name);
        formik.setFieldValue("last_name", data.last_name);
        formik.setFieldValue("email", data.email);
        const updatedNumber = data.mobile.replace("+965 ", "");
        formik.setFieldValue("phone", updatedNumber);
        const selectedCountryObject =
          locationList &&
          locationList.length > 0 &&
          locationList.find(
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
          data?.useridentificationdata?.id_number || ""
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
        console.log(data.company_onboard_status, "data.status");
        if (data.company_onboard_status === "New Lead") {
          dispatch(setCounter(0));
        }
        if (data.company_onboard_status === "Initial Contact") {
          dispatch(setCounter(1));
        }
        if (data.company_onboard_status === "Site Visit") {
          dispatch(setCounter(2));
        }
        if (data.company_onboard_status === "Proposal") {
          dispatch(setCounter(3));
        }
        if (data.company_onboard_status === "Negotiation") {
          dispatch(setCounter(4));
        }
        if (data.company_onboard_status === "MOU / Charter") {
          dispatch(setCounter(5));
        }
        if (data.company_onboard_status === "Ready to Onboard") {
          dispatch(setCounter(6));
        }
      })
      .catch((error) => {
        // toast.error(error.message);
        console.error("Error fetching  data:", error);
      });

    siteVisitQualification()
      .then((data) => setQualificationList(data.results))
      .catch((error) => {
        // toast.error(error.message);
        console.error("Error on Fetching list Qualification", error);
      });
    getVendorListById(vendorId);
  }, [vendorId]);

  const initialValueForProposals = {
    proposalTitle: "",
    files: "",
    proposalNote: "",
    // proposalTime: "",
    // proposalDate: "",
  };

  const initialValueForNegotiation = {
    negotiationTitle: "",
    files: "",
    negotiationNote: "",
    // negotiationTime: "",
    // negotiationDate: "",
  };

  const initialValueForCharter = {
    charterTitle: "",
    files: "",
    charterNote: "",
    // charterTime: "",
    // charterDate: "",
  };

  const validationSchemaForInitialContact = Yup.object().shape({
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
    idType: Yup.string()
      .required("ID Type is required")
      .test(
        "is-not-blank",
        "ID Type must not contain only blank spaces",
        (value) => {
          return /\S/.test(value); // Checks if there is at least one non-whitespace character
        }
      ),
    idNumber: Yup.string()
      .required("ID Number is required")
      .test(
        "is-not-blank",
        "ID Number must not contain only blank spaces",
        (value) => {
          return /\S/.test(value); // Checks if there is at least one non-whitespace character
        }
      ),
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
        "Company Registration Number must not contain only blank spaces",
        (value) => {
          return /\S/.test(value); // Checks if there is at least one non-whitespace character
        }
      ),
    defineServices: Yup.array()
      .min(1, "At least one service must be selected") // Adjust the minimum number of selected services as needed
      .required("Define Services is required"),
  });

  const initialValueForSiteVisit = {
    title: "",
    files: "",
    note: "",
    siteVisitTime: "",
    siteVisitDate: "",
    qualification: [],
  };

  const validationSchemaForSiteVisit = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .test(
        "is-not-blank",
        "Title must not contain only blank spaces",
        (value) => {
          return /\S/.test(value); // Checks if there is at least one non-whitespace character
        }
      ),
    files: Yup.mixed()
      .required("Please upload file")
      .test("fileSize", "File size must not exceed 5MB", (value) => {
        if (!value) {
          // Handle the case where no file is provided
          return true;
        }

        // Check if the file size is less than or equal to 5MB
        return value && value.size <= 5 * 1024 * 1024; // 5MB in bytes
      }),
    note: Yup.string()
      .required("Note is required")
      .test(
        "is-not-blank",
        "Note must not contain only blank spaces",
        (value) => {
          return /\S/.test(value); // Checks if there is at least one non-whitespace character
        }
      ),
    siteVisitTime: Yup.string().required("Time is required"),
    siteVisitDate: Yup.string().required("Date is required"),
    qualification: Yup.array()
      .min(6, "All qualifications must be selected")
      .test("allChecked", "All qualifications must be selected", (value) => {
        // Check if every item in the array is truthy
        return Array.isArray(value) && value.every((item) => item);
      }),
  });

  const validationSchemaForProposal = Yup.object({
    proposalTitle: Yup.string()
      .required("Title is required")
      .test(
        "is-not-blank",
        "Title must not contain only blank spaces",
        (value) => {
          return /\S/.test(value); // Checks if there is at least one non-whitespace character
        }
      ),
    files: Yup.mixed()
      .required("Please upload file")
      .test("fileSize", "File size must not exceed 5MB", (value) => {
        if (!value) {
          // Handle the case where no file is provided
          return true;
        }

        // Check if the file size is less than or equal to 5MB
        return value && value.size <= 5 * 1024 * 1024; // 5MB in bytes
      }),
    proposalNote: Yup.string()
      .required("Note is required")
      .test(
        "is-not-blank",
        "Note must not contain only blank spaces",
        (value) => {
          return /\S/.test(value); // Checks if there is at least one non-whitespace character
        }
      ),
    // proposalTime: Yup.string().required("Time is required"),
    // proposalDate: Yup.string().required("Date is required"),
  });

  const validationSchemaForNegotiation = Yup.object({
    negotiationTitle: Yup.string()
      .required("Title is required")
      .test(
        "is-not-blank",
        "Title must not contain only blank spaces",
        (value) => {
          return /\S/.test(value); // Checks if there is at least one non-whitespace character
        }
      ),
    files: Yup.mixed()
      .required("Please upload file")
      .test("fileSize", "File size must not exceed 5MB", (value) => {
        if (!value) {
          // Handle the case where no file is provided
          return true;
        }

        // Check if the file size is less than or equal to 5MB
        return value && value.size <= 5 * 1024 * 1024; // 5MB in bytes
      }),
    negotiationNote: Yup.string()
      .required("Note is required")
      .test(
        "is-not-blank",
        "Note must not contain only blank spaces",
        (value) => {
          return /\S/.test(value); // Checks if there is at least one non-whitespace character
        }
      ),
    // negotiationTime: Yup.string().required("Time is required"),
    // negotiationDate: Yup.string().required("Date is required"),
  });

  const validationSchemaForCharter = Yup.object({
    charterTitle: Yup.string()
      .required("Title is required")
      .test(
        "is-not-blank",
        "Title must not contain only blank spaces",
        (value) => {
          return /\S/.test(value); // Checks if there is at least one non-whitespace character
        }
      ),
    files: Yup.mixed()
      .required("Please upload file")
      .test("fileSize", "File size must not exceed 5MB", (value) => {
        if (!value) {
          // Handle the case where no file is provided
          return true;
        }

        // Check if the file size is less than or equal to 5MB
        return value && value.size <= 5 * 1024 * 1024; // 5MB in bytes
      }),
    charterNote: Yup.string()
      .required("Note is required")
      .test(
        "is-not-blank",
        "Note must not contain only blank spaces",
        (value) => {
          return /\S/.test(value); // Checks if there is at least one non-whitespace character
        }
      ),
    // charterTime: Yup.string().required("Time is required"),
    // charterDate: Yup.string().required("Date is required"),
  });

  const formik = useFormik({
    initialValues:
      count === 0
        ? initialValueForSiteVisit
        : count === 1
        ? initialValueForInitialContact
        : count === 2
        ? initialValueForSiteVisit
        : count === 3
        ? initialValueForProposals
        : count === 4
        ? initialValueForNegotiation
        : count === 5
        ? initialValueForCharter
        : initialValueForProposals,
    validationSchema:
      count === 0
        ? validationSchemaForSiteVisit
        : count === 1
        ? validationSchemaForInitialContact
        : count === 2
        ? validationSchemaForSiteVisit
        : count === 3
        ? validationSchemaForProposal
        : count === 4
        ? validationSchemaForNegotiation
        : count === 5
        ? validationSchemaForCharter
        : validationSchemaForProposal,
    onSubmit: async (values) => {
      setIsOpen(true);
    },
    validateOnChange: true,
    validateOnBlur: true,
    enableReinitialize: true,
  });

  const updateInitialContact = async () => {
    setIsLoading(true);
    try {
      const definesevices = formik.values.defineServices.map(
        (datas) => datas.id
      );
      const passdata = {
        email: formik.values.email,
        mobile: `+965 ${formik.values.phone}`,
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

      const response = await UpdateVendorListById(userdata.id, passdata);
      if (response) {
        updateVendorStatus(companyID, "Site Visit")
          .then((data) => {
            console.log(data);
            dispatch(increment());
          })
          .catch((error) => {
            toast.error("Failed to toggle vendor status. Please try again.");
            console.error("Error fetching  data:", error);
          });
      } else {
        toast.error(
          "Failed to initiate contact with the vendor. Please check contact information."
        );
      }
      console.log("Update API response :", response);
      // Handle success or error
      setIsLoading(false);
    } catch (error) {
      console.error("API error:", error);
      toast.error(error.response.data.error);
      // Handle error
      setIsLoading(false);
    }
  };

  const updateSiteVisit = async () => {
    setIsLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("company", userdata?.company_company_user?.id);
      formdata.append("title", formik.values.title);
      formdata.append("attachment", formik.values.files);
      formdata.append("note", formik.values.note);
      formdata.append("date", formik.values.siteVisitDate);
      formdata.append("time", `${formik.values.siteVisitTime}:00`);
      formdata.append("qualifications", formik.values.qualification);
      console.log(`${formik.values.qualification.join(",")}`, "qualifications");
      const response = await submitSiteVisit(formdata);
      if (response) {
        updateVendorStatus(companyID, "Proposal")
          .then((data) => {
            console.log(data);
            dispatch(increment());
          })
          .catch((error) => {
            // toast.error(error.message);
            console.error("Error fetching  data:", error);
          });
      } else {
        toast.error("site visit adding failed ");
      }
      console.log("API response:", response);
      // Handle success or error
      setIsLoading(false);
    } catch (error) {
      console.error("API error:", error);
      toast.error("site visit adding failed ");
      setIsLoading(false);
      // toast.error(error.message);
      // Handle error
    }
  };

  const updateProposal = async () => {
    setIsLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("company", userdata?.company_company_user?.id);
      formdata.append("title", formik.values.proposalTitle);
      formdata.append("attachment", formik.values.files);
      formdata.append("note", formik.values.proposalNote);
      const response = await submitProposal(formdata);
      console.log("API response:", response);
      if (response) {
        updateVendorStatus(companyID, "Negotiation")
          .then((data) => {
            console.log(data);
            dispatch(increment());
          })
          .catch((error) => {
            toast.error("Failed to toggle vendor status. Please try again.");
            console.error("Error fetching  data:", error);
          });
      } else {
        toast.error("Failed to add the proposal. Please try again.");
      }
      // Handle success or error
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to add the proposal. Please try again.");
      console.error("API error:", error);
      // toast.error(error.message);
      // Handle error
      setIsLoading(false);
    }
  };

  const updateNegotiation = async () => {
    setIsLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("company", userdata?.company_company_user?.id);
      formdata.append("title", formik.values.negotiationTitle);
      formdata.append("attachment", formik.values.files);
      formdata.append("note", formik.values.negotiationNote);
      const response = await submitNegotiation(formdata);
      console.log("API response:", response);
      if (response) {
        updateVendorStatus(companyID, "MOU / Charter")
          .then((data) => {
            console.log(data);
            dispatch(increment());
          })
          .catch((error) => {
            // toast.error(error.message);
            console.error("Error fetching  data:", error);
          });
      } else {
        toast.error("Negotiation adding failed ");
      }
      // Handle success or error
      setIsLoading(false);
    } catch (error) {
      console.error("API error:", error);
      toast.error("Negotiation adding failed ");
      // toast.error(error.message);
      // Handle error
      setIsLoading(false);
    }
  };

  const updateCharter = async () => {
    setIsLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("company", userdata?.company_company_user?.id);
      formdata.append("title", formik.values.charterTitle);
      formdata.append("attachment", formik.values.files);
      formdata.append("note", formik.values.charterNote);
      const response = await submitCharter(formdata);
      console.log("API response:", response);
      if (response) {
        updateVendorStatus(companyID, "Ready to Onboard")
          .then((data) => {
            console.log(data);
            dispatch(increment());
          })
          .catch((error) => {
            toast.error("Failed to toggle vendor status. Please try again.");
            console.error("Error fetching  data:", error);
          });
      } else {
        toast.error(
          "Failed to submit MOU/Charter details. Please check your input and try again."
        );
      }
      // Handle success or error
    } catch (error) {
      console.error("API error:", error);
      toast.error(
        "Failed to submit MOU/Charter details. Please check your input and try again."
      );
      // toast.error(error.message);
      // Handle error
    }
    setIsLoading(false);
  };

  const handleConfirm = () => {
    setIsOpen(false);
    if (count === 0) {
      updateVendorStatus(companyID, "Initial Contact")
        .then((data) => {
          console.log(data);
          dispatch(increment());
        })
        .catch((error) => {
          // toast.error(error.message);
          console.error("Error fetching  data:", error);
        });
    }
    // buttonState ? dispatch(increment()) : dispatch(decrement());
    // setButtonState(true);
    if (count === 1) {
      updateInitialContact();
    }
    if (count === 2) {
      updateSiteVisit();
    }
    if (count === 3) {
      updateProposal();
    }
    if (count === 4) {
      updateNegotiation();
    }
    if (count === 5) {
      updateCharter();
    }
  };

  const handleFileChange = (file) => {
    formik.setFieldValue("files", file[0]);
  };

  const dispatch = useDispatch();

  return (
    <div>
      <div className="col-12">
        <div className="row row-cards">
          <div className="breadcrumbs">
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
          </div>
        </div>
      </div>
      <div className="back_button col-2">
        <a
          href="/vendor-management"
          style={{ display: "flex", gap: "10px", textDecoration: "none" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M20 12H4M4 12L10 6M4 12L10 18"
              stroke="#252525"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p
            style={{
              color: "black",
              textDecoration: "none",
              marginBottom: "10px",
            }}
          >
            Back
          </p>
        </a>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div
          className="card header-content"
          style={{
            borderRadius: "10px",
            backgroundColor: "#E9F2FA",
            border: "0px",
          }}
        >
          <div className="col-lg-12 progress_bar">
            <div className="card progress_card">
              <div className="card-body col-10">
                <div id="col-lg-12 steps">
                  {/* {steps.map(({ steps, label, logo }) => (
                  <div
                    className="step state_one active"
                    data-desc={label}
                    key={label}
                  >
                    {logo}
                  </div>
                ))} */}
                  <ProgressBarComponent isOnBoard={isOnBoard} />
                </div>
              </div>
            </div>
          </div>
          {count === 1 && (
            <AddVendorInfo formik={formik} locationList={locationList} />
          )}
          {count === 2 && (
            <AddSiteVisit
              formik={formik}
              qualificationlist={qualificationlist}
              handleFileChange={handleFileChange}
            />
          )}
          {count === 3 && (
            <CommonAddDetails
              title="Add Proposal"
              formik={formik}
              handleFileChange={handleFileChange}
            />
          )}
          {count === 4 && (
            <NegotiationForm
              title="Add Negotation"
              formik={formik}
              handleFileChange={handleFileChange}
            />
          )}
          {count === 5 && (
            <CharterForm
              title="Add MOU / Charter"
              formik={formik}
              handleFileChange={handleFileChange}
            />
          )}
          {count === 6 && (
            <GoLive
              userData={userdata}
              handleFileChange={handleFileChange}
              setIsOnBoard={setIsOnBoard}
              isOnBoard={isOnBoard}
            />
          )}
          {/* ////////////////////////////////////proceed and revert button//////////////////////////// */}
          {count != 6 && (
            <div className="col-12 actions_menu my-4">
              <div style={{ display: "flex", gap: "20px" }}>
                {/* {count >= 1 && (
                  <button
                    className="btn"
                    style={{
                      backgroundColor: "#FFF",
                      color: "black",
                      borderRadius: "6px",
                      width: "120px",
                    }}
                    onClick={() => {
                      setIsOpen(true);
                      setButtonState(false);
                    }}
                  >
                    Revert
                  </button>
                )} */}
                <button
                  className="btn"
                  type="submit"
                  style={{
                    backgroundColor: "#006875",
                    color: "white",
                    borderRadius: "6px",
                    width: "120px",
                  }}
                  onClick={() => {
                    if (!isLoading) {
                      formik.submitForm();
                      count === 0 && setIsOpen(true);
                    }
                  }}
                >
                  {isLoading ? <CircularProgress /> : "Proceed"}
                </button>
                {isOpen && !isLoading && (
                  <Modal
                    isOpen={isOpen}
                    onRequestClose={() => setIsOpen(false)}
                    style={customStyles}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <path
                        d="M16.0003 21.3477V14.681M16.0003 10.681V10.6677M29.3337 16.0013C29.3337 23.3651 23.3641 29.3346 16.0003 29.3346C8.63653 29.3346 2.66699 23.3651 2.66699 16.0013C2.66699 8.63751 8.63653 2.66797 16.0003 2.66797C23.3641 2.66797 29.3337 8.63751 29.3337 16.0013Z"
                        stroke="#252525"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                    </svg>
                    <div style={{ marginTop: "5px" }}>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <p style={paraHeaderStyle}>Confirm The Action</p>
                        <p style={paragraphStyle}>
                          {buttonState
                            ? "Are you sure you want to proceed"
                            : "Are you sure want to revert"}
                        </p>
                      </div>
                      <div style={buttonDiv}>
                        <button
                          onClick={() => {
                            setIsOpen(false);
                          }}
                          className="btn btn-outline"
                          style={cancelStyle}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleConfirm}
                          className="btn btn-info"
                          style={proceedStyle}
                          type="submit"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </Modal>
                )}
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default ProgressBar;
