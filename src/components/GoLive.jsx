import React from "react";

function GoLive() {
  return (
    <div className="card col-10 add_details">
      <div className="card-body">
        <div className="tab-content home">
          <div className="tab-pane active show" id="tabs-home-7">
            <div>
              <div className="page-body" style={{ backgroundColor: "white" }}>
                <div className="container-xl">
                  <div>
                    <div className="tab-pane active show" id="tabs-home-7">
                      <div>
                        <div className="home_contents">
                          <p style={{ fontWeight: "700", fontSize: "16px" }}>
                            Go Live with Vendor
                          </p>
                          <p style={{ fontSize: "14px", color: "#68727D" }}>
                            Activate your vendor and start selling today
                          </p>
                          <button
                            className="btn"
                            style={{
                              backgroundColor: "#006875",
                              color: "white",
                              borderRadius: "6px",
                              width: "125px",
                            }}
                          >
                            Go Live
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoLive;
