
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
// import { Card, CardContent, Checkbox, FormControlLabel, Typography } from '@material-ui/core';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useSpring, animated } from 'react-spring';
import { useFormik } from "formik";
// import { format, parse } from 'date-fns'
import * as Yup from "yup";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
// import {
  
//   getCategoryist,
//   getSubCategoryist,
//   subcategoryIdFilter,
//   getServiceFilterList,
//   createAvailablity,
//   getsServicesavailableFilterList,
//   createAvailablityTime
// } from "../../axioshandle/review"
import { getCategoryist, getSubCategoryist, getServiceFilterList, getServiceReviewFilter, getServiceReviewFilter2, createAvailablity, getsServicesavailableFilterList, subcategoryIdFilter } from "../../services/review";

import { formatDate, formatDates } from '../../helpers';
const cards = [
  { id: 1, day: 'Mon', date: 1, month: 'Jan' },
  { id: 2, day: 'Tue', date: 2, month: 'Jan' },
  { id: 3, day: 'Wed', date: 3, month: 'Jan' },
  { id: 4, day: 'Thu', date: 4, month: 'Jan' },
  { id: 5, day: 'Fri', date: 5, month: 'Jan' },
  { id: 6, day: 'Sat', date: 6, month: 'Jan' },
];

const Availability = ({ selectedOptions, onChange, setIsRefetch, isRefetch, close }) => {
  const [categorylist, setCategorylist] = useState([])
  const [subcategorylist, setSubCategorylist] = useState([])
  const [selectedValue, setSelectedValue] = useState("New Lead");
  const [selectedDate, setSelectedDate] = useState("");
  const [servicefilterlist, setserviceFilterList] = useState([])
  const [optionmachine, setoptionmachine] = useState([])
  const [timeSlots, setTimeSlots] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [machineId, setmachineId] = useState(null)
  const [filterdataid, setfilterid] = useState("")
  const [filtering, setFiltering] = useState({
    search: "",
    categoryid: "",
    subcategoryid: ""
  })

  const onChangeMachine = (e) => {
    if (selectedDate && e?.id) {
      setmachineId(e?.id)

      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      const formattedDate = new Date(selectedDate).toLocaleDateString('en-GB', options);

      // Replace '/' with '-' in the formatted date
      const formattedDateWithHyphen = formattedDate.replace(/\//g, '-');

      const data = { date: formattedDateWithHyphen, machineId: e?.id };

      getsServicesavailableFilterList(data)
        .then((data) => {

          setTimeSlots(data?.time);

        })
        .catch((error) => {
          console.error("Error fetching lead data:", error);
        });
    }
  };
  // slot state
  const [selectedSlots, setSelectedSlots] = useState([]);
  // slot handler 
  const handleSlotClick = (slot) => {
    if (selectedSlots.includes(slot)) {
      // If the slot is already selected, remove it
      setSelectedSlots(selectedSlots.filter((selected) => selected !== slot));
    } else {
      // If the slot is not selected, add it
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());

  const handlePrevMonth = () => {
    setMonth(month === 0 ? 11 : month - 1);
    setYear(month === 0 ? year - 1 : year);
  };

  const handleNextMonth = () => {
    setMonth(month === 11 ? 0 : month + 1);
    setYear(month === 11 ? year + 1 : year);
  };


  // Slider Start

  const [index, setIndex] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);

  const props = useSpring({
    transform: `translateX(${-index * (100 / 7)}%)`, // Divide 100 by the number of columns (7 in this case)
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
  });

  const toggleCardSelection = (cardId) => {

    setSelectedCards((prevSelectedCards) =>
      prevSelectedCards.includes(cardId)
        ? prevSelectedCards.filter((id) => id !== cardId)
        : [...prevSelectedCards, { time: cardId, make_slot_available: true }]
    );
  };

  const nextCard = () => {
    setIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const prevCard = () => {
    setIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

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

  // onchanger handler category
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
  // service filter api
  useEffect(() => {
    getServiceFilterList(filtering)
      .then((data) => {
        console.log(data);
        setserviceFilterList(data);
      })
      .catch((error) => {
        console.error("Error fetching Service Filter List data:", error);
      });
  }, [filtering]);

  // subcategory onchange handler
  const handleSubCategoryChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const id = selectedOption.getAttribute("id");
    const subcategoryName = e.target.value;
    console.log(id, subcategoryName, "sub-category-change");
    const data = { subcategoryid: id }
    // service filter with subcategory id
    getServiceFilterList(data).then((data) => {

      setoptionmachine(data)
    })
      .catch((error) => {
        console.error("Error fetching lead data:", error);
      });
  };

  const formik = useFormik({
    initialValues: {

    },

    onSubmit: async (values) => {
      setIsLoading(true);

      try {
        const [year, month, day] = selectedDate.split('-');
        const reversedDate = `${day}-${month}-${year}`;
        const data = {
          service: machineId,
          date: reversedDate,
          time: selectedSlots,
          update_type: 'time'
        };

        console.log('submit', data);

        const adminData = await createAvailablity(data);

        if (adminData) {
          toast.success("Mark as Available Added Successfully.");
          setIsRefetch(!isRefetch);

          // close();
        } else {
          console.error("Error while creating Admin:", adminData.error);
        }
      } catch (error) {
        console.error("Error during form submission:", error);
      } finally {
        setIsLoading(false);
      }
    },
  });


  return (
    <div className="page" style={{ height: "100vh", top: 20 }}>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-6'>
            <div class="card">
              <div class="card-body">
                <form onSubmit={formik.handleSubmit}>
                  <div className='row'>
                    <h2>Mark Availability</h2>
                    <h3>Service Type</h3>
                    <div className='col-lg-6'>
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
                    <div className='col-lg-6'>
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
                    <h2>Select Machine</h2>
                    <Select
                      // isMulti
                      options={optionmachine}
                      value={selectedOptions}
                      onChange={onChangeMachine}
                      getOptionLabel={(option) => (

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <img src={option.service_image[0]?.image} alt={option.name} style={{ width: '40px', marginRight: '8px' }} />
                          <div>
                            <div>
                              <strong>{option?.name}</strong>
                            </div>
                            <div style={{ fontSize: '12px', color: 'gray' }}>
                              {option?.category[0]?.name}
                              {/* - {option.extraSublabel} */}
                            </div>
                          </div>
                        </div>
                      )}
                      getOptionValue={(option) => option.value}
                    />
                    <label className="form-label">Calendar :</label>
                    <input
                      type="date"

                      className="form-control"
                      placeholder="Date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                    <br></br>
                    <h4>Time Slot</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                      {timeSlots?.map((slot, index) => (
                        <div
                          key={index}
                          style={{
                            width: '120px',
                            margin: '8px',
                            cursor: 'pointer',
                            backgroundColor: selectedSlots.includes(slot?.time) ? '#0A77FF' : 'white',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            padding: '8px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}
                          onClick={() => handleSlotClick(slot?.time)}
                        >
                          <span>{slot?.time}</span>
                          {/* <Typography variant="body2">
                            {slot?.time}
                          </Typography> */}
                        </div>
                      ))}
                    </div>
                    <button
                      className="btn btn-success"
                      type="submit"
                      onClick={formik.handleSubmit}
                      style={{
                        flex: 1,
                        backgroundColor: "#006875",
                        width: "92%",
                        position: "absolute",
                        bottom: "1rem",
                      }}
                    >
                      {isLoading ? <CircularProgress /> : "Mark As Available"}
                    </button>
                    {selectedSlots.length > 0 && (
                      <div>
                        <p>You have selected the following time slots:</p>
                        <ul>
                          {selectedSlots.map((selected, index) => (
                            <li key={index}>{selected}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Availability