import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';

function ExpenseDetails() {
    const { id } = useParams(); // expense ID
    const [breakdown, setBreakdown] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBreakdown = async () => {
            try {
                const res = await API.get(`/expenses/${id}/breakdown`);
                setBreakdown(res.data.message);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch breakdown', err);
                setLoading(false);
            }
        };

        fetchBreakdown();
    }, [id]);

    return (
        <div>
            <h2>Expense Breakdown</h2>
            {loading ? (
                <p>Loading...</p>
            ) : breakdown.length === 0 ? (
                <p>No breakdown needed — paid by all.</p>
            ) : (
                <ul>
                    {breakdown.map((entry, index) => (
                        <li key={index}>
                            {entry.from} owes ₹{entry.remaining} to {entry.to}{" "}
                            <span style={{ fontSize: '0.85em', color: 'gray' }}>
                                (Paid: ₹{entry.amountPaid}, Owed: ₹{entry.amountOwed})
                            </span>
                        </li>
                    ))}
                </ul>

            )}

            <button
                style={{ padding: '6px 12px', fontSize: '14px', marginTop: '12px' }}
                onClick={() => navigate(`/expenses/${id}/add-payment`)}
            >
                ➕ Add Payment
            </button>


            <button
                onClick={() => navigate(`/dashboard`)}
                style={{ padding: '6px 12px', fontSize: '14px', marginTop: '8px' }}
            >
                HOME
            </button>
        </div>
    );
}

export default ExpenseDetails;
