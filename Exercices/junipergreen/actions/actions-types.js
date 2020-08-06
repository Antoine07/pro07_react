import { MAX_JUNIPER, INIT_GAME, SET_CHOICE, CHECK_CHOICE } from '../constants/actions';

// possibles est un tableau dans lequel je vais placer les valeurs que l'on aura déjà choisie 
export const possibleMultiples = (n, possibles = new Map([])) => {

    let multiples = new Map([]);
    let j = 1, num = n;

    while (num <= MAX_JUNIPER) {
        num = j * n;
        if (num <= MAX_JUNIPER && possibles.has(num) === true) multiples.set(num, num);
        j++;
    }

    return multiples;
}

export const possibleDivisors = (n, possibles = new Map([])) => {

    let divisors = new Map([]);
    let d = 2;

    if (possibles.has(1) === true) divisors.set(1, 1);

    while (d <= n) {
        if (n % d === 0 && possibles.has(d) === true) divisors.set(d, d);
        d++;
    }

    return divisors;
}

// nécessite un module supplémentaire pour gérer l'asynchrone dans Redux : thunk
export const increment = () => {
    return {
        type: 'INCREMENT_COUNTER',
    };
}

// Asynchrone 

let interval = null;

export const incrementAsync = status => {

    return dispatch => {
        if (status) {
            clearInterval(interval);
            dispatch({ type: "STOP_COUNTER" });
        }

        interval = setInterval(() => {
            dispatch(increment());
        }, 1000);
    };
}

export const initGame = () => {

    return dispatch => {
        dispatch({ type: 'REALOAD', reload: true });
        dispatch({ type: INIT_GAME });
    }
}

export const setChoice = payload => {

    return {
        type: SET_CHOICE, payload
    }
}

export const sendChoice = () => {

    return {
        type: CHECK_CHOICE
    }
}

export const choice_computer = (valid, even = false ) => {
    // valid 
    const keys = [...valid.keys()]; // on récupère les clés du Map

    // on choisit une clé au hasard
    const key = keys[Math.floor(Math.random() * keys.length)];

    return valid.get(key);
}

/*
Pour faire une copie propre des states ou d'une partie du state
*/
export const updateVeryNestedField = (state, action) => {

    const { possibles, valid, choices, computer, count, reload } = action;

    return {
        ...state,
        possibles,
        choices,
        valid,
        computer,
        player: '',
        message: '',
        count,
        score_player: 0,
        score_computer: 0,
        reload,
        winner : null
    }
}

// Pour faire une copie d'un Map 
export const newMap = map => {
    let m = new Map();

    // entries décompose les clés et valeurs du Map
    for (let [k, v] of map.entries()) {
        m.set(k, v);
    }

    // nouveau Map
    return m;
}

// TODO refactoring

export const newMap_v2 = map => {
    return  new Map(map);
}