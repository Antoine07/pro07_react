import { SystemStateAuthor, SystemAction, ArrayDataAuthor } from '../types/author'
import { LOAD_DATA_AUTHORS, SET_AUHTOR, MESSAGE} from '../constants/actions'

const initialState: SystemStateAuthor = {
    authors: [],
    status: true,
    author: '',
    authorId: '',
    message: ''
}

export default (state = initialState, action: SystemAction): SystemStateAuthor => {

    switch (action.type) {

        case LOAD_DATA_AUTHORS:

            return {
                ...state,
                authors: action.payload
            }

        case SET_AUHTOR:

            return {
                ...state,
                author: action.payload
            }

        case MESSAGE:
            const { message, authorId } = action.payload

            return {
                ...state,
                message : message,
                authorId : authorId,
                author : ''
            }

        default:
            return state;
    }
}