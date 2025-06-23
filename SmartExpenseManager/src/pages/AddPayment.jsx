import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';

function AddPayment() {
    const { id } = useParams(); // expense ID
    const navigate = useNavigate();

    const [groupId, setGroupId] = useState('');
    const [members, setMembers] = useState([]);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        const fetchExpense = async () => {
            try {
                const res = await API.get(`/expenses/${id}/getExpense`);
                const expense = res.data.expense;
                setGroupId(expense.group);
                const allUsers = [expense.paidBy, ...expense.splits.map(s => s.user)];
                const seen = new Set();
                const uniqueUsers = [];

                for (let user of allUsers) {
                    if (user && !seen.has(user._id)) {
                        seen.add(user._id);
                        uniqueUsers.push(user);
                    }
                }
                setMembers(uniqueUsers);

            } catch (err) {
                console.error('Failed to load expense', err);
            }
        };

        fetchExpense();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/payments', {
                group: groupId,
                from,
                to,
                amount: parseFloat(amount),
            });
            navigate(`/expenses/${id}`);

        } catch (err) {
            console.error(err);
            alert("Payment creation failed.");
        }
    };

    return (
        <div>
            <h2>Add Payment</h2>
            <form onSubmit={handleSubmit}>
                <label>From:</label>
                <select value={from} onChange={(e) => setFrom(e.target.value)} required>
                    <option value="">Select Payer</option>
                    {members.map((m) => (
                        <option key={m._id} value={m._id}>{m.name}</option>
                    ))}
                </select>

                <label>To:</label>
                <select value={to} onChange={(e) => setTo(e.target.value)} required>
                    <option value="">Select Receiver</option>
                    {members.map((m) => (
                        <option key={m._id} value={m._id}>{m.name}</option>
                    ))}
                </select>

                <label>Amount:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />

                <button type="submit" style={{ marginTop: '10px' }}>Submit Payment</button>
            </form>
        </div>
    );
}

export default AddPayment;
