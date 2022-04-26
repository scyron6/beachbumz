import React from 'react';
import NFT from './NFT.js';

const NFTs = ({ mints, getMints }) => {
  return (
    <div className='nfts'>
      <h1 className='label'>
        The Collection (View on{' '}
        <a
          href='https://testnets.opensea.io/collection/beachbumnft-5tvawiqe6j'
          style={{ display: 'inline' }}>
          OpenSea
        </a>
        )
      </h1>
      <main className='container'>
        <NFT
          name={'Huge Barrel'}
          getMints={getMints}
          image={'IMG_0272.JPG'}
          mints={mints.length !== 0 ? mints[0].toNumber() : '?'}
        />
        <NFT
          name={'Solitary'}
          getMints={getMints}
          image={'IMG_0286.JPG'}
          mints={mints.length !== 0 ? mints[5].toNumber() : '?'}
        />
        <NFT
          name={'Pipeline?'}
          getMints={getMints}
          image={'IMG_0283.JPG'}
          mints={mints.length !== 0 ? mints[4].toNumber() : '?'}
        />
        <NFT
          name={'Big Left'}
          getMints={getMints}
          image={'IMG_0284.JPG'}
          mints={mints.length !== 0 ? mints[1].toNumber() : '?'}
        />
        <NFT
          name={'Board'}
          getMints={getMints}
          image={'IMG_0285.JPG'}
          mints={mints.length !== 0 ? mints[2].toNumber() : '?'}
        />
        <NFT
          name={'Peak'}
          getMints={getMints}
          image={'IMG_0282 2.JPG'}
          mints={mints.length !== 0 ? mints[3].toNumber() : '?'}
        />
        <NFT
          name={'Two Friends'}
          getMints={getMints}
          image={'IMG_0288.JPG'}
          mints={mints.length !== 0 ? mints[6].toNumber() : '?'}
        />
        <NFT
          name={'Waterline'}
          getMints={getMints}
          image={'IMG_0290.JPG'}
          mints={mints.length !== 0 ? mints[7].toNumber() : '?'}
        />
      </main>
    </div>
  );
};

export default NFTs;
