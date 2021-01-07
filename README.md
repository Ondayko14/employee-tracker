# employee-tracker
## Description
This is a NODE.js Application that allows you to create, update, and Delete employees in a sql database.

## Video
https://drive.google.com/file/d/1B_vJBkQy_GN9AC0G1M5o6LnxJYwrDNWc/view

## How To Use 
If you do not have mysql installed, please be sure to go the mysql website, download and install.

First run an npm init.
Then run the schema.sql and seeds.sql files.

You can run these files be either inserting your own mysql root password into the package.json scripts. right after the -p in the migrate & seed section. ex("migrate": "mysql -u root -p"PasswordHere" < schema.sql",
            "seed": "mysql -u root -p"PasswordHere" employee < seeds.sql",)
Or by dragging the files into your SQL workbench and running them.

Start the application with npm start. Or node index.js Then answer the questions that you are givin. Feel free to  look thru the updates as you make adjustments.

## ScreenShots 
![Image of the server response and questions](./assets/imgs/InquirerScreenshot.png)
       
## Licenses
MIT

## Technology
Javascript
NODE.js
MYSQL
MYSQL2
Inquirer
