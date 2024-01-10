import { Offcanvas } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import CircularProgress from "@mui/material/CircularProgress";
import {
  siteVisitQualification,
  submitSiteVisit,
} from "../../../../services/leadMangement";
import { FileUploader } from "../../../Modal/FileUploader";

function AddSiteVisitModal({
  show,
  close,
  title,
  setIsRefetch,
  isRefetch,
  companyID,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    title: "",
    files: "",
    note: "",
    time: "",
    date: "",
    qualification: [],
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Title is required")
        .test(
          "is-not-blank",
          "Title must not contain only blank spaces",
          (value) => {
            return /\S/.test(value); // Checks if there is at least one non-whitespace character
          }
        ),
      files: Yup.mixed()
        .required("Please upload  file")
        .test("fileSize", "File size must not exceed 50MB", (value) => {
          if (!value) {
            // Handle the case where no file is provided
            return true;
          }

          // Check if the file size is less than or equal to 50MB
          return value && value.size <= 50 * 1024 * 1024; // 50MB in bytes
        }),
      note: Yup.string()
        .required("Note is required")
        .test(
          "is-not-blank",
          "Note must not contain only blank spaces",
          (value) => {
            return /\S/.test(value); // Checks if there is at least one non-whitespace character
          }
        ),
      time: Yup.string().required("Time is required"),
      date: Yup.string().required("Date is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);

      if (!isLoading) {
        try {
          const formdata = new FormData();
          formdata.append("company", companyID);
          formdata.append("title", values.title);
          formdata.append("attachment", values.files);
          formdata.append("note", values.note);
          formdata.append("date", values.date);
          formdata.append("time", `${values.time}:00`);
          formdata.append("qualifications", values.qualification);
          // console.log(formdata.getAll("qualifications"));
          const response = await submitSiteVisit(formdata);

          if (response) {
            setIsLoading(false);
            // window.location.reload();
            setIsRefetch(!isRefetch);
            toast.success("Site visit Added Successfully.");
            close();
            resetForm();
          } else {
            console.error("Error while creating Admin:", response.error);
            setIsLoading(false);
          }
          setIsLoading(false);
        } catch (err) {
          toast.error(err.message);
          console.log(err);

          setIsLoading(false);
        }
      }
    },
  });

  const handleFileChange = (file) => {
    formik.setFieldValue("files", file[0]);
  };

  return (
    <Offcanvas
      show={show}
      onHide={() => {
        close();
        formik.setFieldValue("title", "");
        formik.setFieldValue("files", "");
        formik.setFieldValue("note", "");
        formik.setFieldValue("time", "");
        formik.setFieldValue("date", "");
        formik.setFieldValue("qualification", []);
      }}
      placement="end"
      style={{ overflow: "auto" }}
    >
      <Offcanvas.Header
        closeButton
        style={{ border: "0px", paddingBottom: "0px" }}
      >
        <Offcanvas.Title>Add Site visit </Offcanvas.Title>
      </Offcanvas.Header>
      <form action="" onSubmit={formik.handleSubmit}>
        <div style={{ margin: "20px" }}>
          <label
            htmlFor=""
            style={{ paddingBottom: "10px", fontWeight: "500" }}
          >
            Title
          </label>
          <input
            type="text"
            placeholder="Title"
            className="form-control"
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            maxLength={20}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="error">{formik.errors.title}</div>
          ) : null}
        </div>
        <FileUploader formik={formik} handleFileChange={handleFileChange} />
        <div className="upload-filename">
          <label htmlFor="">Uploaded File: </label>
          <span className="mx-2">{formik.values.files?.name}</span>
        </div>

        <div style={{ margin: "20px" }}>
          <label
            htmlFor=""
            style={{ paddingBottom: "10px", fontWeight: "500" }}
          >
            Notes
          </label>
          <textarea
            cols="30"
            rows="5"
            placeholder="Notes"
            className="form-control"
            name="note"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.note}
            // maxLength={20}
          ></textarea>
          {formik.touched.note && formik.errors.note ? (
            <div className="error">{formik.errors.note}</div>
          ) : null}
        </div>
        <div style={{ margin: "20px" }}>
          <label
            htmlFor=""
            style={{ paddingBottom: "10px", fontWeight: "500" }}
          >
            Date
          </label>
          <input
            type="date"
            className="form-control"
            name="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.date}
          />
          {formik.touched.date && formik.errors.date ? (
            <div className="error">{formik.errors.date}</div>
          ) : null}
        </div>
        <div style={{ margin: "20px" }}>
          <label
            htmlFor=""
            style={{ paddingBottom: "10px", fontWeight: "500" }}
          >
            Time
          </label>
          <input
            type="time"
            className="form-control"
            name="time"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.time}
          />
          {formik.touched.time && formik.errors.time ? (
            <div className="error">{formik.errors.time}</div>
          ) : null}
        </div>
        {/* <div className="qualification p-4">
          <h4>Qualifications</h4>
          <div className="qualification_list">
            <div className="qualification_row row">
              {qualificationlist.map((data) => (
                <div className="qualification_1 col-12" key={data.id}>
                  <div className="svg_box">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                    >
                      <circle
                        cx="10.5003"
                        cy="10.4993"
                        r="2.33333"
                        stroke="#6E7070"
                        stroke-width="2"
                      />
                      <path
                        d="M15.1663 17.4993C15.1663 18.788 15.1663 19.8327 10.4997 19.8327C5.83301 19.8327 5.83301 18.788 5.83301 17.4993C5.83301 16.2107 7.92235 15.166 10.4997 15.166C13.077 15.166 15.1663 16.2107 15.1663 17.4993Z"
                        stroke="#6E7070"
                        stroke-width="2"
                      />
                      <path
                        d="M2.33301 13.9993C2.33301 9.59957 2.33301 7.39969 3.69984 6.03285C5.06668 4.66602 7.26657 4.66602 11.6663 4.66602H16.333C20.7328 4.66602 22.9327 4.66602 24.2995 6.03285C25.6663 7.39969 25.6663 9.59957 25.6663 13.9993C25.6663 18.3991 25.6663 20.599 24.2995 21.9658C22.9327 23.3327 20.7328 23.3327 16.333 23.3327H11.6663C7.26657 23.3327 5.06668 23.3327 3.69984 21.9658C2.33301 20.599 2.33301 18.3991 2.33301 13.9993Z"
                        stroke="#6E7070"
                        stroke-width="2"
                      />
                      <path
                        d="M22.167 14H17.5003"
                        stroke="#6E7070"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                      <path
                        d="M22.167 10.5H16.3337"
                        stroke="#6E7070"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M22.167 17.5H18.667"
                        stroke="#6E7070"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p className="quanlification_heading">{data.name}</p>
                    <p className="qualification_content">
                      {data.short_description}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    name="qualification"
                    id={`qualification_${data.id}`}
                    className="form-check-input"
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      formik.setFieldValue(
                        "qualification",
                        isChecked
                          ? [...formik.values.qualification, data.id]
                          : formik.values.qualification.filter(
                              (id) => id !== data.id
                            )
                      );
                    }}
                    onBlur={formik.handleBlur}
                    checked={formik.values.qualification?.includes(data.id)}
                  />
                </div>
              ))}
              {formik.touched.qualification && formik.errors.qualification ? (
                <div className="error">{formik.errors.qualification}</div>
              ) : null}
            </div>
          </div>
        </div> */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "282px",
            justifyContent: "center",
            alignItems: "end",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "10px",
              marginLeft: "13px",
              marginRight: "10px",
              width: "100%",
              padding: "5px",
            }}
          >
            <button
              className="btn btn-success"
              style={{
                flex: 1,
                margin: "0 5px",
                width: "calc(50% - 5px)",
                backgroundColor: "#006875",
              }}
            >
              {isLoading ? <CircularProgress /> : "Add"}
            </button>
          </div>
        </div>
      </form>
    </Offcanvas>
  );
}

export default AddSiteVisitModal;
