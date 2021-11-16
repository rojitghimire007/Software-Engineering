import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import DeleteForevorIcon from '@mui/icons-material/DeleteForever';
import { Droppable } from 'react-beautiful-dnd'
import MyButton from './MyButton'

const styles = makeStyles({
    container: {
        border: '1px solid blue'
    },
    deleteContainer: {
        height: '20vh',
        width: '80vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(240,240,240,.25)',
        margin: '0 auto',
        color: 'red',

        '&:hover': {
            background: 'rgba(255,50,50,1)',
            color: 'black',
        },
    },
    deleteIcon: {
        position: 'relative',
        transform: 'scale(2.75)',
        opoacity: .75,
        transition: '',
    },
})

const TransferDnD = ({clck, shwarea}: any) => {
    const classes = styles();
    const [click, setClick] = useState(false);
    const [showArea, setShowArea] = useState('');
    return (
        <div className={classes.container}>
            <MyButton content="Transfer" type="del" onClick={() => { setClick(!click); setShowArea("transfer")}} />
            {showArea === "transfer" ?
                <Droppable droppableId="transfer" direction="horizontal">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            // style={getListStyle(snapshot.isDraggingOver)}
                            {...provided.droppableProps}
                            // className={classes.virtList}
                            className={classes.deleteContainer}
                        >
                            <DeleteForevorIcon className={classes.deleteIcon} />
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                :
                null
            }
        </div>
    )
}

export default TransferDnD
