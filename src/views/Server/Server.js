import React, { useState, useEffect } from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import { Multiselect } from "multiselect-react-dropdown";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";


import {
  dailySalesChart,
  completedTasksChart,
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);
const id = 0;
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

export default function ServerDetails() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [serverStats, setServerStats] = useState([]);
  const { SearchBar } = Search;  
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:5000/server_status");
      setServerStats(result.data);
    };
    fetchData();
  }, []);

  const chartCPU = {
    labels: serverStats.map((status) => status.time_stamp),
    series: [serverStats.map((status) => status.cpu)],
  };

  const chartRAM = {
    labels: serverStats.map((status) => status.time_stamp),
    series: [serverStats.map((status) => status.ram)],
  };

  const chartBandwidth = {
    labels: serverStats.map((status) => status.time_stamp),
    series: [serverStats.map((status) => status.bandwidth)],
  };
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:5000/Servers/", {
        params: {
          ID: id
        }
      });
      setData(result.data);
    };
    fetchData();
  }, []);
  
  const serverTable = {
    timestamp: data.map((status) => status.timestamp),
    protocol: [data.map((status) => status.protocol)],
    Size: [data.map((status) => status.Size)],
    destinationIp: [data.map((status) => status.destinationIp)],
    destinationPort: [data.map((status) => status.destinationPort)],
    sourceIp: [data.map((status) => status.sourceIp)],
    sourceName: [data.map((status) => status.sourceName)],
    sourcePort: [data.map((status) => status.sourcePort)]
  };


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
