import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfileData } from "../../services/Profile";
import ProfileCardDetails from "./ProfileCardDetails";

function ProfileView() {
  const navigate = useNavigate();

const [isLoading,setIsloading]=useState(false)
  const [customerDetails, setCustomerDetails] = useState([]);
  useEffect(() => {
    setIsloading(true)
    getProfileData()
      .then((data) => {
        setIsloading(false)
        if(data){
          setCustomerDetails(data)
        }
      })
      .catch((error) => {
        setIsloading(false)
        console.error("Error fetching customer data:", error);
      });
  }, []);
  
  return (
    <>
      <div className="page">
        <div className="page-body">
          <div className="container-xl">
            <div>
              <div className="col-12">
                <div className="row row-cards">
                  <div className="breadcrumbs">
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/customers")}
                    >
                      <p>Profile</p>
                    </div>
                    
                    

                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M8.33301 5L12.7438 9.41074C13.0692 9.73618 13.0692 10.2638 12.7438 10.5893L8.33301 15"
                          stroke="#68727D"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </svg>
                    </span>
                    <p>
                      {customerDetails?.first_name}
                      {customerDetails?.last_name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between mt-5 ms-3">
              <div style={{ cursor: "pointer" }} onClick={() => navigate(-1)}>
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 12H4M4 12L10 6M4 12L10 18"
                    stroke="#252525"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>{" "}
                &nbsp;<span style={{ fontWeight: "800" }}>Back</span>
              </div>
            </div>
            <ProfileCardDetails data={customerDetails} isLoading={isLoading}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileView;
