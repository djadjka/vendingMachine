const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('../app.js');

describe('API', function () {
	this.timeout(5000);

	it('fill machine', function () {
		return chai.request(app)
			.get('/test/fill-machine')
			.then(function (res) {
				expect(res).to.have.status(200);
				expect(res.text).to.string('all ok =)');
			});
	});

	it('check balance', function () {
		const balance = {
			"1": { "quantity": 23, "name": "One cent" },
			"2": { "quantity": 11, "name": "Two cents" },
			"5": { "quantity": 200, "name": "Five cents" },
			"10": { "quantity": 99, "name": "Ten cents" },
			"20": { "quantity": 0, "name": "Twenty cents" },
			"50": { "quantity": 24, "name": "Fifty cents" },
			"100": { "quantity": 11, "name": "One Euro" },
			"_id": "euro",
			"__v": 0
		}

		return chai.request(app)
			.get('/test/balance')
			.then(function (res) {
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body).to.deep.equal(balance)
			});
	});

	it('should return optimal change', function () {
		return chai.request(app)
			.get('/euro/optimal-change?value=2.38')
			.then(function (res) {
				expect(res).to.have.status(200);
				expect(res.body).to.be.an('array');
				expect(res.body).to.deep.equal([100, 100, 20, 10, 5, 2, 1]);
			});
	});

	it('should return change', function () {
		return chai.request(app)
			.get('/euro/change?value=20.38')
			.then(function (res) {
				expect(res).to.have.status(200);
				expect(res.body).to.be.an('array');
				expect(res.body).to.deep.equal([100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 10, 10, 10, 5, 2, 1]);
			});
	});

	it('should return insufficient funds error', function () {
		return chai.request(app)
			.get('/euro/change?value=10000')
			.then(function (res) {
				expect(res).to.have.status(400);
				expect(res.text).to.equal('insufficient funds');
			});
	});

	it('should return query error', function () {
		return chai.request(app)
			.get('/euro/optimal-change?value=0.54815141415')
			.then(function (res) {
				expect(res).to.have.status(400);
				expect(res.text).to.equal('Incorrect query');
			});
	});
});