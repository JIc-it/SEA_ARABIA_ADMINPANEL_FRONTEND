import React, { useState, useEffect } from 'react';
import Modal from "@mui/material/Modal";
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { getCategoryList, getsubcategorylist,getServiceListing } from "../../services/service"
import { getCompanyListing } from "../../services/offers"
import { Visibility } from '@mui/icons-material';

export default function FilterPopup({ open, handleClose,setIsLoading, setFilters,filters,setListPageUrl,setServiceList }) {
    const [active, setActive] = useState("Category")
    const [categorylist, setCategoryList] = useState([]);
    const [subcategorylist, setSubcategoryList] = useState([])
    const [vendorlist, setVendorList] = useState([]);
    const [search,setSearch]=useState({
        category:"",
        sub_category:"",
        vendor:""
    })
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "65%",
        height: "95vh",
        bgcolor: "background.paper",
        // border: '2px solid #000',
        boxShadow: 24,
        p: 3,
        overflowY:"scroll"
    };
    useEffect(() => {
        getCategoryList()
            .then((data) =>
                setCategoryList(data)
            ).catch((error) =>
                console.error(error))
    }, [])

    useEffect(() => {
        getsubcategorylist()
            .then((data) =>
                setSubcategoryList(data)
            ).catch((error) =>
                console.error(error))
    }, [])

    useEffect(() => {
        getCompanyListing()
            .then((data) =>
                setVendorList(data)
            ).catch((error) =>
                console.error(error))
    }, [])

    const handleFilterCategory = (e) => {
        const { name, value } = e.target;

        setFilters((prevFilters) => {
          // Check if category already has data
          const categoryArray = prevFilters.category.length > 0 ? prevFilters.category : [];
      
          // Check if the value already exists in the category array
          const existingCategory = categoryArray.find((item) => item.id === value);
      
          // If the value doesn't exist, add it; otherwise, update the existing one
          const updatedCategory = existingCategory
            ? categoryArray.map((item) =>
                item.id === value ? { ...item, name } : item
              )
            : [...categoryArray, { id: value, name }];
      
          return {
            ...prevFilters,
            category: updatedCategory,
          };
        });
      };
      

    const handleFilterSubCategory = (e) => {
        const { name, value } = e.target;

        setFilters((prevFilters) => {
          // Check if category already has data
          const categoryArray = prevFilters.sub_category.length > 0 ? prevFilters.sub_category : [];
      
          // Check if the value already exists in the category array
          const existingCategory = categoryArray.find((item) => item.id === value);
      
          // If the value doesn't exist, add it; otherwise, update the existing one
          const updatedCategory = existingCategory
            ? categoryArray.map((item) =>
                item.id === value ? { ...item, name } : item
              )
            : [...categoryArray, { id: value, name }];
      
          return {
            ...prevFilters,
            sub_category: updatedCategory,
          };
        });
    };


    const handleFilterVendor = (e) => {
        const { name, value } = e.target;

        setFilters((prevFilters) => {
          // Check if category already has data
          const categoryArray = prevFilters.vendor.length > 0 ? prevFilters.vendor : [];
      
          // Check if the value already exists in the category array
          const existingCategory = categoryArray.find((item) => item.id === value);
      
          // If the value doesn't exist, add it; otherwise, update the existing one
          const updatedCategory = existingCategory
            ? categoryArray.map((item) =>
                item.id === value ? { ...item, name } : item
              )
            : [...categoryArray, { id: value, name }];
      
          return {
            ...prevFilters,
            vendor: updatedCategory,
          };
        });
    };


    const findAndRemoveCategory = (field,data) => {
       if(field==="Category"){
        setFilters((prevFilters) => {
            const updatedCategory = prevFilters.category.filter((item) => item.id !== data);
            return { ...prevFilters, category: updatedCategory };
          });
       }
       if(field==="Sub-Category"){
        setFilters((prevFilters) => {
            const updatedCategory = prevFilters.sub_category.filter((item) => item.id !== data);
            return { ...prevFilters, sub_category: updatedCategory };
          });
       }
       if(field==="Vendor"){
        setFilters((prevFilters) => {
            const updatedCategory = prevFilters.vendor.filter((item) => item.id !== data);
            return { ...prevFilters, vendor: updatedCategory };
          });
       }
      };
      

