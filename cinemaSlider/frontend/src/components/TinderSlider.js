import React, { useState, useRef, useEffect } from 'react';
import { FaThumbsUp, FaTimes, FaHeart } from 'react-icons/fa';
import './TinderSlider.css';

const TinderSlider = () => {
  const [cards, setCards] = useState([
    { id: 1, name: 'ОДИН ДЕНЬ В СТАМБУЛЕ', genre: 'комедия', link:'https://start.ru/watch/odin-den-v-stambule', imageBack:'./images/cacd7e6a-6a44-4b5b-8562-abf0fad3beda.jpg', image:'./images/c9175ac3-7a67-4e0f-ba12-a71aff495032.jpg', year: '2024', country: 'Россия', rating: '6.8', description: 'Новая комедия, новые герои, старый добрый «Квартет И». Виды на Босфор, откровенные разговоры и фирменный юмор' },
    { id: 2, name: 'ЗАТЕРЯННЫЕ', genre: 'триллер', image: './images/maxresdefault.jpg', imageBack: './images/zateran.jpg', description: 'Столичные карьеристы попадают в зловещий городок, из которого невозможно уехать. Триллер с Никитой Кологривым.', link:'https://start.ru/watch/zateryannye' },
    { id: 3, name: 'ФИНИСТ ПЕРВЫЙ БОГАТЫРЬ', link:'https://start.ru/watch/finist-pervyy-bogatyr', genre:'фэнтези', link:'https://start.ru/watch/finist-pervyy-bogatyr', image: './images/102f51b4-bb62-4ec9-9587-d811623f6801.jpg', imageBack: './images/finistpervyjbogatyr_1t.jpg', description: 'Сказочный блокбастер о первом богатыре Белогорья. Финист отправляется к таинственным восточным берегам' },
    { id: 4, name: 'МАМЕ СНОВА 17', genre: 'комедия', link:'https://start.ru/watch/mame-snova-17', image: './images/p1192x597.webp', imageBack: './images/mamesnova.jpg', description: 'В школьную директрису вселяется безбашенная девица из 2000-х. Светлана Ходченкова в ироничной комедии о девушке-подростке, застрявшей в теле чопорной директрисы школы' },
    { id: 5, name: 'БЕЗ ГРАНИЦ', genre: 'комедия', link:'https://start.ru/watch/bez-granic', image: './images/maxresdefault (1).jpg', imageBack: './images/8081972-4943118.jpg', description: 'Главные герои отправляются в путешествия к живописным горным долинам Армении, утопающим в зелени улочкам Тбилиси и праздничным огням новогодней Москвы' },
    { id: 6, name: 'КОНЕЦ СЛАВЫ', genre: 'комедия', link: 'https://start.ru/watch/konec-slavy', image: './images/startv.jpg', imageBack:'./images/Конец_славы.jpg', description: 'Артист инсценирует свою смерть, чтобы вернуть расположение коллег и любовь зрителей'},
    { id: 7, name: 'НЕПРИЛИЧНЫЕ ГОСТИ', genre: 'комедия', link:'https://start.ru/watch/neprilichnye-gosti', image: './images/Без названия.jpg', imageBack: './images/d34a4c09-cbda-488a-9fc6-f3595e567d0e.jpg', description: 'Чувственные соседи предлагают супругам-снобам раскрепоститься. Пикантная камерная комедия'},
    { id: 8, name: 'МНОГОЭТАЖКА', genre:'триллер', image: './images/Без названия (1).jpg', description:'После исчезновения дочери в подъезде собственного дома герой начинает свое расследование', imageBack:'./images/Многоэтажка.jpg', link:'https://start.ru/watch/mnogoetazhka' },
    { id: 9, name: 'ВОРОВКА', genre:'триллер', link: 'https://premier.one/show/vorovka', image:'./images/hq720.jpg', imageBack:'./images/влпрыл.webp',description:'Тяжелая судьба сделала из девушки умелую воровку, которая работает в паре с таинственным хакером. Уже много лет она пытается разыскать своего отца и во время очередного ограбления наконец выходит на его след.'},
    { id: 10, name: 'КЛАУСТРАФОБЫ: ИНСОМНИЯ', genre:'триллер', image: './images/ee6934c3-f45f-4ed2-8b52-4a52e731047f.jpg', imageBack:'./images/5a264e20942cd606f4c0ae5394adb6.jpg', genre:'триллер', link:'https://premier.one/show/klaustrofoby-insomniya', description: 'Клэр вызвалась добровольцем для участия в исследовании лекарства загадочной фармацевтической компании. После нескольких приемов у всех добровольцев проявляются побочные действия. Теперь им нельзя спать, иначе они умрут. ' },
    { id: 11, },
    { id: 12, },
    { id: 13},
    { id: 14},
    { id: 15},
  ]);

  const [genreMode, setGenreMode] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [likedMovies, setLikedMovies] = useState([]);
  const [showLiked, setShowLiked] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const popupRef = useRef(null);

  const filteredCards = selectedGenre
    ? cards.filter(card => card.genre === selectedGenre)
    : cards;

  const currentCard = filteredCards[currentIndex];

  const handleSwipe = (direction) => {
  if (!currentCard) return;

  if (direction === 'right') {
    setLiked(true);
    setDisliked(false);
    setSwipeDirection('right');
    setLikedMovies((prev) => {
      const alreadyLiked = prev.some(movie => movie.id === currentCard.id);
      if (!alreadyLiked) {
        return [...prev, currentCard];
      }
      return prev;
    });
  } else {
    setLiked(false);
    setDisliked(true);
    setSwipeDirection('left');
  }

  setTimeout(() => {
    setLiked(false);
    setDisliked(false);
    setSwipeDirection(null);

    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  }, 500);
};

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

  const handleSelectGenre = (genre) => {
    setSelectedGenre(genre);
    setGenreMode(false);
    setCurrentIndex(0);
  };

  const handleViewAll = () => {
    setSelectedGenre(null);
    setGenreMode(false);
    setCurrentIndex(0);
  };

  return (
    <div className="tinder-slider">
      {genreMode ? (
        <div className="genre-selection">
          <h2>Выберите жанр:</h2>
          <div className="genre-buttons">
            {['комедия', 'триллер', 'семейный'].map((genre, index) => (
              <button key={index} onClick={() => handleSelectGenre(genre)} className="genre-mode-button menu">
                {genre}
              </button>
            ))}
            <button onClick={handleViewAll} className="genre-mode-button menu">все фильмы</button>
          </div>
        </div>
      ) : (
        <>
          <div className="top-buttons">
            <button onClick={() => setGenreMode(true)} className="genre-mode-button">выбрать жанр</button>
            <button onClick={toggleLikedMovies} className="show-liked-button">
              <FaHeart size={45} color="white" />
              <span className="counter">{likedMovies.length}</span>
            </button>
          </div>

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
                            <button className="genre-button">{movie.genre}</button>
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

          {currentCard && currentIndex < cards.length ? (
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
            <div className="no-cards">Больше нет карточек!</div>
          )}
        </>
      )}
    </div>
  );
};

export default TinderSlider;
