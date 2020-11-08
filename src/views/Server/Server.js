import React, { useState, useEffect } from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import { Multiselect } from "multiselect-react-dropdown";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

// react plugin for creating charts
import CanvasJSReact from 'assets/canvasjs.react';


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

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

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
    dataField: "Destination",
    text: "Destination",
    sort: true,
  },
  {
    dataField: "DestinationPort",
    text: "Destination Port",
    sort: true,
  },
  {
    dataField: "Source",
    text: "Source",
    sort: true,
  },
  {
    dataField: "SourcePort",
    text: "Source Port",
    sort: true,
  },
  {
    dataField: "Layer",
    text: "Layer",
    sort: true,
  }
];

function changeAxisMinimum(chart) {	 
	var minY = Infinity;
	var minimum = chart.axisX[0].get("minimum");
	var maximum = chart.axisX[0].get("maximum");
	for(var i = 0; i < chart.data[0].dataPoints.length; i++){
		if(chart.data[0].dataPoints[i].x >= minimum && chart.data[0].dataPoints[i].x <= maximum && chart.data[0].dataPoints[i].y < minY){
			minY = chart.data[0].dataPoints[i].y;
		}
	}
	chart.axisY[0].set("minimum", minY)
}


export default function ServerDetails() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [serverStats, setServerStats] = useState([]);
  const { SearchBar } = Search;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://217.69.10.141:5000/get-resources", {
        params: {
          node_id: "testid",
          from: "2020-09-04 11:50:23",
          to: "2020-12-04 11:50:23"
        }
      });
      setServerStats(result.data);
    };
    fetchData();
  }, []);

  const chartCPU = [];
// new Date(serverStats[i].time_stamp) Can't get it to work
  for (var i = 0; i < serverStats.length; i++) {
    chartCPU.push({
      x: i,
      y: serverStats[i].cpu
    });
  }

  const chartRAM = [];
// new Date(serverStats[i].time_stamp) Can't get it to work
  for (var i = 0; i < serverStats.length; i++) {
    chartRAM.push({
      x: i,
      y: parseFloat(serverStats[i].ram)
    });
  }

  const chartBandwidth = [];
  for (var i = 0; i < serverStats.length; i++) {
    chartBandwidth.push({
      x: i,
      y: parseFloat(serverStats[i].bandwidth)
    });
  }


  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://217.69.10.141:5000/network-package", {
        params: {
          node_id: "172.17.0.7",
          from: "2020-10-04 11:50:23",
          to: "2020-12-04 11:50:23"
        }
      });
      setData(result.data);
    };
    fetchData();
  }, []);

  const serverTable = [{
    
    Timestamp: data.map((status) => status.timestamp),
    Protocol: data.map((status) => status.protocol),
    Size: data.map((status) => status.size),
    Destination: data.map((status) => status.dst),
    DestinationPort: data.map((status) => status.dst_port),
    Source: data.map((status) => status.src),
    SourcePort: data.map((status) => status.src_port),
    Layer: data.map((status) => status.layer)
  }];


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

  const CPUoptions = {
    theme: "light2", // "light1", "dark1", "dark2"
    animationEnabled: true,
    zoomEnabled: true,
    title: {
      text: "CPU"
    },
    axisY: {
      maximum: 100,
    },
    data: [{
      type: "line",
      yValueFormatString:"## '%'",
      dataPoints: chartCPU
    }]
  }

  const RAMoptions = {
    theme: "light2", // "light1", "dark1", "dark2"
    animationEnabled: true,
    zoomEnabled: true,
    title: {
      text: "RAM"
    },
    data: [{
      type: "line",
      yValueFormatString:"##.# '%'",
      dataPoints: chartRAM
    }]
  }

  const Bandwidthoptions = {
    theme: "light2", // "light1", "dark1", "dark2"
    animationEnabled: true,
    zoomEnabled: true,
    title: {
      text: "Bandwidth"
    },
    data: [{
      type: "line",
      yValueFormatString:"##.# '%'",
      dataPoints: chartBandwidth
    }]
  }
  
  const options = [
    { name: "last 7 days" },
    { name: "last month" },
    { name: "last 6 months" },
    { name: "last year" },
  ];

  return (
    <div>
      
      <CanvasJSChart options = {CPUoptions}  />
      <CanvasJSChart options = {RAMoptions} />
      <CanvasJSChart options = {Bandwidthoptions} />
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={chartCPU}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />{" "}
            </CardHeader>{" "}
            <CardBody>
              <h4 className={classes.cardTitle}> CPU </h4>{" "}
              <p className={classes.cardCategory}>
                <span className={classes.successText}>  </span> Current CPU
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
                data={chartRAM}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />{" "}
            </CardHeader>{" "}
            <CardBody>
              <h4 className={classes.cardTitle}> RAM </h4>{" "}
              <p className={classes.cardCategory}>
                <span className={classes.successText}>  </span> Current RAM
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
                data={chartBandwidth}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />{" "}
            </CardHeader>{" "}
            <CardBody>
              <h4 className={classes.cardTitle}> Bandwith </h4>{" "}
              <p className={classes.cardCategory}>
                {" "}
                Current Bandwith{" "}
                <span className={classes.successText}>  </span>{" "}
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
            data={serverTable}
            columns={columns}
            search
          >
            {
              props => (
                <div>
                  <SearchBar {...props.searchProps} />
                  <BootstrapTable {...props.baseProps}
                    keyField="Protocol"
                    data={serverTable}
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
