Story: Calcul de taxes
======================

# Enoncé

La société FooBar© a décidé de développer un système révolutionnaire de commerce électronique sur site pour lequel une taxe sur la valeur ajoutée de **10%** est appliquée sur chaque produit, à l'exception des livres, de la nourriture et des médicaments, qui en sont exemptés.

Une taxe additionnelle de **5%** sur les produits importés, sans exception.

## Arrondi des taxes

Le montant de chacune des taxes est arrondi aux 5 cents supérieurs, selon la règle suivante :

| Taxe calculée | Taxe imputée |
|---------------|--------------|
|          0.99 |         1.00 |
|          1.00 |         1.00 |
|          1.01 |         1.05 |
|          1.02 |         1.05 |

## Passage d'une commande

Lorsque l'on passe une commande, une facture est émise listant chacun des produits ainsi que leur prix TTC.

Au bas de la facture figurent le montant total (TTC) ainsi que le montant total des taxes.

Le montant TTC est calculé comme suit : `Pttc = Pht + somme(arrondi(Pht*t/100))`
* Pttc: Prix TTC
* Pht : Prix hors taxes
* t : taxe applicable

# Objectif

Concevoir et écrire un programme implémentant la spécification ci-dessus et passant le test ci-après.

## Input

Les commandes suivantes sont à passer.

### Input 1

* 1 livre à 12.49
* 1 CD musical à 14.99
* 1 barre de chocolat à 0.85

### Input 2

* 1 boîte de chocolats importée à 10.00
* 1 flacon de parfum importé à 47.50

### Input 3

* 1 flacon de parfum importé à 27.99
* 1 flacon de parfum à 18.99
* 1 boîte de pilules contre la migraine à 9.75
* 1 boîte de chocolats importés à 11.25

## Output

Chaque commandes doit imprimer respectivement les sorties suivantes.

### Output 1

1 livre : 12.49  
1 CD musical : 16.49  
1 barre de chocolat : 0.85  
Montant des taxes : 1.50  
Total : 29.83

### Output 2

1 boîte de chocolats importée : 10.50  
1 flacon de parfum importé : 54.65  
Montant des taxes : 7.65  
Total : 65.15

### Output 3

1 flacon de parfum importé : 32.19  
1 flacon de parfum : 20.89  
1 boîte de pilules contre la migraine : 9.75  
1 boîte de chocolats importés : 11.85  
Montant des taxes : 6.70  
Total : 74.68
