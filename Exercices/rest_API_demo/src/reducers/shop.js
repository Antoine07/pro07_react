const initialState = {
    authors: [],
    loading: true,
    author: {
        id: "",
        name: "",
        bio: "",
        shop_name: "",
        books: []
    },
    count: 0,
    lastId: '',
    message: ''
}

export default (state = initialState, action = {}) => {
    let newAuthor;

    switch (action.type) {

        case 'SET_NAME':
            newAuthor = { ...state.author };

            newAuthor.name = action.name;

            return {
                ...state,
                author: newAuthor
            }

        case 'SET_BIO':
            newAuthor = { ...state.author };

            newAuthor.bio = action.bio;

            return {
                ...state,
                author: state.author
            }

        case 'FETCH_AUTHORS':

            const authors = action.payload;

            return {
                ...state,
                authors: authors,
                count: authors.length,
                message: '',
                author : { ...state.author }
            }

        case 'LOADING':

            return {
                ...state,
                loading: action.loading
            }

        case 'MESSAGE':

            return {
                ...state,
                message: action.message,
                name: '', bio: '', lastId: action.lastId
            }

        case 'FETCH_AUTHOR':

            const author = action.payload;

            return {
                ...state,
                author: author
            }

        default:
            return state;
    }
}