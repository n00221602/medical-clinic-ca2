import axios from "axios";
import { useState } from "react";
import { handleLogin } from "./LoginForm";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        full_name: '',
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`https://fed-medical-clinic-api.vercel.app/register`, form)
            .then((response) => {
                console.log(response)

                localStorage.setItem('user', JSON.stringify(response.data.user))

                handleLogin(form.email, form.password)
                    .then(() => {
                        navigate('/')
                    })
            })
            .catch((err) => {
                console.error(err)
            })
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
                                Register an account
                            </h1>
                            <form class="space-y-4 md:space-y-6">
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

                                {/* Password input */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                    <input onChange={handleChange} value={form.password} type="password" name="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                                </div>

                                   {/* Submit button */}
                                <button onClick={handleSubmit} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center duration-300">Sign in</button>
                                <p class="text-sm font-light text-gray-500">
                                    Already have an account? <a href="/login" class="font-medium text-primary-600 hover:underline">Login</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>


    )
};

export default RegisterForm;