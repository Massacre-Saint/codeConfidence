import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';

function SortGoalsAndTopics({ handleShowAll, goals, topics }) {
  const [selectedValue, setSelectedValue] = useState('');

  const radios = [
    { name: 'Goals', value: '3' },
    { name: 'Topics', value: '4' },
  ];
  const resetFilter = () => {
    setSelectedValue('');
  };
  if (goals.length > 0 && topics.length > 0) {
    return (
      <div>
        <form>
          {selectedValue !== ''
            ? (
              <button
                type="button"
                className="close-button-round"
                onClick={(e) => {
                  resetFilter();
                  handleShowAll(e);
                }}
              >
                <AiOutlineClose />
              </button>
            )
            : ('')}
          {radios.map((i) => (
            <>
              <input
                type="radio"
                id={i.value}
                name="nav"
                value={i.name}
                checked={selectedValue === i.value}
                onChange={(e) => {
                  setSelectedValue(e.target.id);
                  handleShowAll(e);
                }}
                className="radio-none"
              />
              <label
                htmlFor={i.value}
                type="button"
                className={
                  selectedValue !== i.value && selectedValue !== ''
                    ? 'border-outline-selected filter-btn hide'
                    : 'filter-btn'
                }
              >{i.name}
              </label>
            </>
          ))}
        </form>
      </div>
    );
  }
  return (
    <></>
  );
}

export default SortGoalsAndTopics;

SortGoalsAndTopics.propTypes = {
  handleShowAll: PropTypes.func.isRequired,
  goals: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })).isRequired,
  topics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })).isRequired,
};
