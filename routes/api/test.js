const router = require('express').Router();
const mongoose = require('mongoose');
const Euro = mongoose.model('Euro');

const refill = {
	_id: 'euro',
	100: { name: 'One Euro', quantity: 11 },
	50: { name: 'Fifty cents', quantity: 24 },
	20: { name: 'Twenty cents', quantity: 0 },
	10: { name: 'Ten cents', quantity: 99 },
	5: { name: 'Five cents', quantity: 200 },
	2: { name: 'Two cents', quantity: 11 },
	1: { name: 'One cent', quantity: 23 },
};

router.get('/fill-machine', async (req, res) => {
	try {
		await Euro.findByIdAndUpdate('euro', refill, { upsert: true, new: true, });
		res.send('all ok =)');
	} catch (err) {
		res.status(500).send(err);
	}
});

router.get('/balance', async (req, res) => {
	let balance = await Euro.findById('euro');
	res.send(balance);
});


module.exports = router;