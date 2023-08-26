import React, { useContext, useState } from 'react';
import { MyStore } from '../context/store';


const Rapports = () => {
  const { vendues} = useContext(MyStore)
  const [dateValue, setDateValue] = useState('');

  const ventesFilter = vendues?.filter((x) => x.timestamps?.includes(dateValue))

  //quantite total
  const calulQty =()=>{
    const qty = ventesFilter?.map((a) => a.qty);
    const sum = qty.reduce((a,b) => a+b,0)
    return sum
  } 
  const nombre_de_vente = calulQty()

//calcule somme total
  const calTotal =()=>{
    const prix = ventesFilter.map((x) => x.prixVente*x.qty)
    const sum = prix.reduce((a,b) => parseInt(a) + parseInt(b),0)
    return sum
  }
  const total = calTotal()

  //calcule benefice totale
  const calculBenefice = (data) => {
    let beneficeTotal = 0;
    for (let x of data) { 
      const bene = ((x.prixVente * x.qty/x.qty) - x.prixAchat) * x.qty; 
      console.log(bene);
      beneficeTotal += bene
    }
    return beneficeTotal;
  }
  const beneficeTotal = calculBenefice(ventesFilter);

  
    return (
        <main className='rapports'>
            <header className='header-rapport'>
              <h1>Rapports</h1>
            </header>
            
            <div className='filtre'>
              <label>Rapports du </label>
              <input type='date' value={dateValue} onChange={(e)=>setDateValue(e.target.value)} />
            </div>
             <div className='rapport-container'>
             
                 
                 <table className='card-rapport'>
                 <thead>
                 <tr>
                 <th>NOMS</th>
                 <th>CATEGORIES</th>
                 <th>PRIX D'ACHAT UNITAIRE</th>
                 <th>PRIX DE VENTE UNITAIRE</th>
                 <th>QUANTITES</th>
                 <th>SOMMES</th>
                 <th>BENEFICES</th>
                 </tr>
                 </thead>
                 {ventesFilter.map((item)=>(
                  <tbody key={item._id}>
                 <tr>
                  <th className='name'>{item.nom}</th>
                  <th className='prix'>{item.categories}</th>
                  <th className='prix'>{item.prixAchat} FCFA</th>
                  <th className='prix'>{item.prixVente} FCFA</th>
                  <th className='qty'>{item.qty}</th>
                  <th className=''>{item.prixVente*item.qty} FCFA</th>
                  <th className=''>{((item.prixVente*item.qty/item.qty) - item.prixAchat)*item.qty} FCFA</th>
                 </tr>

                 </tbody>))}
                 <tfoot></tfoot>
                 </table>

                </div> 

                <div className='infos-ventes'>
                <div className='nombr'>
                     <p>NOMBRE DE PRODUITS VENDUS</p><span>{nombre_de_vente}</span>
                   </div>
                   <div className='tot'>
                     <p>LA SOMME TOTALE</p><span>{total} FCFA</span>
                   </div>
                   <div className='bene'>
                     <p>LE BENEFICE TOTAL</p><span>{beneficeTotal} FCFA</span>
                   </div>
                 </div>

        </main>
    );
}

export default Rapports;
