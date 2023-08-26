const mysql = require('mysql')
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'gestionnaire'
}) 
db.connect((err)=>{
    if(err){
        console.log('echec')
        console.error(err)
    }else{
        console.log('connecter a la base de donnee')
    }
})

module.exports = db