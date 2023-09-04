# TechShop

It is a MERN (MongoDB, ExpressJS, ReactJS, NodeJS) stack ecommerce platform with PayPal, Redux Toolkit and credit/debit payment.

## Features :

- shopping cart
- products reviews, ratings, carousel, pagination, search
- user profile
- admin products, users, orders management
- checkout process
- PayPal / credit card
- Database seeder

## Env variable :

Rename example.env to .env

Get your MongoDB URI after creating the MongoDB database
Get your Client Id and App secret with your PayPal account
Change JWT_SECRET to what you want (like abc123)

## Dependencies :

```
npm install
cd frontend
npm install
```

##Run :

run frontend and backend
`npm run dev`
run backend only
`npm run server`

## Build :

To create frontend production build and install
Go to root folder and write this script
`npm run build`

## Seed Database :

import data
`npm run data:import`

destroy data
`npm run data:destroy`

## Sample user :

```
admin@email.com
123456

john@email.com
123456

jane@email.com
123456
```
