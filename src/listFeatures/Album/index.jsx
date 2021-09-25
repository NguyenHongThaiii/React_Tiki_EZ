import React from 'react';
import AlbumList from './components/AlbumList/index.jsx';
AlbumFeature.propTypes = {

};

function AlbumFeature() {
    const albumList = [
        {
            id: 1,
            name: 'Quên lối về',
            image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/8/6/9/e/869e8a3ba20c37e2965dce1a4e1cc82b.jpg',
        },
        {
            id: 2,
            name: 'Quên đường về',
            image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/4/9/d/a/49da6a1d6cf13a42e77bc3a945d9dd6b.jpg',
        },
        {
            id: 3,
            name: 'Quên ngõ về',
            image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/c/8/2/3/c82355caf6ab6a1111aadd28e9d56085.jpg',
        },
    ]
    return (
        <div>
            <AlbumList albumList={albumList} />
        </div>
    );
}

export default AlbumFeature;