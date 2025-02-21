import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import PerDayEditModal from './PerDayEditModal'
import {DeleteOnePrice} from "../../../services/service"
import { toast } from 'react-toastify';

export default function PerDayTable({data,formik,setIsUpdated}) {
    const [PerDayOPen, setPerDayOpen] = useState(false)
    const handleopenday = () => {
        setPerDayOpen(true)
    }
    const handlecloseday = () => {
        setPerDayOpen(false)
    }

    const [passdata,setPassData]=useState({})

    const handlestoredata = (data) => {
        setPassData(data);
        handleopenday()
    }

    const handleremove = (index,id) => {
        if(index !== undefined && index !== null){
            formik((prev) => {
                const updatedServicePriceService = [...prev.service_price_service];
                updatedServicePriceService.splice(index, 1);
            
                return {
                  ...prev,
                  service_price_service: updatedServicePriceService,
                };
              });
        }

        if(id){
            DeleteOnePrice(id)
            .then((data) => { toast.success(data?.message); setIsUpdated(true) }
            ).catch((error) =>
                toast.error(error.message))
        }
      };
      
    return (
        <div className="">
            <div className="table-responsive">
                <table className="table card-table table-vcenter text-nowrap datatable">
                    <thead>
                        <tr>
                            <th className="w-1">
                                <span>Name</span>
                            </th>
                            <th>
                                <span>Start Day</span>
                            </th>
                            <th>
                                <span>End Day</span>
                            </th>
                            <th>
                                <span>Price</span>
                            </th>

                            <th>
                                <span>Action</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((dat,i)=>
                        <tr>
                        <td>
                            <span className="text-secondary">
                                {dat.name}
                            </span>
                        </td>
                        <td>
                            <span className="text-secondary"> {dat?.day}</span>
                        </td>
                        <td>
                            <span className="text-secondary"> {dat?.end_day===null ? "-" :dat?.end_day}</span>
                        </td>
                        <td>
                          <span className="text-secondary">{dat.price} KWD</span>
                        </td>
                        <td
                        >
                            <Link
                            onClick={()=>handlestoredata(dat)}
                                to={""}
                                className="btn btn-sm btn-dark"
                                style={{ padding: "3px 8px", borderRadius: "4px" }}
                            >
                                Edit &nbsp;
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
                            &nbsp;
                                <svg onClick={()=>handleremove(i,dat.id)} style={{cursor:"pointer"}} xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                    <path d="M2.5 5.43586C2.5 5.10712 2.77226 4.84062 3.10811 4.84062H7.09823C7.10364 4.1396 7.17962 3.17855 7.87531 2.51325C8.4228 1.98967 9.1734 1.66602 9.99999 1.66602C10.8266 1.66602 11.5772 1.98967 12.1247 2.51325C12.8204 3.17855 12.8963 4.1396 12.9018 4.84062H16.8919C17.2277 4.84062 17.5 5.10712 17.5 5.43586C17.5 5.7646 17.2277 6.0311 16.8919 6.0311H3.10811C2.77226 6.0311 2.5 5.7646 2.5 5.43586Z" fill="#F6513B" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M9.663 18.3327H10.337C12.6559 18.3327 13.8154 18.3327 14.5693 17.5944C15.3231 16.8561 15.4003 15.6451 15.5545 13.2231L15.7768 9.73318C15.8605 8.41902 15.9023 7.76194 15.5241 7.34556C15.1459 6.92917 14.5073 6.92917 13.23 6.92917H6.77004C5.49272 6.92917 4.85407 6.92917 4.47588 7.34556C4.09769 7.76194 4.13953 8.41902 4.22323 9.73319L4.44549 13.2231C4.59975 15.6451 4.67687 16.8561 5.43074 17.5944C6.18461 18.3327 7.34407 18.3327 9.663 18.3327ZM8.53856 10.1564C8.50422 9.79487 8.19794 9.53109 7.85448 9.56725C7.51101 9.6034 7.26042 9.9258 7.29477 10.2873L7.71143 14.6733C7.74578 15.0348 8.05206 15.2986 8.39552 15.2625C8.73899 15.2263 8.98958 14.9039 8.95523 14.5424L8.53856 10.1564ZM12.1455 9.56725C12.489 9.6034 12.7396 9.9258 12.7052 10.2873L12.2886 14.6733C12.2542 15.0348 11.9479 15.2986 11.6045 15.2625C11.261 15.2263 11.0104 14.9039 11.0448 14.5424L11.4614 10.1564C11.4958 9.79487 11.8021 9.53109 12.1455 9.56725Z" fill="#F6513B" />
                                </svg>
                        </td>
                    </tr>
                        )
                        }
                        {data?.length===0?
                        <tr>
                            <td>No Data</td>
                        </tr>
                        :""
                        }
                    </tbody>
                </table>
            </div>
            {PerDayOPen && <PerDayEditModal handleClose={handlecloseday} handleOpen={handleopenday} open={PerDayOPen} data={passdata} formiks={formik}/>}
        </div>
    )
}
