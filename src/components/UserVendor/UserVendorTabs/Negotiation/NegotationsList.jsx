import AddNegotationsModal from "./AddNegotationsModal";
import { useContext, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import EditNegotiation from "./EditNegotiation";
import ViewNegotiation from "./ViewNegotiation";
import { getNegotiation } from "../../../../services/leadMangement";
import {
  convertedDateAndTime,
  getMenuPermissions,
  removeBaseUrlFromPath,
} from "../../../../helpers";
import { getListDataInPagination } from "../../../../services/commonServices";
import { MainPageContext } from "../../../../Context/MainPageContext";
import WithPermission from "../../../HigherOrderComponents/PermissionCheck/WithPermission";
import CommonButtonForPermission from "../../../HigherOrderComponents/CommonButtonForPermission";
import {
  menuIdConstant,
  permissionCategory,
} from "../../../Permissions/PermissionConstants";

function NegotationsList({ count, companyID }) {
  const { userPermissionList } = useContext(MainPageContext);

  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [negotiations, setNegotiations] = useState([]);
  const [isRefetch, setIsRefetch] = useState(false);
  const [isViewNegotiation, setIsViewNegotiation] = useState(false);
  const [isEditNegotiation, setIsEditNegotiation] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [listPageUrl, setListPageUrl] = useState({
    next: null,
    previous: null,
  });

  useEffect(() => {
    getNegotiation(companyID)
      .then((data) => {
        setNegotiations(data.results);
        setListPageUrl({ next: data.next, previous: data.previous });
      })
      .catch((error) => {
        console.error("Error fetching  data:", error);
      });
  }, [isRefetch, count]);

  const handleOpenOffcanvas = () => setShowOffcanvas(true);

  const handleCloseOffcanvas = () => setShowOffcanvas(false);

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
          setNegotiations(data?.results);
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error fetching  data:", error);
        });
  };

  const handleCloseViewNegotiation = () => {
    setIsViewNegotiation(false);
  };

  const handleViewNegotiation = (data) => {
    setIsViewNegotiation(true);
    setSelectedData(data);
  };

  const handleCloseEditNegotiation = () => {
    setIsEditNegotiation(false);
  };

  const handleEditNegotiation = (data) => {
    setIsEditNegotiation(true);
    setSelectedData(data);
  };

  const AddNegotiationWithPermission = WithPermission(
    CommonButtonForPermission,
    permissionCategory.onboardOperation,
    menuIdConstant.vendorManagent,
    handleOpenOffcanvas,
    "btn",
    "Add Negotiations",
    {
      backgroundColor: "#187AF7",
      color: "white",
      fontWeight: "700",
      fontSize: "16px",
      borderRadius: "6px",
      width: "215px",
    },
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
    >
      <path
        d="M10.5 3L10.5 17"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M3.5 10H17.5"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );

  return (
    <div className="tab-content site">
      <div className="tab-pane active show" id="tabs-home-7">
        <div>
          <div style={{ paddingBottom: "20px" }}>
            {showOffcanvas && (
              <AddNegotationsModal
                show={showOffcanvas}
                close={handleCloseOffcanvas}
                setIsRefetch={setIsRefetch}
                isRefetch={isRefetch}
                companyID={companyID}
              />
            )}
            <AddNegotiationWithPermission />
          </div>
        </div>
        <div className="table-responsive">
          <table className="table card-table table-vcenter text-nowrap datatable">
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
                  {negotiations && negotiations.length > 0 ? (
                    negotiations.map((item, i) => {
                      let formatedTime = convertedDateAndTime(item.datetime);
                      return (
                        <tr>
                          <td>{item.title}</td>
                          {/* <td>{item.note}</td> */}
                          <td>{formatedTime.fullDate}</td>
                          <td>{formatedTime.formattedTime}</td>
                          <td
                            style={{
                              display: "flex",
                              gap: "10px",
                              alignItems: "baseline",
                            }}
                          >
                            <div
                              onClick={() => handleViewNegotiation(item)}
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
                                  onClick={() => handleEditNegotiation(item)}
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
                              No Negotiations Found
                            </p>
                            <p style={{ fontSize: "14px", color: "#68727D" }}>
                              Add Your Negotiations here
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
      {isEditNegotiation && (
        <EditNegotiation
          show={isEditNegotiation}
          close={handleCloseEditNegotiation}
          isRefetch={isRefetch}
          setIsRefetch={setIsRefetch}
          selectedData={selectedData}
          companyID={companyID}
        />
      )}
      {isViewNegotiation && (
        <ViewNegotiation
          show={isViewNegotiation}
          close={handleCloseViewNegotiation}
          selectedData={selectedData}
        />
      )}
    </div>
  );
}

export default NegotationsList;
