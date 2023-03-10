import React, { useState, useContext } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BillingContext } from '../../BillingContextProvider/BillingContextProvider';
import Modal from './Modal';
import Loader from '../Shared/Loader';
import Pagination from '../Shared/Pagination';
import Swal from 'sweetalert2';
import axios from 'axios';

const BillTable = () => {
    const { billingData, setBillingData, loading, currentPage, totalPages, handlePageChange, searchNameValue, searchEmailValue, searchPhoneValue, handleEmailSearch, handleNameSearch, handlePhoneSearch } = useContext(BillingContext);
    const token = localStorage.getItem('token');
    const [loading2, setLoading2] = useState()
    const deleteBill = (id) => {
        // console.log(id)
        setLoading2(true)
        axios.delete(`https://powerhackerserver.onrender.com/api/delete-billing/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                // Handle success
                if (response?.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        text: 'Success',
                        title: 'Bill Edited',
                        showConfirmButton: false,
                        timer: 500
                    });
                    setLoading2(false)
                    const updatedBillingData = billingData.filter(bill => bill._id !== id);
                    setBillingData(updatedBillingData);
                }
                // console.log(response.data);
            })
            .catch(error => {
                // Handle error
                setLoading2(false)
                console.error(error);
            });
    }

    const [selectedBill, setSelectedBill] = useState(null)
    const handleEditClick = (bill) => {
        setSelectedBill(bill);
    };
    const sortedBills = billingData && billingData.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;

    });
    if (loading || loading2) {
        return <Loader />
    }
    return (
        <div className="px-10">
            <div className="flex items-center justify-center gap-x-2 mt-4">
                <div className="flex items-center gap-x-2 w-full">
                    <span className="font-semibold">FullName:</span>
                    <input
                        type="text"
                        placeholder="Search by full name"
                        className="input input-bordered w-full max-w-xs"
                        value={searchNameValue}
                        onChange={handleNameSearch}
                    />
                </div>
                <div className="flex items-center gap-x-2 w-full">
                    <span className="font-semibold">Email:</span>
                    <input
                        type="text"
                        placeholder="Search by email"
                        className="input input-bordered w-full max-w-xs"
                        value={searchEmailValue}
                        onChange={handleEmailSearch}
                    />
                </div>
                <div className="flex items-center gap-x-2 w-full">
                    <span className="font-semibold">Phone:</span>
                    <input
                        type="text"
                        placeholder="Search by phone number"
                        className="input input-bordered w-full max-w-xs"
                        value={searchPhoneValue}
                        onChange={handlePhoneSearch}
                    />
                </div>
                <label htmlFor="my-modal-3" className="btn">Add new</label>
                <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                <div className="modal"><Modal title="Add" id="my-modal-3" data={null} setSelectedBill={setSelectedBill} /></div>

            </div>
            <div className="mt-8 shadow-lg p-3">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Billing ID</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Paid Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? <Loader /> : Array.isArray(sortedBills) && sortedBills?.map((single) => {
                                return (
                                    <tr key={single?.billingID}>
                                        <th>{loading ? <Loader /> : single?.billingID}</th>
                                        <td>{single?.fullname}</td>
                                        <td>{single?.email}</td>
                                        <td>{single?.phone}</td>
                                        <td>${single?.payable}</td>
                                        <td className="flex gap-x-[3px]">
                                            <label onClick={() => handleEditClick(single)} htmlFor="my-modal-4" className="btn rounded-md text-[18px] bg-green-400 text-[#fff] border-none"><BsPencilSquare />
                                            </label>
                                            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
                                            {selectedBill && (
                                                <div className="modal"><Modal title="Edit" data={selectedBill} _id={single?._id} setSelectedBill={setSelectedBill} /></div>
                                            )}
                                            <button onClick={() => deleteBill(single?._id)} className="btn rounded-md text-[18px] bg-red-400 text-[#fff] border-none"><RiDeleteBin6Line /></button>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default BillTable;