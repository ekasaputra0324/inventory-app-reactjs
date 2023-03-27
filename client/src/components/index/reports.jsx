import React, { Component } from 'react'
import Navbar from '../global/navbar'
import Sidebar from '../global/sidebar'
import Footer from '../global/footer'
import Reports from '../page/reports'


export default class Report extends Component {
  render() {
    return (
        <div>
        <Navbar/>
        <Sidebar/>
        <Reports/>
        <Footer/>
      </div>
    )
  }
}
