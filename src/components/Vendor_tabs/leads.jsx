export default function LeadDetails() {
  return (
    <div class="tab-content home">
      <div class="tab-pane active show" id="tabs-home-7">
        <div>
          {/* className="home_contents" */}
          <div>
            <button
              className="btn"
              style={{
                backgroundColor: "#187AF7",
                color: "white",
                borderRadius: "6px",
                width: "215px",
                fontSize: "16px",
                fontWeight: "700",
              }}
            >
              Edit Details &nbsp;
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.20898 18.334C3.20898 17.9888 3.48881 17.709 3.83398 17.709H17.1673C17.5125 17.709 17.7923 17.9888 17.7923 18.334C17.7923 18.6792 17.5125 18.959 17.1673 18.959H3.83398C3.48881 18.959 3.20898 18.6792 3.20898 18.334Z"
                    fill="white"
                  />
                  <path
                    d="M9.31143 13.1827C9.52355 13.0173 9.71596 12.8249 10.1007 12.4401L15.0313 7.50956C14.3602 7.23026 13.5654 6.77148 12.8138 6.0198C12.062 5.268 11.6031 4.47307 11.3239 3.80195L6.3932 8.73261L6.39318 8.73264C6.00843 9.11739 5.81603 9.30978 5.65058 9.52191C5.45541 9.77214 5.28807 10.0429 5.15155 10.3294C5.03581 10.5722 4.94977 10.8303 4.77769 11.3466L3.87028 14.0688C3.7856 14.3228 3.85172 14.6029 4.04107 14.7923C4.23042 14.9816 4.5105 15.0477 4.76455 14.963L7.48677 14.0556C8.00299 13.8836 8.26112 13.7975 8.50397 13.6818C8.79045 13.5453 9.0612 13.3779 9.31143 13.1827Z"
                    fill="white"
                  />
                  <path
                    d="M16.3995 6.14139C17.4233 5.11758 17.4233 3.45767 16.3995 2.43387C15.3757 1.41006 13.7157 1.41006 12.6919 2.43387L12.1006 3.02523C12.1087 3.04968 12.1171 3.07447 12.1258 3.09959C12.3426 3.72435 12.7515 4.54335 13.5209 5.3127C14.2902 6.08204 15.1092 6.49101 15.734 6.70776C15.759 6.71643 15.7837 6.72479 15.808 6.73286L16.3995 6.14139Z"
                    fill="white"
                  />
                </svg>
              </span>
            </button>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "20px 20px 10px 20px",
              }}
            >
              <p style={{ fontWeight: "700", fontSize: "16px" }}>
                Personal Details
              </p>
              <div
                style={{ display: "flex", flexDirection: "row" }}
                className="col-12"
              >
                <div className="col-4">
                  <p style={{ color: "#68727D" }}>Full Name</p>
                  <p style={{ color: "#323539", fontWeight: "600" }}>James</p>
                </div>
                <div className="col-4">
                  <p style={{ color: "#68727D" }}>Email</p>
                  <p style={{ color: "#323539", fontWeight: "600" }}>
                    Jamescordvan@gmail.com
                  </p>
                </div>
                <div className="col-4">
                  <p style={{ color: "#68727D" }}>Phone</p>
                  <p style={{ color: "#323539", fontWeight: "600" }}>
                    78909003939
                  </p>
                </div>
              </div>
              <div
                style={{ display: "flex", flexDirection: "row" }}
                className="col-12"
              >
                <div className="col-4">
                  <p style={{ color: "#68727D" }}>Location</p>
                  <div style={{ display: "flex", gap: "40px" }}>
                    <p style={{ color: "#323539", fontWeight: "600" }}>
                      Marina Crescent
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.9993 1.83398C6.94926 1.83398 3.66602 5.50302 3.66602 9.62565C3.66602 13.716 6.00656 18.162 9.65833 19.8689C10.5096 20.2668 11.4891 20.2668 12.3404 19.8689C15.9921 18.162 18.3327 13.716 18.3327 9.62565C18.3327 5.50302 15.0494 1.83398 10.9993 1.83398ZM10.9993 11.0007C12.0119 11.0007 12.8327 10.1798 12.8327 9.16732C12.8327 8.1548 12.0119 7.33398 10.9993 7.33398C9.98683 7.33398 9.16602 8.1548 9.16602 9.16732C9.16602 10.1798 9.98683 11.0007 10.9993 11.0007Z"
                        fill="#323539"
                      />
                    </svg>
                  </div>
                </div>
                <div className="col-4">
                  <p style={{ color: "#68727D" }}>ID Type</p>
                  <p style={{ color: "#323539", fontWeight: "600" }}>
                    Jamescordvan@gmail.com
                  </p>
                </div>
                <div className="col-4">
                  <p style={{ color: "#68727D" }}>ID Number</p>
                  <p style={{ color: "#323539", fontWeight: "600" }}>
                    78909003939
                  </p>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "20px 20px 10px 20px",
              }}
            >
              <p style={{ fontWeight: "700", fontSize: "16px" }}>
                Company Details
              </p>
              <div
                style={{ display: "flex", flexDirection: "row" }}
                className="col-12"
              >
                <div className="col-4">
                  <p style={{ color: "#68727D" }}>Company Name</p>
                  <p style={{ color: "#323539", fontWeight: "600" }}>James</p>
                </div>
                <div className="col-4">
                  <p style={{ color: "#68727D" }}>Company Address</p>
                  <div style={{ display: "flex", gap: "40px" }}>
                    <p style={{ color: "#323539", fontWeight: "600" }}>
                      Marina Crescent
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.9993 1.83398C6.94926 1.83398 3.66602 5.50302 3.66602 9.62565C3.66602 13.716 6.00656 18.162 9.65833 19.8689C10.5096 20.2668 11.4891 20.2668 12.3404 19.8689C15.9921 18.162 18.3327 13.716 18.3327 9.62565C18.3327 5.50302 15.0494 1.83398 10.9993 1.83398ZM10.9993 11.0007C12.0119 11.0007 12.8327 10.1798 12.8327 9.16732C12.8327 8.1548 12.0119 7.33398 10.9993 7.33398C9.98683 7.33398 9.16602 8.1548 9.16602 9.16732C9.16602 10.1798 9.98683 11.0007 10.9993 11.0007Z"
                        fill="#323539"
                      />
                    </svg>
                  </div>
                </div>
                <div className="col-4">
                  <p style={{ color: "#68727D" }}>
                    Company Registration Number
                  </p>
                  <p style={{ color: "#323539", fontWeight: "600" }}>
                    78909003939
                  </p>
                </div>
              </div>
              <div
                style={{ display: "flex", flexDirection: "row" }}
                className="col-12"
              >
                <div className="col-4">
                  <p style={{ color: "#68727D" }}>Company Website</p>

                  <p style={{ color: "#323539", fontWeight: "600" }}>
                    www.mccruises.com
                  </p>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "20px 20px 10px 20px",
              }}
            >
              <p style={{ fontWeight: "700", fontSize: "16px" }}>
                Service Details
              </p>

              <div class="table-responsive">
                <table class="table card-table table-vcenter text-nowrap datatable">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Availablity</th>
                      <th>Capacity</th>
                      <th>Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colspan="5">
                        <div>
                          <div class="home_contents">
                            <p
                              style={{
                                fontWeight: "700",
                                fontSize: "16px",
                                color: "#68727D",
                              }}
                            >
                              No Service Details Found
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
