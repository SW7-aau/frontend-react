import React, { useState, useEffect } from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import AccessTime from "@material-ui/icons/AccessTime";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";


import {
  dailySalesChart,
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
  const [ServerOverview, setServer] = useState([]);
  const classes = useStyles();

  const { SearchBar } = Search; 
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:5000/server_status");
      setData(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:5000/servers");
      setServer(result.data);
    };
    fetchData();
  }, []);

  const serverTable = {
    node: data.map((status) => status.Node),
    cluster: [data.map((status) => status.Cluster)],
    ip: [data.map((status) => status.ip)]
  };

  const chartCPU = {
    labels: data.map((status) => status.time_stamp),
    series: [data.map((status) => status.cpu)],
  };

  const chartRAM = {
    labels: data.map((status) => status.time_stamp),
    series: [data.map((status) => status.ram)],
  };

  const chartBandwidth = {
    labels: data.map((status) => status.time_stamp),
    series: [data.map((status) => status.bandwidth)],
  };


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
