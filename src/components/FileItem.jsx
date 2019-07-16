import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FileIcon from "@material-ui/icons/DescriptionOutlined";

const FileItem = props => {
  const { file } = props;
  return (
    <Grid container alignItems="flex-start" spacing={2}>
      <Grid item>
        <FileIcon fontSize="large" color="action" />
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
