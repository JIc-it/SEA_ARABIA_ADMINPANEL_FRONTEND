import { Link } from "react-router-dom";
import filterIcon from "../../static/img/Filter.png";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  getDiscountOfferList,
  UpdateStatus,
} from "../../services/offers";
import CircularProgress from "@mui/material/CircularProgress";
import {
  getMenuPermissions,
  removeBaseUrlFromPath,
} from "../../helpers";

import { getListDataInPagination } from "../../services/commonServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PopupFilter from "./PopupFilter";
import {
  menuIdConstant,
  permissionCategory,
} from "../Permissions/PermissionConstants";
import { MainPageContext } from "../../Context/MainPageContext";
import WithPermission from "../HigherOrderComponents/PermissionCheck/WithPermission";
import CommonButtonForPermission from "../HigherOrderComponents/CommonButtonForPermission";

function DiscountListing() {
  const { userPermissionList } = useContext(MainPageContext);
  const [isRefetch, setIsRefetch] = useState(false);
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [offerslist, setOffersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [listPageUrl, setListPageUrl] = useState({
    next: null,
    previous: null,
  });
  const [openfilter, setOpenfilter] = useState(false);

  const handleclosefilter = () => {
    setOpenfilter(false);
  };

  const handleopenfilter = () => {
    setOpenfilter(true);
  };
  const handleToggle = async (itemId, e) => {
    e.preventDefault();
    setOffersList((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, is_enable: !item.is_enable } : item
      )
    );

    const toggledItem = offerslist.find((item) => item.id === itemId);
    if (toggledItem) {
      const data = { is_enable: !toggledItem.is_enable };
      try {
        const response = await UpdateStatus(itemId, data);
        if (response) {
          setIsLoading(false);
          window.location.reload();
          setIsRefetch(!isRefetch);
        }
      } catch (error) {
        console.error("Error updating status:", error);
      }
    } else {
      console.error("Item not found");
    }
  };

  useEffect(() => {
    {
      search.trim() !== "" ? setIsLoading(false) : setIsLoading(true);
    }
    getDiscountOfferList(search)
      .then((data) => {
        setListPageUrl({ next: data?.next, previous: data?.previous });
        setOffersList(data?.results);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error?.response?.data);
      });
  }, [search, isRefetch]);

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
          setOffersList(data?.results);
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error(error.message);
        });
  };


  const AddOfferWithPermission = WithPermission(
    CommonButtonForPermission,
    permissionCategory.create,
    menuIdConstant.offer,
    () => navigate("/discounts-offers/add"),
    "btn btn-info vendor_button",
    "Add Discount",
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

  const clearFilter = async () => {

    setIsLoading(true);

    if (!isLoading) {
        try {
            const adminData = await getDiscountOfferList();

            if (adminData) {
                setIsLoading(false);
                setOffersList(adminData?.results);
                setListPageUrl({ next: adminData.next, previous: adminData.previous });

            } else {
                setIsLoading(false);
                toast.error(adminData.error.response.data)
                //   console.error("Error while creating Admin:", adminData.error);
            }
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            toast.error(err.message)
            // console.log(err);
        }
    }
}
  return (
    <div>
      <div className="col-12 actions_menu my-2">
        <div className="action_menu_left col-8">
          <div>
            <>
              <div style={{ display: "flex" }}>
                <div
                  className="input-icon"
                  style={{ width: isMobileView ? "50%" : "" }}
                >
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
                <button
                  className="bg-black"
                  style={{ borderRadius: "5px", marginLeft: "5px" }}
                  onClick={handleopenfilter}
                  type="button"
                >
                  <img
                    src={filterIcon}
                    alt="filter"
                    width={isMobileView ? 15 : 20}
                  />
                </button>
                <button className="mx-2 px-3 py-2 btn" style={{color:"#ffff",backgroundColor:"#2176FF"}} onClick={clearFilter}>Clear Filter</button>
                {openfilter && (
                  <PopupFilter
                    setListPageUrl={setListPageUrl}
                    setOffersList={setOffersList}
                    open={openfilter}
                    handleOpen={handleopenfilter}
                    handleClose={handleclosefilter}
                  />
                )}
              </div>
            </>
          </div>
        </div>
        <div className="action_buttons col-4">
          {userPermissionList &&
            getMenuPermissions(
              userPermissionList,
              menuIdConstant.offer,
              permissionCategory.action
            ) && (
              <button
                className="btn btn-outline"
                style={{ borderRadius: "6px" }}
              >
                <a
                  style={{ textDecoration: "none" }}
                  href="https://seaarabia.jicitsolution.com/offer/export-offer-list/"
                >
                  Export
                </a>
                {/* Export &nbsp; */}
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
          <AddOfferWithPermission />
        </div>
      </div>
      <div className="card">
        <div className="table-responsive">
          <table className="table card-table table-vcenter text-nowrap datatable">
            <thead>
              <tr>
                <th className="w-1">
                  <span>Discount Code</span>
                </th>
                <th>
                  <span>Campaign Name</span>
                </th>
                <th>
                  {" "}
                  <span>Usage</span>
                </th>
                <th>
                  <span>limit</span>
                </th>
                <th>
                  <span>Expiry</span>
                </th>
                <th>
                  <span>Action</span>
                </th>
                {userPermissionList &&
                  getMenuPermissions(
                    userPermissionList,
                    menuIdConstant.offer,
                    permissionCategory.status
                  ) && (
                    <th>
                      <span>Status</span>
                    </th>
                  )}
              </tr>
            </thead>
            <tbody>
              {!isLoading && offerslist && offerslist.length > 0 ? (
                <>
                  {offerslist.map((item, index) => {
                    let formatedDate = item.created_at;
                    return (
                      <tr>
                        <td>
                          <span className="text-secondary">
                            {item?.coupon_code}
                          </span>
                        </td>
                        <td>
                          <span className="text-secondary">{item?.name}</span>
                        </td>
                        <td>
                          <span className="text-secondary">0</span>
                        </td>
                        <td>
                          <span className="text-secondary">
                            {item.allow_multiple_redeem === "Unlimited"
                              ? "Unlimited"
                              : item.specify_no}
                          </span>
                        </td>
                        <td>
                          <span className="text-secondary">
                            {new Date(item.end_date).toLocaleDateString(
                              "en-US",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </td>
                        <td
                          style={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "baseline",
                          }}
                        >
                          <Link
                            to={"/discounts-offers/" + item.id}
                            className="btn btn-sm btn-info"
                            style={{ padding: "3px 6px", borderRadius: "4px" }}
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
                        {userPermissionList &&
                          getMenuPermissions(
                            userPermissionList,
                            menuIdConstant.offer,
                            permissionCategory.status
                          ) && (
                            <td>
                              <div style={{ display: "flex" }}>
                                <label
                                  className="switch"
                                  style={{ marginRight: "5px" }}
                                >
                                  <input
                                    type="checkbox"
                                    checked={item.is_enable}
                                    onChange={(e) => handleToggle(item.id, e)}
                                  />
                                  <span className="slider round"></span>
                                </label>
                                <div>
                                  {item.is_enable
                                    ? "ACTIVE"
                                    : "INACTIVE"}
                                </div>
                              </div>
                            </td>
                          )}
                      </tr>
                    );
                  })}
                </>
              ) : (
                <tr>
                  <td className="error">No Record Found</td>
                </tr>
              )}

              {isLoading && (
                <tr>
                  <td colSpan={"8"} align="center">
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
    </div>
  );
}

export default DiscountListing;
