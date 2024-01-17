import React, { useState, useEffect } from 'react'
import { getCategoryist, getSubCategoryist, getServiceFilterList, getServiceReviewFilter, getServiceReviewFilter2, createAvailablity, getsServicesavailableFilterList, subcategoryIdFilter, getBookServiceFilter } from "../../services/review";
// import { getBookServiceAvailablelist, getBookServiceFilter } from "../../axioshandle/calendarHandle"

const Calendar = () => {
    const [categorylist, setCategorylist] = useState([])
    const [subcategorylist, setSubCategorylist] = useState([])
    const [servicefilterlist, setserviceFilterList] = useState([])
    const [selectedValue, setSelectedValue] = useState("New Lead");
    const [filterdataid, setfilterid] = useState("")
    const [filterdataidData, setfilteridData] = useState('')
    const [filtertimedata, setfiltertimedata] = useState('')
    const [selectedDate, setSelectedDate] = useState("");
    const [filtering, setFiltering] = useState({
        search: "",
        categoryid: "",
        subcategoryid: ""
    })

    const handlefiltering = (fields) => {
        setFiltering((prev) => {
            return {
                ...prev, ...fields
            }
        })
    }

    // get subcategory with castegory id
    const handleListSubCategory = (id) => {
        subcategoryIdFilter(id)
            .then((data) => {
                setSubCategorylist(data);
            })
            .catch((error) => {
                console.error("Error fetching lead data:", error);
            });
    };

    const handleCategoryChange = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const id = selectedOption.getAttribute("id");
        const categoryName = e.target.value;
        setSelectedValue(categoryName)
        handleListSubCategory(id);
    };
    // get category list
    useEffect(() => {
        getCategoryist()
            .then((data) => {
                console.log('DATA', data)
                setCategorylist(data);
            })
            .catch((error) => {
                console.error("Error fetching Category data:", error);
            });
    }, []);

    // subcategory onchange handler
    const handleSubCategoryChange = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const id = selectedOption.getAttribute("id");
        const subcategoryName = e.target.value;
        console.log(id, subcategoryName, "sub-category-change");
        const data = { subcategoryid: id }
        // service filter with subcategory id
        getServiceFilterList(data).then((data) => {

            setserviceFilterList(data)
        })
            .catch((error) => {
                console.error("Error fetching lead data:", error);
            });
    };

    useEffect(() => {
        if (filterdataid && selectedDate) {
            getBookServiceFilter(filterdataid, selectedDate)
                .then((data) => {
                    console.log(data, "data");
                    setfilteridData(data);
                })
                .catch((error) => {
                    console.error("Error fetching Service Review Filter data:", error);
                });
        }

    }, [filterdataid, selectedDate]);

    return (
        <div className="page" style={{ height: "100vh", top: 20 }}>
            <div className='container'>
                <div className='row mb-4'>
                    <div className='col-lg-3' style={{ backgroundColor: '#EDF5F6' }}>
                        <div className='row'>
                            <label className="form-label">Calendar :</label>
                            <input
                                type="date"
                                className="form-control"
                                placeholder="Date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
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

                            <div className='col-lg-12'>
                                <label className="form-label">Category :</label>
                                <div className="status_dropdown">
                                    <select
                                        type="text"
                                        className="form-select mb-3 status_selector"
                                        value={selectedValue}
                                        onChange={handleCategoryChange}
                                    >
                                        <option value="" id={"0"}>Category</option>
                                        {categorylist &&
                                            categorylist.map((ele, i) => {
                                                return <option id={ele.id}>{ele.name}</option>;
                                            })}
                                    </select>
                                </div>
                            </div>
                            <div className='col-lg-12'>
                                <label className="form-label">Sub Category :</label>
                                <div className="status_dropdown">
                                    <select
                                        type="text"
                                        className="form-select mb-3 status_selector"
                                        value={selectedValue}
                                        onChange={handleSubCategoryChange}
                                    >
                                        <option value="" id={"0"}>Sub Category</option>
                                        {subcategorylist &&
                                            subcategorylist.map((item, i) => {
                                                return <option id={item.id}>{item.name}</option>;
                                            })}
                                    </select>
                                </div>
                            </div>
                            <div className='col-lg-12'>
                                {servicefilterlist?.map((data) =>
                                    <label key={data.id} class="card mb-4" style={{ display: 'flex' }} onClick={() => setfilterid(data.id)}>
                                        <input name="plan" class="radio" type="radio" checked={data.id === filterdataid} />
                                        <span class="plan-details">
                                            <div className='d-flex'>
                                                <div className='w-80'>
                                                    <img width={80} style={{ borderRadius: 5 }} src='data:image/jpeg;base64,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' />
                                                </div>
                                                <div className='w-20' style={{ marginLeft: 10 }}>
                                                    <span style={{ color: '#68727D' }}>Name</span><br />
                                                    <span class="plan-type">{data.name}</span>
                                                </div>
                                            </div>
                                        </span>
                                    </label>
                                )}
                            </div>
                        </div>

                    </div>
                    <div className='col-lg-9'>
                        <div className='row'>
                            <div className='col-lg-12'>
                                {/* {/* {filterdataidData?.map((data) => */}
                                <div className="card mb-3">
                                    <div className="card-body p-3">
                                        <span className='head-text'>{filterdataidData?.service?.name}</span> &nbsp;<span className='card-id'>{filterdataidData?.service?.service_id}</span><br />
                                        <span className='head-text'>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18.3333 10.0001C18.3333 14.6025 14.6023 18.3334 9.99996 18.3334C5.39759 18.3334 1.66663 14.6025 1.66663 10.0001C1.66663 5.39771 5.39759 1.66675 9.99996 1.66675C14.6023 1.66675 18.3333 5.39771 18.3333 10.0001Z" fill="#006875" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 6.04175C10.3452 6.04175 10.625 6.32157 10.625 6.66675V9.7412L12.5253 11.6415C12.7694 11.8856 12.7694 12.2813 12.5253 12.5254C12.2812 12.7694 11.8855 12.7694 11.6414 12.5254L9.55806 10.442C9.44085 10.3248 9.375 10.1658 9.375 10.0001V6.66675C9.375 6.32157 9.65482 6.04175 10 6.04175Z" fill="white" />
                                            </svg>&nbsp;
                                            {/* <p>{filterdataidData?.time[0]?.time}</p> */}
                                            {/* {filtertimedata?.map((data) => 
                                            <p></p>
                                            )} */}
                                        </span><br />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Calendar

