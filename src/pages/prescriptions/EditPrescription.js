import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditPrescription = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [diagnoses, setDiagnoses] = useState([]);

    const [form, setForm] = useState({
        patient_id: '',
        doctor_id: '',
        diagnosis_id: '',
        medication: '',
        dosage: '',
        start_date: '',
        end_date: ''
    });

    const { id } = useParams();

    //Get patients
    useEffect(() => {
        axios.get("https://fed-medical-clinic-api.vercel.app/patients", {
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

    //Get doctors
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

    //Get Prescription
    useEffect(() => {
        axios.get(`https://fed-medical-clinic-api.vercel.app/prescriptions/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log(response.data)
                setForm(response.data)
            })
            .catch((err) => {
                console.log(err)
            });
    }, [id, token]);

    const handleSubmit = () => {
        const formData = {
            ...form,
            doctor_id: Number(form.doctor_id),  // Converts id to number
            patient_id: Number(form.patient_id), // Converts id to number
            diagnosis_id: Number(form.diagnosis_id) // Converts id to number
        };

        axios.patch(`https://fed-medical-clinic-api.vercel.app/prescriptions/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data)
                navigate(`/prescriptions/${id}`)
            })
            .catch((err) => {
                if (err.response) {
                    // Log error details
                    console.log('Error response data:', err.response.data);
                    console.log('Error status:', err.response.status);
                } else {
                    console.log('Error message:', err.message);
                }
            });
    }

    const handleChange = (e) => {
        setForm(({
            ...form,
            [e.target.name]: e.target.value
        }))
    };


    return (
        <>
            <section class=" pt-60 bg-gray-50 dark:bg-gray-900">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                    <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Add Prescription
                            </h1>
                            <div class="space-y-4 md:space-y-6">




                                {/* Doctor input */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Doctor</label>
                                    <select name="doctor_id" value={form.doctor_id} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                                        {doctors.map(({ id, first_name, last_name }) => {
                                            return (
                                                <option key={id} value={id}>ID {id} - {first_name} {last_name}</option>
                                            )
                                        })}
                                    </select><br />
                                </div>

                                {/* Patient input */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Patient</label>
                                    <select name="patient_id" value={form.patient_id} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                                        {patients.map(({ id, first_name, last_name }) => {
                                            return (
                                                <option key={id} value={id}>ID {id} - {first_name} {last_name}</option>
                                            )
                                        })}
                                    </select><br />
                                </div>

                                {/* Diagnosis input */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Diagnosis</label>
                                    <select name="diagnosis_id" value={form.diagnosis_id} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                                        {diagnoses.map(({ id, condition }) => {
                                            return (
                                                <option key={id} value={id}>{condition}</option>
                                            )
                                        })}
                                    </select><br />
                                </div>

                                {/* Medication input */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Medication</label>
                                    <input onChange={handleChange} value={form.medication} type="text" name="medication" placeholder="Enter Medication" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                                </div>

                                {/* Dosage input */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Dosage</label>
                                    <input onChange={handleChange} value={form.dosage} type="text" name="dosage" placeholder="Enter Dosage" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                                </div>

                                {/* Start Date input */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Start Date</label>
                                    <input onChange={handleChange} value={form.start_date} type="text" name="start_date" placeholder="YYYY-MM-DD" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                                </div>
                                {/* End Date input */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">End Date</label>
                                    <input onChange={handleChange} value={form.end_date} type="text" name="end_date" placeholder="YYYY-MM-DD" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                                </div>

                                {/* Submit button */}
                                <button onClick={handleSubmit} className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center duration-300">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
};

export default EditPrescription;