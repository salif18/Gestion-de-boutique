import React from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import MuseumIcon from '@mui/icons-material/Museum';
import CategoryIcon from '@mui/icons-material/Category';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
const SideBar = () => {
    return (
        <aside className='sidebar'>
           <NavLink className='liens' to='/' ><HomeIcon className='icon'/> Vue d'ensemble</NavLink> 
           <NavLink className='liens' to='/produits' ><AddBusinessIcon className='icon'/>Produits</NavLink> 
           <NavLink className='liens' to='/categories' ><CategoryIcon className='icon'/>Categories</NavLink> 
           <NavLink className='liens' to='/ventes' ><MonetizationOnIcon className='icon'/>Ventes</NavLink> 
           <NavLink className='liens' to='/rapports' ><AssignmentIcon className='icon'/>Rapports</NavLink> 
           <NavLink className='liens' to='/depenser'><PointOfSaleIcon className='icon'/>Depenser</NavLink>
        </aside>
    );
}

export default SideBar;
  