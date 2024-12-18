import { Row, Col, Container } from "react-bootstrap";


const Home = () => {

    return (
        <Container>
            <Row className="relative bg-cover d-flex flex justify-center items-center bg-blue-400 mx-auto text-center text-white font-extrabold h-80 text-4xl py-2" style={{ backgroundImage: "url('/images/medclinic.jpg')" }}>
            <span className="absolute inset-0 bg-cyan-700 opacity-30 "></span>
            <span className="relative">Welcome to our Medical Clinic</span>

            </Row>
            <Row>
                <Col md={12}>
                    <a href="/doctors">
                    <button className="relative bg-cover text-white text-6xl font-semibold w-full h-40 hover:h-48 duration-300 my-1 rounded-lg"
                        style={{ backgroundImage: "url('/images/doctors.jpg')" }}>
                        <span className="absolute inset-0 bg-cyan-700 opacity-80 hover:opacity-90 transition-opacity duration-300"></span>
                        <span className="relative">Doctors</span>
                    </button></a>
                </Col>

                <Col md={12}>
                <a href="/patients">
                    <button className="relative bg-cover text-white text-6xl font-semibold w-full h-40 hover:h-48 duration-300 mb-1 rounded-lg"
                        style={{ backgroundImage: "url('/images/patients.jpg')" }}>
                        <span className="absolute inset-0 bg-teal-700 opacity-80 hover:opacity-90 transition-opacity duration-300"></span>
                        <span className="relative">Patients</span>
                    </button>
                    </a>
                </Col>

                <Col md={12}>
                <a href="/appointments">
                    <button className="relative bg-cover text-white text-6xl font-semibold w-full h-40 hover:h-48 duration-300 mb-1 rounded-lg"
                        style={{ backgroundImage: "url('/images/appointments.jpg')" }}>
                        <span className="absolute inset-0 bg-cyan-700 opacity-80 hover:opacity-90 transition-opacity duration-300"></span>
                        <span className="relative">Appointments</span>
                    </button>
                    </a>
                </Col>

                <Col md={12}>
                <a href="/diagnoses">
                    <button className="relative bg-cover text-white text-6xl font-semibold w-full h-40 hover:h-48 duration-300 mb-1 rounded-lg"
                        style={{ backgroundImage: "url('/images/diagnosis.jpg')" }}>
                        <span className="absolute inset-0 bg-teal-700 opacity-80 hover:opacity-90 transition-opacity duration-300"></span>
                        <span className="relative">Diagnoses</span>
                    </button>
                    </a>
                </Col>

                <Col md={12}>
                <a href="/prescriptions">
                    <button className="relative bg-cover text-white text-6xl font-semibold w-full h-40 hover:h-48 duration-300 mb-1 rounded-lg"
                        style={{ backgroundImage: "url('/images/prescription.jpg')" }}>
                        <span className="absolute inset-0 bg-cyan-700 opacity-80 hover:opacity-90 transition-opacity duration-300"></span>
                        <span className="relative">Prescriptions</span>
                    </button>
                    </a>
                </Col>
            </Row>
        </Container>
    )
};

export default Home;