import React from 'react'
import {  MDBFooter } from "mdbreact"
import 'mdbreact/dist/css/mdb.css';

const Footer = () => {
    return (
        <MDBFooter style={{height:'80px', position: 'absolute', bottom: '0', width: '100%' , textAlign:'center'}} color="blue" >
      <div className="footer-copyright py-3">
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.facebook.com/anjhehheue">Diamond Bell</a>
      </div>
    </MDBFooter>
    )
}

export default Footer