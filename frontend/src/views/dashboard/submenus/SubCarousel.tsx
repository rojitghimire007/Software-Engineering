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
        opacity: 1,
      }))
    );
    console.log(...circleQueue);
  }, [focused]);

  // Create an array of Carousel Items
  const items: CarouselItem[] = links.map((item: any, index: any) => ({
    alt: "",
    image: "",
    content: (
      <>
        <div>
          <a href={`${item.link}`} style={{ width: "100%", height: "33%" }}>
            <img src={item.image} style={{ height: "80%" }}></img>
            <div
              style={{
                height: "20%",
                color: "white",
                fontSize: "small",
                textDecoration: "none",
                backgroundColor: "black",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
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
