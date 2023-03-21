import React from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import PropTypes from 'prop-types';

function ResourcesByTech({
  resources, setFilteredResources, lTech, setToggledFilter, setShowForm,
}) {
  const radios = [
    { name: 'All', value: '1' },
    { name: `${lTech.tech.name}`, value: '2' },
  ];
  const handleChange = (e) => {
    if (e.target.id === '1') {
      setFilteredResources(resources);
      setToggledFilter(false);
    } else {
      const results = resources.filter((obj) => obj.tech.tech.id === lTech.tech.id);
      setFilteredResources(results);
      setToggledFilter(true);
    }
    setShowForm(false);
  };
  return (
    <ButtonGroup>
      {radios.map((radio) => (
        <ToggleButton
          key={radio.value}
          id={radio.value}
          type="radio"
          name="radio"
          className="toggle-button"
          variant="outline"
          bsPrefix="hide-radio"
          onChange={(e) => {
            handleChange(e);
          }}
        >
          {radio.name}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
}

export default ResourcesByTech;

ResourcesByTech.propTypes = {
  resources: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.number,
    bookmark: PropTypes.shape({
      id: PropTypes.number,
    }),
    objectId: PropTypes.shape({
      id: PropTypes.string,
    }),
    tech: PropTypes.shape({
      id: PropTypes.number,
    }),
  }))).isRequired,
  lTech: PropTypes.shape({
    tech: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  }).isRequired,
  setFilteredResources: PropTypes.func.isRequired,
  setToggledFilter: PropTypes.func.isRequired,
  setShowForm: PropTypes.func.isRequired,
};
