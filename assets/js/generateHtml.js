async function generateHtml(data) {
    //stores the individual employees with their corresponding values
    let htmlString = [];
    //might not need this
    if (!data.storage) {
        data.storage = [];
    };
    //console.log(data);
    for (let i = 0; i < data.length; i++) {

        //get role
        const employeeRole = data.map(data => data.title);
        const employeeRoleFinal = employeeRole[i];
        //get first name
        const employeeFirstName = data.map(data => data.first_name);
        const employeeFirstNameFinal = employeeFirstName[i];
        //get last name
        const employeeLastName = data.map(data => data.last_name);
        const employeeLastNameFinal = employeeLastName[i];
        //get manager
        const manager = data.map(data => data.manager);
        const managerFinal = manager[i];
        //get salary
        const salary = data.map(data => data.salary);
        const salaryFinal = salary[i];
        //get department
        const department = data.map(data => data.department);
        const departmentFinal = department[i];
        //create the html based on the created person above
            htmlString[i] = `
            <div class="card text-dark bg-info m-3" style="width: 18rem; height: 14rem;">
                <div class="card-header">${employeeFirstNameFinal} ${employeeLastNameFinal}</div>
                <div class="card-body">
                    <h5 class="card-title">${employeeRoleFinal}</h5>
                    <p class="card-text">Reporting Manager:${managerFinal}</p>
                    <p class="card-text">Salary: $${salaryFinal}</p>
                    <p class="card-text">Department:${departmentFinal}</p>
                </div>
            </div>`;
        
    };
    const string = `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Employee Card Generator</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
            <link href="./style.css" rel="stylesheet">
        </head>
        <body>
            <header class="bg-success d-flex justify-content-center align-items-center flex-wrap">
                <h1 class="text-white">My Team!</h1>
            </header>
            <section class="d-flex justify-content-center align-items-start flex-wrap">
                ${htmlString.join('')}
            </section>
        </body>
    </html>`;
    console.log('string is: '+ string);
    return string;
};

module.exports = {generateHtml};