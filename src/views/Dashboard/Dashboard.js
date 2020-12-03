import React, { useState, useEffect } from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import TextField from "@material-ui/core/TextField";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

const linkFormatter = (cell, row, rowIndex) => {
  return (
    <Link
      to={{
        pathname: "ServerOverview",
        state: {
          cluster_id: cell,
        },
      }}
    >
      {" "}
      {cell}{" "}
    </Link>
  );
};

const columns = [
  {
    dataField: "cluster",
    text: "Cluster",
    sort: true,
    formatter: linkFormatter,
  },
  {
    dataField: "count",
    text: "Server Count",
    sort: true,
  },
];

export default function Dashboard() {
  const [data, setData] = useState([]);
  const classes = useStyles();
  const [cluster_id, setCluster_id] = useState("");
  const [old_cluster_id, setOldCluster_id] = useState("");
  const [new_cluster_id, setNewCluster_id] = useState("");


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
      count: data[i].total,
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
                    if (cluster_id !== "") {
                      axios
                        .post(
                          "http://95.179.226.113:5000/add-cluster",
                          {},
                          {
                            params: {
                              cluster_id: cluster_id,
                            },
                          }
                        )
                        .then(function (response) {
                          console.log(response);
                          refreshPage();
                        })
                        .catch(function (error) {
                          console.log(error);
                        });
                      close();
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
          <Popup trigger={<button> Edit Cluster </button>} modal>
            {(close) => (
              <div>
                <form className={classes.root} noValidate autoComplete="off">
                  <select
                    required
                    id="old_cluster_id"
                    value={old_cluster_id}
                    label="old_cluster_id"
                    onChange={(e) => setOldCluster_id(e.target.value)}
                  >
                    {clusterTable.map((table) => <option value={table.cluster}>{table.cluster}</option>)}
                  </select>
                  <TextField
                    required
                    id="new_cluster_id"
                    value={new_cluster_id}
                    label="new_cluster_id"
                    onChange={(e) => setNewCluster_id(e.target.value)}
                  />{" "}
                </form>
                <button
                  className="button"
                  onClick={() => {
                    axios
                      .put(
                        "http://95.179.226.113:5000/edit-cluster",
                        {},
                        {
                          params: {
                            old_cluster_id: old_cluster_id,
                            new_cluster_id: new_cluster_id,
                          },
                        }
                      )
                      .then(function (response) {
                        console.log(response);
                        refreshPage();
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                    close();
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
          <Popup trigger={<button> Delete Cluster </button>} modal>
            {(close) => (
              <div>
                <form className={classes.root} noValidate autoComplete="off">
                  <select
                    required
                    id="delete_cluster_id"
                    value={cluster_id}
                    label="cluster_id"
                    onChange={(e) => setCluster_id(e.target.value)}
                  >
                    {clusterTable.map((table) => <option value={table.cluster}>{table.cluster}</option>)}
                  </select>
                </form>
                <button
                  className="button"
                  onClick={() => {
                    if (cluster_id !== "") {
                      axios
                        .delete(
                          "http://95.179.226.113:5000/delete-cluster",
                          {
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            params: {
                              cluster_id: cluster_id,
                            },
                          }
                        )
                        .then(function (response) {
                          console.log(response);
                          refreshPage();
                        })
                        .catch(function (error) {
                          console.log(error);
                        });
                      close();

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
            keyField="cluster"
            data={clusterTable}
            columns={columns}
            search
          >
            {(props) => (
              <div>
                <SearchBar {...props.searchProps} />
                <BootstrapTable
                  {...props.baseProps}
                  keyField="cluster"
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
