import { Offcanvas } from "react-bootstrap";

function PermissionView({ show, close }) {

    const offcanvasStyle = {
        width: "365px",
        height: "5%",
        display: "flex",
        marginLeft: 5,
        marginTop: 1,
        flexDirection: "column",
      };
      
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
        <Offcanvas.Title>Permission View </Offcanvas.Title>
      </Offcanvas.Header>
     <div style={offcanvasStyle}></div>
        {/* table */}
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Sections</th>
              <th scope="col">Perm 1</th>
              <th scope="col">Perm 2</th>
              <th scope="col">Perm 3</th>
              <th scope="col">Perm 4</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Section 1</th>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  {/* <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/> */}
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault1"
                  />
                </div>
              </td>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault2"
                  />
                </div>
              </td>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault3"
                  />
                </div>
              </td>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault4"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Section 2</th>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault5"
                  />
                </div>
              </td>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault6"
                  />
                </div>
              </td>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault7"
                  />
                </div>
              </td>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault8"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Section 3</th>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault9"
                  />
                </div>
              </td>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault10"
                  />
                </div>
              </td>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault11"
                  />
                </div>
              </td>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault12"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Section 4</th>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault13"
                  />
                </div>
              </td>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault14"
                  />
                </div>
              </td>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault15"
                  />
                </div>
              </td>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault16"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Section 5</th>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault17"
                  />
                </div>
              </td>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault18"
                  />
                </div>
              </td>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault19"
                  />
                </div>
              </td>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault20"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Section 6</th>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault21"
                  />
                </div>
              </td>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault22"
                  />
                </div>
              </td>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault23"
                  />
                </div>
              </td>
              <td>
                {" "}
                <div class="custom-control custom-checkbox">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault24"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
    </Offcanvas>
  );
}

export default PermissionView;
