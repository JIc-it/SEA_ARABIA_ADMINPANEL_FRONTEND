import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import { useState , useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import {getCompanyListing,getOneServiceListing} from "../../services/offers"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { toast } from "react-toastify";


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


export default function AddMorePopup({companies,service,handleClose, handleOpen, open,setServiceListing,check,setValues }) {
    const [companylist,setCompanyList]=useState([])
    const [isLoading,setIsLoading]=useState(false);
    const [search,setSearch]=useState("")
    const [idset,setIdSet]=useState("")
    const[companyServices,setCompanyServices]=useState({
        companies:[],
        services:[]
    })

    const handleSearchChange = (e) => {
        const searchTerm = e.target.value;
        setSearch(searchTerm);
    };
    useEffect(() => {
        setIsLoading(true)
        getCompanyListing()
          .then((data) => {
            setCompanyList(data);
            setIsLoading(false)
          })
          .catch((error) => {
            console.error("Error fetching  data:", error);
          });
      }, []);

    useEffect(() => {
        // setIsLoading(true)
        getOneServiceListing(idset)
            .then((data) => {
                // setIsLoading(false)
                setCompanyList((prev) => {
                    const updatedList = prev?.map((company) => {
                        if (company.id === idset) {
                            return {
                                ...company,
                                companyData: data,
                            };
                        }
                        return company;
                    });

                    return updatedList;
                });
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [idset])

    useEffect(() => {
        getOneServiceListing()
            .then((data) => {
                setServiceListing(data)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [])

    const lowercasedFilter = search?.toLowerCase();
    const filteredData = companylist?.filter(item => {
      return Object?.keys(item)?.some(key =>
        item[key]?.toLowerCase()?.includes(lowercasedFilter)
      );
    });
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const isChecked = (Id) => {
        return companyServices.services?.some((service) => service.id === Id);
    };
    const isCheckedCompany = (Id) => {
        return companyServices.companies?.some((company) => company.id === Id);
    };

    const AddService_company = (id, name, servid, companyData) => {
        setCompanyServices((prev) => {
          const existingCompanyIndex = (prev.companies || []).findIndex(
            (company) => company.id === id
          );
          const existingServiceIndex = (prev.services || []).findIndex(
            (service) => service.id === servid && service.company_id === id
          );
      
          // Update companies list
          const updatedCompanyList =
            existingCompanyIndex !== -1
              ? [
                  ...prev.companies.slice(0, existingCompanyIndex),
                  { id: id, name: name },
                  ...prev.companies.slice(existingCompanyIndex + 1),
                ]
              : [...prev.companies, { id: id, name: name }];
      
          // Update services list
          const updatedList =
            existingServiceIndex !== -1
              ? [
                  ...prev.services.slice(0, existingServiceIndex),
                  ...companyData
                    .filter((dat) => !prev.services.some((service) => service.id === dat.id))
                    .map((dat) => ({
                      id: dat.id,
                      name: dat.name,
                      company_id: id,
                    })),
                  ...prev.services.slice(existingServiceIndex + 1),
                ]
              : [
                  ...prev.services,
                  ...companyData
                    .filter((dat) => !prev.services.some((service) => service.id === dat.id))
                    .map((dat) => ({
                      id: dat.id,
                      name: dat.name,
                      company_id: id,
                    })),
                ];
      
          if (existingCompanyIndex !== -1) {
            return {
              ...prev,
              services: prev.services.filter((service) => service.company_id !== id),
              companies: prev.companies.filter((company) => company.id !== id),
            };
          }
      
          return {
            ...prev,
            services: updatedList,
            companies: updatedCompanyList,
          };
        });
      };
      

      const updateOneServiceIndex = (id, name, companyid, companyName) => {
        setCompanyServices((prev) => {
          const existingServiceIndex = (prev?.services || []).findIndex(
            (service) => service.id === id && service.company_id === companyid
          );
          const existingCompanyIndex = (prev?.companies || []).findIndex(
            (company) => company.id === companyid
          );
    
          // Update services list
          const updatedList =
            existingServiceIndex === -1
              ? [...prev.services, { id: id, name: name, company_id: companyid }]
              : prev.services.filter((service) => service.id !== id);
    
            // Update companies list
            const updatedCompanyList =
                existingCompanyIndex === -1
                    ? [...(prev.companies || []), { id: companyid, name: companyName }]
                    : !existingServiceIndex ? prev.companies.filter((company)=>company.id!==companyid)
                    : prev.companies;
          return {
            ...prev,
            services: updatedList,
            companies: updatedCompanyList,
          };
        });
      };

    const handleCheckboxChange = (data) => {
        console.log(data,"data")
        data?.companyData?.map((dat)=>{
            return AddService_company(data.id, data.name,dat.id, data?.companyData);
        })
    };

    const handleAddMoreSubmit = () => {
        // Assuming formik is your Formik instance
    
        // Check if there are any duplicate services or companies
        const isServiceDuplicate = companyServices.services.some((services) =>
            service.some((existingService) => existingService.id === services.id)
        );
    
        const isCompanyDuplicate = companyServices.companies.some((company) =>
            companies.some((existingCompany) => existingCompany.id === company.id)
        );
    
        // If there are no duplicates, update the values
        if (!isServiceDuplicate && !isCompanyDuplicate) {
            setValues((prev) => ({
                ...prev,
                services: [...prev.services, ...companyServices.services],
                companies: [...prev.companies, ...companyServices.companies],
            }));
        } else if (isServiceDuplicate || isCompanyDuplicate) {
            toast.error("Already Exists, Remove and Add New");
        }
    
        // Reset companyServices state
        setCompanyServices({ companies: [], services: [] });
    };
    

    return (
        <div>
            <Button onClick={handleOpen} style={{ backgroundColor: check? "#6ba9fa" :"#187AF7",cursor:"pointer", color: "white",textTransform:"capitalize" }} size='small' disabled={check}>
                Add More
            </Button>
            <Modal

                keepMounted
                open={open}
                onClose={()=>{handleClose();setCompanyServices({companies:[],services:[]})}}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="p" component="p" sx={{ fontWeight: 800 }}>
                        Applies To
                    </Typography>
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={()=>{handleClose();setCompanyServices({companies:[],services:[]})}}
                        aria-label="close"
                        sx={{ position: 'absolute', top: 8, right: 14 }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <TextField
                    sx={{marginTop:"5px"}}
                        placeholder="Search..."
                        variant="outlined"
                        size="small"
                        fullWidth
                        onChange={handleSearchChange}
                        InputProps={{
                            endAdornment: (
                                <SearchIcon color="action" style={{ marginRight: 8 }} />
                            ),
                        }}
                    />
                    <form>
                    <div style={{height:"500px",overflowY:"scroll"}} className='my-3 px-2'>
                    {companylist.length > 0 &&
                        filteredData.map((data) =>
                            <>
                                <Accordion sx={{ marginTop: "10px",marginBottom:"5px",border:"none" }} onClick={()=>setIdSet(data.id)}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Checkbox {...label}  size="small" onChange={()=>handleCheckboxChange(data)} 
                                    checked={isCheckedCompany(data.id)}
                                    />
                                    <Typography variant="p" component="p" sx={{ fontWeight: 800 }}>
                                        {data.name}
                                    </Typography>
                                </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                {!isLoading && <div style={{ marginLeft: "20px" }}>
                                    {
                                        data?.companyData?.map((dat)=>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Checkbox {...label} checked={isChecked(dat.id)} size="small" onChange={()=>updateOneServiceIndex(dat.id,dat.name,data.id,data.name)}/>
                                        <Typography variant="p" component="p">
                                            {dat.name}
                                        </Typography>
                                    </Box>
                                        
                                        )
                                    }
                                    
                                </div>}
                                </AccordionDetails>
                                </Accordion>
                               
                            </>
                        )
                    }
                    </div>
                   
                   <div className='d-flex justify-content-end'>
                        <button type='reset' className='m-1 btn btn-small btn-white'  onClick={()=>{handleClose();setCompanyServices({companies:[],services:[]})}}>cancel</button>
                        <button type='button'className='m-1 btn btn-small' style={{backgroundColor:"#006875",color:"white"}}  onClick={()=>{
                            handleAddMoreSubmit();
                            handleClose();
                        }}>Add</button>
                    </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
