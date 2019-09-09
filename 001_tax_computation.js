const readline = require('readline');
const taxUtils = require('./taxUtils.js')

//séparation des exceptions au cas ou les règles pour chaque exception diffèrent
const food = ["chocolat"];
const meds = ["pilule"];
const books = ["livre"];
//ici les règles de ces 3 types de produits sont les mêmes
const tvaException = meds.concat(food).concat(books);

function replDemo() {
    var tableau = [];
    return new Promise(function (resolve, reject) {
        let rl = readline.createInterface(process.stdin, process.stdout)
            rl.on('line', function (line) {

                if (line === "exit" || line === "quit" || line == 'q') {
                    rl.close()
                    return
                } else {
                    //nouvelle ligne utilisateur à traiter
                    try {
                        taxUtils.separateInformations(line, tableau);
                    } catch (e) {
						//erreur d'input afficheront un message permettant à l'utilisateur de se corriger
                        console.log(e.message);
                    }

                }
                rl.prompt()

            }).on('close', function () {
                resolve(tableau) //tableau contenant les informations entrées et séparé en [quantité, produit, prix]
            });
    })
}

async function run() {
    try {
        console.log("Veuillez entrer votre commande:\nUtiliser 'exit','quit' ou 'q' suivi de entrée pour quitter\n(exemple de commande: 1 livre à 12.49)");
        let replResult = await replDemo()
            //Quand l'utilisateur à finit de rentrer sa commande on calcule et affiche la facture
            console.log(taxUtils.billing(replResult, tvaException));

    } catch (e) {
        console.log('failed:', e)
    }
}

run()
