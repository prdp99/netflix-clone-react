import classes from "./homepage.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function Movies(props) {
  const [latestMovie, setLatestMovie] = useState([]);
  const [latestTv, setLatestTv] = useState([]);
  const [coverImage, setCoverImage] = useState([]);
  const image =
    "https://image.tmdb.org/t/p/original/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg";
  useEffect(() => {
    async function fetchLatestMovie() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=2`
        );
        const data = await res.json();
        setLatestMovie(data.results);

        return data;
      } catch (error) {}
    }
    async function fetchLatestTv() {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/airing_today?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=2`
      );
      const data = await res.json();
      setLatestTv(data.results);
      return data;
    }

    fetchLatestMovie();
    fetchLatestTv();
    // fetchCoverImage();
  }, []);

  function getLatestMovie() {
    return latestMovie.map((data, index) => {
      return (
        <Link to={`/home/movies/${data.title}`} key={index}>
          <li key={data.id} onClick={() => props.onSelect(data)}>
            <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} />
            {/* <span>{data.title}</span> */}
          </li>
        </Link>
      );
    });
  }
  function getLatestTv() {
    return latestTv.map((data, index) => {
      return (
        <Link to={`/home/tvshows/${data.name}`} key={index}>
          <li key={data.id} onClick={() => props.onSelect(data)}>
            <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} />
            {/* <span>{data.name}</span> */}
          </li>
        </Link>
      );
    });
  }
  function getCoverImage() {
    return (
      <img
        src={`https://image.tmdb.org/t/p/original${coverImage.backdrop_path}`}
      />
    );
  }

  const refOne = useRef(null);
  const refTwo = useRef(null);
  const refThree = useRef(null);
  const refFour = useRef(null);
  function scrollLeft(refOne) {
    const node = refOne.current;
    let width = node.clientWidth;
    node.scrollLeft = node.scrollLeft - width;
  }

  function scrollRight(refOne) {
    const node = refOne.current;
    let width = node.clientWidth;
    node.scrollLeft = node.scrollLeft + width;
  }

  return (
    <>
      <main className={classes.main}>
        <h2>Latest Movies</h2>
        <div
          className={classes.slider}
          id="two"
          onClick={() => scrollLeft(refOne)}
        ></div>
        <div
          className={classes.sliderBack}
          id="two"
          onClick={() => scrollRight(refOne)}
        ></div>
        <div className={classes.cardContainer}>
          <ul className={classes.card} ref={refOne}>
            {getLatestMovie()}
          </ul>
        </div>
      </main>

      <main>
        <h2> Latest TV Shows</h2>
        <div
          className={classes.slider}
          id="two"
          onClick={() => scrollLeft(refTwo)}
        ></div>
        <div
          className={classes.sliderBack}
          id="two"
          onClick={() => scrollRight(refTwo)}
        ></div>
        <div className={classes.cardContainer}>
          <ul className={classes.card} ref={refTwo}>
            {getLatestTv()}
          </ul>
        </div>
      </main>
    </>
  );
}

export default Movies;
