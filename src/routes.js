/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import BubbleChart from "@material-ui/icons/BubbleChart";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import ServerOverview from "views/ServerOverview/ServerOverview.js"
import ServerDetails from "views/Server/Server.js";
// core components/views for RTL layout

const dashboardRoutes = [
  {
    path: "/Dashboard",
    name: "Home",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/ServerOverview",
    name: "Server Overview",
    icon: "content_paste",
    component: ServerOverview,
    layout: "/admin"
  },
  {
    path: "/ServerDetails",
    name: "Server Details",
    icon: BubbleChart,
    component: ServerDetails,
    layout: "/admin"
  }
];

export default dashboardRoutes;
