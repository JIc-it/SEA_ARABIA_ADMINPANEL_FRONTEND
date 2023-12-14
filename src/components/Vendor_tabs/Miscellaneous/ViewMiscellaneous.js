import { Offcanvas } from "react-bootstrap";
// import DropZone from "../Common/DropZone";
import Modal from "react-modal";
import * as Yup from "yup";
import { useContext, useEffect, useState } from "react";
import {
  addMiscellaneousAttachment,
  getMiscellaneousTypeList,
} from "../../../services/leadMangement";
import DropZone from "../../Common/DropZone";
import { FileUploader } from "../../Modal/FileUploader";
import { toast } from "react-toastify";
import { OnboardContext } from "../../../Context/OnboardContext";
import { convertedDateAndTime, removeFolderPath } from "../../../helpers";
Modal.setAppElement("#root");

function ViewMiscellaneous({ show, close, selectedData }) {
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
  const [isViewFile, setIsViewFile] = useState(false);
  const fileName =
    selectedData && removeFolderPath(selectedData && selectedData.attachment);
  const formatedDate =
    selectedData && convertedDateAndTime(selectedData && selectedData.datetime);

  return (
    <Offcanvas
      show={show}
      onHide={close}
      placement="end"
      style={{ overflow: "auto" }}
    >
      <Offcanvas.Header
        closeButton
        style={{ border: "0px", paddingBottom: "0px" }}
      >
        <Offcanvas.Title> Attachment / Notes Details</Offcanvas.Title>
      </Offcanvas.Header>
      <div>
        <div style={{ margin: "20px" }}>
          <label style={{ paddingBottom: "10px", fontWeight: "600" }}>
            Title
          </label>
          <br />
          <span>{selectedData && selectedData.title}</span>
        </div>
        <div style={{ margin: "20px" }}>
          <div>
            <label style={{ paddingBottom: "10px", fontWeight: "600" }}>
              Files
            </label>
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>{fileName}</span>
              <button
                className="btn btn-sm btn-info px-4 py-1"
                // onClick={() => {
                //   console.log("check");
                //   setIsViewFile(true);
                // }}
              >
                View
              </button>
            </div>
          </div>
        </div>
        <div style={{ margin: "20px" }}>
          <label
            htmlFor=""
            style={{ paddingBottom: "10px", fontWeight: "600" }}
          >
            Notes
          </label>
          <br />
          <span>{selectedData && selectedData.note}</span>
        </div>
        <div style={{ margin: "20px" }}>
          <label
            htmlFor=""
            style={{ paddingBottom: "10px", fontWeight: "600" }}
          >
            Date
          </label>
          <br />
          <span>{formatedDate?.fullDate}</span>
        </div>
        <div style={{ margin: "20px" }}>
          <label
            htmlFor=""
            style={{ paddingBottom: "10px", fontWeight: "600" }}
          >
            Time
          </label>
          <br />
          <span>{formatedDate?.formattedTime}</span>
        </div>

        {isViewFile && (
          <div className="file-modal">
            {" "}
            <Modal
              isOpen={isViewFile}
              onRequestClose={() => setIsViewFile(false)}
              style={customStyles}
            >
              <div style={{ marginTop: "5px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {selectedData && <img src={selectedData.attachment} alt="" />}
                </div>
                {/* <div style={buttonDiv}>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className="btn btn-outline"
                    style={cancelStyle}
                  >
                    Close
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="btn btn-info"
                    style={proceedStyle}
                    type="submit"
                  >
                    Confirm
                  </button>
                </div> */}
              </div>
            </Modal>
          </div>
        )}
      </div>
    </Offcanvas>
  );
}

export default ViewMiscellaneous;
