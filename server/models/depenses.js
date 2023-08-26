const db = require('../db/mysql_db')

class Depenses{
    constructor(montants,motifs){
        this.montants = montants;
        this.motifs = motifs
    }
}

module.exports = Depenses