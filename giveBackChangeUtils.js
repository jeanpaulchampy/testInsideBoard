function evenCase(bigInt){
	//dans le cas pair, on determine le nombre de pieces de 2 et de billets de 10 a rendre
	var result=[0,0]//2*X and 10*X
	var entry=BigInt(bigInt);
	quotient = entry / 2n;
	if (quotient >= 5n) {
		//si apres la division par deux on peux rendre plus de 5 pièces de 2, alors on peut rendre des billets de 10 
		result[1] =  quotient / 5n;
		result[0] = quotient % 5n;
	} else {
		//Sinon on ne rend que des pièces de 2
		result[0] = quotient;
	}
	return result;
}


function giveBackChange(input){
	try{
		var bigInt = BigInt(input);
	}
	catch(e){
		console.log("Veuillez entrer un entier valide");
		return "";
	}
	if (BigInt(input) > 3n || BigInt(input) == 2n) {
		//Si remboursement possible(pas 1 et 3)
		var result = "";
		var two = 0n;
		var five = 0n;
		var ten = 0n;
		var quotient = 0;
		var twoAndTen=[0,0]
		var reste=BigInt(input);
		
		//si impair
		 if (reste % 2n != 0) {
			 //si impair>3 on peut retirer 5 et rendre un billet de 5
			 //on ne rendra jamais 2+ billets de 5 car on peut rendre un billet de 10 au moins
			 five = 1;
			 reste=reste-5n;
		 }
		
		//si pair
			twoAndTen=evenCase(reste);
			two=twoAndTen[0];
			ten=twoAndTen[1];
		result = `2x${two} + 5x${five} + 10x${ten}`;
		return result;
	}
	//la machine ne répond pas dans le cas où le rendu de monnaie est impossible
	return "";
}

module.exports = {
    evenCase: evenCase,
    giveBackChange: giveBackChange,
};