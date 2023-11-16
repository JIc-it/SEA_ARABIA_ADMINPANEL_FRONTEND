import { Offcanvas } from "react-bootstrap";
import DropZone from "../Common/DropZone";
// import { useState } from "react";
import Select from "react-select";

function AddServiceModal({ show, close }) {
  //   const [destinationValues, setDestinationValues] = useState([
  //     { name: "", delete: false },
  //   ]);

  //   let addFormFields = () => {
  //     const newDestinationValues = [
  //       ...destinationValues,
  //       { name: "", email: "", delete: false },
  //     ];
  //     if (destinationValues.length > 0) {
  //       const lastItemIndex = destinationValues.length - 1;
  //       newDestinationValues[lastItemIndex].delete = true;
  //     }
  //     setDestinationValues(newDestinationValues);
  //   };

  //   let removeFormFields = (index) => {
  //     let newFormValues = [...destinationValues];
  //     console.log(newFormValues, index);
  //     newFormValues.splice(index, 1);
  //     setDestinationValues(newFormValues);
  //   };

  const options = [
    { value: "Al Ahmadi", label: "Al Ahmadi" },
    { value: "Hawalli", label: "Hawalli" },
    { value: "Al Jahra", label: "Al Jahra" },
    { value: "Al Manqaf", label: "Al Manqaf" },
  ];
  const MyComponent = () => (
    <Select
      options={options}
      isMulti
      className="basic-multi-select"
      classNamePrefix="select"
    />
  );
  return (
    <Offcanvas
      show={show}
      onHide={close}
      placement="end"
      style={{ overflow: "auto" }}
    >
      <Offcanvas.Header
        closeButton
        style={{ border: "0px", paddingBottom: "0px" }}
      >
        <Offcanvas.Title>Add Service </Offcanvas.Title>
      </Offcanvas.Header>
      <form action="">
        <div style={{ margin: "20px" }}>
          <label
            htmlFor=""
            style={{ paddingBottom: "10px", fontWeight: "500" }}
          >
            Type
          </label>
          <select name="" id="" className="form-select">
            <option value="Boat">Boat</option>
            <option value="Yatch">Yatch</option>
            <option value="Cruise">Cruise</option>
            <option value="Heli Tour">Heli Tour</option>
            <option value="Jet Ski">Jet Ski</option>
          </select>
        </div>
        <div style={{ margin: "20px" }}>
          <label
            htmlFor=""
            style={{ paddingBottom: "10px", fontWeight: "500" }}
          >
            Specify (Others)
          </label>
          <input type="text" className="form-control" placeholder="Others" />
        </div>
        <div style={{ margin: "20px" }}>
          <DropZone />
        </div>
        <div style={{ margin: "20px" }}>
          <label
            htmlFor=""
            style={{ paddingBottom: "10px", fontWeight: "500" }}
          >
            Name
          </label>
          <input type="text" className="form-control" placeholder="Name" />
        </div>
        <div style={{ margin: "20px" }}>
          <label
            htmlFor=""
            style={{ paddingBottom: "10px", fontWeight: "500" }}
          >
            Description
          </label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="5"
            placeholder="Description"
            className="form-control"
          ></textarea>
        </div>
        <div style={{ margin: "20px" }}>
          <label
            htmlFor=""
            style={{ paddingBottom: "10px", fontWeight: "500" }}
          >
            Pickup Point
          </label>
          <input
            type="text"
            name=""
            id=""
            className="form-control"
            placeholder="Pickup Point"
          />
        </div>
        <div style={{ margin: "20px" }}>
          <label
            htmlFor=""
            style={{ paddingBottom: "10px", fontWeight: "500" }}
          >
            Capacity
          </label>
          <input
            type="text"
            name=""
            id=""
            className="form-control"
            placeholder="Capacity"
          />
        </div>
        <div style={{ margin: "20px" }}>
          <label
            htmlFor=""
            style={{ paddingBottom: "10px", fontWeight: "500" }}
          >
            Quantity
          </label>
          <input
            type="text"
            name=""
            id=""
            className="form-control"
            placeholder="Quantity"
          />
        </div>

        <div style={{ margin: "20px" }}>
          <label
            htmlFor=""
            style={{ paddingBottom: "10px", fontWeight: "500" }}
          >
            Destinations
          </label>
          {/* {destinationValues.map((element, index) => ( */}
          <div>
            {/* <input type="text" name="" id="" className="form-control" />
              <button
                className="btn"
                style={
                  element.delete
                    ? { backgroundColor: "#FD6839", width: "70px" }
                    : { backgroundColor: "#187AF7", color: "white" }
                }
                type="button"
                onClick={() =>
                  element.delete ? removeFormFields(index) : addFormFields()
                }
              >
                {element.delete ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.1674 4H2.83398"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M13.0564 5.66602L12.7498 10.2654C12.6318 12.0354 12.5728 12.9203 11.9961 13.4598C11.4195 13.9993 10.5325 13.9993 8.75866 13.9993H8.24308C6.46921 13.9993 5.58228 13.9993 5.00561 13.4598C4.42893 12.9203 4.36994 12.0354 4.25194 10.2654L3.94531 5.66602"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M4.83398 4C4.87124 4 4.88986 4 4.90675 3.99957C5.45571 3.98566 5.94 3.63661 6.1268 3.12021C6.13254 3.10433 6.13843 3.08666 6.15021 3.05132L6.21494 2.85714C6.27019 2.69139 6.29782 2.6085 6.33446 2.53813C6.48066 2.25738 6.75115 2.06242 7.06372 2.01251C7.14207 2 7.22943 2 7.40416 2H9.59714C9.77187 2 9.85923 2 9.93758 2.01251C10.2502 2.06242 10.5206 2.25738 10.6668 2.53813C10.7035 2.6085 10.7311 2.69138 10.7864 2.85714L10.8511 3.05132C10.8629 3.08661 10.8688 3.10434 10.8745 3.12021C11.0613 3.63661 11.5456 3.98566 12.0946 3.99957C12.1114 4 12.1301 4 12.1673 4"
                      stroke="white"
                      strokeWidth="1.5"
                    />
                  </svg>
                ) : (
                  "Add"
                )}
              </button> */}

            <MyComponent />
          </div>
          {/* // ))} */}
        </div>
        <div style={{ margin: "20px" }}>
          <h3>Policy</h3>
          <label
            htmlFor=""
            style={{ paddingBottom: "10px", fontWeight: "500" }}
          >
            Privacy Policy
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Privacy Policy"
          />

          <div></div>
        </div>

        <div style={{ margin: "20px" }}>
          <label
            htmlFor=""
            style={{ paddingBottom: "10px", fontWeight: "500" }}
          >
            Return Policy
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Return Policy"
          />

          <div></div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "150px",
            justifyContent: "center",
            alignItems: "end",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "10px",
              marginLeft: "13px",
              marginRight: "10px",
              width: "100%",
              padding: "5px",
            }}
          >
            <button
              className="btn btn-success"
              style={{
                flex: 1,
                margin: "0 5px",
                width: "calc(50% - 5px)",
                backgroundColor: "#006875",
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </form>
    </Offcanvas>
  );
}

export default AddServiceModal;
