import styles from "../styles/Home.module.css";
import { useMetaplex } from "../hooks/useMetaplex";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Nft, NftWithToken, Sft, SftWithToken } from "@metaplex-foundation/js";

export const ShowNFTs = ({ onClusterChange }) => {
  const { metaplex } = useMetaplex();
  const wallet = useWallet();

  const [nft, setNft] = useState(null);
  const [nfts, setNfts] = useState([])
  const [loading, setLoading] = useState(false)

  const onClick = async () => {
    if (!metaplex) return;
    setLoading(true)
    const myAssets = await metaplex
      .nfts()
      .findAllByOwner({ owner: metaplex?.identity().publicKey });

    console.log("myAssets => ", myAssets)
    setLoading(false)

    setNfts(myAssets)
    if (!myAssets.length) {
      setNft(null);
      return;
    }

    const randIdx = Math.floor(Math.random() * myAssets.length);
    const nft = await metaplex.nfts().load({ metadata: myAssets[randIdx] });
    setNft(nft);
  };

  if (!wallet.connected) {
    return null;
  }

  return (
    <div>
      <select onChange={onClusterChange} className={styles.dropdown}>
        <option value="devnet">Devnet</option>
        <option value="mainnet">Mainnet</option>
        <option value="testnet">Testnet</option>
      </select>
      <div>
        <div className={styles.container}>
          <h1 className={styles.title}>NFT Mint Address</h1>
          <div className={styles.nftForm}>
            {
              loading ? "loading" : <button onClick={onClick}>Show NFTs</button>
            }

          </div>
          {
            nfts.map((nft, id) => {
              return <div key={id}>
                {nft.name}
              </div>
            })
          }
        </div>
      </div>
    </div>
  );
};
