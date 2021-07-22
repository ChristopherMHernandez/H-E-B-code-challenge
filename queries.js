const Pool = require('pg').Pool
const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'chris-code',
  password: 'secret',
  port: 3001,
})
const getCustomersbyID =(request,response) =>{
    const customer_id = parseInt(request.params.customer_id)
    pool.query('SELECT * FROM "customers" WHERE customers_id=$1',[customer_id],(error,results) =>{
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const getCustomers=(request,response)=>{
    const customers_id = parseInt(request.params.customers_id)
    pool.query('SELECT * FROM "customers" ORDER by customers_id ASC',(error,results) =>{
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}
const createNewCustomer=(request,response)=>{
    const {first_name, last_name, email, address, city, state, zip}=request.body
    pool.query ('INSERT INTO public.customers(first_name, last_name, email, address, city, state, zip) VALUES ( $1, $2, $3, $4, $5, $6, $7) RETURNING *',[first_name, last_name, email, address, city, state, zip],(error,results)=>{
        if (error){
            throw error
        }
        response.status(200).json(results.rows)  
    })
}
module.exports={
    getCustomersbyID,
    getCustomers,
    createNewCustomer
}
