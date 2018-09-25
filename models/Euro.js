const mongoose = require('mongoose');
const denominations = [100, 50, 20, 10, 5, 2, 1];
let coins = {};

denominations.forEach((denomination) => {
	coins[denomination] = { name: String, quantity: { type: Number, default: 0 } };
	coins['_id'] = String;
});



var EuroSchema = new mongoose.Schema(coins);

EuroSchema.statics.getDenominations = () => {
	return denominations;
};

mongoose.model('Euro', EuroSchema);