import React, { Component } from 'react'
import Navbar from '../global/navbar'
import Sidebar from '../global/sidebar'
import Footer from '../global/footer'
import Content from '../page/content'


export default class index extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Sidebar/>
        <Content/>
        <Footer/>
      </div>
    )
  }
}
