import React, { Component } from 'react'


export default class navbar extends Component {
  

  logout(){
    console.log("oke");
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  render() {
    return (
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              {/* <i className="fas fa-bars" /> */}
            </a>
          </li>
          
        </ul>
        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
           
          <li className="nav-item">
            <a className="nav-link" data-toggle="dropdown" href="">
            <i className="fas fa-sign-out-alt"  onClick={this.logout}></i>
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}
