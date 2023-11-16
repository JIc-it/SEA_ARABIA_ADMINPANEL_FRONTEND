import AddNegotationsModal from "../Modal/AddNegotationsModal";
import { useState } from "react";

function Negotations() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const handleOpenOffcanvas = () => setShowOffcanvas(true);

  const handleCloseOffcanvas = () => setShowOffcanvas(false);

  return (
    <div className="tab-content site">
      <div className="tab-pane active show" id="tabs-home-7">
        <div>
          <div style={{ paddingBottom: "20px" }}>
            <AddNegotationsModal
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
              Add Negotations &nbsp;
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
              >
                <path
                  d="M10.5 3L10.5 17"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M3.5 10H17.5"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table card-table table-vcenter text-nowrap datatable">
            <thead>
              <tr>
                <th>Title</th>
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

export default Negotations;
