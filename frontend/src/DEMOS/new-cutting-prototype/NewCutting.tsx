import React, { useState, useEffect, useRef } from "react";
import styles from "./newCuttingStyles.module.css";
import CuttingVisual from "./CuttingVisual";
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
  Checkbox,
} from "@mui/material";
import api from "api";

const NewCutting = ({ id, length }: any) => {
  const fineTuning = [10.0, 1.0, 0.1, 0.01, 0.001];
  const units = ["ft", "in"];
  const radioGroupRef = useRef<HTMLElement>(null);
  const [cutLengthPercent, setCutLengthPercent] = useState(50);
  const [leftLength, setLeftLength] = useState(length);
  const [rightLength, setRightLength] = useState(0);
  const [finalLengths, setFinalLengths] = useState([length, 0]);
  const [fineTuneAmount, setFineTuneAmount] = useState(0.001);
  const [cuttingUnits, setCuttingUnits] = useState([null, units[0]]);
  const [displayLength, setDisplayLength] = useState(length);
  const [pipeNames, setPipeNames] = useState(["", ""]);
  const [userPipeNames, setUserPipeNames] = useState(["", ""]);
  // Action performed / state changed
  const [cutFinalized, setCutFinalized] = useState(false);
  const [changingUnits, setChangingUnits] = useState(false);
  const [invalidIncrement, setInvalidIncrement] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [manualCutAmount, setManualCutAmount] = useState("");
  const [incrementing, setIncrementing] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [block, setBlock] = useState(false);
  const [buttonsActive, setButtonsActive] = useState([true, true, true]);
  const [submitting, setSubmitting] = useState(false);
  const [submitType, setSubmitType] = useState("FromWhere");
  const [checked, setChecked] = useState([false, false]);

  const promiseTemplate = (func: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 50, "foo");
    });
  };

  useEffect(() => {
    setUserPipeNames([pipeNames[0], pipeNames[1]]);
  }, [pipeNames]);

  useEffect(() => {
    if (checked[0]) {
      setUserPipeNames([pipeNames[0], userPipeNames[1]]);
    } else if (!checked[0]) {
      setUserPipeNames(["-", userPipeNames[1]]);
    }
  }, [checked[0]]);

  useEffect(() => {
    if (checked[1]) {
      setUserPipeNames([userPipeNames[0], pipeNames[1]]);
    } else if (!checked[1]) {
      setUserPipeNames([userPipeNames[0], "-"]);
    }
  }, [checked[1]]);

  useEffect(() => {
    setFinalLengths([leftLength, rightLength]);
  }, [cutFinalized === true]);

  useEffect(() => {
    setRightLength(displayLength - 0.01 * cutLengthPercent * displayLength);
  }, [cutLengthPercent || displayLength]);

  useEffect(() => {
    setLeftLength(displayLength - rightLength);
  }, [rightLength]);

  useEffect(() => {
    setSliderPosition((leftLength / displayLength) * 100);
    setManualCutAmount(leftLength.toString());
  }, [leftLength]);

  // useEffect(() => {
  //   // Promise.all([
  //   //   promiseTemplate(setSliderPosition((leftLength / displayLength) * 100)),
  //   // ]).then(() => {
  //   //   setIncrementing(false);
  //   // });
  // }, [incrementing === true]);

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

    // console.log("suggestions: " + pipeNames);
  };

  const handleManual = (value: any) => {
    // console.log(value);
    if (
      value.match(/[0-9]/) != null &&
      value.match(/[A-Z]/) === null &&
      value.match(/[a-z]/) === null &&
      parseInt(value) >= 0 &&
      parseInt(value) <= displayLength &&
      value != ""
    ) {
      // console.log(
      //   "pass: " +
      //     value.match(/[^0-9]/) +
      //     " " +
      //     (parseInt(value) >= 0).toString() +
      //     `(${parseInt(value)} >= ${0}) ` +
      //     (parseInt(value) <= displayLength).toString() +
      //     `(${parseInt(value)} <= ${displayLength}) value!=""? ${value != ""}` +
      //     ` setOfLetters?: ${value.match(/[A-Z][a-z]/)}`
      // );
      return value;
    } else {
      /* console.log(`fail: ${value}`); */
      return "";
    }
  };

  return (
    <div
      // className={styles.cuttingContainer}
      style={{
        background:
          "linear-gradient(to bottom left, rgba(65, 131, 215,.4), rgba(34, 49, 63, .4))",
        // maxHeight: "75%",
        height: "95%",
        border: "3px inset",
        // minWidth: "75%",
        width: "90vw",
        // margin: "6.125% 12.5%",
        padding: "0 1%",
      }}
    >
      {/* {console.log(sliderPosition)} */}
      <div style={{ textAlign: "center", marginBottom: "1%", color: "black" }}>
        <div
          style={{
            fontSize: "1.5rem",
            color: "black",
            fontFamily: "Fenix",
            margin: "1% 0 0 0",
            padding: "1% 0",
            background: "rgba(225,245,255, .1)",
          }}
        >
          Original Pipe ID: {id} <div />
          Original Pipe Length: {displayLength} {cuttingUnits[1]}
        </div>
        <div
          style={{
            padding: "1% 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(225,245,255, .1)",
          }}
        >
          {!cutFinalized ? (
            <TextField
              style={{ background: "rgba(100,100,100, .1)", color: "white" }}
              label="Desired length of pipe"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {cuttingUnits[1]}
                  </InputAdornment>
                ),
              }}
              onChange={(e: any) => {
                // setManualCutAmount(e.target.value);
                Promise.all([
                  promiseTemplate(
                    setManualCutAmount(handleManual(e.target.value))
                  ),
                  // promiseTemplate(setRightLength(displayLength - e.target.value)),
                ]).then((res) => {
                  setRightLength(displayLength - e.target.value);
                  // console.log(manualCutAmount);
                });
              }}
            />
          ) : null}
          {!cutFinalized ? (
            <Button
              variant="contained"
              color="success"
              style={{ margin: "1% 1%", alignSelf: "center" }}
              onClick={() => {
                if (manualCutAmount === "") {
                  setOpenError(true);
                } else setOpenConfirmation(!openConfirmation);
              }}
            >
              Cut At Length
            </Button>
          ) : null}
          <Dialog open={openError}>
            <DialogTitle style={{ color: "red" }}>
              {"ERROR: Invalid Length"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <p>
                  Please enter only numeric values into the desired pipe length
                  box.
                </p>
                <p>
                  Please make sure the length cut is no greater than the
                  original pipe's length or less than zero.
                </p>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setOpenError(false);
                }}
              >
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        {!cutFinalized ? (
          <div style={{ background: "rgba(225,245,255, .1)", padding: ".5%" }}>
            <Button
              variant="outlined"
              style={{
                margin: "0.25% 1%",
                alignSelf: "center",
                color: "white",
                background: "rgba(225,245,255, .1)",
              }}
              onClick={() => {
                setChangingUnits(!changingUnits);
              }}
            >
              Change Units
            </Button>
          </div>
        ) : null}
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
      <CuttingVisual
        distance={sliderPosition}
        lengths={[leftLength, rightLength]}
        units={cuttingUnits[1]}
        displayLength={displayLength}
        pipeNames={userPipeNames}
        doneCutting={cutFinalized && !openConfirmation}
      />
      {!cutFinalized ? (
        <>
          <div
            style={{
              // padding: "10%% 0 0 1%",
              width: "100%",
              display: "flex",
            }}
          >
            <input
              type="range"
              min={0}
              value={sliderPosition}
              max={100}
              onChange={(e: any) => setSliderPosition(e.target.value)}
              onInput={(e: any) => setCutLengthPercent(e.target.value)}
              step={0.001}
              style={{
                width: "99%",
                margin: "1%",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "1% 0 0 0",
              background: "rgba(225,245,255, .1)",
              padding: "1%",
              borderRadius: "3%",
              boxShadow: "-50 -50 0 3px rgb(255 ,255, 40)",
            }}
          >
            <div />
            <Button
              variant="contained"
              style={{
                margin: "0 1% 2% 0",
                alignSelf: "center",
                // fontSize: "2rem",
                // padding: "1%",
                // maxHeight: "50%"
                width: "1%",
                height: "1%",
              }}
              // onClick={() => { setSliderPosition(sliderPosition - fineTuneAmount); }}
              onClick={() => {
                setRightLength(handleIncrement(fineTuneAmount));
                setIncrementing(true);
              }}
            >
              <div style={{ fontSize: "150%" }}>-</div>
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
                        {amount} {cuttingUnits[1]}{" "}
                        {index == 2 ? <>(Default)</> : null}
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
              style={{
                margin: "0 0 2% 1%",
                // alignSelf: "center",
                // fontSize: "2rem",
                // padding: "1%",
                // maxHeight: "1%",
                // width: ".5%",
                // height: "50%",
              }}
              // onClick={() => { setSliderPosition(sliderPosition + fineTuneAmount);}}
              onClick={() => {
                setRightLength(handleIncrement(-1 * fineTuneAmount));
                setIncrementing(true);
              }}
            >
              <div style={{ fontSize: "150%" }}>+</div>
            </Button>
            <div />
          </div>
        </>
      ) : null}
      {!cutFinalized ? (
        <>
          <div
            style={{
              display: "flex",
              flexFlow: "column nowrap",
              alignItems: "center",
              padding: ".25%",
              background: "rgba(225,245,255, .1)",
              fontFamily: "Roboto",
            }}
          >
            <div style={{ display: "flex" }}>
              <div>Left Length:</div>{" "}
              {leftLength % 1 === 0 && leftLength != 0
                ? leftLength.toPrecision(6).slice(0, -5)
                : leftLength === 0
                ? 0
                : leftLength < 1
                ? leftLength.toPrecision(3)
                : leftLength < 10
                ? leftLength.toPrecision(4)
                : leftLength < 100
                ? leftLength.toPrecision(5)
                : leftLength > 100
                ? leftLength.toPrecision(6)
                : null}{" "}
              {cuttingUnits[1]}
            </div>
            <div style={{ display: "flex" }}>
              <div>Right Length:</div>{" "}
              {rightLength % 1 === 0 && rightLength != 0
                ? rightLength.toPrecision(6).slice(0, -5)
                : rightLength === 0
                ? 0
                : rightLength < 1
                ? rightLength.toPrecision(3)
                : rightLength < 10
                ? rightLength.toPrecision(4)
                : rightLength < 100
                ? rightLength.toPrecision(5)
                : rightLength > 100
                ? rightLength.toPrecision(6)
                : null}{" "}
              {cuttingUnits[1]}
            </div>
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            flexFlow: "row nowrap",
            alignItems: "center",
            justifyContent: "center",
            width: "98%",
            margin: "1% 1%",
            fontSize: "1.25rem",
          }}
        >
          <div
            style={{
              border: "3px solid black",
              // boxShadow: `${
              //   "-1px 0 4px 20px linear-gradient(to left, rgba(255,255,225,1), rgba(255,0,0,1))," +
              //   "0 -1px 4px 20px linear-gradient(to bottom, rgba(255,255,225,1), rgba(255,0,0,1)),"
              // }`,
              padding: ".25%",
              margin: "1%",
              color: "white",
              background:
                "linear-gradient(to bottom left, rgba(0,0,50,.3), rgba(0,10,100,.6))",
              flexGrow: 0.25,
            }}
          >
            <p>
              The generated ID's for the newly cut pipes are{" "}
              <a style={{ color: "rgba(125,255,40,.9)" }}>{pipeNames[0]}</a>
              {" and "}
              <a style={{ color: "rgba(255,255,40,.85)" }}>{pipeNames[1]}</a>.
            </p>
            {/* <div>The states are: </div>
            <div>
              check A: {checked[0].toString()} {" | "} check B:
              {checked[1].toString()}
            </div>
            <div>
              pipe A: {userPipeNames[0]}
              {" | "} pipe B: {userPipeNames[1]}
            </div>
            <div>
              generated A: {pipeNames[0]}
              {" | "} generated B: {pipeNames[1]}
            </div> */}
          </div>
          {!buttonsActive[2] ? (
            <>
              {/* {console.log(buttonsActive)} */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "0 auto",
                  background: "rgba(225,245,255, .1)",
                  padding: "1%",
                  borderRadius: "3%",
                  boxShadow: "0 0 0 3px rgb(255 ,255, 40)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <div style={{ fontSize: "1rem" }}>
                    Use Generated Id
                    <Checkbox
                      checked={checked[0]}
                      onChange={() => {
                        // console.log("change");
                        setChecked([!checked[0], checked[1]]);
                      }}
                    />
                  </div>
                  <TextField
                    disabled={checked[0] ? true : false}
                    placeholder={`${pipeNames[0]} (generated)`}
                    inputProps={{ maxLength: 6 }}
                    helperText="6 characters or less"
                    onChange={(e: any) => {
                      setUserPipeNames([
                        `${e.target.value === "" ? "-" : e.target.value}`,
                        userPipeNames[1],
                      ]);
                      console.log(e.target.value);
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <div style={{ fontSize: "1rem" }}>
                    Use Generated Id
                    <Checkbox
                      checked={checked[1]}
                      onChange={() => {
                        setChecked([checked[0], !checked[1]]);
                      }}
                    />
                  </div>
                  <TextField
                    disabled={checked[1] ? true : false}
                    placeholder={`${pipeNames[1]} (generated)`}
                    inputProps={{ maxLength: 6 }}
                    helperText="6 characters or less"
                    onChange={(e: any) => {
                      setUserPipeNames([
                        userPipeNames[0],
                        `${e.target.value === "" ? "-" : e.target.value}`,
                      ]);
                    }}
                  />
                </div>

                <div
                  style={{
                    alignSelf: "center",
                    display: "flex",
                    marginTop: "2%",
                    borderTop: "2px solid",
                    paddingTop: "2%",
                    width: "100%",
                  }}
                >
                  <Button
                    variant="contained"
                    color="error"
                    style={{
                      margin: "1% 1%",
                      position: "relative",
                      // right: "25%",
                    }}
                    onClick={() => {
                      setButtonsActive([true, true, true]);
                      setUserPipeNames([pipeNames[0], pipeNames[1]]);
                      setChecked([false, false]);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    style={{
                      margin: "1% 1%",
                      position: "relative",
                      left: "50%",
                    }}
                    onClick={() => {
                      setSubmitting(true);
                      // console.log(userPipeNames);
                      // console.log(checked);
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </>
          ) : !buttonsActive[1] ? (
            <>
              {setButtonsActive([true, true, true])}
              {/* <Button
                variant="contained"
                color="error"
                style={{ margin: "1% 1%" }}
                onClick={() => {
                  setButtonsActive([true, true, true]);
                }}
              >
                Cancel
              </Button> */}
            </>
          ) : null}
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          background: "rgba(225,245,255, .1)",
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
            Finalize Cut
          </Button>
        ) : null}
        <Dialog open={openConfirmation}>
          <DialogTitle>{"Ready to Cut?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <p>
                If you are finished cutting the pipe, press OK. Otherwise, press
                <a style={{ fontStyle: "italic" }}>
                  {"   "}'Back'{"   "}
                </a>{" "}
                to return to the cutting page.
              </p>
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
              onClick={(e: any) => {
                promiseTemplate(e.target.value).then(() => {
                  if (leftLength + rightLength != displayLength)
                    setOpenError(true);
                  else {
                    setOpenConfirmation(!openConfirmation);
                    setCutFinalized(true);
                    nameNewPipe();
                  }
                });
                // .then(setOpenConfirmation(!openConfirmation))
                // .then(setCutFinalized(true))
                // .then(nameNewPipe())
              }}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={submitting}>
          <DialogTitle>{"Upload?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <p>You have chosen to name the pipes:</p>
              <p style={{ textAlign: "center", fontSize: "1.3rem" }}>
                {" "}
                {userPipeNames[0]} and {userPipeNames[1]}{" "}
              </p>
              <p>
                Press 'OK' to log the new pipes and their sizes in the database.
              </p>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setSubmitting(false);
              }}
            >
              BACK
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={(e: any) => {
                promiseTemplate(submitting)
                  .then(() => {
                    if (userPipeNames[0] === "-" || userPipeNames[1] === "-")
                      setOpenError(true);
                  })
                  .then(() => {
                    api
                      .cutPipe(id, finalLengths[0])
                      .then((res) => {
                        setSubmitting(false);
                        alert(res.message + " Check pipe inventory to see the changes!");
                        console.log(res);
                      })
                      .catch((err) => {
                        console.log(err);
                        console.log(id + " " + finalLengths[0]);
                        console.log(typeof id + " " + typeof finalLengths[0]);
                      });
                  });
              }}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
        {cutFinalized ? (
          <div
            style={{
              display: "flex",
              position: "relative",
              flexDirection: `${
                !buttonsActive[1] || !buttonsActive[2] ? "column" : "row"
              }`,
              justifySelf: `${
                !buttonsActive[1] || !buttonsActive[2] ? "flex-start" : "center"
              }`,
              margin: `${
                !buttonsActive[1] || !buttonsActive[2] ? "0 85% 0 0 " : "auto"
              }`,
            }}
          >
            <Button
              variant="outlined"
              style={{ margin: "1% 1%" }}
              disabled={!buttonsActive[0]}
              onClick={() => {
                setSliderPosition(50);
                setRightLength(displayLength / 2);
                setCutFinalized(false);
                setButtonsActive([true, true, true]);
              }}
            >
              Reset Cutting
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{ margin: "1% 1%" }}
              disabled={!buttonsActive[1]}
              disableElevation={!buttonsActive[1]}
              disableRipple={buttonsActive[1]}
              onClick={() => {
                setButtonsActive([false, true, false]);
              }}
            >
              Modify Generated Ids
            </Button>
            <Button
              variant="contained"
              style={{ margin: "1% 1%" }}
              disabled={!buttonsActive[2]}
              disableElevation={!buttonsActive[2]}
              disableRipple={buttonsActive[2]}
              onClick={() => {
                setButtonsActive([false, false, true]);
                promiseTemplate(setSubmitting(true)).then(() => {
                  setUserPipeNames([pipeNames[0], pipeNames[1]]);
                });
              }}
            >
              Use Generated Pipe Ids
            </Button>
          </div>
        ) : (
          <Button
            variant="contained"
            // color="info"
            style={{ margin: "1% 1%", color: "white" }}
            onClick={() => {
              setSliderPosition(50);
              setRightLength(displayLength / 2);
              setCutFinalized(false);
            }}
          >
            Reset Slider
          </Button>
        )}
      </div>
    </div>
  );
};

export default NewCutting;
