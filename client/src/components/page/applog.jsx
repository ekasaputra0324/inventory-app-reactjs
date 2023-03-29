import { useEffect, useState } from "react";
import moment from "moment";



export default function Applog(){
    const [ logData , setLogData] = useState([])
    // get data 
    useEffect( async () => {
      await  fetch('http://localhost:5000/applog', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
          .then(data => {
            setLogData(data)
            console.log(logData);
          })
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
                <div className="card-body">
                  <table id="products" className="table table-bordered table-striped mb-3">
                    <thead>
                      <tr
                        style={{
                        //   textAlign: "center",
                        }}
                      >
                        <th>Date</th>
                        <th>User</th>
                        <th>URL</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                        {logData.length < 1
                        ?  <tr
                        style={{
                        //   textAlign: "center",
                          textTransform: 'capitalize'
                        }}
                      >
                        <td></td>
                        <td></td>
                        <td>Data Not Found</td>
                        <td></td>
                        <td></td>
                      </tr>  

                        :logData.map(log => { 
                            return(
                              <tr
                                style={{
                                //   textAlign: "center",
                                  textTransform: 'capitalize'
                                }}
                              >
                                <td>{moment(log.date).format('DD-MM-YYYY HH:mm')}</td>
                                <td>{log.user}</td>
                                <td>{log.method} |  {log.url}</td>
                                {log.status_code == 200 
                                ? <td className="text-success">{log.status_code} (<span>Success</span>)</td>
                                : <td className="text-danger">{log.status_code} </td>
                                }
                                
                              </tr>
                              )
                    })
                }
                    </tbody>
                  </table>
                  {/* pagination */}
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