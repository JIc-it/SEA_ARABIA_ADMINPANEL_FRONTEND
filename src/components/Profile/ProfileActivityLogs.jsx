import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { getUserVendorActivityLog } from "../../services/userVendorsServices";
import { removeBaseUrlFromPath } from "../../helpers";
import { getListDataInPagination } from "../../services/commonServices";
import { toast } from "react-toastify";

const ProfileActivityLogs = () => {
    const params = useParams();
    const navigate = useNavigate();
    const customerId = params.id;
    const [isLoading, setIsLoading] = useState(false);
    const [activityList, setActivityList] = useState();
    const [listPageUrl, setListPageUrl] = useState({
        next: null,
        previous: null,
    });

    useEffect(() => {
        setIsLoading(true);
        getUserVendorActivityLog(customerId)
            .then((data) => {
                // console.log("c activity log list", data.results);
                setIsLoading(false)
                setActivityList(data.results);
                setListPageUrl({ next: data.next, previous: data.previous });
            })
            .catch((error) => {
                setIsLoading(false);
                toast.error(error.message)
            });
        
    }, [customerId]);

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
                    setListPageUrl({ next: data.next, previous: data.previous });
                    setActivityList(data?.results);
                })
                .catch((error) => {
                    setIsLoading(false);
                    toast.error(error.message)
                });
    };

    return (
        <>
            {isLoading ?
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
                    <CircularProgress />
                </div> :
                <div className="page-wrapper">
                    <div className="page-body">
                        <div className="container-xl">
                            <div className="breadcrumbs">
                                <p>Profile</p>
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                    >
                                        <path
                                            d="M8.33301 5L12.7438 9.41074C13.0692 9.73618 13.0692 10.2638 12.7438 10.5893L8.33301 15"
                                            stroke="#68727D"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                        />
                                    </svg>
                                </span>

                                <p>Activity Log</p>
                            </div>
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
                            </div>
                            <div className="card my-3 ">
                                <div class="table-responsive">
                                    <table class="table card-table table-vcenter text-nowrap datatable">
                                        <thead>
                                            <tr>
                                                <th colSpan={7}> Log</th>
                                                <th colSpan={4}>Date & Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {!isLoading ? (
                                                <>
                                                    {activityList && activityList.length > 0 ? (
                                                        activityList.map((item, i) => {
                                                            const formattedDate = new Date(
                                                                item.updated_at
                                                            ).toLocaleDateString("en-GB", {
                                                                day: "2-digit",
                                                                month: "short",
                                                                year: "numeric",
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                                hour12: true
                                                            });

                                                            return (
                                                                <tr>
                                                                    <td colSpan={7}>{item.title}</td>
                                                                    <td colSpan={4}>{formattedDate}</td>
                                                                </tr>
                                                            );
                                                        })
                                                    ) : (
                                                        <tr>
                                                            <td colspan="5">
                                                                <div>
                                                                    <div class="home_contents">
                                                                        <p
                                                                            style={{
                                                                                fontWeight: "700",
                                                                                fontSize: "16px",
                                                                            }}
                                                                        >
                                                                            No Activity Found
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </>
                                            ) : (
                                                <tr>
                                                    <td colSpan={"5"} align="center">
                                                        <CircularProgress />
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="card-footer d-flex align-items-center">
                                    <ul className="pagination m-0 ms-auto">
                                        <li
                                            className={`page-item  ${!listPageUrl.previous && "disabled"
                                                }`}
                                        >
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default ProfileActivityLogs;
