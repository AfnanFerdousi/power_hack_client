import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const BillingContext = createContext();

export const BillingContextProvider = (props) => {
    const [billingData, setBillingData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [originalBillingData, setOriginalBillingData] = useState([]);

    const [searchNameValue, setSearchNameValue] = useState("");
    const [searchEmailValue, setSearchEmailValue] = useState("");
    const [searchPhoneValue, setSearchPhoneValue] = useState("");
    console.log(billingData);

    const handleNameSearch = (event) => {
        setSearchNameValue(event.target.value);
        if (event.target.value === "") {
            setBillingData(originalBillingData);
        }
        else if (event?.target?.value !== "") {
            setSearchNameValue(event.target.value);
            const filtered = billingData.filter((bill) =>
                bill.fullname.toLowerCase().includes(event.target.value.toLowerCase())
            );
            setBillingData(filtered);
        }
    };
    const handleEmailSearch = (event) => {
        if (event.target.value === " ") {
            setBillingData(originalBillingData);
        }
        else if (event?.target?.value !== " ") {
            setSearchEmailValue(event.target.value);
            const filtered = billingData.filter((bill) =>
                bill.email.toLowerCase().includes(event.target.value.toLowerCase())
            );
            setBillingData(filtered);
        }
    };
    const handlePhoneSearch = (event) => {
        if (event.target.value === " ") {
            setBillingData(originalBillingData);
        }
        else if (event?.target?.value !== " ") {
            setSearchPhoneValue(event.target.value);
            const filtered = billingData.filter((bill) =>
                bill.phone.includes(event.target.value)
            );
            setBillingData(filtered);
        }
    };

    async function fetchBillingData(page) {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:5000/api/billing-list/${page}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response?.status === 200) {
                setLoading(false);
                console.log(response)
                setBillingData(response.data.result);
                setOriginalBillingData(response.data.result);
                setTotalPages(response.data.totalPages);
            }
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    }
    useEffect(() => {
        fetchBillingData(currentPage);
    }, [currentPage]);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <BillingContext.Provider value={{ billingData, setBillingData, loading, totalPages, currentPage, handlePageChange, handleNameSearch, handlePhoneSearch, handleEmailSearch }}>
            {props.children}
        </BillingContext.Provider>
    );
};