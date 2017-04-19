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


function queryManager()
{
    inquirer.prompt([
        {
            name: "choice",
            type: "rawlist",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"]
        }]).then(function(answer) {
            if(answer.choice === "View Products for Sale")
            {
                displayProducts();
            }
            else if(answer.choice === "View Low Inventory")
            {
                displayLowInventory();
            }
            else if(answer.choice === "Add to Inventory")
            {
                //addToInventory();
            }
            else if(answer.choice === "Add New Product")
            {
                //addNewProduct();
            }
            else
            {
                connection.end();
            }

    });
}

function displayProducts() {
    connection.query("SELECT * FROM `products`", function (err, res) {
        if (err) throw err;

        console.log("PRODUCTS INVENTORY\n==================");
        console.table(res);
        queryManager();
    });
}

function displayLowInventory()
{
    connection.query("SELECT * FROM `products` WHERE `stock_quantity` < 5", function (err, res) {
        if (err) throw err;

        console.log("\nLOW INVENTORY\n==================");
        if(res.length === 0)
        {
            console.log('All items have more than 5 in stock.\n')
        }
        else {
            console.table(res);
        }
        queryManager();
    });
}

queryManager();