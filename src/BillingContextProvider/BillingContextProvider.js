import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const BillingContext = createContext();

export const BillingContextProvider = (props) => {
    const [billingData, setBillingData] = useState([]);
    const [loading, setLoading] = useState()
    useEffect(() => {
        setLoading(true)
        async function fetchBillingData() {
            try {
                const response = await axios.get('http://localhost:5000/api/billing-list', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (response?.status === 200) {
                    setLoading(false)                    
                    setBillingData(response.data);
                }
                console.log(response)
            } catch (error) {
                setLoading(false) 
                console.error(error);
            }
        }
        fetchBillingData();
    }, []);

    return (
        <BillingContext.Provider value={{ billingData, setBillingData, loading }}>
            {props.children}
        </BillingContext.Provider>
    );
};