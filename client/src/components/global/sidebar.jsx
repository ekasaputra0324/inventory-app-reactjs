import React, { Component, useState } from "react";


export default class Sidebar extends Component {
  state = {
    token: JSON.parse(localStorage.getItem('token')),
    activeLink: '',
  };

  componentDidMount() {
    const currentPath = window.location.pathname;
    this.setActiveLink(currentPath);
  }

  setActiveLink = (path) => {
    this.setState({ activeLink: path });
  };



  render() {
    const { token, activeLink } = this.state;
    return (
      <div>
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          {/* Brand Logo */}
  
          {/* Sidebar */}
          <div className="sidebar">
            {/* Sidebar user (optional) */}
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image mt-2">
                <img
                  src="/dist/img/user2-160x160.jpg"
                  className="img-circle elevation-2"
                  alt="User Image"
                />
              </div>
              <div className="info">
                <a
                  href="#"
                  className="d-block"
                  style={{
                    textTransform: 'capitalize',
                  }}
                >
                  {token.name} <br/>
                  <span 
                  style={{ 
                    fontSize: "13px",
                   }}
                  > Administrator</span>
                </a>
              </div>
            </div>

            {/* Sidebar Menu */}
            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                {/* Add icons to the links using the .nav-icon class
                with font-awesome or any other icon font library */}
                <li className="nav-item">
                  <a
                    href="/"
                    className={`nav-link ${
                      activeLink === '/' ? 'active' : ''
                    }`}
                    onClick={() => this.setActiveLink('/')}
                  >
                    <i className="nav-icon fas fa-home" />
                    <p>
                      Dashboard
                      {/* <i className="right fas fa-angle-left" /> */}
                    </p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="/products"
                    className={`nav-link ${
                      activeLink === '/products' ? 'active' : ''
                    } loading`}
                    onClick={() => this.setActiveLink('/products')}
                  >
                    <i className="nav-icon fas fa-th" />
                    <p>Products</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="/transaction"
                    className={`nav-link ${
                      activeLink === '/transaction' ? 'active' : ''
                    } loading`}
                    onClick={() => this.setActiveLink('/transaction')}
                  >
                    <i className="nav-icon fas fa-file-invoice" />
                    <p>Transactions</p>
                  </a>
                </li>
               
                <li className="nav-item">
                  <a href="/category" 
                  className={`nav-link ${
                    activeLink === '/category' ? 'active' : ''
                  }`}
                  onClick={() => this.setActiveLink('/category')}
                  >
                    <i className="nav-icon fas fa-edit" />
                    <p
                      style={{
                        textTransform: 'capitalize',
                      }}
                    >
                      category
                    </p>
                  </a>
                </li>
               
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="nav-icon fas fa-chart-pie" />
                    <p>
                      Reports
                      {/* <i className="right fas fa-angle-left" /> */}
                    </p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/app-log" 
                  className={`nav-link ${
                    activeLink === '/app-log' ? 'active' : ''
                  }`}
                  onClick={() => this.setActiveLink('/app-log')}
                  >
                    <i className="nav-icon fas fa-info" />
                    <p
                      style={{
                        textTransform: 'capitalize',
                      }}
                    >
                      app log
                    </p>
                  </a>
                </li>
              </ul>
            </nav>
            {/* /.sidebar-menu */}
          </div>
          {/* /.sidebar */}
        </aside>
      </div>
    );
  }
}
