import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetch_authors_async, fetch_author_async, fetch_delete_author_async } from './actions/actions-types';
import Author from './components/Author';

import './App.css';
import { Link } from 'react-router-dom';

const App = () => {
  const { loading, authors, author, count, lastId } = useSelector(state => state.shop);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch_authors_async());
  }, [lastId]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <h2 style={{ fontSize: "18px" }} >Nombre d'auteurs : {count}</h2>
          {loading && <p>Loading ...</p>}
          {(authors && loading === false) && authors.map((a, i) =>
            <React.Fragment key={i}>
              <h2 style={{ fontSize: "15px" }}>{a.name}</h2>
              <button type="button" className="btn btn-warning btn-sm btn-api" onClick={() => dispatch(fetch_author_async(a.id))} >Détails</button>
              <button type="button" className="btn btn-primary btn-sm btn-api" >
                <Link
                  to={{ pathname: `update/${a.id}`, state : a }}
                >Update</Link>
              </button>
              <button type="button" className="btn btn-danger btn-sm btn-api" onClick={() => dispatch(fetch_delete_author_async(a.id))} >Delete</button>
            </React.Fragment>
          )}
        </div>
        <div className="col-md-8">
          {author && <Author { ...author}  />}
        </div>
      </div>
    </div >
  );
}

export default App;
