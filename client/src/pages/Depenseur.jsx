import React, { useContext, useState } from 'react';
import { MyStore } from '../context/store';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';


const Depenseur = () => {
  const {opperations , sendDepensesToDataBase} = useContext(MyStore)
  const [dateValue, setDateValue] = useState('');

  //etat initial des champs formulaire
  const [depenses,setDepenses] = useState({ montants:'', motifs:''})

  //etat de stockage d'erreur
  const [error , setError] = useState('');

  //valeurs de la selections
  const options = [
    {values:'Depenses-personnelles',label:'DEPENSES-PERSONNELLES'},
    {values:'Payement-location',label:'PAYEMENT-LOCATION'},
    {values:"Payement-Electricite",label:"PAYEMENT-ELECTRICITE"}
  ];
   
  //change letat
    const handleChange=(e)=>{
      const {name,value} = e.target;
      setDepenses({...depenses,[name]:value})
    };

    //envoyer la depense
    const handleSend =(e)=>{
      e.preventDefault();
      if(depenses.montants.length <= 0 || depenses.motifs.length <= 0){
       setError('Veuiller ajouter les valeurs')
      }else{
        sendDepensesToDataBase(depenses)
        setDepenses({ montants:'', motifs:''})
      }
    };
    
    //supprimer la depense
    const handleDelete =(id)=>{
         axios.delete(`http://localhost:3004/depenses/${id}`)
         .then((res) => res.data)
         .catch((err) => console.log(err))
    };

    //calcule de la somme du depense journaliere
    const calcul =()=>{
      const filterDepense = opperations?.filter((x) => x.timestamps.includes(dateValue))
      const prix  = filterDepense.map((a) => a.montants );
      const sum = prix.reduce((a,b) => a + b,0)
      return sum
    }
    const sommeDujour = calcul()

    //filtrage par date
    const opperationFilter = opperations.filter((x) => x.timestamps.includes(dateValue))

    return (
        <main className='depenseurs'>
            <header className='header-fournisseurs'>
              <h1>Enregistrer vos depenses</h1>
            </header>
            <div className='contacts-zone'>
            <form>
            <div className='left-zone'>
             <div className='con'>
             <label>MONTANTS</label>
             <input type='number' name='montants' value={depenses.montants} onChange={(e)=>handleChange(e)} placeholder='Montant...'/>
             { depenses.montants.length <= 0 && <span>{error}</span>}
             </div>
             <div className='con'>
             <label>MOTIFS</label>
             <select type='text' name='motifs' value={depenses.motifs} onChange={(e)=>handleChange(e)} >
            <option >Selectionner--une--motif</option>
            {options.map((item) =>(
                <option key={item.values} value={item.values}>{item.label}</option>
            ))}
            </select>
            {depenses.motifs.length <=0 && <span>{error}</span>}
             </div>
             <button className='btn-contact'  onClick={(e)=>handleSend(e)}>Enregistrer</button>
            </div>
            </form>

            <div className='rigth-zone'>
            <div className='filtre'>
            <label>Depenses du </label>
            <input type='date' value={dateValue} onChange={(e)=>setDateValue(e.target.value)} />
            <div className='donto'>
            <h3>Total</h3>
             <span>{sommeDujour} FCFA</span>
             </div>
            </div>
            {opperationFilter.length <=0 && <span className='aucun'>Aucunes depenses</span>}
            { opperationFilter.map((item)=>(
              <div className='card-contact' key={item.id}>
             <div className='rig'>
             <h3>MONTANTS</h3>
               <p>{item.montants} FCFA</p>
             </div>
             <div className='rig'>
             <h3>MOTIFS</h3>
             <p>{item.motifs}</p>
             </div> 
             <div className='rig'>
             <h3>DATE</h3>
             <p>{item.timestamps}</p>
             </div> 
             <span className='btn-depense' onClick={()=>handleDelete(item.id)}><DeleteIcon className='i' /></span>
             </div>
             ))}
            </div>
            </div>
        </main>
    );
}

export default Depenseur;
