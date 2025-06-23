import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

function CreateGroup() {
  const [groupName, setGroupName] = useState('');
  const [members, setMembers] = useState([{ name: '', email: '' }]);
  const navigate = useNavigate();

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  const addMemberField = () => {
    setMembers([...members, { name: '', email: '' }]);
  };

  const removeMemberField = (index) => {
    const updatedMembers = members.filter((_, i) => i !== index);
    setMembers(updatedMembers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/groups', {
        name: groupName,
        members: members.filter(m => m.name && m.email) // filter empty entries
      });
      navigate('/dashboard');
    } catch (err) {
      alert('Group creation failed');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Create Group</h2>
      <form onSubmit={handleSubmit}>
        <label>Group Name:</label>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          required
        />

        <h4>Members:</h4>
        {members.map((member, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Name"
              value={member.name}
              onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={member.email}
              onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
              required
            />
            {members.length > 1 && (
              <button type="button" onClick={() => removeMemberField(index)}>Remove</button>
            )}
          </div>
        ))}

        <button type="button" onClick={addMemberField}>➕ Add Member</button>
        <br /><br />
        <button type="submit">Create Group</button>
      </form>
    </div>
  );
}

export default CreateGroup;
