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

const Services = () => {
    return (
        <>
            <AppBar />
            <div style={styles.container}>
                <div>
                    <h2>Honor Guard Inspection</h2>
                </div>

                <p style={styles.header}>Honor Guard Inspections, LLC. We understands and respects the importance of the landowner
                    and cultivates these relationships while representing our clients.
                </p>
                <p>In the oil and gas inspection market, we manage successful pipeline, plant, and facility
                    projects on behalf of our clients. Honor Guard Inspections, LLC, provides the industry’s
                    most experienced, trained, and expert inspectors. We set ourselves apart with professionalism,
                    trust, commitment, and passion for the partnerships we build.
                </p>

                <h3 style={styles.header}>Safety & Environmental</h3>
                <p style={styles.para}>
                    Honor Guard Inspections, LLC. is dedicated to maintaining the highest level of standards in our operations
                    and continually improving our practices to prevent environmental health and safety risks. We strive to provide
                    a safe and healthy work environment for our employees and clients.
                </p>
                <p style={styles.para}>
                    Honor Guard Inspections, emphasizes safety through the practices of the client’s safety policies and procedures,
                    as well as TJ Inspection’s corporate safety policies and procedures that require and include daily on-site
                    safety meetings, weekly burn ban updates for all occupied areas, monthly safety awareness topics.
                </p>
                <p style={styles.para}>
                    Our employee’s safety and health are of primary importance to Honor Guard Inspections.
                    It is our responsibility to provide a safe and healthy work environment. We are committed to creating a safety culture in which
                    all of our employees feel they have an obligation, not only to themselves, but also to fellow employees,
                    to familiarize themselves with the safety practices that apply to their work. Honor Guard Inspections, is
                    committed to effective management of Health, Safety, Security, and Environmental (HSSE) issues, including
                    responsible stewardship of the environment and natural resources. This commitment is demonstrated through
                    the day-to-day core company values on safety and protection of the environment.
                </p>
                <h3 style={styles.header}>Compliance</h3>
                <p style={styles.para}>
                    Honor Guard Inspections, LLC. complies with all appropriate safety and security laws, federal and state
                    guidelines, regulations and requirements of the following:
                    <ul>
                        <li>Occupational Safety and Health Administration (OSHA)</li>
                        <li>Environmental Protection Agency (EPA)</li>
                        <li>Department of Transportation (DOT)</li>
                        <li>All State Regulatory Commissions</li>
                        <li>American Petroleum Institute (API 1104)</li>
                        <li>ISNet World</li>
                        <li>Client Required Operator Qualifications</li>
                        <li>National Compliance Management Services DOT Department</li>
                        <li>Pipeline Accident Prevention Services (PAPS)</li>
                        <li>Client Scope and Welding Procedures </li>
                    </ul>
                </p>
                <h3 style={styles.header}>Quality</h3>
                <p style={styles.para}>
                    Honor Guard Inspections, LLC. believes that in order to create and sustain a successful business, we must regulate
                    and maintain a strong quality control system through the implementation of the following: daily reports, on-site
                    evaluations, director and supervisor support, and constant client communication.
                </p>
                <p>
                    Honor Guard Inspections, has full-time, in-house field managers that work with the field inspectors, giving knowledgeable
                    support and being available to arrive on site to assist in crisis management and problem solve with the client.
                    Our field managers have been vital to our success through being involved with the client expectations and helping
                    to enforce their rules and regulations.
                </p>
                <h3 style={styles.header}>Cost Effeciency</h3>
                <p style={styles.para}>
                    Honor Guard Inspections, LLC. customer service starts with the client’s needs. We work with our clients closely to know
                    and understand the direction and goals they have set for the future.
                </p>
                <p>
                    We utilize the support of the Honor Guard Inspections, Training Center to customize curriculum in order to ensure communication
                    from Honor Guard Inspections, management to the field and client. Our field managers have constant communication with both the
                    client and the inspector to ensure updates and changes within the client scope are relayed and successfully implemented.
                </p>
                <p>
                    We have developed detailed inspection classes, multiple mobile training units and the ability to train in-house. Classes are
                    customized for beginners to seasoned inspectors. This allows for continued growth and development.
                </p>
                <p>
                    Honor Guard Inspections, offers a complete list of inspection services with the ability to customize our special services to
                    better serve the client’s needs.Our goal is to develop well-rounded, professional inspectors to support our clients and provide
                    proficient customer service.
                </p>
            </div>
            <Footer />
        </>
    )
}

export default Services;

