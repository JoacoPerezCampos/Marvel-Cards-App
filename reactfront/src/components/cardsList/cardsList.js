import Card from '../card/card.js';

const CardList = ({ characters }) => {

  return (
    <div className="container" id='cardlist'>
      <div className="row">
        {characters.map((character) => (
          <div key={character.id} className="col-lg-3 col-md-4 col-sm-6">
            <Card
              thumbnail={character.thumbnail}
              name={character.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;