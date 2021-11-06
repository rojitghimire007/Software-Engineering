import { Login } from '@mui/icons-material';
import React, {useState, useEffect} from 'react';
import useStyles from 'style/ProjectSelectStyles';

const projects = [
    {name: 'Project A', accessed: 'Nov 04th, 2021'},
    {name: 'Project B', accessed: 'Nov 01st, 2021'},
    {name: 'Project C', accessed: 'Oct 19th, 2021'},
    {name: 'Project D', accessed: 'Oct 15th, 2021'},
    {name: 'Project E', accessed: 'Feb 07th, 2021'},
];

const ProjectSelect = () => {
    const classes = useStyles('');
    const [selected, setSelected] = useState('');
    const [errored, setErrored] = useState(false);
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        console.log(selected)
    }, [selected])

    const logIn = () => {
        if (selected === '') setErrored(true);
        else setLoading(true);
        console.log("logging in to "+selected)
    }

    return(
        <div className={classes.page}>

            {errored ? 
                <div className={classes.msg}>
                    Please select a project from the list.
                    <span 
                        className={classes.exit}
                        onClick={() => {setErrored(!errored)}}
                    >
                        X
                    </span>
                </div> 
                : null
            }

            {loading?
                <div className={classes.loading}>
                    <div className={classes.loadSymb}>
                        HGI
                    </div>
                    <div>
                        Loading
                    </div>
                </div>
                :null
            }

            <div className={classes.container}>
                <div className={classes.title}>Choose A Project</div>

                <div className={classes.list}>
                    {projects.map((item) => {
                        return (
                            <div 
                                className={classes.item}
                                onClick={() => {setSelected(item.name); setErrored(false)}}
                            >
                                <span style={{margin: '3px 3px'}}>
                                    {item.name}, last accessed {item.accessed}
                                </span>

                                {selected === item.name ? 
                                    <div style={{display: 'inline-block'}}>(chosen)</div>
                                    : null
                                }
                            </div>
                        )
                    })}
                </div>

                <div className={classes.bottom}>
                    {/* <span>Choose A Project</span> */}
                    <div 
                        className={classes.btn}
                        onClick={() => logIn()}
                    >
                        ENTER
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectSelect;