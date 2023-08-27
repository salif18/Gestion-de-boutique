import React, { useContext } from 'react';
import { MyStore } from '../context/store';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
const Achats = () => {
    const {achatTotal} = useContext(MyStore)
    return (
        <div className='achats'>
            <h1><CurrencyBitcoinIcon className='icon'/>  Prix d'achats generals </h1>
            <p>{achatTotal} Fcfa</p>
        </div>
    );
}

export default Achats;
