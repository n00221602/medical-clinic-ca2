import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {Row, Container} from "react-bootstrap"

const SinglePrescription = () => {
    const token = localStorage.getItem('token');
    const [prescription, setPrescription] = useState([]);
    const navigate = useNavigate()

    const { id } = useParams();

    useEffect(() => {
        axios.get(`https://fed-medical-clinic-api.vercel.app/prescriptions/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log(response.data)
                setPrescription(response.data)
            })
            .catch((err) => {
                console.log(err)
            });
    }, [id, token]);

    const handleDelete = () => {
        axios.delete(`https://fed-medical-clinic-api.vercel.app/prescriptions/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data);
                alert('Prescription deleted successfully.');
                navigate('/prescriptions');
            })
            .catch((err) => {
                console.error(err.response);
                alert('Failed to delete.');
            });
    };
    return prescription && (
        <Container>
         <Row className="d-flex flex flex-wrap justify-center">
             <div class="p-6 w-8/12 m-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                 <h1 class="mb-2 text-5xl font-bold text-center text-gray-900 mb-4">{prescription.medication}</h1>
                 <hr></hr>
                 <h6 class="my-2 text-2xl font-normal text-center text-gray-900">Dosage Details:</h6>
                 <p class="mb-2 font-normal text-center text-gray-700">{prescription.dosage}</p>
                 <hr></hr>
                 <h6 class="my-2 text-2xl font-normal text-center text-gray-900">Prescription Details:</h6>
                 <p class="mb-3 font-normal text-center text-gray-700">
                 Doctor: {prescription.doctor_id}
                 </p>
                 <p class="mb-3 font-normal text-center text-gray-700">
                 Patient: {prescription.patient_id}
                 </p>
                 <hr></hr>
                 <h6 class="my-2 text-2xl font-normal text-center text-gray-900">Cycle Details:</h6>
                 <p class="mb-3 font-normal text-center text-gray-700">
                 Start Date: {new Date(prescription.start_date * 1000).toLocaleDateString()}
                 </p>
                 <p class="mb-3 font-normal text-center text-gray-700">
                 End Date: {new Date(prescription.end_date * 1000).toLocaleDateString()}
                 </p>
                 <hr></hr>
                 
             </div>
         </Row>
         <Row className="d-flex flex flex-wrap justify-center">  
                 <a href={`/prescriptions/${id}/edit`} className="btn bg-indigo-500 w-3/12 text-white text mx-2">Edit Prescription</a>
             <button className="btn bg-red-500 w-3/12 text-white mx-2" onClick={handleDelete}>Delete</button>
         </Row>
     </Container>
    )
};

export default SinglePrescription;