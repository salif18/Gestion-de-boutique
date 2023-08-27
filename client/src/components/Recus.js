import React,{useContext} from "react";
import {MyStore} from '../context/store'
import PrintIcon from '@mui/icons-material/Print';
import { useNavigate } from "react-router";
const Recus =()=>{
    const navigate = useNavigate()
const {panier,handleVendre,setPanier} = useContext(MyStore)

    const imprimer =()=>{
        window.print()
            handleVendre()
            setPanier([])
            navigate('/produits')
    };

    return (
        <div className='recus'>
            <header>
               <h1>Recus</h1>
            </header>
            
            {panier.map((item)=>(
                <div className='container-recu' key={item.id} >
             <div className='nom-prod'>
             <p>NOM:</p> <span>{item.nom}</span>
             </div>
             <div className='nom-prod'>
             <p>CATEGOIE:</p><span>{item.categories}</span>
             </div>
             <div className='nom-prod'>
             <p>PRIX UNITAIRE:</p> <span>{item.prixVente} FCFA</span>
             </div>
             <div className='nom-prod'>
             <p>QUANTITES:</p><span>{item.qty}</span>
             </div>
             <div className='nom-prod'>
             <p>TOTAL:</p><span>{item.qty*item.prixvente} FCFA</span>
             </div>
            </div>))}
            <div className="bt">
            <button className='btn-imp' onClick={()=>imprimer()}><PrintIcon/> Imprimer</button>
            </div>
        </div>
    );
}

export default Recus;
