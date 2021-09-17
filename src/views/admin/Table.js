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

export class Tbl extends Component {
  constructor(props) {
    super(props);
    this.dataTable = null;
    this.editor = null;
  }


  componentDidMount() {
    this.$el = $(this.el);
    var editor;
    editor = new $.fn.dataTable.Editor({
      ajax: {
        create: {
          type: "POST",
          url: "https://wd1jsqwqrk.execute-api.us-east-2.amazonaws.com/dev/items",
        },
        edit: {
          type: "POST",
          url: "https://wd1jsqwqrk.execute-api.us-east-2.amazonaws.com/dev/items",
        },
        remove: {
          type: "POST",
          url: "https://wd1jsqwqrk.execute-api.us-east-2.amazonaws.com/dev/items",
        },
      },
      table: this.$el,
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
    this.dataTable = this.$el.DataTable({
      dom: "Blrtip",
      ajax: "https://wd1jsqwqrk.execute-api.us-east-2.amazonaws.com/dev/items",
      columns: [
        { title: "Name", data: "first_name" },
        { title: "Birth Date", data: "last_name" },
        { title: "Zip Code", data: "zip" },
        {
          data: "image",
          render: function (file_id) {
            try {
              return (
                '<img src="https://datatables-editor.s3.us-east-2.amazonaws.com/' +
                editor.file("files", file_id).filename +
                '"/>'
              );
              //return '<img src="https://datatables-editor.s3.us-east-2.amazonaws.com/cat1.jpg"/>';
            } catch (e) {
              console.debug(e);
            }
          },
          defaultContent: "No image",
          title: "Image",
        },
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
    $(this.dataTable.table().container()).on(
      "click",
      "tbody td:not(:first-child)",
      (e) => {
        console.log("Click e", e);
        this.editor.inline(e.target);
      }
    );
    this.dataTablesRef = React.createRef();
  }

  componentWillUnmount() {
    this.dataTable.destroy(true);
  }

  search = (value) => {
    this.dataTable.search(value).draw();
  };

  editor = () => {
    return this.editor;
  };


  render() {
    return (
      <div   >
        <table
          className="display"
          width="100%"
          ref={(el) => (this.el = el)}
        ></table>
      </div>
    );
  }
}

export default Tbl;
