import React from "react";
import "../static/css/site_visit.css";
import DropZone from "./Common/DropZone";
function CommonAddDetails({ title, formik }) {
  console.log(formik);
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
                      <h4>{title}</h4>

                      <div className="col-lg-12">
                        <label htmlFor="" className="form-label">
                          Title
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Title"
                          name="proposalTitle"
                          value={formik.values.proposalTitle || ""}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.proposalTitle &&
                        formik.errors.proposalTitle ? (
                          <div className="error">
                            {formik.errors.proposalTitle}
                          </div>
                        ) : null}
                      </div>
                      <div className="col-lg-12">
                        <DropZone formik={formik} />
                      </div>
                    </div>
                    <div className="summary">
                      <label htmlFor="" className="form-label">
                        Notes
                      </label>
                      <textarea
                        name="proposalNote"
                        value={formik.values.proposalNote || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="proposalNote"
                        cols="10"
                        rows="10"
                        placeholder="Notes"
                        className="form-control"
                      ></textarea>
                      {formik.touched.proposalNote &&
                      formik.errors.proposalNote ? (
                        <div className="error">
                          {formik.errors.proposalNote}
                        </div>
                      ) : null}
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
                          name="proposalDate"
                          value={formik.values.proposalDate || ""}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          id="proposalDate"
                          className="form-control"
                        />
                        {formik.touched.proposalDate &&
                        formik.errors.proposalDate ? (
                          <div className="error">
                            {formik.errors.proposalDate}
                          </div>
                        ) : null}
                      </div>

                      <div style={{ width: "48%" }}>
                        <label htmlFor="" className="form-label">
                          Time
                        </label>
                        <input
                          type="time"
                          name="proposalTime"
                          value={formik.values.proposalTime || ""}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          id="proposalDate"
                          className="form-control"
                        />
                        {formik.touched.proposalTime &&
                        formik.errors.proposalTime ? (
                          <div className="error">
                            {formik.errors.proposalTime}
                          </div>
                        ) : null}
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
