import React, { useState, useRef, useEffect } from 'react';
import { FaThumbsUp, FaTimes, FaHeart } from 'react-icons/fa';
import './TinderSlider.css';

const TinderSlider = () => {
  const [cards, setCards] = useState([
    { id: 1, name: 'ОДИН ДЕНЬ В СТАМБУЛЕ', link:'https://start.ru/watch/odin-den-v-stambule', imageBack:'./images/cacd7e6a-6a44-4b5b-8562-abf0fad3beda.jpg', image:'./images/c9175ac3-7a67-4e0f-ba12-a71aff495032.jpg', year: '2024', country: 'Россия', rating: '6.8', description: 'Новая комедия, новые герои, старый добрый «Квартет И». Виды на Босфор, откровенные разговоры и фирменный юмор' },
    { id: 2, name: 'ЗАТЕРЯННЫЕ', image: './images/maxresdefault.jpg', imageBack: './images/zateran.jpg', description: 'Столичные карьеристы попадают в зловещий городок, из которого невозможно уехать. Триллер с Никитой Кологривым.' },
    { id: 3, name: 'ФИНИСТ ПЕРВЫЙ БОГАТЫРЬ', image: './images/102f51b4-bb62-4ec9-9587-d811623f6801.jpg', imageBack: './images/finistpervyjbogatyr_1t.jpg', description: 'Сказочный блокбастер о первом богатыре Белогорья. Финист отправляется к таинственным восточным берегам ' },
    { id: 4, name: 'МАМЕ СНОВА 17', image: './images/p1192x597.webp', imageBack: './images/mamesnova.jpg'},
    { id: 5, name: 'Card 5' },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [likedMovies, setLikedMovies] = useState([]);
  const [showLiked, setShowLiked] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const popupRef = useRef(null);

  const handleSwipe = (direction) => {
    if (direction === 'right') {
      setLiked(true);
      setDisliked(false);
      setSwipeDirection('right');
      setLikedMovies((prev) => [...prev, currentCard]);
    } else {
      setLiked(false);
      setDisliked(true);
      setSwipeDirection('left');
    }

    setTimeout(() => {
      setLiked(false);
      setDisliked(false);
      setSwipeDirection(null);

      if (currentIndex < cards.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }, 500);
  };

  const currentCard = cards[currentIndex];

  const toggleLikedMovies = () => {
    setShowLiked(!showLiked);
    setShowOverlay(!showOverlay);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowLiked(false);
      setShowOverlay(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="tinder-slider">
      <button onClick={toggleLikedMovies} className="show-liked-button">
        <FaHeart size={45} color="white" />
        <span className="counter">{likedMovies.length}</span>
      </button>

      {showOverlay && <div className="overlay active"></div>}

      {showLiked && (
  <div className="liked-movies" ref={popupRef}>
    <h2>ВАМ ПОНРАВИЛОСЬ:</h2>
    {likedMovies.length > 0 ? (
      <ul>
        {likedMovies.map((movie, index) => (
          <li key={index} className="liked-movie-item">
            <div className="movie-info">
              <img
                src={movie.image}
                alt={movie.name}
                className="liked-movie-image"
              />
              <div className="liked-movie-details">
                <h3>{movie.name}</h3>
                <div className="liked-movie-buttons">
                  <button className="empty-button"></button>
                  <a href={movie.link} target="_blank" rel="noopener noreferrer">
                    <button className="view-movie-button">Смотреть</button>
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <p>Пока ничего не добавлено</p>
    )}
  </div>
)}


      {currentCard ? (
        <div className={`card ${swipeDirection ? `swipe-${swipeDirection}` : ''}`}>
          <div className={`card-actions ${liked ? 'liked' : ''} ${disliked ? 'disliked' : ''}`}>
            {liked && <FaThumbsUp size={30} color="#1b7148" />}
            {disliked && <FaTimes size={30} color="red" />}
          </div>
          <div className="card-image" style={{ backgroundImage: currentCard.imageBack ? `url(${currentCard.imageBack})` : 'none' }}></div>
          <div className="card-body">
            <h3>{currentCard.name}</h3>
            {currentCard.image && (
              <img src={currentCard.image} alt={currentCard.name} style={{ width: '100%', objectFit: 'cover', borderRadius: '20px', marginBottom: '3px' }} />
            )}
            <p>{currentCard.description}</p>
          </div>
          <div className="card-footer">
            <button onClick={() => handleSwipe('left')} className="left-button">Dislike</button>
            <button onClick={() => handleSwipe('right')} className="right-button">Like</button>
          </div>
        </div>
      ) : (
        <div className="no-cards">No more cards!</div>
      )}
    </div>
  );
};

export default TinderSlider;
