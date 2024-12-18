import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {Row, Container} from "react-bootstrap"

const SingleDiagnosis = () => {
    const token = localStorage.getItem('token');
    const [diagnose, setDiagnose] = useState([]);
    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        axios.get(`https://fed-medical-clinic-api.vercel.app/diagnoses/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log(response.data)
                setDiagnose(response.data)
            })
            .catch((err) => {
                console.log(err)
            });
    }, [id, token]);

    const handleDelete = () => {
        axios.delete(`https://fed-medical-clinic-api.vercel.app/diagnoses/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data);
                alert('Diagnosis deleted successfully.');
                navigate('/Diagnoses');
            })
            .catch((err) => {
                console.error(err.response);
                alert('Failed to delete.');
            });
    };

    return diagnose && (
<Container>
<Row className="d-flex flex flex-wrap justify-center">
    <div class="p-6 w-8/12 m-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h1 class="mb-2 text-5xl font-bold text-center text-gray-900 mb-4">{diagnose.condition}</h1>
        <hr></hr>
        <h6 class="my-2 text-2xl font-normal text-center text-gray-900">Diagnosis Details:</h6>
        <p class="mb-2 font-normal text-center text-gray-700">Diagnosis Date: {new Date(diagnose.diagnosis_date * 1000).toLocaleDateString()}</p>
        <hr></hr>
        <h6 class="my-2 text-2xl font-normal text-center text-gray-900">Patient Details:</h6>
        <p class="mb-3 font-normal text-center text-gray-700">
        Patient ID: {diagnose.patient_id}
        </p>
        <hr></hr>
    </div>
</Row>
<Row className="d-flex flex flex-wrap justify-center">  
        <a href={`/diagnoses/${id}/edit`} className="btn bg-indigo-500 w-3/12 text-white text mx-2">Edit Diagnosis</a>
    <button className="btn bg-red-500 w-3/12 text-white mx-2" onClick={handleDelete}>Delete</button>
</Row>
</Container>
    )
};

export default SingleDiagnosis;