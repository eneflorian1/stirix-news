import React from 'react';
import LazyLoad from 'react-lazyload';

function NewsCard({ title, imageUrl, content }) {
  return (
    <div className="news-card">
      <h2>{title}</h2>
      <LazyLoad height={200} once>
        <img src={imageUrl} alt={title} />
      </LazyLoad>
      <p>{content}</p>
    </div>
  );
}

export default NewsCard;