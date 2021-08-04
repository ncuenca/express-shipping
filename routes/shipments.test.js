"use strict";

const request = require("supertest");
const app = require("../app");


describe("POST /", function () {
  test("valid", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: expect.any(Number) });
  });


  test("invalid productId", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 999,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.body.error.message).toEqual( ["instance.productId must be greater than or equal to 1000"] );
    expect(resp.body.error.status).toEqual( 400 );
  });
  
  
  test("invalid name", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: 69,
      addr: "100 Test St",
      zip: "12345-6789",
    });
    
    expect(resp.body.error.message).toEqual( ["instance.name is not of a type(s) string"] );
    expect(resp.body.error.status).toEqual( 400 );
  });
  
  
  test("invalid address", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: 69,
      zip: "12345-6789",
    });
    
    expect(resp.body.error.message).toEqual( ["instance.addr is not of a type(s) string"] );
    expect(resp.body.error.status).toEqual( 400 );
  });
  
  test("invalid zip", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: 69,
    });
    
    expect(resp.body.error.message).toEqual( ["instance.zip is not of a type(s) string"] );
    expect(resp.body.error.status).toEqual( 400 );
  });
});
