import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';

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
};

export default function AddMorePopup({ handleClose, handleOpen, open }) {
    const[search,setSearch]=useState("")
    const handleSearchChange = (e) => {
        const searchTerm = e.target.value;
        setSearch(searchTerm);
    };
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
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
                    <hr style={{border:"1px solid gray"}}/>
                  <>
                  <Box sx={{display:"flex",alignItems:"center"}}>
                   <Checkbox {...label} defaultChecked size="small" />
                    <Typography variant="p" component="p" sx={{ fontWeight: 800 }}>
                       Salma International
                    </Typography>
                   </Box>
                   <div style={{marginLeft:"20px"}}>
                   <Box sx={{display:"flex",alignItems:"center"}}>
                   <Checkbox {...label} defaultChecked size="small" />
                    <Typography variant="p" component="p">
                       Albadee
                    </Typography>
                   </Box>
                   <Box sx={{display:"flex",alignItems:"center"}}>
                   <Checkbox {...label} defaultChecked size="small" />
                    <Typography variant="p" component="p">
                       Durrat Almarina
                    </Typography>
                   </Box>
                   <Box sx={{display:"flex",alignItems:"center"}}>
                   <Checkbox {...label} defaultChecked size="small" />
                    <Typography variant="p" component="p">
                       Almayaseen
                    </Typography>
                   </Box>
                   </div>
                   <hr style={{border:"1px solid gray"}}/>
                   </>
                   <>
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
                   </>
                   <>
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
                   </>
                </Box>
            </Modal>
        </div>
    );
}
