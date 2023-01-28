import React from 'react';
import { useForm } from "react-hook-form";


const Login = () => {
    const {
        register, 
        handleSubmit, 
        watch, 
        formState: { errors } } = useForm();

    const onSignUp = () => {
        console.log("int");
    }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login</h1>
                        <div className="py-6"><span>Login to access the dashboard \^o^/.</span> <span>New to Power Hack?</span><a href="/">Sign Up</a> </div>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSignUp)}>
                             <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="input input-bordered"
                                        {...register("email", { required: true })}/>
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
                           </form>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    );
};

export default Login;