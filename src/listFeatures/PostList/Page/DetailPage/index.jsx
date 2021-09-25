import React from 'react';
import { useParams } from 'react-router';

DetailPage.propTypes = {};

function DetailPage(props) {
  const { postListId } = useParams();
  console.log({ postListId });

  return (
    <div>
      {postListId}
      DetailPage
    </div>
  );
}

export default DetailPage;
