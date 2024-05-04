import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";

class Loader extends React.Component {
  render() {
    return (
      <div>
        <Dialog
          open={true}
          onClose={(event, reason) => {
            if (reason === "backdropClick") {
              return false;
            } else if (reason === "escapeKeyDown") {
              return false;
            }
          }}
        >
          <DialogContent>
            <Grid container alignItems="center">
              <Grid item style={{ textAlign: "center" }}>
                <CircularProgress />
                <br />
                <br />
                <Typography component={"span"}>
                    "Please wait..."
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default Loader;
