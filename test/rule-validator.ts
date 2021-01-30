import { server } from '../src/server';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);
import { expect } from "chai";
import 'mocha';



describe('RULE VALIDATION API /GET', () => {
    it('should return response on call', async () => {
        return await chai.request(server).get('/')
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.body.data.name).to.exist;
                expect(res.body.data.github).to.exist;
                expect(res.body.data.email).to.exist;
                expect(res.body.data.mobile).to.exist;
                expect(res.body.data.twitter).to.exist;
            })
    })
})


describe('RULE VALIDATION API /POST', () => {
    it("should return 'field 5 is missing from data.'", async () => {
        const payload = {
            "rule": {
                "field": "5",
                "condition": "contains",
                "condition_value": "rocinante"
            },
            "data": ["The Nauvoo", "The Razorback", "The Roci", "Tycho"]
        }
        return await chai.request(server).
            post('/validate-rule')
            .send(payload)
            .then(res => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.be.equal("field 5 is missing from data.");
                expect(res.body.status).to.be.equal("error");
                expect(res.body.data).to.be.equal(null);
            })
    })


    it("should return 'field 0 failed validation.'", async () => {
        const payload = {
            "rule": {
                "field": "0",
                "condition": "eq",
                "condition_value": "a"
            },
            "data": "damien-marley"
        }
        return await chai.request(server).
            post('/validate-rule')
            .send(payload)
            .then(res => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.be.equal("field 5 is missing from data.");
                expect(res.body.status).to.be.equal("error");
                expect(res.body.data.validation.error).to.be.equal(true);
                expect(res.body.data.validation.field).to.be.equal("0");
                expect(res.body.data.validation.field_value).to.be.equal("d");
                expect(res.body.data.validation.condition).to.be.equal("eq");
                expect(res.body.data.validation.condition_value).to.be.equal("a");
            })
    })

    it("should return 'field missions.count successfully validated.'", async () => {
        const payload = {
            "rule": {
                "field": "missions.count",
                "condition": "gte",
                "condition_value": 30
            },
            "data": {
                "name": "James Holden",
                "crew": "Rocinante",
                "age": 34,
                "position": "Captain",
                "missions": {
                    "count": 45,
                    "successful": 44,
                    "failed": 1
                }
            }
        }
        return await chai.request(server).
            post('/validate-rule')
            .send(payload)
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.body.message).to.be.equal("field missions.count successfully validated.");
                expect(res.body.status).to.be.equal("success");
                expect(res.body.data.validation.error).to.be.equal(false);
                expect(res.body.data.validation.field).to.be.equal("missions.count");
                expect(res.body.data.validation.field_value).to.be.equal(45);
                expect(res.body.data.validation.condition).to.be.equal("gte");
                expect(res.body.data.validation.condition_value).to.be.equal(30);
            })
    })


    it("should return 'rule is required.'", async () => {
        const payload = {
            "data": {
                "name": "James Holden",
                "crew": "Rocinante",
                "age": 34,
                "position": "Captain",
                "missions": {
                    count: 45,
                    successful: 44,
                    failed: 1
                }
            }
        }
        return await chai.request(server).
            post('/validate-rule')
            .send(payload)
            .then(res => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.be.equal("rule is required.");
                expect(res.body.status).to.be.equal("error");
                expect(res.body.data).to.be.equal(null);
            })
    })


    it("should return 'data is required.'", async () => {
        const payload = {
            "rule": {
                "field": "missions.count",
                "condition": "gte",
                "condition_value": 30
            }
        }
        return await chai.request(server).
            post('/validate-rule')
            .send(payload)
            .then(res => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.be.equal("data is required.");
                expect(res.body.status).to.be.equal("error");
                expect(res.body.data).to.be.equal(null);
            })
    })


    it("should return 'data should be either a JSON object, an array, or a string.'", async () => {
        const payload = {
            "rule": {
                "field": "missions.count",
                "condition": "gte",
                "condition_value": 30
            },
            "data": 2
        }
        return await chai.request(server).
            post('/validate-rule')
            .send(payload)
            .then(res => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.be.equal("data should be either a JSON object, an array, or a string.");
                expect(res.body.status).to.be.equal("error");
                expect(res.body.data).to.be.equal(null);
            })
    })


    it("should return 'Invalid JSON payload passed.'", async () => {
        const payload = {
            rule: {
                "field": "5",
                "condition": "contains",
                "condition_value": "rocinante"
            },
            "data": ["The Nauvoo", "The Razorback", "The Roci", "Tycho"]
        }
        return await chai.request(server).
            post('/validate-rule')
            .send(payload)
            .then(res => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.be.equal("Invalid JSON payload passed.");
                expect(res.body.status).to.be.equal("error");
                expect(res.body.data).to.be.equal(null);
            })
    })


    it("should return 'field is required.'", async () => {
        const payload = {
            rule: {

                "condition": "contains",
                "condition_value": "rocinante"
            },
            "data": ["The Nauvoo", "The Razorback", "The Roci", "Tycho"]
        }
        return await chai.request(server).
            post('/validate-rule')
            .send(payload)
            .then(res => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.be.equal("field is required.");
                expect(res.body.status).to.be.equal("error");
                expect(res.body.data).to.be.equal(null);
            })
    })

    it("should return 'condition is required.'", async () => {
        const payload = {
            rule: {
                "field": "7",
                "condition_value": "rocinante"
            },
            "data": ["The Nauvoo", "The Razorback", "The Roci", "Tycho"]
        }
        return await chai.request(server).
            post('/validate-rule')
            .send(payload)
            .then(res => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.be.equal("condition is required.");
                expect(res.body.status).to.be.equal("error");
                expect(res.body.data).to.be.equal(null);
            })
    })


    it("should return 'condition_value is required.'", async () => {
        const payload = {
            rule: {
                "field": "7",
                "condition": "contains"
            },
            "data": ["The Nauvoo", "The Razorback", "The Roci", "Tycho"]
        }
        return await chai.request(server).
            post('/validate-rule')
            .send(payload)
            .then(res => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.be.equal("condition_value is required.");
                expect(res.body.status).to.be.equal("error");
                expect(res.body.data).to.be.equal(null);
            })
    })
})