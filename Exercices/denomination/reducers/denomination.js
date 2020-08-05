
import { ADD_AMOUNT, CALCUL_TOKENS, RESET } from '../constants/actions';

// source de vérité
const initialState = {
    denominations: [100, 50, 20, 10, 5, 1], // notion d'ordre dans un array
    tokens: new Map(),
    amount: '',
    message: '' // TODO
}

export default (state = initialState, action = {}) => {
    let amount
    switch (action.type) {

        case ADD_AMOUNT:
            amount = action.payload;

            return {
                ...state,
                amount
            }

        case RESET:

            return {
                ...state,
                tokens: new Map(),
                amount: '',
                message: ''
            }

        case CALCUL_TOKENS:
            const tokens = new Map();

            amount = parseInt(state.amount)
            let q

            tokens.set('amount', amount)

            for (const d of state.denominations) {
                if (d < amount) {
                    q = Math.floor(amount / d)
                    tokens.set(d, q)
                    amount = amount - q * d
                }
            }

            return { ...state, tokens, amount: '' }

        default:
            return state;
    }
}