import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import medicalJSON from "../../data/MedicalAPI.json"

const CreateDiagnosis = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState("")
    const [suggestions, setSuggestions] = useState([])

    const [form, setForm] = useState({
        patient_id: '',
        condition: '',
        diagnosis_date: ''
    });


    useEffect(() => {
        axios.get(`https://clinicaltables.nlm.nih.gov/api/conditions/v3/search?terms=${searchTerm}`)
            .then((res) => {
                console.log(res.data[3])
                setSuggestions(res.data[3].map((suggestion) => {
                    return suggestion[0];
                }))
            })
    }, [searchTerm])

    // Get patients
    useEffect(() => {
        axios.get("https://fed-medical-clinic-api.vercel.app/patients", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data);
                setPatients(response.data);
            })
            .catch(err => {
                console.log(err);
            });

        // Initialize the Autocomplete for the 'condition' field
        if (window.Autocompleter) {
            new window.Autocompleter.Search('condition', 'https://clinicaltables.nlm.nih.gov/api/conditions/v3/search');
        }
    }, [token]);

    const handleSubmit = () => {
        const formData = {
            ...form,
            patient_id: Number(form.patient_id) // Converts id to number
        };

        axios.post('https://fed-medical-clinic-api.vercel.app/diagnoses', formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data);
                navigate(`../${res.data.id}`, { relative: 'path' });
            })
            .catch((err) => {
                if (err.response) {
                    console.log('Error response data:', err.response.data);
                    console.log('Error status:', err.response.status);
                } else {
                    console.log('Error message:', err.message);
                }
            });
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <section class=" pt-16 bg-gray-50 dark:bg-gray-900">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                    <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Add Diagnosis
                            </h1>
                            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-4 md:space-y-6">

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

                                  {/* Diagnosis Date input */}
                                  <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Diagnosis Date</label>
                                    <input onChange={handleChange} value={form.diagnosis_date} type="tezt" name="diagnosis_date" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="YYYY-MM-DD" />
                                </div>

                                {/* Condition input */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Condition</label>
                                    <input type="text" placeholder="Search a Condition" name="condition" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" /><br />
                                    <select name="condition" value={form.condition} onChange={handleChange}>
                                        {suggestions.map((suggestion) => {
                                            return (
                                                <option value={suggestion}>{suggestion}</option>
                                            )
                                        })}
                                    </select>
                                     
                                </div>

                                {/* Submit button */}
                                <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center duration-300">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CreateDiagnosis;
