import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SingleDoctor = () => {
    const token = localStorage.getItem('token');
    const [doctor, setDoctor] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        axios.get(`https://fed-medical-clinic-api.vercel.app/doctors/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log(response.data)
                setDoctor(response.data)
            })
            .catch((err) => {
                console.log(err)
            });
    }, [id, token]);

return doctor && (
    <div>
        <div>
            <h1>{doctor.first_name} {doctor.last_name}</h1>
            <p>{doctor.email}</p>
            <p>{doctor.phone}</p>
            <p>{doctor.specialisation}</p>
            <hr></hr>
        </div>
    </div>
)
};

export default SingleDoctor;