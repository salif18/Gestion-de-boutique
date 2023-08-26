import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const Statstistiques = ({data, columns}) => {

    // Créer un format de date avec le nom du mois
  const dateFormatter = new Intl.DateTimeFormat('fr-FR', { month: 'long' });

  // Formater les données pour afficher le nom du mois
  const formattedData = data.map((row) => ({
    ...row,
    mois: dateFormatter.format(new Date(row.annee, row.mois - 1, 1)),
  }));
   
    return (
        <div className='stats'>
            <h1>Etude detaillee</h1>
            <div style={{ height: 300, width: 400 }}>
            <DataGrid  columns={columns} pageSize={10} rows={formattedData} getRowId={(row) => row.annee.toString() + row.mois.toString()} />
          </div>
    
        </div>
    );
}

export default Statstistiques;
