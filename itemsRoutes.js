"use strict";
const express = require("express");

const { items } = require("./fakeDb");
const { NotFoundError } = require("./expressError");
const router = new express.Router();



 /** return list of shopping items:
  * { items: [
  { name: "popsicle", price: 1.45 },
  { name: "cheerios", price: 3.40 }
]}
  */

router.get("/", function (req, res) {
  return res.json({items: items});
});


/** accept JSON body, add item, and return it:
 * {name: "popsicle", price: 1.45} =>
  {added: {name: "popsicle", price: 1.45}}
 */

router.post("/", function (req, res) {
  const item = {
    name: req.body.name,
    price: req.body.price
  };

  items.push(item);
  res.status(201);
  return res.json({added: item});
});

/** return single item: {name: "popsicle", "price": 1.45} */

router.get("/:name", function (req, res) {
  const item = items.find(item => item.name === req.params.name);

  if (!item) throw new NotFoundError(
    `Couldn't find an item named ${req.params.name}`
  );

  return res.json(item);
});

/** accept JSON body, modify item, return it: {name: "new popsicle", price: 2.45} =>
  {updated: {name: "new popsicle", price: 2.45}} */

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


/** delete item: {message: "Deleted"} */

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