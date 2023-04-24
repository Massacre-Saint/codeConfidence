import PropTypes from 'prop-types';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

function ProgressButtonGroup({ handleToggledQuery, filterOptions }) {
  return (
    <ButtonGroup aria-label="Basic example">
      {filterOptions.slice(7, 10).map((i) => (
        <ToggleButton
          type="radio"
          key={i.id}
          id={i.id}
          name="3"
          label={i.name}
          onChange={(e) => handleToggledQuery(i, e)}
          value={i.id}
          defaultChecked={i.isSelected}
          className={
            i.isSelected === true
              ? 'background-none fit-content border-outline-selected fnt-primary'
              : 'background-none fit-content border-outline fnt-primary'
          }
        >
          {i.name}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
}

export default ProgressButtonGroup;

ProgressButtonGroup.propTypes = {
  filterOptions: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.number,
    param: PropTypes.string,
    query: PropTypes.string,
  }))).isRequired,
  handleToggledQuery: PropTypes.func.isRequired,
};
