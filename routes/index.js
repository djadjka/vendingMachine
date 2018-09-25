const router = require('express').Router();
const utils = require('../utils');


router.use('/euro', (req, res, next) => {
	let euro = Number(req.query.value);
	if (!utils.isEuro(euro)) {
		res.status(400).send('Incorrect query');
	} else {
		next();
	}
}, require('./api/euro'));



router.use('/test', require('./api/test'));



module.exports = router;