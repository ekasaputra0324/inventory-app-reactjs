import React, { Component } from 'react'


export default class barang extends Component {
  render() {
    return (
      <div>
        {/* Content Header (Page header) */}
        <div class="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Products</h1>
                  <p>Data Products</p>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Products</a></li>
                    <li className="breadcrumb-item active">Master Data</li>
                  </ol>
                </div>
              </div>
            </div>{/* /.container-fluid */}
          </section>
          {/* Main content */}
          <section className="content mb-4">
            <button className={'btn btn-primary ml-2 mb-3'} data-toggle="modal" data-target="#modal-default"> Add Products</button>
            {/* Default box */}
            <div className="card">
              {/* /.card-header */}
              <div className="card-body">
                <table id="example1" className="table table-bordered table-striped">
                  <thead>
                    <tr
                    style={{ 
                      textAlign: "center"
                      }}
                    >
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr 
                     style={{ 
                      textAlign: "center"
                      }}
                    >
                      <td>Motherboard</td>
                      <td>Rp.300.000
                      </td>
                      <td>23</td>
                      <td>
                        <button className='btn btn-outline-primary'><i className="nav-icon fas fa-eye" /></button> 
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* /.card-body */}
            </div>

            {/* /.card */}
          </section>
          {/* /.content */}
        </div>
        {/* modal */}
        <div className="modal fade" id="modal-default">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Add Product</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter Name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Price">Price</label>
                    <input type="text" className="form-control" id="Price" placeholder="Price" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input type="text" className="form-control" id="quantity" placeholder="Quantity" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputFile">Image</label>
                    <div className="input-group">
                      <div className="custom-file">
                        <input type="file" className="custom-file-input" id="exampleInputFile" />
                        <label className="custom-file-label" htmlFor="exampleInputFile">Choose file</label>
                      </div>
                     
                    </div>
                  </div></div>

              </div>
              <div className="modal-footer justify-content-between">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save</button>
              </div>
            </div>
            {/* /.modal-content */}
          </div>
          {/* /.modal-dialog */}
        </div>

        {/* end modal */}
      </div>

    );
  }
}
