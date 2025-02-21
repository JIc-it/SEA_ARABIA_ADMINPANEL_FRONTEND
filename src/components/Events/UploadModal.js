import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Paper } from '@mui/material';


import 'react-toastify/dist/ReactToastify.css'
import { useFormik } from "formik";
import * as Yup from "yup";


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


export default function UploadPopup({ handleClose, open,image,formikset,imageURL }) {

    const validationSchema = Yup.object({
        image: Yup.mixed()        
        .test('fileSize', 'File size is too large', (value) => {
                if (!value) {
                  return false;
                }
                return value.size <= 300 * 1024;
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
            url:null,
            thumbnail:false
           
        },
        validationSchema,
        onSubmit: async (values) => {
       
        formikset((prev) => {
                return { ...prev, image: values.image,imageURL:values.url }
        })
        handleClose()
       
        },
    });

      const handleFileChange = (e) => {
        const file = e.target.files[0];
        formik.setFieldValue("image", file);
    
        if (file) {
          const reader = new FileReader();
    
          reader.onloadend = () => {
  
            formik.setFieldValue("url", reader.result);
          };
    
          reader.readAsDataURL(file);
        }
      };

    return (
        <>
       {<div >
            
            <Modal style={{width:"100vw"}}
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
               <Box sx={style}>
                    <Typography variant="p" component="p" sx={{ fontWeight: 800 }}>
                        Upload Image
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
                        <Box textAlign="center" mt={1} style={{ width: "100%", marginBottom: "5px" }}>
                            <label htmlFor="file-input" style={{ width: "100%" }}>
                                <Paper
                                    elevation={3}
                                    style={{
                                        cursor: 'pointer',
                                        width: "100%",
                                        border: '1px dashed lightgray',
                                        boxShadow: "none",
                                        padding: "2%"
                                    }}
                                >
                                    <input
                                        type="file"
                                        id="file-input"
                                        name="image"
                                        // required={formik.values?.image?.includes("https://")? false:true}
                                        accept=".jpg, .jpeg, .png"
                                        style={{ display: 'none' }}
                                    onBlur={formik.handleBlur}
                                    onChange={(e)=>handleFileChange(e)}
                                    />
                                    <div style={{ marginBottom: "5px" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                            <path d="M9.165 13.3339C9.165 13.795 9.53884 14.1689 10 14.1689C10.4612 14.1689 10.835 13.795 10.835 13.3339H9.165ZM10.835 4.16719C10.835 3.70603 10.4612 3.33219 10 3.33219C9.53884 3.33219 9.165 3.70603 9.165 4.16719L10.835 4.16719ZM12.7429 6.42429C13.069 6.75038 13.5977 6.75038 13.9238 6.42429C14.2499 6.09821 14.2499 5.56951 13.9238 5.24342L12.7429 6.42429ZM10.5893 3.08978L9.99882 3.68021L10.5893 3.08978ZM9.41074 3.08978L10.0012 3.68022L10.0012 3.68021L9.41074 3.08978ZM6.07623 5.24342C5.75014 5.56951 5.75014 6.0982 6.07623 6.42429C6.40232 6.75038 6.93101 6.75038 7.2571 6.42429L6.07623 5.24342ZM3.335 13.3339C3.335 12.8727 2.96116 12.4989 2.5 12.4989C2.03884 12.4989 1.665 12.8727 1.665 13.3339H3.335ZM18.335 13.3339C18.335 12.8727 17.9612 12.4989 17.5 12.4989C17.0388 12.4989 16.665 12.8727 16.665 13.3339H18.335ZM16.135 17.228L15.7559 16.4841H15.7559L16.135 17.228ZM17.2275 16.1355L17.9715 16.5146V16.5146L17.2275 16.1355ZM2.77248 16.1355L2.02849 16.5146L2.77248 16.1355ZM3.86502 17.228L3.48594 17.972H3.48594L3.86502 17.228ZM10.835 13.3339L10.835 4.16719L9.165 4.16719L9.165 13.3339H10.835ZM13.9238 5.24342L11.1797 2.49935L9.99882 3.68021L12.7429 6.42429L13.9238 5.24342ZM8.82031 2.49935L6.07623 5.24342L7.2571 6.42429L10.0012 3.68022L8.82031 2.49935ZM11.1797 2.49935C10.5282 1.84782 9.47183 1.84782 8.82031 2.49935L10.0012 3.68021C10.0021 3.67929 10.0016 3.67996 10.0002 3.68052C9.9994 3.68085 9.99936 3.6807 10 3.6807C10.0006 3.6807 10.0006 3.68085 9.9998 3.68052C9.99843 3.67996 9.99789 3.67929 9.99882 3.68021L11.1797 2.49935ZM1.665 13.3339V13.5005H3.335V13.3339H1.665ZM6.5 18.3355H13.5V16.6655H6.5V18.3355ZM18.335 13.5005V13.3339H16.665V13.5005H18.335ZM13.5 18.3355C14.1863 18.3355 14.7512 18.3362 15.21 18.2987C15.6785 18.2604 16.1093 18.1782 16.5141 17.972L15.7559 16.4841C15.6258 16.5503 15.4392 16.6044 15.074 16.6342C14.699 16.6649 14.2138 16.6655 13.5 16.6655V18.3355ZM16.665 13.5005C16.665 14.2144 16.6644 14.6995 16.6337 15.0745C16.6039 15.4398 16.5498 15.6264 16.4835 15.7564L17.9715 16.5146C18.1777 16.1099 18.2599 15.679 18.2982 15.2105C18.3356 14.7517 18.335 14.1868 18.335 13.5005H16.665ZM16.5141 17.972C17.1416 17.6523 17.6518 17.1421 17.9715 16.5146L16.4835 15.7564C16.3239 16.0697 16.0692 16.3244 15.7559 16.4841L16.5141 17.972ZM1.665 13.5005C1.665 14.1868 1.66435 14.7517 1.70183 15.2105C1.74011 15.679 1.82228 16.1099 2.02849 16.5146L3.51647 15.7564C3.45021 15.6264 3.39613 15.4398 3.36629 15.0745C3.33565 14.6995 3.335 14.2144 3.335 13.5005H1.665ZM6.5 16.6655C5.78616 16.6655 5.30099 16.6649 4.926 16.6342C4.56076 16.6044 4.37416 16.5503 4.24411 16.4841L3.48594 17.972C3.89066 18.1782 4.32149 18.2604 4.79001 18.2987C5.24878 18.3362 5.81371 18.3355 6.5 18.3355V16.6655ZM2.02849 16.5146C2.34823 17.1421 2.85842 17.6523 3.48594 17.972L4.24411 16.4841C3.93082 16.3244 3.6761 16.0697 3.51647 15.7564L2.02849 16.5146Z" fill="#252525" />
                                        </svg>
                                    </div>

                                    {/* <CloudUploadIcon fontSize="large" /> */}
                                    <Typography variant="body1" style={{ fontSize: "12px" }}>
                                        Drag and Drop or <span style={{ color: "#187AF7" }}>choose your</span> file for upload
                                    </Typography>
                                    <Typography variant="body2" style={{ fontSize: "12px", color: "#68727D" }}>Upload Image ( Max 300 KB )</Typography>
                                </Paper>
                            </label>
                            {formik.touched.image && formik.errors.image ? (
                                <div className="error">{formik.errors.image}</div>
                            ) : null} 
                            {formik?.values?.image?.name && <span className='my-3'>File Name : {formik.values?.image?.name}</span>}
                            {/* <Typography variant="p" component="p" sx={{ fontWeight: 800, textAlign: "left", marginTop: "3px" }}>
                                Preview Image
                            </Typography>
                            <div className="d-flex  mt-2">
                            <img
                        src={imageURL===null ? image : imageURL  }
                        className="me-3 w-25 h-25 rounded"
                      />
                            </div> */}
                        </Box>
                        <hr></hr>
                        <div className='d-flex justify-content-end'>
                            <button type='reset' className='m-1 btn btn-small btn-white' onClick={handleClose}>cancel</button>
                            <button type='submit' className='m-1 btn btn-small' style={{ backgroundColor: "#006875", color: "white" }}>Upload</button>
                        </div>
                    </form>
                </Box>
                
            </Modal>
        </div>}
           </>
    );
}
