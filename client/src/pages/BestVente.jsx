import React, {useEffect, useState } from 'react';
import axios from 'axios';

const BestVente = () => {
    const [bestVendu ,setBestVendu] = useState([])
    //recuperer les meilleur vente
  useEffect(()=>{
    const getBestVente =()=>{
      axios.get('http://localhost:3004/ventes/most_sold')
      .then((res)=>{
       setBestVendu(res.data)
      }).catch((err)=>console.log(err))
    };
    getBestVente()
 },[])
    return (
        <main className='bestvente'>
        <header className='header-best'>
        <h1>TENDANCE DU MARCHE</h1>
      </header>
      <div className='best-container'>
      <h1>Produits les plus achetes</h1>
      {bestVendu.map((item) =>(
        <div className='card-best' key={item.id}>
         <h1>{item.nom}</h1>
         <span>{item.categories}</span>
         <p>{item.total_vendu}</p>
        </div>
      ))}
      </div>
        </main>
    );
}

export default BestVente;
