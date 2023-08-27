import React, { useContext } from 'react';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import { MyStore } from '../context/store';
import EuroIcon from '@mui/icons-material/Euro';

const CoutProduct = () => {
    const {venteTotal,beneficeGeneral} = useContext(MyStore)
    return (
        <div className='coutprod'>
        <h1><EuroIcon className='icon'/> Prix des produits vendus</h1>
        <p>{venteTotal-beneficeGeneral} Fcfa </p>
        </div>
    );
}

export default CoutProduct;
