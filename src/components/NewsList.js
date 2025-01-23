import React from 'react';
import NewsCard from './NewsCard';
import styles from '../styles/NewsList.module.css';

function NewsList({ news }) {
  if (!news || news.length === 0) {
    return <p>Nu există știri disponibile momentan.</p>;
  }

  return (
    <div className={styles.newsList}>
      {news.map((item) => (
        <NewsCard key={item.id} news={item} />
      ))}
    </div>
  );
}

export default NewsList;