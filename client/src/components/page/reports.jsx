
import React, {useState} from "react";
import { useEffect } from "react";
import moment from "moment/moment";
import Pagination from "../table/pagination";

export default function Reports(){

  const [reports, setReports] = useState([])
  const [id, setId] = useState([])
  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(7);
  // pagination variable
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  let currentPosts = reports.slice(indexOfFirstPost, indexOfLastPost);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  // GET DATA 
  useEffect(() => {
    fetch('http://localhost:5000/reports', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => {
        setReports(data);
        console.log(reports);
      });
  }, [])

  const GetData = async () => {
      return  await  fetch('http://localhost:5000/reports', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
  }

  const MultipleDelete = () => {
      let arrayID = [];
      reports.forEach(d => {
        if (d.select) {
          arrayID.push(d.id);
        }
      })
      fetch('http://localhost:5000/reports/delete/'.concat(arrayID), {
        method: 'DELETE',
      }).then(res => res.json())
        .then(data => {
           console.log(data);
        })
      }
      
      return(
        <div>
           {/* Content Header (Page header) */}
      <div class="content-wrapper barang">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Reports</h1>
                <p>Data Reports</p>
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
                    <th> <input class="form-check-input" style={{ marginLeft: '-8px', marginTop: '-15px' }} type="checkbox" 
                      onClick={e => {
                        let value = e.target.checked;
                        setReports(
                          reports.map(d =>{
                            d.select = value;
                            return d;
                          })
                        )
                      }} id="deleted"/></th>
                    <th>Reports code</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                {currentPosts.map((report) => {
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
                      <td>#{report.reports_code}</td>
                      <td>{report.product}</td>
                      {report.status == true ? (
                        <td className="text-success">{report.quantity}</td>
                      ) : (
                        <td className="text-danger">-{report.quantity}</td>
                      )}

                      <td>{moment(report.date).format("LLL")}</td>
                    </tr>
                  );
                })}
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
    )
}