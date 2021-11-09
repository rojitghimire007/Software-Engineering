import React, {useState} from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
// import '../stylesheets/carousel2.module.css'

function MenuItem(props) {
    // const [level,setLevel] = useState()
    // const itemNumber = props.index % props.viewSize;
    // const levelMake = (lvl) => {
    //     const aLevel = "item"
    //     console.log(lvl)
    //     setLevel(aLevel)
    //     return ""
    // };
    return (
        // {/* <TransitionGroup /* className={"item"+(itemNumber+1)} */> */}
            // {/* <CSSTransition
            //     key={props.index}
            //     in={true}
            //     appear={true}
            //     timeout={700}
            //     classNames={props.direction}
            // > */}
            //     {/* {levelMake}  */}
                <div style={{
                    border: '5px solid black', 
                    textAlign: 'center',
                    // position: 'sticky',
                    marginBottom: '3px',
                    marginLeft: '4px',
                    marginRight: '4px',
                    display: 'flex',
                    // flexDirection:'column'
                }}
                    key={props.index}
                    // className={"item"+(itemNumber+1)} /* DEMO2 */
                    // className={props.className}
                    /* className={level} /* Demo 3 */
                    // className="item" /* Demo 3 */
                >
                    <div>
                        {props.menuTitle} - {props.id}
                    </div>
                    {/* <div>
                        <button>Option A</button>
                    </div>
                    <div>
                        <button>Option B</button>
                    </div>
                    <div>
                        <button>Option C</button>
                    </div> */}
                    {/* {() => levelMake(props.theLevel)} */}
                </div>
            // {/* </CSSTransition> */}
        /* </TransitionGroup> */
    )
}

export default MenuItem