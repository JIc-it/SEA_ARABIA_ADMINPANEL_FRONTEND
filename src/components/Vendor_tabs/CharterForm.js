import React from "react";
import DropZone from "../Common/DropZone";
// import "../static/css/site_visit.css";

function CharterForm({ title, isAllowProceed, setIsAllowProceed, formik }) {
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
                          name="charterTitle"
                          value={formik.values.charterTitle || ""}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.charterTitle &&
                        formik.errors.charterTitle ? (
                          <div className="error">
                            {formik.errors.charterTitle}
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
                        name="charterNote"
                        value={formik.values.charterNote || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="charterNote"
                        cols="10"
                        rows="10"
                        placeholder="Notes"
                        className="form-control"
                      ></textarea>
                      {formik.touched.charterNote &&
                      formik.errors.charterNote ? (
                        <div className="error">
                          {formik.errors.charterNote}
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
                          name="charterDate"
                          value={formik.values.charterDate || ""}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          id="charterDate"
                          className="form-control"
                        />
                        {formik.touched.charterDate &&
                        formik.errors.charterDate ? (
                          <div className="error">
                            {formik.errors.charterDate}
                          </div>
                        ) : null}
                      </div>

                      <div style={{ width: "48%" }}>
                        <label htmlFor="" className="form-label">
                          Time
                        </label>
                        <input
                          type="time"
                          name="charterTime"
                          value={formik.values.charterTime || ""}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          id="charterTime"
                          className="form-control"
                        />
                        {formik.touched.charterTime &&
                        formik.errors.charterTime ? (
                          <div className="error">
                            {formik.errors.charterTime}
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

export default CharterForm;
