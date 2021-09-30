import "./datatables.css";
import React, { Component } from "react";
import $ from "jquery";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-editor-dt/css/editor.dataTables.min.css";
import "datatables.net-select-dt/css/select.dataTables.min.css";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
import image from './qr-code-standard-example.png';
import Button from "@material-ui/core/Button";

require("datatables.net");
require("datatables.net-buttons");
require("datatables.net-buttons/js/buttons.print.min.js");
require("datatables.net-select");
require("datatables.net-editor");

export class Comeback extends Component {
  constructor(props) {
    super(props);
    this.editor = null;
    this.data = null;
    this.show = this.show.bind(this);
  }

 show(){
   alert("boo");
   
    this.props.passDataToParent("DisplayQR");
 }



  componentDidMount() {
    //$("#l").hide();
  }
  
  render() {
    return (



        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={this.show}
        >
          Display Pass
        </Button>


    );
  }
}


export default Comeback;
