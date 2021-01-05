const mysql = require('mysql');

//Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
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
});

module.exports = db;