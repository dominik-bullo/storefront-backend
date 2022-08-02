# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

If authentification is required, token needs to be passed in the header of the request as `x-auth-token`.

#### Products

- Index `/products [GET]`
- Show `/products/:id [GET]`
- Create [token required] `/products [POST]` accepts JSON body `{name, price, category}` returns JSON body `{id, name, price, category}`.
- Top 5 most popular products `/popular [GET]`
- Products by category (args: product category) `/category/:category [GET]`

#### Users

- Index [token required] `/users [GET]`
- Show [token required] `/users/:id [GET]`
- Create N [token required] `/users [POST]` accepts JSON body `[{email, first_name, last_name, password}, {...}]` returns JSON body `[{id, email, first_name, last_name}, {...}]`.
- Authenticate `/users/auth [POST]` accepts JSON body `{email, password}` returns JSON body `{token}`

#### Orders

- Create [token required] `/orders/:userId [POST]`
- Toggle order status [token required] `/orders/:id [PATCH]`
- Current Order by user (args: user id) [token required] `/orders/:userId [GET]`
- Completed Orders by user (args: user id) [token required] `/orders/:userId/done [GET]`

## Data Shapes

    ##### Product
    - id: string
    - name: string
    - price: string
    - category: string

    ##### User
    - id: string
    - email: string
    - first_name: string
    - last_name: string
    - password: string

    ##### Order
    - id: string
    - user_id: string
    - status: string

    ##### Order Item
    - id: string
    - order_id: string
    - product_id: string
    - quantity: number

## Database Schema

#### Table 'products'

- id [INT - PK]
- name [VARCHAR(100) - NOT NULL]
- price [DECIMAL(10,2) - NOT NULL]
- category [VARCHAR(30) - NOT NULL]

#### Table 'users'

- id [INT - PK]
- email [VARCHAR(100)]
- firstName [VARCHAR(30) - NOT NULL]
- lastName [VARCHAR(100) - NOT NULL]
- password [VARCHAR(100) - NOT NULL]

#### Table 'orders'

- id [INT - PK]
- user_id [INT - FK to users]
- status of order (`active` or `complete`) [VARCHAR(10) - NOT NULL]

#### Table 'order-items'

- id [INT - PK]
- order_id [INT - FK to orders]
- product_id [INT - FK to products]
- quantity [INT - NOT NULL]
