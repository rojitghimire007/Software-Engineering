import React, { useEffect, useState } from 'react'
import useStyles from 'style/ProjectsPageStyles';


const ProjectsPage = () => {
    const styles = useStyles();

    return (
                 
            <div>
                <table>
                    <thead>
                        <th>Company Name</th>
                        <th>Project Name</th>
                        <th>Project Number</th>
                        <th>Work Order Number</th>
                        <th>Work Site Location</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Add New Project</th>
                    </thead>
                    <tbody>
                        <tr className={styles.tr}>
                            <td>OnShore Quality Control</td>
                            <td>1740</td>
                            <td>65548782</td>
                            <td>65485</td>
                            <td>Smithfield, WV</td>
                            <td>01/10/18</td>
                            <td>12/31/19</td>
                            <td><button>Edit</button></td>
                        </tr>
                        {/* <tr style={{`${...styles.tr}`}}>
        <td>OnShore Quality Control</td>
        <td>1740</td>
        <td>65548782</td>
        <td>65485</td>
        <td>Smithfield, WV</td>
        <td>01/10/18</td>
        <td>12/31/19</td>
        <td><button>Edit</button></td>
    </tr>
    <tr style={{`${...styles.tr}`}}>
        <td>OnShore Quality Control</td>
        <td>1740</td>
        <td>65548782</td>
        <td>65485</td>
        <td>Smithfield, WV</td>
        <td>01/10/18</td>
        <td>12/31/19</td>
        <td><button>Edit</button></td>
    </tr>
    <tr style={{`${...styles.tr}`}}>
        <td>OnShore Quality Control</td>
        <td>1740</td>
        <td>65548782</td>
        <td>65485</td>
        <td>Smithfield, WV</td>
        <td>01/10/18</td>
        <td>12/31/19</td>
        <td><button>Edit</button></td>
    </tr> */}
                    </tbody>
                </table>
            </div>
    )
}

export default ProjectsPage
