# Models

## Post Model

Schema:

```json
{
  "content": {
    "type": String,
    "maxlength": 280,
    "required": true
  }
}
```

# Route Handlers for REST API

```
METHOD  ENDPOINT/ACTION      DESCRIPTION

// Route handlers regarding posts
GET    -  '/post/list'        -  List all posts and send them as JSON to the client.
POST   -  '/post'             -  Handle post creation form submission. Send the created post in JSON response.
GET    -  '/post/:id'         -  Load single post and send them as JSON to the client.
DELETE -  '/post/:id'         -  Delete single post
PATCH  -  '/post/:id'         -  Handle post editing form submission, send the edited post as JSON.

// Route handlers regarding authentication
POST   -  '/authentication/sign-up'     - Handle sign up form submission.
POST   -  '/authentication/sign-in'     - Handle sign in form submission.
POST   -  '/authentication/sign-out'    - Handle sign out form submission.
GET    -  '/authentication/me'          - Load an the authenticated user
```

### Explanation of request methods

GET - Load data. Should not mutate anything on the server or database.
POST - Add data. Usually includes a request body. Mutate data on the server or database.
DELETE - Delete data. Usually does not include a request body. Mutate data on the server or database.
PATCH - Edit data. Usually includes a request body. Mutate data on the server or database.
PUT - Replace data. Usually includes a request body. Mutate data on the server or database.

### Client-side routes

'/' - Home view, calls service that lists all posts from REST API
'/post/create' - Post creation view. Has form that, when submited, calls service to create post.
'/post/:id' - Single Post view, calls service that loads single post from REST API
'/post/:id/edit' - Edit Post view, calls service that loads single post from REST API. Has form that, when submited, calls service that edits specific post. Has second form that, when submited, calls service that deletes post.
