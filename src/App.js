import React, { Component } from "react";
import { connect } from "react-redux";
import TopBar from "./components/TopBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import FolderIcon from "@material-ui/icons/FolderOpenRounded";
import ImportExport from "@material-ui/icons/ImportExport";
import EditIcon from "@material-ui/icons/Add";
import LocalizationTable from "./components/LocalizationTable";
import ImportFileDialog from "./components/dialogs/ImportFileDialog";
import ACTIONS from "./modules/actions";
import withStyles from "@material-ui/styles/withStyles";
import withTheme from "@material-ui/styles/withTheme";
import DialogEditKey from "./components/dialogs/DialogEditKey";
import DialogDeleteKeyConfirm from "./components/dialogs/DialogDeleteKeyConfirm";
import DialogConfirmDeleteLocale from "./components/dialogs/DialogConfirmDeleteLocale";
import Icon from "./components/utils/Icon";
import { ICONS } from "./utils/constants/icons";
import { Divider, Badge, Typography, Link } from "@material-ui/core";
import DialogLocales from "./components/dialogs/DialogLocales";
import AutomaticTranslationDialog from "./components/dialogs/AutomaticTranslationDialog";

const styles = theme => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  table: {
    maxHeight: "calc(100vh - 145px)",
    overflow: "auto"
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      importDialogOpen: false,
      editKeyDialogOpen: false,
      openDeleteRowDialog: false,
      selKey: null,
      selLocale: null,
      deleteLocaleDialogOpen: false,
      localesDialogOpen: false,
      automaticTranslationDialogOpen: false,
      selectedKeyData: null,
      selectedKey: ""
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

  showEditKeyDialog = (localizationData, selectedKey) => {
    console.log(localizationData, selectedKey);
    this.setState({
      editKeyDialogOpen: true,
      selectedKeyData: localizationData,
      selectedKey: selectedKey || ""
    });
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

  confirmDeleteKey = key => {
    this.props.removeLocalizedString(key);
    this.setState({ selKey: null, openDeleteRowDialog: false });
  };

  showConfirmDeleteLocale = locale => {
    this.setState({ selLocale: locale, deleteLocaleDialogOpen: true });
  };

  closeConfirmDeleteLocale = () => {
    this.setState({ deleteLocaleDialogOpen: false });
  };

  confirmDeleteLocale = () => {
    this.props.removeLocale(this.state.selLocale);
    this.setState({ selLocale: null, deleteLocaleDialogOpen: false });
  };

  showLocalesDialog = () => {
    this.setState({ localesDialogOpen: true });
  };
  closeLocalesDialog = () => {
    this.setState({ localesDialogOpen: false });
  };

  showAutomaticTranslationDialog = () => {
    this.setState({ automaticTranslationDialogOpen: true });
  };
  closeAutomaticTranslationDialog = () => {
    this.setState({ automaticTranslationDialogOpen: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <ImportFileDialog
          open={this.state.importDialogOpen}
          handleClose={this.closeImportDialog}
          handleImport={this.handleFileImport}
          showLocalesManager={this.showLocalesDialog}
        />
        <DialogEditKey
          open={this.state.editKeyDialogOpen}
          handleClose={this.closeEditKeyDialog}
          confirmUpdate={this.confirmSave}
          translations={this.state.selectedKeyData}
          selKey={this.state.selectedKey}
        />
        <DialogDeleteKeyConfirm
          open={this.state.openDeleteRowDialog}
          localizationKey={this.state.selKey}
          handleClose={this.closeConfirmDeleteRow}
          confirmDeleteKey={this.confirmDeleteKey}
        />
        <DialogConfirmDeleteLocale
          open={this.state.deleteLocaleDialogOpen}
          locale={this.state.selLocale}
          handleClose={this.closeConfirmDeleteLocale}
          confirmDeleteLocale={this.confirmDeleteLocale}
        />
        <DialogLocales
          open={this.state.localesDialogOpen}
          handleClose={this.closeLocalesDialog}
        />

        <AutomaticTranslationDialog
          open={this.state.automaticTranslationDialogOpen}
          handleClose={this.closeAutomaticTranslationDialog}
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
              <Tooltip title={"Manage locales"}>
                <IconButton onClick={this.showLocalesDialog}>
                  <Badge
                    className={classes.margin}
                    badgeContent={
                      this.props.locales ? this.props.locales.length : 0
                    }
                    max={10}
                    color="primary"
                  >
                    <Icon icon={ICONS.BOOK} />
                  </Badge>
                </IconButton>
              </Tooltip>

              <Tooltip title={"Add a new Translation key"}>
                <div>
                  <IconButton
                    disabled={
                      !this.props.locales || this.props.locales.length === 0
                    }
                    onClick={() => this.showEditKeyDialog(null, null)}
                  >
                    <Icon icon={ICONS.EDIT} />
                  </IconButton>
                </div>
              </Tooltip>

              <Tooltip title={"Import existing localization file"}>
                <IconButton onClick={this.showImportDialog}>
                  <Icon icon={ICONS["UPLOAD"]} />
                </IconButton>
              </Tooltip>

              <Tooltip title={"Generate translations"}>
                <IconButton onClick={this.showAutomaticTranslationDialog}>
                  <Icon icon={ICONS["DOWNLOAD-CLOUD"]} />
                </IconButton>
              </Tooltip>
            </Toolbar>
            <Divider />
          </Grid>
          {false && (
            <Grid item xs={12}>
              <Toolbar>
                <IconButton variant="contained" color="primary">
                  <AddIcon />
                </IconButton>
                <IconButton variant="contained" color="primary">
                  <ImportExport />
                </IconButton>
                {Object.keys(ICONS).map(iconKey => (
                  <Tooltip title={iconKey} key={iconKey}>
                    <IconButton variant="contained" color="primary">
                      <Icon icon={ICONS[iconKey]} size={16} />
                    </IconButton>
                  </Tooltip>
                ))}
              </Toolbar>
            </Grid>
          )}
          <Grid item xs={12}>
            {this.props.locales && this.props.locales.length > 0 ? (
              <div>
                <LocalizationTable
                  showConfirmDeleteRow={this.showConfirmDeleteRow}
                  showConfirmDeleteLocale={this.showConfirmDeleteLocale}
                  showEditKeyDialog={this.showEditKeyDialog}
                  showImportDialog={this.showImportDialog}
                />
              </div>
            ) : (
              <React.Fragment>
                <Divider />
                <Grid
                  container
                  direction="column"
                  alignContent="center"
                  alignItems="center"
                  style={{ padding: "2em" }}
                >
                  <Grid item>
                    <Icon
                      icon={ICONS.BOOK}
                      size={250}
                      color={"rgba(0,0,0,0.1)"}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" color="textSecondary">
                      Add locales!
                    </Typography>
                  </Grid>
                  <Typography variant="subtitle2" color="textSecondary">
                    <Link
                      component="button"
                      variant="subtitle2"
                      onClick={this.showLocalesDialog}
                    >
                      Manage
                    </Link>{" "}
                    your locales or{" "}
                    <Link
                      component="button"
                      variant="subtitle2"
                      onClick={this.showImportDialog}
                    >
                      import
                    </Link>{" "}
                    existing localization files.
                  </Typography>
                </Grid>
                <Divider />
              </React.Fragment>
            )}
          </Grid>
        </Grid>
        <Fab
          color="secondary"
          className={classes.fab}
          onClick={() => this.showEditKeyDialog(null, null)}
        >
          <EditIcon />
        </Fab>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    locales: state.locales
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    importFile: (locale, localizationStrings) =>
      dispatch(ACTIONS.importFile(locale, localizationStrings)),
    removeLocalizedString: key => dispatch(ACTIONS.removeLocalizedString(key)),
    removeLocale: locale => dispatch(ACTIONS.removeLocale(locale))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTheme(App)));
