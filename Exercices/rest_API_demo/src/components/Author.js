import React from 'react';

const Author = ({ name, bio, books, shop_name }) => {
  return (
    <div className="Author">
      <h1 style={{fontSize : "18px"}}>Nom de l'auteur : {name}</h1>
      <p>Bio: {bio}</p>
      {books &&
        <ul>
          {books.map((book, i) => <li key={i}>{book}</li>)}
        </ul>
      }
    </div>
  );
}

export default Author;
