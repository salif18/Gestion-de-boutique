import React, { useContext } from 'react';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { MyStore } from '../context/store';
const Cout = () => {
    const {beneficeGeneral} = useContext(MyStore)
    return (
        <div className='cout'>
            <h1><AttachMoneyIcon className='icon'/> Benefices globales</h1>
            <p>{beneficeGeneral} Fcfa</p>
        </div>
    );
}

export default Cout;
