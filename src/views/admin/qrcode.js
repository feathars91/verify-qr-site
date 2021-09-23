import "./datatables.css";
import React, { Component } from "react";
import $ from "jquery";

import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-editor-dt/css/editor.dataTables.min.css";
import "datatables.net-select-dt/css/select.dataTables.min.css";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";


import image from './qr-code-standard-example.png';
require("datatables.net");
require("datatables.net-buttons");
require("datatables.net-buttons/js/buttons.print.min.js");
require("datatables.net-select");
require("datatables.net-editor");



export class QR extends Component {


  componentDidMount() {}
  
  render() {
    return (
      <div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      
      <h1>You're all set!</h1>
      
      <img src={image} />
      <h1>Here's your digital vaccine pass.</h1>
      </div>
    );
  }
}


export default QR;
