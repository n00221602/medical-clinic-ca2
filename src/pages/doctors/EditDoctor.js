import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditDoctor = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        specialisation: ''
    })

    const { id } = useParams();

    useEffect(() => {
        axios.get(`https://fed-medical-clinic-api.vercel.app/doctors/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data)
                setForm(res.data)
            })
            .catch((err) => {
                console.log(err)
            });
    }, [])

    const handleSubmit = () => {
        axios.patch(`https://fed-medical-clinic-api.vercel.app/doctors/${id}`, form, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data)
                navigate(`/doctors/${id}`)
            })
            .catch((err) => {
                console.log(err)
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
<section class=" pt-16 bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

        <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    Edit Doctor
                </h1>
                <div class="space-y-4 md:space-y-6">
                    {/* First/Last Name input */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                        <input onChange={handleChange} value={form.first_name} type="first_name" name="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
                        <input onChange={handleChange} value={form.last_name} type="last_name" name="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                    </div>
                    {/* Email input */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                        <input onChange={handleChange} value={form.email} type="email" name="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@email.com" />
                    </div>

                    {/* Phone input */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                        <input onChange={handleChange} value={form.phone} type="text" name="phone" placeholder="10 Digits" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Select a Specialisation</label>
                        <select name="specialisation" value={form.specialisation} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"><br />
                            <option value='Podiatrist'>Podiatrist</option>
                            <option value='Dermatologist'>Dermatologist</option>
                            <option value='Pediatrician'>Pediatrician</option>
                            <option value='Psychiatrist'>Psychiatrist</option>
                            <option value='General Practitioner'>General Practitioner</option>
                        </select>
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

export default EditDoctor;