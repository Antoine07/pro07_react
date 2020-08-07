import { LOAD_DATA_AUTHORS } from '../constants/actions'

import { Dispatch } from 'redux'

import { ArrayDataAuthor, SystemAction } from '../types/author'


export const loadDataAuthors = (payload : ArrayDataAuthor) : SystemAction => {

    return {
        type: LOAD_DATA_AUTHORS, payload
    }
}

export const loadDataAuthorsAsync = (status: boolean = true) : (dispatch: Dispatch ) => void => {

    return (dispatch: Dispatch) => {
        const fetchData = async () => {
            const results = await fetch("http://192.168.1.113:3000/authors")
            const data: ArrayDataAuthor = await results.json()
            dispatch(loadDataAuthors(data))
        }

        fetchData()
    }
}