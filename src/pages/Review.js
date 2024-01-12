import React from 'react'
import { useState, useEffect } from "react";
import { CircularProgress } from '@mui/material';
import { getCategoryist, getSubCategoryist, getServiceFilterList, getServiceReviewFilter, getServiceReviewFilter2 } from "../services/review";
import { getCompanyListing } from "../services/offers";
import { formatDate, removeBaseUrlFromPath } from "../helpers";
import { getListDataInPagination } from "../services/commonServices";
import { toast } from 'react-toastify';


const Review = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [reviewisLoading, setReviewisLoading] = useState(false)
  const [listPageUrl, setListPageUrl] = useState({
    next: null,
    previous: null,
  });
  const [categorylist, setCategorylist] = useState([]);
  const [categorychoose, setCategoryChoose] = useState("")

  const [subcategorychoose, setSubcategoryChoose] = useState("")
  const [subcategorylist, setSubCategorylist] = useState([])

  const [servicefilterlist, setserviceFilterList] = useState([])

  const [companyList, setCompanyList] = useState([])
  const [selectedValue, setSelectedValue] = useState("New Lead");
  const [filterdataid, setfilterid] = useState("")
  const [filterdataidData, setfilteridData] = useState([])
  const [filtering, setFiltering] = useState({
    search: null,
    categoryid: null,
    subcategoryid: null,
    rating: null
  })

  const handlefiltering = (fields) => {
    setFiltering((prev) => {
      return {
        ...prev, ...fields
      }
    })
  }

  useEffect(() => {
    getCompanyListing()
      .then((data) => {
        setCompanyList(data);
      })
      .catch((error) => {
        console.error("Error fetching distributor data:", error);
      });

    getCategoryist()
      .then((data) => {
        setCategorylist(data);
      })
      .catch((error) => {
        console.error("Error fetching distributor data:", error);
      });
  }, []);

  useEffect(() => {
    getSubCategoryist(categorychoose)
      .then((data) => {
        setSubCategorylist(data);
      })
      .catch((error) => {
        console.error("Error fetching distributor data:", error);
      });
  }, [categorychoose]);


  useEffect(() => {
    setIsLoading(true)
    getServiceFilterList(filtering)
      .then((data) => {
        setIsLoading(false)
        setserviceFilterList(data);
      })
      .catch((error) => {
        setIsLoading(false)
        console.error("Error fetching distributor data:", error);
      });
  }, [filtering]);

  useEffect(() => {
    setReviewisLoading(true)
    if (filterdataid.trim() !== "") {
      getServiceReviewFilter2(filterdataid, filtering.rating)
        .then((data) => {
          setReviewisLoading(false)
          setListPageUrl({ next: data.next, previous: data.previous });
          setfilteridData(data.results);
        })
        .catch((error) => {
          setReviewisLoading(false)
          console.error("Error fetching distributor data:", error);
        });
    }
    else {
      getServiceReviewFilter(filtering.rating)
        .then((data) => {
          setReviewisLoading(false)
          setListPageUrl({ next: data.next, previous: data.previous });
          setfilteridData(data.results);
        })
        .catch((error) => {
          setReviewisLoading(false)
          console.error("Error fetching distributor data:", error);
        });
    }
  }, [filterdataid, filtering.rating]);

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handlePagination = async (type) => {
    setReviewisLoading(true);
    let convertedUrl =
      type === "next"
        ? listPageUrl.next && removeBaseUrlFromPath(listPageUrl.next)
        : type === "prev"
          ? listPageUrl.previous && removeBaseUrlFromPath(listPageUrl.previous)
          : null;
    convertedUrl &&
      getListDataInPagination(convertedUrl)
        .then((data) => {
          setReviewisLoading(false);
          setListPageUrl({ next: data.next, previous: data.previous });
          setfilteridData(data?.results);
        })
        .catch((error) => {
          setReviewisLoading(false);
          toast.error(error.response.data);
        });
  };

  return (
    <div className="page" style={{ height: "100vh", top: 20 }}>
      <div className='container'>
        <div className='row mb-4'>
          <div className='col-lg-3' style={{ backgroundColor: '#EDF5F6' }}>
            <div className='row'>
              <div className='col-lg-12'>
                <label className="form-label">Service :</label>
                <div className="status_dropdown">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    onChange={(e) => handlefiltering({ search: e.target.value })}
                  />
                </div>
              </div>
              <div className='col-lg-12 mt-2'>
                <label className="form-label">Vendor :</label>
                <div className="status_dropdown">
                  <select
                    type="text"
                    className="form-select mb-3 status_selector"
                    value={selectedValue}
                    onChange={handleSelectChange}
                  >
                    <option value={null}>Choose</option>
                    {companyList.map((data, index) =>
                      <option key={data.id} value={data.name}>{data.name}</option>
                    )}
                  </select>
                </div>
              </div>
              <div className='col-lg-12'>
                <label className="form-label">Category :</label>
                <div className="status_dropdown">
                  <select
                    type="text"
                    className="form-select mb-3 status_selector"
                    value={categorychoose}
                    onChange={(e) => {
                      const selectedValue = e.target.value === "Choose" ? null : e.target.value;
                      setCategoryChoose(selectedValue);
                      handlefiltering({ categoryid: selectedValue });
                    }}
                  >
                    <option value={null}>Choose</option>
                    {categorylist.map((data, index) =>
                      <option key={data.id} value={data.id}>{data.name}</option>
                    )}
                    {/* <option value="New Lead">Choose</option>
                                        <option value="Yatch">Yatch</option>
                                        <option value="Boat">Boat</option> */}
                  </select>
                </div>
              </div>
              <div className='col-lg-12'>
                <label className="form-label">Sub Category :</label>
                <div className="status_dropdown">
                  <select
                    type="text"
                    className="form-select mb-3 status_selector"
                    value={subcategorychoose}
                    onChange={(e) => {
                      const selectedValue = e.target.value === "Choose" ? null : e.target.value;
                      setSubcategoryChoose(selectedValue);
                      handlefiltering({ subcategoryid: selectedValue });
                    }}
                  >
                    <option value={null}>Choose</option>
                    {subcategorylist.map((data, index) =>
                      <option key={data.id} value={data.id}>{data.name}</option>
                    )}
                  </select>
                </div>
              </div>
              <div className='col-lg-12' style={{ height: "50vh", overflowY: "scroll" }}>
                {!isLoading && servicefilterlist?.map((data) =>
                  <label key={data.id} class="card mb-4" style={{ display: 'flex' }} onClick={() => setfilterid(data.id)}>
                    <input name="plan" class="radio" type="radio" checked={data.id === filterdataid} />
                    <span class="plan-details">
                      <div className='d-flex'>
                        <div className='w-80'>
                          {data?.service_image?.map((dat) =>
                            <img width={80} style={{ borderRadius: 5 }} src={dat.image} />
                          )}
                        </div>
                        <div className='w-20' style={{ marginLeft: 10 }}>
                          <span style={{ color: '#68727D' }}>Name</span><br />
                          <span class="plan-type">{data.name}</span>
                        </div>
                      </div>
                    </span>
                  </label>
                )}
                {isLoading &&
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "30vh" }}>
                    <CircularProgress />
                  </div>
                }
              </div>
            </div>
          </div>
          <div className='col-lg-8 mx-1' style={{ position: "relative" }}>
            {
              <div className='d-flex justify-content-between align-items-center' >
                <p>Review</p>
                <div className='d-flex align-items-center'>
                  <div>Sort by &nbsp;</div>
                  <div className="status_dropdown">
                    <select
                      type="text"
                      className=""
                      value={filtering.rating}
                      onChange={(e) => { handlefiltering({ rating: e.target.value }) }}
                    >
                      <option value={""}>Choose</option>
                      {[1, 2, 3, 4, 5].map((opt) =>
                        <option value={opt} key={opt} style={{ color: 'gold' }}>{opt} &#9733;</option>
                      )}
                    </select>
                  </div>
                </div>
              </div>
            }
            <div className='row'>
              {filterdataidData.length === 0 &&
                <div className='text-center' style={{ fontWeight: "600", transform: "translateY(30vh)" }}>No Review Found</div>
              }
              {filterdataidData.map((data) =>
                <div key={data.id} className='col-lg-4'>
                  <div class="card">
                    <div class="card-body">
                      <h4 class="card-title">{data.rating}
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.00004 11.513L12.12 13.9997L11.0267 9.31301L14.6667 6.15967L9.87337 5.75301L8.00004 1.33301L6.12671 5.75301L1.33337 6.15967L4.97337 9.31301L3.88004 13.9997L8.00004 11.513Z" fill="#E8C301" fill-opacity="0.6" />
                        </svg>
                      </h4>
                      <h5 class="card-subtitle mb-2 text-muted">{data.service}</h5>
                      <span className='head-text' style={{ textTransform: "capitalize" }}>{data?.review_title}</span>
                      <p class="card-text">{data?.review_summary}</p>
                      <div style={{ position: 'relative', bottom: 10 }}>
                        <span style={{ color: '#006875' }}>{data?.user}</span><br></br>
                        <span>{new Date(data?.created_at).toLocaleDateString("es-CL")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {reviewisLoading &&
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
                  <CircularProgress />
                </div>
              }
              {filterdataidData.length > 9 &&
                <div className="card-footer d-flex align-items-center" style={{ position: "absolute", bottom: 0, right: 0 }}>
                  <ul className=" d-flex m-0 ms-auto" style={{ listStyle: "none" }}>
                    <li className={`page-item mx-1 ${!listPageUrl.previous && "disabled"}`} >
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Review
