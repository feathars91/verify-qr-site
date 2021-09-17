import "./datatables.css";
import React, { Component } from "react";
import $ from "jquery";

import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-editor-dt/css/editor.dataTables.min.css";
import "datatables.net-select-dt/css/select.dataTables.min.css";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
require("datatables.net");
require("datatables.net-buttons");
require("datatables.net-buttons/js/buttons.print.min.js");
require("datatables.net-select");
require("datatables.net-editor");

export class Tbl3 extends Component {
  constructor(props) {
    super(props);
    this.dataTable = null;
    this.editor = null;
    this.state = {
      color: "red",
    };

    this.changeColor = this.changeColor.bind(this);
  }

  changeColor() {
    this.setState({ color: "blue" });
  }

  componentDidMount() {
    this.$el = $(this.el);
    var editor;

    editor = new $.fn.dataTable.Editor({
      //table: this.$el,
      fields: [
        { label: "Name:", name: "first_name" },
        { label: "email:", name: "last_name" },
        {
          label: "Image:",
          name: "image",
          type: "upload",
          display: function (file_id) {
            try {
              return (
                '<img src="https://datatables-editor.s3.us-east-2.amazonaws.com/' +
                editor.file("files", file_id).filename +
                '"/>'
              );
            } catch (e) {
              console.debug(e);
            }
          },
          clearText: "Clear",
          noImageText: "No image",
          ajax: {
            type: "POST",
            url: "https://wd1jsqwqrk.execute-api.us-east-2.amazonaws.com/dev/items",
          },
        },
      ],
    });
    this.editor = editor;

    editor
      .buttons({
        label: "Save",
        fn: function () {
          this.submit();
        },
      })
      .edit();
  }

  editor = () => {
    return this.editor;
  };

  render() {
    return (
      <div style={{ backgroundColor: this.state.color }}>
        <dl>
          <dt></dt>
          <dd data-editor-field="first_name"></dd>
          <dt></dt>
          <dd data-editor-field="last_name"></dd>
          <dt></dt>
          <dd data-editor-field="image"></dd>
        </dl>
      </div>
    );
  }
}

export default Tbl3;
