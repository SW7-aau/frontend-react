import React, { useState, useEffect } from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import { Multiselect } from "multiselect-react-dropdown";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { useLocation } from "react-router-dom";
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
  let location = useLocation();
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [serverStats, setServerStats] = useState([]);
  const { SearchBar } = Search;
  const node_id = location.state.node_id;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://95.179.226.113:5000/get-resources", {
        params: {
          node_id: node_id,
          from: "2020-09-04 11:50:23",
          to: "2020-12-04 11:50:23"
        }
      });
      setServerStats(result.data);
    };
    fetchData();
  }, []);

  const chartCPU = [];
  for (var i = 0; i < serverStats.length; i++) {
    chartCPU.push({
      x: new Date(serverStats[i].time_stamp),
      y: serverStats[i].cpu
    });
  }
  console.log(chartCPU)

  const chartRAM = [];
  for (var i = 0; i < serverStats.length; i++) {
    chartRAM.push({
      x: new Date(serverStats[i].time_stamp),
      y: parseFloat(serverStats[i].ram)
    });
  }

  const chartBandwidth = [];
  for (var i = 0; i < serverStats.length; i++) {
    chartBandwidth.push({
      x: new Date(serverStats[i].time_stamp),
      y: parseFloat(serverStats[i].bandwidth)
    });
  }


  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://95.179.226.113:5000/network-package", {
        params: {
          node_id: node_id,
          from: "2020-10-04 11:50:23",
          to: "2020-12-04 11:50:23"
        }
      });
      setData(result.data);
    };
    fetchData();
  }, []);

  const serverTable = [];
    for (var i = 0; i < data.length; i++) {
      serverTable.push({
        Timestamp: new Date(data[i].time_stamp),
        Protocol: data[i].cpu,
        Size: data[i].cpu,
        Destination: data[i].cpu,
        DestinationPort: data[i].cpu,
        Source: data[i].cpu,
        SourcePort: data[i].cpu,
        Layer: data[i].cpu,
      });
    }


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
      xValueFormatString:"YYYY-MM-DD hh:mm:ss",
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
