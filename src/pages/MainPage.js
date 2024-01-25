import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import SideBar from "../components/Common/SideBar";
import AllRouting from "../components/Routing";
import { MainPageContext } from "../Context/MainPageContext";
import { jwtDecode } from "jwt-decode";
import { getUserPermissionData } from "../services/userVendorsServices";

const MainPage = () => {
  const [userPermissionList, setUserPermissionList] = useState();

  const accessToken = localStorage.getItem("access_token");
  console.log(accessToken, "accessToken");
  const userId = jwtDecode(accessToken)?.user_id;

  useEffect(() => {
    getUserPermissionData(userId)
      .then((data) => {
        setUserPermissionList(data.permission);
      })
      .catch((error) => {
        console.log("error in get user permission list");
      });
  }, [userId]);

  return (
    <div>
      <MainPageContext.Provider value={{ userPermissionList }}>
        <Header />
        <SideBar />
        <AllRouting />
      </MainPageContext.Provider>
    </div>
  );
};

export default MainPage;
