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
 * queryManager will ask the user what they would like to do.
 */
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
                addToInventory();
            }
            else if(answer.choice === "Add New Product")
            {
                addNewProduct();
            }
            else
            {
                connection.end();
            }

    });
}

/**
 * displayProducts will display all the items in the products table
 */
function displayProducts() {
    connection.query("SELECT `item_id` as `Item ID`, `product_name` as `Product`, `department_name` as `Department`, `price` as `Price`, `stock_quantity` as `Inventory` FROM `products`", function (err, res) {
        if (err) throw err;

        console.log("PRODUCTS INVENTORY\n==================");
        console.table(res);
        queryManager();
    });
}

/**
 * displayLowInventory will display all items with a quantity less than 5.
 */
function displayLowInventory()
{
    connection.query("SELECT `item_id` as `Item ID`, `product_name` as `Product`, `department_name` as `Department`, `price` as `Price`, `stock_quantity` as `Inventory` FROM `products` WHERE `stock_quantity` < 5", function (err, res) {
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


/**
 * addToInventory will allow the user to update the stock quantity of an item
 */
function addToInventory()
{
    inquirer.prompt([
        {
            name: "itemId",
            type: "input",
            message: "Enter Item ID to update inventory: ",
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
            message: "Enter new stock quantity: ",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }]).then(function(answer) {
            // update inventory
            connection.query("UPDATE products SET ? WHERE ?",
                [{
                    stock_quantity: answer.quantity
                },
                {
                    item_id: answer.itemId
                }],
                function(err, res) {
                    if (err)
                        throw err;
                    console.log("Update Successfull.\n");
                    queryManager();
                });
        });
}

/**
 * addNewProduct will allow the user to add new products to the products table
 */
function addNewProduct()
{
    inquirer.prompt([
        {
            name: "itemName",
            type: "input",
            message: "Enter product description: "
        },
        {
            name: "deptName",
            type: "input",
            message: "Enter department for this product: "
        },
        {
            name: "price",
            type: "input",
            message: "Price per unit: ",
              validate: function(value){
                  var regex  = /^\d+(?:\.\d{0,2})$/;
                  if (regex.test(value)){
                      return true;
                  }
                  return false;
              }
        },
        {
            name: "quantity",
            type: "input",
            message: "Inventory quantity: ",
            validate: function(value) {
                if(isNaN(value) === false) {
                    return true;
                }
                return false;
            }

        }
        ]).then(function(answer) {
            connection.query("INSERT INTO products SET ?", {
                product_name: answer.itemName,
                department_name: answer.deptName,
                price: answer.price,
                stock_quantity: answer.quantity
            }, function(err, res) {
                if (err)
                    throw err;
                console.log("Product added successfully.\n");
                queryManager();
            });
    });

}


queryManager();