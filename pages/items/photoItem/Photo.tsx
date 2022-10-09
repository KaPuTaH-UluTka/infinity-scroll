import { NextPage } from 'next';
import React from 'react';
import styles from '../../../styles/Home.module.css'
import { IPhoto } from '../Items';

const Photo = (props: { photo: IPhoto }) => {
  return (
    <div className={styles.photo}>
      <div className="title">{props.photo.title}</div>
      <img src={props.photo.thumbnailUrl} alt="pic"/>
    </div>
  );
};

export default Photo;
