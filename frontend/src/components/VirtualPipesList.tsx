import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd'
import { makeStyles } from '@material-ui/core'
import { useState } from 'react';

const useStyles = makeStyles({
    context: {
        minWidth: '100%',
        height: '100%',
        border: '3px solid blue',
    },
});

const VirtualPipesList = ()=> {
    const someData = [{name: 'CJ', id:'a'},{name: 'SD', id:'b'},{name: 'FU', id:'c'},];
    const classes = useStyles();
    const [order,setOrder] = useState(someData);
    const handleDrop = () => {};
    return (
        <DragDropContext
            // className={classes.context}
            // onDragStart={() => {console.log("started")}}
            // onDragUpdate={() => {console.log("updated")}}
            onDragEnd={() => {console.log("ended"); handleDrop()}} // required
        >
        
        </DragDropContext>
    )
};

export default VirtualPipesList
