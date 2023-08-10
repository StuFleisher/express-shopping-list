"use strict";
const request = require("supertest");
const app = require('./app.js');
const { items } = require("./fakeDb");



let testItem = {};

beforeEach(function (){

    testItem.name = "oreos";
    testItem.price = 2.99;

  items.length = 0;
  items.push(
    {
      "name": "popsicle",
      "price": 1.45,
    })
  });

describe("get '/' ", function () {

  test("should return 200 status code and correct json", async function () {

    const response = await request(app).get('/items/');

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(
      {items: [{
        "name": "popsicle",
        "price": 1.45
      }]}
    );
  });
});

describe("post '/' ", function () {
  test("should return 201 status code and correct json", async function () {

    const response = await request(app)
      .post('/items/')
      .send(testItem);

    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual(
      {
        added: {
          "name": "oreos",
          "price": 2.99
        }
      }
    );
  });

  // test("should add record to the database", async function(){

  //   const response = await request(app)
  //     .post('/items/')
  //     .send(testItem);

  //     expect(items).toContain(testItem);


  // })
});

describe("get '/items/:name' ", function () {
  test("should return 200 status code and correct json", async function () {

    const response = await request(app).get('/items/popsicle');
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(
      {
        "name": "popsicle",
        "price": 1.45
      }
    );

  });

});

describe("patch '/items/:name' ", function () {
  test("should return 200 status code and correct json", async function () {

    const response = await request(app)
      .patch('/items/popsicle')
      .send({
        "name": "popsicle2",
        "price": 2.45,
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(
      {
        updated:
        {
          name: "popsicle2",
          price: 2.45
        }
      }

    );

  });
});

describe("delete '/items/:name' ", function () {
  test('should return 200 status code and delete a snack', async function () {

    const response = await request(app)
      .delete('/items/popsicle');

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(
      { message: 'Deleted' });


  });
});
