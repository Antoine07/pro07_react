
import { SET_MEMORY } from '../constants/actions';

const initialState = {
    memory: new Map(),
    count : 0
}

export default (state = initialState, action = {}) => {

    switch (action.type) {

        case SET_MEMORY:



            const memory = new Map(state.memory)
            const count = state.count + 1

            memory.set(count, action.payload)

            return {
                ...state,
                memory,
                count
            }

        default:
            return state;
    }
}