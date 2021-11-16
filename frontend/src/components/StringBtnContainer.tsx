import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import MyButton from './MyButton';
import DeleteDnD from './DeleteDnD';
import TransferDnD from './TransferDnD';

const styles = makeStyles({
    container: {
        position: 'relative',
        // left: '-200px',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'flex-start',
        width: 'fit-content',
        paddingLeft: '50px',
        // height: '300px',
        // border: '2px solid',
        // transform: 'rotate(90deg)',
        // background: 'rgba(0,0,240,1)',
    },
})

const StringBtnContainer = () => {
    const classes = styles();
    const [click, setClick] = useState(false);
    const [showArea, setShowArea] = useState('');
    useEffect(()=>{
        console.log(click);
        console.log(showArea);
    }, [showArea])

    return (
        <div className={classes.container}>
            <MyButton content="Delete" type="del" onClick={() => { setClick(!click); setShowArea("delete");}} />
            <MyButton content="Transfer" type="tran" onClick={() => { setClick(!click); setShowArea("transfer") }} />
            <MyButton content="Add" type="add" onClick={() => { setClick(!click); setShowArea("add") }} />
            {click ?
                <>
                    {showArea === 'delete' ?
                        <DeleteDnD clck={click} shwarea={showArea}></DeleteDnD>
                        
                        :
                        null}
                    {showArea === 'transfer' ?
                        <TransferDnD clck={click} shwarea={showArea}></TransferDnD>
                        :
                        null}
                    {showArea === 'add' ?
                        <DeleteDnD clck={click} shwarea={showArea}></DeleteDnD>
                        :
                        null}
                </>
                :
                null}
        </div>
    )
}

export default StringBtnContainer
