import React from 'react'
import { useState, useEffect } from "react";
import { getCategoryist, getSubCategoryist, getServiceFilterList, getServiceReviewFilter,getCompanyList } from "../services/review"

const Review = () => {
  const [categorylist, setCategorylist] = useState([]);
  const [categorychoose,setCategoryChoose]=useState("")

  const [subcategorychoose,setSubcategoryChoose]=useState("")
  const [subcategorylist, setSubCategorylist] = useState([])

  const [servicefilterlist, setserviceFilterList] = useState([])
  
  const [companyList,setCompanyList]=useState([])
  const [selectedValue, setSelectedValue] = useState("New Lead");
  const [filterdataid, setfilterid] = useState("")
  const [filterdataidData, setfilteridData] = useState([])
  const [filtering, setFiltering] = useState({
    search: "",
    categoryid: "",
    subcategoryid: "",
    rating:0
  })

  const handlefiltering = (fields) => {
    setFiltering((prev) => {
      return {
        ...prev, ...fields
      }
    })
  }

  useEffect(() => {
    getCompanyList()
      .then((data) => {
        setCompanyList(data.results);
      })
      .catch((error) => {
        console.error("Error fetching distributor data:", error);
      });
  }, []);

  useEffect(() => {
    getCategoryist()
      .then((data) => {
        setCategorylist(data.results);
      })
      .catch((error) => {
        console.error("Error fetching distributor data:", error);
      });
  }, []);

  useEffect(() => {
    getSubCategoryist(categorychoose)
      .then((data) => {
        setSubCategorylist(data.results);
      })
      .catch((error) => {
        console.error("Error fetching distributor data:", error);
      });
  }, [categorychoose]);


  useEffect(() => {
    getServiceFilterList(filtering)
      .then((data) => {
        setserviceFilterList(data.results);
      })
      .catch((error) => {
        console.error("Error fetching distributor data:", error);
      });
  }, [filtering]);

  useEffect(() => {
    getServiceReviewFilter(filterdataid)
      .then((data) => {
        setfilteridData(data.results);
      })
      .catch((error) => {
        console.error("Error fetching distributor data:", error);
      });
  }, [filterdataid]);

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
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
                    <option value="All">All</option>
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
                    onChange={(e)=>{setCategoryChoose(e.target.value);handlefiltering({categoryid:e.target.value})}}
                  >
                    <option value="">All</option>
                    {categorylist.map((data, index) =>
                      <option key={data.id} value={data.id}>{data.name}</option>
                    )}
                    {/* <option value="New Lead">All</option>
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
                    onChange={(e)=>{setSubcategoryChoose(e.target.value);handlefiltering({subcategoryid:e.target.value})}}
                  >
                    <option value="">All</option>
                    {subcategorylist.map((data, index) =>
                      <option key={data.id} value={data.id}>{data.name}</option>
                    )}
                  </select>
                </div>
              </div>
              <div className='col-lg-12' style={{height:"50vh",overflowY:"scroll"}}>
                {servicefilterlist?.map((data) =>
                  <label key={data.id} class="card mb-4" style={{ display: 'flex' }} onClick={() => setfilterid(data.id)}>
                    <input name="plan" class="radio" type="radio" checked={data.id === filterdataid} />
                    <span class="plan-details">
                      <div className='d-flex'>
                        <div className='w-80'>
                          {data?.service_image?.map((dat)=>
                          <img width={80} style={{ borderRadius: 5 }} src={dat.image} />
                          )}
                        </div>
                        <div className='w-20' style={{marginLeft:10}}>
                          <span style={{color: '#68727D'}}>Name</span><br/>
                          <span class="plan-type">{data.name}</span>
                        </div>
                      </div>
                    </span>
                  </label>
                )}
              </div>
            </div>
          </div>
          <div className='col-lg-8 mx-1'>
            {filterdataidData.length>0 && 
            <div className='d-flex justify-content-between align-items-center'>
              <p>Review</p>
              <div className='d-flex align-items-center'>
                <div>Sort by &nbsp;</div>
                <div className="status_dropdown">
                  <select
                    type="text"
                    className="form-control px-3"
                    value={filtering.rating}
                    onChange={(e)=>{handlefiltering({rating:e.target.value})}}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    
                  </select>
                </div>
            </div>
            </div>
            }
            <div className='row'>
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
                      <span className='head-text'>{data?.review_title}</span>
                      <p class="card-text">{data?.review_summary}</p>
                      <div style={{ position: 'relative', bottom: 10 }}>
                        <span style={{ color: '#006875' }}>{data?.user}</span><br></br>
                        <span>25/07/2023</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Review
