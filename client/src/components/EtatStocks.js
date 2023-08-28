import React, { useContext } from 'react';
import { MyStore } from '../context/store';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';

const EtatStocks = () => {
    const {produits} = useContext(MyStore)
    const filterStock = produits.filter((item) => item.stocks === 0)
    return (
        <div className='stocksin'>
        <CallMissedOutgoingIcon className='icon'/><h1>Stocks en insuffisance</h1>
        {filterStock.length <=0 && <p>Aucuns</p>}
        <div className='ssss'>
        {
            filterStock.slice(0,4).map((item) => (
                <div className='stocks-cont'>
                  <p className='nom'>{item.nom}</p>
                  <p className='cat'>{item.categories}</p>
                  <span>{item.stocks}</span>
                </div>
            ))
        }
        </div>
        </div>
    );
}

export default EtatStocks;
