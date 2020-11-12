import React, { useState, useEffect } from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { Link, useLocation } from "react-router-dom";
import Popup from "reactjs-popup";
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
import Button from "components/CustomButtons/Button.js";
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
        pathname: "ServerDetails",
        state: {
          node_id: cell
        }
      }
    }> {cell} </Link>
  )
}

const columns = [
  {
    dataField: "node_id",
    text: "Node ID",
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
    formatter: linkFormatter
  },
  {
    dataField: "active",
    text: "Active",
    sort: true,
  },
];

export default function ServerOverview() {
  let location = useLocation();
  const [data, setData] = useState([]);
  const [ServerOverview, setServer] = useState([]);
  const classes = useStyles();

  const [node_id, setNode_id] = useState("");
  const [ip_address, setIp_Address] = useState("");
  const [active, setActive] = useState("");
  const { SearchBar } = Search;

  const c_id = location.state.cluster_id;

  /*
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://217.69.10.141:5000/get-avg-ram", {
        params: {
          cluster_id: "3000"
        }
      });
      setData(result.data);
    };
    fetchData();
  }, []);
*/


  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://95.179.226.113:5000/get-nodes", {
        params: {
          cluster_id: c_id,
        },
      });
      setServer(result.data);
    };
    fetchData();
  }, []);

  const serversTable = [];
  for (var i = 0; i < ServerOverview.length; i++) {
    serversTable.push({
      node_id: ServerOverview[i].id,
      cluster: ServerOverview[i].c_id,
      ip: ServerOverview[i].ip_address,
      active: ServerOverview[i].active,
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

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div>
      <Card>
        <CardHeader color="warning">
          <h4 className={classes.cardTitleWhite}> Server Overview </h4>
          <p className={classes.cardCategoryWhite}>List of Servers </p>
        </CardHeader>
        <CardBody>
          <Popup trigger={<button> Add Server </button>} modal>
            {(close) => (
              <div>
                <form className={classes.root} noValidate autoComplete="off">
                  <TextField
                    required
                    id="node_id"
                    value={node_id}
                    label="node_id "
                    onChange={(e) => setNode_id(e.target.value)}
                  />{" "}
                  <TextField
                    required
                    id="ip_address"
                    value={ip_address}
                    label="ip_address "
                    onChange={(e) => setIp_Address(e.target.value)}
                  />{" "}
                  <TextField
                    required
                    id="active"
                    value={active}
                    label="active "
                    onChange={(e) => setActive(e.target.value)}
                  />{" "}
                </form>
                <button
                  className="button"
                  onClick={() => {
                    if ((node_id, ip_address, active != "")) {
                      axios.post("http://95.179.226.113:5000/add-node", {}, {
                        params:
                        {
                          node_id: node_id,
                          cluster_id: c_id,
                          ip_address: ip_address,
                          active: active,
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
            data={serversTable}
            columns={columns}
            search
          >
            {(props) => (
              <div>
                <SearchBar {...props.searchProps} />
                <BootstrapTable
                  {...props.baseProps}
                  keyField="node"
                  data={serversTable}
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
