import React, { useContext } from 'react';
import { MyStore } from '../context/store';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
const Ventes = () => {
    const {venteTotal,beneficeGeneral} = useContext(MyStore)
    return (
        <div className='vents'>
            <h1><PointOfSaleIcon className='icon'/> Ventes globales</h1>
            <p>{venteTotal - beneficeGeneral } Fcfa - benefice</p>
        </div>
    );
}

export default Ventes;
