import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Row, Container } from "react-bootstrap";


const PatientIndex = () => {
    const token = localStorage.getItem('token');
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        axios.get("https://fed-medical-clinic-api.vercel.app/patients",{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data)
                setPatients(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [token])

    if (!patients) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <Container className="bg-teal-700">
        <Row className="mx-auto text-center text-white font-bold text-4xl py-2">
            <h1>All Patients</h1>
        </Row>

        <Row className="d-flex flex flex-wrap justify-center">
            
                {patients.map(({ id, first_name, last_name, email, phone, date_of_birth, address }) => (
                    <div class="p-6 w-5/12 m-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <h1 class="mb-2 text-2xl font-bold  text-gray-900 dark:text-white">{first_name} {last_name} - {id}</h1>

                        <h6 class="mb-2 text-1xl text-gray-900 dark:text-white">Address: {address}</h6>

                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            Date of Birth: {new Date(date_of_birth * 1000).toLocaleDateString()}
                        </p>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            Email: {email}
                        </p>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            Phone: {phone}
                        </p>
                        <a href={`/patients/${id}`} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 duration-300">
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

export default PatientIndex;