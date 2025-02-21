import "../../static/css/initial_contact.css";
import { Link } from "react-router-dom";
import VendorList from "./VendorList";
import { OnboardContext } from "../../Context/OnboardContext";
import { useContext } from "react";

function AddVendorDetails() {
  const { vendorId, isAllowProceed, setIsAllowProceed } =
    useContext(OnboardContext);
  console.log(vendorId);
  // useEffect(() => {
  //   setIsAllowProceed(true);
  // }, []);
  return (
    <>
      <div className="card col-11 add_details">
        <div className="card-body">
          <div className="tab-content home">
            <div className="tab-pane active show" id="tabs-home-7">
              <div>
                <div className="home_contents">
                  <span style={{ paddingBottom: "20px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="80"
                      height="80"
                      viewBox="0 0 80 80"
                      fill="none"
                    >
                      <path
                        d="M64.5061 25.3882L51.3101 13.5119C47.5506 10.1283 45.6708 8.43649 43.3644 7.55143L43.3337 16.6664C43.3337 24.5231 43.3337 28.4515 45.7744 30.8923C48.2152 33.333 52.1436 33.333 60.0003 33.333H71.934C70.7254 30.9856 68.5616 29.0382 64.5061 25.3882Z"
                        fill="#6E7070"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M46.667 73.3327H33.3337C20.7629 73.3327 14.4775 73.3327 10.5722 69.4274C6.66699 65.5222 6.66699 59.2368 6.66699 46.666V33.3327C6.66699 20.7619 6.66699 14.4765 10.5722 10.5713C14.4775 6.66602 20.796 6.66602 33.433 6.66602C35.453 6.66602 37.0716 6.66601 38.4337 6.72155C38.3889 6.98799 38.3654 7.25977 38.3644 7.53457L38.3336 16.9826C38.3334 20.6396 38.3331 23.8715 38.6833 26.4765C39.063 29.3003 39.9347 32.1236 42.2389 34.4278C44.5431 36.732 47.3664 37.6037 50.1902 37.9834C52.7952 38.3336 56.0271 38.3333 59.6842 38.3331L60.0003 38.333H73.1917C73.3337 40.1139 73.3337 42.2997 73.3337 45.209V46.666C73.3337 59.2368 73.3337 65.5222 69.4284 69.4274C65.5232 73.3327 59.2378 73.3327 46.667 73.3327ZM56.667 53.3327C58.5079 53.3327 60.0003 51.0941 60.0003 48.3327C60.0003 45.5713 58.5079 43.3327 56.667 43.3327C54.826 43.3327 53.3337 45.5713 53.3337 48.3327C53.3337 51.0941 54.826 53.3327 56.667 53.3327ZM27.9205 56.9462C28.6863 55.7974 30.2385 55.4869 31.3873 56.2528C36.6031 59.73 43.3981 59.73 48.6138 56.2528C49.7627 55.4869 51.3148 55.7974 52.0807 56.9462C52.8466 58.095 52.5362 59.6472 51.3873 60.4131C44.4921 65.0099 35.5091 65.0099 28.6138 60.4131C27.465 59.6472 27.1546 58.095 27.9205 56.9462ZM23.3337 53.3327C25.1746 53.3327 26.667 51.0941 26.667 48.3327C26.667 45.5713 25.1746 43.3327 23.3337 43.3327C21.4927 43.3327 20.0003 45.5713 20.0003 48.3327C20.0003 51.0941 21.4927 53.3327 23.3337 53.3327Z"
                        fill="#6E7070"
                      />
                    </svg>
                  </span>
                  <p style={{ fontWeight: "700", fontSize: "16px" }}>
                    No Details Found
                  </p>
                  <p style={{ fontSize: "14px", color: "#68727D" }}>
                    Add Lead Details to Proceed
                  </p>

                  <Link
                    className="btn add_details_button"
                    to={`/add-vendor-details/${vendorId}`}
                  >
                    Add Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <VendorList />
    </>
  );
}

export default AddVendorDetails;
