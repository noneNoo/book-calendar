import React from 'react';
import { Link } from 'react-router-dom';

function SearchBookLi({ thumbnail, title, publisher, date, info, authors }) {
  return (
    <li>
      <Link to={{ pathname: '/bookinfo' }} className="item">
        {thumbnail ? (
          <img className="thumbnail" src={thumbnail}></img>
        ) : (
          <div className="null_thumbnail">no image</div>
        )}
        <div className="info">
          <h1 className="title">{title}</h1>
          <ul className="authors-ul"></ul>
          <h3 className="publisher">{publisher} 출판</h3>
          {info ? (
            <h4 className="content">{info}</h4>
          ) : (
            <h4 className="content null">이 책은 상세정보가 없습니다.</h4>
          )}
        </div>
      </Link>
    </li>
  );
}

export default SearchBookLi;
