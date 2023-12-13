import { OnboardContext } from "../../Context/OnboardContext";
import { getMiscellaneousList } from "../../services/leadMangement";
import AddOthersModal from "../Modal/AddOthersModal";
import { useContext, useEffect, useState } from "react";

export default function Notes() {
  const { vendorId, companyID } = useContext(OnboardContext);
  const [isRefetch, setIsRefetch] = useState(false);
  console.log(companyID);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const handleOpenOffcanvas = () => setShowOffcanvas(true);

  const handleCloseOffcanvas = () => setShowOffcanvas(false);

  const [miscellaneousList, setMiscellaneousList] = useState();

  useEffect(() => {
    getMiscellaneousList(companyID)
      .then((data) => {})
      .catch((error) => {
        console.error("Error fetching  data:", error);
      });
  }, [isRefetch]);

  return (
    <div class="tab-content note">
      <div class="tab-pane active show" id="tabs-home-7">
        <div>
          <div style={{ paddingBottom: "20px" }}>
            <AddOthersModal
              show={showOffcanvas}
              close={handleCloseOffcanvas}
              isRefetch={isRefetch}
              setIsRefetch={setIsRefetch}
            />
            <button
              onClick={handleOpenOffcanvas}
              class="btn"
              style={{
                backgroundColor: "#187AF7",
                color: "white",
                fontWeight: "700",
                fontSize: "16px",
                borderRadius: "6px",
                width: "215px",
              }}
            >
              Add Attachment &nbsp;
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M10 3L10 17"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M3 10H17"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table card-table table-vcenter text-nowrap datatable">
            <thead>
              <tr>
                <th> Title</th>
                <th>Type</th>
                <th>Date</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="5">
                  <div>
                    <div class="home_contents">
                      <p style={{ fontWeight: "700", fontSize: "16px" }}>
                        No Attachment / Note Found
                      </p>
                      <p style={{ fontSize: "14px", color: "#68727D" }}>
                        Add Your Attachment / Note here
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
