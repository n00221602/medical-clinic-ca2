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
        <form>
            <input onChange={handleChange} value={form.first_name} type="first_name" name="first_name" placeholder="First Name"></input>
            <br />
            <input onChange={handleChange} value={form.last_name} type="last_name" name="last_name" placeholder="Last Name"></input>
            <br />
            <input onChange={handleChange} value={form.email} type="email" name="email" placeholder="Email"></input>
            <br />
            <input onChange={handleChange} value={form.password} type="password" name="password" placeholder="Password" ></input>
            <br />
            <button onClick={handleSubmit}>Submit</button>
        </form>
    )
};

export default RegisterForm;