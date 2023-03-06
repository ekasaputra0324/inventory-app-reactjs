import React, { Component } from "react";

export default class footer extends Component {
  render() {
    return (
      <footer className="main-footer">
        <div className="float-right d-none d-sm-block">
          {/* <b>Version</b> 3.2.0 */}
        </div>
        <strong>
          Copyright © 2023 <a href="#">ekasaputra</a>.
        </strong>{" "}
        All rights reserved.
      </footer>
    );
  }
}
