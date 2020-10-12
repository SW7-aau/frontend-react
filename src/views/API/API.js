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
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { dailySalesChart, completedTasksChart } from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

const columns = [
  {
    dataField: "APIName",
    text: "API Name",
    sort: true,
  },
  {
    dataField: "ResponseTime",
    text: "Response Time",
    sort: true,
  },
  {
    dataField: "Status",
    text: "Status",
    sort: true,
  },
];

const products = [
  {
    APIName: "API 1",
    ResponseTime: "Response Time 1",
    Status: "active",
  },
  {
    APIName: "API 2",
    ResponseTime: "Response Time 2",
    Status: "inactive",
  },
  {
    APIName: "API 3",
    ResponseTime: "Response Time 3",
    Status: "Active",
  },
];

export default function API() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const { SearchBar } = Search;
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:5000/API");
      setData(result.data);
    };
    fetchData();
  }, []);

  const chartUptime = {
    labels: data.map((status) => status.time_stamp),
    series: [data.map((status) => status.Uptime)],
  };

  const chartResponse = {
    labels: data.map((status) => status.time_stamp),
    series: [data.map((status) => status.response_time)],
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

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
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
              <h4 className={classes.cardTitle}>Uptime%</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>39%</span> Current uptime
                %
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minute(s) ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
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
              <h4 className={classes.cardTitle}>Average response time</h4>
              <p className={classes.cardCategory}>
                Current response time
                <span className={classes.successText}> 39ms</span>
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
          <h4 className={classes.cardTitleWhite}>API Overview</h4>
          <p className={classes.cardCategoryWhite}>List APIs</p>
        </CardHeader>
        <CardBody>
          <Button
            marginLeft="auto"
            color={window.innerWidth > 959}
            //justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            aria-owns={openNotification ? "notification-menu-list-grow" : null}
            aria-haspopup="true"
            onClick={handleClickNotification}
            className={classes.buttonLink}
          >
            <span className={classes.notifications}>Add API</span>
          </Button>

          <ToolkitProvider
            keyField="APIName"
            data={products}
            columns={columns}
            search
          >
            {(props) => (
              <div>
                <SearchBar {...props.searchProps} />
                <BootstrapTable
                  {...props.baseProps}
                  keyField="APIName"
                  data={products}
                  columns={columns}
                  striped
                />
              </div>
            )}
          </ToolkitProvider>
        </CardBody>
      </Card>
    </div>
  );
}
