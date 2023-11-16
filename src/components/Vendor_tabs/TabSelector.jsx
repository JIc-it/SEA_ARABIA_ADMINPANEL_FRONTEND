import React from "react";

export const TabSelector = ({ isActive, children, onClick }) => (
  <li className="nav-item">
    <button
      className="nav-link details_tab active_tab"
      style={
        isActive
          ? { borderBottom: "2px solid rgb(0, 104, 117)" }
          : { borderBottom: "none" }
      }
      onClick={onClick}
    >
      {children}
    </button>
  </li>
);
