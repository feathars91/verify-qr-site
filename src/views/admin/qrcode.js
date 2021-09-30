import "./datatables.css";
import React, { Component } from "react";
import $ from "jquery";

import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-editor-dt/css/editor.dataTables.min.css";
import "datatables.net-select-dt/css/select.dataTables.min.css";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import Box from "@material-ui/core/Box";
import image from "./qr-code-standard-example.png";
import { useTheme } from "@material-ui/core/styles";
require("datatables.net");
require("datatables.net-buttons");
require("datatables.net-buttons/js/buttons.print.min.js");
require("datatables.net-select");
require("datatables.net-editor");

export class QR extends Component {
  componentDidMount() {}

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
          <Grid container component={Box} marginTop="3rem">
            <Grid></Grid>
          </Grid>
          <Grid container component={Box} marginTop="3rem">
            <Grid></Grid>
          </Grid>
          <Box component="span" fontSize="25px" fontWeight="400">
            You're all set!
          </Box>

          <img src={image} />

          <Box component="span" fontSize="20px" fontWeight="400">
            Here's your digital vaccine pass.
          </Box>
        </Grid>
      </Container>
    );
  }
}

export default QR;
