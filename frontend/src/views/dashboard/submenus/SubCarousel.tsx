import AppBar from "components/AppBar";
import react, { useState, useEffect } from "react";
import { Carousel, CarouselItem } from "react-round-carousel";
import "./SubCarousel.css";
import useStyles from "../../../style/DashboardStyles";

const SubCarousel = (slides: any) => {
  const classes = useStyles();
  const links = slides;

  const [focused, setFocused] = useState(0);
  const [rotating, setRotating] = useState(false);
  const [testString, setTestString] = useState("(test me here)");

  const [circleQueue, setCircleQueue] = useState(
    links.map((item: any, index: any) => ({
      prev: index - 1 < 0 ? links.length - 1 : index - 1,
      index: index,
      focusState: index === focused ? true : false,
      next: index + 1 > links.length - 1 ? 0 : index + 1,
      // opacity: 1,
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
        // opacity: 1,
      }))
    );
    console.log(...circleQueue);
  }, [focused]);

  const handleOpacity = (index: any) => {
    const LR3 = 0.5; // everything else
    const LR2 = 0.7; // tertiary focus
    const LR1 = 0.95; // secondary focus
    const cen = 1; // focus
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
        <div style={{ minWidth: "100%" }}>
          <a href={`${item.link}`} style={{ width: "100%", height: "33%" }}>
            <img
              src={item.image}
              style={{
                height: "80%",
                opacity: handleOpacity(index),
                transition: "opacity .4s ease-in-out",
              }}
            ></img>
            <div
              style={{
                height: "20%",
                // minWidth: "100%",
                color: "white",
                fontSize: "small",
                textDecoration: "none",
                backgroundColor: "black",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
              }}
            >
              {item.id}
              {console.log("")}
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
      <Carousel
        items={items}
        itemWidth={200}
        nextButtonContent={
          <button
            style={{
              position: "relative",
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
              right: "70%",
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
  );
};
export default SubCarousel;
