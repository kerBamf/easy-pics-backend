const { Router } = require('express')
const router = Router()
const pool = require('../db/db.js')

// router.get('/', (req, res) => {
//     res.send('yeah this route works')
// })

// router.get('/', (req, res) => {
//     pool.query("SELECT * FROM users", (error, results) => {
//         if (error) throw error;
//         res.status(200).json(results.rows)
//     })
// })

//Get all users
router.get('/', async (req, res, next) => {
    try{
        data = await pool.query("SELECT * FROM persons")
        res.status(200).json(data.rows)
    } catch(err) {
        console.log(err)
        next()
    }
})

//Get User By ID
router.get('/:id', async (req, res, next) => {
    try {
        id = parseInt(req.params.id)
        data = await pool.query("SELECT * FROM persons WHERE id = $1", [id]);
        res.status(200).json(data);
    } catch(err) {
        console.log(err)
        res.status(404).send("Oopsy, can't find that")
    }
})

//Create New User
router.post('/', async (req, res, next) => {
    try {
        data = JSON(req.body)
    } catch(err) {
        console.log(err)
        res.status(400).send("That didn't work...")
    }
})

module.exports = router