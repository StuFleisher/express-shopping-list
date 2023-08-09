"use strict";
const express = require("express");

const { items } = require("./fakeDb");
const { NotFoundError } = require("./expressError");
const router = new express.Router();




//get /items
router.get("/", function (req, res) {
  return res.json(items);
});


router.post("/", function (req, res) {
  const item = {
    name: req.body.name,
    price: req.body.price
  };

  items.push(item);
  res.status(201);
  return res.json({added: item});
});


router.get("/:name", function (req, res) {
  const item = items.find(item => item.name === req.params.name);

  if (!item) throw new NotFoundError(
    `Couldn't find an item named ${req.params.name}`
  );

  return res.json(item);
});

router.patch("/:name", function (req, res) {

  const item = items.find(item => item.name === req.params.name);
  //get data from the request
  //if the item exists in request,
  //set our item name to that
  //if the price exists,
  ///set price to that

  if (!item) throw new NotFoundError(
    `Couldn't find an item named ${req.params.name}`
  );

  let name = req.body.name;
  let price = req.body.price;
  if (name){
    item.name = name
  }
  if (price !== undefined){
    item.price = price
  }



  return res.json({updated: item});

});

router.delete("/:name", function (req, res){

  const itemIndex = items.findIndex(item => item.name === req.params.name);

  if (itemIndex === -1) throw new NotFoundError(
    `Couldn't find an item named ${req.params.name}`
  );

  items.splice(itemIndex, 1);

  return res.json({message: 'Deleted'});


});

//post /items
//get /items/:name
//patch /items/:name
//delete /items/:name

// /** GET /users: get list of users */
// router.get("/", function (req, res) {
//   return res.json(db.User.all());
// });

// /** DELETE /users/[id]: delete user, return {message: Deleted} */
// router.delete("/:id", function (req, res) {
//   db.User.delete(req.params.id);
//   return res.json({ message: "Deleted" });
// });



module.exports = router;