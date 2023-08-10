import React, { useState, useEffect } from 'react';
import './home.css';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineStar, AiTwotoneStar } from 'react-icons/ai';
import axios from 'axios';
import Loader from '../Loader';

const Home = () => {
  const [favoriteStatus, setFavoriteStatus] = useState<number[]>([]);
  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [beers, setBeers] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // FOR ALL THE STAR ICON INDIVIDUALLY
  useEffect(() => {
    setFavoriteStatus(Array(beers.length).fill(false));
  }, [beers]);

  // GETTING THE BEERS HERE
  useEffect(() => {
    const fetchBeers = async () => {
      try {
        const response = await axios.get(
          `https://api.punkapi.com/v2/beers?page=${currentPage}&per_page=10`
        );
        setBeers(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBeers();

    if (value === null) {
      fetchBeers();
    }
  }, [currentPage, value]);

  // FOR SEARCH HANDLE, TO SEARCH THE BEER WITH IT'S NAME
  const handleSearch = (e: any) => {
    const filteredBeers = beers.filter((beer: any) =>
      beer.name.toLowerCase().includes(value)
    );
    setBeers(filteredBeers);
  };

  // FOR PAGINATION, I'VE ADDED ONLY FOR 30 PAGES. ONE CAN SEE ON PAGE
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= 30) {
      setCurrentPage(page);
    }
  };

  const paginationArray = [];
  for (let i = 1; i <= 30; i++) {
    paginationArray.push(i);
  }

  // THIS LINE OF CODE IS FOR THE STAR ICON'S CHECKED STATE, UNTIL YOU REMOVE IT, IT WON'T FADE UNLESS YOU'LL UNCHECK IT
  useEffect(() => {
    const existingFavoritesJSON = localStorage.getItem('favoriteBeers');
    const existingFavorites = existingFavoritesJSON
      ? JSON.parse(existingFavoritesJSON)
      : [];

    const favoriteStatusArray = beers.map((beer: any) =>
      existingFavorites.some((favBeer: any) => favBeer.id === beer.id)
    );

    setFavoriteStatus(favoriteStatusArray);
  }, [beers]);

  // HERE IS THE FUNCTION TO ADD THE BEERS IN FAVORIET SECTION, IF API METHODS WILL BE AVAILABLE THEN IT CAN BE MORE EASY
  const addToFavs = (idx: number, beer: any) => {
    const existingFavoritesJSON = localStorage.getItem('favoriteBeers');
    const existingFavorites = existingFavoritesJSON
      ? JSON.parse(existingFavoritesJSON)
      : [];

    const beerIndex = existingFavorites.findIndex(
      (favBeer: any) => favBeer.id === beer.id
    );

    if (beerIndex !== -1) {
      const updatedFavorites = existingFavorites.filter(
        (favBeer: any) => favBeer.id !== beer.id
      );
      localStorage.setItem('favoriteBeers', JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = [...existingFavorites, beer];
      localStorage.setItem('favoriteBeers', JSON.stringify(updatedFavorites));
    }

    const updatedStatus: any = [...favoriteStatus];
    updatedStatus[idx] = !updatedStatus[idx];
    setFavoriteStatus(updatedStatus);
  };

  // UNTILL THE DATA IS BEING FETCHED
  if (loading) {
    return <Loader />;
  }

  // MAIN RESPONSE AFTER GETTING DATA
  return (
    <>
      <div className='home_container'>
        {/* SEARCH BAR IS HERE */}
        <div className='search_bar'>
          <input
            className='search_beer'
            type='text'
            value={value}
            placeholder='Search beers'
            name='beer-search'
            onChange={(e: any) => setValue(e.target.value)}
          />
          <button onClick={handleSearch}>
            <span>search</span>
            <BiSearch />
          </button>
        </div>
        {/* PAGINATION SECTION IS FROM HERE */}
        <div className='beer_section'>
          <div className='current_page'>You're on page no {currentPage}</div>
          <div className='pagination'>
            <div className='buttons' title='scroll-right'>
              {paginationArray.map((el: any, id: number) => {
                return (
                  <button
                    className={`p-btn ${el === currentPage ? 'active' : ''}`}
                    key={id}
                    onClick={() => handlePageChange(el)}
                  >
                    {el}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ALL THE BEER SECTION IS FROM HERE */}
          <div className='all_beers'>
            {beers &&
              beers.map((beer: any, idx: number) => {
                return (
                  <>
                    <div className='beers' key={idx}>
                      <div
                        className='fav_icon'
                        onClick={() => addToFavs(idx, beer)}
                      >
                        {favoriteStatus[idx] ? (
                          <AiTwotoneStar />
                        ) : (
                          <AiOutlineStar />
                        )}
                      </div>
                      <div className='img_container'>
                        <img src={beer.image_url} alt='' />
                      </div>
                      <div className='desc'>
                        <h3>{beer.name}</h3>
                        <p>
                          {beer.description.length > 150
                            ? `${beer.description.substring(0, 150)}...`
                            : beer.description}
                        </p>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
