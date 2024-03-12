import PropTypes from 'prop-types';

function ThreadsFilter({ threadsLength, categories, onCategoryChange }) {
  return (
    <>
      <p className="me-auto mb-0">{threadsLength} threads</p>
      <div className="threads-filter ms-auto input-group">
        <span className="input-group-text">Category</span>
        <select
          name="categories"
          className="form-select"
          value={categories.selected}
          onChange={onCategoryChange}
        >
          {categories.values.map((category) => {
            return (<option key={category} value={category}>{category}</option>);
          })}
        </select>
      </div>
    </>
  );
}

ThreadsFilter.propTypes = {
  threadsLength: PropTypes.number.isRequired,
  categories: PropTypes.object.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

export default ThreadsFilter;
