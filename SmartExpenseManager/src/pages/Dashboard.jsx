import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const handleDeleteGroup = async (groupId) => {
  if (!window.confirm('Are you sure you want to delete this group?')) return;

  try {
    await API.delete(`/groups/${groupId}/delete`);
    window.location.reload(); // refresh the page after successful delete
  } catch (err) {
    console.error('Failed to delete group:', err);
    alert('Could not delete group.');
  }
};


function Dashboard() {
  const [groups, setGroups] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const fetchGroups = async () => {
    try {
      const res = await API.get(`/groups/user/${user._id}`); // 👈 userId query param bhej rahe
      setGroups(res.data.groups);
    } catch (err) {
      console.error('Failed to fetch groups:', err);
    }
  };

  useEffect(() => {
    if (user?._id) fetchGroups();
  }, [user]);

  return (
    <div>
      <h2>Welcome, {user?.name}</h2>
      <button onClick={() => navigate('/create-group')}>+ Create Group</button>
      <button onClick={() => navigate('/login')} style={{ float: 'right' }}>Logout</button>

      <h3>Your Groups</h3>
      {groups.length === 0 ? (
        <p>No groups yet</p>
      ) : (
        <ul>
          {groups.map((group) => (
            <li key={group._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ cursor: 'pointer' }} onClick={() => navigate(`/groups/${group._id}`)}>
                {group.name}
              </span>
              <button
                onClick={() => handleDeleteGroup(group._id)}
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
                🗑️ Delete
              </button>
            </li>
          ))}
        </ul>

      )}
    </div>
  );
}

export default Dashboard;
