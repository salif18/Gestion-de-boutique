import React, { useContext, useState } from 'react';
import { MyStore } from '../context/store';
import Recus from '../components/Recus';
import PrintIcon from '@mui/icons-material/Print';

const Rapports = () => {
  const { vendues} = useContext(MyStore)
  const [dateValue, setDateValue] = useState('');

  const ventesFilter = vendues?.filter((x) => x.timestamps?.includes(dateValue))

  const handlePrint =()=>{
    window.print()
  }
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
             <div className='tableau-de-vente'>
             
                 
                 <table className='table'>
                 <thead className='head_1'>
                 <tr className='li_1'>
                 <th className='co'>NOMS</th>
                 <th className='co'>CATEGORIES</th>
                 <th className='co'>PRIX D'ACHAT UNITAIRE</th>
                 <th className='co'>PRIX DE VENTE UNITAIRE</th>
                 <th className='co'>QUANTITES</th>
                 <th className='co'>SOMMES</th>
                 <th className='co'>BENEFICES</th>
                 </tr>
                 </thead>
                 {ventesFilter.map((item)=>(
                  <tbody key={item._id}>
                 <tr className='li_2'>
                  <th className='co2'>{item.nom}</th>
                  <th className='co2'>{item.categories}</th>
                  <th className='co2'>{item.prixAchat} FCFA</th>
                  <th className='co2'>{item.prixVente} FCFA</th>
                  <th className='co2'>{item.qty}</th>
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
                   <button className='btn-print' onClick={()=>handlePrint()}><PrintIcon style={{marginRight:10}}/> Imprimer</button>
                 </div>

        </main>
    );
}

export default Rapports;
