import React, { useContext } from 'react';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import PaymentsIcon from '@mui/icons-material/Payments';
import { MyStore } from '../context/store';
const Cout = () => {
    const {beneficeGeneral} = useContext(MyStore)
    return (
        <div className='cout'>
            <h1><PaymentsIcon className='icon'/> Bénefices global</h1>
            <p>{beneficeGeneral} Fcfa</p>
        </div>
    );
}

export default Cout;
