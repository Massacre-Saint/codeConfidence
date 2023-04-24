import React from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

export default function StatusDropdown({
  handleToggledQuery, filterOptions,
}) {
  return (
    <>
      <Form>
        {filterOptions.slice(3, 6).map((i) => (
          <div key={i.id}>
            <Form.Check
              type="radio"
              name="2"
              id={i.id}
              label={i.name}
              onChange={(e) => handleToggledQuery(i, e)}
              value={i.id}
              defaultChecked={i.isSelected}
            />
          </div>
        ))}
      </Form>
    </>
  );
}

StatusDropdown.propTypes = {
  handleToggledQuery: PropTypes.func.isRequired,
  filterOptions: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.number,
    param: PropTypes.string,
    query: PropTypes.string,
  }))).isRequired,
};
