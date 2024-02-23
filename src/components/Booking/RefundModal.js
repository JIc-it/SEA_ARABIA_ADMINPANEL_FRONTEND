import React, {useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { updateRefund } from "../../services/booking"
import { useFormik } from "formik";
import * as Yup from "yup";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { Radio, Paper, Typography, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";


const offcanvasStyle = {
    width: "365px",
    height: "100%",
    display: "flex",
    marginLeft: 18,
    marginTop: 20,
    flexDirection: "column",
};

export default function RefundModal({
    open,
    setOpen,
    bookingId
}) {
    const [isLoading, setIsLoading] = useState(false);
    const navigate=useNavigate()    
    const validationSchema = Yup.object({
            refund_amount: Yup.number()
            .required('Amount Required')
            .min(1, 'Value must be greater than or equal to 1')
            .max(100000,"Maximum 1 Lakh")
            ,
            refund_details: Yup.string().trim()
            .required("Details is required"),
    });

    const formik = useFormik({
        initialValues: {
            refund_type: "Partial Amount",
            refund_amount:"",
            refund_details:"",
        },
        validationSchema,
        onSubmit: async (values,{resetForm}) => {
          setIsLoading(true);
          if (!isLoading) {
            try {
              const data = {
                  refund_type: values.refund_type,
                  refund_amount: values.refund_amount,
                  refund_details: values.refund_details,
              };

              const resetData = await updateRefund(bookingId,data);
              if (resetData) {
                toast.success("Initiated successfully!");
                setOpen(false);
                setIsLoading(false);
                resetForm();
                navigate("/refunds-history")
              } else {
                console.error("Error while creating Admin:", resetData.error);
                setIsLoading(false);
              }
              setIsLoading(false);
            } catch (err) {
              console.log(err);
              toast.error(err.response.data.error);
              setIsLoading(false);
            }
          }
        },
    });

    const handleCloseOffcanvas = () => {
        setOpen(false);
        setIsLoading(false);
        formik.resetForm({
            values: {
                refund_type: "Partial Amount",
                refund_amount: "",
                refund_details: "",
            },
        });
    };
    
    return (
        <Offcanvas
            show={open}
            onHide={handleCloseOffcanvas}
            placement="end"
            style={{ overflow: "auto" }}
        >
            <Offcanvas.Header
                style={{ borderBottom:"none" }}
                closeButton
                onClick={handleCloseOffcanvas}
            >
                <h4 style={{ marginTop: 5 }}>Refund</h4>
            </Offcanvas.Header>
            <form onSubmit={formik.handleSubmit}>
                <div style={offcanvasStyle}>
                    <h5>Refund Type</h5>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Paper
                              onClick={() => formik.setFieldValue("refund_type","Partial Amount")}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                cursor: "pointer",
                                border: '1px solid lightgray',
                                width: "50%",
                                border: formik.values.refund_type==="Partial Amount" ? '2px solid rgb(112, 112, 241)' : '1px solid lightgray',
                                padding: '5px',
                                margin: "5px"
                            }}
                        >
                            <Typography variant="body1" sx={{ fontSize: "12px", fontWeight: "550" }}>Partial Amount</Typography>
                            <Radio name={formik.values.refund_type} checked={formik.values.refund_type==="Partial Amount"} />
                        </Paper>
                        <Paper
                            onClick={() => formik.setFieldValue("refund_type","Full Amount")}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                cursor: "pointer",
                                border: '1px solid lightgray',
                                width: "50%",
                                border: formik.values.refund_type==="Full Amount" ? '2px solid rgb(112, 112, 241)' : '1px solid lightgray',
                                padding: '5px',
                                margin: "5px"
                            }}
                        >
                            <Typography variant="body1" sx={{ fontSize: "12px", fontWeight: "550" }}>Full Amount</Typography>
                            <Radio name={formik.values.refund_type} checked={formik.values.refund_type==="Full Amount"} />
                        </Paper>
                    </Box>

                    <div style={{ marginTop: 7 }}>
                    <h5 style={{ marginTop: 10 }}>Refund Amount</h5>
                        <input
                            type="number"
                            placeholder="Amount"
                            name="refund_amount"
                            className="form-control"
                            value={formik.values.refund_amount}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.refund_amount && formik.errors.refund_amount ? (
                            <div className="error">{formik.errors.refund_amount}</div>
                        ) : null}
                    </div>
                    <div style={{ marginTop: 7 }}>
                    <h5 style={{ marginTop: 10 }}>Refund Details</h5>
                        <textarea
                            placeholder="Details"
                            name="refund_details"
                            className="form-control"
                            value={formik.values.refund_details}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.refund_details && formik.errors.refund_details ? (
                            <div className="error">{formik.errors.refund_details}</div>
                        ) : null}
                    </div>
                  
                    <button
                        type="submit"
                        className='m-1 btn btn-small'
                        style={{
                            backgroundColor: "#006875", color: "white",
                            flex: 1,
                            width: "93%",
                            bottom: "1rem",
                            position: "absolute",
                        }}
                    >
                        {isLoading ? <CircularProgress style={{ width: "20px", height: "20px" }} /> : "Confirm"}
                    </button>
                </div>
            </form>
        </Offcanvas>
    );
}
