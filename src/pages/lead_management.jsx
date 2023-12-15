import "../static/css/lead_management.css";
import SideBar from "../components/Common/SideBar";
import HeaderTiles from "../components/Common/HeaderTiles";
import Table from "../components/LeadManagementTable";
import Footer from "../components/Common/Footer";

function LeadManagement() {
  return (
    <div>
      {/* <script src="./dist/js/demo-theme.min.js"></script> */}
      <div className="page" style={{ height: "100vh" }}>
        {/* Sidebar  */}
        {/* <SideBar /> */}
        {/* <!-- Navbar --> */}
        {/* <Header /> */}
        <div className="page-wrapper">
          <div className="page-body vendor-management-container-main">
            <div className="container-xl">
              <div className="row row-deck row-cards">
                <div className="col-12">
                  <HeaderTiles />
                </div>

                <Table />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default LeadManagement;
