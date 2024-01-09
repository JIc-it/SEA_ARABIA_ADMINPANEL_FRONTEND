import { Offcanvas } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext, useEffect, useState } from "react";
import { updateSiteVisitAttachment } from "../../../services/leadMangement";
import { FileUploader } from "../../Modal/FileUploader";
import { toast } from "react-toastify";
import { OnboardContext } from "../../../Context/OnboardContext";
import CircularProgress from "@mui/material/CircularProgress";

function EditSiteVisit({ show, close, setIsRefetch, isRefetch, selectedData }) {
  const { vendorId, companyID } = useContext(OnboardContext);
  const [isLoading, setIsLoading] = useState(false);
  var substringToRemove =
    "https://seaarabia.jicitsolution.com/assets/media/company/site_visit/attachment/";
  const formatedFileName =
    selectedData && selectedData.attachment.replace(substringToRemove, "");

  const formik = useFormik({
    initialValues: {
      title: "",
      type: "",
      files: "",
      note: "",
      time: "",
      date: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required").test(
        "is-not-blank",
        "Title must not contain only blank spaces",
        (value) => {
          return /\S/.test(value); // Checks if there is at least one non-whitespace character
        }
      ),
      // files: Yup.mixed()
      //   .required("Please upload  file")
      //   .test("fileSize", "File size must not exceed 50MB", (value) => {
      //     if (!value) {
      //       // Handle the case where no file is provided
      //       return true;
      //     }

      //     // Check if the file size is less than or equal to 50MB
      //     return value && value.size <= 50 * 1024 * 1024; // 50MB in bytes
      //   }),
      note: Yup.string().required("Note is required").test(
        "is-not-blank",
        "Note must not contain only blank spaces",
        (value) => {
          return /\S/.test(value); // Checks if there is at least one non-whitespace character
        }
      ),
      time: Yup.string().required("Time is required"),
      date: Yup.string().required("Date is required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);

      if (!isLoading) {
        try {
          const data = {
            company: companyID,
            title: values.title,
            note: values.note,
            attachment: values.files ? values.files : selectedData.attachment,
            time: values.time,
            date: values.date,
          };

          const adminData =
            selectedData &&
            (await updateSiteVisitAttachment(selectedData.id, data));

          if (adminData) {
            setIsLoading(false);
            // window.location.reload();
            setIsRefetch(!isRefetch);
            toast.success("Site visit Updated Successfully.");
            close();
          } else {
            toast.error("Site visit Updation failed.");
            console.error("Error while creating Admin:", adminData.error);
            setIsLoading(false);
          }
          setIsLoading(false);
        } catch (err) {
          toast.error(err.response.data.error);
          console.log(err);

          setIsLoading(false);
        }
      }
    },
  });

  const handleFileChange = (file) => {
    formik.setFieldValue("files", file[0]);
  };

  useEffect(() => {
    if (selectedData) {
      formik.setFieldValue("title", selectedData.title);
      formik.setFieldValue("note", selectedData.note);
      formik.setFieldValue("date", selectedData.date);
      formik.setFieldValue("time", selectedData.time);
      //   formik.setFieldValue("files", selectedData.attachment);
    }
  }, [selectedData]);

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
      }}
      placement="end"
      style={{ overflow: "auto" }}
    >
      <Offcanvas.Header
        closeButton
        style={{ border: "0px", paddingBottom: "0px" }}
      >
        <Offcanvas.Title>Edit Site Visit </Offcanvas.Title>
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
          <span className="mx-2">
            {formik.values.files
              ? formik.values.files.name
              : selectedData && formatedFileName}
          </span>
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
              {" "}
              {isLoading ? <CircularProgress /> : " Edit"}
            </button>
          </div>
        </div>
      </form>
    </Offcanvas>
  );
}

export default EditSiteVisit;
