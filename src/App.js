import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserManagement.css'; 

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false); 

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/users');
      const formattedUsers = response.data.map(user => ({
        id: user.id,
        full_name: user.full_name,
        country: user.country,
        city: user.city,
        email: user.email,
        phone_number: formatPhoneNumber(user.phone_number), 
        job_title: user.job_title,
        years_of_experience: user.years_of_experience
      }));
      setUsers(formattedUsers);
      setFilteredUsers(formattedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const formatPhoneNumber = (phoneNumber) => {
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'); 
  };

  const handleFilterChange = (e) => {
    const text = e.target.value;
    setFilterText(text);
    filterUsers(text);
  };

  const filterUsers = (text) => {
    const filtered = users.filter((user) =>
      user.full_name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleSort = (field) => {
    if (field === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsNewUser(false);
    setIsAddingUser(true); 
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsNewUser(true);
    setIsAddingUser(true); 
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/api/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSubmitUserForm = async (formData) => {
    try {
      if (isNewUser) {
        await axios.post('http://localhost:3001/api/users', formData);
      } else {
        await axios.put(`http://localhost:3001/api/users/${selectedUser.id}`, formData);
      }
      fetchUsers();
      setSelectedUser(null);
      setIsNewUser(false);
      setIsAddingUser(false); // Hide add user form after submission
    } catch (error) {
      console.error('Error submitting user form:', error);
    }
  };

  const sortedUsers = sortBy
    ? filteredUsers.sort((a, b) => {
        const order = sortOrder === 'asc' ? 1 : -1;
        return a[sortBy] > b[sortBy] ? order : -order;
      })
    : filteredUsers;

    const UserTableRow = ({ user, handleEditUser, handleDeleteUser }) => {
      console.log(user);
      return (
        <tr key={user.id}>
          <td>
            <span className={user.years_of_experience < 1 ? 'orange-first-name' : ''}>
              {user.full_name.split(' ')[0]}
            </span>{' '}
            {user.full_name.split(' ').slice(1).join(' ')}
          </td>
          <td>{user.country}</td>
          <td>{user.city}</td>
          <td>{user.email}</td>
          <td>{user.phone_number}</td>
          <td>{user.job_title}</td>
          <td className="middle-column">{user.years_of_experience}</td>
          <td>
            <button onClick={() => handleEditUser(user)}>Edit</button>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </td>
        </tr>
      );
    };

    const TableHeaderRow = ({ handleSort }) => {
      return (
        <thead>
          <tr>
            <th onClick={() => handleSort('full_name')} className="full-name-column">Full Name</th>
            <th onClick={() => handleSort('country')}>Country</th>
            <th onClick={() => handleSort('city')}>City</th>
            <th onClick={() => handleSort('email')}>Email</th>
            <th onClick={() => handleSort('phone_number')}>Phone Number</th>
            <th onClick={() => handleSort('job_title')}>Job Title</th>
            <th onClick={() => handleSort('years_of_experience')}>Years of Experience</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
      );
    };
    
    
  return (
    <div className="user-management-container">
      <h1>Ilan Bitan - SeaData FullStack Project</h1>
      <div className="actions">
        <button onClick={handleAddUser}>Add User</button>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by full name"
          value={filterText}
          onChange={handleFilterChange}
        />
      </div>
      {isAddingUser && (
        <UserForm
          user={selectedUser}
          isNewUser={isNewUser}
          onSubmit={handleSubmitUserForm}
          onCancel={() => setIsAddingUser(false)} 
        />
      )}
       <table className="user-table">
       <TableHeaderRow handleSort={handleSort} />
         <tbody>
          {sortedUsers.map((user) => (
            <UserTableRow
              key={user.id}
              user={user}
              handleEditUser={handleEditUser}
              handleDeleteUser={handleDeleteUser}
            />
          ))}
        </tbody>
      </table> 
    </div>
  );
};

const UserForm = ({ user, isNewUser, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };



  return (
    <div className="user-form-container">
      <h2>{isNewUser ? 'Add User' : 'Edit User'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>
            Full Name:
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Country:
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            City:
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Phone Number:
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Job Title:
            <input
              type="text"
              name="job_title"
              value={formData.job_title}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Years of Experience:
            <input
              type="number"
              name="years_of_experience"
              value={formData.years_of_experience}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="buttons">
          <button type="submit">{isNewUser ? 'Add' : 'Save'}</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}; 

export default UserManagement;
