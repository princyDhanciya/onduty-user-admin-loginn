import React, { useState } from 'react';
import './UserForm.css'; // Import the CSS file for styling

function UserForm({ isVisible, onSubmit }) {
  const [formData, setFormData] = useState({
    reason: '',
    name: '',
    department: '',
    rollno: '', // Add the new field
    days: '',
    date: '',
    college: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form data after submission
    setFormData({
      reason: '',
      name: '',
      department: '',
      rollno: '', // Reset the new field
      days: '',
      date: '',
      college: '',
    });
  };

  return (
    <div className={`user-form-container ${isVisible ? 'visible' : 'hidden'}`}>
      <h2>User Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Reason for On-duty:
          <input type="text" name="reason" value={formData.reason} onChange={handleChange} />
        </label>
        <br />
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Department:
          <input type="text" name="department" value={formData.department} onChange={handleChange} />
        </label>
        <br />
        <label>
          Roll Number:
          <input type="text" name="rollno" value={formData.rollno} onChange={handleChange} />
        </label>
        <br />
        <label>
          Number of Days:
          <input type="number" name="days" value={formData.days} onChange={handleChange} />
        </label>
        <br />
        <label>
          Date of the Event:
          <input type="date" name="date" value={formData.date} onChange={handleChange} />
        </label>
        <br />
        <label>
          College Name:
          <input type="text" name="college" value={formData.college} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserForm;
