import React from 'react';
import PropTypes from 'prop-types';
import AlbumItem from '../AlbumItem/index.jsx'
import './style.css'
AlbumList.propTypes = {
    albumList: PropTypes.array.isRequired,
};

function AlbumList({ albumList }) {
    return (
        <>
            <h2>Danh sách bài hát</h2>
            <ul className="album-list">
                {albumList.map(item => (
                    <li key={item.id}> <AlbumItem item={item} /> </li>
                ))}
            </ul>
        </>
    );
}

export default AlbumList;