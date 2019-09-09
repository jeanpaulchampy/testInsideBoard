Story: Rendu de monnaie
=======================


# Enoncé

La société FooBar© a décidé de développer un système révolutionnaire de caisse enregistreuse afin de simplifier le paiement des commandes de son sytème révolutionnaire de commerce en ligne sur site.

Ces caisses enregistreuses sont automatiques et n'acceptent que les paiements en espèces avec des billets et des pièces.

Ces caisses devront rendre de façon optimale, c'est-à-dire avec le nombre minimal de pièces et billets, un montant calculé en fonction de la commande et des espèces données.

Dans cette première version de caisse automatique, seuls des pièces de **2€**, des billets de **5€** et de **10€** sont gérés.

Ces caisses, directement approvisionnées en temps réél par des transporteurs automatiques d'espèces, disposent de **quantité illimitée** d'espèce (*tout type de pièce et de billet*).

Lorsque le rendu de monnaie n'est pas possible, *rien ne se passe*.

# Objectif

Concevoir et écrire un programme implémentant la spécification ci-dessus et passant le test ci-après.
*Nota bene: la monnaie à rendre sera fournie en entrée*

## Input

### Input 1
Monnaie à rendre : `6`

### Input 2
Monnaie à rendre : `1`

### Input 3
Monnaie à rendre : `10`

### Input 4
Monnaie à rendre : `9223372036854775807`


## Output

### Output 1
```
2x3 + 5x0 + 10x0
```

### Output 2
```
```
*Nota bene: le rendu de monnaie est impossible*


### Output 3
```
2x0 + 5x0 + 10x1
```
Des solutions possibles mais non optimales seraient :
```
2x0 + 5x2 + 10x0
2x5 + 5x0 + 10x0
```

### Output 4
```
2x1 + 5x1 + 10x922337203685477580
```