const handleApplyFilter=async()=>{
    setIsLoading(true)
    const categorymapped=filters.category.map((data)=>data.id)
    const categorySplitted=categorymapped.join(",");

    const subcategorymapped=filters.sub_category.map((data)=>data.id)
    const subcategorySplitted=subcategorymapped.join(",");

    const vendormapped=filters.vendor.map((data)=>data.id)
    const vendorSplitted=vendormapped.join(",");

    const getFiltereddata=await getServiceListing(null,null,categorySplitted,subcategorySplitted,vendorSplitted,filters.status);

    if(getFiltereddata){
        setIsLoading(false)
        setServiceList(getFiltereddata.results);
        setListPageUrl({next:getFiltereddata.next,previous:getFiltereddata.previous});
        handleClose()
    }

}

const handleClearFilter=async()=>{
    setIsLoading(true)
    const getFiltereddata=await getServiceListing()
    setFilters({category:[],sub_category:[],vendor:[],status:false});

    if(getFiltereddata){
        setIsLoading(false)
        setServiceList(getFiltereddata.results);
        setListPageUrl({next:getFiltereddata.next,previous:getFiltereddata.previous});
        handleClose()
    }
}

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="p" component="p" sx={{ fontWeight: 800 }}>
                        Filter
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
                    <div class="frame-427319784 mt-3">
                        {filters.category.length > 0 && <div class="components-selection-item">
                            <div class="frame-427319782">
                                <div class="frame-427319783">
                                    <div class="category">Category</div>
                                    <div class="div">:</div>
                                </div>
                                <div style={{width:"50vw", display: "flex",flexWrap:filters.category.length>5?"wrap":""}}>
                                <div class="yacht-boat-heli-tour " style={{ display: "flex",flexWrap:filters.category.length>5?"wrap":""}}>
                                    {filters.category.map((data)=>
                                    <div key={data.id} className='mx-1'>
                                        <span>{data.name}</span>
                                    <span className='mx-1' onClick={()=>findAndRemoveCategory("Category",data.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={10} height={10} viewBox="0 0 10 10" fill="none">
                                            <g clipPath="url(#clip0_5512_51442)">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M8.65833 1.34181C8.68743 1.37084 8.71052 1.40532 8.72628 1.44329C8.74203 1.48125 8.75014 1.52195 8.75014 1.56306C8.75014 1.60416 8.74203 1.64486 8.72628 1.68283C8.71052 1.7208 8.68743 1.75528 8.65833 1.78431L1.78333 8.65931C1.72465 8.71799 1.64507 8.75095 1.56208 8.75095C1.4791 8.75095 1.39951 8.71799 1.34083 8.65931C1.28215 8.60063 1.24919 8.52104 1.24919 8.43806C1.24919 8.35507 1.28215 8.27549 1.34083 8.21681L8.21583 1.34181C8.24486 1.31271 8.27935 1.28962 8.31731 1.27386C8.35528 1.25811 8.39598 1.25 8.43708 1.25C8.47819 1.25 8.51889 1.25811 8.55685 1.27386C8.59482 1.28962 8.6293 1.31271 8.65833 1.34181Z" fill="#212529" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M1.34083 1.34181C1.31173 1.37084 1.28864 1.40532 1.27289 1.44329C1.25713 1.48125 1.24902 1.52195 1.24902 1.56306C1.24902 1.60416 1.25713 1.64486 1.27289 1.68283C1.28864 1.7208 1.31173 1.75528 1.34083 1.78431L8.21583 8.65931C8.27451 8.71799 8.3541 8.75095 8.43708 8.75095C8.52007 8.75095 8.59965 8.71799 8.65833 8.65931C8.71701 8.60063 8.74998 8.52104 8.74998 8.43806C8.74998 8.35507 8.71701 8.27549 8.65833 8.21681L1.78333 1.34181C1.7543 1.31271 1.71982 1.28962 1.68185 1.27386C1.64389 1.25811 1.60319 1.25 1.56208 1.25C1.52098 1.25 1.48028 1.25811 1.44231 1.27386C1.40435 1.28962 1.36986 1.31271 1.34083 1.34181Z" fill="#212529" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M8.65833 1.34181C8.68743 1.37084 8.71052 1.40532 8.72628 1.44329C8.74203 1.48125 8.75014 1.52195 8.75014 1.56306C8.75014 1.60416 8.74203 1.64486 8.72628 1.68283C8.71052 1.7208 8.68743 1.75528 8.65833 1.78431L1.78333 8.65931C1.72465 8.71799 1.64507 8.75095 1.56208 8.75095C1.4791 8.75095 1.39951 8.71799 1.34083 8.65931C1.28215 8.60063 1.24919 8.52104 1.24919 8.43806C1.24919 8.35507 1.28215 8.27549 1.34083 8.21681L8.21583 1.34181C8.24486 1.31271 8.27935 1.28962 8.31731 1.27386C8.35528 1.25811 8.39598 1.25 8.43708 1.25C8.47819 1.25 8.51889 1.25811 8.55685 1.27386C8.59482 1.28962 8.6293 1.31271 8.65833 1.34181Z" stroke="#212529" strokeWidth="0.8" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M1.34083 1.34181C1.31173 1.37084 1.28864 1.40532 1.27289 1.44329C1.25713 1.48125 1.24902 1.52195 1.24902 1.56306C1.24902 1.60416 1.25713 1.64486 1.27289 1.68283C1.28864 1.7208 1.31173 1.75528 1.34083 1.78431L8.21583 8.65931C8.27451 8.71799 8.3541 8.75095 8.43708 8.75095C8.52007 8.75095 8.59965 8.71799 8.65833 8.65931C8.71701 8.60063 8.74998 8.52104 8.74998 8.43806C8.74998 8.35507 8.71701 8.27549 8.65833 8.21681L1.78333 1.34181C1.7543 1.31271 1.71982 1.28962 1.68185 1.27386C1.64389 1.25811 1.60319 1.25 1.56208 1.25C1.52098 1.25 1.48028 1.25811 1.44231 1.27386C1.40435 1.28962 1.36986 1.31271 1.34083 1.34181Z" stroke="#212529" strokeWidth="0.8" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_5512_51442">
                                                    <rect width={10} height={10} fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                    </span>
                                        </div>
                                    )}
                                </div>
                                </div>
                            </div>
                           
                        </div>}
                      
                        {filters.sub_category.length>0 &&<div class="components-selection-item mt-1">
                            <div class="frame-427319782">
                                <div class="frame-427319783">
                                    <div class="vendor">Sub Category</div>
                                    <div class="div">:</div>
                                </div>
                                <div style={{width:"50vw", display: "flex",flexWrap:filters.sub_category.length>5?"wrap":""}}>
                                <div class="yacht-boat-heli-tour " style={{ display: "flex",flexWrap:filters.sub_category.length>5?"wrap":""}}>
                                    {filters.sub_category.map((data)=>
                                    <div key={data.id} className='mx-1'>
                                        <span>{data.name}</span>
                                    <span className='mx-1' onClick={()=>findAndRemoveCategory("Sub-Category",data.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={10} height={10} viewBox="0 0 10 10" fill="none">
                                            <g clipPath="url(#clip0_5512_51442)">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M8.65833 1.34181C8.68743 1.37084 8.71052 1.40532 8.72628 1.44329C8.74203 1.48125 8.75014 1.52195 8.75014 1.56306C8.75014 1.60416 8.74203 1.64486 8.72628 1.68283C8.71052 1.7208 8.68743 1.75528 8.65833 1.78431L1.78333 8.65931C1.72465 8.71799 1.64507 8.75095 1.56208 8.75095C1.4791 8.75095 1.39951 8.71799 1.34083 8.65931C1.28215 8.60063 1.24919 8.52104 1.24919 8.43806C1.24919 8.35507 1.28215 8.27549 1.34083 8.21681L8.21583 1.34181C8.24486 1.31271 8.27935 1.28962 8.31731 1.27386C8.35528 1.25811 8.39598 1.25 8.43708 1.25C8.47819 1.25 8.51889 1.25811 8.55685 1.27386C8.59482 1.28962 8.6293 1.31271 8.65833 1.34181Z" fill="#212529" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M1.34083 1.34181C1.31173 1.37084 1.28864 1.40532 1.27289 1.44329C1.25713 1.48125 1.24902 1.52195 1.24902 1.56306C1.24902 1.60416 1.25713 1.64486 1.27289 1.68283C1.28864 1.7208 1.31173 1.75528 1.34083 1.78431L8.21583 8.65931C8.27451 8.71799 8.3541 8.75095 8.43708 8.75095C8.52007 8.75095 8.59965 8.71799 8.65833 8.65931C8.71701 8.60063 8.74998 8.52104 8.74998 8.43806C8.74998 8.35507 8.71701 8.27549 8.65833 8.21681L1.78333 1.34181C1.7543 1.31271 1.71982 1.28962 1.68185 1.27386C1.64389 1.25811 1.60319 1.25 1.56208 1.25C1.52098 1.25 1.48028 1.25811 1.44231 1.27386C1.40435 1.28962 1.36986 1.31271 1.34083 1.34181Z" fill="#212529" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M8.65833 1.34181C8.68743 1.37084 8.71052 1.40532 8.72628 1.44329C8.74203 1.48125 8.75014 1.52195 8.75014 1.56306C8.75014 1.60416 8.74203 1.64486 8.72628 1.68283C8.71052 1.7208 8.68743 1.75528 8.65833 1.78431L1.78333 8.65931C1.72465 8.71799 1.64507 8.75095 1.56208 8.75095C1.4791 8.75095 1.39951 8.71799 1.34083 8.65931C1.28215 8.60063 1.24919 8.52104 1.24919 8.43806C1.24919 8.35507 1.28215 8.27549 1.34083 8.21681L8.21583 1.34181C8.24486 1.31271 8.27935 1.28962 8.31731 1.27386C8.35528 1.25811 8.39598 1.25 8.43708 1.25C8.47819 1.25 8.51889 1.25811 8.55685 1.27386C8.59482 1.28962 8.6293 1.31271 8.65833 1.34181Z" stroke="#212529" strokeWidth="0.8" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M1.34083 1.34181C1.31173 1.37084 1.28864 1.40532 1.27289 1.44329C1.25713 1.48125 1.24902 1.52195 1.24902 1.56306C1.24902 1.60416 1.25713 1.64486 1.27289 1.68283C1.28864 1.7208 1.31173 1.75528 1.34083 1.78431L8.21583 8.65931C8.27451 8.71799 8.3541 8.75095 8.43708 8.75095C8.52007 8.75095 8.59965 8.71799 8.65833 8.65931C8.71701 8.60063 8.74998 8.52104 8.74998 8.43806C8.74998 8.35507 8.71701 8.27549 8.65833 8.21681L1.78333 1.34181C1.7543 1.31271 1.71982 1.28962 1.68185 1.27386C1.64389 1.25811 1.60319 1.25 1.56208 1.25C1.52098 1.25 1.48028 1.25811 1.44231 1.27386C1.40435 1.28962 1.36986 1.31271 1.34083 1.34181Z" stroke="#212529" strokeWidth="0.8" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_5512_51442">
                                                    <rect width={10} height={10} fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                    </span>
                                        </div>
                                    )}
                                </div>
                                </div> 
                            </div>
                            
                        </div>}
                        {filters.vendor.length>0 && <div class="components-selection-item mt-1">
                            <div class="frame-427319782">
                                <div class="frame-427319783">
                                    <div class="vendor">Vendor</div>
                                    <div class="div">:</div>
                                </div>
                                <div style={{width:"50vw", display: "flex",flexWrap:filters.vendor.length>5?"wrap":""}}>
                                <div class="yacht-boat-heli-tour " style={{ display: "flex",flexWrap:filters.vendor.length>5?"wrap":""}}>
                                    {filters.vendor.map((data)=>
                                    <div key={data.id} className='mx-1'>
                                        <span>{data.name}</span>
                                    <span className='mx-1' onClick={()=>findAndRemoveCategory("Vendor",data.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={10} height={10} viewBox="0 0 10 10" fill="none">
                                            <g clipPath="url(#clip0_5512_51442)">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M8.65833 1.34181C8.68743 1.37084 8.71052 1.40532 8.72628 1.44329C8.74203 1.48125 8.75014 1.52195 8.75014 1.56306C8.75014 1.60416 8.74203 1.64486 8.72628 1.68283C8.71052 1.7208 8.68743 1.75528 8.65833 1.78431L1.78333 8.65931C1.72465 8.71799 1.64507 8.75095 1.56208 8.75095C1.4791 8.75095 1.39951 8.71799 1.34083 8.65931C1.28215 8.60063 1.24919 8.52104 1.24919 8.43806C1.24919 8.35507 1.28215 8.27549 1.34083 8.21681L8.21583 1.34181C8.24486 1.31271 8.27935 1.28962 8.31731 1.27386C8.35528 1.25811 8.39598 1.25 8.43708 1.25C8.47819 1.25 8.51889 1.25811 8.55685 1.27386C8.59482 1.28962 8.6293 1.31271 8.65833 1.34181Z" fill="#212529" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M1.34083 1.34181C1.31173 1.37084 1.28864 1.40532 1.27289 1.44329C1.25713 1.48125 1.24902 1.52195 1.24902 1.56306C1.24902 1.60416 1.25713 1.64486 1.27289 1.68283C1.28864 1.7208 1.31173 1.75528 1.34083 1.78431L8.21583 8.65931C8.27451 8.71799 8.3541 8.75095 8.43708 8.75095C8.52007 8.75095 8.59965 8.71799 8.65833 8.65931C8.71701 8.60063 8.74998 8.52104 8.74998 8.43806C8.74998 8.35507 8.71701 8.27549 8.65833 8.21681L1.78333 1.34181C1.7543 1.31271 1.71982 1.28962 1.68185 1.27386C1.64389 1.25811 1.60319 1.25 1.56208 1.25C1.52098 1.25 1.48028 1.25811 1.44231 1.27386C1.40435 1.28962 1.36986 1.31271 1.34083 1.34181Z" fill="#212529" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M8.65833 1.34181C8.68743 1.37084 8.71052 1.40532 8.72628 1.44329C8.74203 1.48125 8.75014 1.52195 8.75014 1.56306C8.75014 1.60416 8.74203 1.64486 8.72628 1.68283C8.71052 1.7208 8.68743 1.75528 8.65833 1.78431L1.78333 8.65931C1.72465 8.71799 1.64507 8.75095 1.56208 8.75095C1.4791 8.75095 1.39951 8.71799 1.34083 8.65931C1.28215 8.60063 1.24919 8.52104 1.24919 8.43806C1.24919 8.35507 1.28215 8.27549 1.34083 8.21681L8.21583 1.34181C8.24486 1.31271 8.27935 1.28962 8.31731 1.27386C8.35528 1.25811 8.39598 1.25 8.43708 1.25C8.47819 1.25 8.51889 1.25811 8.55685 1.27386C8.59482 1.28962 8.6293 1.31271 8.65833 1.34181Z" stroke="#212529" strokeWidth="0.8" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M1.34083 1.34181C1.31173 1.37084 1.28864 1.40532 1.27289 1.44329C1.25713 1.48125 1.24902 1.52195 1.24902 1.56306C1.24902 1.60416 1.25713 1.64486 1.27289 1.68283C1.28864 1.7208 1.31173 1.75528 1.34083 1.78431L8.21583 8.65931C8.27451 8.71799 8.3541 8.75095 8.43708 8.75095C8.52007 8.75095 8.59965 8.71799 8.65833 8.65931C8.71701 8.60063 8.74998 8.52104 8.74998 8.43806C8.74998 8.35507 8.71701 8.27549 8.65833 8.21681L1.78333 1.34181C1.7543 1.31271 1.71982 1.28962 1.68185 1.27386C1.64389 1.25811 1.60319 1.25 1.56208 1.25C1.52098 1.25 1.48028 1.25811 1.44231 1.27386C1.40435 1.28962 1.36986 1.31271 1.34083 1.34181Z" stroke="#212529" strokeWidth="0.8" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_5512_51442">
                                                    <rect width={10} height={10} fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                    </span>
                                        </div>
                                    )}
                                </div>
                                </div> 
                            </div>
                            
                        </div>}
                    </div>
                    <br />
                    <br />
                    <div class="d-flex align-items-start">
                        <div class="frame-427319790" style={{ height: "50vh", width: "30%" }}>
                            <div
                                class="nav flex-column nav-pills me-3"
                                id="v-pills-tab"
                                role="tablist"
                                aria-orientation="vertical"
                            >
                                <small>Service</small>
                                <button
                                    onClick={() => setActive("Category")}
                                    style={{ width: "12vw", backgroundColor: "white", border: active === "Category" ? "1px solid #2176FF" : "" }}
                                    class="nav-link active mt-2 d-flex justify-content-between"
                                    id="v-pills-home-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#v-pills-home"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-home"
                                    aria-selected="true"
                                >
                                    <span> Category</span>
                                    <span className='py-1' style={{color:"white",fontSize:"12px",backgroundColor:active === "Category" ?"#2176FF":"gray",width:"22px",height:"22px",borderRadius:"33px"}}>
                                        {filters.category.length}
                                    </span>
                                    <span><svg width={18} height={18} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.5 4.16797L12.5 10.0013L7.5 15.8346" stroke={active === "Category" ? "#2176FF" : "gray"} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                    </span>
                                </button>
                                <button
                                    onClick={() => setActive("Sub-Category")}
                                    style={{ width: "12vw", backgroundColor: "white", border: active === "Sub-Category" ? "1px solid #2176FF" : "" }}
                                    class="nav-link mt-2 d-flex justify-content-between"
                                    id="v-pills-home-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#v-pills-home2"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-home2"
                                    aria-selected="true"
                                >
                                    <span> Sub Category</span>
                                    <span className='py-1' style={{color:"white",fontSize:"12px",backgroundColor:active === "Sub-Category" ?"#2176FF":"gray",width:"22px",height:"22px",borderRadius:"33px"}}>
                                        {filters.sub_category.length}
                                    </span>
                                    <span><svg width={18} height={18} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.5 4.16797L12.5 10.0013L7.5 15.8346" stroke={active === "Sub-Category" ? "#2176FF" : "gray"} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                    </span>
                                </button>
                                <button
                                    onClick={() => setActive("Vendor")}
                                    style={{ width: "12vw", backgroundColor: "white", border: active === "Vendor" ? "1px solid #2176FF" : "" }}
                                    class="nav-link  mt-2 d-flex justify-content-between"
                                    id="v-pills-profile-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#v-pills-profile"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-profile"
                                    aria-selected="false"
                                >
                                    <span>Vendor</span>
                                    <span className='py-1' style={{color:"white",fontSize:"12px",backgroundColor:active === "Vendor" ?"#2176FF":"gray",width:"22px",height:"22px",borderRadius:"33px"}}>
                                        {filters.vendor.length}
                                    </span>
                                    <span><svg width={18} height={18} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.5 4.16797L12.5 10.0013L7.5 15.8346" stroke={active === "Vendor" ? "#2176FF" : "gray"} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    </span>
                                </button>

                                <button
                                    onClick={() => setActive("Service-Status")}
                                    style={{ width: "12vw", backgroundColor: "white", border: active === "Service-Status" ? "1px solid #2176FF" : "" }}
                                    class="nav-link  mt-2 d-flex justify-content-between"
                                    id="v-pills-messages-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#v-pills-messages"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-messages"
                                    aria-selected="false"
                                >
                                    <span>Service Status</span>
                                    <span className='py-1' style={{color:"white",fontSize:"12px",backgroundColor:active === "Service-Status" ?"#2176FF":"gray",width:"22px",height:"22px",borderRadius:"33px"}}>
                                        {filters.status?"1":"1"}
                                    </span>
                                    <span><svg width={18} height={18} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.5 4.16797L12.5 10.0013L7.5 15.8346" stroke={active === "Service-Status" ? "#2176FF" : "gray"} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    </span>
                                </button>
                            </div>
                        </div>

                        <div
                            class="tab-content"
                            id="v-pills-tabContent"
                            style={{ position: "relative", left: 20 }}
                        >
                            <div
                                class="tab-pane fade show active"
                                id="v-pills-home"
                                role="tabpanel"
                                aria-labelledby="v-pills-home-tab"
                            >
                                <h4>Category</h4>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="search"
                                    onChange={(e)=>setSearch((prev)=>{return {...prev,category:e.target.value}})}
                                    style={{ width: 320 }}
                                />
                                <br />
                                <div style={{height:categorylist.length>14? "50vh":"",overflowY:categorylist.length>14?"scroll":""}}>
                                {categorylist.filter((dat)=>dat["name"].toLowerCase().includes(search.category.toLowerCase())).map((data) =>
                                    <div class="form-check">
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            value={data.id}
                                            name={data.name}
                                            id={data.name}
                                            checked={filters.category.find((items)=>items.id===data.id)}
                                            onChange={(e) => handleFilterCategory(e)}
                                            style={{ width: 20, height: 20 }}
                                        />
                                        <label class="form-check-label" for="Boat">
                                            {data?.name}
                                        </label>
                                    </div>
                                )}
</div>
                            </div>
                            <div
                                class="tab-pane fade"
                                id="v-pills-profile"
                                role="tabpanel"
                                aria-labelledby="v-pills-profile-tab"
                            >
                                <h4>Vendor</h4>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="search"
                                    onChange={(e)=>setSearch((prev)=>{return {...prev,vendor:e.target.value}})}
                                    style={{ width: 320 }}
                                />
                                <br />
                                <div style={{height:vendorlist.length>14? "50vh":"",overflowY:vendorlist.length>14?"scroll":""}}>
                                {vendorlist.filter((dat)=>dat["name"].toLowerCase().includes(search?.vendor.toLowerCase())).map((data) =>
                                    <div class="form-check">
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            value={data.id}
                                            name={data.name}
                                            checked={filters.vendor.find((items)=>items.id===data.id)}
                                            onChange={(e) => handleFilterVendor(e)}
                                            id={data?.name}
                                            style={{ width: 20, height: 20 }}
                                        />
                                        <label class="form-check-label" for="Boat">
                                            {data?.name}
                                        </label>
                                    </div>
                                )}
</div>
                            </div>
                            <div
                                class="tab-pane fade"
                                id="v-pills-home2"
                                role="tabpanel"
                                aria-labelledby="v-pills-home-tab"
                            >
                                <h4>Sub Category</h4>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="search"
                                    onChange={(e)=>setSearch((prev)=>{return {...prev,sub_category:e.target.value}})}
                                    style={{ width: 320 }}
                                />
                                <br />
                                <div style={{height:subcategorylist.length>14? "50vh":"",overflowY:subcategorylist.length>14?"scroll":""}}>
                                {subcategorylist.filter((dat)=>dat["name"].toLowerCase().includes(search.sub_category.toLowerCase())).map((data) =>
                                    <div class="form-check">
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            value={data.id}
                                            name={data.name}
                                            checked={filters.sub_category.find((items)=>items.id===data.id)}
                                            onChange={(e) => handleFilterSubCategory(e)}
                                            id={data.name}
                                            style={{ width: 20, height: 20 }}
                                        />
                                        <label class="form-check-label" for="Boat">
                                            {data?.name}
                                        </label>
                                    </div>
                                )}
</div>
                            </div>
                            <div
                                class="tab-pane fade"
                                id="v-pills-messages"
                                role="tabpanel"
                                aria-labelledby="v-pills-messages-tab"
                            >
                                <h4>Service Status</h4>
                                
                                <div class="form-check">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id=""
                                        checked={filters.status}
                                        onChange={(e)=>{
                                            setFilters((prev)=>{
                                                return {...prev,status:!filters.status}
                                            })
                                        }}
                                        style={{ width: 20, height: 20 }}
                                    />
                                    <label class="form-check-label" for="Boat">
                                        {filters.status?"Active":"Inactive"}
                                    </label>
                                </div>
                              

                            </div>
                            

                        </div>

                    </div>
                    <div className='d-flex justify-content-end mt-3'>
                        <button type='reset' className='m-1 btn btn-small btn-white'
                        onClick={handleClearFilter}
                        >Clear Filter</button>
                        <button type='button' className='m-1 btn btn-small' style={{ backgroundColor: "#006875", color: "white" }} onClick={handleApplyFilter}>Apply Filter</button>
                    </div>
                </Box>
            </Modal>

        </div>
    )
}
