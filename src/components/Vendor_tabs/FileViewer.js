import React from "react";
import Modal from "react-modal";
import { convertHttpToHttps, getFileType } from "../../helpers";
Modal.setAppElement("#root");

const FileViewer = ({ selectedData, isViewFile, setIsViewFile }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
      // width: "20rem",
      // height: "210px",
    },
    overlay: {
      zIndex: 9999,
      backgroundColor: "rgb(85 80 80 / 75%)",
    },
  };

  const onClose = () => setIsViewFile(false);

  const fileType = getFileType(selectedData.attachment);
  console.log(`File type: ${fileType}`);
  const convertedUrl = convertHttpToHttps(selectedData.attachment);
  console.log(convertedUrl);

  return (
    <div className="file-modal-container">
      {" "}
      <Modal isOpen={isViewFile} onRequestClose={onClose} style={customStyles}>
        <div style={{ marginTop: "5px" }}>
          <div className="close-icon">
            <div onClick={onClose}>X</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {fileType === "Image" ? (
              <img
                src={selectedData.attachment}
                height={500}
                width={500}
                alt=""
              />
            ) : (
              <iframe
                src={`https://docs.google.com/gview?url=${convertedUrl}&embedded=true`}
                width="600"
                height="600"
              ></iframe>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FileViewer;
