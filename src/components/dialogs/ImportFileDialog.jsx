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
import { Typography, Grid } from "@material-ui/core";

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
  emptyDropArea: {
    minHeight: theme.spacing(10),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.background.default,
    border: "2px dashed",
    borderColor: theme.palette.primary.main,
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2)
  },
  draggingClass: {
    backgroundColor: theme.palette.primary.main.light,
    opacity: 0.5
  }
});

class ImportFileDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: "en-EN",
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
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="form-dialog-title">Import file</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select the file with localization string to import
          </DialogContentText>
          <FilesDropper
            componentId="import-files"
            handleDrop={this.handleFilesChanged}
            accept="application/json"
            draggingClass={classes.draggingClass}
          >
            <div className={classes.emptyDropArea}>
              {this.state.file ? (
                <span>{this.state.file.name}</span>
              ) : (
                <Typography>Drop files here</Typography>
              )}
            </div>
          </FilesDropper>

          <TextField
            autoFocus
            margin="dense"
            id="locale"
            name="locale"
            label="Locale"
            type="text"
            value={this.state.locale}
            placeholder="e.g. en-EN"
            helperText="Enter a locale using a ISO 639-1 language code and a ISO 3166-2 country code."
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" variant="contained">
            Import
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ImportFileDialog);
