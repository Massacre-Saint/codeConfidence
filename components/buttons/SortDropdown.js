import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

function SortDropdown({
  filterOptions, handleToggledQuery,
}) {
  return (
    <>
      {filterOptions.slice(0, 1).map((i) => (
        <button
          type="button"
          key={i.id}
          name={i.name}
          onClick={(e) => handleToggledQuery(i, e)}
          className={
            i.isSelected === true
              ? 'background-none fit-content border-outline-selected fnt-primary'
              : 'background-none fit-content border-outline fnt-primary'
          }
        >
          {i.name}
        </button>
      ))}
      <div>
        Title:
      </div>
      <Form>
        <div>
          {filterOptions.slice(1, 3).map((i) => (
            <Form.Check
              type="radio"
              name="1"
              key={i.id}
              id={i.id}
              label={i.name}
              onChange={(e) => handleToggledQuery(i, e)}
              value={i.id}
              defaultChecked={i.isSelected}
            />
          ))}
        </div>

      </Form>
    </>
  );
}

SortDropdown.propTypes = {
  filterOptions: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.number,
    param: PropTypes.string,
    query: PropTypes.string,
  }))).isRequired,
  handleToggledQuery: PropTypes.func.isRequired,
};

export default SortDropdown;
