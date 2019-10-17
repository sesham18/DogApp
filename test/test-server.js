"use strict"; 

const chai = require("chai");
const chaiHttp = require("chai-http");
//const app  = require("../server");
const expect = chai.expect;

chai.use(chaiHttp);


// import isEqual.js
const isEqual = require('../isEqual');

// "describe" is used to declare the entity to be tested, and a callback function that sets up the tests
describe('isEqual', function() {
    // indicate the behavior to be tested
    // typically the "it" statement will also include a callback that provides the test
    it('should give right answers for equal and unequal inputs', function(){
        expect(isEqual(1, 1)).to.be.true;
    });
        
  }
);