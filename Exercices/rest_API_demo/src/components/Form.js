import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { generateHash, fetch_add_author_async } from '../actions/actions-types';

import {
  useHistory
} from "react-router-dom";

const Form = props => {

  const { author:{name, bio} } = useSelector(state => state.shop);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(fetch_add_author_async({ id: generateHash(), name: name, bio: bio, shop_name: "fnac", books: [] }));
    history.push("/");
  }

  return (
    <div className="container">
      <div className="col-md-12">
        <div className="row" style={{ margin: "10px" }}>
          <form onSubmit={handleSubmit}>
            <p><input type="text" name="name" value={name} onChange={e => dispatch({ type: 'SET_NAME', name: e.target.value })} /></p>
            <p><input type="text" name="bio" value={bio} onChange={e => dispatch({ type: 'SET_BIO', bio: e.target.value })} /></p>
            <p><button className="btn btn-warning btn-sm" >Add</button></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;