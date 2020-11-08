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

import { dailySalesChart, completedTasksChart } from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

const columns = [
  {
    dataField: "cluster",
    text: "Cluster",
    sort: true,
  }
];


export default function Dashboard() {
  const [data, setData] = useState([]);
  const classes = useStyles();

  const { SearchBar } = Search;
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://217.69.10.141:5000/get-clusters");
      setData(result.data);
    };
    fetchData();
  }, []);

  const clusterTable = [];
  for (var i = 0; i < data.length; i++) {
    clusterTable.push({
      cluster: data[i].c_id,
    });
  }

  return (
    <div>
      <Card>
        <CardHeader color="warning">
          <h4 className={classes.cardTitleWhite}>Cluster Overview</h4>
          <p className={classes.cardCategoryWhite}>List of Clusters</p>
        </CardHeader>
        <CardBody>
          <ToolkitProvider
            keyField="node"
            data={clusterTable}
            columns={columns}
            search
          >
            {(props) => (
              <div>
                <SearchBar {...props.searchProps} />
                <BootstrapTable
                  {...props.baseProps}
                  keyField="node"
                  data={clusterTable}
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
