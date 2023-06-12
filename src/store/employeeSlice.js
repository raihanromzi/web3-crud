import { createSlice } from '@reduxjs/toolkit';
import { deleteEmployee, readEmployee, updateEmployee, createEmployee } from '../config/web3';

// console.log(await readEmployee());

const initialState = {
  employees: [...(await readEmployee())]
};

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    createEmployeeReducer: (state, action) => {
      let { firstName, lastName, email, salary, employeeStatus } = action.payload;
      if (employeeStatus === 'active') {
        employeeStatus = 0;
      } else if (employeeStatus === 'inactive') {
        employeeStatus = 1;
      }
      createEmployee(firstName, lastName, email, salary, employeeStatus);
    },
    readEmployeeReducer: async (state) => {
      state.employees.push(await readEmployee());
      return state.employees;
    },
    updateEmployeeReducer: (state, action) => {
      let { id, firstName, lastName, email, salary, employeeStatus } = action.payload;
      if (employeeStatus === 'active') {
        employeeStatus = 0;
      } else if (employeeStatus === 'inactive') {
        employeeStatus = 1;
      }
      updateEmployee(id, firstName, lastName, email, salary, employeeStatus);
    },
    deleteEmployeeReducer: (state, action) => {
      deleteEmployee(action.payload);
    }
  }
});

export const {
  createEmployeeReducer,
  readEmployeeReducer,
  updateEmployeeReducer,
  deleteEmployeeReducer
} = employeeSlice.actions;
export const employeeReducer = employeeSlice.reducer;
