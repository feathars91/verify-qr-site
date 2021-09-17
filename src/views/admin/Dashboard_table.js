import React, { useState } from "react";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
//import { Bar } from "react-chartjs-2";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
//import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
//import LinearProgress from "@material-ui/core/LinearProgress";
/*import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
*/ import Typography from "@material-ui/core/Typography";
// @material-ui/icons components
//import ArrowDownward from "@material-ui/icons/ArrowDownward";
//import ArrowUpward from "@material-ui/icons/ArrowUpward";
import QR from './qrcode.js'
import Tbl2 from "./Table.js";
import Tbl from "./Table3.js";

//import Tbl2 from './Tableadmin.js'

// core components
import Header2 from "components/Headers/Header2.js";


import Header from "components/Headers/Header.js";

import {
  chartOptions,
  parseOptions,
  //chartExample1,
  //chartExample2,
} from "variables/charts.js";

import componentStyles from "assets/theme/views/admin/dashboard.js";

const useStyles = makeStyles(componentStyles);


function Dashboard() {
  const classes = useStyles();
  //const theme = useTheme();
  const [activeNav, setActiveNav] = React.useState(1);
  const [chartExample1Data, setChartExample1Data] = React.useState("data1");
  const [val, setVal] = React.useState("hidden");

  const [isOpened, setIsOpened] = useState(false);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (index) => {
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };




   function doSomethingWithDataFromChild(data) {


    if (data === 'display') {
      setIsOpened(true);
    }

   }


  return (
    <>
      <Header2 />
      {/* Page content */}
      <Container
        maxWidth={false}
        component={Box}
        marginTop="-6rem"
        classes={{ root: classes.containerRoot }}
      >
        <Grid container component={Box} marginTop="3rem">
          <Grid
            item
            xs={12}
            xl={12}
            component={Box}
            marginBottom="3rem!important"
            classes={{ root: classes.gridItemRoot }}
          >



<Tbl2 />


             

              


          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Dashboard;
