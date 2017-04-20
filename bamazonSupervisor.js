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
    connection.query("SELECT `department_id` as `Department ID`, `department_name` as `Department Name`, `over_head_costs` as `Overhead Costs`, `total_sales` as `Product Sales`, (total_sales - over_head_costs) as `Total Profit` FROM `departments`", function (err, res) {
        if (err) throw err;

        console.log("\nPRODUCT SALES BY DEPARTMENT\n===========================");
        console.table(res);
        querySupervisor();
    });
}

/**
 * createNewDept will allow supervisor to create a new department
 */
function createNewDept()
{
    inquirer.prompt([
        {
            name: "deptName",
            type: "input",
            message: "Enter department name: "
        },
        {
            name: "overhead",
            type: "input",
            message: "Enter department overhead costs: ",
            validate: function(value){
                var regex  = /^\d+(?:\.\d{0,2})$/;
                if (regex.test(value)){
                    return true;
                }
                return false;
            }
        }
    ]).then(function(answer) {
        connection.query("INSERT INTO departments SET ?", {
            department_name: answer.deptName,
            over_head_costs: answer.overhead
        }, function(err, res) {
            if (err)
                throw err;
            console.log("Department was added successfully.\n");
            querySupervisor();
        });
    });
}

querySupervisor();