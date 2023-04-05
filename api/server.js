//IMPORTS
const express = require("express");
const knex = require("knex")(
  require("./knexfile.js")[process.env.NODE_ENV || "development"]
);
const cors = require("cors");
const port = 8080;
const app = express();

//EXPRESS MIDDLEWARE
app.use(express.json());
app.use(cors());

//EXPRESS ENDPOINTS
app.get("/inventory", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  knex
    .select('*')
    .from('inventory')
    .then(data => res.status(200).send(data))
    .catch(err =>{
      console.log(err)
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    });
});

//USER SIGNUP
app.post('/signup', (req,res) => {
  let user = req.body
  if(user.first && user.last && user.password && user.username){
    knex
      .insert(user)
      .into("users")
      .then(data => res.status(202).json({
        message:
          `POST Success with user: ${user.username}`
      }))
      .catch(err =>{
        console.log(err)
        res.status(404).json({
          message:
            'Problem with POST. idk what it is but you better figure it out'
        })
      });
  }
})

//USER LOGIN
app.post("/signin", (req,res) => {
  let user = req.body
  knex
    .select('*')
    .from('users')
    .where("username", user.username)
    .then(userDb => {
      let userCompare = userDb[0]
      if(user.password === userCompare.password){
        res.setHeader("Content-Type", "application/json");
        res.status(202).send(JSON.stringify(userCompare))
      }
      else{
        res.status(406).json({
          message:
            'Authentication failed.'
        })
      }
    })
    .catch(err =>{
      console.log(err)
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    });
})

//INVENTORY POST
app.post("/inventory", (req,res) => {
  let item = req.body
  knex.insert(item)
    .into("inventory")
    .then(data => res.status(202).json({
      message:
        `POST Success with item: ${item.name}`
    }))
    .catch(err =>{
      console.log(err)
      res.status(404).json({
        message:
          'Problem with POST. idk what it is but you better figure it out'
      })
    });
})

//INVENTORY DELETE
app.delete("/inventory", (req,res) => {
  let item = req.body
  knex("inventory")
    .where("id", item.id)
    .del()
    .then(data => res.status(202).json({
      message:
        `DELETE Success with item: ${item.name}`
    }))
    .catch(err =>{
      console.log(err)
      res.status(404).json({
        message:
          'Problem with POST. idk what it is but you better figure it out'
      })
    });
})

//INVENTORY PATCH
app.put("/inventory", (req,res) => {
  let item = req.body
  knex("inventory")
    .where("id", item.id)
    .update(item)
    .then(data => res.status(202).json({
      message: `PATCH Success with item id: ${item.id}`
    }))
    .catch(err => {
      console.log(err)
      res.status(404).json({
        message:
          'Problem with POST. idk what it is but you better figure it out'
      })
    })
})



app.listen(port, () => {
  console.log("Listening on port: ", port);
});
