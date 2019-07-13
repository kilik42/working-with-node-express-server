// load our app server using express somehow...

const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(morgan('short'))
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
