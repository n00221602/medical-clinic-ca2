import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DoctorIndex = () => {

    const [doctors, setDoctors] = useState([])

    useEffect(() => {
        axios.get("https://fed-medical-clinic-api.vercel.app/doctors")
            .then(response => {
                console.log(response.data)
                setDoctors(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    if (!doctors) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <div>
            <h1>All Doctors</h1>
            {doctors.map(({ id, first_name, last_name, email, phone, specialisation }) => {
                return (
                    <div>
                        <Link to={`/doctors/${id}`}>
                            <h3>{first_name} {last_name}</h3>
                        </Link>
                        <p>{email}</p>
                        <p>{phone}</p>
                        <p>{specialisation}</p>
                        <hr></hr>
                    </div>
                )
            })}
        </div>

    )
};

export default DoctorIndex