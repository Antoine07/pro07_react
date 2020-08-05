import { ADD_AMOUNT, CALCUL_TOKENS, RESET, SET_MEMORY } from '../constants/actions';

export const addAmount = payload => {
    return {
        type: ADD_AMOUNT, payload
    }
};

export const calculTokens = () => {
    return {
        type: CALCUL_TOKENS
    }
};

export const resetTokens = () => {
    return {
        type: RESET
    }
};

export const setMemory = payload => {
    return {
        type: SET_MEMORY, payload
    }
};