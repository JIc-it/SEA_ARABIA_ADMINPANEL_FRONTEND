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


export default function AddMorePopup({service,companies, handleClose, handleOpen, open,updateOneServiceIndex,handleServiceAdd,setServiceListing }) {
    const [companylist,setCompanyList]=useState([])
    const [isLoading,setIsLoading]=useState(false);
    const [search,setSearch]=useState("")
    const [idset,setIdSet]=useState("")
    const handleSearchChange = (e) => {
        const searchTerm = e.target.value;
        setSearch(searchTerm);
    };

    useEffect(() => {
        setIsLoading(true)
        getCompanyListing()
          .then((data) => {
            setCompanyList(data?.results);
            setIsLoading(false)
          })
          .catch((error) => {
            console.error("Error fetching  data:", error);
          });
      }, []);

    useEffect(()=>{
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
            setServiceListing(data)
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    },[idset])

    const lowercasedFilter = search.toLowerCase();
    const filteredData = companylist?.filter(item => {
      return Object.keys(item).some(key =>
        item[key].toLowerCase().includes(lowercasedFilter)
      );
    });
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const isChecked = (Id) => {
        return service?.some((service) => service.id === Id);
    };
    const isCheckedCompany = (Id) => {
        return companies?.some((company) => company.id === Id);
    };

    const handleCheckboxChange = (data) => {
        data?.companyData?.map((dat)=>{
            return handleServiceAdd(data.id, data.name,dat.id, data?.companyData);
        })
    };
    return (
        <div>
            <Button onClick={handleOpen} style={{ backgroundColor: "#187AF7", color: "white",textTransform:"capitalize" }} size='small'>
                Add More
            </Button>
            <Modal

                keepMounted
                open={open}
                onClose={handleClose}
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
                        onClick={handleClose}
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
                    {companylist.length > 0 &&
                        filteredData.map((data) =>
                            <>
                                <Accordion sx={{ marginTop: "10px",marginBottom:"5px",border:"noneZ" }} onClick={()=>setIdSet(data.id)}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Checkbox {...label}  size="small" onChange={()=>handleCheckboxChange(data)} checked={isCheckedCompany(data.id)}/>
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

                             {/* {isLoading &&
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <CircularProgress />
                                    </div>} */}
                                </AccordionDetails>
                                </Accordion>
                                {/* <hr style={{ border: "1px solid gray" }} /> */}
                            </>
                        )

                    }
                   
                   <div className='d-flex justify-content-end'>
                        <button type='reset' className='m-1 btn btn-small btn-white'  onClick={handleClose}>cancel</button>
                        <button type='submit'className='m-1 btn btn-small' style={{backgroundColor:"#006875",color:"white"}}  onClick={handleClose}>Add</button>
                    </div>
                   {/* <>
                  <Box sx={{display:"flex",alignItems:"center"}}>
                   <Checkbox {...label} defaultChecked size="small" />
                    <Typography variant="p" component="p" sx={{ fontWeight: 800 }}>
                       Spectre Company
                    </Typography>
                   </Box>
                   <div style={{marginLeft:"20px"}}>
                   <Box sx={{display:"flex",alignItems:"center"}}>
                   <Checkbox {...label} defaultChecked size="small" />
                    <Typography variant="p" component="p">
                    Spectre
                    </Typography>
                   </Box>
                   </div>
                   <hr style={{border:"1px solid gray"}}/>
                   </> */}
                   {/* <>
                  <Box sx={{display:"flex",alignItems:"center"}}>
                   <Checkbox {...label} defaultChecked size="small" />
                    <Typography variant="p" component="p" sx={{ fontWeight: 800 }}>
                       Fly World
                    </Typography>
                   </Box>
                   <div style={{marginLeft:"20px"}}>
                   <Box sx={{display:"flex",alignItems:"center"}}>
                   <Checkbox {...label} defaultChecked size="small" />
                    <Typography variant="p" component="p">
                    YACHT-AL KADI 
                    </Typography>
                   </Box>
                   <Box sx={{display:"flex",alignItems:"center"}}>
                   <Checkbox {...label} defaultChecked size="small" />
                    <Typography variant="p" component="p">
                    YACHT- Q8 
                    </Typography>
                   </Box>
                   <Box sx={{display:"flex",alignItems:"center"}}>
                   <Checkbox {...label} defaultChecked size="small" />
                    <Typography variant="p" component="p">
                    YACHT-AQUARIUM 
                    </Typography>
                   </Box>
                   </div>
                   <hr style={{border:"1px solid gray"}}/>
                   <div className='d-flex justify-content-end'>
                        <button type='reset' className='m-1 btn btn-small btn-white'>cancel</button>
                        <button type='submit'className='m-1 btn btn-small' style={{backgroundColor:"#006875",color:"white"}}>Add</button>
                    </div>
                   </> */}
                </Box>
            </Modal>
        </div>
    );
}
