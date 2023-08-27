import React, { useContext } from 'react';
import { MyStore } from '../context/store';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
const Achats = () => {
    const {achatTotal} = useContext(MyStore)
    return (
        <div className='achats'>
            <h1><AttachMoneyIcon className='icon'/>  Prix d'achats générals </h1>
            <p>{achatTotal} Fcfa</p>
        </div>
    );
}

export default Achats;
