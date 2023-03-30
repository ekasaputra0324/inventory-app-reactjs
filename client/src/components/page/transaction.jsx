import { FormatRupiah } from "@arismun/format-rupiah";
import React, { useEffect, useState } from "react";
import Pagination from "../table/pagination";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import moment from "moment/moment";
async function APIadd(data) {
  return fetch("http://localhost:5000/transaction/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((data) => data.json());
}

export default function Transaction() {
  const [data, setData] = useState([]);
  const [err, setErr] = useState(true);
  const [dataProduct, setDataProduct] = useState([]);
  const [selectOption, setSelectOption] = useState("");
  const [quantity, setQuantity] = useState("");
  const [custumer, setCustumer] = useState("");
  const [ProductId, setProductId] = useState("");
  const [idP, setIdP] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const MySwal = withReactContent(Swal);
  const [id, setId] = useState();

  // GET DATA TRANSACTION
  useEffect(() => {
    fetch("http://localhost:5000/transactions", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  // GET DATA PRODUCTS
  useEffect(() => {
    fetch("http://localhost:5000/product/data", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setDataProduct(data.data);
      });
  }, []);

  // add data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const add = await APIadd({
      selectOption,
      custumer,
      quantity,
    });

    if (add.status === true) {
      let reaponse = {
        status: true,
        message: add.message,
      };
      window.location.href = "/transaction";
      localStorage.setItem("err", JSON.stringify(reaponse));
    } else {
      let reaponse = {
        status: false,
        message: add.message,
      };
      setErr(reaponse.status);
    }
  };
  //hnadel update
  const handleUpdate = async (e) => {
    e.preventDefault();

    const data = {
      product_id: selectOption,
      quantity: quantity,
      custumer: custumer,
      transaction_id: id,
    };

    if (!selectOption) {
      data.product_id = idP.id;
    }

    await fetch("http://localhost:5000/transaction/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === true) {
          let reaponse = {
            status: true,
            message: data.message,
          };
          window.location.href = "/transaction";
          localStorage.setItem("err", JSON.stringify(reaponse));
        } else {
          let reaponse = {
            status: false,
            message: data.message,
          };
          setErr(reaponse.status);
        }
      });
  };
  // handle delete
  const deleted = async () => {
    let arrayID = [];
      data.forEach(d => {
        if (d.select) {
          arrayID.push(d.id);
        }
      })
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("http://localhost:5000/delete/transaction/".concat(arrayID), {
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
  };
  // hide select
  const hideSelect = (product_id) => {
    fetch("http://localhost:5000/products/hide/".concat(product_id), {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setDataProduct(data);
      });
  };
  // get detail
  const detail = async (id) => {
    fetch("http://localhost:5000/transactions/".concat(id), {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setCustumer(data.detailTran.custumer);
        setQuantity(data.detailTran.quantity);
        setProductId(data.detailProduct);
        setIdP(data.detailProduct);
        setId(data.detailTran.id);
      });
  };

  // filtering categori
  const CatgeoriFiltering = async (e) => {
    fetch("http://localhost:5000/transaction/".concat(e), {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  let currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            className={"btn btn-primary  mb-4"}
            data-toggle="modal"
            data-target="#modal-default"
          >
            {" "}
             CREATE 
          </button>
          {/* Default box */}
          <div className="card">
            {/* /.card-header */}
            <div className="card-body">
              <div style={{ paddingBottom: "-39%", marginBottom: "-2%" }}>
                <input
                  type="date"
                  className="form-control mb-4"
                  placeholder="YYY/MM/DD"
                  onChange={(e) => setSearch(e.target.value)}
                  aria-describedby="basic-addon1"
                  style={{ width: "20%" }}
                />

                <select
                  class="form-select  mb-4"
                  id="select"
                  aria-label="Default select example"
                  onChange={(e) => CatgeoriFiltering(e.target.value)}
                  style={{
                    width: "20%",
                    marginLeft: "22%",
                    marginTop: "-62px",
                  }}
                >
                  <option value="" selected id="option">
                    {" "}
                    Select categori{" "}
                  </option>
                  <option value="all">All</option>
                  <option value="sofware">Sofware</option>
                  <option value="hardware">Hardware</option>
                </select>
                <button
                  className={"btn btn-danger  mb-4"}
                  style={{
                    // width: '20%',
                    marginLeft: "43%",
                    marginTop: "-90px",
                  }}
                  onClick={() => {
                    deleted()
                  }}
                  id="deleted-transaction"
                >
                  {" "}
                  <i class="fa fa-trash " aria-hidden="true"></i>
                </button>
              </div>
              <table
                id="transaction"
                className="table table-bordered table-striped mb-4"
              >
                <thead>
                  <tr
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <th>
                      <input
                        class="form-check-input check"
                        style={{ marginLeft: "-8px", marginTop: "-15px" }}
                        type="checkbox"
                        onClick={(e) => {
                          let value = e.target.checked;
                          setData(
                            data.map((d) => {
                              d.select = value;
                              return d;
                            })
                          );
                        }}
                        id="deleted"
                      />
                    </th>
                    <th>Date</th>
                    <th>Custumer</th>
                    <th>Product</th>
                    <th>Serial Number</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPosts.length < 1 ? (
                    <tr
                      style={{
                        textAlign: "center",
                        textTransform: "capitalize",
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
                    currentPosts
                      .filter((transaction) =>
                        transaction.created_at.includes(search)
                      )
                      .map((transaction) => {
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
                                checked={transaction.select}
                                onChange={(e) => {
                                  let value = e.target.checked;
                                  setData(
                                    data.map((d) => {
                                      if (d.id === transaction.id) {
                                        d.select = value;
                                      }
                                      return d;
                                    })
                                  );
                                }}
                                id="deleted"
                              />
                            </td>
                            <td>{moment(transaction.created_at).format('DD/MM/YYYY HH:mm')}</td>
                            <td>{transaction.custumer}</td>
                            <td>{transaction.product}</td>
                            <td>#{transaction.transaction_code}</td>
                            <td>{transaction.quantity}</td>
                            <td>
                              {<FormatRupiah value={transaction.price} />}
                            </td>
                            <td>
                              {<FormatRupiah value={transaction.total} />}
                            </td>
                            <td>
                              <button
                                className="btn btn-info"
                                data-toggle="modal"
                                data-target="#modal-update"
                                onClick={() => detail(transaction.id)}
                              >
                                <i class="fa fa-edit " aria-hidden="true"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                  )}
                </tbody>
              </table>
              {/* pagination */}
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={data.length}
                paginate={paginate}
              />
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
              <h4 className="modal-title">New Transaction</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            {err ? (
              ""
            ) : (
              <div
                class="alert alert-danger  mt-3"
                role="alert"
                style={{
                  width: "85%",
                  marginLeft: "35px",
                  textAlign: "center",
                }}
              >
                the number of items that you enter is more than the number of
                items that exist!!
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div class="mb-3">
                  <label className="form-label mb-2">Products</label>
                  <select
                    class="form-select"
                    id="select"
                    aria-label="Default select example"
                    onChange={(e) => setSelectOption(e.target.value)}
                    style={{ 
                      textTransform: 'capitalize'
                     }}
                  >
                    <option selected value={""} id="option">
                      Select product
                    </option>
                    {dataProduct.map((product) => (
                      <option value={product.id}>
                        {product.name_product} ({product.quantity})
                      </option>
                    ))}
                  </select>
                </div>
                <div class="mb-3">
                  <label class="form-label">Quantity</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Quantity"
                    aria-describedby="qunatity"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Custumer</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Name Custumer"
                    aria-describedby="custumer"
                    onChange={(e) => setCustumer(e.target.value)}
                  />
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
            </form>
          </div>
        </div>
      </div>
      {/* end modal add */}

      {/* modal update */}
      <div className="modal fade" id="modal-update">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Update Transaction</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            {err ? (
              ""
            ) : (
              <div
                class="alert alert-danger  mt-3"
                role="alert"
                style={{
                  width: "85%",
                  marginLeft: "35px",
                  textAlign: "center",
                }}
              >
                the number of items that you enter is more than the number of
                items that exist!!
              </div>
            )}
            <form onSubmit={handleUpdate}>
              <input
                type="hidden"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <div className="modal-body">
                <div class="mb-3">
                  <label className="form-label mb-2">Products</label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    onChange={(e) => setSelectOption(e.target.value)}
                    onClick={() => hideSelect(ProductId.id)}
                  >
                    <option value={ProductId.id} selected>
                      {ProductId.name_product}({ProductId.quantity})
                    </option>
                    {dataProduct.map((product) => (
                      <option value={product.id}>
                        {product.name_product} ({product.quantity})
                      </option>
                    ))}
                  </select>
                </div>
                <div class="mb-3">
                  <label class="form-label">Quantity</label>
                  <input
                    type="text"
                    class="form-control"
                    aria-describedby="qunatity"
                    placeholder={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Custumer</label>
                  <input
                    type="text"
                    class="form-control"
                    aria-describedby="custumer"
                    placeholder={custumer}
                    onChange={(e) => setCustumer(e.target.value)}
                  />
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
            </form>
          </div>
        </div>
      </div>
      {/* end modal update */}
    </div>
  );
}
