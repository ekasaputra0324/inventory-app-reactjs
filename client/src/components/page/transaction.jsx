export default function transaction() {
  return (
    <div>
      {/* Content Header (Page header) */}
      <div class="content-wrapper barang">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Transaction</h1>
                <p>Data Transaction</p>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Transaction</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content mb-4">
          <button
            className={"btn btn-primary ml-2 mb-4"}
            data-toggle="modal"
            data-target="#modal-default"
          >
            {" "}
            Add Transaction
          </button>
          {/* Default box */}
         
          <div className="card">
            {/* /.card-header */}
            <div className="card-body">
                <div style={{ paddingBottom: '-39%' , marginBottom: '-2%'}}>
              <input
                type="text"
                className="form-control mb-4"
                placeholder="Search..."
                aria-describedby="basic-addon1"
                style={{ width: "20%" }}
              />
              
             <input type="date" class="form-control mb-4" 
             placeholder="Quantity" aria-describedby="emailHelp"
             style={{ 
                width: '20%',
                marginLeft: '22%',
                marginTop:'-63px'
                }}
             />
             <button className="btn btn-success mb-4"
             style={{ 
                // width: '20%',
                marginLeft: '43%',
                marginTop:'-90px'
                }}
             >
             Export Excel <span className="ml-1"><i class="fas fa-file-excel"></i></span>
             </button>
             </div>
              <table id="" className="table table-bordered table-striped mb-4"
              
              >
                <thead>
                  <tr
                    style={{
                      textAlign: "center",  
                    }}
                  >
                    <th>Custumer</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                  style={{ 
                    textAlign: 'center',
                   }}
                  >
                    <td></td>
                    <td></td>
                    <td>Data not found</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
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
      {/* modal add */}
      <div className="modal fade" id="modal-default">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add Transaction</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
        <div class="mb-3">
        <label className="form-label mb-2">Products</label>
        <select class="form-select" aria-label="Default select example">
            <option selected></option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </select>
        </div>
        <div class="mb-3">
        <label class="form-label">Quantity</label>
        <input type="email" class="form-control" placeholder="Quantity" aria-describedby="emailHelp"/>
        </div>
        <div class="mb-3">
        <label  class="form-label">Custumer</label>
        <input type="email" class="form-control" placeholder="Name Custumer" aria-describedby="emailHelp"/>
        </div>
            </div>
            <div className="modal-footer justify-content-between">
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* end modal */}
    </div>
  );
}
