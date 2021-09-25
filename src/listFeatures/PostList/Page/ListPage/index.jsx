import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import FormPostList from '../../components/Form/index.jsx';
import Pagination from '../../components/Pagination/index.jsx';
import PostList from '../../components/Post/index.jsx';

ListPage.propTypes = {};
function ListPage(props) {
  const [postlist, setPostList] = useState([]);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 10,
  });
  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramsString = queryString.stringify(filters);
        const responseUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(responseUrl);
        const responseData = await response.json();
        const { data, pagination } = responseData;
        setPostList(data);
        setPagination(pagination);
      } catch (err) {
        console.error(err.message);
      }
    }
    fetchPostList();
  }, [filters]);
  function handelPageChange(newPage) {
    setFilters({
      ...filters,
      _page: newPage,
    });
  }
  function handelOnSumit(formData) {
    setFilters({
      ...filters,
      _page: 1,
      title_like: formData.title,
    });
  }
  return (
    <div>
      <FormPostList onSubmit={handelOnSumit} />
      <PostList postlist={postlist} />
      <Pagination pagination={pagination} onChangePage={handelPageChange} />
    </div>
  );
}

export default ListPage;
