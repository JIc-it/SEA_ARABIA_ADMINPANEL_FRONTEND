import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getEventList, getCount } from "../../services/EventsPackages";
import { getMenuPermissions, removeBaseUrlFromPath } from "../../helpers";
import { getListDataInPagination } from "../../services/commonServices";
import { CircularProgress } from "@mui/material";
import { MainPageContext } from "../../Context/MainPageContext";
import WithPermission from "../../components/HigherOrderComponents/PermissionCheck/WithPermission";
import {
  menuIdConstant,
  permissionCategory,
} from "../../components/Permissions/PermissionConstants";
import CommonButtonForPermission from "../../components/HigherOrderComponents/CommonButtonForPermission";

export default function EventListing() {
  const { userPermissionList } = useContext(MainPageContext);

  const [search, setSearch] = useState("");
  const [Events, setEventList] = useState();
  const [count, setCount] = useState({});
  const [listPageUrl, setListPageUrl] = useState({
    next: null,
    previous: null,
  });
  const [isRefetch, setIsRefetch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    {
      search.trim() !== "" ? setIsLoading(false) : setIsLoading(true);
    }
    getEventList(search)
      .then((data) => {
        setIsLoading(false);
        setListPageUrl({
          next: data.next,
          previous: data.previous,
        });
        setEventList(data.results);
      })
      .catch((error) => {
        console.error("Error fetching sales rep List data:", error);
      });
  }, [search]);

  useEffect(() => {
    getCount()
      .then((data) => {
        setCount({
          total_events_count: data?.total_events_count,
          total_packages_count: data?.total_packages_count,
          active_events_count: data?.active_events_count,
          active_packages_count: data?.active_packages_count,
        });
      })
      .catch((error) => {
        console.error("Error fetching sales rep List data:", error);
      });
  }, []);

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
          setEventList(data.results);
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error fetching  data:", error);
        });
  };

  const AddEventWithPermission = WithPermission(
    CommonButtonForPermission,
    permissionCategory.create,
    menuIdConstant.eventsPackages,
    () => navigate("/event-add"),
    "btn btn-info vendor_button",
    "Add Events/Package ",
    { borderRadius: "6px" },
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M10 3L10 17"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M3 10H17" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  return (
    <>
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
      {!isLoading && (
        <div className="page" style={{ height: "100vh", top: 20 }}>
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-lg-3">
                <div className="card card-sm" style={{ borderRadius: "12px" }}>
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <span
                          className="bg-primary text-white avatar"
                          style={{
                            borderRadius: "8px",
                            width: "50px",
                            height: "50px",
                            background:
                              "linear-gradient(135deg, #5C4AF2 0%, #988DF5 100%)",
                          }}
                        >
                          <svg
                            width={40}
                            height={40}
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M25.8332 12.4993C25.8332 15.721 23.2215 18.3327 19.9998 18.3327C16.7782 18.3327 14.1665 15.721 14.1665 12.4993C14.1665 9.27769 16.7782 6.66602 19.9998 6.66602C23.2215 6.66602 25.8332 9.27769 25.8332 12.4993Z"
                              fill="white"
                            />
                            <path
                              opacity="0.4"
                              d="M32.4998 12.5007C32.4998 14.8018 30.6344 16.6673 28.3332 16.6673C26.032 16.6673 24.1665 14.8018 24.1665 12.5007C24.1665 10.1995 26.032 8.33398 28.3332 8.33398C30.6344 8.33398 32.4998 10.1995 32.4998 12.5007Z"
                              fill="white"
                            />
                            <path
                              opacity="0.4"
                              d="M7.50016 12.5007C7.50016 14.8018 9.36564 16.6673 11.6668 16.6673C13.968 16.6673 15.8335 14.8018 15.8335 12.5007C15.8335 10.1995 13.968 8.33398 11.6668 8.33398C9.36564 8.33398 7.50016 10.1995 7.50016 12.5007Z"
                              fill="white"
                            />
                            <path
                              d="M30 27.4993C30 30.721 25.5228 33.3327 20 33.3327C14.4772 33.3327 10 30.721 10 27.4993C10 24.2777 14.4772 21.666 20 21.666C25.5228 21.666 30 24.2777 30 27.4993Z"
                              fill="white"
                            />
                            <path
                              opacity="0.4"
                              d="M36.6668 27.5007C36.6668 29.8018 33.6821 31.6673 30.0002 31.6673C26.3183 31.6673 23.3335 29.8018 23.3335 27.5007C23.3335 25.1995 26.3183 23.334 30.0002 23.334C33.6821 23.334 36.6668 25.1995 36.6668 27.5007Z"
                              fill="white"
                            />
                            <path
                              opacity="0.4"
                              d="M3.33317 27.5007C3.33317 29.8018 6.31794 31.6673 9.99984 31.6673C13.6817 31.6673 16.6665 29.8018 16.6665 27.5007C16.6665 25.1995 13.6817 23.334 9.99984 23.334C6.31794 23.334 3.33317 25.1995 3.33317 27.5007Z"
                              fill="white"
                            />
                          </svg>
                        </span>
                      </div>
                      <div className="col">
                        <div className="font-weight-medium count_card_heading">
                          Events
                        </div>
                        <div
                          className="text-secondary"
                          style={{ fontSize: "18px", fontWeight: "700" }}
                        >
                          {count?.total_events_count}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="card card-sm" style={{ borderRadius: "12px" }}>
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <svg
                          width={50}
                          height={50}
                          viewBox="0 0 56 56"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width={56}
                            height={56}
                            rx={8}
                            fill="url(#paint0_linear_4176_70062)"
                          />
                          <rect
                            x="0.5"
                            y="0.5"
                            width={55}
                            height={55}
                            rx="7.5"
                            stroke="white"
                            strokeOpacity="0.3"
                          />
                          <circle
                            cx="28.0002"
                            cy="18.0007"
                            r="6.66667"
                            fill="white"
                          />
                          <path
                            opacity="0.5"
                            d="M38.1581 33.0513C37.45 32.9994 36.5814 32.9993 35.5002 32.9993C32.7503 32.9993 31.3754 32.9993 30.5211 33.8536C29.6668 34.7079 29.6668 36.0828 29.6668 38.8327C29.6668 40.7765 29.6668 42.0333 29.9686 42.9049C29.3287 42.967 28.671 42.9993 28.0002 42.9993C21.5568 42.9993 16.3335 40.0146 16.3335 36.3327C16.3335 32.6508 21.5568 29.666 28.0002 29.666C32.3559 29.666 36.1541 31.03 38.1581 33.0513Z"
                            fill="white"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M35.4998 44.6667C32.75 44.6667 31.375 44.6667 30.5208 43.8124C29.6665 42.9581 29.6665 41.5832 29.6665 38.8333C29.6665 36.0835 29.6665 34.7085 30.5208 33.8543C31.375 33 32.75 33 35.4998 33C38.2497 33 39.6246 33 40.4789 33.8543C41.3332 34.7085 41.3332 36.0835 41.3332 38.8333C41.3332 41.5832 41.3332 42.9581 40.4789 43.8124C39.6246 44.6667 38.2497 44.6667 35.4998 44.6667ZM36.4721 36.2407C36.4721 35.7038 36.0368 35.2685 35.4998 35.2685C34.9629 35.2685 34.5276 35.7038 34.5276 36.2407V37.8611H32.9072C32.3703 37.8611 31.935 38.2964 31.935 38.8333C31.935 39.3703 32.3703 39.8056 32.9072 39.8056H34.5276V41.4259C34.5276 41.9629 34.9629 42.3981 35.4998 42.3981C36.0368 42.3981 36.4721 41.9629 36.4721 41.4259V39.8056H38.0924C38.6294 39.8056 39.0647 39.3703 39.0647 38.8333C39.0647 38.2964 38.6294 37.8611 38.0924 37.8611H36.4721V36.2407Z"
                            fill="white"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_4176_70062"
                              x1={0}
                              y1={0}
                              x2={56}
                              y2={56}
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#187AF7" />
                              <stop offset={1} stopColor="#559AF4" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                      <div className="col">
                        <div className="font-weight-medium count_card_heading">
                          Packages
                        </div>
                        <div
                          className="text-secondary"
                          style={{ fontSize: "18px", fontWeight: "700" }}
                        >
                          {count?.total_packages_count}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="card card-sm" style={{ borderRadius: "12px" }}>
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <svg
                          width={50}
                          height={50}
                          viewBox="0 0 56 56"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width={56}
                            height={56}
                            rx={8}
                            fill="url(#paint0_linear_4176_70074)"
                          />
                          <rect
                            x="0.5"
                            y="0.5"
                            width={55}
                            height={55}
                            rx="7.5"
                            stroke="white"
                            strokeOpacity="0.3"
                          />
                          <path
                            opacity="0.5"
                            d="M31.3335 14.666H24.6668C18.3814 14.666 15.2387 14.666 13.2861 16.6186C11.3335 18.5713 11.3335 21.714 11.3335 27.9993C11.3335 34.2847 11.3335 37.4274 13.2861 39.3801C15.2387 41.3327 18.3814 41.3327 24.6668 41.3327H31.3335C37.6189 41.3327 40.7616 41.3327 42.7142 39.3801C44.6668 37.4274 44.6668 34.2847 44.6668 27.9993C44.6668 21.714 44.6668 18.5713 42.7142 16.6186C40.7616 14.666 37.6189 14.666 31.3335 14.666Z"
                            fill="white"
                          />
                          <path
                            d="M30.0835 22.9993C30.0835 22.309 30.6431 21.7493 31.3335 21.7493H39.6668C40.3572 21.7493 40.9168 22.309 40.9168 22.9993C40.9168 23.6897 40.3572 24.2493 39.6668 24.2493H31.3335C30.6431 24.2493 30.0835 23.6897 30.0835 22.9993Z"
                            fill="white"
                          />
                          <path
                            d="M31.7502 27.9993C31.7502 27.309 32.3098 26.7493 33.0002 26.7493H39.6668C40.3572 26.7493 40.9168 27.309 40.9168 27.9993C40.9168 28.6897 40.3572 29.2493 39.6668 29.2493H33.0002C32.3098 29.2493 31.7502 28.6897 31.7502 27.9993Z"
                            fill="white"
                          />
                          <path
                            d="M33.4168 32.9993C33.4168 32.309 33.9765 31.7493 34.6668 31.7493H39.6668C40.3572 31.7493 40.9168 32.309 40.9168 32.9993C40.9168 33.6897 40.3572 34.2493 39.6668 34.2493H34.6668C33.9765 34.2493 33.4168 33.6897 33.4168 32.9993Z"
                            fill="white"
                          />
                          <path
                            d="M23.0002 26.3327C24.8411 26.3327 26.3335 24.8403 26.3335 22.9993C26.3335 21.1584 24.8411 19.666 23.0002 19.666C21.1592 19.666 19.6668 21.1584 19.6668 22.9993C19.6668 24.8403 21.1592 26.3327 23.0002 26.3327Z"
                            fill="white"
                          />
                          <path
                            d="M23.0002 36.3327C29.6668 36.3327 29.6668 34.8403 29.6668 32.9993C29.6668 31.1584 26.6821 29.666 23.0002 29.666C19.3183 29.666 16.3335 31.1584 16.3335 32.9993C16.3335 34.8403 16.3335 36.3327 23.0002 36.3327Z"
                            fill="white"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_4176_70074"
                              x1={0}
                              y1={0}
                              x2={56}
                              y2={56}
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#E6B506" />
                              <stop offset={1} stopColor="#F0CB44" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                      <div className="col">
                        <div className="font-weight-medium count_card_heading">
                          Active Events
                        </div>
                        <div
                          className="text-secondary"
                          style={{ fontSize: "18px", fontWeight: "700" }}
                        >
                          {count?.active_events_count}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="card card-sm" style={{ borderRadius: "12px" }}>
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <svg
                          width={56}
                          height={56}
                          viewBox="0 0 56 56"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width={56}
                            height={56}
                            rx={8}
                            fill="url(#paint0_linear_4176_70083)"
                          />
                          <rect
                            x="0.5"
                            y="0.5"
                            width={55}
                            height={55}
                            rx="7.5"
                            stroke="white"
                            strokeOpacity="0.3"
                          />
                          <circle
                            cx="28.0002"
                            cy="18.0007"
                            r="6.66667"
                            fill="white"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M35.4998 44.6667C32.75 44.6667 31.375 44.6667 30.5208 43.8124C29.6665 42.9581 29.6665 41.5832 29.6665 38.8333C29.6665 36.0835 29.6665 34.7085 30.5208 33.8543C31.375 33 32.75 33 35.4998 33C38.2497 33 39.6246 33 40.4789 33.8543C41.3332 34.7085 41.3332 36.0835 41.3332 38.8333C41.3332 41.5832 41.3332 42.9581 40.4789 43.8124C39.6246 44.6667 38.2497 44.6667 35.4998 44.6667ZM38.7799 37.5764C39.1596 37.1967 39.1596 36.5811 38.7799 36.2014C38.4002 35.8217 37.7846 35.8217 37.405 36.2014L34.2035 39.4028L33.5947 38.794C33.215 38.4143 32.5995 38.4143 32.2198 38.794C31.8401 39.1737 31.8401 39.7893 32.2198 40.1689L33.5161 41.4652C33.8958 41.8449 34.5113 41.8449 34.891 41.4652L38.7799 37.5764Z"
                            fill="white"
                          />
                          <path
                            opacity="0.5"
                            d="M38.1581 33.0513C37.45 32.9994 36.5814 32.9993 35.5002 32.9993C32.7503 32.9993 31.3754 32.9993 30.5211 33.8536C29.6668 34.7079 29.6668 36.0828 29.6668 38.8327C29.6668 40.7765 29.6668 42.0333 29.9686 42.9049C29.3287 42.967 28.671 42.9993 28.0002 42.9993C21.5568 42.9993 16.3335 40.0146 16.3335 36.3327C16.3335 32.6508 21.5568 29.666 28.0002 29.666C32.3559 29.666 36.1541 31.03 38.1581 33.0513Z"
                            fill="white"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_4176_70083"
                              x1={0}
                              y1={0}
                              x2={56}
                              y2={56}
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#13B370" />
                              <stop offset={1} stopColor="#3ACE90" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                      <div className="col">
                        <div className="font-weight-medium count_card_heading">
                          Active Packages
                        </div>
                        <div
                          className="text-secondary"
                          style={{ fontSize: "18px", fontWeight: "700" }}
                        >
                          {count?.active_packages_count}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 actions_menu my-2">
              <div className="action_menu_left col-8">
                <div>
                  <form action="" method="post" autocomplete="off">
                    <div style={{ display: "flex" }}>
                      <div className="input-icon">
                        <span className="input-icon-addon">
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
                            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                            <path d="M21 21l-6 -6" />
                          </svg>
                        </span>

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Input search term"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                        <button
                          type="button"
                          className="btn search_button"
                          style={{ background: "#006875" }}
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="action_buttons col-4">
                <AddEventWithPermission />
                {userPermissionList &&
                  getMenuPermissions(
                    userPermissionList,
                    menuIdConstant.eventsPackages,
                    permissionCategory.action
                  ) && (
                    <button
                      className="btn btn-outline"
                      style={{ borderRadius: "6px" }}
                    >
                      <a
                        style={{ textDecoration: "none" }}
                        href="https://seaarabia.jicitsolution.com/service/export-package-list"
                      >
                        Export &nbsp;
                      </a>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M3.33317 10C3.33317 13.6819 6.31794 16.6667 9.99984 16.6667C13.6817 16.6667 16.6665 13.6819 16.6665 10"
                          stroke="#252525"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M10 11.6673L10 3.33398M10 3.33398L12.5 5.83398M10 3.33398L7.5 5.83398"
                          stroke="#252525"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  )}
              </div>
            </div>
            <div className="card">
              <div className="table-responsive">
                <table className="table card-table table-vcenter text-nowrap datatable ">
                  <thead>
                    <tr>
                      <th className="w-1">
                        <span>Name</span>
                      </th>

                      <th>
                        {" "}
                        <span>Type</span>
                      </th>
                      <th>
                        <span>Capacity</span>
                      </th>

                      <th>
                        <span>Status</span>
                      </th>

                      <th>
                        <span>Action</span>
                      </th>
                    </tr>
                  </thead>
                  {Events && Events.length > 0 && (
                    <>
                      {Events.map((item) => {
                        return (
                          <tbody>
                            <tr>
                              <td>
                                <span className="text-secondary">
                                  {item.name}
                                </span>
                              </td>
                              <td>
                                <span className="text-secondary">
                                  {item.type}
                                </span>
                              </td>
                              <td>
                                <span className="text-secondary">
                                  {item.capacity}
                                </span>
                              </td>
                              <td>
                                <Link
                                  className="btn btn-sm btn-info text-center"
                                  style={{
                                    fontSize: "14px",
                                    padding: "6px 10px",
                                    borderRadius: "4px",
                                    color: item.is_active ? "#40C77E" : "red",
                                    borderRadius:
                                      "var(--Roundness-Round-Inside, 6px)",
                                    background: item.is_active
                                      ? "rgba(19, 179, 112, 0.20)"
                                      : "#ffb3b3",

                                    /* Shadow/XSM */
                                    boxShadow:
                                      "0px 1px 2px 0px rgba(16, 24, 40, 0.04)",
                                  }}
                                >
                                  {item.is_active ? "Active" : "Inactive"}
                                </Link>
                              </td>

                              <td
                                style={{
                                  display: "flex",
                                  gap: "10px",
                                  alignItems: "baseline",
                                }}
                              >
                                <Link
                                  // to="/eventedit/12345"
                                  to={`/event-view/${item.id}`}
                                  className="btn btn-sm btn-dark"
                                  style={{
                                    padding: "6px 10px",
                                    borderRadius: "4px",
                                  }}
                                >
                                  View &nbsp;
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                  >
                                    <path
                                      d="M4 12L12 4M12 4H6M12 4V10"
                                      stroke="white"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </Link>
                              </td>
                            </tr>
                          </tbody>
                        );
                      })}
                    </>
                  )}
                </table>
                {Events?.length === 0 && (
                  <div style={{ height: "5vh", marginTop: "50px" }}>
                    <p style={{ textAlign: "center", fontWeight: 550 }}>
                      No Record Found
                    </p>
                  </div>
                )}
              </div>
              <div className="d-flex align-items-center">
                <ul className="pagination m-0 ms-auto">
                  <li
                    className={`page-item  ${
                      !listPageUrl.previous && "disabled"
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

                  <li
                    className={`page-item  ${!listPageUrl.next && "disabled"}`}
                  >
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
            {/* //modal */}
          </div>
          {/* {showOffcanvas && (

      <AddNewService
          show={showOffcanvas}
          close={handleCloseOffcanvas}
          isRefetch={isRefetch}
          setIsRefetch={setIsRefetch}
      />
  )} */}
        </div>
      )}
    </>
  );
}
