import React, { useState, useEffect } from "react";
// import Thumbnail_1 from "../../static/img/Rectangle 995.png"
// import Thumbnail_2 from "../../static/img/Image Hover.png"
import { useNavigate } from "react-router-dom";
// import Food from "../../assets/images/food.png"
// import { useTheme } from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams } from "react-router-dom";
import { getOneService } from "../../services/service";
import CircularProgress from "@mui/material/CircularProgress";
import { Breadcrumb } from "react-bootstrap";
import HTMLParse from "html-react-parser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WithPermission from "../HigherOrderComponents/PermissionCheck/WithPermission";
import CommonButtonForPermission from "../HigherOrderComponents/CommonButtonForPermission";
import {
  menuIdConstant,
  permissionCategory,
} from "../Permissions/PermissionConstants";

const ServiceView = () => {
  const navigate = useNavigate();
  const params = useParams();
  // const theme = useTheme();
  // const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
  const [oneservice, setOneService] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getOneService(params.id)
      .then((data) => {
        setOneService(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  }, [params.id]);

  const price_cretrion = () => {
    if (oneservice?.is_destination) {
      return "Per Destionation";
    }
    if (oneservice?.is_duration) {
      return "Per Duration";
    }
    if (oneservice?.is_day) {
      return "Per Day";
    }
    if (oneservice?.is_time) {
      return "Per Time";
    }
    if (oneservice?.is_date) {
      return "Per Date";
    }
  };

  const EditServiceWithPermission = WithPermission(
    CommonButtonForPermission,
    permissionCategory.edit,
    menuIdConstant.serviceManagement,
    () => navigate(`/service-edit/${oneservice?.id}`),
    "btn btn-info vendor_button",
    "Edit Service",
    { borderRadius: "6px" },
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 15L15 5M15 5H7.5M15 5V12.5"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  return (
    <>
      {!isLoading && (
        <div className="page" style={{ top: 20 }}>
          <div className="container">
            <Breadcrumb style={{ marginLeft: "5px" }}>
              <Breadcrumb.Item href="#">
                Services
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.33333 5L12.7441 9.41074C13.0695 9.73618 13.0695 10.2638 12.7441 10.5893L8.33333 15"
                    stroke="#68727D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span style={{ color: "#006875" }}>{oneservice?.name}</span>
              </Breadcrumb.Item>
            </Breadcrumb>
            <div className="d-flex justify-content-between mt-5">
              <div style={{ cursor: "pointer" }} onClick={() => navigate(-1)}>
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 12H4M4 12L10 6M4 12L10 18"
                    stroke="#252525"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>{" "}
                &nbsp;<span style={{ fontWeight: "800" }}>Back</span>
              </div>
              <div className="d-flex">
                <div
                  class="px-3 py-2 mx-2 rounded"
                  style={{
                    textAlign: "center",
                    color: oneservice.is_active === true ? "#13b370" : "red",
                    background:
                      oneservice.is_active === true
                        ? "rgba(19, 179, 112, 0.2)"
                        : "#ff9999",
                  }}
                >
                  {oneservice.is_active === true ? "Active" : "Inactive"}
                </div>
                <EditServiceWithPermission />
              </div>
            </div>
            <div className="row" style={{ position: "relative" }}>
              <div className="col-lg-8">
                <div
                  style={{ backgroundColor: "#FFFF", borderRadius: "5px" }}
                  className="mt-4 w-100 px-2"
                >
                  <p className="p-2" style={{ fontWeight: "550" }}>
                    Service Details
                  </p>
                  <div className="d-flex">
                    <div className="col-6 px-2">
                      <div>
                        <p style={{ color: "#68727D" }}>Category</p>
                        <p style={{ fontWeight: "550" }}>
                          {oneservice?.category?.[0]?.name}
                        </p>
                      </div>
                    </div>
                    <div className="col-6 px-2">
                      <div>
                        <p style={{ color: "#68727D" }}>Sub Category</p>
                        <p style={{ fontWeight: "550" }}>
                          {oneservice?.sub_category?.[0]?.name}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="col-6 px-2">
                      <div>
                        <p style={{ color: "#68727D" }}>Name</p>
                        <p style={{ fontWeight: "550",textTransform:"capitalize",wordBreak:"break-word" }}>
                          {oneservice?.name}
                        </p>
                      </div>
                    </div>
                    <div className="col-6 px-2">
                      <div>
                        <p style={{ color: "#68727D" }}>ID</p>
                        <p style={{ fontWeight: "550",wordBreak:"break-word" }}>
                          {oneservice?.machine_id}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="col-12 px-2">
                      <div>
                        <p style={{ color: "#68727D" }}>Description</p>
                        <p style={{ fontWeight: "550" }}>
                          {oneservice?.description &&
                            HTMLParse(oneservice?.description)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="col-12 px-2">
                      <div>
                        <p style={{ color: "#68727D" }}>Details</p>
                        <p style={{ fontWeight: "550" }}>
                          {oneservice?.lounge} Lounge &nbsp;{" "}
                          {oneservice?.bedroom} Bedroom &nbsp;{" "}
                          {oneservice?.toilet} Toilet
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="col-6 px-2">
                      <div>
                        <p style={{ color: "#68727D" }}>Capacity</p>
                        <p style={{ fontWeight: "550" }}>
                          {oneservice?.capacity}
                        </p>
                      </div>
                    </div>
                    <div className="col-6 px-2">
                      <div>
                        <p style={{ color: "#68727D" }}>Amenities</p>
                        <p style={{ fontWeight: "550" }}>
                          {oneservice?.amenities?.length > 1
                            ? oneservice?.amenities?.map(
                                (data) => data.name + "" + ","
                              )
                            : oneservice?.amenities?.map((data) => data.name)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="col-4 px-2">
                      <div>
                        <p style={{ color: "#68727D" }}>Pickup Point</p>
                        <p style={{ textTransform: "capitalize",fontWeight: "550"}}>
                          {oneservice?.pickup_point_or_location}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="col-12 px-2">
                      <div>
                        <p style={{ color: "#68727D" }}>Embed</p>
                        <p className="embed-data" style={{fontWeight:"550"}}>{oneservice?.map_embed}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{ backgroundColor: "#FFFF", borderRadius: "5px" }}
                  className="mt-4 w-100 px-2"
                >
                  <p className="p-2" style={{ fontWeight: "550" }}>
                    Pricing
                  </p>
                  <div className="d-flex">
                    <div className="col-6 px-2">
                      
                        <p style={{ color: "#68727D" }}>Profit Method</p>
                        <p style={{ fontWeight: "550" }}>
                          {oneservice?.profit_method?.name}
                        </p>
                      
                    </div>
                  </div>

                  {oneservice?.profit_method?.name !=="OwnerShip" && <div className="col-6 px-2">
                      <div style={{ color: "#68727D" }}>
                        {oneservice?.profit_method?.name ===
                        "Upselling With Markup"
                          ? "Markup Fee"
                          : oneservice?.profit_method?.name ===
                            "Revenue Sharing"
                            && (
                            <div className="d-flex">
                              <div>
                                <p>Sea Arabia Percentage</p>
                                <p style={{ fontWeight: "550",color:"black" }}>{oneservice.sea_arabia_percentage}</p>
                              </div>
                              <div className="mx-5">
                                <p>Vendor Percentage</p>
                                <p style={{ fontWeight: "550",color:"black" }}>{oneservice.vendor_percentage}</p>
                              </div>
                            </div>
                          )
                          }
                      </div>
                      <p style={{ fontWeight: "550" }}>
                        {oneservice?.profit_method?.name ===
                          "Upselling With Markup" && oneservice?.markup_fee}
                      </p>
                  </div>}

                  <div className="col-6 px-2">
                    
                      <p style={{ color: "#68727D" }}>Price Criterion</p>
                      <p style={{ fontWeight: "550" }}>{price_cretrion()}</p>
                    
                  </div>

                  <div className="col-12 px-2 pb-3">
                    <p style={{ color: "#68727D" }}>Price </p>
                    {oneservice?.is_destination && (
                      <div className="table-responsive ">
                        <table className="table  table-vcenter text-nowrap datatable">
                          <thead>
                            <tr>
                              <th className="">
                                <span>Name</span>
                              </th>
                              <th>
                                <span>Hours</span>
                              </th>
                              <th>
                                <span>Minutes</span>
                              </th>
                              <th>
                                <span>Location</span>
                              </th>
                              <th>
                                <span>Price</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {oneservice?.service_price_service &&
                              oneservice?.service_price_service?.map(
                                (dat, i) => (
                                  <tr>
                                    <td className="text-secondary">
                                      <span className="text-secondary">
                                        {dat.name}
                                      </span>
                                    </td>
                                    <td>
                                      <span className="text-secondary">
                                        {" "}
                                        {dat.duration_hour}
                                      </span>
                                    </td>
                                    <td>
                                      <span className="text-secondary">
                                        {" "}
                                        {dat.duration_minute} 
                                      </span>
                                    </td>
                                    <td>
                                      <span className="text-secondary">
                                        {" "}
                                        {dat.location.name} 
                                      </span>
                                    </td>
                                    <td>
                                      <span className="text-secondary">
                                        {dat.price} KWD
                                      </span>
                                    </td>
                                  </tr>
                                )
                              )}
                          </tbody>
                        </table>
                      </div>
                    )}
                    {oneservice?.is_duration && (
                      <div className="table-responsive ">
                        <table className="table card-table table-vcenter text-nowrap datatable">
                          <thead>
                            <tr>
                              <th className="w-1">
                                <span>Name</span>
                              </th>
                              <th>
                                <span>Hours</span>
                              </th>
                              <th>
                                <span>Minutes</span>
                              </th>
                              <th>
                                <span>Price</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {oneservice?.service_price_service &&
                              oneservice?.service_price_service?.map(
                                (dat, i) => (
                                  <tr>
                                    <td>
                                      <span className="text-secondary">
                                        {dat.name}
                                      </span>
                                    </td>
                                    <td>
                                      <span className="text-secondary">
                                        {" "}
                                        {dat.duration_hour}
                                      </span>
                                    </td>
                                    <td>
                                      <span className="text-secondary">
                                        {" "}
                                        {dat.duration_minute}
                                      </span>
                                    </td>
                                    <td>
                                      <span className="text-secondary">
                                        {dat.price} KWD
                                      </span>
                                    </td>
                                  </tr>
                                )
                              )}
                          </tbody>
                        </table>
                      </div>
                    )}
                    {oneservice?.is_day && (
                      <div className="table-responsive ">
                        <table className="table card-table table-vcenter text-nowrap datatable">
                          <thead>
                            <tr>
                              <th className="w-1">
                                <span>Name</span>
                              </th>
                              <th>
                                <span>Start Day</span>
                              </th>
                              <th>
                                <span>End Day</span>
                              </th>
                              <th>
                                <span>Price</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {oneservice?.service_price_service &&
                              oneservice?.service_price_service?.map(
                                (dat, i) => (
                                  <tr>
                                    <td>
                                      <span className="text-secondary">
                                        {dat.name}
                                      </span>
                                    </td>
                                    <td>
                                      <span className="text-secondary">
                                        {" "}
                                        {dat.day}
                                      </span>
                                    </td>
                                    <td>
                                      <span className="text-secondary">
                                        {dat.end_day !== null
                                          ? dat.end_day
                                          : "-"}
                                      </span>
                                    </td>
                                    <td>
                                      <span className="text-secondary">
                                        {dat.price} KWD
                                      </span>
                                    </td>
                                  </tr>
                                )
                              )}
                          </tbody>
                        </table>
                      </div>
                    )}
                    {oneservice?.is_time && (
                      <div className="table-responsive ">
                        <table className="table card-table table-vcenter text-nowrap datatable">
                          <thead>
                            <tr>
                              <th className="w-1">
                                <span>Name</span>
                              </th>
                              <th>
                                <span>Start Time</span>
                              </th>
                              <th>
                                <span>End Time</span>
                              </th>
                              <th>
                                <span>Price</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {oneservice?.service_price_service &&
                              oneservice?.service_price_service?.map(
                                (dat, i) => (
                                  <tr>
                                    <td>
                                      <span className="text-secondary">
                                        {dat.name}
                                      </span>
                                    </td>
                                    <td>
                                      <span className="text-secondary">
                                        {" "}
                                        {dat.time}
                                      </span>
                                    </td>
                                    <td>
                                      <span className="text-secondary">
                                        {" "}
                                        {dat.end_time !==null
                                          ? dat.end_time
                                          : "-"}{" "}
                                      </span>
                                    </td>
                                    <td>
                                      <span className="text-secondary">
                                        {dat.price} KWD
                                      </span>
                                    </td>
                                  </tr>
                                )
                              )}
                          </tbody>
                        </table>
                      </div>
                    )}
                    {oneservice?.is_date && (
                      <div className="table-responsive ">
                        <table className="table card-table table-vcenter text-nowrap datatable">
                          <thead>
                            <tr>
                              <th className="w-1">
                                <span>Name</span>
                              </th>
                              <th>
                                <span>Start Date</span>
                              </th>
                              <th>
                                <span>End Date</span>
                              </th>
                              <th>
                                <span>Price</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {oneservice?.service_price_service &&
                              oneservice?.service_price_service?.map(
                                (dat, i) => (
                                  <tr>
                                    <td>
                                      <span className="text-secondary">
                                        {dat.name}
                                      </span>
                                    </td>
                                    <td>
                                      <span className="text-secondary">
                                        {" "}
                                        {dat.date}{" "}
                                      </span>
                                    </td>
                                    <td>
                                      <span className="text-secondary">
                                        {dat.end_date !==null
                                          ? dat.end_date
                                          : "-"}
                                      </span>
                                    </td>
                                    <td>
                                      <span className="text-secondary">
                                        {dat.price} KWD
                                      </span>
                                    </td>
                                  </tr>
                                )
                              )}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
                <div
                  style={{ backgroundColor: "#FFFF", borderRadius: "5px" }}
                  className="mt-4 w-100 px-2"
                >
                  <p className="p-2" style={{ fontWeight: "550" }}>
                    Policy
                  </p>
                  <div className="d-flex">
                    <div className="col-12 px-2">
                      <div>
                        <p style={{ color: "#68727D" }}>Privacy Policy</p>
                        <p style={{fontWeight:"550",wordBreak:"break-word"}}>{oneservice?.cancellation_policy}</p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="col-12 px-2">
                      <div>
                        <p style={{ color: "#68727D" }}>Refund Available</p>
                        <p style={{fontWeight:"550"}}>{oneservice?.is_refundable ? "Yes" : "No"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="col-12 px-2">
                      <div>
                        <p style={{ color: "#68727D" }}>Refund Policy</p>
                        <p style={{fontWeight:"550",wordBreak:"break-word"}}>{oneservice?.refund_policy}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div
                  style={{ backgroundColor: "#FFFF", borderRadius: "5px" }}
                  className="mt-4 w-100 px-2"
                >
                  <p className="p-2" style={{ fontWeight: "550" }}>
                    Images
                  </p>
                  <p style={{ fontWeight: "550" }}>Thumbnail</p>
                  <div className="row">
                    {oneservice?.service_image?.length > 0 &&
                      oneservice?.service_image?.map((data, index) => (
                        <div className="col-6 mb-3" key={index}>
                          <div>
                            <img
                              src={data.image}
                              alt={data.image}
                              className="rounded"
                              style={{ width: "200px", height: "125px" }}
                            />
                          </div>
                        </div>
                      ))}
                    {oneservice?.service_image?.length === 0 && (
                      <p
                        style={{
                          fontSize: "14px",
                          padding: "10px",
                          margin: "10px",
                          textAlign: "center",
                        }}
                      >
                        No Image Found
                      </p>
                    )}

                  </div>
                </div>
              </div>
              
            </div>
          </div>
          <br />
          <br />
        </div>
      )}
      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default ServiceView;
