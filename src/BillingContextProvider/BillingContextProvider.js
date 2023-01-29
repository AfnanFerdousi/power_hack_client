import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const BillingContext = createContext();

export const BillingContextProvider = (props) => {
    const [billingData, setBillingData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
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
        <BillingContext.Provider value={{ billingData, setBillingData, loading, totalPages, currentPage, handlePageChange }}>
            {props.children}
        </BillingContext.Provider>
    );
};