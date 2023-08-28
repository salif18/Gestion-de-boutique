const db = require('../db/mysql_db');

class Ventes{
    constructor(id,nom,categories,prixAchat,prixVente,stocks,qty,timestamps){
        this.id =id;
        this.nom = nom;
        this.categories = categories;
        this.prixAchat = prixAchat;
        this.prixVente = prixVente;
        this.stocks = stocks;
        this.qty = qty ;
        this.timestamps=timestamps
      
    }
}   

module.exports = Ventes 

// `CREATE TABLE vente(
//     id INT,
//     nom VARCHAR(255),
//     categories VARCHAR(255),
//     prixAchat DECIMAL(10,2),
//     prixVente DECIMAL(10,2),
//     stocks INT,
//     qty INT,
//     dateVente DATE,
//     contacts INT,
//     dateAchat DATE,
//     fournisseur VARCHAR(255)
// );`
