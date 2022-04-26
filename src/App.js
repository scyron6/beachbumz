import { useState, useEffect } from 'react';
import Navbar from './components/Navbar.js';
import NFTs from './components/NFTs.js';
import { ethers } from 'ethers';
import BeachBumNFT from './util/BeachBumNFT.json';

function App() {
  const CONTRACT_ADDRESS = '0xe92b40A668201e0253Cf4918b886218e87aBD324';
  const [account, setAccount] = useState('');
  const [mints, setMints] = useState([]);

  const getMints = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          BeachBumNFT.abi,
          signer
        );

        console.log('Going to pop wallet now to pay gas...');
        let mintNums = await connectedContract.getMintNumbers();
        console.log('Mining...please wait.');

        console.log(`Mined, ${mintNums[0]}`);
        setMints(mintNums);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Setup our listener.
  const setupEventListener = async () => {
    // Most of this looks the same as our function askContractToMintNft
    try {
      const { ethereum } = window;

      if (ethereum) {
        // Same stuff again
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          BeachBumNFT.abi,
          signer
        );

        // THIS IS THE MAGIC SAUCE.
        // This will essentially "capture" our event when our contract throws it.
        // If you're familiar with webhooks, it's very similar to that!
        connectedContract.on('NewBeachBumNFTMinted', (from, tokenId) => {
          console.log(from, tokenId.toNumber());
          alert(
            `Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`
          );
        });

        console.log('Setup event listener!');
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log('Make sure you have metamask!');
      return;
    } else {
      console.log('We have the ethereum object', ethereum);
    }

    /*
     * Check if we're authorized to access the user's wallet
     */
    const accounts = await ethereum.request({ method: 'eth_accounts' });

    /*
     * User can have multiple authorized accounts, we grab the first one if its there!
     */
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log('Found an authorized account:', account);
      setAccount(account);
      getMints();
      let chainId = await ethereum.request({ method: 'eth_chainId' });
      console.log('Connected to chain ' + chainId);

      // String, hex code of the chainId of the Rinkebey test network
      const rinkebyChainId = '0x4';
      if (chainId !== rinkebyChainId) {
        alert('You are not connected to the Rinkeby Test Network!');
      }
    } else {
      console.log('No authorized account found');
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }

      /*
       * Fancy method to request access to account.
       */
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      /*
       * Boom! This should print out public address once we authorize Metamask.
       */
      console.log('Connected', accounts[0]);
      setAccount(accounts[0]);
      getMints();
      let chainId = await ethereum.request({ method: 'eth_chainId' });
      console.log('Connected to chain ' + chainId);

      // String, hex code of the chainId of the Rinkebey test network
      const rinkebyChainId = '0x4';
      if (chainId !== rinkebyChainId) {
        alert('You are not connected to the Rinkeby Test Network!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className='App'>
      <Navbar account={account} connectWallet={connectWallet} />
      <NFTs mints={mints} getMints={getMints} />
    </div>
  );
}

export default App;
