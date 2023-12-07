import React from "react";

const ListCards = ({
  firstLabel,
  firstIcon,
  firstCount,
  secondLabel,
  secondIcon,
  secondCount,
  thirdLabel,
  thirdIcon,
  thirdCount,
  fourthLabel,
  fourthIcon,
  fourthCount,
}) => {
  return (
    <div className="row row-cards">
      {/* <style>
       .span_border{
          borderRadius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.30);
          background: linear-gradient(135deg, #5C4AF2 0%, #988DF5 100%);
       }
      </style> */}

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
                  {firstIcon}
                </span>
              </div>
              <div className="col">
                <div className="font-weight-medium count_card_heading">
                  {firstLabel}
                </div>
                <div
                  className="text-secondary"
                  style={{ fontSize: "18px", fontWeight: "700" }}
                >
                  {firstCount}
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
                  className="bg-green text-white avatar"
                  style={{
                    borderRadius: "8px",
                    border: "1px solid rgba(255, 255, 255, 0.30)",
                    background:
                      "linear-gradient(135deg, #187AF7 0%, #559AF4 100%)",
                    width: "50px",
                    height: "50px",
                  }}
                >
                  {secondIcon}
                </span>
              </div>
              <div className="col">
                <div className="font-weight-medium count_card_heading">
                  {secondLabel}
                </div>
                <div
                  className="text-secondary"
                  style={{ fontSize: "18px", fontWeight: "700" }}
                >
                  {secondCount}
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
                  className="bg-twitter text-white avatar"
                  style={{
                    borderRadius: "8px",
                    border: "1px solid rgba(255, 255, 255, 0.30)",
                    background:
                      "linear-gradient(135deg, #13B370 0%, #3ACE90 100%)",
                    width: "50px",
                    height: "50px",
                  }}
                >
                  {thirdIcon}
                </span>
              </div>
              <div className="col">
                <div className="font-weight-medium count_card_heading">
                  {thirdLabel}
                </div>
                <div
                  className="text-secondary"
                  style={{ fontSize: "18px", fontWeight: "700" }}
                >
                  {thirdCount}
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
                  className="bg-facebook text-white avatar"
                  style={{
                    borderRadius: "8px",
                    border: "1px solid rgba(255, 255, 255, 0.30)",
                    background:
                      "linear-gradient(135deg, #DC5B32 0%, #FF8E6A 100%)",
                    width: "50px",
                    height: "50px",
                  }}
                >
                  {fourthIcon}
                </span>
              </div>
              <div className="col">
                <div className="font-weight-medium count_card_heading">
                  {fourthLabel}
                </div>
                <div
                  className="text-secondary"
                  style={{ fontSize: "18px", fontWeight: "700" }}
                >
                  {fourthCount}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCards;
