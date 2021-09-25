import React from 'react';
import PropTypes from 'prop-types';

PostList.propTypes = {
    postlist: PropTypes.array,
};
PostList.defaultProps = {
    postlist: []
}

function PostList(props) {
    const { postlist } = props
    return (
        <ul>
            {postlist.map(post => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    );
}

export default PostList;