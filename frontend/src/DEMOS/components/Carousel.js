import React, {useState} from 'react'
import MenuItem from './MenuItem'

function Carousel() {
    // get list items
    // create movement functions
    // make sure window doesn't move


    // menus rendered
    const items = [
        "A","B","C","D","E","F","G","H","I","J","K","L"
    ];

    // remove class by using Hooks
    const [active,setActive] = useState(0);
    const [direction,setDirection] = useState();

    const moveLeft = () => {
        setActive(active--);
        setDirection('left')
    };
    const moveRight = () => {
        setActive(active++);
        setDirection('right')
    };
    return (
        // MENU CONTAINER
        <div style={{
            display:'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <button>MoveLeft</button>

            {/* MENU ITEM CONTAINER */}
            <div style={{
                marginLeft: "20%", 
                marginRight: "20%",
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
            }}>


                {/* MENU ITEMS */}
                {items.map((item, index) => {
                    return(
                        <>
                            {/* {console.log(index+" % 4 = " + (index % 4))} */}
                            {console.log(item + " at index " + index + " (" + index + " % 3 = " + (index % 3) + ")")}

                            {/* We want stacks of 3 */}
                            {index % 3 == 0 && index != 0 ?
                                <>
                                    {/* Break Column w/ 'flexBasis' */}
                                    {console.log("break column")}
                                    <div style={{flexBasis: "100%"}} />
                                    <MenuItem 
                                        // style={{gridRow: index % 3}}
                                        menuTitle={item} 
                                        id={index} 
                                        key={item}/>
                                </>
                            : 
                                <MenuItem 
                                    menuTitle={item} 
                                    id={index} 
                                    key={item}/>

                            }
                        </>
                    )
                })}
            </div>

            <button>MoveRight</button>
        </div>
    )
}

export default Carousel
