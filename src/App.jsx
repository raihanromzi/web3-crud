import React, { useEffect, useState } from 'react';
import Dashboard from './routes/Dashboard';

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const checkWalletIsConnected = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      // console.log('Make sure you have metamask!');
      return;
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length === 0) {
      // console.log('No authorized account found');
      return;
    }
    const account = accounts[0];
    // console.log('Found an authorized account: ', account);
    setCurrentAccount(account);
    setIsConnected(true);
  };

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert('Get MetaMask!');
      return;
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      // console.log('Found an account! Address: ', accounts[0]);
      setCurrentAccount(accounts[0]);
      setIsConnected(true);
    } catch (error) {
      // console.log('Error: ', error);
    }
  };

  const connectWalletButton = () => {
    return <button onClick={connectWalletHandler}>Connect Wallet</button>;
  };

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  return (
    <>
      {isConnected ? (
        <Dashboard />
      ) : (
        <div className="flex-small">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '50px'
            }}>
            <h1>Web3 Crud App by Raihan Romzi</h1>
            {connectWalletButton()}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
