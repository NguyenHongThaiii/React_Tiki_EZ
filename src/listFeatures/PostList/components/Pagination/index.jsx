import PropTypes from 'prop-types';
import React from 'react';

Pagination.propTypes = {
  onChangePage: PropTypes.func,
  pagination: PropTypes.object.isRequired,
};
Pagination.defaultProps = {
  onChangePage: null,
};

function Pagination(props) {
  const { pagination, onChangePage } = props;
  const { _page, _limit, _totalRows } = pagination;
  const totalPage = Math.ceil(_totalRows / _limit);
  const handelChangePage = (newPage) => {
    if (onChangePage) {
      onChangePage(newPage);
    }
  };
  return (
    <div>
      <button disabled={_page === 1} onClick={() => handelChangePage(_page - 1)}>
        prev
      </button>
      <button disabled={_page === totalPage} onClick={() => handelChangePage(_page + 1)}>
        next
      </button>
    </div>
  );
}

export default Pagination;
