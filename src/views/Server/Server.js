import React, { useState, useEffect } from "react";
import classNames from "classnames";
import BootstrapTable from "react-bootstrap-table-next";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
// @material-ui/icons
import Notifications from "@material-ui/icons/Notifications";
// core components
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import Table from "components/Table/Table.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Sort } from "@material-ui/icons";
import zIndex from "@material-ui/core/styles/zIndex";
import axios from "axios";

const useStyles = makeStyles(styles);

export default function Server() {
    const classes = useStyles();
    const [openNotification, setOpenNotification] = React.useState(null);
    const handleClickNotification = event => {
        if (openNotification && openNotification.contains(event.target)) {
            setOpenNotification(null);
        } else {
            setOpenNotification(event.currentTarget);
        }
    };
    const handleCloseNotification = () => {
        setOpenNotification(null);
    };


    //  the beginning of fetching data through an API
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await axios("api link here");
            setData(result.data);
        })();
    }, []);

    const columns = [{
        dataField: 'node',
        text: 'Node',
        sort: true
      }, {
        dataField: 'cluster',
        text: 'Cluster',
        sort: true
      }, {
        dataField: 'ip',
        text: 'IP',
        sort: true
      }];

      const products = [{
          node: 'Node 1',
          cluster: 'Cluster 1',
          ip: 'Address 1'
      },
      {
        node: 'Node 2',
        cluster: 'Cluster 2',
        ip: 'Address 2'
    },
    {
        node: 'Node 3',
        cluster: 'Cluster 1',
        ip: 'Address 2'
    }
    ];

    return (

        
        <div>
            <div className={classes.manager}>
                <Button
                    color={window.innerWidth > 959 ? "transparent" : "white"}
                    justIcon={window.innerWidth > 959}
                    simple={!(window.innerWidth > 959)}
                    aria-owns={openNotification ? "notification-menu-list-grow" : null}
                    aria-haspopup="true"
                    onClick={handleClickNotification}
                    className={classes.buttonLink}
                >
                    <Notifications className={classes.icons} />
                    <span className={classes.notifications}>5</span>
                    <Hidden mdUp implementation="css">
                        <p onClick={handleCloseNotification} className={classes.linkText}>
                            Notification
            </p>
                    </Hidden>
                </Button>
                <Poppers
                    open={Boolean(openNotification)}
                    anchorEl={openNotification}
                    transition
                    disablePortal
                    style={{zIndex: 100}}
                    className={
                        classNames({ [classes.popperClose]: !openNotification }) +
                        " " +
                        classes.popperNav
                    }
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            id="notification-menu-list-grow"
                            style={{
                                transformOrigin:
                                    placement === "bottom" ? "center top" : "center bottom"
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleCloseNotification}>
                                    <MenuList role="menu">
                                        <MenuItem
                                            onClick={handleCloseNotification}
                                            className={classes.dropdownItem}
                                        >
                                            Server 1
                    </MenuItem>
                                        <MenuItem
                                            onClick={handleCloseNotification}
                                            className={classes.dropdownItem}
                                        >
                                            Server 2
                    </MenuItem>
                                        <MenuItem
                                            onClick={handleCloseNotification}
                                            className={classes.dropdownItem}
                                        >
                                            Server 3
                    </MenuItem>
                                        <MenuItem
                                            onClick={handleCloseNotification}
                                            className={classes.dropdownItem}
                                        >
                                            Server 4
                    </MenuItem>
                                        <MenuItem
                                            onClick={handleCloseNotification}
                                            className={classes.dropdownItem}
                                        >
                                            Server 5
                    </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Poppers>
            </div>

            

            <Card>
                    <CardHeader color="warning">
                        <h4 className={classes.cardTitleWhite}>Server Overview</h4>
                        <p className={classes.cardCategoryWhite}>
                            List of Servers
              </p>
                    </CardHeader>
                    <CardBody>
                    <BootstrapTable keyField="node" data={ products } columns={ columns } striped />
                    </CardBody>
                </Card>
        </div>
    );
}