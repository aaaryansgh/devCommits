# Initialization:
 - npm init
 - npm i express (for setuping servers)
 - created server
 - Wrote request handlers
 - Installed nodemon (npm i -g nodemon).
 - Installed postman and tested few APIs.
 - Installed mongoose.
 - Connected to cluster first and then database using mongoose.
 - Pushed the data into data through post API.
 - Installed validator.js
 - validate data in signup API
 - Installed bcrypt package
 - Read cookies using cookie parser. (npm i cookie-parser)
 - Created userAuth middleware
 - Set the expiry of jwt token.
 - API list:
   ## auth router:
     1. - POST/signup
     2. - POST/login
     3. - POST/logout
   ## profile router:
     4. - GET/profile/view
     5. - PATCH/profile/edit
     6. - PATCH/profile/password
   ## connectionRequest router:
     7. - POST/request/send/like/:id
     8. - POST/request/send/pass/:id
     9. - POST/request/review/accepted/:id
     10. - POST/request/review/rejected/:id
   ## user router:
     11. - GET/user/connections
     12. - GET/user/requests
     13. - GET/user/feed
  - Created Connection request schema for requests api.
  - Sent conenction request api.
  - Handled the corner cases for request API.
# Learnings:
 - Orders of routes matter.
 - HTTPs methods (GET,POST,PUT,PATCH,DELETE).
 - By default if you make call to any url on browser it sends the GET request.
 - app.use will match all HTTPs method API call
 - Advance routing techniques (?,+,regex)
 - Handling multiple route handlers using next()
 - next functions and errors along with res.send()
 - Middlewares and error handling
 - How express is handling request behind the scene. 
 - Always connect database to server before listing to port.
 - js object vs json
 - patch vs put
 - Data validations using required,unique,true,minlength,custom validate function for gender.
 - API level validation on Patch request.
 - Never trust req.body
 - $or query
 - Compund indexes
 - Schema.pre()
 - Thought process: POST vs GET
 