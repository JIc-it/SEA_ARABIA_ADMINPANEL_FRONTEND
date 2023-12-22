import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Paper } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useFormik } from "formik";
import * as Yup from "yup";
import {AddImage} from "../../services/service"
import CircularProgress from "@mui/material/CircularProgress";

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


export default function PerDateModal ({ handleClose, handleOpen, open }) {
    const [companylist, setCompanyList] = useState([])
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

    const formik = useFormik({
        initialValues: {
            image: null,
            service: "",
           
        },
        validationSchema,
        onSubmit: async (values) => {
        setIsLoading(true);
    
       
        const formdata=new FormData()
        formdata.append("image",values.image);
        formdata.append("service",values.service);

            if (!isLoading) {
              try {
            const adminData = await AddImage(formdata);

            if (adminData) {
              setIsLoading(false);
              handleClose()
            toast.success("Updated Successfully")
            // setIsUpdated(true)

            } else {
                setIsLoading(false);
                toast.error(adminData.error.response.data)
              console.error("Error while creating Admin:", adminData.error);
            }
            setIsLoading(false);
              }catch (err) {
                  setIsLoading(false);
                toast.error(err.response.data)
                console.log(err);
              }
            }
        },
    });

    // const handleFileChange = (file) => {
    //     formik.setFieldValue("image", file);
    //     formik.setFieldValue("service", service_image[0]?.service);
    //   };

console.log(formik.values);
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

                                   
                        </div>          
                            <div className='d-flex align-items-center mt-3 mx-1'>
                                <div>
                                <input 
                                    type="checkbox"
                                    // name="name"
                                    className=""
                                    placeholder="Name"
                                    checked
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    style={{width:"15px",height:"15px"}}
                                />
                                </div>
                               <div>
                               <label
                                    htmlFor=""
                                    style={{ paddingBottom: "10px", fontWeight: "600", fontSize: "13px",marginLeft:"5px" }}
                                >
                                    Is Range <span style={{ color: "red" }}>*</span>
                                </label>
                               </div>
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
                                                Date <span style={{ color: "red" }}>*</span>
                                            </label>
                                            <select
                                                
                                                name="name"
                                                className="form-control"
                                                placeholder="Name"
                                                value={formik.values.name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                            <option>0</option>    
                                            <option>1</option>    
                                            <option>2</option>    

                                            </select>
                                            {formik.touched.name && formik.errors.name ? (
                                                <div className="error">{formik.errors.name}</div>
                                            ) : null}
                                        </div>

                                        <div className='w-50 mx-1'>
                                            <label
                                                htmlFor=""
                                                style={{ paddingBottom: "10px", fontWeight: "600", fontSize: "13px" }}
                                            >
                                                 End Date<span style={{ color: "red" }}>*</span>
                                            </label>
                                            <select
                                                
                                                name="name"
                                                className="form-control"
                                                placeholder="Name"
                                                value={formik.values.name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                            <option>0</option>    
                                            <option>1</option>    
                                            <option>2</option>    

                                            </select>
                                            {formik.touched.name && formik.errors.name ? (
                                                <div className="error">{formik.errors.name}</div>
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
