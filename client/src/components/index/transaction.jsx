import React, { Component } from 'react'
import Navbar from '../global/navbar'
import Sidebar from '../global/sidebar'
import Footer from '../global/footer'
import Transaction from '../page/transaction'


export default class transaction extends Component {
  render() {
    return (
        <div>
        <Navbar/>
        <Sidebar/>
        <Transaction/>
        <Footer/>
      </div>
    )
  }
}
