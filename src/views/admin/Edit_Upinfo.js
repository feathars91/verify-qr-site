import React, { Component } from "react";
import $ from "jquery";
import Button from "@material-ui/core/Button";

import bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

require("datatables.net-editor");
require("datatables.net-editor-bs4");

export class Edit_info extends Component {
  constructor(props) {
    super(props);
    this.editor = null;
    this.data = null;
    this.openedit = this.openedit.bind(this);
    this.passdt = this.passdt.bind(this);
  }

  openedit() {
    this.editor
      .buttons({
        label: "Save",
        fn: function () {
          this.submit();
        },
      })
      .create({ title: "Enter your information to register" });
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
          onClick={this.openedit}
        >
          Enter information
        </Button>
        <button id="p" onClick={this.passdt}></button>
        <div>
          <h1 id="name"></h1>
          <h1 id="zip"></h1>
          <h1 id="dob"></h1>
          <h1 id="id"></h1>

          <h1 id="in"></h1>
        </div>
      </div>
    );
  }
}

export default Edit_info;
