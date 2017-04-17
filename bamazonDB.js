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


connection.query("SELECT * FROM `products`", function(err, res) {
    if(err) throw err;

    console.log("\n BAMAZON ITEMS FOR SALE");
    console.log(" ======================");

    console.table(res);
});

connection.end();
