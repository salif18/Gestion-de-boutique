import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { MyStore } from '../context/store';

const AddProduits = () => {
    const navigate = useNavigate()
    const {handleSave} = useContext(MyStore)
    //etat initial des champs de formulaire
    const [produits, setProduits] = useState({
        nom:"",
        categories:"",
        prixAchat:"",
        prixVente:"",
        stocks:"",
        dateAchat:""
    })
   //etat de stockage d'erreur
    const [error , setError] = useState('')

    //valeurs des options de formulaire
    const options = [
        {value:'Parfum',label:'Parfum'},
        {value:'Pommade',label:'Pommade'},
        {value:'Deodorant',label:'Deodorant'},
        {value:'Lait',label:'Lait'},
        {value:'Lotion',label:'Lotion'},
        {value:'Autres',label:'Autres'},
        {value:'Tube',label:'Tube'},
        {value:'Savon',label:'Savon'},
    ]

    //focntion de changer les champs
    const handleChange =(e)=>{
        const {name,value} = e.target
        setProduits({...produits,[name]:value})
    }

    //fonction d'ajout e controle dajout dans la base de donnee
    const handleAdd = () =>{
        if( produits.nom.length <= 0 || 
            produits.prixAchat.length <= 0 || 
            produits.prixVente.length <= 0 || 
            produits.stocks.length <= 0 || 
            produits.dateAchat.length <= 0 || 
            produits.categories.length <= 0){
           setError('Veuiller remplir ce champs')
        }else{
          handleSave(produits)
          setProduits({
            nom:"",
            categories:"",
            prixAchat:"",
            prixVente:"",
            stocks:"",
            dateAchat:""
        })
          //navigate('/produits')
        }
    }


    //vue frontend
    return (
        <main className='addproduits'>
            <div className='header-add'>
             <h1>Ajouter des produits</h1>
            </div>
            <div className='add-container'>
            
            <div className='infos-fournisseur'>
            
             <div className='fourmi'>
             <label>Prix d'achats</label>
             <input type='number' name='prixAchat' value={produits.prixAchat} onChange={(e)=>handleChange(e)} placeholder="Prix d'achat.."/>
             {produits.prixAchat.length <= 0 && <span>{error}</span>}
             </div>

             <div className='fourmi'>
            <label>Prix de ventes</label>
            <input type='number' name='prixVente' value={produits.prixVente} onChange={(e)=>handleChange(e)} placeholder='Prix de vente..' />
            {produits.prixVente.length <= 0 && <span>{error}</span>}
            </div>
            </div>

           
            <div className='infos-produit'>
            <div className='fourmi'>
            <label>Nom</label>
            <input type='text' name='nom' value={produits.nom} onChange={(e)=>handleChange(e)} placeholder='Nom du produit' />
            {produits.nom.length <= 0 && <span>{error}</span>}
            </div>

            <div className='fourmi'>
            <label >Categories</label>
            <select type='text' name='categories' value={produits.categories} onChange={(e)=>handleChange(e)} placeholder='Categorie'>
            <option >Categorie--Select</option>
            {options.map((item) =>(
                <option key={item.value} value={item.value}>{item.label}</option>
            ))}
            </select>
            {produits.categories.length <= 0 && <span>{error}</span>}
            </div>

            <div className='fourmi'>
             <label>Date</label>
             <input type='date' name='dateAchat' value={produits.dateAchat} onChange={(e)=>handleChange(e)}/>
             {produits.dateAchat.length <= 0 && <span>{error}</span>}
             </div>
            

            <div className='fourmi'>
            <label>Quantites</label>
            <input className='input-qty' type='number' name='stocks' value={produits.stocks} onChange={(e)=>handleChange(e)} placeholder='Quantites de stocks' />
            {produits.stocks.length <= 0 && <span>{error}</span>}
            </div>
            </div>

            <button className='btn-save' onClick={()=>handleAdd()}>Enregistrer</button>
             </div>
        </main>
    );
}

export default AddProduits;
