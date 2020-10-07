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
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Server from "views/Server/Server";
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
    path: "/Table",
    name: "Server",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/User",
    name: "API",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/Typography",
    name: "Bandwith",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/Icons",
    name: "Logs",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/Server",
    name: "Server Details",
    icon: BubbleChart,
    component: Server,
    layout: "/admin"
  }
];

export default dashboardRoutes;
