import { makeStyles } from "@material-ui/core"


const useStyles = makeStyles((theme) => ({
    appContainer: {
        zIndex: 1,
        backgroundColor: '#425a4b',
        //border: '2px #005b9f groove',
        /* padding-bottom: 2rem, */
        /* height: 100%,
        width: 100%, 
         position: 'relative', 
         bottom: 0,*/
        left: 0,
        right: 0,
        display: 'flex',
        //width: '100%',
        maxWidth: 'lg',
        position: 'absolute',
        bottom: 0,
        minHeight: '20px !important',
        //flexDirection: 'column',
        /* margin-top: 2em, */
        /* position: fixed, */
    },

    title: {
        margin: '0 0 0 0',
    },
    button: {
        color: '#fff !important',
        '&:hover':{ 
            color: '#0000ff !important',
        },
    },


}))

export default useStyles;