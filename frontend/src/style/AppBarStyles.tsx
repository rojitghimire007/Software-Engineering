import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    appContainer: {
        backgroundColor: '#3f4b4c',
        minHeight: '40px !important',
    },
    button: {
        color: '#fff !important',
    },
    
    headerOptions: {
        fontColor: '#fff !important',
        display: 'flex',
    },
}))

export default useStyles;