import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Link from "@material-ui/core/Link";

import { withStyles } from "@material-ui/core/styles";
import FilesDropper from "../utils/FilesDropper";
import { localizationParser } from "../../utils/FileUtils";
import FileItem from "../FileItem";
import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";
import isNil from "lodash/isNil";
import Icon from "../utils/Icon";
import { ICONS } from "../../utils/constants/icons";

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
    padding: theme.spacing(2),
    flexDirection: "column"
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
      locale: {},
      file: null,
      fileData: null
    };
  }

  handleChange = ev => {
    if (ev && ev.target) this.setState({ [ev.target.name]: ev.target.value });
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
    localizationParser(this.state.locale, this.state.file)
      .then(data => this.props.handleImport(data))
      .catch(err => console.error(err));
  };

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.locales, this.props.locales)) {
      if (this.props.locales.length === 1) {
        this.setState({ locale: this.props.locales[0] });
      }
    }
  }

  resetState = () => {
    this.setState({ locale: {}, file: null, fileData: null });
  };

  render() {
    const { classes, open, handleClose, showLocalesManager } = this.props;
    console.log(
      this.state,
      isEmpty(this.state.locale),
      isEmpty(this.state.file)
    );
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="md"
        onEnter={this.resetState}
      >
        <DialogTitle id="form-dialog-title">
          <Grid container spacing={1}>
            <Grid item>
              <Icon icon={ICONS["UPLOAD"]} size={32} />
            </Grid>
            <Grid item style={{ flexGrow: 1 }}>
              Import file
            </Grid>
            <Grid item>
              <IconButton onClick={handleClose}>
                <Icon icon={ICONS["X"]} size={16} />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl
                className={classes.formControl}
                fullWidth
                disabled={isEmpty(this.props.locales)}
              >
                <InputLabel htmlFor="age-simple">Locale</InputLabel>
                <Select
                  name="locale"
                  value={this.state.locale}
                  onChange={this.handleChange}
                >
                  {this.props.locales.map((locale, key) => (
                    <MenuItem value={locale} key={key}>{`${locale.i} (${
                      locale.l
                    }:${locale.c})`}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Link
                component="button"
                variant="body1"
                onClick={showLocalesManager}
              >
                Manage locales...
              </Link>
            </Grid>

            <Grid item xs={12}>
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
                    <FileItem file={this.state.file}>
                      <IconButton>
                        <Icon icon={ICONS.X} size={16} />
                      </IconButton>
                    </FileItem>
                  ) : (
                    <React.Fragment>
                      <Typography color="primary">Drop files here</Typography>
                      <Typography color="textSecondary">or</Typography>
                      <Typography color="primary">Click to browse</Typography>
                    </React.Fragment>
                  )}
                </div>
              </FilesDropper>
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            disabled={isEmpty(this.state.locale) || isNil(this.state.file)}
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

const mapStateToProps = (state, ownProps) => {
  return {
    locales: state.locales
  };
};
export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(ImportFileDialog));
