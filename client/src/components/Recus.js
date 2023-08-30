import React, { useContext } from "react";
import { MyStore } from "../context/store";
import PrintIcon from "@mui/icons-material/Print";
import { useNavigate } from "react-router";
const Recus = () => {
  const navigate = useNavigate();
  const { panier, handleVendre, setPanier,errorStock } = useContext(MyStore);

  const imprimer = () => {
    window.print();
    handleVendre();
    setPanier([]);
    navigate("/produits");
  };

//   bouton pour enregistrer les donnees dans la base de donnee et vider le panier
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

  //calcule somme total
  const calTotal =()=>{
    const prix = panier.map((x) => x.prixVente*x.qty)
    const sum = prix.reduce((a,b) => parseInt(a) + parseInt(b),0)
    return sum
  }
  const total = calTotal();

  //date
  const d = new Date()
  const year = d.getFullYear()
  const month = d.getMonth()+1
  const day = d.getDate()
  const H = d.getHours()
  const min = d.getMinutes()
  const date = `${day}/${month}/${year} - ${H}h:${min}min`
 
  return (
    <div className="recus">
      <header>
        <h1>Recus</h1>
      </header>
       <div className="entete"><h1>DATE</h1><span>{date}</span></div>
       <div className="entete"><h1>BOUTIQUE</h1><span>FOOZO Cosmetics</span></div>
       <div className="entete"><h1>NUMERO VENDEUR</h1><span></span></div>
      <table className="container-recu">
        <thead>
          <tr className="ligne-recu">
            <th>PRODUITS</th>
            <th>CATEGORIES</th>
            <th>PRIX UNITAIR</th>
            <th>QUANTITES</th>
            <th>SOMME</th>
          </tr>
        </thead>
        <tbody>
          {panier.map((item)=>(
            <tr className="ligne2-recu">
            <th>{item.nom}</th>
            <th>{item.categories}</th>
            <th>{item.prixVente}</th>
            <th>{item.qty}</th>
            <th>{item.qty*item.prixVente}</th>
          </tr>))}
        </tbody>
        <tfoot></tfoot>
      </table>

      <div className="footer-recu">
          <div className="to"><p>SOMME TOTAL:</p><span>{total} FCFA</span></div>
      </div>

      <div className="bt">
        <button className="btn-imp" onClick={() => imprimer()}>
          <PrintIcon /> Sauvegarde PDF
        </button>
        <span>OU</span>
        <button className="btn-vente" onClick={()=>handleEnregistre()}>Enregistrer sans PDF</button>
        
      </div>
    </div>
  );
};

export default Recus;
