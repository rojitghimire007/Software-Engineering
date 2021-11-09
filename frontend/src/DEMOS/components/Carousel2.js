import React, {useState,useEffect} from 'react'
import MenuItem from './MenuItem'
// import LoadingBar from './LoadingBar';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
// import '../stylesheets/carousel2.module.css'



function Carousel2(props) {
    // get list items
    // create movement functions
    // make sure window doesn't move


    // menus rendered
    const items = [
        "A","B","C","D","E","F","G","H","I","J","K","L"
    ];

    // remove class by using Hooks
    const [view,setView] = useState([0,props.winSize-1]); //indices shown; initial size (3 items)
    const [listItems,setListItems] = useState(items.slice(0,props.winSize)) // stateful array
                                                                              // to loop!
    // const [listItems,setListItems] = useState() 
    const [active,setActive] = useState([true,true,true]);
    const [direction,setDirection] = useState("in"); // for CSS???
    const [viewButton,setViewButton] = useState(true);
    const [itemsButton,setItemsButton] = useState(false);
    const [listItemsButton,setListItemsButton] = useState(true);

    // Transitions
    const [inProp,setInProp] = useState(true); // not used yet
    const [shownMenus,setShownMenus] = useState(true); // not used yet

    const handleTransitions = (index) => {
        
    };

    useEffect(() => {
        let indS = view[0];
        let indE = view[1];
        let distance = 0;

        if (indS < indE){
            distance = indE - indS;
        }
        else distance = indS - indE;

        // console.log(indS + " -> " + indE + " and distance is " + distance)

        if (indS < indE){
            // setListItems([items[indS],items[indS + 1],items[indE]]);
            setListItems(items.slice(indS,indE+1));
            // console.log(listItems);
        }

        // HARD CODED
        // ...for now.
        // else if (indS == 10){
        // else if ((indS + distance) == (items.length - 1) ){
        else if (indS > indE){
            const a1 = items.slice(indS,items.length); // start -> array end
            const a2 = items.slice(0,indE+1); // 0 -> view end

            // setListItems([items[indS],items[indS + 1],items[indE]]);
            setListItems(a1.concat(a2));
            // console.log("index.length: " + (items.length -1))
        }
        // else if (indS == 11){
        //     setListItems([items[indS],items[0],items[indE]]);
        // }
        
    }, [view])
    
    const moveLeft = () => {
        var lo = view[0];
        var hi = view[1];

        // the following decrements top and bottom of array window
        // English: "if x is the lowest index, make it the highest possible window"
        //          "else, decrement by 1"
        if (lo == 0 ) {
            lo = items.length - 1; // 11 to...
            hi = hi - 1; // ...what should be index 1 (3 item window)   
            
            setDirection("left");
        }
        else{
            lo = lo - 1; // some index to...
            
            if (hi == 0) {
                hi = items.length - 1; // ...the highest non-negative(!) index..
            }
            else hi = hi - 1; // ...or some other index
            setDirection("left");
        }
        
        let newArray=[lo,hi];
        setView([newArray[0],newArray[1]]); // put it in the state
        // console.log(view); // check
        return
    };
    
    const moveRight = () => {
        var lo = view[0];
        var hi = view[1];
        
        // the following increments top and bottom of array window
        // English: "if x is the highest index, make it the lowest possible window"
        //          "else, increment by 1"
        
        if (hi == items.length - 1 ) {
            lo = lo + 1; // A non-maximum index to...
            hi = 0; // ...0
            setDirection("right");
        }
        else{
            if (lo == items.length - 1) {
                lo = 0
            }
            else lo = lo + 1; // some index to...
            
            hi = hi + 1; // ...or some other index
            setDirection("right");
        }

        let newArray=[lo,hi];
        setView([newArray[0],newArray[1]]); // put it in the state
        // console.log(view); // check
        return
    };

    return (
        <div>
            <div style={{
                marginLeft: "20%", 
                marginRight: "20%",
                display:'flex',
                flexWrap: 'no wrap',
                // display: 'grid',
                // gridTemplateColumns: 'auto auto auto',
                // justifyContent: 'center',
                // alignItems: 'center'
            }}>
                <button
                    onClick={() => moveLeft()}
                >
                    Move Left
                </button>

                {/* MENU ITEM CONTAINER */}
                {/* <TransitionGroup 
                    style={{
                        // display: "flex",
                        // flexDirection: "row",
                        // flexShrink: 3,
                        display: 'grid',
                        gridTemplateRows: 'auto auto auto',
                        gridTemplateColumns: 'auto auto auto',


                        // display: "inline-grid",
                        // gridTemplateColumns: "[col1] 33% [col2] 33% [col3] 33%",
                        // gridTemplateRows: "[row1] 33% [row2] 33% [row3] 33%",
                        // placeItems: 'center'
                    }}
                    enter={true}
                    exit={true}
                    timeout={100}
                    classNames={direction}
                > */}
                        <>
                            {/* MENU ITEMS */}
                            {listItems.map((item, index) => {
                                
                                return(
                                    <>
                                        {/* <CSSTransition
                                            in={inProp}
                                            // key={listItems.indexOf(items)}
                                            // mountOnEnter={true}
                                            // unmountOnExit={true}
                                            // appear={true}
                                            // enter={true}
                                            // exit={true}
                                            // timeout={700}
                                            classNames={`fade ${direction}`}
                                            // classNames="fade"
                                            onEntering={() => console.log("enter happen")}
                                            onExiting={() => console.log("exited happen")}
                                            // style=`gridColumn: ${(Math.ceil(index / 3))} / ${(Math.ceil(index / 3))}` 
                                            
                                        > */}
                                            <MenuItem 
                                                style={{
                                                    // gridRow: index +"/"+ (index + 1), 
                                                }}
                                                index={items.indexOf(item).toString()} 
                                                menuTitle={item} 
                                                id={items.indexOf(item).toString()} 
                                                direction={direction}
                                                viewSize={listItems.length}
                                            >
                                                {/* {console.log(shownMenus)} */}
                                                {/* {console.log(listItems.indexOf(item).toString())} */}
                                                {/* {console.log("testing item "+item+": "+view[0]+" (lo) "+view[1]+" (hi) to index "+index)} */}
                                                {/* {view[0] > view[1] ? console.log("lo is higher than hi") : null} */}
                                            </MenuItem>
                                            {/* </CSSTransition> */}
                                    </>
                                )
                            })}
                        </>
                    {items.map((item) => {
                        // <div
                        // style={{
                        //     backgroundColor: 'blue',
                        //     height: '4px',
                        //     width: `${(100 / (props.winSize))}` + "%",
                        // }}
                        // />
                    })}
                {/* </TransitionGroup> */}

                <button
                    onClick={() => moveRight()}
                >
                    Move Right
                </button>
                {/* ROW BREAK */}
                {/* <div style={{flexBasis: '100%', border: '3px solid pink'}}/>  */}

                {/* <LoadingBar 
                    starts={view[0]}
                    ends={view[1]}
                /> */}
            </div>
            <div style={{
                marginLeft: "20%", 
                marginRight: "20%",
                display:'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // border: '2px dashed red'
            }}>
            </div>
            <div style={{
                marginTop: '20px',
                borderWidth: '1px 3px 5px 3px',
                borderStyle: 'solid dashed',
                textAlign: 'center',
                marginLeft: '30px',
                marginRight: '30px',
                paddingBottom: '30px',
            }}>
                <h3>Tools</h3>
                <div>
                    <button
                        onClick={() => {
                            setViewButton(!viewButton);
                        }}
                    >
                        View Window State
                    </button>

                    {viewButton ?
                        <span>--({view[0]},{view[1]})</span>
                        :
                        null
                    }
                </div>
                <div>
                    <button
                        onClick={() => {
                            setListItemsButton(!listItemsButton);
                        }}
                    >
                        View ItemList
                    </button>

                    {listItemsButton ?
                        <span>--({listItems})</span>
                        :
                        null
                    }
                </div>
                <div>
                    <button
                        onClick={() => {
                            // setListItemsButton(!listItemsButton);
                        }}
                    >
                        View Transitions
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => {
                            setItemsButton(!itemsButton);
                        }}
                    >
                        View Items
                    </button>

                    {itemsButton ?
                        <span>--({items})</span>
                        :
                        null
                    }
                </div>
            </div>
        </div>
    )
}

export default Carousel2
