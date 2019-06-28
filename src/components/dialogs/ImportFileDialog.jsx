import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FilesDropper from "../utils/FilesDropper";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  draggingClass: {
    opacity: 0.5
  }
});

class ImportFileDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
  }

  handleFilesChanged = files => {
    console.log(files);
  };

  render() {
    const { classes, open, handleClose } = this.props;
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <FilesDropper
            componentId="import-files"
            handleDrop={this.handleFilesChanged}
            accept="application/json"
            draggingClass={classes.draggingClass}
          >
            <div>
              {this.state.file ? (
                <span>{this.state.file.name}</span>
              ) : (
                <Typography variant="caption">Drop File Here</Typography>
              )}
            </div>
          </FilesDropper>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ImportFileDialog);
