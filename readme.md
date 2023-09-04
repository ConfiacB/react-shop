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

Get your MongoDB URI after creating the MongoDB database <br />
Get your Client Id and App secret with your PayPal account <br />
Change JWT_SECRET and PAGINATION_LIMIT to what you want (i.e. abc123 and 8) <br />

```
NODE_ENV=development
PORT=5000
MONGO_URI=ADD_YOUR_MONGO_URI
JWT_SECRET=YOUR_SECRET
PAYPAL_CLIENT_ID=YOUR_PAYPAL_CLIENT_ID
PAYPAL_APP_SECRET=YOUR_PAYPAL_APP_SECRET
PAYPAL_API_URL=https://api-m.sandbox.paypal.com
PAGINATION_LIMIT=8
```

## Dependencies :

```
npm install
cd frontend
npm install
```

## Run :

run frontend and backend <br />
`npm run dev`

run backend only <br />
`npm run server`

## Build :

To create frontend production build and install dependencies <br />
In root folder `npm run build`

## Seed Database :

import data <br />
`npm run data:import`

destroy data <br />
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
