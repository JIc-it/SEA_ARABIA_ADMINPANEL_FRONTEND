import { Offcanvas } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext, useEffect, useState } from "react";
import { updateNegotiationAttachment } from "../../../services/leadMangement";
import { FileUploader } from "../../Modal/FileUploader";
import { toast } from "react-toastify";
import { OnboardContext } from "../../../Context/OnboardContext";
import CircularProgress from "@mui/material/CircularProgress";

function EditNegotiation({
  show,
  close,
  setIsRefetch,
  isRefetch,
  selectedData,
}) {
  const { vendorId, companyID } = useContext(OnboardContext);
  const [isLoading, setIsLoading] = useState(false);
  var substringToRemove =
    "https://seaarabia.jicitsolution.com/assets/media/company/negotiation/attachment/";
  const formatedFileName =
    selectedData && selectedData.attachment.replace(substringToRemove, "");

  const formik = useFormik({
    initialValues: {
      title: "",
      type: "",
      files: "",
      note: "",
      // time: "",
      // date: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required").test(
        "is-not-blank",
        "Title must not contain only blank spaces",
        (value) => {
          return /\S/.test(value); // Checks if there is at least one non-whitespace character
        }
      ),
      //   files: Yup.string().required("Please upload  file"),
      note: Yup.string().required("Note is required").test(
        "is-not-blank",
        "Note must not contain only blank spaces",
        (value) => {
          return /\S/.test(value); // Checks if there is at least one non-whitespace character
        }
      ),
      // time: Yup.string().required("Time is required"),
      // date: Yup.string().required("Date is required"),
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
          };

          const adminData =
            selectedData &&
            (await updateNegotiationAttachment(selectedData.id, data));

          if (adminData) {
            setIsLoading(false);

            setIsRefetch(!isRefetch);
            toast.success("Negotiation updated Successfully.");
            close();
          } else {
            toast.error("Negotiation updateion failed!.");
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
      }}
      placement="end"
      style={{ overflow: "auto" }}
    >
      <Offcanvas.Header
        closeButton
        style={{ border: "0px", paddingBottom: "0px" }}
      >
        <Offcanvas.Title>Edit Attachment / Notes </Offcanvas.Title>
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
          <span className="mx-2" style={{ wordBreak: "break-all" }}>
            {formik.values.files ? formik.values.files.name : formatedFileName}
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
              {isLoading ? <CircularProgress /> : "Edit"}
            </button>
          </div>
        </div>
      </form>
    </Offcanvas>
  );
}

export default EditNegotiation;
