import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/Home.module.css';
import { NextPage } from 'next';
import Photo from './photoItem/Photo';
import { useObserver } from '../../utils/hooks';

export interface IPhoto {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const Items: NextPage = () => {
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const lastElement = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (fetching) {
      axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${currentPage}`)
        .then((res) => {
          setTotalCount(+res.headers['x-total-count']);
          setPhotos([...photos, ...res.data]);
          setCurrentPage(prevState => prevState + 1);
        }).finally(() => setFetching(false));
    }

  }, [fetching]);


    useObserver(lastElement, photos.length < totalCount, () => {
      setFetching(true);
    });



  return (
    <main className={styles.main}>
      {photos.map((photo, index) =>
        <Photo key={photo.id} photo={photo} />,
      )}
      <div className={styles.trigger} ref={lastElement}></div>
    </main>
  );
};

export default Items;
