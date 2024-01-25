import React, { useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { getUserPermissionData } from "../../../services/userVendorsServices";
import { MainPageContext } from "../../../Context/MainPageContext";
import { getMenuPermissions } from "../../../helpers";

export const WithPermission = (
  WrappedComponent,
  checkingPermission,
  menuId,
  onClick,
  className,
  label,
  style,
  icon
) => {
  const { userPermissionList } = useContext(MainPageContext);
  class WithPermission extends React.Component {
    state = {
      hasPermission: false,
    };

    componentDidMount() {
      if (userPermissionList) {
        let selectedMenuPermission = getMenuPermissions(
          userPermissionList,
          menuId,
          checkingPermission
        );

        if (selectedMenuPermission) {
          this.setState({ hasPermission: true });
        } else {
          this.setState({ hasPermission: false });
        }
      } else {
        console.log("testtt");
      }
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          hasPermission={this.state.hasPermission}
          onClick={onClick}
          className={className}
          label={label}
          style={style}
          icon={icon}
        />
      );
    }
  }

  return WithPermission;
};

export default WithPermission;
