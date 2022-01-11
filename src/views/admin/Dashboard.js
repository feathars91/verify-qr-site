import React, { useState } from "react";
// javascipt plugin for creating charts
import $ from "jquery";
import Chart from "chart.js";
// react plugin used to create charts
//import { Bar } from "react-chartjs-2";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
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

import Edit_info from "./Edit_Upinfo.js";
import Edit_up from "./Edit_Upfile_1.js";
import Edit_up2 from "./Edit_Upfile_2.js";
import QR from "./qrcode.js";
//import Tbl2 from "./Table.js";
//import Tbl3 from "./Table3.js";
import Comeback from "./comeback.js";

import "./App.css";
// core components
import Header from "components/Headers/Header.js";

import {
  chartOptions,
  parseOptions,
  //chartExample1,
  //chartExample2,
} from "variables/charts.js";

import componentStyles from "assets/theme/views/admin/dashboard.js";

import { API, Auth } from "aws-amplify";

const useStyles = makeStyles(componentStyles);

function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeNav, setActiveNav] = React.useState(1);
  const [chartExample1Data, setChartExample1Data] = React.useState("data1");
  const [val, setVal] = React.useState("hidden");

  const [isOpened, setIsOpened] = useState(false);
  const [Up2isOpened, setUp2isOpened] = useState(false);

  const [Up3isOpened, setUp3isOpened] = useState(false);
  const [Up4isOpened, setUp4isOpened] = useState(false);
  const [ComebackisOpened, setComebackisOpened] = useState(false);
  const [dispQR, setdispQR] = useState(false);

  const [rowId, setRowId] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [userDob, setUserDob] = React.useState("");
  const [userZip, setUserZip] = React.useState("");
  const [data, setData] = React.useState("");

  function toggleZoomScreen() {
    document.body.style.zoom = "80%";
  }

  React.useEffect(() => {
    toggleZoomScreen();
    callApi();
    //checkComeback(userEmail);
    //  $("#p").click();
  }, []);

  function displayqr() {
    setComebackisOpened(false);
    setdispQR(true);
  }
  async function callApi() {
    const user = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;
    const requestData = {
      headers: {
        Authorization: token,
      },
    };
    const data = await API.get("authapi", "/items", requestData);
    console.log("data: ", data);
    setUserEmail(data.email);
    checkComeback(data.email);
  }

  async function checkComeback(x) {
    const myInit = {
      // OPTIONAL
      queryStringParameters: {
        // OPTIONAL
        email: x,
      },
    };
    const data = await API.get("comebackapi", "/items", myInit);
    console.log("datafff: ", data);
    if (data.count >= 2) {
      setUp3isOpened(false);
      setIsOpened(false);
      setUp2isOpened(false);
      setUp4isOpened(false);
      setComebackisOpened(true);
    } else {
      setUp3isOpened(false);
      setIsOpened(false);
      setUp2isOpened(true);
      setUp4isOpened(false);
      setComebackisOpened(false);
    }
  }

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (index) => {
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  function doSomethingWithDataFromInfo(data) {
    if (typeof data !== "undefined") {
      setIsOpened(true);
      setUp2isOpened(false);
      setRowId(data);
    }
  }

  function getName(data) {
    if (typeof data !== "undefined") {
      setUserName(data);
    }
  }

  function getDob(data) {
    if (typeof data !== "undefined") {
      setUserDob(data);
    }
  }

  function getZip(data) {
    if (typeof data !== "undefined") {
      setUserZip(data);
    }
  }

  function doSomethingWithDataFrom2ndchild(data) {
    if (data === "display3") {
      setUp3isOpened(true);
      setIsOpened(false);
      setUp2isOpened(false);
      //setComebackisOpened(false);
    }
  }

  function doSomethingWithDataFrom3ndchild(data) {
    if (data === "display4") {
      setUp3isOpened(false);
      setIsOpened(false);
      setUp2isOpened(false);
      // setComebackisOpened(false);
      setUp4isOpened(true);
    }
  }

  function doSomethingWithDataFromComeback(data) {
    if (data === "DisplayQR") {
      setComebackisOpened(false);
      setUp4isOpened(true);
    }
  }
  return (
    <>
      <Header />
      {/* Page content */}

      <Container
        maxWidth={false}
        component={Box}
        marginTop="-6rem"
        classes={{ root: classes.containerRoot }}
      >
        <Grid container component={Box} marginTop="3rem">
          <Grid></Grid>
        </Grid>
        <Grid container component={Box} marginTop="3rem">
          <Grid></Grid>
        </Grid>

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
          <Grid
            item
            xs={12}
            xl={12}
            component={Box}
            marginBottom="3rem!important"
            classes={{ root: classes.gridItemRoot }}
          >
            {ComebackisOpened && (
              <Comeback
                passDataToParent={doSomethingWithDataFromComeback}
                userEmail={userEmail}
              />
            )}

            {Up2isOpened && (
              <Edit_info
                passDataToParent={doSomethingWithDataFromInfo}
                email={userEmail}
                passname={getName}
                passdob={getDob}
                passzip={getZip}
              />
            )}
            {isOpened && (
              <Edit_up
                rowid={rowId}
                passDataToParent={doSomethingWithDataFrom2ndchild}
              />
            )}
            {Up3isOpened && (
              <Edit_up2
                passDataToParent={doSomethingWithDataFrom3ndchild}
                name={userName}
                dob={userDob}
                zip={userZip}
                email={userEmail}
              />
            )}
            {Up4isOpened && <QR name={userName} />}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

//export default Dashboard;

export default Dashboard;
