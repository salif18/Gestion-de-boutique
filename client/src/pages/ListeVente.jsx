import React, { useContext } from 'react';
import { MyStore } from '../context/store';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';


const ListeVente = () => {
  const {vendues} = useContext(MyStore)
  //supprimer
const handledelete = (id)=>{
  axios.delete(`http://localhost:3004/ventes/${id}`)
  .then((res) => res.data)
  .catch((err)=>console.log(err))
}
 
//vue de frontend
    return (
        <main className='list'>
            <header className='header-list'>
              <h1>Les Produits vendus</h1>
            </header>
            <div className='tableau-de-vente'>
             <table className='table'>
             <thead className='head_1'>
             <tr className='li_1'>
             <th className='co'>NOMS</th>
             <th className='co'>CATEGORIES</th>
             <th className='co'>PRIX DE VENTE</th>
             <th className='co'>QUATITES</th>
             <th className='co'>DATE</th>
             </tr>
             </thead>
             {vendues.map((item)=>(<tbody key={item.id}>
             <tr className='li_2'>
               <th className='co2'>{item.nom}</th>
               <th className='co2'>{item.categories}</th>
               <th className='co2'>{item.prixVente*item.qty} FCFA</th>
               <th className='co2'>{item.qty}</th>
               <th className='co2'>{item.timestamps}</th>
               <span onClick={()=>handledelete(item.id)}> <DeleteIcon className='del' /> </span>
             </tr>
             </tbody>))}
            
             </table>
            </div>
        </main>
    );
}

export default ListeVente;
