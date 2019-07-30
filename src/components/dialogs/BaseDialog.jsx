import React from "react";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import DialogTitle from "@material-ui/core/DialogTitle";

import Icon from "../utils/Icon";
import { ICONS } from "../../utils/constants/icons";

export default function BaseDialog(props) {
  const { open, handleClose, title, content, actions, ...rest } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      {...rest}
    >
      <DialogTitle id="alert-dialog-title">
        <Grid container alignItems="baseline">
          <Grid item xs>
            {title}
          </Grid>
          <Grid item>
            <IconButton onClick={handleClose}>
              <Icon icon={ICONS["X"]} size={16} />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>{content}</DialogContent>
      <Divider />
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
}
