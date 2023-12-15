import { TabPanel, useTabs } from "react-headless-tabs";
import { TabSelector } from "./TabSelector";
import SiteVisit from "./SiteVisit";
import Notes from "./Miscellaneous/MiscellaneousList";
import LeadDetails from "./VenderDetailsEdit/leads";
import Proposal from "./Proposal";
import Negotations from "./Negotations";
import MOU from "./MOU";
import { useSelector } from "react-redux";
import MiscellaneousList from "./Miscellaneous/MiscellaneousList";

export function Basic({  sitevistview, proposal, negotiations, mou }) {
  const [selectedTab, setSelectedTab] = useTabs([
    "Miscellaneous",
    "Vendor Details",
    "site visit",
    "proposals",
    "negotations",
    "mou/charter",
  ]);
  const count = useSelector((state) => state.counter.value);
  return (
    <div style={{ width: "1060px" }}>
      <div className="vendor_listing">
        <div className="col-md-12">
          <div className="card" style={{ borderRadius: "10px", border: "0px" }}>
            <div className="card-header">
              <ul
                className="nav card-header-tabs "
                data-bs-toggle="tabs"
                style={{ borderRadius: "10px" }}
              >
                {count >= 2 && (
                  <li className="nav-item">
                    <TabSelector
                      isActive={selectedTab === "Vendor Details"}
                      onClick={() => setSelectedTab("Vendor Details")}
                    >
                      Vendor Details
                    </TabSelector>
                  </li>
                )}

                {count >= 3 && (
                  <li className="nav-item">
                    <TabSelector
                      isActive={selectedTab === "site visit"}
                      onClick={() => setSelectedTab("site visit")}
                    >
                      Site Visit
                    </TabSelector>
                  </li>
                )}

                {count >= 4 && (
                  <li className="nav-item">
                    <TabSelector
                      isActive={selectedTab === "proposals"}
                      onClick={() => setSelectedTab("proposals")}
                    >
                      Proposals
                    </TabSelector>
                  </li>
                )}

                {count >= 5 && (
                  <li className="nav-item">
                    <TabSelector
                      isActive={selectedTab === "negotations"}
                      onClick={() => setSelectedTab("negotations")}
                    >
                      Negotations
                    </TabSelector>
                  </li>
                )}

                {count >= 6 && (
                  <li className="nav-item">
                    <TabSelector
                      isActive={selectedTab === "mou/charter"}
                      onClick={() => setSelectedTab("mou/charter")}
                    >
                      MOU / Charter
                    </TabSelector>
                  </li>
                )}
                <li className="nav-item">
                  <TabSelector
                    isActive={selectedTab === "Miscellaneous"}
                    onClick={() => setSelectedTab("Miscellaneous")}
                  >
                    Miscellaneous
                  </TabSelector>
                </li>
              </ul>
            </div>
            <div className="card-body">
              <TabPanel hidden={selectedTab !== "site visit"}>
                <SiteVisit sitevistview={sitevistview} />
              </TabPanel>

              <TabPanel hidden={selectedTab !== "Vendor Details"}>
                <LeadDetails  />
              </TabPanel>

              <TabPanel hidden={selectedTab !== "proposals"}>
                <Proposal proposal={proposal} />
              </TabPanel>
              <TabPanel hidden={selectedTab !== "negotations"}>
                <Negotations negotiations={negotiations} />
              </TabPanel>
              <TabPanel hidden={selectedTab !== "mou/charter"}>
                <MOU mou={mou} />
              </TabPanel>
              <TabPanel hidden={selectedTab !== "Miscellaneous"}>
                <MiscellaneousList />
              </TabPanel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
