import React, { Component } from "react";

import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./modules/store";

import TopBar from "./components/TopBar";
import { Grid, Toolbar, Button, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/AddLocation";
import FolderIcon from "@material-ui/icons/FolderOpen";
import ImportExport from "@material-ui/icons/ImportExport";
import LocalizationTable from "./components/LocalizationTable";
import ImportFileDialog from "./components/dialogs/ImportFileDialog";

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

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

  render() {
    return (
      <ReduxProvider store={configureStore()}>
        <div>
          <ImportFileDialog
            open={this.state.importDialogOpen}
            handleClose={this.closeImportDialog}
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
      </ReduxProvider>
    );
  }
}

export default App;
