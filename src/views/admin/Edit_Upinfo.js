import React, { Component } from "react";
import $ from "jquery";
import Button from "@material-ui/core/Button";

import bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from 'moment'

require("datatables.net-editor");
require("datatables.net-editor-bs4");
require("moment");

export class Edit_info extends Component {
  constructor(props) {
    super(props);
    this.editor = null;
    this.data = null;
    this.openedit = this.openedit.bind(this);
    this.passdt = this.passdt.bind(this);
  }


  openedit() {
    var globalemail = this.props.email;
    this.editor
      .buttons([
        {
          label: "Cancel",
          fn: function () {
            this.close();
          },
        },
        {
          label: "Save",
          fn: function () {
            this.val( 'email', globalemail )
            this.submit();
          },
        },
      ])
      .create({ title: "Enter your information to register" });
  }

  passdt() {
    var x;
    x = $("#id").text();
    this.props.passDataToParent(x);
    this.props.passname($("#name").text());
    this.props.passdob($("#dob").text());
    this.props.passzip($("#zip").text());
    
  }

  componentDidMount() {
    
    window.moment = moment;
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
        { label: "Email:", name: "email", type:"hidden" },
        { label: "Name:", name: "first_name" },
        {
          label: "Date of Birth:",
          name: "dob",
          type: "datetime",
          displayFormat: "MM-DD-YYYY",
          wireFormat: "MM-DD-YYYY"
        },
        { label: "Zip Code:", name: "zip" },
        { label: "Type:", name: "type", type: "hidden", def: "ID1" },
      ],
    });

    this.editor = editor;

    this.editor.on("preSubmit", function (e, o, action) {
      
      if (action !== "remove") {
        var firstName = this.field("first_name");
        var zip = this.field("zip");
        var dob = this.field("dob");

        // Only validate user input values - different values indicate that
        // the end user has not entered a value
        if (!firstName.isMultiValue()) {
          if (!firstName.val()) {
            firstName.error("A first name must be given");
          }

          if (firstName.val().length >= 20) {
            firstName.error(
              "The first name length must be less that 20 characters"
            );
          }
        }

        if (!zip.isMultiValue()) {
          if (!zip.val()) {
            zip.error("A Zip code must be given");
          }

          if (zip.val().length != 5) {
            zip.error("The Zip Code length must be 5 characters");
          }
        }

        if (!dob.isMultiValue()) {
          if (!dob.val()) {
            dob.error("Please enter a date of birth");
          }
        }

        // ... additional validation rules

        // If any error was reported, cancel the submission so it can be corrected
        if (this.inError()) {
          return false;
        }
      }
    });
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
          size="large"
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
