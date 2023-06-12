import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { updateEmployeeReducer } from '../store/employeeSlice';

const Edit = ({ employees, selectedEmployee, setEmployees, setIsEditing }) => {
  const id = selectedEmployee.id;
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(selectedEmployee.firstName);
  const [lastName, setLastName] = useState(selectedEmployee.lastName);
  const [email, setEmail] = useState(selectedEmployee.email);
  const [salary, setSalary] = useState(selectedEmployee.salary);
  const [employeeStatus, setEmployeeStatus] = useState(selectedEmployee.employeeStatus); // TODO: Add select options [Active, Inactive
  const [createdAt, setCreatedAt] = useState(selectedEmployee.createdAt);
  const [updatedAt, setUpdatedAt] = useState(selectedEmployee.updatedAt);

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !salary || !createdAt || !updatedAt) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true
      });
    }

    const employee = {
      id,
      firstName,
      lastName,
      email,
      salary,
      employeeStatus
    };

    // TODO: Update document
    dispatch(
      updateEmployeeReducer({
        id,
        firstName,
        lastName,
        email,
        salary,
        employeeStatus
      })
    );

    setEmployees(employees);
    setIsEditing(false);

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `${employee.firstName} ${employee.lastName}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Employee</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="salary">Salary ($)</label>
        <input
          id="salary"
          type="number"
          name="salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
        <label htmlFor="employeeStatus">Employee Status</label>
        <select
          id="employeeStatus"
          name="employeeStatus"
          value={employeeStatus}
          onChange={(e) => setEmployeeStatus(e.target.value)}>
          <option value={0}>Active</option>
          <option value={1}>Inactive</option>
        </select>

        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
