import axios from 'axios';
import React, { useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import { BillingContext } from '../../BillingContextProvider/BillingContextProvider';
import Swal from 'sweetalert2';
import Loader from '../Shared/Loader'

const Modal = ({ title, data, setSelectedBill, id }) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const date = new Date();
    const handleClose = () => {
        setSelectedBill(null);
    };
    const { billingData, setBillingData, loading } = useContext(BillingContext);
    if (loading) {
        return <Loader />;
    }

    const token = localStorage.getItem('token');
    
    const onSubmit = async (e) => {
        if (title === "Add") {
            const billData = {
                fullname: e?.fullname,
                email: e?.email,
                phone: e?.phone,
                payable: e?.payable,
                date
            };
            try {
                const response = await axios.post('http://localhost:5000/api/add-billing', billData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response?.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        text: 'Success',
                        title: 'Bill Added',
                        showConfirmButton: false,
                        timer: 500
                    });
                    setBillingData([...billingData, response?.data?.billData]);
                }
            } catch (err) {
                console.error(err);
            }
        }         
    };
    console.log(data)
    const onEdit = async(event) => {
        // event.preventDefault();
        if (title === "Edit") {
            const editData = {
                _id: data?._id,
                billingID: data?.billingID,
                fullname: event?.fullname,
                email: event?.email,
                payable: event?.payable,
                phone: event?.phone,
                date
            };
            try {
                const response = await axios.put(`http://localhost:5000/api/update-billing/${data?.billingID}`, editData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                console.log(data)
                if (response?.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        text: 'Success',
                        title: 'Bill Edited',
                        showConfirmButton: false,
                        timer: 500
                    });
                    handleClose();
                    const updatedData = billingData.map(item => item._id === data._id ? response?.data?.updatedData : item);
                    setBillingData(updatedData);
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    text: 'Error',
                    title: error?.response.data?.message,
                    showConfirmButton: false,
                    timer: 500
                });
                console.error(error);
            }
        }
    }
    return (
        <div>
            < div className="bg-[#fff] p-6 rounded-md w-full relative">
                {id ? <label htmlFor={id} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label> : <label onClick={handleClose} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>}
                <h3 className="text-xl font-bold mb-4">{title}</h3>
                <form className="flex flex-col" onSubmit={handleSubmit(title === "Add" ? onSubmit : onEdit)}>
                    <input
                        type="name"
                        placeholder="Full Name"
                        className="input input-bordered w-96  mb-2"
                    defaultValue={data === null ? '' : data?.fullname}                    
                        {...register("fullname", { required: true })} />
                    {errors.fullname?.type === 'required' && <p className="text-red-500 text-start" role="alert"> Full name is required</p>}
                    <input
                        type="email"
                        placeholder="Email"
                        defaultValue={data === null ? '' : data?.email}    
                        className="input input-bordered w-96  mb-2"
                        {...register("email", { required: true })} />
                    {errors.email?.type === 'required' && <p className="text-red-500 text-start" role="alert">Email is required</p>}
                    <input
                        type="tel"
                        placeholder="Phone"
                        defaultValue={data === null ? '' : data?.phone}    
                        className="input input-bordered w-96  mb-2"
                        {...register("phone", { required: true, minLength: 11, maxLength: 11 })} />
                    {errors.phone?.type === 'required' ?
                        <p className="text-red-500 text-start" role="alert">Phone is required</p>
                        : errors.phone?.type === 'maxLength' && <p className="text-red-500 text-start" role="alert">Minimum Length is 11</p>
                    }
                    <input
                        type="number"
                        placeholder="Payable amount"
                        defaultValue={data === null ? '' : data?.payable}    
                        className="input input-bordered w-96  mb-2"
                        {...register("payable", { required: true })} />
                    {errors.payable?.type === 'required' && <p className="text-red-500 text-start" role="alert"> Payable amount is required</p>}
                    <button type="submit" className="btn btn-primary mt-4">{title}</button>
                </form>
            </div>
        </div>
    );
};

export default Modal;