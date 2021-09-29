import "./datatables.css";
import React, { Component } from "react";
import $ from "jquery";
import Button from "@material-ui/core/Button";
import bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
require("datatables.net-editor");
require("datatables.net-editor-bs4");


export class Edit_up extends Component {
  constructor(props) {
    super(props);
    this.dataTable = null;
    this.editor = null;
    this.state = {
      isVisible: true,
    };

    this.changevis = this.changevis.bind(this);
    this.passdt = this.passdt.bind(this);
  }

  changevis() {
    this.editor
      .buttons(
        {
          label: "Save",
          fn: function () {
            this.submit();
            this.destroy();
          },
        }
      )
      .edit(this.props.rowid, {
        title: "Please submit a picture of your Driver's License or ID",
      });
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
