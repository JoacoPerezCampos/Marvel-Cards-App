import React from 'react';
import Card from '../card/card.js';


const CardList = ({ characters }) => {

  return (
    <div className="container-fluid m-2" id='cardlist'>
      <div className="row">
        {characters.map((character) => (
          <div id='cards' key={character.id} className="col-lg-3 col-md-4 col-sm-6 p-1">
            <Card
              charId={character.charId}
              thumbnail={character.thumbnail}
              name={character.name}
              description={character.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;