const chai = require("chai");
const chaiHttp = require("chai-http");
const { app, runServer, closeServer } = require("../server");
const expect = chai.expect;

chai.use(chaiHttp);

describe("index", function() {
    it ("exists", function(){
        return(chai)
            .request(app)
            .get("/")
            .then(function(res){
                expect(res).to.have.status(200);
            });
    });
})