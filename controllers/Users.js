const { Router } = require('express')
const router = Router()
const pool = require('../db/db.js')

// router.get('/', (req, res) => {
//     res.send('yeah this route works')
// })

router.get('/', (req, res) => {
    pool.query("SELECT * FROM users", (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    })
})

module.exports = router