import AddSiteVisitModal from "../Modal/AddSiteVisitModal";
import { useState } from "react";

function SiteVisit() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const handleOpenOffcanvas = () => setShowOffcanvas(true);

  const handleCloseOffcanvas = () => setShowOffcanvas(false);

  return (
    <div className="tab-content site">
      <div className="tab-pane active show" id="tabs-home-7">
        <div>
          <div style={{ paddingBottom: "20px" }}>
            <AddSiteVisitModal
              show={showOffcanvas}
              close={handleCloseOffcanvas}
            />
            <button
              onClick={handleOpenOffcanvas}
              className="btn"
              style={{
                backgroundColor: "#187AF7",
                color: "white",
                fontWeight: "700",
                fontSize: "16px",
                borderRadius: "6px",
                width: "215px",
              }}
            >
              Add Site Visit &nbsp;
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
              >
                <path
                  d="M14.25 3.54167C16.206 3.54167 17.7917 5.12733 17.7917 7.08333C17.7917 9.03934 16.206 10.625 14.25 10.625H6.75001C5.48436 10.625 4.45834 11.651 4.45834 12.9167C4.45834 14.1823 5.48436 15.2083 6.75001 15.2083H15.6578L15.0581 14.6086C14.814 14.3645 14.814 13.9688 15.0581 13.7247C15.3021 13.4806 15.6979 13.4806 15.942 13.7247L17.6086 15.3914C17.8527 15.6355 17.8527 16.0312 17.6086 16.2753L15.942 17.9419C15.6979 18.186 15.3021 18.186 15.0581 17.9419C14.814 17.6979 14.814 17.3021 15.0581 17.0581L15.6578 16.4583H6.75001C4.794 16.4583 3.20834 14.8727 3.20834 12.9167C3.20834 10.9607 4.794 9.375 6.75001 9.375H14.25C15.5157 9.375 16.5417 8.34899 16.5417 7.08333C16.5417 5.81768 15.5157 4.79167 14.25 4.79167H7.04553C6.79828 5.40246 6.19946 5.83333 5.50001 5.83333C4.57954 5.83333 3.83334 5.08714 3.83334 4.16667C3.83334 3.24619 4.57954 2.5 5.50001 2.5C6.19946 2.5 6.79828 2.93087 7.04553 3.54167H14.25Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table card-table table-vcenter text-nowrap datatable">
            <thead>
              <tr>
                <th>Site Visit</th>
                <th>Date</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="4">
                  <div>
                    <div className="home_contents">
                      <p
                        style={{
                          fontWeight: "700",
                          fontSize: "16px",
                        }}
                      >
                        No Site Visits Found
                      </p>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#68727D",
                        }}
                      >
                        Record site visits here
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SiteVisit;
