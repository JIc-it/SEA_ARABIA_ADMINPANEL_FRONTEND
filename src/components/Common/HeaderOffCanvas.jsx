import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { Typography } from "@mui/material";
import TimeCalculation from "./TimeCalculation";
import { removeBaseUrlFromPath } from "../../helpers";
import { getListDataInPagination } from "../../services/commonServices";
import {clearNotifications} from "../../services/Notification"

export default function HeaderOffCanvas({
    open,
    setOpen,
    countset, isLoading, setIsLoading, listPageUrl, setListPageUrl, data, setdata
}) {

    console.log(data,"noti");
    const handleCloseOffcanvas = () => {
        setOpen(false);
        setIsLoading(false);
    };


    const handlePagination = async (type) => {
        setIsLoading(true);
        let convertedUrl =
            type === "next"
                ? listPageUrl.next && removeBaseUrlFromPath(listPageUrl.next)
                : type === "prev"
                    ? listPageUrl.previous && removeBaseUrlFromPath(listPageUrl.previous)
                    : null;
        convertedUrl &&
            getListDataInPagination(convertedUrl)
                .then((data) => {
                    setIsLoading(false);
                    countset(data.count)
                    setListPageUrl({ next: data?.next, previous: data?.previous });
                    setdata(data?.results);
                })
                .catch((error) => {
                    setIsLoading(false);
                    toast.error(error.message)
                });
    };

    const handleClearNotifications=()=>{
       
        if(data?.notifications.length >0 ){
            clearNotifications()
        .then((data) => {
            toast.success("Notification Clear")
        })
        .catch((error) => {
            toast.error("Error will Clearing")
        });
        handleCloseOffcanvas();
        }
        else{
            handleCloseOffcanvas();  
        }
    }

    return (
        <Offcanvas
            show={open}
            onHide={handleCloseOffcanvas}
            placement="end"
            style={{ overflow: "auto" }}
        >
            <Offcanvas.Header

                closeButton
                onClick={handleClearNotifications}
            >
                <Offcanvas.Title style={{ fontWeight: 550 }}>Notification</Offcanvas.Title>
            </Offcanvas.Header>
            <div className="mt-5" style={{ position: "relative" }}>
                {!isLoading && data?.notifications?.length > 0 ?
                    data?.notifications?.map((dat) =>
                        <div className="px-2" style={{ position: "relative" }}>
                            <div style={{ display: "flex" }}>
                                <div className="mx-2">
                                    <svg width={40} height={40} viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.5" y="0.5" width={51} height={51} rx="11.5" fill="#FAFBFC" />
                                        <rect x="0.5" y="0.5" width={51} height={51} rx="11.5" stroke="#EAEBF0" />
                                        <path d="M33.874 23.3285V22.5064C33.874 17.9929 30.3487 14.334 26 14.334C21.6513 14.334 18.126 17.9929 18.126 22.5064V23.3285C18.126 24.315 17.8447 25.2794 17.3174 26.1003L16.0254 28.1118C14.8453 29.9491 15.7462 32.4464 17.7988 33.0274C23.1682 34.5473 28.8318 34.5473 34.2012 33.0274C36.2538 32.4464 37.1547 29.9491 35.9746 28.1118L34.6826 26.1003C34.1553 25.2794 33.874 24.315 33.874 23.3285Z" stroke="#68727D" strokeWidth="1.5" />
                                        <path d="M20.75 34.166C21.5142 36.2051 23.5762 37.666 26 37.666C28.4238 37.666 30.4858 36.2051 31.25 34.166" stroke="#68727D" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>

                                </div>
                                <Typography sx={{
                                    color: "#252525",
                                    fontFamily: "Roboto",
                                    fontSize: "13px",
                                }}>
                                    {dat.message}
                                </Typography>
                            </div>
                            <TimeCalculation data={dat.created_at} />
                            <hr></hr>
                        </div>

                    ) :
                    (
                        <div style={{ textAlign: "center" }}>No Notification</div>
                    )
                }
                {!isLoading && data?.notifications?.length > 0 && <div className="d-flex align-items-center mt-2" style={{ position: "absolute", bottom: "5px", right: "5px" }}>
                    <ul className="pagination m-0 ms-auto">
                        <li className={`page-item  ${!listPageUrl.previous && "disabled"}`}>
                            <a
                                className="page-link"
                                href="#"
                                tabIndex="-1"
                                onClick={() => {
                                    handlePagination("prev");
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M15 6l-6 6l6 6" />
                                </svg>
                                prev
                            </a>
                        </li>

                        <li className={`page-item  ${!listPageUrl.next && "disabled"}`}>
                            <a
                                className="page-link"
                                href="#"
                                onClick={() => {
                                    handlePagination("next");
                                }}
                            >
                                next
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M9 6l6 6l-6 6" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>}

                {isLoading &&
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
                        <CircularProgress />
                    </div>
                }
            </div>
        </Offcanvas>
    );
}
