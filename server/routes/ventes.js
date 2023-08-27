const express = require('express')
const router = express.Router()
const ventesControllers = require('../controllers/ventes');

router.post('/',ventesControllers.createVente)
router.get('/',ventesControllers.getVentes)
router.get('/statistique',ventesControllers.statsVentes)
router.get('/most_sold',ventesControllers.PlusVendus)
router.delete('/:id',ventesControllers.deleteVente)

module.exports = router