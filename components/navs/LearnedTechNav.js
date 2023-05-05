import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';

export default function LearnedTechNav({ handleShowAll }) {
  const [selectedValue, setSelectedValue] = useState('');

  const radios = [
    { name: 'Goals', value: '3' },
    { name: 'Topics', value: '4' },
  ];
  const resetFilter = () => {
    setSelectedValue('');
  };
  return (
    <>
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
    </>
  );
}

LearnedTechNav.propTypes = {
  handleShowAll: PropTypes.func.isRequired,
};
LearnedTechNav.defaultProps = {

};
