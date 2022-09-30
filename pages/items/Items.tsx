import React, {useEffect, useState} from 'react';
import axios from "axios";
import styles from '../../styles/Home.module.css'

interface IPhoto {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string
}

const Items = () => {
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if(fetching){
      axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${currentPage}`)
      .then((res) => {
        setTotalCount(+res.headers['x-total-count']);
        setPhotos([...photos, ...res.data]);
        setCurrentPage(prevState => prevState + 1);
      }).finally(() => setFetching(false));}

  }, [fetching]);


  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    }
  }, [totalCount]);

  const scrollHandler = (e: any) => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && photos.length < totalCount) {

      setFetching(true);
    }
  }

  return (
    <main className={styles.main}>
      {photos.map((photo) =>
        <div key={photo.id} className={styles.photo}>
          <div className="title">{photo.title}</div>
          <img src={photo.thumbnailUrl} alt="pic"/>
        </div>
      )}

    </main>
  );
};

export default Items;
