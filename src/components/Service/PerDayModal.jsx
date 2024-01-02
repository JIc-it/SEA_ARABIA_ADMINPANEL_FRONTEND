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
    overflowY: 'auto', 
    maxHeight: '90vh', 
};


export default function PerDayModal({ handleClose, handleOpen, open, formiks }) {
    const Params = useParams()
    const [isLoading, setIsLoading] = useState(false);

    const validationSchema = Yup.object({
        name: Yup.string()
            .required("Name is required")
            .max(20, "Name must be at most 20 characters"),
        price: Yup.number()
            .required("Price is required"),
        day: Yup.string()
            .required("Day is required"),
        end_day: Yup.string().when("is_range", ([is_range], schema) => {
                if (is_range ===true) {
                    return schema
                        .required("End Day is Required")
                }
                else {
                    return schema.notRequired();
                }
            }),
    });

    const formik = useFormik({
        initialValues: {
            // id: uuidv4(),
            // service: Params.id,
            is_active: false,
            name: "",
            price: null,
            is_range: false,
            day: null,
            end_day: null

        },
        validationSchema,
        onSubmit: async (values) => {

            formiks((prev) => {
                const datas = {
                    // id: values.id,
                    // service: Params.id,
                    is_active: values.is_active,
                    is_range: values.is_range,
                    name: values.name,
                    price: values.price,
                    day: values.day,
                    end_day: values.end_day
                }


                return {
                    ...prev, service_price_service: [...prev.service_price_service, datas]
                }
            })
            handleClose()



        },
    });



   
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
                            <div className='d-flex align-items-center mt-3 mx-1'>
                                <div>
                                    <input
                                        type="checkbox"
                                        name="is_range"
                                        className=""
                                        placeholder=""
                                        checked={formik.values.is_range}
                                        value={formik.values.is_range}
                                        onChange={()=>{
                                            formik.setFieldValue("is_range",!formik.values.is_range);
                                            formik.setFieldValue("end_day",null)
                                        }}
                                        onBlur={formik.handleBlur}
                                        style={{ width: "15px", height: "15px" }}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor=""
                                        style={{ paddingBottom: "10px", fontWeight: "600", fontSize: "13px", marginLeft: "5px" }}
                                    >
                                        Is Range <span style={{ color: "red" }}>*</span>
                                    </label>
                                </div>
                                {formik.touched.is_range && formik.errors.is_range ? (
                                    <div className="error">{formik.errors.is_range}</div>
                                ) : null}
                            </div>

                            <div className='d-flex  align-items-center mt-2'>

                                <div className='w-50 mx-1'>
                                    <label
                                        htmlFor=""
                                        style={{ paddingBottom: "10px", fontWeight: "600", fontSize: "13px" }}
                                    >
                                        Day <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <select

                                        name="day"
                                        className="form-control"
                                        placeholder="Day"
                                        value={formik.values.day}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    >
                                        <option value={null}>Choose</option>
                                        <option value="Sunday">Sunday</option>
                                        <option value="Monday">Monday</option>
                                        <option value="Tuesday">Tuesday</option>
                                        <option value="Wednesday">Wednesday</option>
                                        <option value="Thursday">Thursday</option>
                                        <option value="Friday">Friday</option>
                                        <option value="Saturday">Saturday</option>


                                    </select>
                                    {formik.touched.day && formik.errors.day ? (
                                        <div className="error">{formik.errors.day}</div>
                                    ) : null}
                                </div>

                                <div className='w-50 mx-1'>
                                    <label
                                        htmlFor=""
                                        style={{ paddingBottom: "10px", fontWeight: "600", fontSize: "13px" }}
                                    >
                                        End Day<span style={{ color: "red" }}>*</span>
                                    </label>
                                    <select

                                        name="end_day"
                                        className="form-control"
                                        placeholder="Name"
                                        value={formik.values.end_day}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        disabled={formik.values.is_range===false}
                                    >
                                        <option value={null}>Choose</option>
                                        <option value="Sunday">Sunday</option>
                                        <option value="Monday">Monday</option>
                                        <option value="Tuesday">Tuesday</option>
                                        <option value="Wednesday">Wednesday</option>
                                        <option value="Thursday">Thursday</option>
                                        <option value="Friday">Friday</option>
                                        <option value="Saturday">Saturday</option>

                                    </select>
                                    {formik.touched.end_day && formik.errors.end_day ? (
                                        <div className="error">{formik.errors.end_day}</div>
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
