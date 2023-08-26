import React, { useContext, useState } from 'react';
import { MyStore } from '../context/store';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

const Categories = () => {
    const {produits , handleAddPanier} = useContext(MyStore)
    const navigate = useNavigate()
    //etat initiale de la valeur de categorie a filtrer
    const [categories ,setCategories ] = useState('')

    
    // les bouton de categories
    const handleAjouter =(item)=>{
        handleAddPanier(item)
        navigate('/ventes')
        
     }
     
     
//supprimer le produit
const handledelete = (id)=>{
   axios.delete(`http://localhost:3004/produits/${id}`)
   .then((res) => res.data)
   .catch((err)=>console.log(err))
 };

     const parfum =()=>{
        setCategories('Parfum')
     }

     const deodaurant =()=>{
        setCategories('Deodorant')
     }

     const pommade =()=>{
        setCategories('Pommade')
     }

     const lait = ()=>{
        setCategories('Lait')
     }

     const lotion =()=>{
        setCategories('Lotion')
     }

     const tube =()=>{
        setCategories('Tube')
     }

     

     const autres =()=>{
      setCategories('Autres')
     }

     const savon =()=>{
      setCategories('Savon')
     }

     //vue de frontend
    return (
        <main className='categories'>
            <header className='header-categories'>
              <h1>Categories</h1>
            </header>
            <nav className='categorie-navbar'>
            <button className='btn-cate' onClick={()=>parfum()}>Parfum</button>
            <button className='btn-cate' onClick={()=>deodaurant()}>Deodaurant</button>
            <button className='btn-cate' onClick={()=>pommade()}>Pommade</button>
            <button className='btn-cate' onClick={()=>lait()}>Lait</button>
            <button className='btn-cate' onClick={()=>lotion()}>Lotion</button>
            <button className='btn-cate' onClick={()=>tube()}>Tube</button> 
            <button className='btn-cate' onClick={()=>autres()}>Autres</button>
            <button className='btn-cate' onClick={()=>savon()}>Savon</button>
            </nav>

            <div className='categorie-container'>
               <h1>Choisir une categorie de produits</h1>
               {
                <div className='array-products'>
              <table className='table'>
               <thead className='table-header'>
               <tr className='ligne'>
                 <th  className='colonne'>NOMS</th>
                 <th className='colonne'>CATEGORIES</th>
                 <th className='colonne'>PRIX D'ACHATS</th>
                 <th className='colonne'>PRIX DE VENTE</th>
                 <th className='colonne'>STOCKS</th>
                 <th className='colonne'>DATE</th>
                 <th className='colonne'>ACTIONS</th>
               </tr>
               </thead>
              {produits.filter((item) => item.categories === categories).map((item)=>(<tbody className='table-body' key={item.id}>
               <tr className='ligne-body'>
                <th className='colon'>{item.nom}</th>
                <th className='colon'>{item.categories}</th>
                <th className='colon'>{item.prixAchat} FCFA</th>
                <th className='colon'>{item.prixVente} FCFA</th>
                <th className='colon'>{item.stocks <= 0 ? <span className='fini'>Ce stock est fini</span> : item.stocks}</th>
                <th className='colon'>{item.dateAchat}</th>
                <th className='colon'>
                {item.stocks > 0 && <span onClick={()=>handleAjouter(item)}><ShoppingCartIcon className='ico' /></span>}
                <span onClick={()=>navigate(`/produits/${item.id}`)}> <EditIcon className='edit' /> </span>
                {item.stocks <= 0 &&<span onClick={()=>handledelete(item.id)}><DeleteIcon className='del' /> </span>}
                </th>
               </tr>
              </tbody>))}
              </table>
            </div>

               }
            </div>
        </main>
    );
}

export default Categories;
