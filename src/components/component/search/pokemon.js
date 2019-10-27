import React, {useContext, useEffect} from 'react';

import {SearchContext} from '../../../context/search';
import useInput from '../../../hooks/useInput';
import {Alert} from 'react-bootstrap';

function PokemonView() {
  const [search] = useContext(SearchContext);
  const [image, setImage] = useInput('');
  useEffect(() => {
    setImage('');
    if(search.pokemon){
      fetch('http://pokeapi.co/api/v2/pokemon/'+search.pokemon).then(res=> res.json())
        .then(response => setImage(response.sprites.front_default))
        .catch(()=>{
          setImage('Not Found');
        });
    }
  },[search, setImage]);
  return (
    <div>
      {image && (
        <img src={image} alt='' />
      )}
      {image === "Not Found" && (
        <Alert variant='warning'>
          No Pokemon Found
        </Alert>
      )}
    </div>
  );
}

export default PokemonView;
