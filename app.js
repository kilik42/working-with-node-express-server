// load our app server using express somehow...

const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('./public'))

app.use(morgan('short'))


app.post('/user_create', (req,res)=>{
  console.log("trying to cretea new user")
  console.log("how do we get the form data")
  console.log("first name:"+req.body.create_first_name)
  const firstName =req.body.create_first_name
  const lastName =   req.body.create_last_name

  const queryString = "INSERT INTO users  (first_name, last_name) VALUES(?,?)"
  getConnection().query(queryString, [firstName, lastName], (err, results, fields)=>{
    if(err){
      console.log("failed to insert new user:"+err)
      res.sendStatus(500)
      return
    }
    console.log("inserted a new user with id:", results.insertedId)
  })
  //res.end()
})

function getConnection(){
  mysql.createConnection({
    host:'localhost',
    user: 'root',
    //password
    database: 'mysql_test'

  })
}


app.get('/user/:id', (req, res) =>{
  console.log("fetching user with id" + req.params.id)


  const connection = getConnection()


  const userId = req.params.id
  const queryString = "SELECT * FROM users WHERE id = ? = ?"
  connection.query(queryString,[userId], (err, rows, fields) =>{
    if(err){
      console.log("failed to query for users:" + err)
      res.sendStatus(500)
      //throw err
      res.end()
      return
    }
    console.log("i think we fetched users successfully")



    const users = rows.map((row)=>{
      return {firstName: row.first_name, lastName: row.last_name}
    })

    res.json(rows)

  })

//  res.end()
})


app.get("/", (req, res) => {
  console.log("responding to root route")
  res.send("hello from ROOOOOT")

})



app.get("/users", (req, res) => {

  const user1 = {firstName: "stephen",lastName: "curry"}
  const user2 = {firstName: "stephen",lastName: "curry"}
  res.json([user1, user2])


  res.send("nodemon auto updates when i save this file")
})








//localhost:3003
app.listen(3003, ()=> {
  console.log("your server is up and listening on  3003...")
})
