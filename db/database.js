const mysql = require('mysql2');

//Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ilovedick69inmamouff$',
    database: 'employee'
});

db.connect(function(err) {
    if(err) {
        console.log('error connecting:' + err.stack);
        return;
    }
    console.log('connected as id ' + db.threadId);
})

module.exports = db;