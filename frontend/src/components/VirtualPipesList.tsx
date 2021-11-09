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
            <h1>Virtual List Testing</h1>
            <Droppable droppableId="droppable">
                {/* Expects a react component as a return! */}
                {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {someData.map((item, i) => (
                            <Draggable draggableId={item.id} index={i}>
                                {/* Expects a react component as a return! */}
                                {(provided, snapshot) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <div>
                                            {item.name}
                                        </div>
                                        
                                    </div>
                                )}
                            </Draggable>
                        ))} {/* end Map */}
                        {provided.placeholder}
                    </div>
                )} {/* End Droppable */}
            </Droppable>
        </DragDropContext>
    )
};

export default VirtualPipesList
