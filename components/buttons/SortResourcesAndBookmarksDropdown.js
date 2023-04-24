import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import PropTypes from 'prop-types';

function SortResourcesAndBookmarksDropdown({
  resources, setFilteredResources, lTech, setToggledFilter,
}) {
  const radios = [
    { name: 'All Bookmarks', value: '1' },
    { name: `${lTech.tech.name} Resources`, value: '2' },
  ];
  const handleChange = (e) => {
    if (e.target.id === '1') {
      setFilteredResources(resources);
      setToggledFilter(false);
    } else {
      const results = resources.filter((obj) => obj.learnedTech.tech.id === lTech.tech.id);
      setFilteredResources(results);
      setToggledFilter(true);
    }
  };
  return (
    <DropdownButton
      id="dropdown-button-dark-example2"
      menuVariant="dark"
      size="sm"
      drop="down-centered"
      title="Sort"
      bsPrefix="
        border-none
        background-none
        fnt-primary"
    >
      {radios.map((radio) => (
        <Dropdown.Item
          key={radio.value}
          id={radio.value}
          className="toggle-button"
          variant="outline"
          onClick={(e) => handleChange(e)}
        >{radio.name}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
}

export default SortResourcesAndBookmarksDropdown;

SortResourcesAndBookmarksDropdown.propTypes = {
  resources: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.number,
    bookmark: PropTypes.shape({
      id: PropTypes.number,
    }),
    objectId: PropTypes.shape({
      id: PropTypes.string,
    }),
    learnedTech: PropTypes.shape({
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
};
