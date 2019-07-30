import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Icon from "./utils/Icon";
import { ICONS } from "../utils/constants/icons";

const FileItem = props => {
  const { file } = props;
  return (
    <Grid container alignItems="flex-start" spacing={2}>
      <Grid item>
        <Icon icon={ICONS["FILE"]} />
      </Grid>
      <Grid item xs>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography>{file.name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" color="textSecondary">
              {file.size}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" color="textSecondary">
              {file.type}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {props.children && <Grid item>{props.children}</Grid>}
    </Grid>
  );
};

export default FileItem;
