const db = require("../db/mysql_db");

class Produits {
  constructor(
    nom,
    categories,
    prixAchat,
    prixVente,
    stocks,
    dateAchat
  ) {
    this.nom = nom;
    this.categories = categories;
    this.prixAchat = prixAchat;
    this.prixVente = prixVente;
    this.stocks = stocks;
    this.dateAchat = dateAchat;
  }
}

module.exports = Produits;

// CREATE TABLE produits (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     nom VARCHAR(255) NOT NULL,
//     categories VARCHAR(255),
//     prixAchat DECIMAL(10, 2),
//     prixVente DECIMAL(10, 2),
//     date DATE
// )
