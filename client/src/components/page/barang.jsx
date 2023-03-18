import { upload } from "@testing-library/user-event/dist/upload";
import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { FormatRupiah } from "@arismun/format-rupiah";
import Pagination from "../table/pagination";
import { Toast, Swal } from "sweetalert2";
import { Router } from "react-router-dom";

async function addProduct(data) {
  return fetch("http://localhost:5000/product/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((data) => data.json());
}

export default function Barang() {
  const [dataProducts, setDataProducts] = useState([]);
  const [nama, setNama] = useState("");
  const [query, SetQuery] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [countData, setCountData] = useState();
  const [description, setDesc] = useState("");
  const [err, setErr] = useState("");
  const [created_at, setCreatedAt] = useState("");
  const [update_at, setUpdateAt] = useState("");
  const [image, setImage] = useState("https://fakeimg.pl/350x250");
  const [saveImgae, setImageSave] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const handleImage = (e) => {
    let preview = URL.createObjectURL(e);
    setImage(preview);
    setImageSave(e);
  };

  // add barang
  const handleSubmit = async (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("photo", saveImgae);
    formData.append("name", nama);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("description", description);

    const req = await fetch("http://localhost:5000/product/add", {
      method: "POST",
      body: formData,
    }).then((response) => response.json());
    if (req.status === true) {
      setErr(
        <div
          class="alert alert-success"
          role="alert"
          style={{
            width: "30%",
            marginLeft: "70%",
            marginBottom: "-38px",
          }}
        >
          {req.message}
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
      window.location.href = "/products";
    } else if (req.status === false) {
      setErr(
        <div
          class="alert alert-danger"
          role="alert"
          style={{
            width: "30%",
            marginLeft: "70%",
            marginBottom: "-38px",
          }}
        >
          {req.message}
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
      window.location.href = "/products";
    }
  };

  // get detail 
  const detail = async (id) => {
  const dataDetail =  await fetch('http://localhost:5000/getDetail/'.concat(id), {
            method: 'GET',
          })
          .then((data) => data.json())
  
  setNama(dataDetail.data.name_product)
  setPrice(dataDetail.data.price)
  setQuantity(dataDetail.data.quantity)
  setImage(dataDetail.data.imge)
  setDesc(dataDetail.data.description)
  setCreatedAt(dataDetail.data.created_at)
  setUpdateAt(dataDetail.data.update_at)
  }

  // getdata
  useEffect(() => {
    fetch("http://localhost:5000/product/data", {
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
            data-target="#modal-default"
          >
            {" "}
            Add Products
          </button>
          {/* Default box */}
          <div className="card">
            {/* /.card-header */}
            <div className="card-body">
              {err}
              <input
                type="text"
                className="form-control mb-4"
                placeholder="Search..."
                onChange={(e) => SetQuery(e.target.value)}
                aria-describedby="basic-addon1"
                style={{ width: "20%" }}
              />
              <table id="" className="table table-bordered table-striped mb-3">
                <thead>
                  <tr
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <th>Item Code</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {dataProducts.length < 1
                    ? ""
                    : currentPosts
                        .filter((product) =>
                          product.name_product.toLowerCase().includes(query)
                        )
                        .map((product) => {
                          return (
                            <tr
                              style={{
                                textAlign: "center",
                              }}
                            >
                              <td>#{product.item_code}</td>
                              <td>{product.name_product}</td>
                              <td>{product.quantity}</td>
                              <td>{<FormatRupiah value={product.price} />}</td>
                              <td>
                                <button className="btn btn-outline-primary mr-2" 
                                data-toggle="modal" data-target="#modal-lg"
                                onClick={() => detail(product.id)}
                                >
                                  <i className="nav-icon fas fa-eye" />
                                </button>
                                <button className="btn btn-outline-info ">
                                  <i className="nav-icon fas fa-edit" />
                                </button>
                                <button className="btn btn-outline-danger ml-2">
                                  <i className="nav-icon fas fa-trash" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
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
      {/* modal add*/}
      <div className="modal fade" id="modal-default">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add Product</h4>
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
              <form onSubmit={handleSubmit}>
                <div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      required
                      placeholder="Enter Name"
                      onChange={(e) => setNama(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Price">Price</label>
                    <input
                      type="text"
                      className="form-control"
                      id="Price"
                      required
                      placeholder="Price"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                      type="text"
                      className="form-control"
                      id="quantity"
                      required
                      placeholder="Quantity"
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div class="mb-3">
                    <div>
                      <img
                        style={{
                          height: "250px",
                          width: "350px",
                        }}
                        src={image}
                      ></img>
                    </div>
                  </div>
                  <div class="mb-3">
                    <div>
                      <input
                        className="form-control"
                        required
                        type="file"
                        id="formFile"
                        onChange={(e) => handleImage(e.target.files[0])}
                      />
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">
                      Deskription
                    </label>
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      onChange={(e) => setDesc(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-default"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary save">
                      Save
                    </button>
                  </div>
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
      <div className="modal fade" id="modal-lg">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">{nama}</h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <img src={image} style={{ 
              height: "275px",
              width: "350px",
              marginBottom: "-37%",
              marginLeft: "10%"
             }}></img>
          <ul class="list-group mb-3" style={{ 
            width: '38%',
            marginLeft: '60%',
           }}>
            <li class="list-group-item">Price : {< FormatRupiah value={price} />}</li>
            <li class="list-group-item">Quantity : {quantity} </li>
            <li class="list-group-item">Deskription : {description}</li>
            <li class="list-group-item">Created at : <span style={{ fontSize: "15px" }}>{created_at}</span> </li>
            <li class="list-group-item">Update at : {update_at}</li>
        </ul>
          </div>
          <div className="modal-footer justify-content">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
        {/* /.modal-content */}
      </div>
      {/* /.modal-dialog */}
    </div>

      {/* end modal detail */}
    </div>
  );
}
