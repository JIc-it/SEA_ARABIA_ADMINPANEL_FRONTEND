import { Offcanvas } from "react-bootstrap";
import { useState } from "react";
import { formatDateIncludeMonth, formatTimeWith12Hour } from "../../../helpers";
import FileViewer from "../FileViewer";

function ViewSiteVisit({ show, close, selectedData }) {
  const [isViewFile, setIsViewFile] = useState(false);
  var substringToRemove =
    "https://seaarabia.jicitsolution.com/assets/media/company/site_visit/attachment/";
  const fileName =
    selectedData && selectedData.attachment.replace(substringToRemove, "");

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
        <Offcanvas.Title> Site Visit Details</Offcanvas.Title>
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
              <div style={{ overflowX: "auto", maxWidth: "260px" }}>
                <span>{fileName}</span>
              </div>
              <button
                className="btn btn-sm btn-info px-4 py-1"
                onClick={() => {
                  console.log("check");
                  setIsViewFile(true);
                }}
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
          <span style={{ wordBreak: "break-all" }}>{selectedData && selectedData.note}</span>
        </div>
        <div style={{ margin: "20px" }}>
          <label
            htmlFor=""
            style={{ paddingBottom: "10px", fontWeight: "600" }}
          >
            Date
          </label>
          <br />
          <span>
            {selectedData && formatDateIncludeMonth(selectedData.date)}
          </span>
        </div>
        <div style={{ margin: "20px" }}>
          <label
            htmlFor=""
            style={{ paddingBottom: "10px", fontWeight: "600" }}
          >
            Time
          </label>
          <br />
          <span>{selectedData && formatTimeWith12Hour(selectedData.time)}</span>
        </div>

        {isViewFile && (
          <FileViewer
            setIsViewFile={setIsViewFile}
            isViewFile={isViewFile}
            selectedData={selectedData}
          />
        )}
      </div>
    </Offcanvas>
  );
}

export default ViewSiteVisit;
