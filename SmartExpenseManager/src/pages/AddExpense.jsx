import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';

function AddExpense() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [splits, setSplits] = useState([]);

useEffect(() => {
  const fetchGroup = async () => {
    try {
      const res = await API.get(`/groups/${id}`);
      const group = res.data.group;
      setGroup(group);

      const initialSplits = group.members.map(member => ({
        user: member._id,
        amount: 0
      }));
      setSplits(initialSplits);
    } catch (err) {
      console.error('Failed to load group', err);
    }
  };

  fetchGroup();
}, [id]);


  const handleSplitChange = (index, value) => {
    const updated = [...splits];
    updated[index].amount = parseFloat(value) || 0;
    setSplits(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/expenses', {
        description,
        group: id,
        amount: parseFloat(amount),
        paidBy,
        splits
      });
      navigate(`/groups/${id}`);
    } catch (err) {
      alert('Expense creation failed');
    }
  };

  return (
    <div>
      <h2>Add Expense</h2>
      {group ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <select value={paidBy} onChange={(e) => setPaidBy(e.target.value)} required>
            <option value="">Paid By</option>
            {group.members.map(member => (
              <option key={member._id} value={member._id}>{member.name}</option>
            ))}
          </select>

          <h4>Split Amounts</h4>
          {group.members.map((member, index) => (
            <div key={member._id}>
              {member.name}:
              <input
                type="number"
                value={splits[index]?.amount || ''}
                onChange={(e) => handleSplitChange(index, e.target.value)}
                required
              />
            </div>
          ))}

          <button type="submit">Create Expense</button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default AddExpense;
