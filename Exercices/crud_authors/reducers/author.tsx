import { SystemStateAuthor, SystemAction } from '../types/author'
import { LOAD_DATA_AUTHORS } from '../constants/actions'

const initialState: SystemStateAuthor = {
    authors: [],
    status: true,
    authorId :  ''
}

export default (state: SystemStateAuthor = initialState, action: SystemAction): SystemStateAuthor => {

    switch (action.type) {

        case LOAD_DATA_AUTHORS:

            return {
                ...state,
                authors: action.payload
            }

        default:
            return state;
    }
}