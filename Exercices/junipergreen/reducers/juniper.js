import { INIT_GAME, MAX_JUNIPER, SET_CHOICE, CHECK_CHOICE } from '../constants/actions'

import { possibleDivisors, possibleMultiples, choice_computer, newMap, updateVeryNestedField } from '../actions/actions-types'

const initialState = {
    possibles: new Map([]),
    choices: new Map([]),
    valid: new Map([]),
    computer: '',
    player: '',
    message: '',
    count: 0,
    score_player: 0,
    score_computer: 0,
    reload: true,
    winner: null
}

// on vérifie que la source de vérité ne change pas
export default (state = initialState, action = {}) => {
    let choice, choices, player, possibles, computer, valid, count, score_player, score_computer;

    switch (action.type) {

        case 'RELOAD':

            return {
                ...state,
                reload: action.reload
            }

        case SET_CHOICE: {

            return {
                ...state,
                player: action.payload,
                message: '',
            }
        }

        case CHECK_CHOICE: {

            player = parseInt(state.player);

            if (isNaN(player) || player > MAX_JUNIPER || player <= 0) return {

                ...state,
                message: `Attention cette valeur ${player} n'est pas correcte pour ce jeu.`
            }

            if (state.valid.has(player) === false) {
                return {
                    ...state,
                    message: `Cette valeur est impossible : ${player} ce n'est pas un diviseur ou un multiple possible`,
                    player: ''
                }
            }

            // sinon c'est bon 
            count = state.count;
            score_player = state.score_player;

            count++;
            score_player++;

            choices = new Map(state.choices); // crée une nouvel instance de choice voir actions-types
            choices.set(Math.random().toString(12).substring(0), `step ${count} player : ${player}`);

            possibles = new Map(state.possibles); // crée une nouvel instance de choice voir actions-types
            possibles.delete(player);

            // On calcule les valeurs possibles par rapport au choix du player
            valid = new Map([
                ...possibleMultiples(player, possibles),
                ...possibleDivisors(player, possibles)]
            );

            // le jeu est terminé car computer ne peut plus faire de choix
            if (valid.size === 0)
                return {
                    ...state,
                    message: `Vous avez gagné `,
                    player: '',
                    computer,
                    valid,
                    choices,
                    possibles,
                    count,
                    score_player,
                    score_computer,
                    reload: null,
                    winner: `c'est vous !`
                }

            // Sinon computer peut continuer
            computer = choice_computer(valid); // fonction dans actions-types
            possibles.delete(computer);

            count++;
            score_computer++; // il a trouvé une valeur possible donc il gagne un point
            choices.set(Math.random().toString(12).substring(0), `step ${count} computer ${computer}`);

            // on calcule les valeurs possibles 
            valid = new Map([
                ...possibleMultiples(computer, possibles),
                ...possibleDivisors(computer, possibles)]
            );

            // le jeu est terminé car vous ne pouvez plus faire de choix ... Le player a perdu
            if (valid.size === 0)
                return {
                    ...state,
                    message: `Vous avez perdu `,
                    player: '',
                    computer,
                    valid,
                    choices,
                    possibles,
                    count,
                    score_player,
                    score_computer,
                    reload: null,
                    winner: `c'est pas vous ...`
                }

            // sinon on continue
            return {
                ...state,
                message: `C'est à vous de jouer`,
                player: '',
                computer,
                valid,
                choices,
                possibles,
                count,
                score_player,
                score_computer
            }
        }

        case INIT_GAME:

            possibles = new Map();

            // generate possibles values
            for (const num of Array(MAX_JUNIPER).keys()) {
                possibles.set(num + 1, num + 1);
            }

            computer = choice_computer(possibles, true)
            possibles.delete(computer);

            valid = new Map([...possibleMultiples(computer, possibles), ...possibleDivisors(computer, possibles)]);

            choices = new Map();
            count = 1
            choices.set(Math.random().toString(12).substring(0), `step ${count} computer ${computer}`);

            return updateVeryNestedField(state, {
                possibles: possibles,
                valid: valid,
                choices: choices,
                computer: computer,
                count: count,
                reload: false
            })

        default:
            return state;
    }
}