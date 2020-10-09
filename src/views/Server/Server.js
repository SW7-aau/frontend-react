import React, { useState, useEffect } from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import { Multiselect } from "multiselect-react-dropdown";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import Notifications from "@material-ui/icons/Notifications";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

const columns = [
  {
    dataField: "Timestamp",
    text: "Timestamp",
    sort: true,
  },
  {
    dataField: "Protocol",
    text: "Protocol",
    sort: true,
  },
  {
    dataField: "Size",
    text: "Size",
    sort: true,
  },
  {
    dataField: "DestinationIP",
    text: "Destination IP",
    sort: true,
  },
  {
    dataField: "DestinationPort",
    text: "Destination Port",
    sort: true,
  },
  {
    dataField: "SourceIP",
    text: "Source IP",
    sort: true,
  },
  {
    dataField: "SourceName",
    text: "Source Name",
    sort: true,
  },
  {
    dataField: "SourcePort",
    text: "Source Port",
    sort: true,
  },
];

const products = [
  {
    Timestamp: "Timestamp 1",
    Protocol: "Protocol 1",
    Size: "Size 1",
    DestinationIP: "Destination IP 1",
    DestinationPort: "Destination Port 1",
    SourceIP: "Source IP 1",
    SourceName: "Source Name 1",
    SourcePort: "Source Port 1",
  },
  {
    Timestamp: "Timestamp 2",
    Protocol: "Protocol 2",
    Size: "Size 2",
    DestinationIP: "Destination IP 2",
    DestinationPort: "Destination Port 2",
    SourceIP: "Source IP 2",
    SourceName: "Source Name 2",
    SourcePort: "Source Port 2",
  },
  {
    Timestamp: "Timestamp 3",
    Protocol: "Protocol 3",
    Size: "Size 3",
    DestinationIP: "Destination IP 3",
    DestinationPort: "Destination Port 3",
    SourceIP: "Source IP 3",
    SourceName: "Source Name 3",
    SourcePort: "Source Port 3",
  },
];

export default function TableList() {
  const classes = useStyles();
  const { SearchBar } = Search; 
  const [openNotification, setOpenNotification] = React.useState(null);
  const handleClickNotification = (event) => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };

  const options = [
    { name: "last 7 days" },
    { name: "last month" },
    { name: "last 6 months" },
    { name: "last year" },
  ];

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />{" "}
            </CardHeader>{" "}
            <CardBody>
              <h4 className={classes.cardTitle}> CPU </h4>{" "}
              <p className={classes.cardCategory}>
                <span className={classes.successText}>39 %</span> Current CPU
                load{" "}
              </p>{" "}
              <p>
                <Multiselect
                  style={{ zIndex: 2 }}
                  options={options}
                  displayValue="name"
                  singleSelect
                />
              </p>{" "}
            </CardBody>
          </Card>{" "}
        </GridItem>{" "}
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />{" "}
            </CardHeader>{" "}
            <CardBody>
              <h4 className={classes.cardTitle}> RAM </h4>{" "}
              <p className={classes.cardCategory}>
                <span className={classes.successText}>39 %</span> Current RAM
                usage{" "}
              </p>{" "}
              <p>
                <Multiselect
                  style={{ zIndex: 2 }}
                  options={options}
                  displayValue="name"
                  singleSelect
                />
              </p>{" "}
            </CardBody>
          </Card>{" "}
        </GridItem>{" "}
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />{" "}
            </CardHeader>{" "}
            <CardBody>
              <h4 className={classes.cardTitle}> Bandwith </h4>{" "}
              <p className={classes.cardCategory}>
                {" "}
                Current Bandwith{" "}
                <span className={classes.successText}> 39 %</span>{" "}
              </p>{" "}
              <p>
                <Multiselect
                  style={{ zIndex: 2 }}
                  options={options}
                  displayValue="name"
                  singleSelect
                />
              </p>{" "}
            </CardBody>
          </Card>{" "}
        </GridItem>{" "}
      </GridContainer>

      <Card style={{ zIndex: 1 }}>
        <CardHeader color="warning">
          <h4 className={classes.cardTitleWhite}> Network Packages </h4>{" "}
        </CardHeader>{" "}
        <CardBody>
        <ToolkitProvider
          keyField="Protocol"
          data={products}
          columns={columns}
          search
          >
            {
              props => (
                <div>
                  <SearchBar { ...props.searchProps } />
                  <BootstrapTable { ...props.baseProps}
            keyField="Protocol"
            data={products}
            columns={columns}
            striped
          />

                </div>
              )
            }
          </ToolkitProvider>
        </CardBody>{" "}
      </Card>
    </div>
  );
}
