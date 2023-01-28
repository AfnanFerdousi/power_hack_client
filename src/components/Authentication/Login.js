import axios from 'axios';
import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';


const Login = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors } } = useForm();
    const navigate = useNavigate()
    const onLogin = async (data) => {
        console.log(data)
        const user = {
            email: data?.email,
            password: data?.password
        };
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const body = JSON.stringify(user);
            const res = await axios.post("http://localhost:5000/api/login", body, config);
            if (res?.status === 200) {
                const token = res?.data?.token;
                localStorage.setItem("token", token)
                Swal.fire({
                    icon: 'success',
                    text: 'Success',
                    title: 'You are logged in',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate('/billingpage')

            }
        } catch (err) { 
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err?.response?.data?.message
            })
            console.error(err?.response?.data?.message);
        }
    }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse gap-x-[20px]">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login</h1>
                        <div className="py-6 font-medium text-[#333]"><span>Login to access the dashboard.</span> <span>New to Power hack?</span><a className="ml-2 font-semibold text-blue-400" href="/">Sign up</a> </div>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onLogin)}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="input input-bordered"
                                        {...register("email", { required: true })} />
                                    {errors.email?.type === 'required' && <p role="alert">Email is required</p>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="input input-bordered"
                                        {...register("password", { required: true })}
                                    />
                                    {errors.password?.type === 'required' && <p role="alert">Password is required</p>}
                                </div>
                                <div className="form-control mt-6">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;