import React, { useState, useEffect } from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import useForceUpdate from 'use-force-update';
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import AccessTime from "@material-ui/icons/AccessTime";
// core components
import TextField from "@material-ui/core/TextField";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { dailySalesChart, completedTasksChart } from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

const linkFormatter = (cell, row, rowIndex) => {
  return (
    <Link to={
      {
        pathname: "ServerOverview",
        state: {
          cluster_id: cell
        }
      }
    }> {cell} </Link>
  )
}

const columns = [
  {
    dataField: "cluster",
    text: "Cluster",
    sort: true,
    formatter: linkFormatter
  },
  {
    dataField: "count",
    text: "Server Count",
    sort: true,
  }
];


export default function Dashboard() {
  const [data, setData] = useState([]);
  const classes = useStyles();
  const [cluster_id, setCluster_id] = useState("");


  const { SearchBar } = Search;
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://95.179.226.113:5000/get-server-count");
      setData(result.data);
    };
    fetchData();
  }, []);

  const clusterTable = [];
  for (var i = 0; i < data.length; i++) {
    clusterTable.push({
      cluster: data[i].c_id,
      count: data[i].total
    });
  }
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div>
      <Card>
        <CardHeader color="warning">
          <h4 className={classes.cardTitleWhite}>Cluster Overview</h4>
          <p className={classes.cardCategoryWhite}>List of Clusters</p>
        </CardHeader>
        <CardBody>
        <Popup trigger={<button> Add Cluster </button>} modal>
            {(close) => (
              <div>
                <form className={classes.root} noValidate autoComplete="off">
                  <TextField
                    required
                    id="cluster_id"
                    value={cluster_id}
                    label="cluster_id"
                    onChange={(e) => setCluster_id(e.target.value)}
                  />{" "}
                  </form>
                <button
                  className="button"
                  onClick={() => {
                    if ((cluster_id != "")) {
                      axios.post("http://95.179.226.113:5000/add-cluster", {}, {
                        params:
                        {
                          cluster_id: cluster_id,
                        },
                      })
                        .then(function (response) {
                          console.log(response);
                        })
                        .catch(function (error) {
                          console.log(error);
                        });
                      close();
                      refreshPage();
                    }
                  }}
                >
                  Confirm
                </button>
                <button
                  className="button"
                  onClick={() => {
                    console.log("modal closed ");
                    close();
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </Popup>
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
