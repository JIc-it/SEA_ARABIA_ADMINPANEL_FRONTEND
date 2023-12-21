import React, { useState,useEffect } from 'react'
import Thumbnail_1 from "../../static/img/Rectangle 995.png"
import Thumbnail_2 from "../../static/img/Image Hover.png"
import { useNavigate } from 'react-router-dom';
import Food from "../../assets/images/food.png"
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams } from 'react-router-dom';
import {getOneService} from "../../services/service"
import CircularProgress from "@mui/material/CircularProgress";
import { Breadcrumb } from 'react-bootstrap';
import HTMLParse from 'html-react-parser';

const ServiceView = () => {
    const navigate = useNavigate();
    const params=useParams()
    const theme = useTheme();
    const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
    const [oneservice,setOneService]=useState([])
    const [isLoading,setIsLoading]=useState(false)

    useEffect(() => {
        setIsLoading(true)
        getOneService(params.id)
            .then((data) => {
                setOneService(data);
                setIsLoading(false)
            })
            .catch((error) => {
                console.error("Error fetching  data:", error);
            });
    }, [params.id]);

    return (
        <>
       {!isLoading &&  <div className="page" style={{ top: 20 }}>
            <div className='container'>
            <Breadcrumb style={{ marginLeft: "5px" }}>
                    <Breadcrumb.Item href="#">Services
                        <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.33333 5L12.7441 9.41074C13.0695 9.73618 13.0695 10.2638 12.7441 10.5893L8.33333 15" stroke="#68727D" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <span style={{ color: "#006875" }}>{oneservice?.name}</span>

                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className='d-flex justify-content-between mt-5 ms-3'>
                    <div style={{ cursor: "pointer" }} onClick={() => navigate(-1)}>
                        <svg width={20} height={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 12H4M4 12L10 6M4 12L10 18" stroke="#252525" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg> &nbsp;<span style={{ fontWeight: "800" }}>Back</span>
                    </div>
                    <button
                        className="btn btn-info vendor_button"
                        style={{ borderRadius: "6px" }}
                        type="button"
                        onClick={() => navigate(`/service-edit/${oneservice?.id}`)}
                    >
                        Edit Service &nbsp;
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 15L15 5M15 5H7.5M15 5V12.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
                <div className='row' style={{position:"relative"}}>
                    <div className='col-lg-8'>
                        <div style={{ backgroundColor: "#FFFF", borderRadius: "5px" }} className="mt-4 w-100 px-2">
                            <p className="p-2" style={{ fontWeight: "700" }}>Service Details</p>
                            <div className="d-flex">
                                <div className="col-6 px-2">
                                    <div>
                                        <p style={{ color: "#68727D" }}>Category</p>
                                        <p style={{ fontWeight: "700" }}>{oneservice?.category?.map((data)=>data.name)}</p>
                                    </div>
                                </div>
                                <div className="col-6 px-2">
                                    <div>
                                        <p style={{ color: "#68727D" }}>Sub Category</p>
                                        <p style={{ fontWeight: "700" }}>{oneservice?.sub_category?.map((data)=>data.name)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="col-12 px-2">
                                    <div>
                                        <p style={{ color: "#68727D" }}>Description</p>
                                        <p>{oneservice?.description && HTMLParse(oneservice?.description)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="col-12 px-2">
                                    <div>
                                        <p style={{ color: "#68727D" }}>Details</p>
                                        <p>{oneservice?.lounge} Lounge &nbsp; {oneservice?.bedroom} Bedroom &nbsp; {oneservice?.toilet} Toilet</p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="col-6 px-2">
                                    <div>
                                        <p style={{ color: "#68727D" }}>Capacity</p>
                                        <p style={{ fontWeight: "700" }}>{oneservice?.capacity}</p>
                                    </div>
                                </div>
                                <div className="col-6 px-2">
                                    <div>
                                        <p style={{ color: "#68727D" }}>Amenities</p>
                                        <p style={{ fontWeight: "700" }}>{oneservice?.amenities?.map((data)=>data.name)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="col-4 px-2">
                                    <div>
                                        <p style={{ color: "#68727D" }}>Pickup Point</p>
                                        <p style={{textTransform:"capitalize"}}>{oneservice?.pickup_point}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ backgroundColor: "#FFFF", borderRadius: "5px" }} className="mt-4 w-100 px-2">
                            <p className="p-2" style={{ fontWeight: "700" }}>Pricing</p>
                            <div className="d-flex">
                                <div className="col-6 px-2">
                                    <div>
                                        <p style={{ color: "#68727D" }}>Profit Method</p>
                                        <p style={{ fontWeight: "700" }}>{oneservice?.price?.profile_method?.name}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="col-6 px-2">
                                    <div>
                                        <p style={{ color: "#68727D" }}>Duration</p>
                                        <p style={{ fontWeight: "700" }}>{oneservice?.price?. duration}</p>
                                    </div>
                                </div>
                                <div className="col-6 px-2">
                                    <div>
                                        <p style={{ color: "#68727D" }}>Price</p>
                                        <p style={{ fontWeight: "700" }}>{oneservice?.price?.price} KWD</p>
                                    </div>
                                </div>
                            </div>
                            {/* <div style={{ width: '100%', height: '100%', border: '1px #EAEBF0 solid' }}></div>
                            <p className="p-2" style={{ fontWeight: "700" }}>Policy</p>
                            <div className="d-flex">
                                <div className="col-6 px-2">
                                    <div>
                                        <p style={{ color: "#68727D" }}>Privacy Policy</p>
                                        <p style={{ fontWeight: "700" }}>Ownership</p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="col-6 px-2">
                                    <div>
                                        <p style={{ color: "#68727D" }}>Return Policy</p>
                                        <p style={{ fontWeight: "700" }}>Ownership</p>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div style={{ backgroundColor: "#FFFF", borderRadius: "5px" }} className="mt-4 w-100 px-2">
                            <p className="p-2" style={{ fontWeight: "700" }}>Policy</p>
                            <div className="d-flex">
                                <div className="col-12 px-2">
                                    <div>
                                        <p style={{ color: "#68727D" }}>Privacy Policy</p>
                                        <p>{oneservice?.cancellation_policy}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="col-12 px-2">
                                    <div>
                                        <p style={{ color: "#68727D" }}>Return Policy</p>
                                        <p>{oneservice?.refund_policy}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4'>
                        <div style={{ backgroundColor: "#FFFF", borderRadius: "5px" }} className="mt-4 w-100 px-2">
                            <p className="p-2" style={{ fontWeight: "700" }}>Images</p>
                            <p style={{ fontWeight: "700" }}>Thumbnail</p>
                            <div className="row">
                                {oneservice?.service_image?.map((data, index) =>
                                    <div className="col-6 mb-3" key={index}>
                                        <div >
                                            <img src={data.image} className='rounded' style={{ width: "200px",height:"125px" }} />
                                          
                                        </div>
                                    </div>)}
                                {/* <div className="col-6 mb-3">
                                    <div style={{ position: "relative" }} onMouseEnter={handleHoverEffectTrue} onMouseLeave={handleHoverEffectFalse}>
                                        <img src={Thumbnail_1} />
                                        {hovereffect &&
                                            <div style={{ position: "absolute", bottom: "50px", left: "20px" }}>
                                                <button className="btn btn-blue px-1 py-1 me-1" style={{ fontSize: "10px", cursor: "pointer" }}>setThumbnail</button>
                                                <button className="btn btn-danger px-1 py-1" style={{ fontSize: "10px", cursor: "pointer" }}>Remove</button>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="col-6 mb-3">
                                    <div style={{ position: "relative" }} onMouseEnter={handleHoverEffectTrue} onMouseLeave={handleHoverEffectFalse}>
                                        <img src={Thumbnail_1} />
                                        {hovereffect &&
                                            <div style={{ position: "absolute", bottom: "50px", left: "20px" }}>
                                                <button className="btn btn-blue px-1 py-1 me-1" style={{ fontSize: "10px", cursor: "pointer" }}>setThumbnail</button>
                                                <button className="btn btn-danger px-1 py-1" style={{ fontSize: "10px", cursor: "pointer" }}>Remove</button>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="col-6 mb-3">
                                    <div style={{ position: "relative" }} onMouseEnter={handleHoverEffectTrue} onMouseLeave={handleHoverEffectFalse}>
                                        <img src={Thumbnail_1} />
                                        {hovereffect &&
                                            <div style={{ position: "absolute", bottom: "50px", left: "20px" }}>
                                                <button className="btn btn-blue px-1 py-1 me-1" style={{ fontSize: "10px", cursor: "pointer" }}>setThumbnail</button>
                                                <button className="btn btn-danger px-1 py-1" style={{ fontSize: "10px", cursor: "pointer" }}>Remove</button>
                                            </div>
                                        }
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    {/* <div className='col-lg-4' style={{position:"absolute",top:"400px",right:"0%",display:isMobileView?"none":""}}>
                        <div style={{ backgroundColor: "#FFFF", borderRadius: "5px" }} className="mt-4 w-100 px-2 py-2">
                            <div className='d-flex justify-content-between align-items-center'>
                            <p className="p-2" style={{ fontWeight: "700" }}>Add on services</p>
                            
                            </div>
                           
                            <div style={{border:"1px solid lightgray",borderRadius:"5px"}} className='d-flex justify-content-between align-items-center p-2 my-3'>
                                <div>
                                <img src={Food} width={50} height={40}/>
                                </div>
                                <div>
                                    <div className='d-flex align-items-center justify-content-between mx-2'>
                                        <div style={{fontWeight:"550"}}>Food | 50 KWD</div>
                                        <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
                                            <div style={{ display: "flex", alignItems: "center",padding:"5px" }}>
                                                <div style={{ fontSize: "12px" }}>{"ACTIVE"}</div>
                                               
                                            </div> 
                                           
                                        </div>
                                    </div>
                                    <div style={{color:"#68727D"}} className='mx-2'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.
                                    </div>
                                </div>
                            </div>
                            <div style={{border:"1px solid lightgray",borderRadius:"5px"}} className='d-flex justify-content-between align-items-center p-2 my-3'>
                                <div>
                                <img src={Food} width={50} height={40}/>
                                </div>
                                <div>
                                    <div className='d-flex align-items-center justify-content-between mx-2'>
                                        <div style={{fontWeight:"550"}}>Food | 50 KWD</div>
                                        <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
                                            <div style={{ display: "flex", alignItems: "center",padding:"5px" }}>
                                                <div style={{ fontSize: "12px" }}>{"ACTIVE"}</div>
                                               
                                            </div> 
                                           
                                        </div>
                                    </div>
                                    <div style={{color:"#68727D"}} className='mx-2'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.
                                    </div>
                                </div>
                            </div>
                            <div style={{border:"1px solid lightgray",borderRadius:"5px"}} className='d-flex justify-content-between align-items-center p-2 my-3'>
                                <div>
                                <img src={Food} width={50} height={40}/>
                                </div>
                                <div>
                                    <div className='d-flex align-items-center justify-content-between mx-2'>
                                        <div style={{fontWeight:"550"}}>Food | 50 KWD</div>
                                        <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
                                            <div style={{ display: "flex", alignItems: "center",padding:"5px" }}>
                                                <div style={{ fontSize: "12px" }}>{"ACTIVE"}</div>
                                               
                                            </div> 
                                           
                                        </div>
                                    </div>
                                    <div style={{color:"#68727D"}} className='mx-2'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4' style={{display:isMobileView?"block":"none"}}>
                        <div style={{ backgroundColor: "#FFFF", borderRadius: "5px" }} className="mt-4 w-100 px-2 py-2">
                        <div className='d-flex justify-content-between align-items-center'>
                            <p className="p-2" style={{ fontWeight: "700" }}>Add on services</p>
                            
                            </div>
                            <div style={{border:"1px solid lightgray",borderRadius:"5px"}} className='d-flex justify-content-between align-items-center p-2 my-3'>
                                <div>
                                <img src={Food} width={50} height={40}/>
                                </div>
                                <div>
                                    <div className='d-flex align-items-center justify-content-between mx-2'>
                                        <div style={{fontWeight:"550"}}>Food | 50 KWD</div>
                                        <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
                                            <div style={{ display: "flex", alignItems: "center",padding:"5px" }}>
                                                <div style={{ fontSize: "12px" }}>{"ACTIVE"}</div>
                                               
                                            </div> 
                                           
                                        </div>
                                    </div>
                                    <div style={{color:"#68727D"}} className='mx-2'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.
                                    </div>
                                </div>
                            </div>
                            <div style={{border:"1px solid lightgray",borderRadius:"5px"}} className='d-flex justify-content-between align-items-center p-2 my-3'>
                                <div>
                                <img src={Food} width={50} height={40}/>
                                </div>
                                <div>
                                    <div className='d-flex align-items-center justify-content-between mx-2'>
                                        <div style={{fontWeight:"550"}}>Food | 50 KWD</div>
                                        <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
                                            <div style={{ display: "flex", alignItems: "center",padding:"5px" }}>
                                                <div style={{ fontSize: "12px" }}>{"ACTIVE"}</div>
                                               
                                            </div> 
                                           
                                        </div>
                                    </div>
                                    <div style={{color:"#68727D"}} className='mx-2'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.
                                    </div>
                                </div>
                            </div>
                            <div style={{border:"1px solid lightgray",borderRadius:"5px"}} className='d-flex justify-content-between align-items-center p-2 my-3'>
                                <div>
                                <img src={Food} width={50} height={40}/>
                                </div>
                                <div>
                                    <div className='d-flex align-items-center justify-content-between mx-2'>
                                        <div style={{fontWeight:"550"}}>Food | 50 KWD</div>
                                        <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
                                            <div style={{ display: "flex", alignItems: "center",padding:"5px" }}>
                                                <div style={{ fontSize: "12px" }}>{"ACTIVE"}</div>
                                               
                                            </div> 
                                           
                                        </div>
                                    </div>
                                    <div style={{color:"#68727D"}} className='mx-2'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
            <br /><br />
        </div>}
        {isLoading &&
         <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
         <CircularProgress />
       </div>
        }
        </>
    )
}

export default ServiceView