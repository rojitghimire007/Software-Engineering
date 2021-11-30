import AppBar from "components/AppBar";
import react, { useState, useEffect } from "react";
import { Carousel, CarouselItem } from "react-round-carousel";
import "./SubCarousel.css";
import useStyles from '../../../style/DashboardStyles'; // new styling


const SubCarousel = (slides: any) => {

const classes = useStyles();
const links = slides;
  const opacityHandler = () => {};

  const [focused, setFocused] = useState(0);
  const [rotating, setRotating] = useState(false);
  const [testString, setTestString] = useState("(test me here)");

  const [circleQueue, setCircleQueue] = useState(
    links.map((item: any, index: any) => ({
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
      links.map((item: any, index: any) => ({
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
  const items: CarouselItem[] = links.map((item: any, index: any) => ({
    alt: "",
    image: "",
    content: (
      <>
        <div
          style={{
            transition: "opacity .3s ease-in-out",
            opacity: `${circleQueue[index].opacity}`,
            //   opacity: {focused === index? return '1' : return'.3'},
            width: "100%",
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
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '10px',
              }}
            >
              {item.id}
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
    <div className={classes.background}>
        <AppBar />
        <div className="comp-container">
        <div
            style={{
            display: "flex",
            background: "black",
            position: "absolute",
            bottom: 0,
            right: 0,
            }}
        >
            {circleQueue.map((item: any, index: any) => {
            return (
                <div style={{ background: "green", color: "white", margin: "2px" }}>
                {item.focusState}
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
        </div>
    </div>
  );
};
export default SubCarousel;
