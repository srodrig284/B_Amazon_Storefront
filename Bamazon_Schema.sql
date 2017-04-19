CREATE database `bamazonDB`;

USE `bamazonDB`;

CREATE TABLE `products` (
  `item_id` INT NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(100) NOT NULL,
  `department_name` VARCHAR(100) NOT NULL,
  `price` DECIMAL(10,2) DEFAULT 0,
  `stock_quantity` INT DEFAULT 0,
  PRIMARY KEY (`item_id`)
);

INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ("UE Boom 2", "Electronics & Computers", 149.99, 100);

INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ("Acer Aspire E 15 Laptop", "Electronics & Computers", 359.99, 100);

INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ("Levi's Women 529 Curvy Jeans", "Clothing, Shoes & Jewelry", 32.99, 100);

INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ("Levi's Women's Workwear Dress", "Clothing, Shoes & Jewelry", 37.45, 100);

INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ("Hot Tools Curling Iron", "Beauty, Health & Food", 31.99, 100);

INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ("T2 Keratin Flat Iron", "Beauty, Health & Food", 125.99, 100);

INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ("Black & Decker Rice Cooker", "Home, Garden and Tools", 17.89, 100);

INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ("Oneida Mooncrest 45-Piece Flatware Set, Service for 8", "Home, Garden and Tools", 52.99, 100);

INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ("Ashley Massaro Signed WWE 8x10 Photo COA 2007 Playboy Magazine Picture", "Collectibles & Fine Art", 54.99, 100);

INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`)
VALUES ("OxGord Pet Bed with Cozy Inner Cushion - 24 Inch", "Pet Supplies", 15.99, 100);