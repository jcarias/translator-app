import React, { Component } from "react";
import TopBar from "./components/TopBar";
import { Grid, Toolbar, Button, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/AddLocation";
import FolderIcon from "@material-ui/icons/FolderOpen";
import ImportExport from "@material-ui/icons/ImportExport";
import LocalizationTable from "./components/LocalizationTable";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        locales: ["en-EN", "pt-PT"],
        localizationData: {
          "hello-msg": {
            "en-EN": "Hello World",
            "pt-PT": "Olá Mundo"
          },
          "bey-msg": {
            "en-EN": "bey"
          },
          "btn-cancel": {
            "pt-PT": "Cancelar"
          },
          "long-demo-text": {
            "pt-PT":
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue turpis risus, id posuere ipsum hendrerit dignissim. Vivamus nibh urna, ornare at ex commodo, dapibus molestie quam. Donec iaculis felis nec odio laoreet finibus. Duis neque massa, hendrerit non augue a, porttitor aliquet nulla. Praesent ac ornare eros. Donec suscipit orci id purus hendrerit, in elementum enim aliquet. Fusce ultricies vitae ipsum sed cursus. Nunc nec mollis leo. Vestibulum quis volutpat nulla, eget aliquam augue. Aenean quis accumsan magna. Integer mattis, mauris id elementum ornare, purus urna suscipit dolor, nec aliquam ante nisl in lectus. Maecenas consectetur sed odio non finibus. Vestibulum posuere ante ut sem vestibulum sollicitudin. Nulla ultrices egestas lacus convallis sagittis. Vestibulum sed augue lobortis, rutrum sapien sit amet, volutpat enim.",
            "en-EN":
              "Cras nec risus at dolor hendrerit rhoncus. Duis in velit nulla. Phasellus ut odio eget dui tempor mattis. Donec varius eros ut tempor finibus. Quisque magna dolor, pharetra id vestibulum ac, consequat nec ligula. Nullam sit amet tristique nisi, id suscipit nibh. Duis convallis quis elit non aliquet."
          }
        }
      }
    };
  }
  render() {
    return (
      <div>
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
              <Button variant="contained" color="primary">
                <FolderIcon />
              </Button>
            </Toolbar>
          </Grid>
          <Grid item xs={12}>
            <LocalizationTable data={this.state.data} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
