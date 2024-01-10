import { Offcanvas } from "react-bootstrap";
import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { FileUploader } from "../../../Modal/FileUploader";
import { submitProposal } from "../../../../services/leadMangement";

function AddProposalModal({ show, close, isRefetch, setIsRefetch, companyID }) {
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
      // time: Yup.string().required("Time is required"),
      // date: Yup.string().required("Date is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);

      if (!isLoading) {
        try {
          const data = {
            company: companyID,
            title: values.title,
            note: values.note,
            attachment: values.files,
          };

          const adminData = await submitProposal(data);

          if (adminData) {
            setIsLoading(false);
            // window.location.reload();
            setIsRefetch(!isRefetch);
            toast.success("Proposal Added Successfully.");
            close();
            resetForm();
          } else {
            console.error("Error while creating Admin:", adminData.error);
            setIsLoading(false);
          }
          setIsLoading(false);
        } catch (err) {
          console.log(err);
          toast.error(err.message);

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
      }}
      placement="end"
      style={{ overflow: "auto" }}
    >
      <Offcanvas.Header
        closeButton
        style={{ border: "0px", paddingBottom: "0px" }}
      >
        <Offcanvas.Title>Add Proposal </Offcanvas.Title>
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
            name="note"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.note}
            id=""
            cols="30"
            rows="5"
            placeholder="Notes"
            className="form-control"
            // maxLength={20}
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
          <input type="date" name="" id="" className="form-control" />
        </div>
        <div style={{ margin: "20px" }}>
          <label
            htmlFor=""
            style={{ paddingBottom: "10px", fontWeight: "500" }}
          >
            Time
          </label>
          <input type="time" name="" id="" className="form-control" />
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
              type="submit"
            >
              {isLoading ? <CircularProgress /> : "Add"}
            </button>
          </div>
        </div>
      </form>
    </Offcanvas>
  );
}

export default AddProposalModal;
