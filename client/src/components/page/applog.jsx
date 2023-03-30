import { useEffect, useState } from "react";
import moment from "moment";
import Pagination from "../table/pagination";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Applog() {
  const [logData, setLogData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(7);
  const [date , setDate] = useState([]);

  // paginations variable
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  let currentPosts = logData.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const MySwal = withReactContent(Swal);



  // Clear Log   
  const clearLog = async () => {
    let arrayID = [];
    let message = ""
    let count = 0;
     logData.forEach(d => {
      if (d.select) {
        arrayID.push(d.id);
      }
    })
    if (arrayID.length === 1) {
        message = 'This data will be permanently deleted'
    } else if (arrayID.length >= 2) {
      await fetch(`http://localhost:5000/products/multiple/detail/${arrayID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          message = `These ${logData.length} data will be permanently deleted`
        });
    }else if (arrayID.length < 1) {
      count = 1;
      message = 'Please select the data to be deleted!!'
    }

    if (count === 1) {
      MySwal.fire({
        text: `${message}`,
        icon: "warning",
        confirmButtonColor: "#d33",
        cancelButtonColor: "",
      })
    }else{
      MySwal.fire({
        title: "Are you sure?",
        text: `${message}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonColor: "",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`http://localhost:5000/applog/deleted/${arrayID}`, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              if (result.status === true) {
                window.location.reload();
              }
            });
        }
      });
    }
  }

  // get data
  useEffect(async () => {
    await fetch("http://localhost:5000/applog", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLogData(data);
      });
  }, []);
  return (
    <div>
      {/* Content Header (Page header) */}
      <div class="content-wrapper barang">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>App Log</h1>
                <p>User activity history</p>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">App Log</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content mb-4">
          {/* Default box */}
          <div className="card">
            {/* /.card-header */}
            {/* btn clear log */}
            <div className="card-body">
              {/* seacrh and button section */}
              <div style={{ paddingBottom: "-39%", marginBottom: "-2%" }}>
              <input
                type="date"
                className="form-control mb-4"
                placeholder="Search..."
                onChange={(e) => setDate(e.target.value)}
                aria-describedby="basic-addon1"
                style={{ width: "20%" }}
              />
                <button
                  className={"btn btn-danger  mb-4"}
                  style={{
                    // width: '20%',
                    marginLeft: "21%",
                    marginTop: "-90px",
                  }}
                  onClick={() => {
                    clearLog()
                  }}
                  id="deleted-product"
                >
                  {" "}
                  <i class="fa fa-trash " aria-hidden="true"></i>
                </button>
                </div>
              <table
                id="products"
                className="table table-bordered table-striped mb-3"
              >
                <thead>
                  <tr
                    style={
                      {
                          textAlign: "center",
                      }
                    }
                  >
                   <th>
                      <input
                        class="form-check-input check"
                        style={{ marginLeft: "-8px", marginTop: "-15px" }}
                        type="checkbox"
                        onClick={(e) => {
                          let value = e.target.checked;
                          setLogData(
                            logData.map((d) => {
                              d.select = value;
                              return d;
                            })
                          );
                        }}
                        id="deleted"
                      />
                    </th>
                    <th>Date</th>
                    <th>User</th>
                    <th>URL</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {logData.length < 1 ? (
                    <tr
                      style={{
                        // textAlign: "center",
                        textTransform: "capitalize",
                      }}
                    >
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>Data Not Found</td>
                      <td></td>
                    </tr>
                  ) : (
                    currentPosts.filter((log) =>
                    log.date.includes(date)
                      ).map((log) => {
                      return (
                        <tr
                          style={{
                            textAlign: "center",
                            textTransform: "capitalize",
                          }}
                        >
                                                     <td>
                              <input
                                class="form-check-input"
                                style={{ marginLeft: "-8px" }}
                                type="checkbox"
                                checked={log.select}
                                onChange={(e) => {
                                  let value = e.target.checked;
                                  setLogData(
                                    logData.map((d) => {
                                      if (d.id === log.id) {
                                        d.select = value;
                                      }
                                      return d;
                                    })
                                  );
                                }}
                                id="deleted"
                              />
                            </td>
                          <td>{moment(log.date).format("DD/MM/YYYY")}</td>
                          <td>{log.user}</td>
                          <td>
                            {log.method} | {log.url} 
                          </td>
                          {log.status_code == 200 ? (
                            <td className="text-success">
                              {log.status_code} (OK)
                            </td>
                          ) : (
                            <td className="text-danger">
                              {log.status_code} (ERR)
                            </td>
                          )}
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
              {/* pagination */}
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={logData.length}
                paginate={paginate}
              />
            </div>
            {/* /.card-body */}
          </div>
          {/* /.card */}
        </section>
        {/* /.content */}
      </div>
    </div>
  );
}
