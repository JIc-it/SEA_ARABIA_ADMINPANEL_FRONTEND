import React from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import App from "./App"; // Replace with the path to your main application component

const index = () => {
  return (
    <ProSidebarProvider>
      <App />
    </ProSidebarProvider>
  );
};

export default index;
