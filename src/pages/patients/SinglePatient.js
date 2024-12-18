import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {Row, Container} from "react-bootstrap"

const SinglePatient = () => {
    const token = localStorage.getItem('token');
    const [patient, setPatient] = useState([]);
    const navigate = useNavigate()

    const { id } = useParams();

    //Get patients
    useEffect(() => {
        axios.get(`https://fed-medical-clinic-api.vercel.app/patients/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log(response.data)
                setPatient(response.data)
            })
            .catch((err) => {
                console.log(err)
            });
    }, [id, token]);

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

    const filteredDiagnoses = diagnoses.map(({ id, patient_id }) => {
        return [id, patient_id]
    })

    const handleDelete = () => {

        for (let i = 0; i < filteredDiagnoses.length; i++) {
            for (let j = 0; j < filteredDiagnoses[i].length; j++) {
    
                if (filteredDiagnoses[i][j] === patient.id) {
                    console.log("Found one")
                     axios.delete(`https://fed-medical-clinic-api.vercel.app/diagnoses/${filteredDiagnoses[i][0]}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                        .then((res) => {
                            console.log(res.data);
                            alert('Deleted successfully.');
                            navigate('/patients');
                        })
                        .catch((err) => {
                            console.error(err.response);
                            alert('Failed to delete.');
                        });
                     
                }
                
            }
        }

        axios.delete(`https://fed-medical-clinic-api.vercel.app/patients/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data);
                alert('Patient deleted successfully.');
                navigate('/patients');
            })
            .catch((err) => {
                console.error(err.response); // Log error response for debugging
                alert('Failed to delete.');
            });
    };

    return patient && (
         <Container>
         <Row className="d-flex flex flex-wrap justify-center">
             <div class="p-6 w-8/12 m-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                 <h1 class="mb-2 text-5xl font-bold text-center text-gray-900 mb-4">{patient.first_name} {patient.last_name}</h1>
                 <hr></hr>
                 <h6 class="my-2 text-2xl font-normal text-center text-gray-900">Personal Details:</h6>
                 <p class="mb-2 font-normal text-center text-gray-700">Date of Birth: {new Date(patient.date_of_birth * 1000).toLocaleDateString()}</p>
                 <p class="mb-2 font-normal text-center text-gray-700">Address: {patient.address}</p>
                 <hr></hr>
                 <h6 class="my-2 text-2xl font-normal text-center text-gray-900">Contact Details:</h6>
                 <p class="mb-3 font-normal text-center text-gray-700">
                     Email: {patient.email}
                 </p>
                 <p class="mb-3 font-normal text-center text-gray-700">
                     Phone: {patient.phone}
                 </p>
                 <hr></hr>
                 
             </div>
         </Row>
         <Row className="d-flex flex flex-wrap justify-center">  
                 <a href={`/patients/${id}/edit`} className="btn bg-indigo-500 w-3/12 text-white text mx-2">Edit Patient</a>
             <button className="btn bg-red-500 w-3/12 text-white mx-2" onClick={handleDelete}>Delete</button>
         </Row>
     </Container>
    )
};

export default SinglePatient;