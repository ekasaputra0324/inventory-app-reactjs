import React, { useState } from "react";
import { useEffect } from "react";
import moment from "moment/moment";
import Pagination from "../table/pagination";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
export default function Reports() {
  const [reports, setReports] = useState([]);
  const [id, setId] = useState([]);
  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(7);
  // pagination variable
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  let currentPosts = reports.slice(indexOfFirstPost, indexOfLastPost);
  const MySwal = withReactContent(Swal);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // GET DATA
  useEffect(() => {
    fetch("http://localhost:5000/reports", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setReports(data);
        console.log(reports);
      });
  }, []);

  const GetData = async () => {
    return await fetch("http://localhost:5000/reports", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };

  const MultipleDelete = async () => {
    let arrayID = [];
    let message = "";
    let count = 0;
    reports.forEach((d) => {
      if (d.select) {
        arrayID.push(d.id);
      }
    });

  if (arrayID.length === 1) {
      message = 'This data will be permanently deleted'
  } else if (arrayID.length >= 2) {
        message = `These ${reports.length} data will be permanently deleted`
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
        fetch(`http://localhost:5000/reports/delete/${arrayID}`, {
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
  };

  return (
    <div>
      {/* Content Header (Page header) */}
      <div class="content-wrapper barang">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Move History</h1>
                <p>Reports data move history</p>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Reports</li>
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
            <div className="card-body">
              <div style={{ paddingBottom: "-39%", marginBottom: "-2%" }}>
                <input
                  type="date"
                  className="form-control mb-4"
                  placeholder="Search..."
                  // onChange={(e) => SetQuery(e.target.value)}
                  aria-describedby="basic-addon1"
                  style={{ width: "20%" }}
                />
                <button
                  className={"btn btn-success  mb-4"}
                  id="export-excel-transaction"
                  style={{
                    // width: '20%',
                    marginLeft: "21%",
                    marginTop: "-90px",
                  }}
                >
                  {" "}
                  <i class="fa-solid fa-file-csv"></i>
                </button>
                <button
                  className={"btn btn-danger  mb-4"}
                  onClick={() => {
                    MultipleDelete();
                  }}
                  style={{
                    // width: '20%',
                    marginLeft: "1%",
                    marginTop: "-90px",
                  }}
                >
                  {" "}
                  <i class="fa fa-trash " aria-hidden="true"></i>
                </button>
              </div>
              <table id="" className="table table-bordered table-striped mb-3">
                <thead>
                  <tr
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <th>
                      {" "}
                      <input
                        class="form-check-input"
                        style={{ marginLeft: "-8px", marginTop: "-15px" }}
                        type="checkbox"
                        onClick={(e) => {
                          let value = e.target.checked;
                          setReports(
                            reports.map((d) => {
                              d.select = value;
                              return d;
                            })
                          );
                        }}
                        id="deleted"
                        />
                    </th>
                    <th>Date</th>
                    <th>Reference</th>
                    <th>Product</th>
                    <th>Serial Number</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Quantity</th>
                    <th>Done By</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.length < 1 ? (
                    <tr
                      style={{
                        textTransform: "capitalize",
                        textAlign: "center",
                      }}
                    >
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>Data not found</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  ) : (
                    currentPosts.map((report) => {
                      return (
                        <tr
                          style={{
                            textTransform: "capitalize",
                            textAlign: "center",
                          }}
                        >
                          <td>
                            <input
                              class="form-check-input" 
                              style={{ marginLeft: "-8px" }}
                              type="checkbox"
                              checked={report.select}
                              onChange={(e) => {
                                let value = e.target.checked;
                                setReports(
                                  reports.map((r) => {
                                    if (r.id === report.id) {
                                      r.select = value;
                                    }
                                    return r;
                                  })
                                );
                              }}
                              id="deleted"
                            />
                          </td>
                          <td>{moment(report.date).format("DD/MM/YYYY HH:mm")}</td>
                          <td>{report.reference}</td>
                          <td>{report.product} (P-{report.code})</td>
                          <td>P-{report.serial_code}</td>
                          <td>{report.from_location}</td>
                          <td>{report.to_location}</td>
                          {report.status == true ? (
                            <td className="text-success">{report.quantity} Units</td>
                            ) : (
                              <td className="text-danger">{report.quantity} Units</td>
                              )}
                          <td>{report.done_by}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
              {/* pagination */}
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={reports.length}
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
