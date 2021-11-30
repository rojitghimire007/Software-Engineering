import react, { useState, useEffect } from "react";
import { Carousel, CarouselItem } from "react-round-carousel";
import "./Carousel.css";
import Slides from "./Links";

const links = Slides();

const RunCarousel = () => {
  const opacityHandler = () => {};

  const [focused, setFocused] = useState(0);
  const [rotating, setRotating] = useState(false);
  const [testString, setTestString] = useState("(test me here)");

  const [circleQueue, setCircleQueue] = useState(
    links.map((item, index) => ({
      prev: index - 1 < 0 ? links.length - 1 : index - 1,
      index: index,
      focusState: index === focused ? true : false,
      next: index + 1 > links.length - 1 ? 0 : index + 1,
      opacity: 1,
    }))
  );

  const templatePromise = (func: any, params: any) => {
    setTimeout(() => {
      func(params);
    }, 2);
  };

  useEffect(() => {
    setCircleQueue(
      links.map((item, index) => ({
        prev: index - 1 < 0 ? links.length - 1 : index - 1,
        index: index,
        focusState: index === focused ? true : false,
        next: index + 1 > links.length - 1 ? 0 : index + 1,
        opacity: handleOpacity(index),
      }))
    );
    console.log(...circleQueue);
  }, [focused]);

  const [clickable, setClickable] = useState([
    -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ]);

  const handleOpacity = (index: any) => {
    const LR3 = 0.5;
    const LR2 = 0.7;
    const LR1 = 0.95;
    const cen = 1;
    let give = 0;

    if (index === focused) {
      give = cen;
    } else if (
      index === focused - 1 ||
      index === focused + 1 ||
      (index === circleQueue.length - 1 && focused === 0) ||
      (index === 0 && focused === circleQueue.length - 1)
    ) {
      give = LR1;
    } else if (
      index === focused - 2 ||
      index === focused + 2 ||
      (index === circleQueue.length - 2 && focused === 0) ||
      (index === circleQueue.length - 1 && focused === 1) ||
      (index === 1 && focused === circleQueue.length - 1) ||
      (index === 0 && focused === circleQueue.length - 2)
    ) {
      give = LR2;
    } else if (
      index === focused - 3 ||
      index === focused + 3 ||
      (index === circleQueue.length - 3 && focused === 0) ||
      (index === circleQueue.length - 2 && focused === 1) ||
      (index === circleQueue.length - 1 && focused === 2) ||
      (index === 2 && focused === circleQueue.length - 1) ||
      (index === 1 && focused === circleQueue.length - 2) ||
      (index === 0 && focused === circleQueue.length - 3)
    ) {
      give = LR3;
    } else give = 0.15;

    return give;
  };

  // Create an array of Carousel Items
  const items: CarouselItem[] = links.map((item, index) => ({
    alt: "",
    image: "",
    content: (
      <>
        <div
          style={{
            transition: "opacity .3s ease-in-out",
            opacity: `${circleQueue[index].opacity}`,
            width: "100%",
            height: "100%",
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
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '10px',
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
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '10px',
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
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '10px',
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
    setTestString(`input: ${i + focused}   focus: ${focused + i}`);
    i === 1
      ? setFocused(circleQueue[focused].next)
      : setFocused(circleQueue[focused].prev);

    return focused;
  };

  return (
    <div className="comp-container">
      <div>
        {circleQueue.map((item, index) => {
          return (
            <div style={{ background: "green", color: "white", margin: "2px" }}>
              {item.focusState}
            </div>
          );
        })}
      </div>
      <div className="root">
        <Carousel
          items={items}
          itemWidth={200}
          nextButtonContent={
            <button
              style={{
                position: "relative",
                // bottom: "20%",
                // right: "19%",
                opacity: "1",
                width: "4rem",
                height: "4rem",
                borderRadius: "30%",
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
                // top: 0,
                right: "70%",
                opacity: "1",
                width: "4rem",
                height: "4rem",
                borderRadius: "30%",
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
      {/* TESTING */}
      {/* <div
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
        <div>{`prev: ${circleQueue[focused].prev}`}</div>
        <div>{`Next: ${circleQueue[focused].next}`}</div>
        {/* First: 0 <div />
        Halfway: {Math.floor(circleQueue.length / 2)}
        <div />
        Last: {circleQueue.length - 1}
        <div /> */}
      {/* </div> */}
    </div>
  );
};
export default RunCarousel;
