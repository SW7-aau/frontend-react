import React, { useState, useEffect } from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useLocation } from "react-router-dom";
// react plugin for creating charts
import CanvasJSReact from "assets/canvasjs.react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const useStyles = makeStyles(styles);

const columns = [
  {
    dataField: "Index",
    text: "Index",
    sort: true,
  },
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
  },
];


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
          to: "2020-12-04 11:50:23",
        },
      });
      setServerStats(result.data);
    };
    fetchData();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const chartCPU = [];
  for (var i = 0; i < serverStats.length; i++) {
    chartCPU.push({
      x: new Date(serverStats[i].time_stamp),
      y: serverStats[i].cpu,
    });
  }

  const chartRAM = [];
  for (var j = 0; j < serverStats.length; j++) {
    chartRAM.push({
      x: new Date(serverStats[j].time_stamp),
      y: parseFloat(serverStats[j].ram),
    });
  }

  const chartBandwidth = [];
  for (var k = 0; k < serverStats.length; k++) {
    chartBandwidth.push({
      x: new Date(serverStats[k].time_stamp),
      y: parseFloat(serverStats[k].bandwidth),
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://95.179.226.113:5000/network-package", {
        params: {
          node_id: node_id,
          from: "2020-09-04 11:50:23",
          to: "2020-12-04 11:50:23",
        },
      });
      setData(result.data);
    };
    fetchData();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const serverTable = [];
  for (var l = 0; l < data.length; l++) {
    serverTable.push({
      Index: l,
      Timestamp: data[l].timestamp,
      Protocol: data[l].protocol,
      Size: data[l].size,
      Destination: data[l].dst,
      DestinationPort: data[l].dst_port,
      Source: data[l].src,
      SourcePort: data[l].src_port,
      Layer: data[l].layer,
    });
  }




  const CPUoptions = {
    theme: "light2", // "light1", "dark1", "dark2"
    animationEnabled: true,
    zoomEnabled: true,
    title: {
      text: "CPU",
    },
    axisY: {
      maximum: 100,
    },
    data: [
      {
        type: "line",
        yValueFormatString: "## '%'",
        xValueFormatString: "YYYY-MM-DD hh:mm:ss",
        dataPoints: chartCPU,
      },
    ],
  };

  const RAMoptions = {
    theme: "light2", // "light1", "dark1", "dark2"
    animationEnabled: true,
    zoomEnabled: true,
    title: {
      text: "RAM",
    },
    data: [
      {
        type: "line",
        yValueFormatString: "##.# '%'",
        xValueFormatString: "YYYY-MM-DD hh:mm:ss",
        dataPoints: chartRAM,
      },
    ],
  };

  const Bandwidthoptions = {
    theme: "light2", // "light1", "dark1", "dark2"
    animationEnabled: true,
    zoomEnabled: true,
    title: {
      text: "Bandwidth",
    },
    data: [
      {
        type: "line",
        yValueFormatString: "##.# '%'",
        xValueFormatString: "YYYY-MM-DD hh:mm:ss",
        dataPoints: chartBandwidth,
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart options={CPUoptions} />
      <CanvasJSChart options={RAMoptions} />
      <CanvasJSChart options={Bandwidthoptions} />

      <Card style={{ zIndex: 1 }}>
        <CardHeader color="warning">
          <h4 className={classes.cardTitleWhite}> Network Packages </h4>{" "}
        </CardHeader>{" "}
        <CardBody>
          <ToolkitProvider
            keyField="Index"
            data={serverTable}
            columns={columns}
            search
          >
            {(props) => (
              <div>
                <SearchBar {...props.searchProps} />
                <BootstrapTable
                  {...props.baseProps}
                  keyField="Index"
                  data={serverTable}
                  columns={columns}
                  pagination={paginationFactory()}
                  striped
                />
              </div>
            )}
          </ToolkitProvider>
        </CardBody>{" "}
      </Card>
    </div>
  );
}
