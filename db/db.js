const Pool = require('pg').Pool;

const pool = new Pool ({
    user: "zachpedigo",
    host: "localhost",
    database: "easyPicsDB",
    port: 5432,
});

module.exports = pool;