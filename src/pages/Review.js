import React from 'react'
import { useState, useEffect } from "react";
import { CircularProgress } from '@mui/material';
import { getCategoryist, getSubCategoryist, getServiceFilterList, getServiceReviewFilter, getServiceReviewFilter2 } from "../services/review";
import { getCompanyListing } from "../services/offers";
import { removeBaseUrlFromPath } from "../helpers";
import { getListDataInPagination } from "../services/commonServices";
import { toast } from 'react-toastify';
import StarRatingSelect from './StarRatingSelect';
import { API_BASE_URL } from '../services/authHandle';
import ReactPaginate from "react-paginate";


const Review = () => {
  const [selectedRating, setSelectedRating] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [reviewisLoading, setReviewisLoading] = useState(false)
  const [categorylist, setCategorylist] = useState([]);
  const [categorychoose, setCategoryChoose] = useState("")

  const [subcategorychoose, setSubcategoryChoose] = useState("")
  const [subcategorylist, setSubCategorylist] = useState([])

  const [servicefilterlist, setserviceFilterList] = useState([])

  const [companyList, setCompanyList] = useState([])
  const [selectedValue, setSelectedValue] = useState("");
  const [filterdataid, setfilterid] = useState("")
  const [filterdataidData, setfilteridData] = useState([])
  const [filtering, setFiltering] = useState({
    search: null,
    company: null,
    categoryid: null,
    subcategoryid: null,
    rating: null
  })
  const itemsPerPage = 10;

  const [totalPages, setTotalPages] = useState(0);

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
      getServiceReviewFilter2(filterdataid, selectedRating?.value)
        .then((data) => {
          setReviewisLoading(false)
          setTotalPages(Math.ceil(data?.count / itemsPerPage))
          setfilteridData(data.results);
        })
        .catch((error) => {
          setReviewisLoading(false)
          console.error("Error fetching distributor data:", error);
        });
    }
    else {
      getServiceReviewFilter(selectedRating?.value)
        .then((data) => {
          setReviewisLoading(false)
          setTotalPages(Math.ceil(data?.count / itemsPerPage))
          setfilteridData(data.results);
        })
        .catch((error) => {
          setReviewisLoading(false)
          console.error("Error fetching distributor data:", error);
        });
    }
  }, [filterdataid, selectedRating]);


  const handlePageClick = (data) => {
    const newPage = data.selected;
    const newStartIndex = newPage * itemsPerPage;

    setIsLoading(true);
   
    getListDataInPagination(`${API_BASE_URL}service/service-review-list?limit=${itemsPerPage}&offset=${newStartIndex}`)
      .then((data) => {
        setIsLoading(false);
        setfilteridData(data?.results);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <div className="page" style={{ height: "100vh", top: 20 }}>
      <div className='container'>
        <div className='row mb-4'>
          <div className='col-lg-3 p-3' style={{ backgroundColor: '#EDF5F6' }}>
            <div className='row'>
              <div className='col-lg-12'>
                <label className="form-label" style={{ fontWeight: 550 }}>Services</label>
                <div className="status_dropdown" style={{ position: "relative" }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    onChange={(e) => handlefiltering({ search: e.target.value })}
                  />
                  <svg style={{ position: "absolute", right: "3%", top: "25%" }} width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_7178_9720)">
                      <circle cx="9.58317" cy="9.58366" r="7.91667" stroke="#68727D" strokeWidth={2} />
                      <path d="M15.4165 15.417L18.3332 18.3337" stroke="#68727D" strokeWidth={2} strokeLinecap="round" />
                    </g>
                    <defs>
                      <clipPath id="clip0_7178_9720">
                        <rect width={20} height={20} fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className='col-lg-12 mt-2'>
                <label className="form-label" style={{ fontWeight: 550 }}>Vendor</label>
                <div>
                  <select
                    type="text"
                    className="form-select mb-3 status_selector"
                    value={selectedValue}
                    onChange={(e) => {
                      const selectedValue = e.target.value === "Choose" ? null : e.target.value;
                      handlefiltering({ company: selectedValue });
                      setSelectedValue(selectedValue)
                    }}
                  >
                    <option value={null}>Choose</option>
                    {companyList.map((data, index) =>
                      <option key={data.id} value={data.id}>{data.name}</option>
                    )}
                  </select>
                </div>
              </div>
              <div className='col-lg-12'>
                <label className="form-label" style={{ fontWeight: 550 }}>Category</label>
                <div>
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
                  </select>
                </div>
              </div>
              <div className='col-lg-12'>
                <label className="form-label" style={{ fontWeight: 550 }}>Sub Category</label>
                <div>
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
                          {
                            <img width={80} style={{ borderRadius: 5 }} src={data?.service_image[0]?.image} />}
                        </div>
                        <div className='w-20' style={{ marginLeft: 10 }}>
                          <span style={{ color: '#68727D' }}>Name</span><br />
                          <span class="plan-type" style={{ wordBreak: "break-word" }}>{data.name}</span>
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
                {servicefilterlist.length === 0 &&
                  (<div style={{ height: "5vh", marginTop: "50px" }} >
                    <p style={{ textAlign: "center", fontWeight: 550 }}>No Record Found</p>
                  </div>)
                }
              </div>
            </div>
          </div>
          <div className='col-lg-8 mx-1 mt-3' style={{ position: "relative" }}>
            {
              <div className='d-flex justify-content-between align-items-center' >
                <p style={{ fontWeight: 550 }}>Reviews</p>
                <div className='d-flex align-items-center'>
                  <div style={{ fontWeight: 550 }}>Sort by &nbsp;</div>
                  <div className="status_dropdown">
                    <StarRatingSelect
                      value={selectedRating}
                      onChange={(value) => setSelectedRating(value)}
                    />
                  </div>
                </div>
              </div>
            }
            <div className='row'>
              {filterdataidData.length === 0 &&
                <div className='text-center' style={{ fontWeight: "600", transform: "translateY(30vh)" }}>No Record Found</div>
              }
              {filterdataidData.map((data) =>
                <div key={data.id} className='col-lg-4 mb-2 mt-2'>
                  <div class="card">
                    <div class="card-body">
                      <h4 class="card-title">{data.rating} ⭐
                      </h4>
                      <h5 class="card-subtitle mb-2 text-muted">{data.service}</h5>
                      {/* <span className='head-text' style={{ textTransform: "capitalize" }}>{data?.review_title}</span> */}
                      <p class="card-text" style={{ wordBreak: "break-word" }}>{data?.review}</p>
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
            </div>
          </div>
        </div>
      </div>
      {totalPages > 0 && <div className="d-flex justify-content-center align-items-center mt-5">
                <ReactPaginate
                  breakLabel="..."
                  nextLabel="Next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={totalPages}
                  previousLabel="< Prev"
                  marginPagesDisplayed={1}
                  containerClassName="pagination"
                  activeClassName="active"
                  previousClassName="page-item previous"
                  nextClassName="page-item next"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousLinkClassName="page-link"
                  nextLinkClassName="page-link"
                />
              </div>}
    </div>
  )
}

export default Review
