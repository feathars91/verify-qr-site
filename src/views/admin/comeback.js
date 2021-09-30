import "./datatables.css";
import React, { Component } from "react";
import $ from "jquery";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-editor-dt/css/editor.dataTables.min.css";
import "datatables.net-select-dt/css/select.dataTables.min.css";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
import image from "./qr-code-standard-example.png";
import Button from "@material-ui/core/Button";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
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

  show() {
    this.props.passDataToParent("DisplayQR");
  }

  componentDidMount() {
  }

  render() {
    return (
      <Container maxWidth={false} component={Box} marginTop="-6rem">
        <Grid
          container
          component={Box}
          marginTop="3rem"
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "50vh" }}
        >
          <Box component="span" fontSize="20px" fontWeight="600">
            Welcome Back, {this.props.userEmail} !
          </Box>
          <Grid container component={Box} marginTop="3rem">
            <Grid></Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            onClick={this.show}
          >
            Display Pass
          </Button>
        </Grid>
      </Container>
    );
  }
}

export default Comeback;
