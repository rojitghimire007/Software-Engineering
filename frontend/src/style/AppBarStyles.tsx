import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    appContainer: {
        backgroundColor: '#425a4b', //'#3f4b4c',
        minHeight: '40px !important',
    },
    button: {
        color: '#fff !important',
    },

    headerOptions: {
        display: 'flex',
    },
}))

export default useStyles;