/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { BsSliders } from 'react-icons/bs';
import { BiFilterAlt } from 'react-icons/bi';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useRouter } from 'next/router';
import SortDropdown from '../buttons/SortDropdown';
import StatusDropdown from '../buttons/StatusDropdown';
import SortSearchDropdown from '../buttons/SortSearchDropdown';
import { getAllFilteredTopics, getFilteredTopicsByTech } from '../../utils/data/topics';
import { useAuth } from '../../utils/context/authContext';
import ProgressButtonGroup from '../buttons/ProgressButtonGroup';
import { getAllFilteredGoals, getFilteredGoalsByTech } from '../../utils/data/goals';

const initialFilteOptionsState = [
  {
    id: 1,
    name: 'Recently Updated',
    param: 'last_updated',
    isSelected: false,
  },
  {
    id: 2,
    name: 'A-Z',
    param: 'alpha',
    type: 'radio',
    group: 1,
    isSelected: false,
  },
  {
    id: 3,
    name: 'Z-A',
    param: 'zeta',
    type: 'radio',
    group: 1,
    isSelected: false,
  },
  {
    id: 5,
    name: 'Open',
    param: 'open',
    type: 'radio',
    group: 2,
    isSelected: false,
  },
  {
    id: 6,
    name: 'Closed',
    param: 'closed',
    type: 'radio',
    group: 2,
    isSelected: false,
  },
  {
    id: 7,
    name: 'Both',
    param: 'both',
    type: 'radio',
    group: 2,
    isSelected: false,
  },
  {
    id: 8,
    name: '',
    param: '',
    isSelected: false,
  },
  {
    id: 9,
    name: 'Least Complete',
    param: '25',
    type: 'radio',
    group: 3,
    isSelected: false,
  },
  {
    id: 10,
    name: 'Most Complete',
    param: '50',
    type: 'radio',
    group: 3,
    isSelected: false,
  },
];
export default function FilterModal({
  goals,
  topics,
  setFilteredGoals,
  setFilteredTopics,
  lTech,
}) {
  const [show, setShow] = useState(false);
  const { user } = useAuth();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isSelected, setIsSelected] = useState([]);
  const router = useRouter();
  const [filterOptions, setFilterOptions] = useState(initialFilteOptionsState);
  const handleToggledQuery = (query, e) => {
    const selected = filterOptions.map((item) => {
      // handles goal
      if (e.target.name === 'goal' && e.target.id == item.id) {
        if (item.isSelected) {
          return {
            id: 8,
            name: '',
            param: null,
          };
        }
        return {
          ...item,
          isSelected: true,
          name: query.title,
          param: query.id,
        };
      }
      // handles radios that are not selcted
      if (item.type === 'radio' && item.id !== query.id) {
        // not selected radios in same group
        if (e.target.name == item.group) {
          return {
            ...item,
            isSelected: false,
          };
        }
        // keep other radio group value
        if (item.isSelected) {
          return item;
        }
        return {
          ...item,
          isSelected: false,
        };
      }
      // clicked item
      if (item.id === query.id) {
        if (e.target.checked && item.isSelected) {
          return item;
        }
        // handles toggled buttons
        return {
          ...item,
          isSelected: !item.isSelected,
        };
      }
      return item;
    });
    setFilterOptions(selected);
  };
  const handleSubmit = () => {
    const querySet = isSelected.map((i) => i.param || i.query);
    // const lTech = router.query.id;
    if (router.pathname === '/topics' || router.pathname === '/goals') {
      if (topics.length > 0) {
        getAllFilteredTopics(user, querySet).then((filteredTopics) => setFilteredTopics(filteredTopics));
      } else {
        getAllFilteredGoals(user, querySet).then((filteredGoals) => setFilteredGoals(filteredGoals));
      }
    } else if (topics.length > 0) {
      getFilteredTopicsByTech(user, querySet, lTech.id).then((filteredTopics) => setFilteredTopics(filteredTopics));
    } else {
      getFilteredGoalsByTech(user, querySet, lTech.id).then((filteredGoals) => setFilteredGoals(filteredGoals));
    }
    handleClose();
  };
  const handleReset = () => {
    setFilteredTopics(topics);
    setFilterOptions(initialFilteOptionsState);
    setIsSelected([]);
    handleClose();
  };
  useEffect(() => {
    const selectedFilters = filterOptions.filter((i) => i.isSelected);
    setIsSelected(selectedFilters);
  }, [filterOptions]);
  return (
    <>
      <button
        type="button"
        className="
          border-none
          background-none
          fnt-primary"
        onClick={handleShow}
      >
        <IconContext.Provider value={{ size: '1em', color: 'white' }}>
          <BsSliders />
        </IconContext.Provider>
        Filter
      </button>
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <IconContext.Provider value={{ size: '1em', color: 'white' }}>
            <BiFilterAlt />
          </IconContext.Provider>
          <div>
            {isSelected.map((i) => (
              <span
                key={i.name}
                className="fit content border-outline-selected margin-sides"
              >
                {i.name}
              </span>
            ))}
          </div>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            <Row>
              <Col className="flex-col" sm={3}>
                Sort By:
                <SortDropdown
                  filterOptions={filterOptions}
                  handleToggledQuery={handleToggledQuery}
                />
              </Col>
              {topics.length > 0
                ? (
                  <>
                    <Col className="flex-col" sm={3}>
                      By Status:
                      <StatusDropdown
                        handleToggledQuery={handleToggledQuery}
                        filterOptions={filterOptions}
                      />
                    </Col>
                    <Col className="flex-col">
                      By Goal:
                      <SortSearchDropdown
                        lTechGoals={goals}
                        handleToggledQuery={handleToggledQuery}
                        filterOptions={filterOptions}
                      />
                    </Col>
                  </>
                )
                : (
                  <Col className="flex-col">
                    By Progress:
                    <ProgressButtonGroup
                      handleToggledQuery={handleToggledQuery}
                      filterOptions={filterOptions}
                    />
                  </Col>
                )}
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          {isSelected.length
            ? (
              <button type="button" onClick={handleSubmit}>
                Save Changes
              </button>
            )
            : (
              ''
            )}
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
FilterModal.propTypes = {
  goals: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))).isRequired,
  topics: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string,
  }))),
  setFilteredGoals: PropTypes.func,
  setFilteredTopics: PropTypes.func,
  lTech: PropTypes.shape({
    id: PropTypes.number,
    tech: PropTypes.shape({
      docUrl: PropTypes.string,
      name: PropTypes.string,
    }),
  }),
};
FilterModal.defaultProps = {
  topics: [],
  setFilteredGoals: () => {},
  setFilteredTopics: () => {},
  lTech: {},
};
