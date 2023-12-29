import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Paper } from '@mui/material';
import { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useFormik } from "formik";
import * as Yup from "yup";
import {AddImage} from "../../services/service"
import CircularProgress from "@mui/material/CircularProgress";
import {getLocationListing} from "../../services/service"

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


export default function PerDestinationEditModal({ handleClose, handleOpen, open,data,formiks }) {
    const [locationlist, setLocationList] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState("")
    const [idset, setIdSet] = useState("")
    const handleSearchChange = (e) => {
        const searchTerm = e.target.value;
        setSearch(searchTerm);
    };

    const validationSchema = Yup.object({
        image: Yup.mixed()        
        .test('fileSize', 'File size is too large', (value) => {
                if (!value) {
                  return false;
                }
                return value.size <= 100 * 1024;
              })
              .test('fileType', 'Invalid file format', (value) => {
                if (!value) {
                  return false;
                }
                return /^image\/(jpeg|png|gif)$/i.test(value.type);
              }),
    });

    useEffect(() => {
        getLocationListing()
            .then((data) =>
                setLocationList(data?.results)
            ).catch((error) =>
                console.error(error))
    }, [])

    const formik = useFormik({
        initialValues: {
            id: data.id,
            service: data.service,
            is_active: data.is_active,
            is_range: data.is_range,
            location: data.location,
            name: data.name,
            price: data.price,
            duration: data.duration_hour,
            minutes: data.duration_minute
           
        },
        // validationSchema,
        onSubmit: async (values) => {
        
            formiks((prev)=>{
                const datas={
                    id: values.id,
                    service: values.service,
                    is_active: values.is_active,
                    is_range: values.is_range,
                    location: values.location,
                    name: values.name,
                    price: values.price,
                    duration_hour:values.duration,
                    duration_minute:values.minutes
                }
                const findindex= prev.service_price_service.some((dat)=>dat.id===data.id);
                let updated=[...prev.service_price_service][findindex];
                updated=datas

                return {
                    ...prev,service_price_service:[updated]
                }
            })
            handleClose()
    
       

        },
    });

    let duration=[]
for(let i=1;i<=23;i++){
    duration.push(i)
}
    let minutes=[]
for(let i=1;i<=59;i++){
    minutes.push(i)
}
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    return (
        <>
       {!isLoading &&  <div >
            
            <Modal style={{width:"100vw"}}
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
               <Box sx={style}>
                    <Typography variant="p" component="p" sx={{ fontWeight: 800 }}>
                        Edit Price
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
                                                placeholder="Name"
                                                value={formik.values.price}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.price && formik.errors.price ? (
                                                <div className="error">{formik.errors.price}</div>
                                            ) : null}
                                        </div>

                                   
                        </div>          
                            <div className='w-50 mx-1 mt-2'>
                                <label
                                    htmlFor=""
                                    style={{ paddingBottom: "10px", fontWeight: "600", fontSize: "13px" }}
                                >
                                    Destination <span style={{ color: "red" }}>*</span>
                                </label>
                                <select
                                    
                                    name="name"
                                    className="form-control"
                                    placeholder="Name"
                                    value={formik.values.location}
                                    onChange={(e) => formik.setFieldValue('location', e.target.value)}
                                    onBlur={formik.handleBlur}
                                >
                                    {locationlist.map((dat,i)=>
                                    <option key={i} value={dat.id}>{dat.name}</option>
                                    )}
                                </select>
                                {formik.touched.name && formik.errors.name ? (
                                    <div className="error">{formik.errors.name}</div>
                                ) : null}
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
                                                
                                                name="duration"
                                                className="form-control"
                                                placeholder="Name"
                                                value={formik.values.duration}
                                                onChange={(e) => formik.setFieldValue('duration', e.target.value)}
                                                onBlur={formik.handleBlur}
                                            >
                                            {duration.map((dat,i)=>
                                            <option key={i} value={dat}>{dat}</option>
                                            )}

                                            </select>
                                            {formik.touched.duration && formik.errors.duration ? (
                                                <div className="error">{formik.errors.duration}</div>
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
                                                
                                                name="minutes"
                                                className="form-control"
                                                placeholder="Name"
                                                value={formik.values.minutes}
                                                onChange={(e) => formik.setFieldValue('minutes', e.target.value)}
                                                onBlur={formik.handleBlur}
                                            >
                                             {minutes.map((dat,i)=>
                                            <option key={i} value={dat}>{dat}</option>
                                            )}
                                            </select>
                                            {formik.touched.minutes && formik.errors.minutes ? (
                                                <div className="error">{formik.errors.minutes}</div>
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
