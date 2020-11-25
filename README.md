## Back-end Structure - Business Objects 
* Users (database table)
    * id (auto-generated)
    * username (email validation)
    * password (at least 8 chars, at least one alpha and a special character validation)
    * farm_name,
    * street_address,
    * city,
    * state,
    * zip

* Items (database table)
    * id (auto-generated)
    * users_id, 
    * name,
    * description,
    * itemCount,
    * itemPrice,
    * img,
    * date_created


## API Documentation 
API Documentation details:
## API Overview

```text
/api
.
├── /auth
│   └── POST
│       ├── /login
├── /users
│   └── POST
│       └── /
├── /items
│   └── GET
│       ├── /
│   └── POST
│       └── /
│   └── DELETE
│       └── /:id

```

### POST `/api/auth/login`

```js
// req.body
{
    "user_name": "demo@gmail.com",
    "password": "Password1"
}

// res.body
{
  "authToken": String,
    "userId": 1
}
```

### POST `/api/users/`

```js
// req.body
{
    "id": 1,
    "user_name": "user10@gmail.com",
    "password": "Password10",
    "farm_name": "vendor10",
    "street_address": "street 10",
    "city": "CA",
    "state": "LA",
    "zip": "56789"
}


// res.body
{
    {
    "id": 1,
    "user_name": "user10@gmail.com"
}
}
```

### GET `api/items`

```js
// req.query
{
  
}

// res.body
[
  {
  "id": 1,
  "users_id": 1,
  "name": "Celery",
  "description": "Vegetable",
  "itemcount": "70",
  "itemprice": "90",
  "img": "img3.jpg",
  "date_created": "2020-03-01T00:00:00.000Z"
  }
]
```

### POST `/api/items`

```js
// req.body
{
    "users_id":"1",
    "name": "salmon",
    "description":"fish",
    "itemcount":"6",
    "itemprice":"6",
    "img":"img6.jpg",
    "date_created":"03/01/2020"

}

// res.body
[
    {
    "id": 16,
    "users_id": 1,
    "name": "salmon",
    "description": "fish",
    "itemcount": "6",
    "itemprice": "6",
    "img": "img6.jpg",
    "date_created": "2020-03-01T00:00:00.000Z"
}
]
```

### DELETE `/api/items/:id`

```js
// req.query
{
  id: ID
}

// res.body

  {

  }

```

## Responsive 
App is built to be usable on mobile devices, as well as responsive across mobile, tablet, laptop, and desktop screen resolutions.

## Development Roadmap 
This is v1.0 of the app, but future enhancements are expected to include:
* Weekly calendar - in order to map recipes based on the calendar.
* Add more specialized diets (dairy free)
* Add screenshots of the app for explanatory purpose on the dashboard.

## How to run it 
Use command line to navigate into the project folder and run the following in terminal

Local React scripts

To install the react project ===> npm install
To run react (on port 3000) ===> npm start
To run tests ===> npm run test

Local Node scripts

To install the node project ===> npm install
To migrate the database ===> npm run migrate -- 1
To run Node server (on port 8000) ===> npm run dev
To run tests ===> npm run test


### Local Node scripts
* To install the node project ===> npm install
* To migrate the database ===> npm run migrate -- 1
* To run Node server (on port 8000) ===> npm run dev
* To run tests ===> npm run test

### Local React scripts
* To install the react project ===> npm install
* To run react (on port 3000) ===> npm start
* To run tests ===> npm run test