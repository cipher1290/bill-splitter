import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';

const handleDeleteExpense = async (expenseId) => {
  if (!window.confirm("Are you sure you want to delete this expense?")) return;

  try {
    await API.delete(`/expenses/${expenseId}/delete`);
    window.location.reload(); // refresh page after delete
  } catch (err) {
    console.error("Failed to delete expense", err);
    alert("Could not delete expense.");
  }
};


function GroupDetails() {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const navigate = useNavigate();

  const fetchGroup = async () => {
    try {
      console.log("Group ID from URL:", id); // 👈 check if this is valid
      const res = await API.get(`/groups/${id}`);
      console.log("Group fetched:", res.data); // 👈 check API response
      setGroup(res.data.group);
    } catch (err) {
      console.error('Could not load group', err);
    }
  };


  useEffect(() => {
    fetchGroup();
  }, [id]);

  useEffect(() => {
    if (group) {
      console.log("Full Group Object:", group);
    }
  }, [group]);

  return (
    <div>
      {group ? (
        <>
          <h2>{group.name}</h2>

          <h4>Members</h4>
          <ul>
            {group.members.map((member) => (
              <li key={member._id}>{member.name} ({member.email})</li>
            ))}
          </ul>

          <h4>Expenses</h4>
          {group.expenses.length === 0 ? (
            <p>No expenses yet</p>
          ) : (
            <ul>
              {group.expenses.map((exp) => (
                <li
                  key={exp._id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    padding: '4px 0'
                  }}
                >
                  <span onClick={() => navigate(`/expenses/${exp._id}`)}>
                    {exp.description} - ₹{exp.amount} paid by {exp.paidBy.name}
                  </span>
                  <button
                    onClick={() => handleDeleteExpense(exp._id)}
                    style={{
                      marginLeft: '10px',
                      backgroundColor: '#ff4d4d',
                      color: 'white',
                      border: 'none',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>

          )}

          <button
            onClick={() => navigate(`/groups/${id}/add-expense`)}
            style={{ padding: '6px 12px', fontSize: '14px', marginTop: '8px' }}
          >
            ➕ Add Expense
          </button>

          <button
            onClick={() => navigate(`/dashboard`)}
            style={{ padding: '6px 12px', fontSize: '14px', marginTop: '8px' }}
          >
            HOME
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default GroupDetails;
