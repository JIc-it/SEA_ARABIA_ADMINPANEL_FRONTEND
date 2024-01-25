import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getEventView } from "../../services/EventsPackages";
import CircularProgress from "@mui/material/CircularProgress";
import { Breadcrumb } from "react-bootstrap";
import HTMLParse from "html-react-parser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MainPageContext } from "../../Context/MainPageContext";
import WithPermission from "../../components/HigherOrderComponents/PermissionCheck/WithPermission";
import CommonButtonForPermission from "../../components/HigherOrderComponents/CommonButtonForPermission";
import {
  menuIdConstant,
  permissionCategory,
} from "../../components/Permissions/PermissionConstants";

const EventView = () => {
  const { userPermissionList } = useContext(MainPageContext);

  const navigate = useNavigate();
  const params = useParams();
  // const theme = useTheme();
  // const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
  const [oneservice, setOneService] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getEventView(params.id)
      .then((data) => {
        setOneService(data);
        console.log(data, "fetched");
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.response.data);
      });
  }, [params.id]);

  const AddEventWithPermission = WithPermission(
    CommonButtonForPermission,
    permissionCategory.edit,
    menuIdConstant.eventsPackages,
    () => navigate(`/event-edit/${oneservice?.id}`),
    "btn btn-info vendor_button",
    "Edit Event",
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
                Events and Packages
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <pathR
                    d="M8.33333 5L12.7441 9.41074C13.0695 9.73618 13.0695 10.2638 12.7441 10.5893L8.33333 15"
                    stroke="#68727D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span style={{ color: "#006875" }}>{oneservice?.name}</span>
              </Breadcrumb.Item>
            </Breadcrumb>
            <div className="d-flex justify-content-between mt-5 ms-3">
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
                <AddEventWithPermission />
                {/* <button
                  className="btn btn-info vendor_button"
                  style={{ borderRadius: "6px" }}
                  type="button"
                  onClick={() => navigate(`/event-edit/${oneservice?.id}`)}
                >
                  Edit Event &nbsp;
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
                </button> */}
              </div>
            </div>
            <div className="row" style={{ position: "relative" }}>
              <div className="col-lg-8">
                <div
                  style={{ backgroundColor: "#FFFF", borderRadius: "5px" }}
                  className="mt-4 w-100 px-2"
                >
                  <p className="p-2" style={{ fontWeight: "700" }}>
                    Service Details
                  </p>
                  <div className="d-flex">
                    <div className="col-6 px-2">
                      <div>
                        <p style={{ color: "#68727D" }}>Type</p>
                        <p style={{ fontWeight: "700" }}>{oneservice?.type}</p>
                      </div>
                    </div>
                    <div className="col-6 px-2">
                      <div>
                        <p style={{ color: "#68727D" }}>Name</p>
                        <p style={{ fontWeight: "700" }}>{oneservice?.name}</p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="col-12 px-2">
                      <div>
                        <p style={{ color: "#68727D" }}>Short Description</p>
                        <p>
                          {oneservice?.short_description &&
                            HTMLParse(oneservice?.short_description)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="col-12 px-2">
                      <div>
                        <p style={{ color: "#68727D" }}>Description</p>
                        <p>
                          {oneservice?.description &&
                            HTMLParse(oneservice?.description)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="col-6 px-2">
                      <div>
                        <p style={{ color: "#68727D" }}>Capacity</p>
                        <p style={{ fontWeight: "700" }}>
                          {oneservice?.capacity}
                        </p>
                      </div>
                    </div>
                    <div className="col-6 px-2">
                      <div>
                        <p style={{ color: "#68727D" }}>Price</p>
                        <p style={{ fontWeight: "700" }}>{oneservice?.price}</p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="col-4 px-2">
                      <div>
                        <p style={{ color: "#68727D" }}>Location</p>
                        <p style={{ textTransform: "capitalize" }}>
                          {oneservice?.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{ backgroundColor: "#FFFF", borderRadius: "5px" }}
                  className="mt-4 w-100 px-2"
                >
                  <p className="p-2" style={{ fontWeight: "700" }}>
                    Policy
                  </p>
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
              <div className="col-lg-4">
                <div
                  style={{ backgroundColor: "#FFFF", borderRadius: "5px" }}
                  className="mt-4 w-100 px-2"
                >
                  <p className="p-2" style={{ fontWeight: "700" }}>
                    Images
                  </p>
                  <p style={{ fontWeight: "700" }}>Thumbnail</p>
                  <div className="row">
                    <div className="col-6 mb-3">
                      <div className="mx-auto">
                        <img
                          src={oneservice.image}
                          alt={"image"}
                          className="rounded"
                          style={{ width: "200px", height: "125px" }}
                        />
                      </div>
                    </div>
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

export default EventView;
