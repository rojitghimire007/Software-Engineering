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
    para1: {
        marginBottom: '0px',
        marginTop: '0px',
    },
    para: {
        marginTop: '0px',
    },
    list: {
        paddingLeft: '20px',
        marginTop: '0px',
    }
};

const Careers = () => {
    return (
        <>
            <AppBar />
            <div style={styles.container}>
                <div>
                    <h2>Honor Guard Inspection</h2>
                </div>
                <p style={styles.para}>
                    Honor Guard Inspection Services is committed to our employees, their families, and their
                    career development. That is why we offer a multitude of benefits, including:
                </p>
                <h3 style={styles.header}>Dispatcher</h3>
                <p style={styles.para}>
                    The mission of the Dispatch office is to assist our employees in obtaining gainful employment
                    within the scope of his or her job classification and skill level. Our goal is to do this in a
                    fair and impartial manner that respects each employees right to be offered work based solely on
                    Out-of-Work Date and skills designated.
                </p>
                <p>
                    A Job Line has been established and jobs ordered by contractors are posted between the hours of
                    6 P.M. and 7 A.M., Central Standard Time, Monday thru Friday. You may call and apply for any job
                    in your classification that you feel you are competent and capable of performing. The next morning
                    the job will be filled by the Member that applies for the job and has the oldest Out-of-Work Date.
                    The Out-Of-Work List exists to make sure every Member gets a fair share of the available jobs.
                    Additionally, our fair contractors get the well trained, top-quality professionals they need for
                    world-class pipeline work – people like you – whenever, wherever they need them. If we all do our
                    part, everybody comes out ahead!
                </p>
                <h3>Staffing</h3>
                <p style={styles.para1}>Non-Continental Region</p>
                <p style={styles.list}>
                    Alaska or Hawaii
                </p>
                <p style={styles.para1}>Northeast Region</p>
                <p style={styles.list}>
                    Maine, New Hampshire, Vermont, Massachusetts, Connecticut, Rhode Island, New York, Pennsylvania, New Jersey,
                    Delaware, District of Columbia, Maryland, West Virginia, or Virginia
                </p>
                <p style={styles.para1}>Southeast Region</p>
                <p style={styles.list}>
                    Tennessee, North Carolina, South Carolina, Mississippi, Alabama, Georgia, or Florida
                </p>
                <p style={styles.para1}>Great Lakes Region</p>
                <p style={styles.list}>
                Wisconsin, Illinois, Michigan, Indiana, or Ohio
                </p>
                <p style={styles.para1}>South/Gulf Region</p>
                <p style={styles.list}>
                Texas, Oklahoma, Arkansas, or Louisiana
                </p>
                <p style={styles.para1}>Midwest Region</p>
                <p style={styles.list}>
                North Dakota, South Dakota, Minnesota, Iowa, Nebraska, Kansas, or Missouri
                </p>
                <p style={styles.para1}>Dispatch</p>
                <p style={styles.para1}>Safety</p>
            </div>
            <Footer />
        </>
    )
}
export default Careers;