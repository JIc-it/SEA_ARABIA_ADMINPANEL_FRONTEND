import ModalPop from "../Modal/Modal";
import AddVendorDetails from "../Initial_contact/AddVendorDetails";
import AddSiteVisit from "../Site_visit/AddSiteVisit";

import "../../static/css/site_visit.css";
import CommonAddDetails from "../CommonAddDetails";
import GoLive from "../GoLive";
import VendorList from "../Initial_contact/VendorList";
import ProgressBarComponent from "./ProgressBarComponent";
import { useSelector } from "react-redux";

function ProgressBar() {
  const count = useSelector((state) => state.counter.value);
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
        {count === 2 && <AddSiteVisit />}
        {count === 3 && <CommonAddDetails title="Add Proposal" />}
        {count === 4 && <CommonAddDetails title="Add Negotation" />}
        {count === 5 && <CommonAddDetails title="Add MOU / Charter" />}
        {count === 6 && <GoLive />}

        {/* <VendorList /> */}
        <div className="col-12 actions_menu">
          <ModalPop />
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
