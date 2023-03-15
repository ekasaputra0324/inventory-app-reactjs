import React, { Component } from 'react'

export default class category extends Component {
    render() {
        return (
         <div>
            {/* Content Header (Page header) */}
            <div class="content-wrapper">
            <section className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    <h1>Category</h1>
                  </div>
                  <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item"><a href="#">Products</a></li>
                      <li className="breadcrumb-item active">Category</li>
                    </ol>
                  </div>
                </div>
              </div>{/* /.container-fluid */}
            </section>
            {/* Main content */}
            <section className="content">
              {/* Default box */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Title</h3>
                  <div className="card-tools">
                    <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                      <i className="fas fa-minus" />
                    </button>
                    <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  Start creating your amazing application!
                </div>
                {/* /.card-body */}
                <div className="card-footer">
                  Footer
                </div>
                {/* /.card-footer*/}
              </div>
              {/* /.card */}
            </section>
            {/* /.content */}
            </div>
          </div>
    
        );
      }
}
