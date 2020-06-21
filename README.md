# Basic e-commerce application

## Link to deployed App

**[API Deployment to]()**

[![Run in Postman](https://run.pstmn.io/button.svg)]()

## Installation

- Clone the repo by clicking the green clone or download button to copy the url on github
- In your terminal, run `git clone [insert URL copied from first step]`
- Open the repository with your code editor
- Setup `.env => checkout sample (.env.example) in the codebase` for environment variable
- Run `npm install` to install all dependencies
- Type `npm run watch` to get the development server running

### Authentication

## Add product

`POST api/v1/products`

```js
  {
    "name": "21Attire Wine Bodycon Amd Ruffle Jacket Dress",
    "description": "The most fashionable,yet affordable bodycon ",
    "category": "",
    "attributes": [{
      "price": 0,
      "imageUrl": "",
      "sizes": ["uk 8", "uk 10"],
      "color": ""

    }]
}
```

`GET /api/v1/products`

## getProducts

```js
{
    "success": true,
    "message": "successful",
    "body": {
        "products": [
            {
                "category": {
                    "_id": "",
                    "name": ""
                },
                "_id": "5e2ff9cc0c3ffebd3b5e77e1",
                "name": "",
                "description": "",
                "attributes": [
                    {
                        "sizes": [
                            "40",
                            "45",
                            "15"
                        ],
                        "_id": "",
                        "price": 19.99,
                        "imageUrl": "",
                        "color": ""
                    }
                ],
                "__v": 0
            }
}
```

## Required features

- Users can **sign up**
- Users can **login**
- Users can **add new category**
- Users can **View all product**
- Users can **create new product**
- Users can **update existing product**
- Users can **get product by ID**
- Users can **delete existing product**
- Users can **add product to cart**
- Users can **delete product from cart**

## Technologies

- ExpressJS
- React
- Redux
- styled-components
