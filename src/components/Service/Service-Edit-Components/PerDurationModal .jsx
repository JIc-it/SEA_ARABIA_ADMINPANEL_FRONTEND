import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css'
import { useFormik } from "formik";
import * as Yup from "yup";
import CircularProgress from "@mui/material/CircularProgress";
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "70%",
    bgcolor: 'background.paper',
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
    overflowY: 'auto', // Add this line for vertical scroll
    maxHeight: '90vh', // Adjust the maximum height if needed
};


export default function PerDurationModal({ handleClose, handleOpen, open, formiks }) {
    const Params = useParams()
    const [isLoading, setIsLoading] = useState(false);

    
    const validationSchema = Yup.object({
        name: Yup.string()
            .required("Name is required")
            .max(20, "Name must be at most 20 characters"),
        price: Yup.number()
            .required("Price is required"),
        duration_hour: Yup.number()
            .required("Duration is required"),
        duration_minute: Yup.number()
            .required("Minute is required"),
    });

    const formik = useFormik({
        initialValues: {
            id: uuidv4(),
            service: Params.id,
            is_active: false,
            name: "",
            price: null,
            duration_hour: null,
            duration_minute: null

        },
        validationSchema,
        onSubmit: async (values) => {

            formiks((prev) => {
                const datas = {
                    // id: values.id,
                    // service: Params.id,
                    is_active: values.is_active,
                    location: values.location,
                    name: values.name,
                    price: values.price,
                    duration_hour: values.duration_hour,
                    duration_minute: values.duration_minute
                }

                if (prev.service_price_service) {
                    return {
                        ...prev, service_price_service: [...prev.service_price_service, datas]
                    }
                }
                else {
                    return { ...prev, service_price_service: [datas] }
                }

            })
            handleClose()



        },
    });

    let duration = []
    for (let i = 0; i <= 23; i++) {
        duration.push(i)
    }
    let minute = []
    for (let i = 0; i <= 59; i++) {
        minute.push(i)
    }

   
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    return (
        <>
            {!isLoading && <div >

                <Modal style={{ width: "100vw" }}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={style}>
                        <Typography variant="p" component="p" sx={{ fontWeight: 800 }}>
                            Add Price
                        </Typography>
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                            sx={{ position: 'absolute', top: 8, right: 14 }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <form onSubmit={formik.handleSubmit}>

                            <div className='d-flex  align-items-center mt-2'>

                                <div className='w-50 mx-1'>
                                    <label
                                        htmlFor=""
                                        style={{ paddingBottom: "10px", fontWeight: "600", fontSize: "13px" }}
                                    >
                                        Name <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.name && formik.errors.name ? (
                                        <div className="error">{formik.errors.name}</div>
                                    ) : null}
                                </div>

                                <div className='w-50 mx-1'>
                                    <label
                                        htmlFor=""
                                        style={{ paddingBottom: "10px", fontWeight: "600", fontSize: "13px" }}
                                    >
                                        Price <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        className="form-control"
                                        placeholder="Price"
                                        value={formik.values.price}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.price && formik.errors.price ? (
                                        <div className="error">{formik.errors.price}</div>
                                    ) : null}
                                </div>


                            </div>

                            <div className='d-flex  align-items-center mt-2'>

                                <div className='w-50 mx-1'>
                                    <label
                                        htmlFor=""
                                        style={{ paddingBottom: "10px", fontWeight: "600", fontSize: "13px" }}
                                    >
                                        Duration <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <select

                                        name="duration_hour"
                                        className="form-control"
                                        placeholder="Name"
                                        value={formik.values.duration_hour}
                                        onChange={(e) => formik.setFieldValue('duration_hour', e.target.value)}
                                        onBlur={formik.handleBlur}
                                    >
                                        <option value={null}>Choose</option>
                                        {duration.map((dat, i) =>
                                            <option key={i} value={dat}>{dat}</option>
                                        )}

                                    </select>
                                    {formik.touched.duration_hour && formik.errors.duration_hour ? (
                                        <div className="error">{formik.errors.duration_hour}</div>
                                    ) : null}
                                </div>

                                <div className='w-50 mx-1'>
                                    <label
                                        htmlFor=""
                                        style={{ paddingBottom: "10px", fontWeight: "600", fontSize: "13px" }}
                                    >
                                        <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <select

                                        name="duration_minute"
                                        className="form-control"
                                        placeholder="Name"
                                        value={formik.values.duration_minute}
                                        onChange={(e) => formik.setFieldValue('duration_minute', e.target.value)}
                                        onBlur={formik.handleBlur}
                                    >
                                        <option value={null}>Choose</option>
                                        {minute.map((dat, i) =>
                                            <option key={i} value={dat}>{dat}</option>
                                        )}
                                    </select>
                                    {formik.touched.duration_minute && formik.errors.duration_minute ? (
                                        <div className="error">{formik.errors.duration_minute}</div>
                                    ) : null}
                                </div>


                            </div>

                            <div className='d-flex justify-content-end mt-3'>
                                <button type='reset' className='m-1 btn btn-small btn-white' onClick={handleClose}>cancel</button>
                                <button type='submit' className='m-1 btn btn-small' style={{ backgroundColor: "#006875", color: "white" }}>Confirm</button>
                            </div>
                        </form>
                    </Box>

                </Modal>
            </div>}
            {isLoading &&
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CircularProgress />
                </div>
            }
        </>
    );
}
