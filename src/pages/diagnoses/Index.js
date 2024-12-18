import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Row, Container } from "react-bootstrap";


const DiagnosisIndex = () => {
    const token = localStorage.getItem('token');
    const [diagnoses, setDiagnoses] = useState([]);

    //Get diagnoses
    useEffect(() => {
        axios.get("https://fed-medical-clinic-api.vercel.app/diagnoses", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data)
                setDiagnoses(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [token])

    if (!diagnoses) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <Container className="bg-teal-700">
            <Row className="mx-auto text-center text-white font-bold text-4xl py-2">
                <h1>All Diagnoses</h1>
            </Row>

            <Row className="d-flex flex flex-wrap justify-center">

                {diagnoses.map(({ id, patient_id, condition, diagnosis_date }) => (
                    <div class="p-6 w-5/12 m-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <h1 class="mb-2 text-2xl font-bold  text-gray-900 dark:text-white">{condition}</h1>

                        <h6 class="mb-2 text-1xl text-gray-900 dark:text-white">Diagnosis Date: {new Date(diagnosis_date * 1000).toLocaleDateString()}</h6>

                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            Patient: {patient_id}
                        </p>
                        <a href={`/diagnoses/${id}`} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 duration-300">
                            View More
                            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2 mt-2">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                    </div>
                ))}
                
            </Row>
        </Container>


    )
};

export default DiagnosisIndex;