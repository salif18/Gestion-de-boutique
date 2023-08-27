import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const StatGraphique = ({ data }) => {

  const chartData = data.map((row) => ({
    label: `${row.annee}-${row.mois}`,
    nombreVentes: row.nombre_ventes,
    totalVentes: row.total_ventes,
  }));

  return (
    <div className='stats'>
      <h1>Interprétation graphique</h1>
      <div style={{ height: 300, width: 500 }}>
        <LineChart
          width={500}
          height={300}
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='5 5'  />
          <XAxis dataKey='label'  />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='nombreVentes' name='Nombre de Ventes' stroke='blue' />
          <Line  type='monotone' dataKey='totalVentes' name='Total des Ventes' stroke='green' />
        </LineChart>
      </div>
    </div>
  );
};

export default StatGraphique;