## DBMS Project
### Sports Inventory Management API, Webservice

Given repository contains project source code.

## About
The core of the project is a general API ([see API documentation](###API-DOCUMENTATION)), created using Node.js and Express. MySql database is used to store data on server. The main service is hosted on --.

## Database design
The database is stored in a MySQL server. The following descirbed database schema.
i. People
  Name ... Fill in


## API Documentation

API can be accessed from `https://host.com/api`. Data is sent and received in JSON format.

Fill this in. I tried, but I have no idea. Can be generous here, simple to add queries. I'll create the API and the SQL queries then.

1. Users
id pk
username
password
phone
email
priviledge_level

2. Goods
Id
Name
Sport Name
Quantity total
Quantity available  -- count of other table, if we can do

3. Orders
Id
Goods.id  -- Foreign key, assure relational integrity
Quantity
Suplier Name
price/unit
Total cost
Date

4. Damaged Goods Fine
Id
User.id
Goods.id
Quantity damaged  -- subtract from tot, when creating
Fine/unit
Total Fine
Payment status

5. Goods Issued
Id
User.id
Goods.id
Quantity
Date borrowed
Return date
Status

6. Goods requested
Id
Goods.id
User.id
Quantity
Status
