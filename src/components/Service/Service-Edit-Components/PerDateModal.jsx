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


export default function PerDateModal({ handleClose, handleOpen, open, formiks }) {
    const Params = useParams()
    const [startdate,setStartDate]=useState("")
    const [enddate,setEndDate]=useState("")
    const [isLoading, setIsLoading] = useState(false);

    const validationSchema = Yup.object({
        name: Yup.string()
            .required("Name is required")
            .max(20, "Name must be at most 20 characters"),
        price: Yup.number()
            .required("Price is required")
            .min(1, 'Must be greater than zero')
            .max(100000, 'Not Greater Than 1 Lakh'),
        date: Yup.string()
            .required("Date is required"),
        end_date: Yup.string().when("is_range", ([is_range], schema) => {
                if (is_range ===true) {
                    return schema
                        .required("End Date is Required")
                }
                else {
                    return schema.notRequired();
                }
            }),
    });

    const formik = useFormik({
        initialValues: {
            id: uuidv4(),
            service: Params.id,
            is_active: false,
            name: "",
            price: null,
            is_range: false,
            date: null,
            end_date: null

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
                    date: values.date,
                    end_date: values.end_date
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



    let startdates=[]
    for(let i=1;i<=31;i++){
        startdates.push(i)
    }
    let enddates=[]
    for(let i=1;i<=31;i++){
        enddates.push(i)
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
                                            formik.setFieldValue("end_date",null)
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
                                                Date <span style={{ color: "red" }}>*</span>
                                            </label>
                                            <select
                                                
                                                name="date"
                                                className="form-control"
                                                placeholder="Name"
                                                value={formik.values.date}
                                                onChange={(e) => formik.setFieldValue('date', e.target.value)}
                                                onBlur={formik.handleBlur}
                                            >
                                                <option value={null}>Choose</option>
                                            {startdates.map((dat,i)=>
                                            <option key={i} value={dat}>{dat}</option>
                                            )}

                                            </select>
                                            {formik.touched.date && formik.errors.date ? (
                                                <div className="error">{formik.errors.date}</div>
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
                                                disabled={!formik.values.is_range}
                                                name="end_date"
                                                className="form-control"
                                                placeholder="Name"
                                                value={formik.values.end_date}
                                                onChange={(e) => formik.setFieldValue('end_date', e.target.value)}
                                                onBlur={formik.handleBlur}
                                            >
                                                <option value={null}>Choose</option>
                                             {enddates.map((dat,i)=>
                                            <option key={i} value={dat}>{dat}</option>
                                            )}
                                            </select>
                                            {formik.touched.end_date && formik.errors.end_date ? (
                                                <div className="error">{formik.errors.end_date}</div>
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
