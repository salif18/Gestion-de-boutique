import React, { useEffect,useState } from 'react';
import Cout from '../components/Cout';
import Achats from '../components/Achats';
import Ventes from '../components/Ventes';
import Revenues from '../components/Revenues';
import Statstistiques from '../components/Statstistiques';
import Depenses from '../components/Depenses';
import axios from 'axios';
import StatGraphique from '../components/StatGraphique';
import CoutProduct from '../components/CoutProduct';
import Tendance from '../components/Tendance';
import EtatStocks from '../components/EtatStocks';



const Home = () => {

    const [statsVentes ,setStatsVentes ] = useState([])
    
    
    useEffect(() => {
        async function fetchSalesStatistics() {
          try {
            const response = await axios.get('http://localhost:3004/ventes/statistique');
            setStatsVentes(response.data);
          } catch (error) {
            console.error('Error fetching sales statistics:', error);
          }
        }
    
        fetchSalesStatistics();
      }, []);
    
      
      const columns = [
        { field: 'annee', headerName: 'Année', flex: 1 },
        { field: 'mois', headerName: 'Mois', flex: 1 },
        { field: 'nombre_ventes', headerName: 'Nombre de ventes', flex: 1 },
        { field: 'total_ventes', headerName: 'Total des ventes', flex: 1 },
      ]

      
    return (
        <main className='home'>
            <header className='header-home'>
              <h1>TABLEAU DE RESUME</h1>
            </header>
            <div className='home-container-d'>
             <Tendance/>
             <EtatStocks/>
           </div>
            <div className='home-container-a'>
             <Achats/>
            <CoutProduct/>
            <Ventes/>
           
            </div>
            <div className='home-container-b'>
            <Cout/>
             <Depenses/>
             <Revenues/>
            </div>
            <div className='home-container-c'>
            <Statstistiques data={statsVentes}  columns={columns} />
            <StatGraphique data={statsVentes} />
            </div>
            <div>
            
            </div>
        </main>
    );
}

export default Home;
