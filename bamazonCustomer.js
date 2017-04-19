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
 * displayItems will display the items for sale
 */
function displayItems() {80
    connection.query("SELECT `item_id` as `Item ID`, `product_name` as `Product`, `price` as `Price` FROM `products`", function (err, res) {
        if (err) throw err;

        console.log("\n BAMAZON ITEMS FOR SALE");
        console.log(" ======================\n");

        console.table(res);
        // prompt customer
        inquirer.prompt([
        {
            name: "choice",
            type: "rawlist",
            message: "What would you like to do?",
            choices: ["Purchase an Item", "Redisplay Items" ,"Quit"]
        }]).then(function(answer) {
            if(answer.choice === "Purchase an Item")
            {
                queryCustomer();
            }
            else if(answer.choice === "Redisplay Items")
            {
                displayItems();
            }
            else{
                connection.end();
            }
        })


    });
}

/**
 * queryCustomer will ask the customer what they want to do
 */
function queryCustomer()
{
    inquirer.prompt([
    {
        name: "item",
        type: "input",
        message: "What is the item ID you would like to purchase?",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    },
    {
        name: "quantity",
        type: "input",
        message: "How many units would you like to purchase?",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }]).then(function(answer) {
        processOrder(answer.item, answer.quantity);
    });
}


/**
 * processOrder will process the order placed by the customer
 *
 * @param itemId
 * @param quantityOrdered
 */
function processOrder(itemId, quantityOrdered)
{
    connection.query("SELECT * FROM `products` WHERE ?",{item_id: itemId}, function (err, res)
    {
        if (err) throw err;

        if(quantityOrdered < res[0].stock_quantity)
        {
            var dept = res[0].department_name;
            var newQuantity = res[0].stock_quantity - quantityOrdered;
            var totalprice = quantityOrdered * res[0].price;
            var totalsales = res[0].product_sales + totalprice;
            connection.query("UPDATE products SET ?, ? WHERE ?",
                [{
                    stock_quantity: newQuantity
                 },
                 {
                    product_sales: totalsales
                 },
                 {
                    item_id: itemId
                 }],
                function(err, res) {
                    if (err)
                        throw err;
            });

            connection.query("SELECT * FROM `departments` WHERE ?", {department_name: dept},
                function (err, res2) {
                    if (err)
                        throw err;

                var deptsales = res2[0].total_sales;
                deptsales += totalprice;
                    console.log("deptsales = ", deptsales);
                connection.query("UPDATE `departments` SET ? WHERE ?",
                    [{
                        total_sales: deptsales
                     },
                     {
                        department_name: dept
                     }],
                    function (err, res3)
                    {
                        if (err)
                            throw err;
                        console.log("Purchase Successfull.  Your total order is $" + totalprice + "\n");
                        askAgain();
                });
            });
        }
        else
        {
            console.log("Purchase Unsuccessful.  Insufficient quantity.\n");
            askAgain();
        }
    });
}


/**
 * askAgain will ask the customer if they want to place another order
 */
function askAgain()
{
    inquirer.prompt([
        {
            name: "question",
            type: "input",
            message: "Would you like to place another order? Y/N: "
        }]).then(function(answer) {
        if(answer.question.toUpperCase().valueOf() === "Y")
        {
            displayItems();
        }
        else
        {
            connection.end();
        }
    });
}

displayItems();
//connection.end();
