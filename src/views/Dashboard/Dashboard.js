import React, { useState, useEffect } from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
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
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
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
    dataField: "node",
    text: "Node",
    sort: true,
  },
  {
    dataField: "cluster",
    text: "Cluster",
    sort: true,
  },
  {
    dataField: "ip",
    text: "IP",
    sort: true,
  },
];

const products = [
  {
    node: "Node 1",
    cluster: "Cluster 1",
    ip: "Address 1",
  },
  {
    node: "Node 2",
    cluster: "Cluster 2",
    ip: "Address 2",
  },
  {
    node: "Node 3",
    cluster: "Cluster 1",
    ip: "Address 2",
  },
];

export default function Dashboard() {
  const [data, setData] = useState([]);
  const classes = useStyles();
const { SearchBar } = Search; 
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:5000/server_status");
      setData(result.data);
      console.log(result.data);
      console.log("hello");
    };
    fetchData();
  }, []);

  console.log(data);
  console.log(data.map((status) => status.time_stamp));

  const chartData = {
    labels: data.map((status) => status.time_stamp),
    series: [data.map((status) => status.cpu)],
  };

  console.log(chartData);
  console.log(dailySalesChart.data);

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
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>CPU</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>39%</span> Current CPU
                load
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minute(s) ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>RAM</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>39%</span> Current RAM
                usage
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Updated 2 minute(s) ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Bandwith</h4>
              <p className={classes.cardCategory}>
                Current Bandwith
                <span className={classes.successText}> 39%</span>
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Updated 1 minute(s)
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>

      <Card>
        <CardHeader color="warning">
          <h4 className={classes.cardTitleWhite}>Server Overview</h4>
          <p className={classes.cardCategoryWhite}>List of Servers</p>
        </CardHeader>
        <CardBody>
        <ToolkitProvider
          keyField="node"
          data={products}
          columns={columns}
          search
          >
            {
              props => (
                <div>
                  <SearchBar { ...props.searchProps } />
                  <BootstrapTable { ...props.baseProps}
            keyField="node"
            data={products}
            columns={columns}
            striped
          />

                </div>
              )
            }
          </ToolkitProvider>
        </CardBody>
      </Card>
    </div>
  );
}
