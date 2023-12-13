import React from "react";
import DropZone from "../Common/DropZone";

function NegotiationForm({ title, formik }) {
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
                          name="negotiationTitle"
                          value={formik.values.negotiationTitle || ""}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.negotiationTitle &&
                        formik.errors.negotiationTitle ? (
                          <div className="error">
                            {formik.errors.negotiationTitle}
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
                        name="negotiationNote"
                        value={formik.values.negotiationNote || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="negotiationNote"
                        cols="10"
                        rows="10"
                        placeholder="Notes"
                        className="form-control"
                      ></textarea>
                      {formik.touched.negotiationNote &&
                      formik.errors.negotiationNote ? (
                        <div className="error">
                          {formik.errors.negotiationNote}
                        </div>
                      ) : null}
                    </div>
                    {/* <div
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
                          name="negotiationDate"
                          value={formik.values.negotiationDate || ""}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          id="negotiationDate"
                          className="form-control"
                        />
                        {formik.touched.negotiationDate &&
                        formik.errors.negotiationDate ? (
                          <div className="error">
                            {formik.errors.negotiationDate}
                          </div>
                        ) : null}
                      </div>

                      <div style={{ width: "48%" }}>
                        <label htmlFor="" className="form-label">
                          Time
                        </label>
                        <input
                          type="time"
                          name="negotiationTime"
                          value={formik.values.negotiationTime || ""}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          id="negotiationTime"
                          className="form-control"
                        />
                        {formik.touched.negotiationTime &&
                        formik.errors.negotiationTime ? (
                          <div className="error">
                            {formik.errors.negotiationTime}
                          </div>
                        ) : null}
                      </div>
                    </div> */}
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

export default NegotiationForm;
