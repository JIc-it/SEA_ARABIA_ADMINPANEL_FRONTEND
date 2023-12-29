import React from "react";
import { useParams } from "react-router";

const InviVitualBookingView = () => {
  const params = useParams();
  const bookingID = params.id;
  return (
    <div>
      <div className="page-wrapper">
        <div className="page-body">
          <div className="container-xl">InviVitualBookingView {bookingID}</div>
        </div>
      </div>
    </div>
  );
};

export default InviVitualBookingView;
