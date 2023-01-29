import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="flex justify-center">
                {pageNumbers.map((number) => (
                    <li key={number} className={currentPage === number ? 'font-bold text-[#fff] bg-blue-400 p-3' : 'font-bold p-3 bg-[#333] text-[#fff]'}>
                        <a href="#" onClick={() => onPageChange(number)} className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;