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
const AboutUs = () => {
    return (
        <>
            <AppBar />
            <div style={styles.container}>
                <div>
                    <h2>Honor Guard Inspection</h2>
                </div>

                <h3 style={styles.header}>
                    Guided by our values
                </h3>
                <p style={styles.para}>
                    Here at Honor Guard Inspections, LLC, we have made it our mission to stay on top of the technological forefront leverages state-of-the-art tools to develop trustworthy and economical client relationships
                    It is by utilizing talented personnel with diverse industry backgrounds that we take great pride in our ability to provide comprehensive, innovative and cost conscious solutions for our clients.
                    With generations of combined experience, Honor Guard Inspections, LLC consists of highly skilled and detailed-oriented team of individuals dedicated to ensuring the quality and integrity of your oil
                    and gas pipelines and facilities. Our primary goal is to be the top consideration as a provider of ethical and profession management services. It is our guarantee that each project will be handledd with the
                    highest level of professionalism and integrity to organize, manage and execute a construction management and inspection services program.
                </p>

                <h3 style={styles.header}>What We Do</h3>
                <p style={styles.para}>We specialize in all aspects of pipeline and facility construction. We provide highly effective teams of experienced, dedication and OQ qualified professionals
                    with in-depth knowledge of the pipeline construction industry.
                </p>
                <p>Our team of professionsal have extensive experience in the inspection of pipeline and facility construction, maintenance, and operations. We are committed to providing
                    clients with safe, reliable, and environmentally responsible project solutions that drive productivitiy and project success. We ensure that each project is staffed
                    properly with experienced teams, and that each project is completed safely and in compliance with current regulatory requirements.
                </p>
                <div style={styles.split}>
                    <h3 style={styles.header1}>Safety</h3>
                    <p style={styles.para}>
                        We Believe work to zero is real - all injuries and occupational illnesses are preventable. Our people are expected to speak up about unsafe conditions and behaviours,
                        take action to address concerns or stop unsafe work, and look out for each other.
                    </p>
                    <h3 style={styles.header}>Collaboration</h3>
                    <p style={styles.para}>
                        In the workplace, collaboration occurs when two or more people work together towards a common goal that benefits the team or company. Workplace
                        collaboration requires interpersonal skills, communication skills, knowledge sharing and strategy, and can occur in a traditional office or between
                        members of a virtual team.
                    </p>
                    <h3 style={styles.header}>Our Stories</h3>
                    <p style={styles.para}>
                        Bring design and construction into the 21st century is characterised by unique components being brought together on-site, resulting in supply chains,
                        materials and processes requiring precise alignment to avoid cost and time overruns, and ultimately, gross inefficiencies.
                    </p>
                    <br/>
                    <h3 style={styles.header}>Integrity</h3>
                    <p style={styles.para}>
                        Integrity comes in many forms, but the most important traits that are expected at the workplace are dependability, honesty, loyalty and good judgement.
                        As an individual in the workplace, having integrity means: That your actions are consistent with your words; That you are trustworthy, reliable and honest.
                    </p>
                    <h3 style={styles.header}>Responsibility</h3>
                    <p style={styles.para}>
                        Your ability to be responsible and accountable is a direct result of the tasks you are assigned and your personal work ethic when you take ownership of your
                        work product. When you are hired for a job, your manager provides you a list of your duties.
                    </p>
                    <h3 style={styles.header}>Strategy</h3>
                    <p style={styles.para}>
                        Can be applied to aid an industrial facility’s profit margins in three areas to eliminate slow, tedious and error-prone paper-based data collection and
                        processes. Unplanned downtime and production interruptions halt revenues and increase unanticipated expenditures, putting greater pressure on prodution.
                    </p>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AboutUs;