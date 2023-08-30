import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import EditIcon from '@mui/icons-material/Edit';
import { MyStore } from '../context/store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';



const Produits = () => {
  const navigate = useNavigate()
  const {produits,handleAddPanier} = useContext(MyStore)


  //caclule le nombre total de stocks
const calculeStock = ()=>{
 const numberStock = produits.map((item) => (item?.stocks))
 const resultat = numberStock.reduce((a,b) => a + b,0)
 return resultat
}
const numberStock = calculeStock()

//ajouter produit dans le panier de vente
const handleAjouter =(item)=>{
   handleAddPanier(item)
   navigate('/ventes')
   
}

//supprimer le produit
const handledelete = (id)=>{
  axios.delete(`http://localhost:3004/produits/${id}`)
  .then((res) => res.data)
  .catch((err)=>console.log(err))
}

//la valeur de recherche
const [searchValue,setSearchValue] = useState('')
const ProductFilter = produits.filter((item) => item.nom.includes(searchValue) || item.categories.includes(searchValue) || item.stocks == searchValue)

//le slice par nombre
const [selection,setSelection] = useState(produits.length)
const options = [
  {values:produits.length,label:'Afficher tous'},
   {values:5,label:5},{values:10,label:10},{values:20,label:20},
   {values:25,label:25},{values:50,label:50},{values:80,label:80},{values:100,label:100},
  ]

    return (
        <main className='produits'>
            <div className='title-stock'>
            <div className='leftp'>
              <h3>Etat de stock</h3>
              <p> {numberStock} produits</p>
            </div>
            <button className='btn-add' onClick={()=>navigate('/add-produits')}>Ajouter <AddBusinessIcon style={{marginLeft:5}} /></button>
            </div>
            <div className='filter-search'>
             <select className='selection' value={selection} onChange={(e)=>setSelection(e.target.value)}>
               {options.map((item)=>(
                <option className='option' key={item.label} value={item.values}>{item.label}</option>))

              }
               
             </select>

             <input type='text' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} placeholder='Rechercher un produit...' />
            </div>
            
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
              {searchValue &&
                ProductFilter?.map((item)=>(<tbody className='table-body' key={item.id}>
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
                {item.stocks <= 0 && 
                  <span onClick={()=>handledelete(item.id)}>
                    <DeleteIcon className='del' /> 
                  </span>
                 }
                </th>
               </tr>
              </tbody>))}

              {!searchValue &&
                produits.slice(0,selection).map((item)=>(<tbody className='table-body' key={item.id}>
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
                {item.stocks <= 0 && 
                  
                  <span onClick={()=>handledelete(item.id)}>
                    <DeleteIcon className='del' /> 
                  </span>
                 }
                </th>
                </tr>
              </tbody>))}

              {(!searchValue && !selection) &&
                produits.map((item)=>(<tbody className='table-body' key={item.id}>
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
                {item.stocks <= 0 && 
                  
                  <span onClick={()=>handledelete(item.id)}>
                    <DeleteIcon className='del' /> 
                  </span>
                 }
                </th>
                </tr>
              </tbody>))}
              </table>
            </div>
        </main>
    );
}

export default Produits;
