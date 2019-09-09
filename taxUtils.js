function detectQuantity(words) {
    //trouver la quantité dans une chaine de caractères

    // on suppose le premier mot comme étant la quantité
    if (parseInt(words[0], 10) > 0) {
        return words[0];
    } else { //premier mot n'est pas un entier supèrieur à 0 =>erreur
        throw new Error("Quantité pas reconnu, merci de respecter le format: 'quantité en entier' 'intitulé du produit' 'à' 'prix en nombre décimal' ");
    }
}

function detectProduct(words) {
    //trouver le produit dans une chaine de caractères

    var result = "";

    // on suppose le produit étant les mots suivant la quantité et précédent le prix
    if (words.length > 3) {
        for (i = 0; i < words.length - 2; i++) {
            if (i > 0) {
                result += words[i] + " ";
            }
        }
        return result;
    } else {
        throw new Error("Nombre de mots insuffisants, merci de respecter le format: 'quantité en entier' 'intitulé du produit' 'à' 'prix en nombre décimal' ");
    }
}

function detectPrice(words) {
    //trouver le prix dans une chaine de caractères

    var result = "";
    // on suppose le prix étant le dernier mot
    if (words.length > 3) {
        if (parseFloat(words[words.length - 1]) > 0.00) {
            return words[words.length - 1];
        } else {
            throw new Error("prix non reconnu, merci de respecter le format: 'quantité en entier' 'intitulé du produit' 'à' 'prix en nombre décimal' ");
        }
    } else {
        throw new Error("Nombre de mots insuffisants, merci de respecter le format: 'quantité en entier' 'intitulé du produit' 'à' 'prix en nombre décimal' ");
    }
}

function calculateTax(initialPrice, tax) {
    //retourne la taxe sur le produit avec deux decimales sans arrondir
    return ((initialPrice * tax) / 100).toFixed(2);
}

function roundTax(calculatedTax, roundingRule) {
    //retourne la taxe arrondi, répond à l'énoncé avec roundingRule=5 mais peut etre décliné pour 10 centimes, 7 centimes, ...

    //passage en entier pour utiliser le modulo
    var integerCalculatedTax = calculatedTax * 100;
    var roundedTax = parseFloat(calculatedTax);
    if (integerCalculatedTax % roundingRule != 0) {
        //si ce n'est pas un multiple de 0.05 alors rajouter les 0.0X qu'il manque
        roundedTax = (roundedTax + (roundingRule - integerCalculatedTax % roundingRule) / 100);
    }
    return roundedTax.toFixed(2);
}

function separateInformations(str, array) {
    //separe les informations dans un tableau à 3 composants, quantité, description, prix
    var words = str.split(" ");

	array.push([detectQuantity(words), detectProduct(words), detectPrice(words)]);

}

function billing(array, exceptions) {
    var taxesTotales = 0;
    var total = 0;
    var strResult = "";
    //ici les règles de ces 3 types de produits sont les mêmes
    for (i = 0; i < array.length; i++) {

        var taxArrondiImport = 0;
        var taxArrondiNonExempte = 0;

        if (array[i][1].includes("importé")) {
            //si la description du produit contient le mot importé alors on applique la taxe
            var taxImport = calculateTax(array[i][2], 5);
            taxArrondiImport = roundTax(taxImport, 5);
        }

        //un element qui match entre les exceptions tva et le produit
        if (exceptions.some(v => array[i][1].indexOf(v) !== -1)) {
            //pas de taxe pour un produit exempté
        } else {
            //on applique la taxe pour les produits n'appartenant pas a la liste d'exception
            var taxNonExempte = calculateTax(array[i][2], 10);
            taxArrondiNonExempte = roundTax(taxNonExempte, 5);
        }

        var priceTTC = ((parseFloat(array[i][2]) + parseFloat(taxArrondiImport) + parseFloat(taxArrondiNonExempte)) * parseFloat(array[i][0])).toFixed(2);
        taxesTotales = taxesTotales + (parseFloat(taxArrondiImport) + parseFloat(taxArrondiNonExempte)) * parseFloat(array[i][0]);
        total = parseFloat(total) + parseFloat(priceTTC);
        strResult += `${array[i][0]} ${array[i][1]}: ${priceTTC}\n`;
    }
    strResult += `Montant des taxes : ${taxesTotales.toFixed(2)}\n`;
    strResult += `Total : ${total.toFixed(2)}`;
    return strResult;
}

module.exports = {
    detectQuantity: detectQuantity,
    detectProduct: detectProduct,
    detectPrice: detectPrice,
    calculateTax: calculateTax,
    roundTax: roundTax,
    separateInformations: separateInformations,
    billing: billing
};