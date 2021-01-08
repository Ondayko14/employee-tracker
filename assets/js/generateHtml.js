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
            <div class ="" > </div>
            `
        }
    };
    console.log(data);
    return;
};

module.exports = {generateHtml};