import React from 'react';
import Navbar from '../Shared/Navbar';
import BillTable from './BillTable';

const BillingPage = () => {
    return (
        <div>
            <Navbar />
            <BillTable/>
        </div>
    );
};

export default BillingPage;