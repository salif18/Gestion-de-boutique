import React, { useContext } from 'react';
import { MyStore } from '../context/store';

const BestVente = () => {
    const {bestVendu} = useContext(MyStore)
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
