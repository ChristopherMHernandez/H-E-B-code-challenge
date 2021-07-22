const express = require("express");
const bodyParser = require("body-parser");
const queries = require('./queries')

const app= express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }))

//app.get('/pathHere', getAllCustomersHere);
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
    
  })
  app.get('/customers/:customer_id', queries.getCustomersbyID); 
  app.get('/customers', queries.getCustomers);
  app.post('/customers', queries.createNewCustomer);
  //app.get('/customers', getAllCustomersHere);

app.listen(8000, () => {
  console.log(`Server is running.`);
});