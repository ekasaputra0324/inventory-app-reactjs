import React, { Component } from 'react'
import Navbar from '../global/navbar'
import Sidebar from '../global/sidebar'
import Footer from '../global/footer'
import Category from '../page/category'


export default class index extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Sidebar/>
        <Category/>
        <Footer/>
      </div>
    )
  }
}
