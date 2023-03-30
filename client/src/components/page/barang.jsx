import { upload } from "@testing-library/user-event/dist/upload";
import React, { Component, useEffect, useState } from "react";
import { FormatRupiah } from "@arismun/format-rupiah";
import Pagination from "../table/pagination";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import moment from "moment";


export default function Barang() {
  const [dataProducts, setDataProducts] = useState([]);
  const [nama, setNama] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categori, setCategori] = useState("");
  const [countData, setCountData] = useState();
  const [detailP, setDetail] = useState([])
  const [serialNumber, Setserialnumber] = useState([])
  const [id, setId] = useState("");
  const [imageUpdate, setImageUpdate] = useState("http://localhost:5000/products/png-1679294291272.png");
  const [description, setDesc] = useState("");
  const [updated_at, setUpdateAt] = useState("");
  const [created_at, setCreatedAt] = useState("");
  const [cost , setCost] = useState("");
  const [Unitscost , setUnitsCost] = useState("");
  const [from , setFrom] = useState("");

  const [image, setImage] = useState("http://localhost:5000/products/png-1679294291272.png");
  const [saveImgae, setImageSave] = useState("");
  //pagination 
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(7);
  // sweet alerts
  const MySwal = withReactContent(Swal);


  const handleImage = (e) => {
    console.log(e);
    let preview = URL.createObjectURL(e);
    setImage(preview);
    setImageSave(e);
    setImageUpdate(preview);
    console.log(imageUpdate);
  };

  const removeImage = () => {
    setImage("http://localhost:5000/products/png-1679294291272.png");
  };


   
  // add barang
  const handleSubmit = async (e) => {
    e.preventDefault();
    var formData = new FormData();
    const userData = JSON.parse(localStorage.getItem('token')) ;
    const done_by = userData.name
    formData.append("photo", saveImgae);
    formData.append("name", nama);
    formData.append("done_by",done_by);
    formData.append("sellingprice", sellingPrice);
    formData.append("cost", cost);
    formData.append("from", from);
    formData.append("quantity", quantity);
    formData.append("description", description);
    formData.append("categori", categori);

    const req = await fetch("http://localhost:5000/product/add", {
      method: "POST",
      body: formData,
    }).then((response) => response.json());
    if (req.status === true) {

      let response = {
        status : true,
        message: 'product successfully add...'
      }

      localStorage.setItem('err',JSON.stringify(response))
      window.location.href = "http://localhost:3000/products";
      
    }
  };

    // get detail
    const detail = async (id) => {
      const dataDetail = await fetch(
        "http://localhost:5000/products/getDetail/".concat(id),
        {
          method: "GET",
        }
      ).then((data) => data.json());
  
      setCategori(dataDetail.data.category);
      setUnitsCost(dataDetail.data.units_cost);
      setNama(dataDetail.data.name_product);
      setSellingPrice(dataDetail.data.selling_price);
      setQuantity(dataDetail.data.quantity);
      setImage(dataDetail.data.imge);
      setDesc(dataDetail.data.description);
      Setserialnumber(dataDetail.data.item_code);
      setUpdateAt(dataDetail.data.updated_at);
      setId(dataDetail.data.id);
      setCreatedAt(dataDetail.data.created_at);
      setCost(dataDetail.data.cost);
    };

  // delete 
  const deleted = async () => {
    let message = "";
    let arrayID = [];
    let count = 0;
    let user = JSON.parse(localStorage.getItem('token'));
    dataProducts.forEach((d) => {
      if (d.select) {
        arrayID.push(d.id);
        console.log(d.id);
      }
    });

    

    if (arrayID.length === 1) {
      await fetch(`http://localhost:5000/products/getDetail/${arrayID[0]}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setDetail(data.data);
          console.log(detailP);
          message = `Product data with code P-${data.data.item_code} will be permanently deleted!`;
        });
    } else if (arrayID.length >= 2) {
      await fetch(`http://localhost:5000/products/multiple/detail/${arrayID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          message = `These ${data.length} data will be permanently deleted`
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
          fetch(`http://localhost:5000/product/delete/${arrayID}/${user.name}`, {
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
  
  // update barang
  const updateSubmit = async (e) => {
    e.preventDefault();
    var data = new FormData();
    const dataUser = JSON.parse(localStorage.getItem('token'))
    data.append("photo", saveImgae);
    data.append("name", nama);
    data.append("sellingprice", sellingPrice);
    data.append("quantity", quantity);
    data.append("description", description);
    data.append("done_by", dataUser.name );
    data.append("cost", cost );
    data.append("id", id);
    data.append('categori', categori)

    const req = await fetch("http://localhost:5000/products/update", {
      method: "POST",
      body: data,
    }).then((res) => res.json());
    if (req.status == true) {
      let response = {
        status : true,
        message: 'product successfully updated...'
      }
      localStorage.setItem('err',JSON.stringify(response))
      window.location.href = "http://localhost:3000/products";
      window.location.href = "http://localhost:3000/products";
    } 
  };


  // filtering data byCategori
  const filterCategory = async (e) => {
    fetch('http://localhost:5000/products/category/'+e, {
      method: 'GET'
    }).then(res => res.json())
      .then(data => {
        setDataProducts(data)
      })
  }
  // filtering data byName
  const filterName = async (e) => {

    if (e) {
      fetch(`http://localhost:5000/products/filtetingByName/${e}`, {
        method: 'GET'
      }).then(res => res.json())
        .then(data => {
          setDataProducts(data)
        })
    } else if(!e){
      console.log("oke");
      fetch(`http://localhost:5000/product`, {
        method: 'GET'
      }).then(res => res.json())
        .then(data => {
          setDataProducts(data.data)
        })
    }
  }; 
  // getdata
  useEffect(() => {
    fetch("http://localhost:5000/product", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setDataProducts(data.data);
        setCountData(dataProducts.length);
      });
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  let currentPosts = dataProducts.slice(indexOfFirstPost, indexOfLastPost);

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
                <h1>Products</h1>
                <p>Data Products</p>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Products</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content mb-4">
          <button
            className={"btn btn-primary ml-2 mb-3"}
            data-toggle="modal"
            data-target="#modal-lg-add"
            onClick={removeImage}
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
                type="text"
                className="form-control mb-4"
                placeholder="Search..."
                onChange={(e) => filterName(e.target.value)}
                aria-describedby="basic-addon1"
                style={{ width: "20%" }}
              />
               <select class="form-select  mb-4" aria-label="Default select example" id="select" onChange={e => filterCategory(e.target.value)}
                style={{ 
                  width: '20%',
                  marginLeft: '22%',
                  marginTop:'-62px'
                  }}
              >
               <option value="all" selected>All</option>  
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
                  id="deleted-product"
                >
                  {" "}
                  <i class="fa fa-trash " aria-hidden="true"></i>
                </button>
                </div>
              <table id="products" className="table table-bordered table-striped mb-3">
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
                          setDataProducts(
                            dataProducts.map((d) => {
                              d.select = value;
                              return d;
                            })
                          );
                        }}
                        id="deleted"
                      />
                    </th>
                    <th>Serial Number</th>
                    <th>Name Product</th>
                    <th>Quantity</th>
                    <th>Cost Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dataProducts.length < 1 ? (
                    <tr
                    style={{ 
                      textAlign: 'center'
                     }}
                    >
                      <td></td>
                      <td></td>
                      <td>Data not found</td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  ) : (
                    currentPosts.map((product) => {
                        return (
                          <tr
                            style={{
                              textAlign: "center",
                              textTransform: 'capitalize'
                            }}
                          >
                              <td>
                              <input
                                class="form-check-input"
                                style={{ marginLeft: "-8px" }}
                                type="checkbox"
                                checked={product.select}
                                onChange={(e) => {
                                  let value = e.target.checked;
                                  setDataProducts(
                                    dataProducts.map((d) => {
                                      if (d.id === product.id) {
                                        d.select = value;
                                      }
                                      return d;
                                    })
                                  );
                                }}
                                id="rows-product"
                              />
                            </td>
                            <td>P-{product.item_code}</td>
                            <td>{product.name_product}</td>
                            <td>{product.quantity} Units</td>
                            <td>{<FormatRupiah value={product.cost} />}</td>
                            <td>
                              <button 
                                className="btn btn-info mr-2"
                                data-toggle="modal"
                                data-target="#modal-lg"
                                onClick={() => detail(product.id)}
                              >
                                <i className="nav-icon fas fa-eye" />
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
                totalPosts={dataProducts.length}
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
      <div className="modal fade" id="modal-lg-add">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">New Product</h4>
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
              <img
                src={image}
                style={{
                  height: "300px",
                  width: "350px",
                  marginBottom: "-59%",
                  marginLeft: "10%",
                }}
              ></img>
              <form onSubmit={handleSubmit}>
                <ul
                  class="list-group mb-3"
                  style={{
                    width: "38%",
                    marginLeft: "60%",
                  }}
                >
               
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="name"
                    required
                    placeholder="Enter Name"
                    onChange={(e) => setNama(e.target.value)}
                  />
                    <select class="form-select  mb-3" aria-label="Default select example" onChange={e => setCategori(e.target.value)}>
                    <option value="" selected> Select categori </option>  
                    <option value="sofware">Sofware</option>  
                    <option value="hardware">Hardware</option>  
                    </select>
                      <input
                    type="text"
                    className="form-control mb-3"
                    id="Price"
                    required
                    placeholder="Units Cost"
                    onChange={(e) => setCost(e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="Price"
                    required
                    placeholder="Selling Price"
                    onChange={(e) => setSellingPrice(e.target.value)}
                  />
                  <input
                    className="form-control mb-3"
                    required
                    placeholder="Quantity"
                    type="text"
                    id="quantity"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <input
                    className="form-control mb-3"
                    required
                    type="file"
                    id="formFile"
                    onChange={(e) => handleImage(e.target.files[0])}
                  />
                     <input
                    type="text"
                    className="form-control mb-3"
                    id="name"
                    required
                    placeholder="From"
                    onChange={(e) => setFrom(e.target.value)}
                  />
                  <textarea
                    class="form-control mb-3"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    onChange={(e) => setDesc(e.target.value)}
                  ></textarea>
                </ul>
                <div className="modal-footer justify-content">
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* /.modal-content */}
        </div>
        {/* /.modal-dialog */}
      </div>
      {/* end modal add */}

      {/* modal detail */}
      <div className="modal fade products-detail" id="modal-lg">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title text-capitalize">P-{serialNumber}</h4>
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
              <img
                src={image}
                style={{
                  height: "300px",
                  width: "350px",
                  marginBottom: "-58%",
                  marginLeft: "10%",
                }}
              ></img>
              <ul
                class="list-group mb-3"
                style={{
                  width: "38%",
                  marginLeft: "60%",
                }}
              >
                <li class="list-group-item">
                   Product Name : {nama}
                </li>
                
                <li class="list-group-item">
                  Price : {<FormatRupiah value={sellingPrice} />}
                </li>
                <li class="list-group-item">
                Units Cost: {<FormatRupiah value={cost} />}
                </li>
                <li class="list-group-item">Quantity : {quantity} </li>
                <li class="list-group-item">
                  Categori : {categori}
                </li>
                <li class="list-group-item">Deskription : {description}</li>
                <li class="list-group-item">
                  Created at :{" "} 
                  <span style={{ fontSize: "15px" }}>{moment(created_at).format('DD/MM/YYYY HH:mm:ss')}</span>
                </li>
                <li class="list-group-item">
                  Update at :{" "}
                  <span style={{ fontSize: "15px" }}>{moment(updated_at).format('DD/MM/YYYY HH:mm:ss')}</span>
                </li>
              </ul>
            </div>
            <div className="modal-footer justify-content">
              <button
                type="button"
                className="btn btn-info products-update"
                data-toggle="modal"
                data-target="#modal-lg-update"
                onClick={() => detail(id)}
              >
                 <i class="fa fa-edit " aria-hidden="true"></i> Edit
              </button>
            </div>
          </div>
          {/* /.modal-content */}
        </div>
        {/* /.modal-dialog */}
      </div>
      {/* end modal detail */}
      {/* modal update */}
      <div className="modal fade" id="modal-lg-update">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Update Product</h4>
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
              <img
                src={imageUpdate}
                style={{
                  height: "280px",
                  width: "350px",
                  marginBottom: "-48%",
                  marginLeft: "10%",
                }}
              ></img>
              <form onSubmit={updateSubmit}>
                <ul
                  class="list-group mb-3"
                  style={{
                    width: "38%",
                    marginLeft: "60%",
                  }}
                >
                  <input type="hidden" value={id} />
                  <input
                    type="text"
                    class="form-control mb-2"
                    placeholder={nama}
                    onChange={(e) => setNama(e.target.value)}
                  />
                  
              <select class="form-select  mb-2" aria-label="Default select example" id="select" onChange={e => setCategori(e.target.value)}>
                {categori === 'sofware' ? 
                <><option value="sofware" selected>Sofware</option><option value="hardware">Hardware</option></>  
                :
                <><option value="hardware" selected>Hardware</option><option value="sofware">Sofware</option></>  
               }
              </select>
                  <input
                    type="text"
                    class="form-control mb-2"
                    placeholder={sellingPrice}
                    onChange={(e) => setSellingPrice(e.target.value)}
                  />
                  <input
                    type="text"
                    class="form-control mb-2"
                    placeholder={Unitscost}
                    onChange={(e) => setUnitsCost(e.target.value)}
                  />
                  <input
                    type="text"
                    class="form-control mb-2"
                    placeholder={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <input
                    type="file"
                    class="form-control mb-2"
                    onChange={(e) => handleImage(e.target.files[0])}
                  />
                   <textarea
                    class="form-control mb-3"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder={description}
                    onChange={(e) => setDesc(e.target.value)}
                  ></textarea>
                </ul>
                <div className="modal-footer justify-content">
                  <button
                    type="button"
                    className="btn btn-warning"
                    data-dismiss="modal"
                    style={{ 
                      color: 'white'
                     }}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Change
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* /.modal-content */}
        </div>
        {/* /.modal-dialog */}
      </div>
      {/* modal end update */}
    </div>
  );
}
