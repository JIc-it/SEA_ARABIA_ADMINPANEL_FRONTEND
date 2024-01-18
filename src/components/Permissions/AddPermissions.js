import React from "react";
import { permissions } from "./PermissionConstants";

const AddPermissions = () => {
  return (
    <div>
      <div className="page" style={{ minHeight: "100vh" }}>
        <div className="page-wrapper">
          <div className="page-body ">
            <div className="container-xl">
              <div className="row row-deck row-cards">
                <div className="col-12">
                  <div className="card" style={{ padding: "1rem" }}>
                    <div className="role-fields">
                      <div>
                        <label htmlFor="" style={{ fontWeight: "500" }}>
                          Role <span style={{ color: "red" }}>*</span>
                        </label>
                        <select
                          type="text"
                          className="form-select mb-3 status_selector"
                          name="idType"
                        >
                          <option value="" disabled>
                            Select Role
                          </option>
                          <option>Option 1</option>
                          <option>Option 1</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="" style={{ fontWeight: "500" }}>
                          Users <span style={{ color: "red" }}>*</span>
                        </label>
                        <select
                          type="text"
                          className="form-select mb-3 status_selector"
                          name="idType"
                        >
                          <option value="" disabled>
                            Select User
                          </option>
                          <option>Option 1</option>
                          <option>Option 1</option>
                        </select>
                      </div>
                    </div>
                    <hr />
                    <label htmlFor="" style={{ fontWeight: "500" }}>
                      Permissions <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="my-2">
                      <input
                        style={{ width: "15px", height: "15px" }}
                        type="checkbox"
                        checked={true}
                        name="checkbox-is_active"
                        id="checkbox-is_active"
                      />
                      Give All Permissions
                    </div>
                    <div className="row">
                      {permissions &&
                        permissions.length > 0 &&
                        permissions.map((elem, index) => {
                          return (
                            <div className="col-md-4 p-2 ">
                              <div className="permission-card pb-3">
                                <h4 className="title">{elem.title}</h4>
                                <div className="permission-button">
                                  <div className="container-fluid">
                                    <div className="row">
                                      {elem.permissionCategory &&
                                        elem.permissionCategory.length > 0 &&
                                        elem.permissionCategory.map(
                                          (item, i) => {
                                            return (
                                              <div
                                                className="col-md-6  py-1 "
                                                style={{
                                                  display: "grid",
                                                  gridTemplateColumns:
                                                    "0.5fr 1fr",
                                                }}
                                              >
                                                <label
                                                  className="switch  m-1 d-flex "
                                                  style={{
                                                    width: "50px",
                                                    height: "22px",
                                                  }}
                                                >
                                                  <input
                                                    type="checkbox"
                                                    checked={item.value}
                                                    name="checkbox-is_active"
                                                    id="checkbox-is_active"
                                                  />
                                                  <span className="slider round"></span>
                                                </label>
                                                <div className="">
                                                  {item.item}
                                                </div>
                                              </div>
                                            );
                                          }
                                        )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                    <div className="update-button text-end my-3">
                      <button className="btn btn-sm btn-info px-4 py-1">
                        Update Permission
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPermissions;
