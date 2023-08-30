const db = require("../db/mysql_db");
const Ventes = require("../models/ventes");

exports.createVente = (req, res) => {
  const { id, nom, categories, prixAchat, prixVente, stocks, qty, timestamps} = req.body;
  const ventes = new Ventes( id, nom, categories, prixAchat, prixVente, stocks, qty, timestamps);

  const sql = 'INSERT INTO vente set ?';
  db.query(sql,[ventes],(err,results)=>{
    if(err){
        res.status(500).json({err})
        console.log(err)
    }else{
        res.status(200).json({message:'Vente effectuée avec succès !!'})
    }
  })
};

exports.getVentes = (req,res) =>{
    const sql = 'SELECT * FROM vente';
    db.query(sql,(err,results)=>{
        if(err){
            res.status(500).json({err})
        }else{
            res.status(200).json(results)
        }
    })
}

exports.deleteVente = (req,res) => {
  const {id} = req.params
  const sql =`DELETE FROM vente WHERE id = ?`
  db.query(sql,[id] ,(err)=>{
     if(err){
      res.status(500).json({err})
     }else{
      res.status(200).json({message:'La vente a été annulée avec succès !!'})
     }
  })
}


exports.statsVentes = async (req, res) => {
  try {
    const sql =`
      SELECT
        YEAR(timestamps) AS annee,
        MONTH(timestamps) AS mois,
        COUNT(*) AS nombre_ventes,
        SUM(prixVente * qty) AS total_ventes
        FROM vente
        GROUP BY annee, mois
        ORDER BY annee, mois;
    `;
    
    const results = await new Promise((resolve,reject)=>{
        db.query(sql,(err,results)=>{
          if(err){
            reject(err)
          }else{
            resolve(results)
          }
        })
    })
    return res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des statistiques de vente.' });
  }
}


exports.PlusVendus = async(req,res) => {
  const sql = `SELECT nom,categories, 
                   SUM(qty) as total_vendu 
                   FROM vente 
                   GROUP BY nom ,categories
                   ORDER BY total_vendu DESC  `
  try{
    const results = await new Promise((resolve,reject) => {
      db.query(sql,(err,results)=>{
        if(err){
          reject(err)
        }else{
          resolve(results)
        }
      })
    })
    return res.status(200).json(results)
  }catch(err){
    return res.status(500).json({error:err.message})
  }
}
