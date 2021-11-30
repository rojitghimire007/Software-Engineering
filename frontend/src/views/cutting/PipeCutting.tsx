import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Autocomplete,
  CircularProgress,
  TextField,
} from "@mui/material";
import api from "api";
import NewCutting from "DEMOS/new-cutting-prototype/NewCutting";
import React, { useEffect, useState } from "react";
import useUpdateEffect from "utils/useUpdateEffect";

const PipeCutting = () => {
  const [fetch, setFetch] = useState(false);
  const [eligiblePipes, setEligiblePipes] = useState<Array<string>>([]);
  const [eligibleLength, setEligibleLength] = useState(0);
  const [selectedPipe, setSelectedPipe] = useState<string>("");
  const [pipeChosen, setPipeChosen] = useState(false);
  const [errored, setErrored] = useState(false);
  const [open, setOpen] = useState(false);
  const loading = open && eligiblePipes.length === 0;

  const [resetEnvironment, setResetEnvironment] = useState(false);

  useEffect(() => {
    api
      .getCuttingEligiblePipes()
      .then((res) => {
        // console.log(res)
        setEligiblePipes(res.data.map((item: { id: string }) => item.id));
      })
      .catch((err) => {
        // alert(err.message);
      });
  }, []);

  useEffect(() => {
    // console.log(eligiblePipes)
    api
      // .getPipeLength('100D')
      .getPipeLength(eligiblePipes[0])
      .then((res) => {
        // console.log(res.data.plength)
        setEligibleLength(res.data.plength);
        // console.log(eligibleLength)
      })
      .catch((err) => {
        console.log(err.message + "... may be awaiting response?");
      });
  }, [selectedPipe != ""]);

  useEffect(() => {
    // setSelectedPipe('');
    // setPipeChosen(false);
  }, [errored === true]);

  useEffect(() => {
    setErrored(false);
  }, [selectedPipe === "", !pipeChosen]);

  // useUpdateEffect(() => {
  //   api
  //     .getStrungPipesInfo([selectedPipe])
  //     .then((res) => { console.log(res) })
  //     .catch((e) => alert(e.message));
  // }, [selectedPipe, fetch]);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr 1fr",
        gridTemplateRows: "100vh",
        alignItems: "center",
        // border: "3px solid",
        background: "rgba(137, 196, 244, .4)",
        padding: "1vh 0",
        maxWidth: "100vw",
        // minWidth: "100vw",
        maxHeight: "98vh",
        // minHeight: "100vh",
      }}
    >
      <div />
      {!pipeChosen ? (
        <div>
          <FormControl sx={{ margin: "25px 0", minWidth: "100%" }}>
            {(!open && selectedPipe === "") || errored ? (
              <InputLabel id="cut-eligible-pipes">
                Select Pipe for Cutting *
              </InputLabel>
            ) : null}
            <Autocomplete
              // labelId="cut-eligible-pipes"
              id="eligible-pipes"
              open={open}
              loading={loading}
              getOptionLabel={(option) => option}
              options={eligiblePipes}
              openOnFocus
              onOpen={() => {
                setOpen(true);
              }}
              onClose={() => {
                setOpen(false);
              }}
              onChange={(e: any, value: any) => {
                setSelectedPipe(value);
                console.log(value);
              }}
              onInputChange={(e: any, value: any) => {
                if (eligiblePipes.indexOf(value) == -1) {
                  setSelectedPipe("");
                } else {
                  setSelectedPipe(value);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                ></TextField>
              )}
            ></Autocomplete>
            {/* <Select
              labelId="cut-eligible-pipes"
              id="eligible-pipes"
              value={selectedPipe}
              label="Select Pipe for Cutting *"
              onChange={(e) => {
                setSelectedPipe(e.target.value);
              }}
            >
              {eligiblePipes.map((pipe: any) => {
                return (
                  <MenuItem value={pipe}>
                    <em>{pipe}</em>
                  </MenuItem>
                );
              })}
            </Select> */}
            <Button
              variant="contained"
              onClick={() => {
                setPipeChosen(true);
              }}
            >
              Proceed
            </Button>
          </FormControl>
        </div>
      ) : null}
      {pipeChosen && selectedPipe === "" ? (
        <Dialog open={true}>
          <DialogTitle>{"Error:"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please select a pipe from the dropdown.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPipeChosen(false)}>OK</Button>
          </DialogActions>
        </Dialog>
      ) : null}
      {pipeChosen && selectedPipe != "" ? (
        <>
          {!resetEnvironment ? (
            <NewCutting
              id={selectedPipe}
              length={eligibleLength}
              reset={setResetEnvironment}
            />
          ) : (
            <>
              {setResetEnvironment(true)}
              <NewCutting
                id={selectedPipe}
                length={eligibleLength}
                reset={setResetEnvironment}
              />
            </>
          )}
        </>
      ) : null}
      <div />
    </div>
  );
};

export default PipeCutting;
