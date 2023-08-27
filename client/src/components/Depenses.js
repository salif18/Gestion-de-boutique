import React, { useContext } from 'react';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { MyStore } from '../context/store';
const Depenses = () => {
    const {depensesTotal} = useContext(MyStore)
    return (
        <div className='depenses'>
        <h1><MonetizationOnIcon className='icon'/>  Depenses sur benefice </h1>
        <p>{depensesTotal} Fcfa </p>
        </div>
    );
}

export default Depenses;
