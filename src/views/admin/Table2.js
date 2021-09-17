import "./datatables.css";
import React, { Component } from "react";
import axios from "axios";

import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-editor-dt/css/editor.dataTables.min.css";
import "datatables.net-select-dt/css/select.dataTables.min.css";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
const $ = require("jquery");
$.Datatable = require("datatables.net");

require("datatables.net");
require("datatables.net-buttons");
require("datatables.net-buttons/js/buttons.print.min.js");
require("datatables.net-select");
require("datatables.net-editor");

export class Tbl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
    };
  }

  //option 1
  async getUsersData() {
    const res = await axios.get(
      "https://6ewrylky9f.execute-api.us-east-2.amazonaws.com/dev/getcontacts"
    );
    //const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    console.log(res.data);
    this.setState({ loading: false, users: res.data.data });
  }

  //option 2
  async getUsersData1() {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    return res.data;
  }

  componentDidMount() {
    this.getUsersData().then(() => this.sync());
  }


  sync() {
    this.$el = $(this.el);
    var editor;
    this.editor = new $.fn.dataTable.Editor({
      // idSrc: "id",
      table: this.$el,
      //ajax: "https://6ewrylky9f.execute-api.us-east-2.amazonaws.com/dev/getcontacts",
      
      fields: [
        {
          label: "Name:",
          name: "name",
        },
        {
          label: "E-mail:",
          name: "email",
        },
      ],
    });
    this.$el.DataTable({
      dom: "Blrtip",
      //data: this.state.users, //option 1
       ajax: "https://6ewrylky9f.execute-api.us-east-2.amazonaws.com/dev/getcontacts",
      // data: this.getUsersData1(), //option 2
      columns: [
        { title: "Name", data: "name" },
        { title: "E-mail", data: "email" },
      ],
      select: {
        style: "os",
        selector: "td:first-child",
      },
      buttons: [
        { extend: "create", editor: this.editor },
        { extend: "edit", editor: this.editor },
        { extend: "remove", editor: this.editor },
      ],
    });
  }

  render() {
    return (
      <table
        className="display"
        width="100%"
        ref={(el) => (this.el = el)}
      ></table>
    );
  }
}

export default Tbl;
