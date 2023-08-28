import React from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import GridViewIcon from '@mui/icons-material/GridView';
const SideBar = () => {
    return (
        <aside className='sidebar'>
           <NavLink className='liens' to='/' ><GridViewIcon className='icon'/> Tableau de bord</NavLink> 
           <NavLink className='liens' to='/produits' ><AddBusinessIcon className='icon'/>Produits</NavLink> 
           <NavLink className='liens' to='/categories' ><CategoryIcon className='icon'/>Catégories</NavLink> 
           <NavLink className='liens' to='/ventes' ><MonetizationOnIcon className='icon'/>Ventes</NavLink> 
           <NavLink className='liens' to='/rapports' ><AssignmentIcon className='icon'/>Rapports</NavLink>
           <NavLink className='liens' to='/most_sold'><AutoAwesomeIcon className='icon'/>Meilleur vente</NavLink> 
           <NavLink className='liens' to='/depenser'><PointOfSaleIcon className='icon'/>Dépenses</NavLink>
        </aside>
    );
}

export default SideBar;
  