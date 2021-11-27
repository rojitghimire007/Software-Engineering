import React, { useState, useEffect, useRef } from "react";
import styles from "./newCuttingStyles.module.css";
import {
  Button,
  Select,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";

const NewCutting = ({ id, length }: any) => {
  const fineTuning = [10.0, 1.0, 0.1, 0.01, 0.001];
  const units = ["ft", "in"];
  const [cutLengthPercent, setCutLengthPercent] = useState(50);
  const [leftLength, setLeftLength] = useState(length);
  const [rightLength, setRightLength] = useState(0);
  const [cutFinalized, setCutFinalized] = useState(false);
  const [finalLengths, setFinalLengths] = useState([length, 0]);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [fineTuneAmount, setFineTuneAmount] = useState(0.001);
  const [changingUnits, setChangingUnits] = useState(false);
  const [cuttingUnits, setCuttingUnits] = useState([null, units[0]]);
  const [displayLength, setDisplayLength] = useState(length);
  const [invalidIncrement, setInvalidIncrement] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [pipeNames, setPipeNames] = useState(["", ""]);
  const radioGroupRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setFinalLengths([leftLength, rightLength]);
  }, [cutFinalized === true]);

  useEffect(() => {
    setRightLength(displayLength - 0.01 * cutLengthPercent * displayLength);
  }, [cutLengthPercent || sliderPosition || displayLength]);

  useEffect(() => {
    setLeftLength(displayLength - rightLength);
  }, [rightLength]);

  useEffect(() => {
    if (cuttingUnits[0] == "in" && cuttingUnits[1] == "ft") {
      setDisplayLength(length);
      setRightLength(rightLength / 12);
    } else if (cuttingUnits[0] == "ft" && cuttingUnits[1] == "in") {
      setDisplayLength(length * 12);
      setRightLength(rightLength * 12);
    }
  }, [cuttingUnits]);

  const handleIncrement = (amount: number) => {
    if (rightLength + amount > displayLength || rightLength + amount < 0) {
      alert(
        "The pipe length is invalid. Please select a different increment amount."
      );
      setInvalidIncrement(true);
      return rightLength;
    } else {
      setInvalidIncrement(false);
      return rightLength + amount;
    }
  };

  const nameNewPipe = () => {
    var suggestionA = id;
    var suggestionB = id;
    const capitals = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
    const alphabet =
      /[ABCDEFGHIJKLMNOPQRASTUVWXYZabcdefghijklmnopqrstuvwxyz]/; /* REGEX: check for letter */
    const isInString = alphabet.test(id);

    if (!isInString) {
      suggestionA = id + capitals[0];
      suggestionB = id + capitals[1];
    } else {
      if (id.charAt(id.length - 1) == ("Z" || "z")) {
        suggestionA = id + capitals[0];
        suggestionB = id + capitals[0];
      } else {
        suggestionA =
          id.substring(0, id.length - 1) +
          capitals[capitals.indexOf(id.charAt(id.length - 1))];
        suggestionB =
          id.substring(0, id.length - 1) +
          capitals[capitals.indexOf(id.charAt(id.length - 1)) + 1];
      }
    }

    setPipeNames([suggestionA, suggestionB]);

    console.log("suggestions: " + pipeNames);
  };

  return (
    <div className={styles.cuttingContainer}>
      <div style={{ textAlign: "center", marginBottom: "1%" }}>
        Pipe Name: {id} <div />
        Starting Pipe Length: {displayLength} {cuttingUnits[1]}
        <div
          style={{
            margin: "1% 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            label="Desired length of pipe"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {cuttingUnits[1]}
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="success"
            style={{ margin: "1% 1%", alignSelf: "center" }}
            onClick={() => {
              setCutFinalized(!cutFinalized);
            }}
          >
            {!cutFinalized ? "Cut Pipe" : "Reset?"}
          </Button>
        </div>
        <Button
          variant="outlined"
          style={{ margin: "0.25% 1%", alignSelf: "center" }}
          onClick={() => {
            setChangingUnits(!changingUnits);
          }}
        >
          Change Units
        </Button>
        <Dialog open={changingUnits} maxWidth="md">
          <DialogTitle>{"Select Unit:"}</DialogTitle>
          <DialogContent dividers>
            {/* <DialogContentText>
                        Please select a unit from below.
                        </DialogContentText> */}
            <RadioGroup
              ref={radioGroupRef}
              name="units"
              value={cuttingUnits}
              onChange={(e) =>
                setCuttingUnits([cuttingUnits[1], e.target.value])
              }
            >
              {units.map((unit) => {
                return (
                  <FormControlLabel
                    value={unit}
                    key={unit}
                    control={<Radio />}
                    label={unit}
                  />
                );
              })}
            </RadioGroup>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setChangingUnits(!changingUnits);
              }}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className={styles.pipeContainer}>
        {cutFinalized ? (
          <div style={{ display: "flex" }}>
            <div
              style={{
                minWidth: `${leftLength / displayLength}%`,
                border: "1px dashed white",
                height: "100px",
              }}
            >
              <div>id: {pipeNames[0]}</div>
              <div>length: {finalLengths[0]}</div>
            </div>
            <div
              style={{
                minWidth: `${rightLength / displayLength}%`,
                border: "1px dashed white",
                // marginLeft: "20px",
                height: "100px",
              }}
            >
              <div>id: {pipeNames[1]}</div>
              <div>length: {finalLengths[1]}</div>
            </div>
          </div>
        ) : (
          <div
            className={styles.measure}
            style={{
              marginLeft: `${
                cutLengthPercent != 99.001 ? cutLengthPercent : 99.001
              }%`,
            }}
          />
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexFlow: "column nowrap",
          alignItems: "center",
          margin: "1% 0",
        }}
      >
        <div>
          Left Length: {leftLength.toPrecision(5)} {cuttingUnits[1]}
        </div>
        <div>
          Right Length: {rightLength.toPrecision(5)} {cuttingUnits[1]}
        </div>
        <div>Slider Position: {sliderPosition} %</div>
      </div>
      {!cutFinalized ? (
        <>
          <input
            type="range"
            min={0}
            value={sliderPosition}
            max={100}
            onChange={(e: any) => setSliderPosition(e.target.value)}
            onInput={(e: any) => setCutLengthPercent(e.target.value)}
            step={0.001}
            style={{
              margin: "2%% 1% 0 1%",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "1% 0 0 0",
            }}
          >
            <div />
            <Button
              variant="contained"
              style={{ margin: "0 .25%" }}
              // onClick={() => { setSliderPosition(sliderPosition - fineTuneAmount); }}
              onClick={() => setRightLength(handleIncrement(fineTuneAmount))}
            >
              -
            </Button>
            <FormControl size="medium">
              <InputLabel id="fine-tuning-label">
                Fine Increment Amount
              </InputLabel>
              <Select
                labelId="fine-tuning-label"
                id="fine-tuning"
                value={fineTuneAmount}
                label="Fine Tune Amount"
                onChange={(e: any) => {
                  setFineTuneAmount(e.target.value);
                }}
              >
                {fineTuning.map((amount: number, index: number) => {
                  return (
                    <MenuItem value={amount}>
                      <em>
                        {amount} {index == 2 ? <>(Default)</> : null}
                      </em>
                    </MenuItem>
                  );
                })}
              </Select>
              {invalidIncrement ? (
                <FormHelperText error>Invalid increment amount!</FormHelperText>
              ) : (
                <FormHelperText>select increment amount</FormHelperText>
              )}
            </FormControl>
            <Button
              variant="contained"
              style={{ margin: "0 .25%" }}
              // onClick={() => { setSliderPosition(sliderPosition + fineTuneAmount);}}
              onClick={() =>
                setRightLength(handleIncrement(-1 * fineTuneAmount))
              }
            >
              +
            </Button>
            <div />
          </div>
        </>
      ) : null}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {!cutFinalized ? (
          <Button
            variant="contained"
            color="success"
            style={{ margin: "1% 1%" }}
            onClick={() => {
              setOpenConfirmation(!openConfirmation);
            }}
          >
            {!cutFinalized ? "Finalize Cut?" : "Reset?"}
          </Button>
        ) : null}
        <Dialog open={openConfirmation}>
          <DialogTitle>{"Ready to Finalize?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              If you are finished cutting the pipe, press OK. Otherwise, press
              Back to go back to the cutting page.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setOpenConfirmation(!openConfirmation);
                setCutFinalized(false);
              }}
            >
              BACK
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setOpenConfirmation(!openConfirmation);
                setCutFinalized(true);
                nameNewPipe();
              }}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Button
          variant="outlined"
          style={{ margin: "1% 1%" }}
          onClick={() => {
            setSliderPosition(50);
            setRightLength(displayLength / 2);
          }}
        >
          Reset Slider
        </Button>
      </div>
    </div>
  );
};

export default NewCutting;
