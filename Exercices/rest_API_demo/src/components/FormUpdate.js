import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetch_update_author_async, fetch_author_async } from '../actions/actions-types';

import {
  useParams,
  useHistory
} from "react-router-dom";

const FormUpdate = ({ location }) => {
  const { author } = useSelector(state => state.shop);
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetch_author_async(id));
  }, [])

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(fetch_update_author_async({ id: id, name: author.name, bio: author.bio, shop_name: "fnac", books: [] }));
    history.push("/");
  }

  return (
    <div className="container">
      <div className="col-md-12">
        <div className="row" style={{ margin: "10px" }}>
          <form onSubmit={handleSubmit}>
            <p><input type="text" name="name" value={author.name} onChange={e => dispatch({ type: 'SET_NAME', name: e.target.value })} /></p>
            <p><input type="text" name="bio" value={author.bio} onChange={e => dispatch({ type: 'SET_BIO', bio: e.target.value })} /></p>
            <p><button className="btn btn-warning btn-sm" >Update</button></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormUpdate;
