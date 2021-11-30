import React from "react";
import AppBar from "../../components/AppBar";
import Footer from "components/Footer";


const styles = {
    container: {
        padding: '20px 30px 20px 20px',
        minHeight: 'calc(100vh - 20px)',
    },
    header: {
        marginBottom: '0px',
    },
    para: {
        marginTop: '0px',
    },
};
const ContactUs = () => {
    return (
        <>
            <AppBar />
            <div style={styles.container}>
                <h2 style={styles.header}>Office Hours</h2>
                <p style={styles.para}> Monday - Friday</p>
                <p>7:00a.m. - 4:00p.m.</p>


                <h3 style={styles.header}>Honor Guard Inspection</h3>
                <p style={styles.para}>401 Keystone Road</p>
                <p>Monroe, LA 71202</p>


                <p> Office : 318-355-2938</p>
                <p>E-mail: 401keystone@gmail.com</p>
            </div>
            <Footer />
        </>

    )
}

export default ContactUs;