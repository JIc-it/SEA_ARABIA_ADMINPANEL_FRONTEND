import { useState } from "react";
import Modal from "react-modal";
// import AddVendorDetails from "../Initial_contact/AddVendorDetails";

import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../../state/counter/counterSlice";

Modal.setAppElement("#root");

export default function ModalPop(props) {
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
  //   <h1>hello {count}</h1>
  // <button onClick={() => dispatch(increment())}>increment</button>
  // <button onClick={() => dispatch(decrement())}>decrement</button>
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);
  return (
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
        style={{
          backgroundColor: "#006875",
          color: "white",
          borderRadius: "6px",
          width: "120px",
        }}
        onClick={() => {
          setIsOpen(true);
        }}
        type="button"
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
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
