import React from 'react';
const Card = ({ thumbnail, name, }) => {

  const imageUrl = `${thumbnail?.path}.${thumbnail?.extension}`;

  return (
    <div className="card">
      <img src={imageUrl} alt={name} className="card-img-top" />
      <h5 className="card-title">{name}</h5>
    </div>

  );
};

export default Card;