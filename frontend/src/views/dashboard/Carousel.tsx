import react, { useState, useEffect } from "react";
import { Carousel, CarouselItem } from "react-round-carousel";
import "./Carousel.css";
import Slides from "./Links";

import { useHistory } from "react-router"; // history.push('theLink')

const links = Slides();

const RunCarousel = () => {
  const [focused, setFocused] = useState(0);
  const [rotating, setRotating] = useState(false);
  const [testString, setTestString] = useState("(test me here)");
  const history = useHistory();

  const templatePromise = (func: any, params: any) => {
    setTimeout(() => {
      func(params);
    }, 2);
  };

  let circleQueue = links.map((item, index) => ({
    prev: index - 1 < 0 ? links.length - 1 : index - 1,
    index: index,
    focusState: index === focused ? true : false,
    next: index + 1 > links.length - 1 ? 0 : index + 1,
  }));

  useEffect(() => {
    circleQueue = links.map((item, index) => ({
      prev: index - 1 < 0 ? links.length - 1 : index - 1,
      index: index,
      focusState: index === focused ? true : false,
      next: index + 1 > links.length ? 0 : index + 1,
    }));
  }, [focused]);

  const handleOpacity = () => {
    return 1; // full opacity
  };

  // Create an array of Carousel Items
  const items: CarouselItem[] = links.map((item, index) => ({
    alt: "",
    image: "",
    content: (
      <>
        <div
          style={{
            //   opacity: {focused === index? return '1' : return'.3'},
            height:
              "100%" /* opacity: `${(index: any) => (focusArray[index].focused ? 1: 0)}` */,
          }}
        >
          <a href={`${item.link}`} style={{ width: "100%", height: "33%" }}>
            <img src={item.image} style={{ height: "80%" }}></img>
            <div
              style={{
                height: "20%",
                color: "white",
                fontSize: "small",
                textDecoration: "none",
                backgroundColor: "black",
              }}
            >
              {item.id}
            </div>
          </a>
          <a href={`${item.link2}`} style={{ width: "100%", height: "34%" }}>
            <img src={item.image2} style={{ height: "80%" }}></img>
            <div
              style={{
                height: "20%",
                color: "white",
                fontSize: "small",
                textDecoration: "none",
                backgroundColor: "black",
              }}
            >
              {item.id2}
            </div>
          </a>
          <a href={`${item.link3}`} style={{ width: "100%", height: "33%" }}>
            <img src={item.image3} style={{ height: "80%" }}></img>
            <div
              style={{
                height: "20%",
                color: "white",
                fontSize: "small",
                textDecoration: "none",
                backgroundColor: "black",
              }}
            >
              {item.id3}
            </div>
          </a>
        </div>
      </>
    ),
  }));

  const handleClick = (i: number, typeOfIt: string) => {
    // if (focused + 1 * i < 0) {
    //   setTestString(`${typeOfIt} ${focused} + ${i} < 0`);
    //   return circleQueue.length - 1;
    // } else if (focused + i > circleQueue.length) {
    //   setTestString(
    //     `${typeOfIt} ${focused} + ${i} {i.e. ${focused + i}} > ${
    //       circleQueue.length
    //     }`
    //   );
    //   return 0;
    // } else {
    //   setTestString(`NO DECISION: ${i} is the number, ${focused} is focused`);
    //   return focused;
    // }
    setTestString(`input: ${i + focused}   focus: ${focused + i}`);
    i === 1
      ? setFocused(circleQueue[focused].next)
      : setFocused(circleQueue[focused].prev);

    return focused;
  };

  return (
    <div className="comp-container">
      <div
        style={{
          display: "flex",
          background: "white",
          position: "absolute",
          bottom: 0,
          right: 0,
        }}
      >
        {circleQueue.map((item, index) => {
          return (
            <div style={{ background: "green", color: "white", margin: "2px" }}>
              {focused === index ? "-II-" : "---"}
            </div>
          );
        })}
      </div>
      {/* {console.log(focusArray)} */}
      {/* {console.log(circleQueue)} */}
      {/* notice className root */}
      {/*  DO NOT CHANGE THIS (atm at least) */}
      <div className="root">
        {/* this is the carousel item*/}
        <Carousel
          items={items}
          itemWidth={200}
          nextButtonContent={
            <button
              style={{
                position: "relative",
                bottom: "20%",
                right: "19%",
                opacity: "1",
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "50%",
                zIndex: 5,
              }}
              onClick={(e: any) => {
                Promise.all([templatePromise(setRotating, true)])
                  .then(() => handleClick(1, "next"))
                  .then(() => setRotating(false));
              }}
            >
              &rarr;
            </button>
          }
          prevButtonContent={
            <button
              style={{
                position: "relative",
                top: 0,
                left: 0,
                opacity: "1",
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "50%",
                zIndex: 5,
              }}
              onClick={(e: any) => {
                Promise.all([templatePromise(setRotating, true)])
                  .then(() => handleClick(-1, "prev"))
                  .then(() => setRotating(false));
              }}
            >
              &larr;
            </button>
          }
        />
      </div>
      <div
        style={{
          background: "white",
          position: "absolute",
          left: "0px",
          bottom: "0px",
        }}
      >
        <h3>Circle Queue State :::::: TESTING</h3>
        <h4>
          Array Size = {circleQueue.length} Focused on = {focused}
        </h4>
        <h4>
          rotating? {rotating.toString()} testString: {testString}
        </h4>
        <div
          style={{
            border: "3px solid black",
            color: "black",
            display: "flex",
            flexFlow: "column nowrap",
          }}
        >
          {circleQueue.map((item: any, index: any) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexFlow: "row nowrap",
                  width: "100%",
                  //   borderWidth: "0 2xp 0 0",
                  //   borderStyle: "dashed",
                  justifyContent: "space-evenly",
                }}
              >
                <div
                  style={{
                    background: "rgba(244,10,0,.5)",
                    flexGrow: 1,
                    flexShrink: 0.75,
                  }}
                >
                  previous: {item.prev}
                </div>
                <div
                  style={{
                    background: "rgba(0,230,150,.6)",
                    flexGrow: 1,
                    flexShrink: 0.75,
                  }}
                >
                  index: {item.index}
                </div>
                <div
                  style={{
                    background: "rgba(244,10,0,.5)",
                    flexGrow: 1,
                    flexShrink: 0.75,
                  }}
                >
                  Next: {item.next}
                </div>
                <div
                  style={{
                    background: "rgba(0,230,150,.6)",
                    flexGrow: 1,
                    flexShrink: 0.75,
                  }}
                >
                  focus?: {item.focusState.toString()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          background: "white",
          width: "322px",
          height: "322px",
        }}
      >
        {rotating ? testString : ""}
        <div>{`Next: ${circleQueue[focused].next}`}</div>
      </div>
    </div>
  );
};
export default RunCarousel;
