import { FETCH_AUTHORS, FETCH_AUTHOR } from '../constants/actions';

const URL = process.env.REACT_APP_URL;

export const generateHash = () => [ ...Array(10) ].map(i => (~~(Math.random() * 36)).toString(36)).join('');

export const fetch_authors = payload => {
    return {
        type: FETCH_AUTHORS, payload
    };
}

export const fetch_author = payload => {
    return {
        type: FETCH_AUTHOR, payload
    };
}

export const fetch_authors_async = () => {

    const headers = {
        method: 'GET',
        headers: new Headers(),
        mode: 'cors',
        cache: 'default'
    };

    return dispatch => {

        const fetchAsyncAuthors = async () => {

            dispatch({ type: 'LOADING', loading: true });

            const isLoading = await new Promise(r => {
                setTimeout(() => {
                    r(false);
                }, 1000);
            });

            const results = await fetch(`${URL}/authors`, headers);
            const authors = await results.json();

            dispatch(fetch_authors(authors));

            dispatch({ type: 'LOADING', loading: isLoading });
        }

        fetchAsyncAuthors();
    };
}

export const fetch_author_async = id => {

    const headers = {
        method: 'GET',
        headers: new Headers(),
        mode: 'cors',
        cache: 'default'
    };

    return dispatch => {

        const fetchAsyncAuthor = async id => {
            const result = await fetch(`${URL}/author/${id}`,
                {
                    method: 'GET', headers: { "Content-Type": "application/json" }
                });

            const data = await result.json();

            dispatch(fetch_author(JSON.parse(data.author)));
        }

        fetchAsyncAuthor(id);
    };
}


export const fetch_add_author_async = author => {

    return dispatch => {
        const fetchAddAuthor = async () => {

            const options = {
                method: 'POST',
                body: JSON.stringify(author),
                headers: { "Content-Type": "application/json" }
            };

            const results = await fetch(`${URL}/add`, options);

            const { status, name, id } = await results.json();

            dispatch({ 
                type: 'MESSAGE', 
                message: `Merci le nouvel auteur ${name} a bien été ajouté avec success`, 
                lastId: id 
            });
        }

        fetchAddAuthor();

    };
}

export const fetch_delete_author_async = id => {

    return dispatch => {
        const fetchDeleteAuthor = async () => {

            const options = {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" }
            };

            const results = await fetch(`${URL}/author/${id}`, options);

            const { status, name, lastId } = await results.json();

            dispatch({ 
                type: 'MESSAGE', 
                message: `L'auteur ${name} a été supprimer avec success`, 
                lastId: lastId
            });
        }

        fetchDeleteAuthor();

    };
}


export const fetch_update_author_async = author => {

    return dispatch => {
        const fetchUpdateAuthor = async () => {

            const options = {
                method: 'PUT',
                body: JSON.stringify(author),
                headers: { "Content-Type": "application/json" }
            };

            const results = await fetch(`${URL}/author/${author.id}`, options);
            const { status, name, id } = await results.json();

            dispatch({ 
                type: 'MESSAGE', 
                message: `Merci la mise à jour de l'auteur ${name} a bien été réalisé avec success`, 
                lastId: id + Math.random().toString()
            });
        }

        fetchUpdateAuthor();

    };
}