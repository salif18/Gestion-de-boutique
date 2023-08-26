import React, { useContext } from 'react';
import { MyStore } from '../context/store';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
const Achats = () => {
    const {achatTotal} = useContext(MyStore)
    return (
        <div className='achats'>
            <h1><CurrencyExchangeIcon className='icon'/> Achats generals </h1>
            <p>{achatTotal} Fcfa</p>
        </div>
    );
}

export default Achats;
