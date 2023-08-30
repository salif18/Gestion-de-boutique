import React, { useContext, useEffect, useState } from 'react';
import { MyStore } from '../context/store';
import axios from 'axios';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { useNavigate } from 'react-router';

const ListeVente = () => {
  const navigate = useNavigate()
  const {cancelStock} = useContext(MyStore)
  const [message ,setMessage] = useState('')
  const [vendues , setVendues] = useState([])

  //charger les ventes
  useEffect(() => {
    const getVente =()=>{
    axios
      .get("http://localhost:3004/ventes")
      .then((response) => {
        setVendues(response.data);
      })
      .catch((err) => console.log(err));
    };
    getVente()
  }, []);

  //supprimer
const handledelete = (item)=>{
  axios.delete(`http://localhost:3004/ventes/${item.id}`)
  .then((res) => {
    setMessage(res.data.message)
    navigate('/liste-ventes') 
  })
  .catch((err)=>console.log(err));
   cancelStock(item)
}

message && setInterval(()=>setMessage(''),3000)
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
             <th className='co'>ANNULER UNE VENTE</th>
             </tr>
             </thead>
             {vendues.map((item)=>(<tbody key={item.id}>
             <tr className='li_2'>
               <th className='co2'>{item.nom}</th>
               <th className='co2'>{item.categories}</th>
               <th className='co2'>{item.prixVente*item.qty} FCFA</th>
               <th className='co2'>{item.qty}</th>
               <th className='co2'>{item.timestamps}</th>
               <span className='cancel' onClick={()=>handledelete(item)}> <RotateLeftIcon  />  Annuler </span>
              
             </tr>
             </tbody>))}
             <span className='messge-vente-list'>{message}</span>
             </table>
            </div>
        </main>
    );
}

export default ListeVente;
