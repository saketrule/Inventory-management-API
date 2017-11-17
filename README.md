## DBMS Project
### Sports Inventory Management API, Webservice

Given repository contains project source code.

## About
The core of the project is a general API ([see API documentation](###API-DOCUMENTATION)), created using Node.js and Express. MySql database is used to store data on server. The main service is hosted on --.

## Database design
The database is stored in a MySQL server. The following descirbed database schema.
1. Users
* id pk
* username
* password
* phone
* email
* priviledge_level

2. Goods
* Id
* Name
* Sport Name
* Quantity total
* Quantity available

3. Orders
* Id
* Goods.id  
* Quantity
* Supplier Name
* Price/unit
* Total cost
* Date

4. Damaged Goods Fine
* Id
* User.id
* Goods.id
* Quantity damaged 
* Fine/unit
* Total Fine
* Payment status

5. Goods Issued
* Id
* User.id
* Goods.id
* Quantity
* Date borrowed
* Return date
* Status

6. Goods requested
* Id
* Goods.id
* User.id
* Quantity
* Status

![alt text](https://github.com/VinithKrishnan/Inventory-management-API/blob/master/Document%201.png)



## API Documentation

API can be accessed from `https://host.com/api`. Data is sent and received in JSON format.



# Paths
1.Users
* /users/login
* /users/search
* /users/update

2.Goods
* /goods/search
* /goods/update

3.Orders
* /orders/search
* /orders/update

4.Damaged Good Fine
* /damaged_goods/search
* /damaged_goods/update

5.Goods Issued
* /goods_issued/search
* /goods_issued/update

6.Goods Requested
* /goods_requested/search
* /goods_requested/update


