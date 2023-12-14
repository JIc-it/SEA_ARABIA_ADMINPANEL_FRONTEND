import { Offcanvas } from "react-bootstrap";
// import DropZone from "../Common/DropZone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext, useEffect, useState } from "react";
import {
  addMiscellaneousAttachment,
  getMiscellaneousTypeList,
} from "../../../services/leadMangement";
import DropZone from "../../Common/DropZone";
import { FileUploader } from "../../Modal/FileUploader";
import { toast } from "react-toastify";
import { OnboardContext } from "../../../Context/OnboardContext";

function AddMiscellaneous({ show, close, setIsRefetch, isRefetch }) {
  const { vendorId, companyID } = useContext(OnboardContext);
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    title: "",
    // type: "",
    files: "",
    note: "",
    // time: "",
    // date: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      files: Yup.string().required("Please upload at least one file"),
      note: Yup.string().required("Note is required"),
      // time: Yup.string().required("Time is required"),
      // date: Yup.string().required("Date is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      setIsLoading(true);

      if (!isLoading) {
        try {
          const data = {
            company: companyID,
            title: values.title,
            note: values.note,
            attachment: values.files,
          };

          const adminData = await addMiscellaneousAttachment(data);

          if (adminData) {
            setIsLoading(false);
            // window.location.reload();
            setIsRefetch(!isRefetch);
            toast.success("Attachment Added Successfully.");
            close();
            resetForm();
          } else {
            console.error("Error while creating Admin:", adminData.error);
            setIsLoading(false);
          }
          setIsLoading(false);
        } catch (err) {
          console.log(err);

          setIsLoading(false);
        }
      }
    },
  });
  console.log(formik);
  const handleFileChange = (file) => {
    console.log(file[0]);
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
      }}
      placement="end"
      style={{ overflow: "auto" }}
    >
      <Offcanvas.Header
        closeButton
        style={{ border: "0px", paddingBottom: "0px" }}
      >
        <Offcanvas.Title>Add Attachment / Notes </Offcanvas.Title>
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
        {/* <div style={{ margin: "20px" }}>
          <DropZone formik={formik} />
        </div> */}
        {/* <div style={{ margin: "20px" }}>
          <label
            htmlFor=""
            style={{ paddingBottom: "10px", fontWeight: "500" }}
          >
            Files
          </label>
          <input
            type="file"
            multiple
            className="form-control"
            name="files"
            onChange={handleFileChange}
            onBlur={formik.handleBlur}
            // Note: You cannot set the value of a file input programmatically for security reasons
          />
          {formik.touched.files && formik.errors.files ? (
            <div className="error">{formik.errors.files}</div>
          ) : null}
        </div> */}
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
          ></textarea>
          {formik.touched.note && formik.errors.note ? (
            <div className="error">{formik.errors.note}</div>
          ) : null}
        </div>
        {/* <div style={{ margin: "20px" }}>
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
        </div> */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "192px",
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
              type="submit"
              style={{
                flex: 1,
                margin: "0 5px",
                width: "calc(50% - 5px)",
                backgroundColor: "#006875",
              }}
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </Offcanvas>
  );
}

export default AddMiscellaneous;
