import React, { useEffect, useState } from 'react';
import {  useParams } from 'react-router';
import axios from 'axios';


const SingleProduits = () => {
  const [messages,setMessages] = useState('')
    //etat initial des champs de formulaire
    const [produits, setProduits] = useState({
      nom:"",
      categories:"",
      prixAchat:"",
      prixVente:"",
      stocks:"",
  })

  //etat de stockage d'erreur
  const [error , setError] = useState('')


  //recuperation dune seul donnee selectioner
    const [items , setItems] = useState({})
    const {id} = useParams()
    
    useEffect(()=>{
          axios.get(`http://localhost:3004/produits/${id}`)
          .then((res) => {
            setItems(res.data)
          }).catch((err) => console.log(err))
    },[id])
   const item = items[0]

    //valeur des champs options
    const options = [
      {value:'Parfum',label:'Parfum'},
      {value:'Pommade',label:'Pommade'},
      {value:'Deodorant',label:'Deodorant'},
      {value:'Lait',label:'Lait'},
      {value:'Lotion',label:'Lotion'},
      {value:'Coton',label:'Coton'},
      {value:'Meche',label:'Meche'},
      {value:'Moustiquaire',label:'Anti-moustique'},
      {value:'Accessoire',label:'Accessoire'},
      {value:'Savon',label:'Savon'},
  ]

  //changement de etat des champs
  const handleChange =(e)=>{
      const {name,value} = e.target
      setProduits({...produits,[name]:value})
  }

  //fonction envoie des donnee modifier dans le backend
    const handlePut =()=>{
      if(produits.nom.length <= 0 ||
         produits.categories.length <= 0 ||
         produits.prixAchat.length <= 0 ||
         produits.prixVente.length <= 0 || 
         produits.stocks.length <= 0 ){
         setError("Si ce champs n'est pas a modifier veuillez entrer l'ancienne valeur")
      }else{
        axios.put(`http://localhost:3004/produits/update/${id}`,produits)
          .then((response) => {
            setMessages(response.data.message)
          }).catch((err) => console.log(err));
          // navigate('/produits');
          setProduits({
            nom:"",
            categories:"",
            prixAchat:"",
            prixVente:"",
            stocks:"",
        })
      }
    };

    
//supprimer le produit
const handledelete = (id)=>{
  axios.delete(`http://localhost:3004/produits/${id}`)
  .then((res) =>{
    setMessages(res.data.message)
  })
  .catch((err)=>console.log(err))
}

    messages && setInterval(()=>{
      setMessages('')
    },3000)
  
    //le rendue vue
    return (
        <main className='single'>
        <div className='header-single'>
         <h1>Modification du produit</h1>
        </div>
        <div className='modifier-container'>
        
        <div className='infos-fournisseur'>
         <div className='fourmi'>
         <label>Prix d'achats</label>
         <input type='text' name='prixAchat' value={produits.prixAchat} onChange={(e)=>handleChange(e)} placeholder={item?.prixAchat}/>
         {produits.prixAchat.length <= 0 && <span>{error}</span>}
         </div>
         <div className='fourmi'>
         <label>Prix de ventes</label>
         <input type='number' name='prixVente' value={produits.prixVente} onChange={(e)=>handleChange(e)} placeholder={item?.prixVente} />
         {produits.prixVente.length <= 0 && <span>{error}</span>}
         </div>
         <span className='messge-single'>{messages}</span>
        </div>

        <div className='infos-produit'>
        <div className='fourmi'>
        <label>Nom</label>
        <input type='text' name='nom' value={produits.nom} onChange={(e)=>handleChange(e)} placeholder={item?.nom} />
        {produits.nom.length <= 0 && <span>{error}</span>}
        </div>
        <div className='fourmi'>
            <label >Categories</label>
            <select type='text' name='categories' value={produits.categories} onChange={(e)=>handleChange(e)} placeholder='Categorie'>
            <option >Catégorie--Select</option>
            {options.map((item) =>(
                <option key={item.value} value={item.value}>{item.label}</option>
            ))}
            </select>
            {produits.categories.length <= 0 && <span>{error}</span>}
            </div>

      
        <div className='fourmi'>
        <label>Quantités</label>
        <input className='input-qty' type='number' name='stocks' value={produits.stocks} onChange={(e)=>handleChange(e)} placeholder={item?.stocks} />
        {produits.stocks.length <= 0 && <span>{error}</span>}
        </div>
        </div>

        <button className='btn-save-modif' onClick={()=>handlePut(item.id)}>Modifier</button>
        <button className='btn-supp-modif' onClick={()=>handledelete(item.id)}>Supprimer</button>
         </div>
    </main>
    );
}

export default SingleProduits;
