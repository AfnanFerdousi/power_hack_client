import React, { useState } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri';

const BillTable = () => {
    const [searchNameValue, setSearchNameValue] = useState("");
    const [searchEmailValue, setSearchEmailValue] = useState("");
    const [searchPhoneValue, setSearchPhoneValue] = useState("");
    const [billData, setBillData] = useState([])

    const handleNameSearch = (event) => {
        if (event?.target?.value !== " ") {
            setSearchNameValue(event.target.value);
        }
        const filtered = billData.filter((bill) =>
            bill.fullname.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setBillData(filtered);
    };
    const handleEmailSearch = (event) => {
        if (event?.target?.value !== " ") {
            setSearchEmailValue(event.target.value);
        }
        const filtered = billData.filter((bill) =>
            bill.email.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setBillData(filtered);
    };
    const handlePhoneSearch = (event) => {
        if (event?.target?.value !== " ") {
            setSearchPhoneValue(event.target.value);
        }
        const filtered = billData.filter((bill) =>
            bill.phone.includes(event.target.value)
        );
        setBillData(filtered);
    };
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
                <label htmlFor="my-modal" className="btn">Add new</label>
                
               
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
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>1</th>
                                <td>Cy Ganderton</td>
                                <td>Quality Control Specialist</td>
                                <td>Blue</td>
                                <td className="flex gap-x-[3px]">
                                    <button className="btn rounded-md text-[18px] bg-green-400 text-[#fff] border-none"><BsPencilSquare /></button>
                                    <button className="btn rounded-md text-[18px] bg-red-400 text-[#fff] border-none"><RiDeleteBin6Line/></button>
                                    </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BillTable;