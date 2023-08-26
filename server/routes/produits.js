const express = require('express')
const router = express.Router()
const produitControllers = require('../controllers/produits');

router.post('/',produitControllers.addProduits)
router.get('/',produitControllers.getProduits)
router.get('/:id',produitControllers.getOneProduit)
router.put('/update/:id',produitControllers.updateProduit)
router.put('/newStock/:id',produitControllers.updatField)
router.delete('/:id',produitControllers.deleteproduit)

module.exports = router