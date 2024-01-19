import React, { useState, useEffect } from 'react'
import { Breadcrumb } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getDiscountOfferView, getOneCompanyList } from "../../services/offers"
import { useParams } from 'react-router-dom';
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function DiscountView() {
  const [offerview, setOfferView] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [redemptiontype, setRedemptionType] = useState("");
  const [copys,setCopies]=useState("Copy")
  const params = useParams();
  const[newService,setNewService]=useState(false)

  useEffect(() => {
    setIsLoading(true);
  
    Promise.all([
      getDiscountOfferView(params.id),
      getOneCompanyList(params.id),
    ])
      .then(([offerData, companyData]) => {
        setOfferView(offerData);
  
        const servicelist = companyData?.results?.map(
          (data) => data?.company_service_count
        );
  
        if (servicelist && servicelist.length > 0) {
          setOfferView((prev) => {
            if (prev.id === params.id) {
              return {
                ...prev,
                servicelist: servicelist.flat(),
              };
            } else {
              return {
                ...prev,
              };
            }
          });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.response.data);
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [params.id]);
  

  const navigate = useNavigate()

  const handlecheckredemptiontype = () => {
    if (offerview?.allow_multiple_redeem === false) {
      setRedemptionType("One-Time")
    }
    if (offerview?.max_redeem_count < 9999) {
      setRedemptionType("Limited Time")
    }
    if (offerview?.max_redeem_count === 9999) {
      setRedemptionType("Unlimited")
    }
  }
  useEffect(() => {
    handlecheckredemptiontype()
  }, [offerview])

function companywithservice(companyid){
 
    const serviceCount = offerview?.servicelist?.map((dat)=>{if(dat.company_id===companyid){return dat.service_count}}) || 0;
    return serviceCount

}

function companywithservicelength(companyid){
 
  const serviceCount = offerview?.servicelist?.map((dat)=>{if(dat.company_id===companyid){return dat.total_services}}) || 0;
  return serviceCount

}

  return (

    <>
      {!isLoading && <div className="page" style={{ backgroundColor: "#DDECEE" }}>
        <Breadcrumb style={{ marginLeft: "5px" }}>
          <Breadcrumb.Item href="#">Discount / Offer
            <svg  width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.33333 5L12.7441 9.41074C13.0695 9.73618 13.0695 10.2638 12.7441 10.5893L8.33333 15" stroke="#68727D" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span style={{ color: "#006875" }}>{offerview?.name}</span>

          </Breadcrumb.Item>
        </Breadcrumb>

        <div className='d-flex justify-content-between mt-5 ms-3'>
          <div style={{ cursor: "pointer" }} onClick={() => navigate(-1)}>
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 12H4M4 12L10 6M4 12L10 18" stroke="#252525" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg> &nbsp;<span style={{ fontWeight: "500" }}>Back</span>
          </div>
          <button onClick={() => navigate("/discounts-offers/edit/"+offerview.id)} className='btn m-2' style={{ backgroundColor: "#2684FC", color: "white" }}>Edit Discount &nbsp;
            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
              <path d="M5 15L15 5M15 5H7.5M15 5V12.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

          </button>
        </div>

        <div className='container' style={{ backgroundColor: "white", width: "90%", padding: "2%", marginTop: "2%", borderRadius: "5px" }}>
          <p style={{ fontWeight: "500", fontSize: "16px" }}>Discount Details</p>
          <div className='d-flex'>
            <div className='w-50'>
              <div>
                <p style={{ color: "#68727D", fontSize: "16px" }}>Campaign Name</p>
                <p style={{ fontWeight: "700", fontSize: "14px" }}>{offerview?.name}</p>
              </div>
              <div>
                <p style={{ color: "#68727D", fontSize: "16px" }}>Discount Type</p>
                <p style={{ fontWeight: "700", fontSize: "14px" }}>{offerview?.discount_type}</p>
              </div>
              <div>
                <p style={{ color: "#68727D", fontSize: "16px" }}>Redemption Type</p>
                <p style={{ fontWeight: "700", fontSize: "14px" }}>{offerview?.redemption_type}</p>
              </div>
              <div>
                <p style={{ color: "#68727D", fontSize: "16px" }}>Expiration</p>
                <p style={{ fontWeight: "700", fontSize: "14px" }}>{offerview?.end_date !== null ? "Limited Time" : "No Expiry"}</p>
              </div>
            </div>
            <div className='w-50'>
              <div>
                <p style={{ color: "#68727D", fontSize: "16px" }}>Discount Code</p>
                <p style={{ fontWeight: "700", fontSize: "14px", color: "#006875" }}>{offerview?.coupon_code} &nbsp;
                  <button title={copys} style={{ backgroundColor: "transparent", border: "none" }} onClick={() => {navigator.clipboard.writeText(offerview?.coupon_code);setCopies("Copied")}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 26 26" fill="none">
                      <path d="M6.5 11.916C6.5 8.85189 6.5 7.31982 7.4519 6.36792C8.40381 5.41602 9.93587 5.41602 13 5.41602H16.25C19.3141 5.41602 20.8462 5.41602 21.7981 6.36792C22.75 7.31982 22.75 8.85189 22.75 11.916V17.3327C22.75 20.3968 22.75 21.9289 21.7981 22.8808C20.8462 23.8327 19.3141 23.8327 16.25 23.8327H13C9.93587 23.8327 8.40381 23.8327 7.4519 22.8808C6.5 21.9289 6.5 20.3968 6.5 17.3327V11.916Z" stroke="#68727D" strokeWidth={2} />
                      <path d="M6.5 20.5827C4.70507 20.5827 3.25 19.1276 3.25 17.3327V10.8327C3.25 6.74718 3.25 4.70442 4.5192 3.43522C5.78841 2.16602 7.83116 2.16602 11.9167 2.16602H16.25C18.0449 2.16602 19.5 3.62109 19.5 5.41602" stroke="#68727D" strokeWidth={2} />
                    </svg>
                  </button>

                </p>
              </div>
              <div>
                <p style={{ color: "#68727D", fontSize: "16px" }}>Specify Percentage</p>
                <p style={{ fontWeight: "700", fontSize: "14px" }}>{offerview?.discount_value} %</p>
              </div>
              <div>
                <p style={{ color: "#68727D", fontSize: "16px" }}>Usage</p>
                <p style={{ fontWeight: "700", fontSize: "14px" }}>{offerview?.specify_no} / {offerview?.redemption_type}</p>
              </div>
              {offerview?.end_date !== null  && <div>
                <p style={{ color: "#68727D", fontSize: "16px" }}>Validity Period</p>
                <p style={{ fontWeight: "700", fontSize: "14px" }}>{new Date(offerview?.end_date).toLocaleDateString('en-US', { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
              </div>}
            </div>
          </div>
        </div>

        <div className='container' style={{ backgroundColor: "white", width: "90%", padding: "2%", marginTop: "2%", borderRadius: "5px" }}>
          <p style={{ fontWeight: "500", fontSize: "16px" }}>Applies To</p>
          <p style={{ color: "#68727D", fontSize: "16px" }}>Services/Vendors</p>

         {offerview?.companies?.map((datas)=>
          <div style={{ border: "1px solid #EAEBF0", borderRadius: "6px", padding: "10px",marginBottom:"5px" }}>
          <p style={{ fontWeight: "700", fontSize: "14px" }}>{datas.name}</p>
             <p className='typography-dicount-view'>({companywithservice(datas.id)} of {companywithservicelength(datas.id)} Services Selected )</p>

        </div>
         )}
          {/* <div style={{ border: "1px solid #EAEBF0", borderRadius: "6px", padding: "10px", marginTop: "10px" }}>
            <p style={{ fontWeight: "700", fontSize: "14px" }}>Salma international</p>
            <p className='typography-dicount-view'>( 1 of 3 Services Selected )</p>
          </div> */}
        </div>

        <div className='container' style={{ backgroundColor: "white", width: "90%", padding: "2%", marginTop: "2%", borderRadius: "5px", marginBottom: "2%" }}>
          <p style={{ fontWeight: "500", fontSize: "16px" }}>Requirements</p>
          <div className='d-flex'>
            <div className='w-50'>
              <div>
                <p style={{ color: "#68727D", fontSize: "16px" }}>Purchase Requirements</p>
                <p style={{ fontWeight: "700", fontSize: "14px" }}>{offerview?.purchase_requirement === true  ? "Minimum Requirement" : "No Minimum Requirement"}</p>
              </div>
            </div>
            <div className='w-50'>

              <p style={{ color: "#68727D", fontSize: "16px" }}>Minimum Purchase Amount</p>
              <p style={{ fontWeight: "700", fontSize: "14px" }}>{offerview?.min_purchase_amount}</p>
            </div>
          </div>
        </div>
      </div>}
      {isLoading &&
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
          <CircularProgress />
        </div>
      }

    </>
  )
}
