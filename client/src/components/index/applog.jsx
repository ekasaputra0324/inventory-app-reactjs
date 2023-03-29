import React, { Component } from 'react'
import Navbar from '../global/navbar'
import Sidebar from '../global/sidebar'
import Footer from '../global/footer'
import Applog from '../page/applog'


export default class applog extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Sidebar/>
        <Applog/>
        <Footer/>
      </div>
    )
  }
}
