import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { ICONS } from "../utils/constants/icons";
import Icon from "./utils/Icon";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  logo: {
    marginRight: theme.spacing(),
    color: theme.palette.primary.light
  }
}));

export default function MenuAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <span className={classes.logo}>
            <Icon icon={ICONS.LANGUAGE} size={48} />
          </span>
          <Typography variant="h6" className={classes.title}>
            Localization App
          </Typography>
          {props.children}
        </Toolbar>
      </AppBar>
    </div>
  );
}
