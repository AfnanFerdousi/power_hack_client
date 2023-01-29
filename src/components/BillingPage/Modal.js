import axios from 'axios';
import React, { useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import { BillingContext } from '../../BillingContextProvider/BillingContextProvider';

const Modal = ({ title, data, id }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors } } = useForm();
    const { billingData, setBillingData } = useContext(BillingContext);
    const token = localStorage.getItem('token');
    const onSubmit = async (e) => {
        if (title === "Add") {
            const billData = {
                fullname: e?.fullname,
                email: e?.email,
                phone: e?.phone,
                payable: e?.payable
            }
            try {
                const response = await axios.post('http://localhost:5000/api/billing', billData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(response.data);
            } catch (err) {
                console.log(err)

            }

        } else if (title === "Edit") {

        }
    }
    return (
        <div>
            < div className="modal-box relative">
                <label htmlFor={id} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <h3 className="text-lg font-bold">{title}</h3>
                <form>
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="input input-bordered w-full max-w-xs mb-2"
                    />
                    <input
                        type="email"
                        placeholder="Full Name"
                        className="input input-bordered w-full max-w-xs mb-2"
                        {...register("fullname", { required: true })} />
                    {errors.fullname?.type === 'required' && <p className="text-red-500 text-start mt-2" role="alert"> Full name is required</p>}
                    <input
                        type="tel"
                        placeholder="Phone"
                        className="input input-bordered w-full max-w-xs mb-2"
                        {...register("phone", { required: true })} />
                    {errors.phone?.type === 'required' && <p className="text-red-500 text-start mt-2" role="alert">Phone is required</p>}
                    <input
                        type="number"
                        placeholder="Payable amount"
                        className="input input-bordered w-full max-w-xs mb-2"
                        {...register("payable", { required: true })} />
                    {errors.payable?.type === 'required' && <p className="text-red-500 text-start mt-2" role="alert"> Payable amount is required</p>}
                    <button type="submit" className="btn btn-primary">{title}</button>
                </form>
            </div>
        </div>
    );
};

export default Modal;