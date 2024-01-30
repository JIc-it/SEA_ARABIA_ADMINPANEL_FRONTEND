import "../static/css/lead_management.css";
import HeaderTiles from "../components/Common/HeaderTiles";
import Table from "../components/LeadManagementTable";
import Footer from "../components/Common/Footer";
import { useState } from "react";

function LeadManagement() {
  const [isRefetch, setIsRefetch] = useState(false);

  return (
    <div>
      <div className="page" style={{ height: "100vh" }}>     
        <div className="page-wrapper">
          <div className="page-body vendor-management-container-main">
            <div className="container-xl">
              <div className="row row-deck row-cards">
                <div className="col-12">
                  <HeaderTiles isRefetch={isRefetch} setIsRefetch={setIsRefetch} />
                </div>

                <Table isRefetch={isRefetch} setIsRefetch={setIsRefetch}/>
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
