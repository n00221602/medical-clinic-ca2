import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Container } from "react-bootstrap";

const SingleAppointment = () => {
    const token = localStorage.getItem('token');
    const [appointment, setAppointment] = useState([]);
    const [doctor, setDoctor] = useState([]);
    const [patient, setPatient] = useState([]);
    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        axios.get(`https://fed-medical-clinic-api.vercel.app/appointments/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log(response.data)
                setAppointment(response.data)
            })
            .catch((err) => {
                console.log(err)
            });
    }, [id, token]);

    const handleDelete = () => {
        axios.delete(`https://fed-medical-clinic-api.vercel.app/appointments/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data);
                alert('Appointment deleted successfully.');
                navigate('/appointments');
            })
            .catch((err) => {
                console.error(err.response);
                alert('Failed to delete.');
            });
    };

    return appointment && (
<Container>
<Row className="d-flex flex flex-wrap justify-center">
    <div class="p-6 w-8/12 m-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h1 class="mb-2 text-5xl font-bold text-center text-gray-900 mb-4">Appointment Date: {new Date(appointment.appointment_date * 1000).toLocaleDateString()}</h1>
        <hr></hr>
        <h6 class="my-2 text-2xl font-normal text-center text-gray-900">Appointment Details:</h6>
        <p class="mb-2 font-normal text-center text-gray-700">Doctor ID: {appointment.doctor_id}</p>
        <p class="mb-2 font-normal text-center text-gray-700">Patient ID: {appointment.patient_id}</p>
        <hr></hr>
        
    </div>
</Row>
<Row className="d-flex flex flex-wrap justify-center">  
        <a href={`/appointments/${id}/edit`} className="btn bg-indigo-500 w-3/12 text-white text mx-2">Edit Appointment</a>
    <button className="btn bg-red-500 w-3/12 text-white mx-2" onClick={handleDelete}>Delete</button>
</Row>
</Container>
    )
};

export default SingleAppointment;