import React from "react";
import TopBar from "./components/TopBar";
import { Typography, Grid } from "@material-ui/core";

function App() {
  return (
    <div>
      <TopBar />
      <Grid container>
        <Grid item xs={12} />
      </Grid>
    </div>
  );
}

export default App;
