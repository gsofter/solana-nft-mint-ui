import styles from "../styles/Home.module.css";
import { useMetaplex } from "../hooks/useMetaplex";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Nft, NftWithToken, Sft, SftWithToken } from "@metaplex-foundation/js";
import { TokenStandard } from '@metaplex-foundation/mpl-token-metadata';


export const CreateNFT = ({ onClusterChange }) => {
    const { metaplex } = useMetaplex();
    const wallet = useWallet();

    const [loading, setLoading] = useState(false)
    const [uri, setUri] = useState('https://arweave.net/gqZz3PLJXrUJ_VG-zgxyaUVSfIdOFyKFkn_8R_JsJtk')
    const [nftName, setNftName] = useState('')

    const onClick = async () => {
        setLoading(true)
        try {
            const { nft } = await metaplex.nfts().create({
                uri: uri,
                name: nftName,
                sellerFeeBasisPoints: 500, // Represents 5.00%.
                tokenStandard: TokenStandard.ProgrammableNonFungible
            });

            console.log(nft.json())
            setLoading(false)
        } catch (e) {
            console.log(e)
            setLoading(false)
        }
    };

    if (!wallet.connected) {
        return null;
    }

    return (
        <div className={styles.container}>
            <div className={styles.nftForm}>
                <input value={uri} onChange={e => setUri(e.target.value)} />
                <input value={nftName} onChange={e => setNftName(e.target.value)} />
                {
                    loading ? 'loading' : <button onClick={onClick}>Create NFT</button>
                }
            </div>
        </div>
    );
};
