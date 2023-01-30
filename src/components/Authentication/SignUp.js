import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Loader from '../Shared/Loader';


const SignUp = () => {
    const {
        register, 
        handleSubmit, 
        watch, 
        formState: { errors } } = useForm();

    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    if (token) {
        navigate('/billingpage')
    }
    const onSignUp = async (data) => {
        console.log(data)
        const newUser = {
            name : data?.name,
            email : data?.email,
            password: data?.password
        };
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const body = JSON.stringify(newUser);
            const res = await axios.post("http://localhost:5000/api/registration", body, config);
            if (res?.status === 200) {
                const token = res?.data?.token;
                localStorage.setItem("token", token)
                Swal.fire({
                    icon: 'success',
                    text: 'Success',
                    title: 'Account Created Successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate('/billingpage')
                
            }
        } catch (err) {
            console.error(err);
        }
    }
    
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse gap-x-[20px]">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up</h1>
                       <div className="py-6 font-medium text-[#333]"><span>Signup to access the dashboard.</span> <span>Already have an account?</span><a className="ml-2 font-semibold text-blue-400" href="/login">Login</a> </div>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSignUp)}>
                                <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        className="input input-bordered"
                                        {...register("name", { required: true })} />
                                    {errors.name?.type === 'required' && <p className="text-red-500 text-start mt-2" role="alert">Name is required</p>}
                            </div>
                             <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="input input-bordered"
                                        {...register("email", { required: true })}/>
                                    {errors.email?.type === 'required' && <p className="text-red-500 text-start mt-2" role="alert">Email is required</p>}
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
                                    {errors.password?.type === 'required' && <p className="text-red-500 text-start mt-2" role="alert">Password is required</p>}
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">Sign Up</button>
                            </div>
                           </form>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    );
};

export default SignUp;