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
import { decrement, increment } from "../../state/counter/counterSlice";
Modal.setAppElement("#root");

function ProgressBar() {
  const count = useSelector((state) => state.counter.value);
  const { vendorId, isAllowProceed, setIsAllowProceed } =
    useContext(OnboardContext);
  console.log(vendorId);

  const initialValueForSiteVisit = {
    title: "",
    files: [],
  };

  const validationSchemaForSiteVisit = Yup.object({
    title: Yup.string().required("Title is required"),
    files: Yup.array().required("Please upload at least one file"),
    // Add validation for other fields here
    // ...
  });
  // useEffect(() => {
  //   setIsAllowProceed(true);
  // }, []);
  console.log(count);
  const formik = useFormik({
    initialValues: count === 2 || (count === 0 && initialValueForSiteVisit),
    validationSchema: validationSchemaForSiteVisit,
    onSubmit: (values) => {
      // Handle form submission here
      setIsAllowProceed(true);
      console.log(values);
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const [buttonState, setButtonState] = useState(true);

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

  const handleConfirm = () => {
    setIsOpen(false);
    buttonState ? dispatch(increment()) : dispatch(decrement());
    setButtonState(true);
  };

  const dispatch = useDispatch();

  return (
    <div>
      <div className="col-12">
        <div className="row row-cards">
          <div className="breadcrumbs">
            <p>Lead Management</p>
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
            <p>Achille Lauro</p>
          </div>
        </div>
      </div>
      <div className="back_button col-2">
        <a
          href="/"
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
          className="card col-lg-12 header-content"
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
                  <ProgressBarComponent />
                </div>
              </div>
            </div>
          </div>
          {count === 1 && <AddVendorDetails />}
          {count === 2 && (
            <AddSiteVisit
              isAllowProceed={isAllowProceed}
              setIsAllowProceed={setIsAllowProceed}
              formik={formik}
            />
          )}
          {count === 3 && <CommonAddDetails title="Add Proposal" />}
          {count === 4 && <CommonAddDetails title="Add Negotation" />}
          {count === 5 && <CommonAddDetails title="Add MOU / Charter" />}
          {count === 6 && <GoLive />}
          {/* ////////////////////////////////////proceed and revert button//////////////////////////// */}
          <div className="col-12 actions_menu">
            <div style={{ display: "flex", gap: "20px" }}>
              {count >= 1 && (
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
              )}
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
                  console.log(count, isAllowProceed);
                  if (isAllowProceed && count >= 1) {
                    setIsOpen(true);
                    setIsAllowProceed(false);
                  }
                  if (count === 0) {
                    setIsOpen(true);
                  }
                }}
              >
                Proceed
              </button>
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
            </div>
            {/* <ModalPop
              isAllowProceed={isAllowProceed}
              setIsAllowProceed={setIsAllowProceed}
            /> */}
          </div>
          {/* ////////////////////////////////////proceed and revert button//////////////////////////// */}
        </div>
      </form>
    </div>
  );
}

export default ProgressBar;
