const db = require('../db/mysql_db');
const Depenses = require('../models/depenses')

exports.addDepenses = async(req,res)=> {
    const {montants, motifs} = req.body;
    const depenses = new Depenses(montants, motifs)
    try{
      const results = await new Promise((resolve,reject)=>{
        db.query(`INSERT INTO depenses set ?`,depenses,(err,results)=>{
            if(err){
                reject(err)
            }else{
                resolve(results)
            }
        })
      });
      
      return res.status(201).json(results)
    }catch(err){
        console.log(err)
        return res.status(500).json({error:err.message})
    }
}

exports.getDepenses = async(req,res)=> {
    try{
      const results = await new Promise((resolve,reject)=>{
        db.query('SELECT*FROM depenses ',(err,results)=>{
            if(err){
                reject(err)
            }else{
                resolve(results)
            }
        })
      });
      return res.status(200).json(results)
    }catch(err){
        return res.status(500).json({error:err.message})
    }
}

exports.deleteDepenses = async(req,res)=> {
    const {id} = req.params;
    try{
      const results = await new Promise((resolve,reject)=>{
        db.query('DELETE FROM depenses WHERE id = ?',[id],(err,results)=>{
            if(err){
                reject(err)
            }else{
                resolve(results)
            }
        })
      });
      return res.status(200).json(results)
    }catch(err){
        return res.status(500).json({error:err.message})
    }
}