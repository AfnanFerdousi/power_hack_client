import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const BillingContext = createContext();

export const BillingContextProvider = (props) => {
    const [billingData, setBillingData] = useState([]);
    useEffect(() => {
        async function fetchBillingData() {
            try {
                const response = await axios.get('/api/billing-list', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setBillingData(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchBillingData();
    }, []);

    return (
        <BillingContext.Provider value={{ billingData, setBillingData }}>
            {props.children}
        </BillingContext.Provider>
    );
};