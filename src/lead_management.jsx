import "./static/css/lead_management.css";
import SideBar from "./components/Common/SideBar";
import HeaderTiles from "./components/Common/HeaderTiles";
import Table from "./components/LeadManagementTable";
import Footer from "./components/Common/Footer";

function LeadManagement() {
  return (
    <div>
      <script src="./dist/js/demo-theme.min.js"></script>
      <div className="page" style={{ height: "100vh" }}>
        {/* Sidebar  */}
        <SideBar />
        {/* <!-- Navbar --> */}
        {/* <Header /> */}
        <div className="page-wrapper">
          <div className="page-body">
            <div className="container-xl">
              <div className="row row-deck row-cards">
                <div className="col-12">
                  <HeaderTiles />
                </div>

                {/* <div className="col-lg-12">
                  <div className="row">
                    <div className="col-6 col-sm-4 col-md-2 col-xl py-3">
                      <a href="#" className="btn btn btn-info active w-100">
                        All Leads
                      </a>
                    </div>
                    <div className="col-6 col-sm-4 col-md-2 col-xl py-3">
                      <a href="#" className="btn btn btn-info w-100">
                        {" "}
                        Vendors{" "}
                      </a>
                    </div>
                    <div className="col-6 col-sm-4 col-md-2 col-xl py-3">
                      <a href="#" className="btn btn btn-info w-100">
                        {" "}
                        Customers{" "}
                      </a>
                    </div>
                  </div>
                </div> */}

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
