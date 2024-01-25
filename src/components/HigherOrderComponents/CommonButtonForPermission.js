import React from "react";

const CommonButtonForPermission = ({
  hasPermission,
  onClick,
  className,
  label,
  style,
  icon,
}) => {

  return (
    <>
      {hasPermission && (
        <button className={className} onClick={onClick} style={style}>
          {label}
          {icon && <span style={{ marginRight: "5px" }}>{icon}</span>}
        </button>
      )}
    </>
  );
};

export default CommonButtonForPermission;
