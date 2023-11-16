import { TabPanel, useTabs } from "react-headless-tabs";
import { TabSelector } from "./TabSelector";
import SiteVisit from "./SiteVisit";
import Notes from "./Notes";
import LeadDetails from "./leads";
import Proposal from "./Proposal";
import Negotations from "./Negotations";
import MOU from "./MOU";
import { useSelector } from "react-redux";

export function Basic() {
  const [selectedTab, setSelectedTab] = useTabs([
    "others",
    "leads",
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
                <li className="nav-item">
                  <TabSelector
                    isActive={selectedTab === "others"}
                    onClick={() => setSelectedTab("others")}
                  >
                    Others
                  </TabSelector>
                </li>

                {count >= 2 && (
                  <li className="nav-item">
                    <TabSelector
                      isActive={selectedTab === "leads"}
                      onClick={() => setSelectedTab("leads")}
                    >
                      Leads
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
              </ul>
            </div>
            <div className="card-body">
              <TabPanel hidden={selectedTab !== "site visit"}>
                <SiteVisit />
              </TabPanel>

              <TabPanel hidden={selectedTab !== "leads"}>
                <LeadDetails />
              </TabPanel>

              <TabPanel hidden={selectedTab !== "proposals"}>
                <Proposal />
              </TabPanel>
              <TabPanel hidden={selectedTab !== "negotations"}>
                <Negotations />
              </TabPanel>
              <TabPanel hidden={selectedTab !== "mou/charter"}>
                <MOU />
              </TabPanel>
              <TabPanel hidden={selectedTab !== "others"}>
                <Notes />
              </TabPanel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
