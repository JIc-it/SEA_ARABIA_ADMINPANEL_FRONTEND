import { Offcanvas } from "react-bootstrap";
import DropZone from "../Common/DropZone";

export default function AddNegotationsModal({ show, close }) {
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
        <Offcanvas.Title>Add Negotation </Offcanvas.Title>
      </Offcanvas.Header>
      <form action="">
        <div style={{ margin: "20px" }}>
          <label
            htmlFor=""
            style={{ paddingBottom: "10px", fontWeight: "500" }}
          >
            Title
          </label>
          <input type="text" placeholder="Title" className="form-control" />
        </div>
        <div style={{ margin: "20px" }}>
          <DropZone />
        </div>
        <div style={{ margin: "20px" }}>
          <label
            htmlFor=""
            style={{ paddingBottom: "10px", fontWeight: "500" }}
          >
            Notes
          </label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="5"
            placeholder="Notes"
            className="form-control"
          ></textarea>
        </div>
        <div style={{ margin: "20px" }}>
          <label
            htmlFor=""
            style={{ paddingBottom: "10px", fontWeight: "500" }}
          >
            Date
          </label>
          <input type="date" name="" id="" className="form-control" />
        </div>
        <div style={{ margin: "20px" }}>
          <label
            htmlFor=""
            style={{ paddingBottom: "10px", fontWeight: "500" }}
          >
            Time
          </label>
          <input type="time" name="" id="" className="form-control" />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "282px",
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
              Add
            </button>
          </div>
        </div>
      </form>
    </Offcanvas>
  );
}
