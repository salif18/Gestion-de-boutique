import React, { useContext } from 'react';
import { MyStore } from '../context/store';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const Revenues = () => {
    const {beneficeGeneral,depensesTotal} = useContext(MyStore)
    const result = beneficeGeneral - depensesTotal
    return (
        <div className='revenus'>
        <h1><TrendingDownIcon style={{color:result <= 0 ? 'red':''}} className='icon'/> Revenus generals</h1>
        <div className='r'><p>{result} Fcfa</p> {result <= 0 ?<ArrowDownwardIcon style={{color:'red'}}/> :<ArrowUpwardIcon style={{color:'green'}} />}</div>
    </div>
    );
}

export default Revenues;
