import { SystemState, SystemAction } from '../types/author'
import { LOAD_DATA_AUTHORS } from '../constants/actions'

const initialState: SystemState = {
    authors: [],
    status: true
}

export default (state: SystemState = initialState, action: SystemAction ): SystemState => {

    switch (action.type) {

        case LOAD_DATA_AUTHORS :
            const  authors  = action.payload

            return {
                ...state,
                authors
            }

        default:
            return state;
    }
}