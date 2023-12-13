import React, { useContext, useState } from "react";
import { goLive } from "../services/leadMangement";
import Modal from "react-modal";
import { useNavigate } from "react-router";
import { OnboardContext } from "../Context/OnboardContext";
Modal.setAppElement("#root");

function GoLive({ userData }) {
  const navigate = useNavigate();
  const { vendorId } = useContext(OnboardContext);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
      width: "400px",
      height: "210px",
    },
  };

  const paragraphStyle = {
    color: "#68727D",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "24px", // You can also specify "150%" as a string if needed
  };

  const paraHeaderStyle = {
    color: "#252525",
    fontFamily: "Roboto",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "28px", // You can also specify "155.556%" as a string if needed
    letterSpacing: "-0.18px",
  };

  const buttonDiv = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const proceedStyle = {
    width: "150px",
    fontWeight: 500,
    backgroundColor: "#0A77FF",
  };

  const cancelStyle = {
    width: "150px",
    fontWeight: 500,
  };

  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  const handleOnBoard = async () => {
    goLive(userData?.company_company_user?.id)
      .then((data) => {
        if (data) {
          setIsOpenSuccess(true);
          setIsConfirm(false);
        }
      })
      .catch((error) => {
        console.error("Error on Fetching list Qualification", error);
      });
  };

  return (
    <div className="card col-10 add_details">
      <div className="card-body">
        <div className="tab-content home">
          <div className="tab-pane active show" id="tabs-home-7">
            <div>
              <div className="page-body" style={{ backgroundColor: "white" }}>
                <div className="container-xl">
                  <div>
                    <div className="tab-pane active show" id="tabs-home-7">
                      <div>
                        {!isOpenSuccess ? (
                          <div className="home_contents">
                            <p style={{ fontWeight: "700", fontSize: "16px" }}>
                              Onboard The Vendor
                            </p>
                            <p style={{ fontSize: "14px", color: "#68727D" }}>
                              Check and confirm the details below to onboard the
                              vendor
                            </p>
                            <button
                              className="btn"
                              onClick={() => {
                                setIsConfirm(true);
                              }}
                              style={{
                                backgroundColor: "#006875",
                                color: "white",
                                borderRadius: "6px",
                                width: "125px",
                              }}
                            >
                              Onboard Vendor
                            </button>
                          </div>
                        ) : (
                          <div
                            style={{
                              textAlign: "center",
                              // justifyContent: "center",
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="80"
                              height="80"
                              viewBox="0 0 80 80"
                              fill="none"
                            >
                              <path
                                opacity="0.4"
                                d="M73.3327 40.0013C73.3327 58.4108 58.4088 73.3346 39.9994 73.3346C21.5899 73.3346 6.66602 58.4108 6.66602 40.0013C6.66602 21.5918 21.5899 6.66797 39.9994 6.66797C58.4088 6.66797 73.3327 21.5918 73.3327 40.0013Z"
                                fill="#08A747"
                              />
                              <path
                                d="M53.4351 29.9002C54.4114 30.8765 54.4114 32.4594 53.4351 33.4357L36.7684 50.1024C35.7921 51.0787 34.2092 51.0787 33.2329 50.1024L26.5662 43.4357C25.5899 42.4594 25.5899 40.8765 26.5662 39.9002C27.5425 38.9239 29.1254 38.9239 30.1018 39.9002L35.0007 44.7991L42.4501 37.3497L49.8995 29.9002C50.8759 28.9239 52.4588 28.9239 53.4351 29.9002Z"
                                fill="#08A747"
                              />
                            </svg>
                            <h4>Vender Successfully Onboarded</h4>
                            <span>
                              Go to vendor page to start adding services
                            </span>
                            <br />
                            <button
                              className="btn my-2"
                              onClick={() => {
                                navigate(`/user-vendor/${vendorId}`);
                              }}
                              style={{
                                backgroundColor: "#006875",
                                color: "white",
                                borderRadius: "6px",
                                // width: "125px",
                              }}
                            >
                              Go To Vendor Page
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          isOpen={isConfirm}
          onRequestClose={() => setIsConfirm(false)}
          style={customStyles}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M16.0003 21.3477V14.681M16.0003 10.681V10.6677M29.3337 16.0013C29.3337 23.3651 23.3641 29.3346 16.0003 29.3346C8.63653 29.3346 2.66699 23.3651 2.66699 16.0013C2.66699 8.63751 8.63653 2.66797 16.0003 2.66797C23.3641 2.66797 29.3337 8.63751 29.3337 16.0013Z"
              stroke="#252525"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          <div style={{ marginTop: "5px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p style={paraHeaderStyle}>Confirm The Action</p>
              <p style={paragraphStyle}>Are you sure you want to proceed</p>
            </div>
            <div style={buttonDiv}>
              <button
                onClick={() => {
                  setIsConfirm(false);
                }}
                className="btn btn-outline"
                style={cancelStyle}
              >
                Cancel
              </button>
              <button
                onClick={handleOnBoard}
                className="btn btn-info"
                style={proceedStyle}
                type="submit"
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default GoLive;
