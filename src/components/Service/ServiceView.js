import React from 'react'
import Thumbnail_1 from "../../static/img/Rectangle 995.png"
import Thumbnail_2 from "../../static/img/Image Hover.png"
import { useNavigate } from 'react-router-dom';
import Food from "../../assets/images/food.png"
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const ServiceView = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <div className="page" style={{ top: 20 }}>
            <div className='container'>
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
                        onClick={() => navigate(`/service-edit/${1234567}`)}
                    >
                        Edit Service &nbsp;
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 15L15 5M15 5H7.5M15 5V12.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
                <div className='row' style={{position:"relative"}}>
                    <div className='col-lg-8'>
                        <div style={{ backgroundColor: "#F8F8F8", borderRadius: "5px" }} className="mt-4 w-100 px-2">
                            <p className="p-2" style={{ fontWeight: "700" }}>Service Details</p>
                            <div className="d-flex">
                                <div className="col-6 px-2">
                                    <div>
                                        <p style={{ color: "#68727D" }}>Category</p>
                                        <p style={{ fontWeight: "700" }}>Boat</p>
                                    </div>
                                </div>
                                <div className="col-6 px-2">
                                    <div>
                                        <p style={{ color: "#68727D" }}>Sub Category</p>
                                        <p style={{ fontWeight: "700" }}>Fishing Boat</p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="col-12 px-2">
                                    <div>
                                        <p style={{ color: "#68727D" }}>Description</p>
                                        <p>The famous 75FT Luxury Yacht Majesty is able to accommodate and entertain up to 25 guests in utmost luxury, Majesty ensures the comforts of a large, spacious private yacht but also the success of your entertaining or special corporate events.</p>
                                        <p>Enjoy the experience of yacht rental Doha with MAJESTY 75FT with 4 master bedrooms and 4 washrooms.</p>
                                        <p>We recommend at least 3 to 4 hours of cruising. Cruise along Doha's beautiful coastal waters </p>
                                        <li>Size: Yacht 75 ft. / 24.75 m</li>
                                        <li> Capacity/Guests: for 25 people</li>
                                        <li>Crew: 2 (1 Captain - 1 Crew)</li>
                                        <li>Cabin: 4 Rooms, 4 bathrooms </li>
                                        <li>Water Toys: Jet Ski*</li>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="col-12 px-2">
                                    <div>
                                        <p style={{ color: "#68727D" }}>Details</p>
                                        <p>2 Lounge &nbsp; 1 Bedroom &nbsp; 2 Toilet</p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="col-6 px-2">
                                    <div>
                                        <p style={{ color: "#68727D" }}>Capacity</p>
                                        <p style={{ fontWeight: "700" }}>18</p>
                                    </div>
                                </div>
                                <div className="col-6 px-2">
                                    <div>
                                        <p style={{ color: "#68727D" }}>Amenities</p>
                                        <p style={{ fontWeight: "700" }}>[ Amenities ]</p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="col-4 px-2">
                                    <div>
                                        <p style={{ color: "#68727D" }}>Pickup Point</p>
                                        <p>[ Pickup Point ]</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ backgroundColor: "#F8F8F8", borderRadius: "5px" }} className="mt-4 w-100 px-2">
                            <p className="p-2" style={{ fontWeight: "700" }}>Pricing</p>
                            <div className="d-flex">
                                <div className="col-6 px-2">
                                    <div>
                                        <p style={{ color: "#68727D" }}>Profit Method</p>
                                        <p style={{ fontWeight: "700" }}>Ownership</p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="col-6 px-2">
                                    <div>
                                        <p style={{ color: "#68727D" }}>Duration</p>
                                        <p style={{ fontWeight: "700" }}>[ Duration ]</p>
                                    </div>
                                </div>
                                <div className="col-6 px-2">
                                    <div>
                                        <p style={{ color: "#68727D" }}>Price</p>
                                        <p style={{ fontWeight: "700" }}>64 KWD</p>
                                    </div>
                                </div>
                            </div>
                            <div style={{ width: '100%', height: '100%', border: '1px #EAEBF0 solid' }}></div>
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
                            </div>
                        </div>
                        <div style={{ backgroundColor: "#F8F8F8", borderRadius: "5px" }} className="mt-4 w-100 px-2">
                            <p className="p-2" style={{ fontWeight: "700" }}>Policy</p>
                            <div className="d-flex">
                                <div className="col-12 px-2">
                                    <div>
                                        <p style={{ color: "#68727D" }}>Privacy Policy</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            In commodo eleifend tempus. Nullam blandit lacinia tellus, eu ullamcorper orci fermentum vel.
                                            Vivamus quis augue urna. Duis elementum tristique odio. Sed pharetra sed mauris sed venenatis.
                                            Donec metus erat, auctor eget lacinia vitae, sodales pellentesque leo. Aenean varius libero ut
                                            tellus ullamcorper pharetra. Vestibulum in placerat tellus. Aenean pulvinar cursus arcu, quis
                                            ultrices neque iaculis ut. Curabitur sit amet odio consectetur, feugiat neque posuere, ullamcorper enim.
                                            Praesent eu ultricies nibh, eu varius enim. In arcu erat, vehicula vel iaculis in, hendrerit ut turpis.
                                            Etiam a rhoncus elit. Fusce euismod scelerisque enim, ut viverra mi fermentum quis. Praesent luctus risus
                                            et ipsum rutrum pulvinar. Ut vestibulum dapibus dui quis tempor.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="col-12 px-2">
                                    <div>
                                        <p style={{ color: "#68727D" }}>Return Policy</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            In commodo eleifend tempus. Nullam blandit lacinia tellus, eu ullamcorper orci fermentum vel.
                                            Vivamus quis augue urna. Duis elementum tristique odio. Sed pharetra sed mauris sed venenatis.
                                            Donec metus erat, auctor eget lacinia vitae, sodales pellentesque leo. Aenean varius libero ut
                                            tellus ullamcorper pharetra. Vestibulum in placerat tellus. Aenean pulvinar cursus arcu, quis
                                            ultrices neque iaculis ut. Curabitur sit amet odio consectetur, feugiat neque posuere, ullamcorper enim.
                                            Praesent eu ultricies nibh, eu varius enim. In arcu erat, vehicula vel iaculis in, hendrerit ut turpis.
                                            Etiam a rhoncus elit. Fusce euismod scelerisque enim, ut viverra mi fermentum quis. Praesent luctus risus
                                            et ipsum rutrum pulvinar. Ut vestibulum dapibus dui quis tempor.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4'>
                        <div style={{ backgroundColor: "#F8F8F8", borderRadius: "5px" }} className="mt-4 w-100 px-2">
                            <p className="p-2" style={{ fontWeight: "700" }}>Images</p>
                            <p style={{ fontWeight: "700" }}>Thumbnail</p>
                            <div className="row">
                                <div className="col-6 mb-3">
                                    <div>
                                        <img src={Thumbnail_1} />
                                    </div>
                                </div>
                                <div className="col-6 mb-3">
                                    <div>
                                        <img src={Thumbnail_2} />
                                    </div>
                                </div>
                                <div className="col-6 mb-3">
                                    <div>
                                        <img src={Thumbnail_1} />
                                    </div>
                                </div>
                                <div className="col-6 mb-3">
                                    <div>
                                        <img src={Thumbnail_2} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4' style={{position:"absolute",top:"400px",right:"0%",display:isMobileView?"none":""}}>
                        <div style={{ backgroundColor: "#FFFF", borderRadius: "5px" }} className="mt-4 w-100 px-2 py-2">
                            <div className='d-flex justify-content-between align-items-center'>
                            <p className="p-2" style={{ fontWeight: "700" }}>Add on services</p>
                            <button type="button" className='btn px-2 py-1' style={{backgroundColor:"#187AF7",color:"#ffff",fontSize:"12px"}} >Create Add On</button>
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
                                                <label class="switch" style={{ marginLeft: "5px" }}>
                                                    <input type="checkbox" defaultChecked />
                                                    <span class="slider round"></span>
                                                </label>
                                            </div> 
                                            <button style={{backgroundColor:"transparent",border:"none",color:"#2684FC"}}>
                                                <svg width={21} height={21} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.61719 19.082C3.61719 18.7369 3.89701 18.457 4.24219 18.457H17.5755C17.9207 18.457 18.2005 18.7369 18.2005 19.082C18.2005 19.4272 17.9207 19.707 17.5755 19.707H4.24219C3.89701 19.707 3.61719 19.4272 3.61719 19.082Z" fill="#2684FC" />
                                                    <path d="M9.71963 13.9347C9.93175 13.7693 10.1242 13.5768 10.5089 13.1921L15.4395 8.26151C14.7684 7.98222 13.9736 7.52344 13.222 6.77176C12.4702 6.01996 12.0114 5.22502 11.7321 4.5539L6.8014 9.48457L6.80138 9.48459C6.41663 9.86934 6.22424 10.0617 6.05879 10.2739C5.86361 10.5241 5.69628 10.7948 5.55975 11.0813C5.44401 11.3242 5.35797 11.5823 5.18589 12.0985L4.27849 14.8207C4.19381 15.0748 4.25992 15.3549 4.44927 15.5442C4.63863 15.7336 4.91871 15.7997 5.17275 15.715L7.89497 14.8076C8.4112 14.6355 8.66932 14.5495 8.91217 14.4337C9.19865 14.2972 9.4694 14.1299 9.71963 13.9347Z" fill="#2684FC" />
                                                    <path d="M16.8077 6.89334C17.8315 5.86954 17.8315 4.20962 16.8077 3.18582C15.7839 2.16202 14.124 2.16202 13.1002 3.18582L12.5088 3.77718C12.5169 3.80163 12.5253 3.82642 12.534 3.85154C12.7508 4.4763 13.1597 5.29531 13.9291 6.06465C14.6984 6.83399 15.5174 7.24296 16.1422 7.45971C16.1672 7.46839 16.1919 7.47675 16.2162 7.48481L16.8077 6.89334Z" fill="#2684FC" />
                                                </svg>

                                                    Edit
                                            </button>
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
                                                <label class="switch" style={{ marginLeft: "5px" }}>
                                                    <input type="checkbox" defaultChecked />
                                                    <span class="slider round"></span>
                                                </label>
                                            </div> 
                                            <button style={{backgroundColor:"transparent",border:"none",color:"#2684FC"}}>
                                                <svg width={21} height={21} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.61719 19.082C3.61719 18.7369 3.89701 18.457 4.24219 18.457H17.5755C17.9207 18.457 18.2005 18.7369 18.2005 19.082C18.2005 19.4272 17.9207 19.707 17.5755 19.707H4.24219C3.89701 19.707 3.61719 19.4272 3.61719 19.082Z" fill="#2684FC" />
                                                    <path d="M9.71963 13.9347C9.93175 13.7693 10.1242 13.5768 10.5089 13.1921L15.4395 8.26151C14.7684 7.98222 13.9736 7.52344 13.222 6.77176C12.4702 6.01996 12.0114 5.22502 11.7321 4.5539L6.8014 9.48457L6.80138 9.48459C6.41663 9.86934 6.22424 10.0617 6.05879 10.2739C5.86361 10.5241 5.69628 10.7948 5.55975 11.0813C5.44401 11.3242 5.35797 11.5823 5.18589 12.0985L4.27849 14.8207C4.19381 15.0748 4.25992 15.3549 4.44927 15.5442C4.63863 15.7336 4.91871 15.7997 5.17275 15.715L7.89497 14.8076C8.4112 14.6355 8.66932 14.5495 8.91217 14.4337C9.19865 14.2972 9.4694 14.1299 9.71963 13.9347Z" fill="#2684FC" />
                                                    <path d="M16.8077 6.89334C17.8315 5.86954 17.8315 4.20962 16.8077 3.18582C15.7839 2.16202 14.124 2.16202 13.1002 3.18582L12.5088 3.77718C12.5169 3.80163 12.5253 3.82642 12.534 3.85154C12.7508 4.4763 13.1597 5.29531 13.9291 6.06465C14.6984 6.83399 15.5174 7.24296 16.1422 7.45971C16.1672 7.46839 16.1919 7.47675 16.2162 7.48481L16.8077 6.89334Z" fill="#2684FC" />
                                                </svg>

                                                    Edit
                                            </button>
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
                                                <label class="switch" style={{ marginLeft: "5px" }}>
                                                    <input type="checkbox" defaultChecked />
                                                    <span class="slider round"></span>
                                                </label>
                                            </div> 
                                            <button style={{backgroundColor:"transparent",border:"none",color:"#2684FC"}}>
                                                <svg width={21} height={21} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.61719 19.082C3.61719 18.7369 3.89701 18.457 4.24219 18.457H17.5755C17.9207 18.457 18.2005 18.7369 18.2005 19.082C18.2005 19.4272 17.9207 19.707 17.5755 19.707H4.24219C3.89701 19.707 3.61719 19.4272 3.61719 19.082Z" fill="#2684FC" />
                                                    <path d="M9.71963 13.9347C9.93175 13.7693 10.1242 13.5768 10.5089 13.1921L15.4395 8.26151C14.7684 7.98222 13.9736 7.52344 13.222 6.77176C12.4702 6.01996 12.0114 5.22502 11.7321 4.5539L6.8014 9.48457L6.80138 9.48459C6.41663 9.86934 6.22424 10.0617 6.05879 10.2739C5.86361 10.5241 5.69628 10.7948 5.55975 11.0813C5.44401 11.3242 5.35797 11.5823 5.18589 12.0985L4.27849 14.8207C4.19381 15.0748 4.25992 15.3549 4.44927 15.5442C4.63863 15.7336 4.91871 15.7997 5.17275 15.715L7.89497 14.8076C8.4112 14.6355 8.66932 14.5495 8.91217 14.4337C9.19865 14.2972 9.4694 14.1299 9.71963 13.9347Z" fill="#2684FC" />
                                                    <path d="M16.8077 6.89334C17.8315 5.86954 17.8315 4.20962 16.8077 3.18582C15.7839 2.16202 14.124 2.16202 13.1002 3.18582L12.5088 3.77718C12.5169 3.80163 12.5253 3.82642 12.534 3.85154C12.7508 4.4763 13.1597 5.29531 13.9291 6.06465C14.6984 6.83399 15.5174 7.24296 16.1422 7.45971C16.1672 7.46839 16.1919 7.47675 16.2162 7.48481L16.8077 6.89334Z" fill="#2684FC" />
                                                </svg>

                                                    Edit
                                            </button>
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
                        <div style={{ backgroundColor: "#F8F8F8", borderRadius: "5px" }} className="mt-4 w-100 px-2 py-2">
                        <div className='d-flex justify-content-between align-items-center'>
                            <p className="p-2" style={{ fontWeight: "700" }}>Add on services</p>
                            <button type="button"  className='btn px-2 py-1' style={{backgroundColor:"#187AF7",color:"#ffff",fontSize:"12px"}} >Create Add On</button>
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
                                                <label class="switch" style={{ marginLeft: "5px" }}>
                                                    <input type="checkbox" defaultChecked />
                                                    <span class="slider round"></span>
                                                </label>
                                            </div> 
                                            <button style={{backgroundColor:"transparent",border:"none",color:"#2684FC"}}>
                                                <svg width={21} height={21} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.61719 19.082C3.61719 18.7369 3.89701 18.457 4.24219 18.457H17.5755C17.9207 18.457 18.2005 18.7369 18.2005 19.082C18.2005 19.4272 17.9207 19.707 17.5755 19.707H4.24219C3.89701 19.707 3.61719 19.4272 3.61719 19.082Z" fill="#2684FC" />
                                                    <path d="M9.71963 13.9347C9.93175 13.7693 10.1242 13.5768 10.5089 13.1921L15.4395 8.26151C14.7684 7.98222 13.9736 7.52344 13.222 6.77176C12.4702 6.01996 12.0114 5.22502 11.7321 4.5539L6.8014 9.48457L6.80138 9.48459C6.41663 9.86934 6.22424 10.0617 6.05879 10.2739C5.86361 10.5241 5.69628 10.7948 5.55975 11.0813C5.44401 11.3242 5.35797 11.5823 5.18589 12.0985L4.27849 14.8207C4.19381 15.0748 4.25992 15.3549 4.44927 15.5442C4.63863 15.7336 4.91871 15.7997 5.17275 15.715L7.89497 14.8076C8.4112 14.6355 8.66932 14.5495 8.91217 14.4337C9.19865 14.2972 9.4694 14.1299 9.71963 13.9347Z" fill="#2684FC" />
                                                    <path d="M16.8077 6.89334C17.8315 5.86954 17.8315 4.20962 16.8077 3.18582C15.7839 2.16202 14.124 2.16202 13.1002 3.18582L12.5088 3.77718C12.5169 3.80163 12.5253 3.82642 12.534 3.85154C12.7508 4.4763 13.1597 5.29531 13.9291 6.06465C14.6984 6.83399 15.5174 7.24296 16.1422 7.45971C16.1672 7.46839 16.1919 7.47675 16.2162 7.48481L16.8077 6.89334Z" fill="#2684FC" />
                                                </svg>

                                                    Edit
                                            </button>
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
                                                <label class="switch" style={{ marginLeft: "5px" }}>
                                                    <input type="checkbox" defaultChecked />
                                                    <span class="slider round"></span>
                                                </label>
                                            </div> 
                                            <button style={{backgroundColor:"transparent",border:"none",color:"#2684FC"}}>
                                                <svg width={21} height={21} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.61719 19.082C3.61719 18.7369 3.89701 18.457 4.24219 18.457H17.5755C17.9207 18.457 18.2005 18.7369 18.2005 19.082C18.2005 19.4272 17.9207 19.707 17.5755 19.707H4.24219C3.89701 19.707 3.61719 19.4272 3.61719 19.082Z" fill="#2684FC" />
                                                    <path d="M9.71963 13.9347C9.93175 13.7693 10.1242 13.5768 10.5089 13.1921L15.4395 8.26151C14.7684 7.98222 13.9736 7.52344 13.222 6.77176C12.4702 6.01996 12.0114 5.22502 11.7321 4.5539L6.8014 9.48457L6.80138 9.48459C6.41663 9.86934 6.22424 10.0617 6.05879 10.2739C5.86361 10.5241 5.69628 10.7948 5.55975 11.0813C5.44401 11.3242 5.35797 11.5823 5.18589 12.0985L4.27849 14.8207C4.19381 15.0748 4.25992 15.3549 4.44927 15.5442C4.63863 15.7336 4.91871 15.7997 5.17275 15.715L7.89497 14.8076C8.4112 14.6355 8.66932 14.5495 8.91217 14.4337C9.19865 14.2972 9.4694 14.1299 9.71963 13.9347Z" fill="#2684FC" />
                                                    <path d="M16.8077 6.89334C17.8315 5.86954 17.8315 4.20962 16.8077 3.18582C15.7839 2.16202 14.124 2.16202 13.1002 3.18582L12.5088 3.77718C12.5169 3.80163 12.5253 3.82642 12.534 3.85154C12.7508 4.4763 13.1597 5.29531 13.9291 6.06465C14.6984 6.83399 15.5174 7.24296 16.1422 7.45971C16.1672 7.46839 16.1919 7.47675 16.2162 7.48481L16.8077 6.89334Z" fill="#2684FC" />
                                                </svg>

                                                    Edit
                                            </button>
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
                                                <label class="switch" style={{ marginLeft: "5px" }}>
                                                    <input type="checkbox" defaultChecked />
                                                    <span class="slider round"></span>
                                                </label>
                                            </div> 
                                            <button style={{backgroundColor:"transparent",border:"none",color:"#2684FC"}}>
                                                <svg width={21} height={21} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.61719 19.082C3.61719 18.7369 3.89701 18.457 4.24219 18.457H17.5755C17.9207 18.457 18.2005 18.7369 18.2005 19.082C18.2005 19.4272 17.9207 19.707 17.5755 19.707H4.24219C3.89701 19.707 3.61719 19.4272 3.61719 19.082Z" fill="#2684FC" />
                                                    <path d="M9.71963 13.9347C9.93175 13.7693 10.1242 13.5768 10.5089 13.1921L15.4395 8.26151C14.7684 7.98222 13.9736 7.52344 13.222 6.77176C12.4702 6.01996 12.0114 5.22502 11.7321 4.5539L6.8014 9.48457L6.80138 9.48459C6.41663 9.86934 6.22424 10.0617 6.05879 10.2739C5.86361 10.5241 5.69628 10.7948 5.55975 11.0813C5.44401 11.3242 5.35797 11.5823 5.18589 12.0985L4.27849 14.8207C4.19381 15.0748 4.25992 15.3549 4.44927 15.5442C4.63863 15.7336 4.91871 15.7997 5.17275 15.715L7.89497 14.8076C8.4112 14.6355 8.66932 14.5495 8.91217 14.4337C9.19865 14.2972 9.4694 14.1299 9.71963 13.9347Z" fill="#2684FC" />
                                                    <path d="M16.8077 6.89334C17.8315 5.86954 17.8315 4.20962 16.8077 3.18582C15.7839 2.16202 14.124 2.16202 13.1002 3.18582L12.5088 3.77718C12.5169 3.80163 12.5253 3.82642 12.534 3.85154C12.7508 4.4763 13.1597 5.29531 13.9291 6.06465C14.6984 6.83399 15.5174 7.24296 16.1422 7.45971C16.1672 7.46839 16.1919 7.47675 16.2162 7.48481L16.8077 6.89334Z" fill="#2684FC" />
                                                </svg>

                                                    Edit
                                            </button>
                                        </div>
                                    </div>
                                    <div style={{color:"#68727D"}} className='mx-2'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br /><br />
        </div>
    )
}

export default ServiceView