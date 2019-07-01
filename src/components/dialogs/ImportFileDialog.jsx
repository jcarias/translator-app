import React, { Component } from "react";
import _ from "lodash";
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
import { localizationParser } from "../../utils/FileUtils";

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
      locale: "en-US",
      file: null,
      fileData: null
    };
  }

  handleChange = evt => {
    console.log(evt);
    if (evt && evt.target) {
      this.setState({ [evt.target.name]: evt.target.value });
    }
  };

  handleFilesChanged = files => {
    if (!_.isEmpty(files)) {
      const fileList = Object.keys(files).map(key => files.item(key));
      this.setState({ file: fileList[0] }, () =>
        localizationParser(this.state.locale, this.state.file)
          .then(data => this.setState({ fileData: data }))
          .catch(err => console.error(err))
      );
    }
  };

  handleImportClick = () => {
    return this.props.handleImport(this.state.fileData);
  };

  render() {
    const { classes, open, handleClose, handleImportClick } = this.props;
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
            onChange={this.handleChange}
          />
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
                <React.Fragment>
                  <Typography>{this.state.file.name}</Typography>
                  <Typography variant="caption">
                    {this.state.file.size}
                  </Typography>
                </React.Fragment>
              ) : (
                <Typography>Drop files here</Typography>
              )}
            </div>
          </FilesDropper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={this.handleImportClick}
            color="primary"
            variant="contained"
          >
            Import
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ImportFileDialog);
