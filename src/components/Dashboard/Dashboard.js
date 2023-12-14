import React from 'react'
import totalUser from "../../static/img/total-user.png"
import activeUser from "../../static/img/active-user.png"
import activeVendar from "../../static/img/active-machine.png"
import visitor from "../../static/img/visitor.png"


const Dashboard = () => {
    return (
        <div className="page" style={{ height: "100vh", top: 20 }}>
            <div className='container'>
                <div className="row">
                    <div className="col-sm-6 col-lg-3">
                        <div className="card card-sm" style={{ borderRadius: "12px" }}>
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-auto">
                                        <span
                                            className="bg-primary text-white avatar"
                                            style={{
                                                borderRadius: "8px",
                                                width: "50px",
                                                height: "50px",
                                                background:
                                                    "linear-gradient(135deg, #5C4AF2 0%, #988DF5 100%)",
                                            }}
                                        >
                                            <img src={totalUser} />
                                        </span>
                                    </div>
                                    <div className="col">
                                        <div className="font-weight-medium count_card_heading">
                                            Total User
                                        </div>
                                        <div
                                            className="text-secondary"
                                            style={{ fontSize: "18px", fontWeight: "700" }}
                                        >
                                            469
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                        <div className="card card-sm" style={{ borderRadius: "12px" }}>
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-auto">
                                        <span
                                            style={{
                                                borderRadius: "8px",
                                                border: "1px solid rgba(255, 255, 255, 0.30)",
                                                width: "50px",
                                                height: "50px",
                                            }}
                                        >
                                            <img src={activeUser} />
                                        </span>
                                    </div>
                                    <div className="col">
                                        <div className="font-weight-medium count_card_heading">
                                            Active User
                                        </div>
                                        <div
                                            className="text-secondary"
                                            style={{ fontSize: "18px", fontWeight: "700" }}
                                        >
                                            123
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                        <div className="card card-sm" style={{ borderRadius: "12px" }}>
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-auto">
                                        <span

                                            style={{
                                                borderRadius: "8px",
                                                border: "1px solid rgba(255, 255, 255, 0.30)",
                                                width: "50px",
                                                height: "50px",
                                            }}
                                        >
                                            <img src={activeVendar} />
                                        </span>
                                    </div>
                                    <div className="col">
                                        <div className="font-weight-medium count_card_heading">
                                            Active Vendor
                                        </div>
                                        <div
                                            className="text-secondary"
                                            style={{ fontSize: "18px", fontWeight: "700" }}
                                        >
                                            326
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                        <div className="card card-sm" style={{ borderRadius: "12px" }}>
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-auto">
                                        <span
                                            style={{
                                                borderRadius: "8px",
                                                border: "1px solid rgba(255, 255, 255, 0.30)",
                                                width: "50px",
                                                height: "50px",
                                            }}
                                        >
                                            <img src={visitor} />
                                        </span>
                                    </div>
                                    <div className="col">
                                        <div className="font-weight-medium count_card_heading">
                                            Inactive Machines
                                        </div>
                                        <div
                                            className="text-secondary"
                                            style={{ fontSize: "18px", fontWeight: "700" }}
                                        >
                                            153
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p>Your download should start shortly. If it doesn't, please use the</p>
        </div>
    )
}

export default Dashboard