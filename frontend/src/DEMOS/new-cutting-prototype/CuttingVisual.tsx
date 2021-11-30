import React from "react";

const CuttingVisual = ({
  distance,
  lengths,
  units,
  displayLength,
  pipeNames,
  doneCutting,
}: any) => {
  return (
    <>
      <div>{/* distance: {distance} lengths: {lengths} */}</div>
      <div
        style={{
          backgroundColor: `${
            lengths[0] > 0 && lengths[0] <= displayLength ? "green" : "red"
          }`,
          width: "98%",
          margin: "0 1% 0 1%",
          //   display: "inline-block",
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "center",
          fontFamily: "Bebas Neue, serif",
          fontSize: "1.5rem",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "hidden",
          borderLeft: "4px outset",
          borderRight: "4px outset",
          //   maxHeight: "10%",
        }}
      >
        <div
          style={{
            color: "white",
            width: `${distance}%`,
            minWidth: "0%",
            textAlign: "end",
            display: "flex",
            flexFlow: "row nowrap",
            justifyContent: "flex-end",
            alignItems: "center",
            borderRight: "4px inset black",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "hidden",
            padding: "1% 0",
          }}
        >
          {/* <div
            style={{
              minWidth: "0",
              textOverflow: "hidden",
              fontStyle: "italic",
              position: "relative",
              bottom: "-11%",
              right: "4%",
              textDecoration: "underline",
            }}
          >
            Size (Left)
          </div> */}
          <div
            style={{
              position: "relative",
              right: "1%",
            }}
          >
            {doneCutting ? (
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "flex-start",
                  left: "2%",
                }}
              >
                {pipeNames[0]}
              </div>
            ) : null}
            {lengths[1] > -0.999999
              ? `${
                  lengths[0] % 1 === 0 && lengths[0] != 0
                    ? lengths[0].toPrecision(6).slice(0, -5)
                    : lengths[0] === 0
                    ? 0
                    : lengths[0] < 1
                    ? lengths[0].toPrecision(3)
                    : lengths[0] < 10
                    ? lengths[0].toPrecision(4)
                    : lengths[0] < 100
                    ? lengths[0].toPrecision(5)
                    : lengths[0] > 100
                    ? lengths[0].toPrecision(6)
                    : null
                } ${units}`
              : "ERROR"}
          </div>
        </div>
        <div
          style={{
            width: `${100 - distance}%`,
            minWidth: "0",
            backgroundColor: `${
              lengths[1] >= 0 && lengths[1] <= displayLength ? "yellow" : "red"
            }`,
            display: "flex",
            flexFlow: "row nowrap",
            justifyContent: "flex-start",
            alignItems: "center",
            borderLeft: "4px inset black",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "hidden",
            margin: "0",
          }}
        >
          <div
            style={{
              position: "relative",
              left: "1%",
            }}
          >
            {doneCutting ? (
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "flex-end",
                  right: "2%",
                }}
              >
                {pipeNames[1]}
              </div>
            ) : null}
            {lengths[0] > -0.999999
              ? `${
                  lengths[1] % 1 === 0 && lengths[1] != 0
                    ? lengths[1].toPrecision(6).slice(0, -5)
                    : lengths[1] === 0
                    ? 0
                    : lengths[1] < 1
                    ? lengths[1].toPrecision(3)
                    : lengths[1] < 10
                    ? lengths[1].toPrecision(4)
                    : lengths[1] < 100
                    ? lengths[1].toPrecision(5)
                    : lengths[1] > 100
                    ? lengths[1].toPrecision(6)
                    : null
                } ${units}`
              : "ERROR"}
          </div>
          {/* <div
            style={{
              minWidth: 0,
              paddingLeft: "1vw",
              fontStyle: "italic",
              position: "relative",
              bottom: "-11%",
              right: "-4%",
              textDecoration: "underline",
              margin: "0",
            }}
          >
            Size (Right)
          </div> */}
        </div>
      </div>
    </>
  );
};

export default CuttingVisual;
