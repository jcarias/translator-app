import React, { Component } from "react";
import { connect } from "react-redux";
import TopBar from "./components/TopBar";
import { Grid, Toolbar, Button, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/AddLocation";
import FolderIcon from "@material-ui/icons/FolderOpen";
import ImportExport from "@material-ui/icons/ImportExport";
import LocalizationTable from "./components/LocalizationTable";
import ImportFileDialog from "./components/dialogs/ImportFileDialog";
import ACTIONS from "./modules/actions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      importDialogOpen: false
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

  render() {
    return (
      <div>
        <ImportFileDialog
          open={this.state.importDialogOpen}
          handleClose={this.closeImportDialog}
          handleImport={this.handleFileImport}
        />
        <TopBar />
        <Grid container>
          <Grid item xs={12}>
            <Toolbar>
              <IconButton variant="contained" color="primary">
                <AddIcon />
              </IconButton>
              <IconButton variant="contained" color="primary">
                <ImportExport />
              </IconButton>
              <Button
                variant="contained"
                color="primary"
                onClick={this.showImportDialog}
              >
                <FolderIcon />
              </Button>
            </Toolbar>
          </Grid>
          <Grid item xs={12}>
            <LocalizationTable />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    importFile: (locale, localizationStrings) => {
      dispatch(ACTIONS.importFile(locale, localizationStrings));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
