const fs = require('fs');
const {resolve} = require('path');

const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./public/index.html', fileContent, err => {
            if(err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'Employees Printed!'
            });
        });
    });
}

module.exports = {writeFile};