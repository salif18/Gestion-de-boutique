import React, { useContext } from 'react';

import { MyStore } from '../context/store';
import EuroIcon from '@mui/icons-material/Euro';

const CoutProduct = () => {
    const {venteTotal,beneficeGeneral} = useContext(MyStore)
    return (
        <div className='coutprod'>
        <h1><EuroIcon className='icon'/> Prix d'achats des ventes</h1>
        <p>{venteTotal-beneficeGeneral} Fcfa </p>
        </div>
    );
}

export default CoutProduct;
