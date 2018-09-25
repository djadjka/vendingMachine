function isEuro(euro) {
	return !Number.isNaN(euro) && Number.isInteger(euro * 100);
}



module.exports = {
	isEuro: isEuro
};