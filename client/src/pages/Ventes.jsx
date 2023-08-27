import React, { useContext} from "react";
import { useNavigate } from "react-router";
import { MyStore } from "../context/store";


const Ventes = () => {
  const navigate = useNavigate()
  const {handleVendre,message, panier, increment, decrement, setPanier,errorStock} = useContext(MyStore)

  //bouton pour enregistrer les donnees dans la base de donnee et vider le panier
  const handleEnregistre =()=>{
    if(!errorStock){
       handleVendre()
       setPanier([])
      //  navigate('/produits')
    }else{ 
      console.log('err')
      return false
   
    }
    
  }

  const handleEnregistreAvecRecu =()=>{
    if(!errorStock){
      navigate('/vente-recu')
    }else{ 
      console.log('err')
      return false
   
    }
    
  }


  

  return (
    <main className="ventes">
      <header className="header-vente">
        <h1>Enregistrements des ventes</h1>
        <button className="btn-vendues" onClick={()=>navigate('/liste-ventes')}>Ventes effectuees</button>
      </header>
      <div className="vente-container">
        <div className="vente-infos">
          <table>
          <thead>
           <tr>
             <th>NOMS</th>
             <th>CATEGORIES</th>
             <th>PRIX D'ACHAT</th>
             <th>PRIX DE VENTE </th>            
             <th>QUANTITES</th>
             <th>SOMME</th>
           </tr>
          </thead>
          {panier.map((item)=>(<tbody key={item.id}>
             <tr>
                <th>{item.nom}</th>
                <th>{item.categories}</th>
                <th>{item.prixAchat} FCFA</th>
                <th>{item.prixVente} FCFA</th>
                <th>
                 <button className="btn-incre" onClick={()=>increment(item)}>+</button>
                  { item.qty} 
                 {item.qty > 1 && <button className="btn-decre" onClick={()=>decrement(item)}>-</button>}

                </th>
                <th className="qtys">{item.qty*item.prixVente} FCFA</th>
             </tr>
             <tr><th></th><th></th><th></th><th></th><th>{item.stocks < item.qty && <span>Stocks insuffisant</span>}</th><th></th></tr>
          </tbody>))}
          </table>
          <div className="btnsss">
          {panier.length > 0 && <button className="btn-vente" onClick={()=>handleEnregistre()}>Enregistrer sans recus</button>}
          {panier.length > 0 && <span>OU</span>}
          {panier.length > 0 && <button className="btn-vente-recu" onClick={()=>handleEnregistreAvecRecu()}>Enregistrer avec recus</button>}
          </div>
          <p className="messag">{message}</p>
        </div>
      </div>
    </main>
  );
};

export default Ventes;
