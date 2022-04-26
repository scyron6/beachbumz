import React from 'react';
import '../styles/styles.css';

const Navbar = ({ account, connectWallet }) => {
  return (
    <div className='navbar'>
      <h1 className='title'>Beach Bum NFTs</h1>
      <button
        className={account ? 'wallet active' : 'wallet'}
        onClick={() => connectWallet()}>
        {account
          ? account.toString().substring(0, 10) + '...'
          : 'Connect Wallet'}
      </button>
    </div>
  );
};

export default Navbar;
