const db = require("../db/mysql_db");
const Produits = require("../models/produits");

//ajout de nouveau produits
exports.addProduits = async (req, res) => {
  try {
    const { nom, categories, prixAchat, prixVente, stocks, dateAchat } = req.body;
    const produits = new Produits( nom, categories, prixAchat, prixVente, stocks, dateAchat );

    const results = await new Promise((resolve, reject) =>{
    db.query(`INSERT INTO produits set ?`, [produits],(err,results)=>{
        if(err){
            reject(err)
        }else{
            resolve(results)
        }
    });
  })
    return res.status(201).json({message:'Produit a été ajouté avec succès !!'});
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getProduits = async (req, res) => {
  try {
    const results = await new Promise((resolve, reject) => {
      db.query(`SELECT * FROM produits ORDER BY dateAchat DESC`, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
    return res.status(200).json(results);
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOneProduit = async (req, res) => {
  try {
    const { id } = req.params;

    const results = await new Promise((resolve, reject) => {
      db.query(`SELECT*FROM produits WHERE id = ?`, [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
    return res.status(200).json(results);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updateProduit = async (req, res) => {
    const { id } = req.params;
    const { nom, categories, prixAchat, prixVente, stocks } = req.body;

    const sql = `UPDATE produits 
                SET nom = ?, categories = ?, prixAchat = ?, prixVente = ?, stocks = ? 
                WHERE id = ?`;

    const newValue = [ nom, categories, prixAchat, prixVente, stocks, id ];
  try {
    const results = await new Promise((resolve, reject) => {
      db.query(sql, newValue, (err, results) => {
        if (err) {
          console.error(err)
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
    return res.status(201).json({message:'Produit a été modifié avec succès !!'});
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updatField = async (req, res) => {
  try {
    const { stocks } = req.body;
    const { id } = req.params;

    const results = await new Promise((resolve,reject)=>{
    db.query(
      `UPDATE produits set stocks = ? WHERE id = ?`,[stocks,id],(err,results)=>{
        if(err){
            reject(err)
        }else{
            resolve(results)
        }
      });
    })
    return res.status(201).json(results);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteproduit = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await new Promise((resolve,reject)=>{
        db.query(`DELETE FROM produits WHERE id = ?`, [id],(err,results)=>{
            if(err){
                reject(err)
            }else{
                resolve(results)
            }
        })
    }) 
    return res.status(200).json({message:'Le produit a été supprimé avec succès !!'});
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
