// 3rd party
import React, { useState } from "react";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  CssBaseline,
  Grid,
  Container,
  TextField,
  Button,
  ButtonGroup,
} from "@material-ui/core";
import {
  orange,
  lightBlue,
  deepPurple,
  deepOrange,
} from "@material-ui/core/colors";
import ReactJson from "react-json-view";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmojiFoodBeverageOutlinedIcon from "@material-ui/icons/EmojiFoodBeverageOutlined";

// custom components
import "./App.css";
import LoadingButton from "./LoadingButton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    minHeight: "100%",
    display: "flex",
    flexWrap: "wrap",
  },
}));

const App = () => {
  const classes = useStyles();
  const [currentInput, setCurrentInput] = useState("");
  const [currentJson, setCurrentJson] = useState();
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const darkTheme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? orange[500] : lightBlue[500],
      },
      secondary: {
        main: darkMode ? deepOrange[900] : deepPurple[500],
      },
    },
  });
  const handleClick = (e) => {
    if (currentInput && currentInput.length > 0) {
      setIsLoading(true);
      let attemptedParse = "";
      let errMsg = "";
      try {
        attemptedParse = JSON.parse(currentInput);
      } catch (err) {
        errMsg = `Failed due to ${err.name}\nError: ${err.message}`;
      }

      if (errMsg.length > 0) {
        toast.error(errMsg);
      } else {
        setCurrentJson(attemptedParse);
      }
    } else {
      toast.warn("Please enter ugly JSON first...");
    }
    setIsLoading(false);
  };
  const generateJsonTree = () => {
    if (currentJson == null) {
      return <div className="json-tree-container"></div>;
    } else {
      return (
        <div className="json-tree-container">
          <ReactJson
            src={currentJson}
            theme={darkMode ? "monokai" : "rjv-default"}
            style={{ overflow: "auto", maxHeight: "955px" }}
          />
        </div>
      );
    }
  };

  return (
    <div className={classes.root}>
      <main>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Container maxWidth="xl">
            <Grid
              container
              spacing={0}
              justify="center"
              alignItems="center"
              direction="column"
            >
              <Grid item md={12}>
                <EmojiFoodBeverageOutlinedIcon style={{ fontSize: 80 }} />
              </Grid>
              <Grid item md={12}>
                <h2>Json Beautifier</h2>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item md={5} lg={5}>
                <TextField
                  id="current-input"
                  label="Ugly JSON goes here..."
                  multiline
                  rows={50}
                  fullWidth
                  variant="outlined"
                  onChange={(e) => setCurrentInput(e.target.value)}
                />
              </Grid>
              <Grid item md={2} lg={2}>
                <Grid
                  container
                  spacing={1}
                  justify="center"
                  alignItems="center"
                >
                  <ButtonGroup
                    orientation="vertical"
                    aria-label="vertical outlined primary button group"
                    variant="contained"
                  >
                    {/* <Button color="primary" onClick={handleClick}>
                      Beautify
                    </Button> */}
                    <LoadingButton
                      onClick={handleClick}
                      loading={isLoading}
                      btnText={"Beautify"}
                      color={"primary"}
                    />
                    <Button
                      color="secondary"
                      onClick={() => setDarkMode(!darkMode)}
                    >
                      Dark Mode
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
              <Grid item md={5} lg={5}>
                {generateJsonTree()}
              </Grid>
            </Grid>
          </Container>
        </ThemeProvider>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={true}
        />
      </main>
    </div>
  );
};

export default App;
