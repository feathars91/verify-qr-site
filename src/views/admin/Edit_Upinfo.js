import "./datatables.css";
import React, { Component } from "react";
import $ from "jquery";
import Button from "@material-ui/core/Button";

import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-editor-dt/css/editor.dataTables.min.css";
import "datatables.net-select-dt/css/select.dataTables.min.css";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
require("datatables.net");
require("datatables.net-buttons");
require("datatables.net-buttons/js/buttons.print.min.js");
require("datatables.net-select");
require("datatables.net-editor");

export class Edit_info extends Component {
  constructor(props) {
    super(props);
    this.editor = null;
    this.state = {
      isVisible: true,
    };
    this.data = null;

    this.changevis = this.changevis.bind(this);
    this.passdt = this.passdt.bind(this);
  }

  changevis() {
    this.editor
      .buttons({
        label: "Save",
        fn: function () {
          this.submit();
        },
      })
      .create();
  }

  passdt() {
    var x;
    x = $("#id").text();
    this.props.passDataToParent(x);

    this.props.passname($("#name").text());
  }

  componentDidMount() {
    $("#p").hide();
    var editor;
    editor = new $.fn.dataTable.Editor({
      ajax: {
        type: "POST",
        url: "https://hqisfhhzb5.execute-api.us-east-1.amazonaws.com/dev/items",
        success: function (data) {
          var rowid;
          if (Object.keys(data.fieldErrors).length) {
            console.debug(Object.keys(data.fieldErrors).length);
            return;
          } else {
            rowid = data.data[0]["DT_RowId"];
            $("#id").text(rowid);
            $("#name").text(data.data[0]["first_name"]);
            $("#zip").text(data.data[0]["zip"]);
            $("#dob").text(data.data[0]["dob"]);
            $("#p").click();
          }
        },
      },
      fields: [
        { label: "Name:", name: "first_name" },
        { label: "Date of Birth:", name: "dob", type: "datetime" },
        { label: "Zip Code:", name: "zip" },
        { label: "Type:", name: "type", type: "hidden", def: "ID1" },
      ],
    });

    this.editor = editor;
  }

  editor = () => {
    return this.editor;
  };

  render() {
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={this.changevis}
        >
          Enter information
        </Button>
        <button id="p"  onClick={this.passdt}></button>
        <div>
          <h1 id="name"></h1>
          <h1 id="zip"></h1>
          <h1 id="dob"></h1>
          <h1 id="id"></h1>

          <h1 id="in"></h1>
          <dl ref="main">
            <dt></dt>
            <dd data-editor-field="first_name"></dd>
            <dt></dt>
            <dd data-editor-field="last_name"></dd>
          </dl>
        </div>
      </div>
    );
  }
}

export default Edit_info;
