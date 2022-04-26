import React, { useState } from 'react';
import { ethers } from 'ethers';
import BeachBumNFT from '../util/BeachBumNFT.json';

const NFT = ({ name, image, mints, getMints }) => {
  const [mining, setMining] = useState(false);

  const askContractToMintNft = async () => {
    const CONTRACT_ADDRESS = '0xe92b40A668201e0253Cf4918b886218e87aBD324';

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
        let nftTxn;
        console.log(name);
        switch (name) {
          case 'Huge Barrel':
            nftTxn = await connectedContract.makeHugeBarrelNFT();
            break;
          case 'Big Left':
            nftTxn = await connectedContract.makeBigLeftNFT();
            break;
          case 'Solitary':
            nftTxn = await connectedContract.makeSolitaryNFT();
            break;
          case 'Pipeline?':
            nftTxn = await connectedContract.makePipelineNFT();
            break;
          case 'Board':
            nftTxn = await connectedContract.makeBoardNFT();
            break;
          case 'Peak':
            nftTxn = await connectedContract.makePeakNFT();
            break;
          case 'Two Friends':
            nftTxn = await connectedContract.makeTwoFriendsNFT();
            break;
          case 'Waterline':
            nftTxn = await connectedContract.makeWaterlineNFT();
            break;
          default:
            break;
        }

        setMining(true);
        console.log('Mining...please wait.');
        await nftTxn.wait();

        console.log(
          `Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
        );
        setMining(false);
        getMints();
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='wrapper'>
      <div className='card-rotate-bg'></div>

      <div className='card'>
        <div className='card-head'>
          <img
            src={require(`../images/${image}`)}
            alt=''
            className='product-img'
          />
          {!mining && (
            <button
              className='bid-btn pointer'
              onClick={() => {
                askContractToMintNft();
              }}>
              Mint
            </button>
          )}
          {mining && <button className='mining'>Mining...</button>}
        </div>

        <div className='card-body'>
          <h4 className='product-name'>
            <a href='#'>{name}</a>
          </h4>
          <a href='#' className='latest-bid'>
            {mints}/5 NFTs minted so far
          </a>
        </div>
      </div>
    </div>
  );
};

export default NFT;
