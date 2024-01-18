import React from "react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";

export const WithPermission = (WrappedComponent) => {
  class WithPermission extends React.Component {
    state = {
      hasPermission: false,
    };

    componentDidMount() {
      const a = 10;
      if (a === 10) {
        this.setState({ hasPermission: true });
      } else {
        this.setState({ hasPermission: false });
        // toast.error("Permission Denied.");
      }
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          hasPermission={this.state.hasPermission}
        />
      );
    }
  }

  //   WithLoading.displayName = `withLoading(${
  //     WrappedComponent.displayName || WrappedComponent.name
  //   })`;

  return WithPermission;
};

export default WithPermission;
