import React, { useState, useEffect } from 'react';
import './favoriots.css';
import { AiTwotoneStar } from 'react-icons/ai';

const Favoriots = () => {
  const [beers, setBeers] = useState([]);

  // GET ALL THE STORED BEER FROM BROWSER API--------
  useEffect(() => {
    const savedBeers = JSON.parse(
      localStorage.getItem('favoriteBeers') || '[]'
    );

    const extractedBeers = savedBeers.map((item: any) => item.beer);
    setBeers(extractedBeers);
  }, []);

  // REMOVE THE PERTICULAR ID FROM THE LIST------------
  const removeFromFavs = (idToRemove: number) => {
    const updatedFavorites = beers.filter(
      (beer: any) => beer.id !== idToRemove
    );
    setBeers(updatedFavorites);
    localStorage.setItem('favoriteBeers', JSON.stringify(updatedFavorites));
  };

  return (
    <div className='fav_container'>
      {beers.map((el: any, idx: number) => {
        const { id, name, image_url, description } = el;
        return (
          <div className='card' key={idx}>
            <div className='remove' onClick={() => removeFromFavs(id)}>
              <AiTwotoneStar />
            </div>
            <div className='img'>
              <img src={image_url} alt='' />
            </div>
            <div className='title'>
              <div className='name'>{name}</div>
              <div className='desc'>{description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Favoriots;
