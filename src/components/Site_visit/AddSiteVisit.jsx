import React from "react";
import "../../static/css/site_visit.css";
import DropZone from "../Common/DropZone";

function AddSiteVisit() {
  return (
    <div className="card col-11 add_details">
      <div className="card-body">
        <div className="tab-content home">
          <div className="tab-pane active show" id="tabs-home-7">
            <div>
              <div className="page-body" style={{ backgroundColor: "white" }}>
                <div className="container-xl">
                  <form action="">
                    <div className="row row-cards">
                      <h4>Site Visit</h4>

                      <div className="col-lg-12">
                        <label htmlFor="" className="form-label">
                          Title
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Title"
                        />
                      </div>
                      <div className="col-lg-12">
                        <DropZone />
                      </div>
                    </div>
                    <div className="summary">
                      <label htmlFor="" className="form-label">
                        Notes
                      </label>
                      <textarea
                        name=""
                        id=""
                        cols="10"
                        rows="10"
                        placeholder="Notes"
                        className="form-control"
                      ></textarea>
                    </div>
                    <div
                      className="col-lg-12"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "12px",
                      }}
                    >
                      <div style={{ width: "48%" }}>
                        <label htmlFor="" className="form-label">
                          Date
                        </label>
                        <input
                          type="date"
                          name=""
                          id=""
                          className="form-control"
                        />
                      </div>

                      <div style={{ width: "48%" }}>
                        <label htmlFor="" className="form-label">
                          Time
                        </label>
                        <input
                          type="time"
                          name=""
                          id=""
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="qualification">
                      <h4>Qualifications</h4>
                      <div className="qualification_list">
                        <div className="qualification_row">
                          <div className="qualification_1">
                            <div className="svg_box">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                fill="none"
                              >
                                <circle
                                  cx="10.5003"
                                  cy="10.4993"
                                  r="2.33333"
                                  stroke="#6E7070"
                                  stroke-width="2"
                                />
                                <path
                                  d="M15.1663 17.4993C15.1663 18.788 15.1663 19.8327 10.4997 19.8327C5.83301 19.8327 5.83301 18.788 5.83301 17.4993C5.83301 16.2107 7.92235 15.166 10.4997 15.166C13.077 15.166 15.1663 16.2107 15.1663 17.4993Z"
                                  stroke="#6E7070"
                                  stroke-width="2"
                                />
                                <path
                                  d="M2.33301 13.9993C2.33301 9.59957 2.33301 7.39969 3.69984 6.03285C5.06668 4.66602 7.26657 4.66602 11.6663 4.66602H16.333C20.7328 4.66602 22.9327 4.66602 24.2995 6.03285C25.6663 7.39969 25.6663 9.59957 25.6663 13.9993C25.6663 18.3991 25.6663 20.599 24.2995 21.9658C22.9327 23.3327 20.7328 23.3327 16.333 23.3327H11.6663C7.26657 23.3327 5.06668 23.3327 3.69984 21.9658C2.33301 20.599 2.33301 18.3991 2.33301 13.9993Z"
                                  stroke="#6E7070"
                                  stroke-width="2"
                                />
                                <path
                                  d="M22.167 14H17.5003"
                                  stroke="#6E7070"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                />
                                <path
                                  d="M22.167 10.5H16.3337"
                                  stroke="#6E7070"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                />
                                <path
                                  d="M22.167 17.5H18.667"
                                  stroke="#6E7070"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="quanlification_heading">
                                Legal License
                              </p>
                              <p className="qualification_content">
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been.
                              </p>
                            </div>
                            <div className="qualification_checkbox">
                              <input
                                type="checkbox"
                                name=""
                                id=""
                                className="form-check-input"
                              />
                            </div>
                          </div>
                          <div className="qualification_1">
                            <div className="svg_box">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                fill="none"
                              >
                                <path
                                  d="M2.33301 6.41667L3.74967 8.16667L8.74967 3.5"
                                  stroke="#6E7070"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M2.33301 14.5827L3.74967 16.3327L8.74967 11.666"
                                  stroke="#6E7070"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M2.33301 22.7507L3.74967 24.5007L8.74967 19.834"
                                  stroke="#6E7070"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M25.6667 22.166L14 22.166"
                                  stroke="#6E7070"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                />
                                <path
                                  d="M25.6667 14L14 14"
                                  stroke="#6E7070"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                />
                                <path
                                  d="M25.6667 5.83398L14 5.83398"
                                  stroke="#6E7070"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="quanlification_heading">
                                Saftey Qualifications
                              </p>
                              <p className="qualification_content">
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been.
                              </p>
                            </div>
                            <div className="qualification_checkbox">
                              <input
                                type="checkbox"
                                name=""
                                id=""
                                className="form-check-input"
                              />
                            </div>
                          </div>
                          <div className="qualification_1">
                            <div className="svg_box">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                fill="none"
                              >
                                <path
                                  d="M3.5 11.6673C3.5 7.26754 3.5 5.06765 4.86684 3.70082C6.23367 2.33398 8.43356 2.33398 12.8333 2.33398H15.1667C19.5664 2.33398 21.7663 2.33398 23.1332 3.70082C24.5 5.06765 24.5 7.26754 24.5 11.6673V16.334C24.5 20.7338 24.5 22.9336 23.1332 24.3005C21.7663 25.6673 19.5664 25.6673 15.1667 25.6673H12.8333C8.43356 25.6673 6.23367 25.6673 4.86684 24.3005C3.5 22.9336 3.5 20.7338 3.5 16.334V11.6673Z"
                                  stroke="#6E7070"
                                  stroke-width="2"
                                />
                                <path
                                  d="M9.33301 11.666H18.6663"
                                  stroke="#6E7070"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                />
                                <path
                                  d="M9.33301 16.334H15.1663"
                                  stroke="#6E7070"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="quanlification_heading">
                                Insurance
                              </p>
                              <p className="qualification_content">
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been.
                              </p>
                            </div>
                            <div className="qualification_checkbox">
                              <input
                                type="checkbox"
                                name=""
                                id=""
                                className="form-check-input"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="qualification_row">
                          <div className="qualification_1">
                            <div className="svg_box">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                fill="none"
                              >
                                <path
                                  d="M4.66699 7.00065V22.1673C4.66699 24.1003 6.234 25.6673 8.16699 25.6673H19.8337C21.7667 25.6673 23.3337 24.1003 23.3337 22.1673V10.5007C23.3337 8.56765 21.7667 7.00065 19.8337 7.00065H4.66699ZM4.66699 7.00065V5.83398"
                                  stroke="#6E7070"
                                  stroke-width="2"
                                />
                                <path
                                  d="M21.0003 6.99954V7.99954H22.0003V6.99954H21.0003ZM18.337 2.71334L18.1956 1.72339L18.337 2.71334ZM5.73985 4.51294L5.59843 3.52299L5.59843 3.52299L5.73985 4.51294ZM5.91657 7.99954H21.0003V5.99954H5.91657V7.99954ZM22.0003 6.99954V5.02322H20.0003V6.99954H22.0003ZM18.1956 1.72339L5.59843 3.52299L5.88127 5.50289L18.4784 3.70329L18.1956 1.72339ZM5.59843 3.52299C4.49018 3.68131 3.66699 4.63045 3.66699 5.74996H5.66699C5.66699 5.62575 5.75832 5.52045 5.88127 5.50289L5.59843 3.52299ZM22.0003 5.02322C22.0003 2.99473 20.2037 1.43652 18.1956 1.72339L18.4784 3.70329C19.2817 3.58854 20.0003 4.21183 20.0003 5.02322H22.0003ZM5.91657 5.99954C5.77873 5.99954 5.66699 5.88779 5.66699 5.74996H3.66699C3.66699 6.99236 4.67416 7.99954 5.91657 7.99954V5.99954Z"
                                  fill="#6E7070"
                                />
                                <path
                                  d="M9.33301 14H18.6663"
                                  stroke="#6E7070"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                />
                                <path
                                  d="M9.33301 18.084H15.7497"
                                  stroke="#6E7070"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="quanlification_heading">
                                Business License
                              </p>
                              <p className="qualification_content">
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been.
                              </p>
                            </div>
                            <div className="qualification_checkbox">
                              <input
                                type="checkbox"
                                name=""
                                id=""
                                className="form-check-input"
                              />
                            </div>
                          </div>
                          <div className="qualification_1">
                            <div className="svg_box">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                fill="none"
                              >
                                <circle
                                  cx="14"
                                  cy="14"
                                  r="3.5"
                                  stroke="#6E7070"
                                  stroke-width="2"
                                />
                                <path
                                  d="M16.0592 2.5116C15.6304 2.33398 15.0868 2.33398 13.9996 2.33398C12.9124 2.33398 12.3688 2.33398 11.94 2.5116C11.3683 2.74842 10.914 3.20266 10.6772 3.77439C10.5691 4.03538 10.5268 4.3389 10.5102 4.78164C10.4859 5.43228 10.1522 6.03453 9.58836 6.36007C9.0245 6.68561 8.33611 6.67345 7.76049 6.3692C7.36878 6.16217 7.08477 6.04704 6.80468 6.01017C6.19114 5.9294 5.57064 6.09566 5.07968 6.47238C4.71146 6.75493 4.43966 7.2257 3.89606 8.16724C3.35247 9.10878 3.08067 9.57955 3.02009 10.0397C2.93931 10.6533 3.10557 11.2738 3.4823 11.7647C3.65425 11.9888 3.89591 12.1772 4.27098 12.4128C4.82236 12.7593 5.17713 13.3495 5.1771 14.0007C5.17706 14.6518 4.8223 15.2419 4.27097 15.5883C3.89585 15.824 3.65415 16.0124 3.48218 16.2365C3.10546 16.7275 2.9392 17.348 3.01997 17.9615C3.08055 18.4217 3.35235 18.8924 3.89595 19.834C4.43955 20.7755 4.71135 21.2463 5.07957 21.5288C5.57052 21.9056 6.19103 22.0718 6.80457 21.9911C7.08464 21.9542 7.36863 21.8391 7.76031 21.6321C8.33598 21.3278 9.02441 21.3156 9.58831 21.6412C10.1522 21.9668 10.4859 22.569 10.5102 23.2197C10.5268 23.6624 10.5691 23.9659 10.6772 24.2269C10.914 24.7986 11.3683 25.2529 11.94 25.4897C12.3688 25.6673 12.9124 25.6673 13.9996 25.6673C15.0868 25.6673 15.6304 25.6673 16.0592 25.4897C16.6309 25.2529 17.0851 24.7986 17.322 24.2269C17.4301 23.9659 17.4724 23.6624 17.4889 23.2196C17.5133 22.569 17.8469 21.9668 18.4107 21.6412C18.9746 21.3156 19.6631 21.3277 20.2388 21.632C20.6304 21.839 20.9144 21.9541 21.1945 21.991C21.808 22.0717 22.4285 21.9055 22.9195 21.5288C23.2877 21.2462 23.5595 20.7754 24.1031 19.8339C24.6467 18.8924 24.9185 18.4216 24.9791 17.9614C25.0598 17.3479 24.8936 16.7274 24.5169 16.2364C24.3449 16.0123 24.1032 15.8239 23.7281 15.5883C23.1768 15.2418 22.822 14.6517 22.8221 14.0005C22.8221 13.3495 23.1768 12.7594 23.7281 12.413C24.1033 12.1773 24.345 11.9889 24.517 11.7648C24.8937 11.2738 25.06 10.6533 24.9792 10.0398C24.9186 9.57963 24.6468 9.10886 24.1032 8.16732C23.5596 7.22578 23.2878 6.75501 22.9196 6.47246C22.4286 6.09574 21.8081 5.92948 21.1946 6.01025C20.9145 6.04712 20.6305 6.16223 20.2389 6.36925C19.6632 6.67351 18.9747 6.68567 18.4108 6.36011C17.847 6.03454 17.5133 5.43226 17.4889 4.78158C17.4724 4.33887 17.4301 4.03537 17.322 3.77439C17.0851 3.20266 16.6309 2.74842 16.0592 2.5116Z"
                                  stroke="#6E7070"
                                  stroke-width="2"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="quanlification_heading">
                                Machine Running Condition
                              </p>
                              <p className="qualification_content">
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been.
                              </p>
                            </div>
                            <div className="qualification_checkbox">
                              <input
                                type="checkbox"
                                name=""
                                id=""
                                className="form-check-input"
                              />
                            </div>
                          </div>
                          <div className="qualification_1">
                            <div className="svg_box">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                fill="none"
                              >
                                <path
                                  d="M16.333 18.6673L18.783 21.584L23.333 15.7507"
                                  stroke="#6E7070"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M24.5 7L3.5 7"
                                  stroke="#6E7070"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                />
                                <path
                                  d="M24.5 11.666L3.5 11.666"
                                  stroke="#6E7070"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                />
                                <path
                                  d="M11.667 16.334H3.50033"
                                  stroke="#6E7070"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                />
                                <path
                                  d="M11.667 21H3.50033"
                                  stroke="#6E7070"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="quanlification_heading">
                                Commitment Terms & Conditions
                              </p>
                              <p className="qualification_content">
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been.
                              </p>
                            </div>
                            <div className="qualification_checkbox">
                              <input
                                type="checkbox"
                                name=""
                                id=""
                                className="form-check-input"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSiteVisit;
