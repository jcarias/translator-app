import React, { Component } from "react";
import { connect } from "react-redux";
import TopBar from "./components/TopBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/AddLocation";
import FolderIcon from "@material-ui/icons/FolderOpenRounded";
import ImportExport from "@material-ui/icons/ImportExport";
import EditIcon from "@material-ui/icons/Edit";
import LocalizationTable from "./components/LocalizationTable";
import ImportFileDialog from "./components/dialogs/ImportFileDialog";
import ACTIONS from "./modules/actions";
import withStyles from "@material-ui/styles/withStyles";
import DialogEditKey from "./components/dialogs/DialogEditKey";
import DialogDeleteKeyConfirm from "./components/dialogs/DialogDeleteKeyConfirm";

const styles = theme => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      importDialogOpen: false,
      editKeyDialogOpen: false,
      openDeleteRowDialog: false,
      selKey: null
    };
  }

  showImportDialog = () => {
    this.setState({ importDialogOpen: true });
  };

  closeImportDialog = () => {
    this.setState({ importDialogOpen: false });
  };

  handleFileImport = args => {
    this.props.importFile(args.locale, args.localizationStrings);
    this.closeImportDialog();
  };

  showEditKeyDialog = () => {
    this.setState({ editKeyDialogOpen: true });
  };

  closeEditKeyDialog = () => {
    this.setState({ editKeyDialogOpen: false });
  };

  confirmSave = data => {
    console.log(data);
  };

  showConfirmDeleteRow = key => {
    this.setState({ selKey: key, openDeleteRowDialog: true });
  };

  closeConfirmDeleteRow = () => {
    this.setState({ openDeleteRowDialog: false });
  };

  confirmDelete = key => {
    this.props.removeLocalizedString(key);
    this.setState({ selKey: null, openDeleteRowDialog: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <ImportFileDialog
          open={this.state.importDialogOpen}
          handleClose={this.closeImportDialog}
          handleImport={this.handleFileImport}
        />
        <DialogEditKey
          open={this.state.editKeyDialogOpen}
          handleClose={this.closeEditKeyDialog}
          confirmUpdate={this.confirmSave}
        />
        <DialogDeleteKeyConfirm
          open={this.state.openDeleteRowDialog}
          localizationKey={this.state.selKey}
          handleClose={this.closeConfirmDeleteRow}
          confirmDeleteKey={this.confirmDelete}
        />
        <TopBar>
          <Tooltip title="Import existing localization files">
            <IconButton color="inherit" onClick={this.showImportDialog}>
              <FolderIcon />
            </IconButton>
          </Tooltip>
        </TopBar>
        <Grid container>
          <Grid item xs={12}>
            <Toolbar>
              <IconButton variant="contained" color="primary">
                <AddIcon />
              </IconButton>
              <IconButton variant="contained" color="primary">
                <ImportExport />
              </IconButton>
            </Toolbar>
          </Grid>
          <Grid item xs={12}>
            <LocalizationTable
              showConfirmDeleteRow={this.showConfirmDeleteRow}
            />
          </Grid>
        </Grid>
        <Fab
          color="secondary"
          className={classes.fab}
          onClick={this.showEditKeyDialog}
        >
          <EditIcon />
        </Fab>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    importFile: (locale, localizationStrings) =>
      dispatch(ACTIONS.importFile(locale, localizationStrings)),
    removeLocalizedString: key => dispatch(ACTIONS.removeLocalizedString(key))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));
