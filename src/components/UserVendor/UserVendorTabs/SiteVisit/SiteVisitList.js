import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getSiteVisit } from "../../../../services/leadMangement";
import {
  formatDateIncludeMonth,
  formatTimeWith12Hour,
  getMenuPermissions,
  removeBaseUrlFromPath,
} from "../../../../helpers";
import { getListDataInPagination } from "../../../../services/commonServices";
import CircularProgress from "@mui/material/CircularProgress";
import AddSiteVisitModal from "./AddSiteVisitModal";
import ViewSiteVisit from "./ViewSiteVisit";
import EditSiteVisit from "./EditSiteVisit";
import WithPermission from "../../../HigherOrderComponents/PermissionCheck/WithPermission";
import CommonButtonForPermission from "../../../HigherOrderComponents/CommonButtonForPermission";
import {
  menuIdConstant,
  permissionCategory,
} from "../../../Permissions/PermissionConstants";
import { MainPageContext } from "../../../../Context/MainPageContext";

const SiteVisitList = ({ companyID }) => {
  const { userPermissionList } = useContext(MainPageContext);

  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleOpenOffcanvas = () => setShowOffcanvas(true);

  const handleCloseOffcanvas = () => setShowOffcanvas(false);

  const [sitevistview, setSiteView] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetch, setIsRefetch] = useState(false);

  const [listPageUrl, setListPageUrl] = useState({
    next: null,
    previous: null,
  });
  const [isViewSiteVisit, setIsViewSiteVisit] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const [isEditSiteVisit, setIsEditSiteVisit] = useState(false);

  const handleEditSiteVisit = (data) => {
    setIsEditSiteVisit(true);
    setSelectedData(data);
  };

  const handleCloseViewSiteVisit = () => {
    setIsViewSiteVisit(false);
  };

  const handleViewSiteVisit = (data) => {
    setIsViewSiteVisit(true);
    setSelectedData(data);
  };

  const handleCloseEditSiteVisit = () => {
    setIsEditSiteVisit(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getSiteVisit(companyID)
      .then((data) => {
        setSiteView(data.results);
        setListPageUrl({ next: data.next, previous: data.previous });
      })
      .catch((error) => {
        console.error("Error fetching  data:", error);
      });
    setIsLoading(false);
  }, [isRefetch, companyID]);

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
          setSiteView(data?.results);
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error fetching  data:", error);
        });
  };

  const AddSiteVisitWithPermission = WithPermission(
    CommonButtonForPermission,
    permissionCategory.onboardOperation,
    menuIdConstant.vendorManagent,
    () => handleOpenOffcanvas(),
    "btn  mt-2 px-4 py-2",
    "Add Site Visit",
    { backgroundColor: "#187AF7", color: "white" },
    <svg
      width={15}
      height={15}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 3L10 17"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path d="M3 10H17" stroke="white" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );

  return (
    <div>
    
      <AddSiteVisitWithPermission />
      <div style={{ borderRadius: "5px" }} className="mt-4 w-100 px-2">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading ? (
                <>
                  {sitevistview && sitevistview.length > 0 ? (
                    sitevistview.map((item, i) => {
                      let formatedTime = formatTimeWith12Hour(item.time);
                      let convertedDate = formatDateIncludeMonth(item.date);

                      return (
                        <tr>
                          <td>{item.title}</td>
                          {/* <td>{item.note}</td> */}
                          <td>{convertedDate}</td>
                          <td>{formatedTime}</td>
                          <td
                            style={{
                              display: "flex",
                              gap: "10px",
                              alignItems: "baseline",
                            }}
                          >
                            <div
                              onClick={() => handleViewSiteVisit(item)}
                              className="btn btn-sm btn-info"
                              style={{
                                padding: "5px",
                                borderRadius: "4px",
                                borderRadius:
                                  " var(--Roundness-Round-Inside, 6px)",
                                background: " #252525",
                                boxShadow:
                                  " 0px 1px 2px 0px rgba(16, 24, 40, 0.04)",
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
                            </div>
                            {userPermissionList &&
                              getMenuPermissions(
                                userPermissionList,
                                menuIdConstant.vendorManagent,
                                permissionCategory.onboardOperation
                              ) && (
                                <div
                                  className="edit-icon cursor-pointer"
                                  onClick={() => handleEditSiteVisit(item)}
                                >
                                  <span
                                    style={{
                                      fontWeight: 500,
                                      color: "#187AF7",
                                      paddingRight: "5px",
                                    }}
                                  >
                                    Edit
                                  </span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                  >
                                    <path
                                      d="M2.66663 14.667H13.3333"
                                      stroke="#187AF7"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                    />
                                    <path
                                      d="M9.25866 2.44163L9.753 1.94729C10.572 1.12825 11.9 1.12825 12.719 1.94729C13.5381 2.76633 13.5381 4.09426 12.719 4.9133L12.2247 5.40764M9.25866 2.44163C9.25866 2.44163 9.32045 3.49209 10.2473 4.41897C11.1742 5.34585 12.2247 5.40764 12.2247 5.40764M9.25866 2.44163L4.714 6.98629C4.40618 7.29411 4.25227 7.44802 4.1199 7.61772C3.96376 7.81791 3.8299 8.03451 3.72067 8.26369C3.62808 8.45797 3.55925 8.66446 3.42159 9.07745L2.83826 10.8275M12.2247 5.40764L7.68001 9.9523C7.37219 10.2601 7.21828 10.414 7.04858 10.5464C6.84839 10.7025 6.63179 10.8364 6.40261 10.9456C6.20833 11.0382 6.00184 11.107 5.58885 11.2447L3.83885 11.828M3.83885 11.828L3.41107 11.9706C3.20784 12.0384 2.98378 11.9855 2.8323 11.834C2.68082 11.6825 2.62792 11.4585 2.69567 11.2552L2.83826 10.8275M3.83885 11.828L2.83826 10.8275"
                                      stroke="#187AF7"
                                      stroke-width="1.5"
                                    />
                                  </svg>
                                </div>
                              )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colspan="5">
                        <div>
                          <div class="home_contents">
                            <p style={{ fontWeight: "700", fontSize: "16px" }}>
                              No Site Visit Found
                            </p>
                            <p style={{ fontSize: "14px", color: "#68727D" }}>
                              Add Your Site Visit here
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
        </div>
      </div>
      {showOffcanvas && (
        <AddSiteVisitModal
          show={showOffcanvas}
          close={handleCloseOffcanvas}
          setIsRefetch={setIsRefetch}
          isRefetch={isRefetch}
          companyID={companyID}
        />
      )}
      {isViewSiteVisit && (
        <ViewSiteVisit
          show={isViewSiteVisit}
          close={handleCloseViewSiteVisit}
          selectedData={selectedData}
          companyID={companyID}
        />
      )}
      {isEditSiteVisit && (
        <EditSiteVisit
          show={isEditSiteVisit}
          close={handleCloseEditSiteVisit}
          isRefetch={isRefetch}
          setIsRefetch={setIsRefetch}
          selectedData={selectedData}
          companyID={companyID}
        />
      )}
    </div>
  );
};

export default SiteVisitList;
