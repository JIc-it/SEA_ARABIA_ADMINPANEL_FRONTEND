import React, { useEffect, useState } from "react";
import {
  getUserPermissionData,
  updateUserPermissionData,
} from "../../services/userVendorsServices";
import { useParams } from "react-router";
import WithPermission from "../HigherOrderComponents/PermissionCheck/WithPermission";
import { toast } from "react-toastify";
import CommonButtonForPermission from "../HigherOrderComponents/CommonButtonForPermission";

const AddPermissions = () => {
  const [allPermissions, setAllPermissions] = useState(false); // State to handle "Give All Permissions" checkbox
  const [updatedPermissions, setUpdatedPermissions] = useState();

  const params = useParams();
  const userId = params?.id;
  const userName = params?.userName;

  useEffect(() => {
    getUserPermissionData(userId)
      .then((data) => {
        data && setUpdatedPermissions(data.permission);
        const areAllPermissionsTrue =
          data.permission &&
          data.permission.length > 0 &&
          data.permission.every((elem) =>
            elem.permissionCategory.every((item) => item.value)
          );

        setAllPermissions(areAllPermissionsTrue);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [userId]);

  const handleAllPermissionsChange = () => {
    // Toggle the "Give All Permissions" checkbox state
    setAllPermissions(!allPermissions);

    // Update the state for all permissions based on the "Give All Permissions" checkbox
    const updatedPermissionsCopy = updatedPermissions.map((elem) => {
      return {
        ...elem,
        permissionCategory: elem.permissionCategory.map((item) => ({
          ...item,
          value: !allPermissions,
        })),
      };
    });

    setUpdatedPermissions(updatedPermissionsCopy);
  };

  const handlePermissionChange = (categoryIndex, itemIndex) => {
    // Update the state based on the checkbox change for a specific permission item
    const updatedPermissionsCopy = [...updatedPermissions];
    updatedPermissionsCopy[categoryIndex].permissionCategory[itemIndex].value =
      !updatedPermissionsCopy[categoryIndex].permissionCategory[itemIndex]
        .value;

    // Update the state with the modified permissions
    setUpdatedPermissions(updatedPermissionsCopy);
  };

  const handleUpdatePermission = () => {
    updateUserPermissionData(userId, updatedPermissions)
      .then((data) => {
        toast.success("Permission Updated Successfully.");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const UpdateUserButton = WithPermission(
    CommonButtonForPermission,
    "Edit",
    "5",
    handleUpdatePermission,
    "btn btn-sm btn-info px-4 py-1",
    "Update Permission"
  );

  return (
    <div>
      <div className="page" style={{ minHeight: "100vh" }}>
        <div className="page-wrapper">
          <div className="breadcrumbs mx-4 mt-4">
            <p>Permissions</p>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M8.33301 5L12.7438 9.41074C13.0692 9.73618 13.0692 10.2638 12.7438 10.5893L8.33301 15"
                  stroke="#68727D"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </span>
            <p>{userName}</p>
          </div>
          <div className="page-body ">
            <div className="container-xl">
              <div className="row row-deck row-cards">
                <div className="col-12">
                  <div className="card" style={{ padding: "1rem" }}>
                    <label htmlFor="" style={{ fontWeight: "500" }}>
                      Permissions
                    </label>

                    <div
                      className="update-button d-flex
                   "
                    >
                      <div className="my-2" style={{ flex: 1 }}>
                        <input
                          style={{ width: "15px", height: "15px" }}
                          className="me-2"
                          type="checkbox"
                          checked={allPermissions}
                          onChange={handleAllPermissionsChange}
                          name="checkbox-is_Permissions-active"
                          id="checkbox-is_Permissions-active"
                        />
                        Give All Permissions
                      </div>
                      <div className="">
                        <UpdateUserButton />
                      </div>
                    </div>
                    <div className="row">
                      {updatedPermissions &&
                        updatedPermissions.length > 0 &&
                        updatedPermissions.map((elem, categoryIndex) => {
                          return (
                            <div className="col-md-6 col-lg-4 p-2 ">
                              <div className="permission-card pb-3">
                                <h4 className="title">{elem.title}</h4>
                                <div className="permission-button">
                                  <div className="container-fluid">
                                    <div className="row">
                                      {elem.permissionCategory &&
                                        elem.permissionCategory.length > 0 &&
                                        elem.permissionCategory.map(
                                          (item, itemIndex) => {
                                            return (
                                              <div
                                                className="col-md-6  py-1 "
                                                style={{
                                                  display: "grid",
                                                  gridTemplateColumns:
                                                    "0.5fr 1fr",
                                                }}
                                                key={itemIndex}
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
                                                    onChange={() =>
                                                      handlePermissionChange(
                                                        categoryIndex,
                                                        itemIndex
                                                      )
                                                    }
                                                    name={`checkbox-${categoryIndex}-${itemIndex}`}
                                                    id={`checkbox-${categoryIndex}-${itemIndex}`}
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
