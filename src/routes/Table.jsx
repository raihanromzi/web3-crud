import React from 'react';

const Table = ({ employees, handleEdit, handleDelete }) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: null
  });

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employees ? (
            employees
              .filter((employee) => employee.id !== '0')
              .map((employee, index) => (
                <tr key={index}>
                  <td>{employee.id}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>{formatter.format(employee.salary)}</td>
                  <td>{employee.employeeStatus}</td>
                  <td>{new Date(employee.createdAt * 1000).toLocaleDateString()} </td>
                  <td>{new Date(employee.updatedAt * 1000).toLocaleDateString()} </td>
                  <td className="text-right">
                    <button onClick={() => handleEdit(employee.id)} className="button muted-button">
                      Edit
                    </button>
                  </td>
                  <td className="text-left">
                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="button muted-button">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan={7}>No Employees</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
