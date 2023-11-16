import React from "react";
import "../static/css/site_visit.css";
import DropZone from "./Common/DropZone";
function CommonAddDetails(Props) {
  return (
    <div className="card col-11 add_details">
      <div className="card-body">
        <div className="tab-content home">
          <div className="tab-pane active show" id="tabs-home-7">
            <div>
              <div className="page-body" style={{ backgroundColor: "white" }}>
                <div className="container-xl">
                  <form action="">
                    <div className="row row-cards">
                      <h4>{Props.title}</h4>

                      <div className="col-lg-12">
                        <label htmlFor="" className="form-label">
                          Title
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Title"
                        />
                      </div>
                      <div className="col-lg-12">
                        <DropZone />
                      </div>
                    </div>
                    <div className="summary">
                      <label htmlFor="" className="form-label">
                        Notes
                      </label>
                      <textarea
                        name=""
                        id=""
                        cols="10"
                        rows="10"
                        placeholder="Notes"
                        className="form-control"
                      ></textarea>
                    </div>
                    <div
                      className="col-lg-12"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "12px",
                      }}
                    >
                      <div style={{ width: "48%" }}>
                        <label htmlFor="" className="form-label">
                          Date
                        </label>
                        <input
                          type="date"
                          name=""
                          id=""
                          className="form-control"
                        />
                      </div>

                      <div style={{ width: "48%" }}>
                        <label htmlFor="" className="form-label">
                          Time
                        </label>
                        <input
                          type="time"
                          name=""
                          id=""
                          className="form-control"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommonAddDetails;
