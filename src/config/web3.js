import Web3 from 'web3';
import contract from '../contracts/artifacts/EmployeeData_metadata.json';

const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
const { abi } = contract.output;
const contractAddress = '0xdFD702252BF1978dEcB2B315A0b90e2bEc6227b9';
const contractInstance = new web3.eth.Contract(abi, contractAddress);

// console.log(abi);
// console.log(contractInstance.methods);

export const createEmployee = async (firstName, lastName, email, salary, employeeStatus) => {
  const accounts = await web3.eth.getAccounts();

  await contractInstance.methods
    .createEmployee(firstName, lastName, email, salary, employeeStatus)
    .send({ from: accounts[0] }, (error, transactionHash) => {
      if (error) {
        console.log(error);
      } else {
        console.log(transactionHash);
      }
    });
};

export const readEmployee = async () => {
  const accounts = await web3.eth.getAccounts();

  return await contractInstance.methods.readEmployee().call({ from: accounts[0] });
};

export const updateEmployee = async (id, firstName, lastName, email, salary, employeeStatus) => {
  const accounts = await web3.eth.getAccounts();

  await contractInstance.methods
    .updateEmployee(id, firstName, lastName, email, salary, employeeStatus)
    .send({ from: accounts[0] }, (error, transactionHash) => {
      if (error) {
        console.log(error);
      } else {
        console.log(transactionHash);
      }
    });
};

export const deleteEmployee = async (id) => {
  const accounts = await web3.eth.getAccounts();

  await contractInstance.methods
    .deleteEmployee(id)
    .send({ from: accounts[0] }, (error, transactionHash) => {
      if (error) {
        console.log(error);
      } else {
        console.log(transactionHash);
      }
    });
};
