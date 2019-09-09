const assert = require('assert')
const taxUtils = require('./taxUtils.js')
const giveBackChange = require('./giveBackChangeUtils.js')

//001
//detectQuantity
it('should return 1', () => {
	var sentence = "1 livre à 12.49";
	var words = sentence.split(" ");
	assert.equal(1, taxUtils.detectQuantity(words));
})
it('should throw error for not recognizing quantity', () => {
	var sentence = "livre à 12.49";
	var words = sentence.split(" ");
	assert.throws(function () {
		taxUtils.detectQuantity(words)
	}, Error, "Quantité pas reconnu, merci de respecter le format: 'quantité en entier' 'intitulé du produit' 'à' 'prix en nombre décimal' ");
})
//detectProduct
it('should return livre', () => {
	var sentence = "1 livre à 12.49";
	var words = sentence.split(" ");
	assert.equal("livre ", taxUtils.detectProduct(words));
})
it('should throw error for missing words', () => {
	var sentence = "livre à 12.49";
	var words = sentence.split(" ");
	assert.throws(function () {
		taxUtils.detectProduct(words)
	}, Error, "Nombre de mots insuffisants, merci de respecter le format: 'quantité en entier' 'intitulé du produit' 'à' 'prix en nombre décimal' ");
})
//detectPrice
it('should return 12.49', () => {
	var sentence = "1 livre à 12.49";
	var words = sentence.split(" ");
	assert.equal(12.49, taxUtils.detectPrice(words));
})
it('should throw error for not recognizing price', () => {
	var sentence = "1 livre à aaaaa";
	var words = sentence.split(" ");
	assert.throws(function () {
		taxUtils.detectPrice(words)
	}, Error, "prix non reconnu, merci de respecter le format: 'quantité en entier' 'intitulé du produit' 'à' 'prix en nombre décimal' ");
})
it('should throw error for missing words', () => {
	var sentence = "livre à 12.49";
	var words = sentence.split(" ");
	assert.throws(function () {
		taxUtils.detectPrice(words)
	}, Error, "Nombre de mots insuffisants, merci de respecter le format: 'quantité en entier' 'intitulé du produit' 'à' 'prix en nombre décimal' ");
})
//calculateTax
it('should return 0.05', () => {
	assert.equal(0.05, taxUtils.calculateTax(1, 5));
})
//roundTax
it('should return 0.05 after rounding up from 0.02', () => {
	assert.equal(0.05, taxUtils.roundTax(0.02, 5));
})
it('should return 0.05 after rounding up from 0.05', () => {
	assert.equal(0.05, taxUtils.roundTax(0.05, 5));
})
//separateInformations
it("should return the array:  [ [ '1', 'livre ', '12.49' ],   [ '1', 'CD musical ', '14.99' ],   [ '1', 'barre de chocolat ', '0.85' ] ]", () => {
	var array = [];
	var sentence1 = "1 livre à 12.49";
	var sentence2 = "1 CD musical à 14.99";
	var sentence3 = "1 barre de chocolat à 0.85";
	taxUtils.separateInformations(sentence1, array);
	taxUtils.separateInformations(sentence2, array);
	taxUtils.separateInformations(sentence3, array);
	assert.deepEqual([['1', 'livre ', '12.49'],
			['1', 'CD musical ', '14.99'],
			['1', 'barre de chocolat ', '0.85']], array);
})
//billing
it("should return the string: \n`1 livre : 12.49\n1 CD musical : 16.49\n1 barre de chocolat : 0.85\nMontant des taxes : 1.50\nTotal : 29.83`\n from array:\n [ [ '1', 'livre ', '12.49' ],   [ '1', 'CD musical ', '14.99' ],   [ '1', 'barre de chocolat ', '0.85' ]", () => {
	const food = ["chocolat"];
	const meds = ["pilule"];
	const books = ["livre"];
	const exceptions = meds.concat(food).concat(books);
	assert.equal(`1 livre : 12.49\n1 CD musical : 16.49\n1 barre de chocolat : 0.85\nMontant des taxes : 1.50\nTotal : 29.83`, taxUtils.billing([['1', 'livre ', '12.49'], ['1', 'CD musical ', '14.99'], ['1', 'barre de chocolat ', '0.85']], exceptions));
})
it("should return the string: \n`1 boîte de chocolats importée : 10.50\n1 flacon de parfum importé : 54.65\nMontant des taxes : 7.65\nTotal : 65.15` from array:\n[ [ '1', 'boîte de chocolats importée ', '10.00' ],   [ '1', 'flacon de parfum importé ', '47.50' ] ]", () => {
	const food = ["chocolat"];
	const meds = ["pilule"];
	const books = ["livre"];
	const exceptions = meds.concat(food).concat(books);
	assert.equal(`1 boîte de chocolats importée : 10.50\n1 flacon de parfum importé : 54.65\nMontant des taxes : 7.65\nTotal : 65.15`, taxUtils.billing([['1', 'boîte de chocolats importée ', '10.00'], ['1', 'flacon de parfum importé ', '47.50']], exceptions));
})
it("should return the string: \n`1 flacon de parfum importé : 32.19\n1 flacon de parfum : 20.89\n1 boîte de pilules contre la migraine : 9.75\n1 boîte de chocolats importés : 11.85\nMontant des taxes : 6.70\nTotal : 74.68` from array:\n[ [ '1', 'flacon de parfum importé ', '27.99' ],   [ '1', 'flacon de parfum ', '18.99' ], ['1', 'boîte de pilules contre la migraine ', '9.75'],['1', 'boîte de chocolats importés ', '11.25'] ]", () => {
	const food = ["chocolat"];
	const meds = ["pilule"];
	const books = ["livre"];
	const exceptions = meds.concat(food).concat(books);
	assert.equal(`1 flacon de parfum importé : 32.19\n1 flacon de parfum : 20.89\n1 boîte de pilules contre la migraine : 9.75\n1 boîte de chocolats importés : 11.85\nMontant des taxes : 6.70\nTotal : 74.68`, taxUtils.billing([['1', 'flacon de parfum importé ', '27.99'], ['1', 'flacon de parfum ', '18.99'], ['1', 'boîte de pilules contre la migraine ', '9.75'], ['1', 'boîte de chocolats importés ', '11.25']], exceptions));
})
//002
//evenCase
it('should return [3,0] for returning 6', () => {
	assert.deepEqual([3,0], giveBackChange.evenCase(6));
})
it('should return [0,1] for returning 10', () => {
	assert.deepEqual([0,1], giveBackChange.evenCase(10));
})
//giveBackChange
it('should return "" for returning "1"', () => {
	assert.equal("", giveBackChange.giveBackChange(1));
})
it('should return "" for returning "3"', () => {
	assert.equal("", giveBackChange.giveBackChange(3));
})
it('should return "2x1 + 5x1 + 10x922337203685477580" for returning 9223372036854775807', () => {
	assert.equal("2x1 + 5x1 + 10x922337203685477580", giveBackChange.giveBackChange("9223372036854775807"));
})
it('should return "" for returning "aa"', () => {
	assert.equal('', giveBackChange.giveBackChange("aa"));
})
it('should return "2x3 + 5x0 + 10x0" for returning "6"', () => {
	assert.equal('2x3 + 5x0 + 10x0', giveBackChange.giveBackChange("6"));
})
it('should return "" for returning "1"', () => {
	assert.equal('', giveBackChange.giveBackChange("1"));
})
it('should return "2x0 + 5x0 + 10x1" for returning "10"', () => {
	assert.equal('2x0 + 5x0 + 10x1', giveBackChange.giveBackChange("10"));
})