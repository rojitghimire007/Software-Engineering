import React from "react";
import AppBar from "../../components/AppBar";
import Footer from "components/Footer";

const styles = {
    container: {
        padding: '20px 30px 20px 20px',
    },
    header: {
        marginBottom: '0px',
    },
    header1: {
        marginBottom: '0px',
        marginTop: '0px',
    },
    para: {
        marginTop: '0px',
    },
    split: {
        columns: '2 auto',
    }
};

const Training = () => {
    return (
        <>
            <AppBar />
            <div style={styles.container}>
                <div>
                    <h2>Honor Guard Inspection</h2>
                </div>

                <h3 style={styles.header}>Instroduction</h3>
                <p style={styles.para}>
                    In order to ensure the highest quality inspection of construction and related activities, Kinder
                    Morgan Project Management has established a Construction Inspection Orientation Testing Program to
                    confirm that all Construction Inspectors are knowledgeable of the KM Construction Standards. All
                    Construction Inspectors are required to take the inspector test questions relevant to the work
                    disciplines that they have been assigned to perform. Testing is to be performed as an “open book” test.
                    In order to pass the various tests, the Construction Inspector must be able to access and utilize
                    an electronic or hard copy version of the KM Construction Standards during the testing.
                </p>
                <p>
                As determined by the KM BU Test Administrator a passing score is required to pass each test. If the 
                Construction Inspector misses any questions, they will be allowed to retake the test made up of only the 
                missed questions If the Construction Inspector fails to pass the test after the allotted attempts, the 
                Construction Inspector will be “locked out” of the specific test, and be required to request assistance 
                from the Inspection Company Contractor Administrator. Test reset requests will only be evaluated after 
                all of your test attempts have been completed. Note that if you fail more than three tests your tests 
                will only be reset after approval from a KM Project Manager or Construction Manager. 
                </p>
                <h3 style={styles.header}>Ethics</h3>
                <p style={styles.para}>
                KM has as its core values honesty, integrity and respect for people. KM also firmly believes in the 
                fundamental importance of the promotion of trust, openness, teamwork and professionalism, and pride in 
                what we do. It is critical to KM's success that each KM Construction Inspector conducts themselves 
                ethically and legally in every aspect of their business activities. 
                </p>
                <p>
                As a representative of the Company in the eyes of the Contractor and the public, the Inspector shall 
                always maintain the highest of degree of integrity in all work, and be objective and professional in 
                keeping with Company’s best interest. Diligence, honesty, consistency, neatness, courtesy, and fairness
                 are all basic elements that define the high standard of conduct required of all personnel employed by KM.

                Each Inspector is in a position of trust and shall act openly and ethically to ensure that the Company’s 
                objectives and obligations are met in a manner that enhances the Company’s reputation of honesty, 
                integrity, reliability, and fairness. All Inspectors shall use conservative judgment and avoid all 
                situations that could put them in conflict with the interests of the Company. Regarding unethical business 
                practices, the Company has declared a “ZERO TOLERANCE” policy. Inspection employees found to be involved in 
                unethical business practices “on or off the ROW” will be immediately removed from the project and terminated 
                from project employment.
                </p>
                <p>
                Test questions are confidential and proprietary to Kinder Morgan. KM Construction Inspectors are not allowed 
                to copy test material or assist others with their respective test questions.
                </p>
                <p>
                By selecting NEXT you acknowledge that you have read and will comply with the statement above.
                </p>
                <h3 style={styles.header}>Instructions</h3>
                <p style={styles.para}>
                Welcome to the Kinder Morgan Construction Inspection Orientation Testing Program. The Test titles listed are 
                the ones assigned to you so highlight the test title for the test you want to take and select ' Take Test ' 
                at the top right to get started.
                </p>
            </div>
            <Footer/>
        </>
    )
}
export default Training;