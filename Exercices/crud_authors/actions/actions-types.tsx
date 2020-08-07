import { ArrayDataAuthor, SystemAction, Author } from '../types/author'
import { LOAD_DATA_AUTHORS, SET_AUHTOR, URL_API, MESSAGE } from '../constants/actions'
import { Dispatch } from 'redux'

export const loadDataAuthors = (payload: ArrayDataAuthor): SystemAction => {

    return {
        type: LOAD_DATA_AUTHORS, payload
    }
}

export const loadDataAuthorsAsync = (status: boolean = true): (dispatch: Dispatch) => void => {

    return (dispatch: Dispatch) => {
        const fetchData = async () => {
            const results = await fetch(`${URL_API}/authors`)
            const data: ArrayDataAuthor = await results.json()
            dispatch(loadDataAuthors(data))
        }
        fetchData()
    }
}

// todo change setAuthor ...
export const addAuthor = (author: Author) : (dispatch: Dispatch) => void => {

    return (dispatch: Dispatch) => {
        const fetchAddAuthor = async () => {

            let newAuthor: Author = {
                number: Math.floor(Math.random() * 100),
                name: author.name,
                bio: 'Thèse Maths',
                shop_name: 'fnac',
                books: ['Le pays des merveilles', 'un monde merveilleux']
            };

            const options = {
                method: 'POST',
                body: JSON.stringify(newAuthor),
                headers: { "Content-Type": "application/json" }
            };

            const status = await fetch(`${URL_API}/add`, options);
            const { authorId, name } = await status.json();

            dispatch(setMessage({ 
                message: `Merci le nouvel auteur ${name} a bien été ajouté avec success`, 
                authorId: authorId 
            }))
        }

        fetchAddAuthor();

    };
}

export const setMessage = (payload: { message: string, authorId: string }): SystemAction => {

    return {
        type: MESSAGE,
        payload,
    }
}


export const setAuthor = (payload: string): SystemAction => {

    return {
        type: SET_AUHTOR, payload
    }
}