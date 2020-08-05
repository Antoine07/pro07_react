# TP dénomination

Vous allez créer une petite application qui permet de saisir un montant donné et qui fournit la monnaie en token(s) que l'on peut rendre par rapport à ce montant.

Vous vous aiderez de la documentation officielle pour réaliser ce TP : [React Native](https://facebook.github.io/react-native/docs/getting-started)

Voici les dénominations, c'est-à-dire les tokens que l'on pourra rendre en fonction d'un montant donné :

```js

const denominations = [1, 5, 10, 20, 50, 100]

```

Vous devrez développer une petite interface permettant de saisir le montant et de rendre les dénominations. Vous utiliserez Redux pour la gestion de l'algorithmique et du store.

## Partie 1

Le squelette d'application sera fait avec expo.

Pour la mise en page des Views React Native vous utiliserez la technologie Flex CSS. Pour la partie globalisation du store il faudra la faire directement dans le composant App. Voyez l'arbre React que l'on souhaite implémenter ci-après.

### Wireframe 1 saisir le montant

```txt

[ 253 ]

[ Dénomination ]

[ Reset ]

Dénomination 100 unité(s) : 2

Dénomination 50 unité(s) : 1

Dénomination 1 unité(s) : 3

```
 
Utilisez les balises suivantes Text, TextInput, View, StyleSheet et Button de React Native.

Pour la balise TextInput vous pouvez définir un attribut permettant de configurer le num-pad pour la saisie des chiffres dans l'application :

```js

<TextInput
    keyboardType='number-pad'
    // todo
/>

```

## Hiérarchie des composants

```txt

    App
     .
     .
 Denomination

```
