import {
  AccountBalanceOutlined,
  PermContactCalendar,
} from "@material-ui/icons";

const Routes = [
  {
    path: "/companies",
    sidebarName: "Companies",
    navbarName: "Companies",
    icon: AccountBalanceOutlined,
  },
  {
    path: "/contacts",
    sidebarName: "Contacts",
    navbarName: "Contacts",
    icon: PermContactCalendar,
  },
];

export default Routes;
