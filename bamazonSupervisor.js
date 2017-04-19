var mysql = require("mysql");
var inquirer = require("inquirer");
var consoletable = require('console.table');   // Adds console.table method for convenience

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazonDB"
});

connection.connect(function(err) {
    if (err) throw err;
});


/**
 * querySupervisor will ask the supervisor what they would like to do
 */
function querySupervisor()
{
    inquirer.prompt([
        {
            name: "choice",
            type: "rawlist",
            message: "What would you like to do?",
            choices: ["View Product Sales by Department", "Create New Department", "Quit"]
        }]).then(function(answer) {
        if(answer.choice === "View Product Sales by Department")
        {
            displayProductsales();
        }
        else if(answer.choice === "Create New Department")
        {
            createNewDept();
        }
        else
        {
            connection.end();
        }

    });
}

/**
 * displayProductsales will display the products sales by department
 */
function displayProductsales()
{

}

/**
 * createNewDept will allow supervisor to create a new department
 */
function createNewDept()
{

}

querySupervisor();