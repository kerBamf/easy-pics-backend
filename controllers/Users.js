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
        res.status(200).json(data.rows);
    } catch(err) {
        console.log(err)
        res.status(404).send("Oopsy, can't find that")
    }
})

//Create New User
router.post('/', async (req, res, next) => {
    try {
       let { firstname, lastname, birthday, address, phonenumber, blurb } = req.body;
       await pool.query("INSERT INTO persons (firstname, lastname, birthday, address, phonenumber, blurb) VALUES ($1, $2, $3, $4, $5, $6);", [firstname, lastname,  birthday, address, phonenumber, blurb]);
       res.status(401).send("You made a new person!")
    } catch(err) {
        console.log(err)
        res.status(400).send("That didn't work...")
    }
})

//Edit User
router.put('/:id', async (req, res, next) => {
    try {
        let { firstname, lastname, birthday, address, phonenumber, blurb } = req.body;
        const id = req.params.id
        await pool.query("UPDATE persons SET firstname = $1, lastname = $2, birthday = $3, address = $4, phonenumber = $5, blurb = $6 WHERE id = $7", [firstname, lastname, birthday, address, phonenumber, blurb, id]);
        res.status(201).send("You edited that person!")
    } catch(err) {
        console.log(err)
        res.status(400).send("That didn't work...")
    }
})

//Delete User
router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        await pool.query("DELETE FROM persons WHERE id = $1", [id]);
        res.status(201).send("You successfully deleted that person!")
    } catch(err) {
        console.log(err)
        res.status(400).send("That didn't work...")
    }
})

module.exports = router