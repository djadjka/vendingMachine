const router = require('express').Router();
const mongoose = require('mongoose');
const queue = require('express-queue');
const sigleMiddelvare = queue({ activeLimit: 1, queuedLimit: -1 });
const Euro = mongoose.model('Euro');


router.get('/optimal-change', (req, res) => {
	let centes = req.query.value * 100;
	let result = [];
	const denominations = Euro.getDenominations();
	denominations.forEach((coin) => {
		let quantity = Math.floor(centes / coin);
		for (let i = 0; i < quantity; i++) {
			result.push(coin);
		}
		centes -= quantity * coin;
	});
	res.send(result);
});

router.get('/change', sigleMiddelvare, async (req, res) => {
	let centes = req.query.value * 100;
	let result = [];
	const denominations = Euro.getDenominations();
	let balance = await Euro.findById('euro');
	denominations.forEach((coin) => {
		let optimalQuantity = Math.floor(centes / coin);
		let quantity = optimalQuantity > balance[coin].quantity ? balance[coin].quantity : optimalQuantity;
		for (let i = 0; i < quantity; i++) {
			result.push(coin);
		}
		balance[coin].quantity -= quantity;
		centes -= quantity * coin;
	});
	if (centes !== 0) {
		res.status(400).send('insufficient funds');
	} else {
		await balance.save();
		res.send(result);
	}
});


module.exports = router;