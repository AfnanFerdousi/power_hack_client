import React, { useState, useContext } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BillingContext } from '../../BillingContextProvider/BillingContextProvider';
import Modal from './Modal';
import Loader from '../Shared/Loader';

const BillTable = () => {
    const { billingData, setBillingData, loading } = useContext(BillingContext);
    const [searchNameValue, setSearchNameValue] = useState("");
    const [searchEmailValue, setSearchEmailValue] = useState("");
    const [searchPhoneValue, setSearchPhoneValue] = useState("");
    console.log(billingData);

    const handleNameSearch = (event) => {
        if (event?.target?.value !== " ") {
            setSearchNameValue(event.target.value);
        }
        const filtered = billingData.filter((bill) =>
            bill.fullname.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setBillingData(filtered);
    };
    const handleEmailSearch = (event) => {
        if (event?.target?.value !== " ") {
            setSearchEmailValue(event.target.value);
        }
        const filtered = billingData.filter((bill) =>
            bill.email.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setBillingData(filtered);
    };
    const handlePhoneSearch = (event) => {
        if (event?.target?.value !== " ") {
            setSearchPhoneValue(event.target.value);
        }
        const filtered = billingData.filter((bill) =>
            bill.phone.includes(event.target.value)
        );
        setBillingData(filtered);
    };

    const deleteBill = (id) => {
        console.log(id)
    }

    const sortedBills = billingData.sort((a, b) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateB - dateA;
});
    return (
        <div className="px-10">
            <div className="flex items-center justify-center gap-x-2 mt-4">
                <div className="flex items-center gap-x-2 w-full">
                    <span className="font-semibold">FullName:</span>
                    <input
                        type="search"
                        placeholder="Search by full name"
                        className="input input-bordered w-full max-w-xs"
                        value={searchNameValue}
                        onChange={handleNameSearch}
                    />
                </div>
                <div className="flex items-center gap-x-2 w-full">
                    <span className="font-semibold">Email:</span>
                    <input
                        type="search"
                        placeholder="Search by email"
                        className="input input-bordered w-full max-w-xs"
                        value={searchEmailValue}
                        onChange={handleEmailSearch}
                    />
                </div>
                <div className="flex items-center gap-x-2 w-full">
                    <span className="font-semibold">Phone:</span>
                    <input
                        type="search"
                        placeholder="Search by phone number"
                        className="input input-bordered w-full max-w-xs"
                        value={searchPhoneValue}
                        onChange={handlePhoneSearch}
                    />
                </div>
                <label htmlFor="my-modal-3" className="btn">Add new</label>
                <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                <div className="modal"><Modal title="Add" id="my-modal-3" data="null" /></div>

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
                            {Array.isArray(sortedBills) && sortedBills?.map((single) => {
                                return (
                                    <tr>
                                        <th>{loading ? <Loader/> : single?.billingID}</th>
                                        <td>{single?.fullname}</td>
                                        <td>{single?.email}</td>
                                        <td>{single?.phone}</td>
                                        <td>${single?.payable}</td>
                                        <td className="flex gap-x-[3px]">
                                            <label htmlFor="my-modal-4" className="btn rounded-md text-[18px] bg-green-400 text-[#fff] border-none"><BsPencilSquare />
                                            </label>
                                            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
                                            <div className="modal"><Modal title="Edit" id="my-modal-4" data="null" /></div>
                                            <button onClick={() => deleteBill(single?.billingID)} className="btn rounded-md text-[18px] bg-red-400 text-[#fff] border-none"><RiDeleteBin6Line /></button>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BillTable;