import React from 'react';
import './style.css';
AlbumItem.propTypes = {};

function AlbumItem({ item }) {
  return (
    <div className="album">
      <div className="thumb">
        <img src={item.image} alt={item.name} />
      </div>
      <p>{item.name}</p>
    </div>
  );
}

export default AlbumItem;
