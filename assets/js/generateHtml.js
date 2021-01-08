function generateHtml(data) {
    //stores the individual employees with their corresponding values
    let htmlString = [];
    //might not need this
    if (!data.storage) {
        data.storage = [];
    };
    //console.log(data);
    for (let i = 0; i < data.length; i++) {

        let employeeType = "";
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
        if(employeeRoleFinal === 'Engineer') {
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
        }
    };
    console.log(htmlString);
    return;
};

module.exports = {generateHtml};