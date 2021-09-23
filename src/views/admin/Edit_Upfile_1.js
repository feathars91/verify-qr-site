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

export class Edit_up extends Component {
  constructor(props) {
    super(props);
    this.dataTable = null;
    this.editor1 = null;
    this.state = {
      isVisible: true,
    };

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
      .edit(this.props.rowid);
  }

    passdt() {
    this.props.passDataToParent("display3");
    
  }

  componentDidMount() {
    $("#p").hide();
    var editor;
    editor = new $.fn.dataTable.Editor({
      //table: this.$el,
      ajax: {
        type: "POST",
        url: "https://hqisfhhzb5.execute-api.us-east-1.amazonaws.com/dev/items",
                success: function (data) {
          $("#p").click();
        },
      },
      fields: [
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
            url: "https://hqisfhhzb5.execute-api.us-east-1.amazonaws.com/dev/items",
          },
        },
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
          Upload license
        </Button>
<button id="p" onClick={this.passdt}></button>
        <div>
          <div data-editor-id={this.props.rowid}>
            <dl>
              <dt></dt>
              <dd data-editor-field="image"></dd>
            </dl>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit_up;
